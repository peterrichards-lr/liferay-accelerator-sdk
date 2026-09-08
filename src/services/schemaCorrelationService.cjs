const {
  findContractByEntityType,
  ENTITY_CONTRACTS,
} = require('../utils/contractMappings.cjs');

/**
 * Per-item conclusion drawn by correlating a Liferay import failure with the
 * SDK's own contract assessment of the payload item that caused it.
 */
const VERDICT = {
  /** ContractValidator rejects the same item: the SDK could have caught this locally. */
  LOCALLY_PREVENTABLE: 'LOCALLY_PREVENTABLE',
  /** The item satisfies the OpenAPI contract, so Liferay rejected it for other reasons. */
  SERVER_SIDE_ONLY: 'SERVER_SIDE_ONLY',
  /** Not enough information (no payload match, or no contract for this entity). */
  UNDIAGNOSED: 'UNDIAGNOSED',
};

const LOCAL_ASSESSMENT = {
  PASSED: 'PASSED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED',
};

/** How the schema an item was assessed against came to be chosen. */
const SCHEMA_SOURCE = {
  /** The caller named the contract explicitly; it is not second-guessed. */
  OVERRIDE: 'override',
  /** Derived from the step key / entity type and confirmed by the item's shape. */
  STEP_KEY_CONFIRMED: 'stepKeyConfirmedByShape',
  /** The step key's schema did not describe the item; its shape named another. */
  PAYLOAD_SHAPE: 'payloadShape',
  /** No schema could be identified with confidence: the item is not assessed. */
  UNIDENTIFIED: 'unidentified',
};

const DEFAULT_MAX_ENTRIES = 25;
const DEFAULT_PAYLOAD_CHARS = 600;

/**
 * Share of an item's own top-level fields a schema must declare before it is
 * accepted as describing that item. Below this the schema is a bystander that
 * happens to share a field name or two, and assessing against it would report
 * violations of rules the item was never subject to.
 */
const MIN_SHAPE_COVERAGE = 0.5;

/**
 * Correlates Liferay batch import failures with the payload items that caused
 * them and with the SDK's local ContractValidator assessment of those items.
 *
 * Liferay's failed item report says *that* an item was rejected, rarely *why*
 * in schema terms. Running the same item back through the authoritative
 * OpenAPI contract answers the first question a developer asks: "is my payload
 * wrong, or is this a server-side/data problem?".
 */
class SchemaCorrelationService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * Resolves the OpenAPI contract to validate failed items against.
   * @param {{contract?: object, entityType?: string, stepKey?: string}} opts
   */
  resolveContract({ contract, entityType, stepKey } = {}) {
    if (contract && contract.spec && contract.schema) {
      return { ...contract, isOverride: true };
    }

    // A step key names the work, not the wire format. 'create-skus' submits
    // Products with their SKUs nested inside, so what this resolves is only a
    // hypothesis - identifySchema() checks it against the item before use.
    return (
      findContractByEntityType(entityType) ||
      findContractByEntityType(stepKey) ||
      null
    );
  }

  /**
   * Normalizes one row of Liferay's failed item report (a parsed CSV record)
   * into a stable shape. Column names vary between DXP versions, so every
   * known alias is accepted.
   */
  normalizeFailedItem(row, position) {
    if (row === null || typeof row !== 'object') {
      return {
        position,
        message: String(row ?? 'Unknown error'),
        externalReferenceCode: null,
        itemIndex: null,
        content: null,
        raw: row,
      };
    }

    const message =
      row.errorMessage ||
      row.error ||
      row.message ||
      row.exception ||
      'Unknown error';

    const externalReferenceCode =
      row.externalReferenceCode ||
      row.itemExternalReferenceCode ||
      row.erc ||
      null;

    const rawIndex = row.itemIndex ?? row.index ?? row.position ?? null;
    const parsedIndex = Number(rawIndex);
    const itemIndex =
      rawIndex !== null && rawIndex !== '' && Number.isFinite(parsedIndex)
        ? parsedIndex
        : null;

    return {
      position,
      message: String(message),
      externalReferenceCode: externalReferenceCode || null,
      itemIndex,
      content: row.content ?? row.item ?? row.payload ?? null,
      raw: row,
    };
  }

  /**
   * Normalizes whatever the submitted-content endpoint (or caller) provides
   * into a flat array of payload items.
   */
  normalizePayloadItems(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.items)) return payload.items;
    return [];
  }

  /** Parses an embedded failed item content blob, which may already be an object. */
  _parseContent(content) {
    if (!content) return null;
    if (typeof content === 'object') return content;
    if (typeof content !== 'string') return null;
    try {
      const parsed = JSON.parse(content);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  /**
   * Locates the submitted payload item behind a failed item report row.
   * @returns {{item: object|null, matchedBy: string}}
   */
  matchPayloadItem(failedItem, payloadItems, ercIndex) {
    const erc = failedItem.externalReferenceCode;
    if (erc && ercIndex.has(String(erc))) {
      return {
        item: ercIndex.get(String(erc)),
        matchedBy: 'externalReferenceCode',
      };
    }

    const embedded = this._parseContent(failedItem.content);
    if (embedded) {
      const embeddedErc = embedded.externalReferenceCode;
      if (embeddedErc && ercIndex.has(String(embeddedErc))) {
        return {
          item: ercIndex.get(String(embeddedErc)),
          matchedBy: 'embeddedExternalReferenceCode',
        };
      }
      return { item: embedded, matchedBy: 'failedItemReportContent' };
    }

    if (failedItem.itemIndex !== null && payloadItems.length > 0) {
      // Liferay is inconsistent about whether the reported index is 0- or
      // 1-based, so accept whichever interpretation lands inside the payload.
      const zeroBased = payloadItems[failedItem.itemIndex];
      if (zeroBased) return { item: zeroBased, matchedBy: 'itemIndex' };

      const oneBased = payloadItems[failedItem.itemIndex - 1];
      if (oneBased) return { item: oneBased, matchedBy: 'itemIndex(1-based)' };
    }

    return { item: null, matchedBy: 'unmatched' };
  }

  /** The item's own top-level field names, ignoring OpenAPI's x- extensions. */
  _itemFieldNames(payloadItem) {
    return Object.keys(payloadItem).filter((name) => !name.startsWith('x-'));
  }

  /** Every distinct contract worth considering as a description of an item. */
  _candidateContracts(assumedContract) {
    const validator = this.ctx?.contractValidator;
    const seen = new Set();
    const candidates = [];

    for (const contract of [
      assumedContract,
      ...Object.values(ENTITY_CONTRACTS),
    ]) {
      if (!contract) continue;

      const key = `${contract.spec}#${contract.schema}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // A placeholder spec declares almost nothing, so it can neither win a
      // shape comparison nor be ruled out by one.
      if (validator.isPlaceholderSpec?.(contract.spec)) continue;

      candidates.push({ spec: contract.spec, schema: contract.schema });
    }

    return candidates;
  }

  /**
   * Decides which schema actually describes a payload item.
   *
   * The step key is treated as a hypothesis and confirmed against the item's
   * top-level fields, because the two disagree whenever a batch nests one
   * entity inside another. Where the hypothesis is wrong the item's own shape
   * has to name the replacement unambiguously; where nothing does, the item is
   * reported as unassessed. A schema chosen by elimination would produce a
   * confident verdict against rules the item was never subject to, which reads
   * as a real defect and costs more than saying nothing.
   *
   * @param {{spec: string, schema: string}|null} assumedContract
   * @param {object} payloadItem
   * @returns {{contract: object|null, source: string, reason: string|null}}
   */
  identifySchema(assumedContract, payloadItem) {
    const validator = this.ctx?.contractValidator;

    if (assumedContract?.isOverride) {
      return {
        contract: assumedContract,
        source: SCHEMA_SOURCE.OVERRIDE,
        reason: null,
      };
    }

    // Without a way to read the specs there is nothing to confirm against, so
    // the hypothesis stands rather than every item becoming unassessable.
    if (typeof validator?.describeSchema !== 'function') {
      return {
        contract: assumedContract,
        source: SCHEMA_SOURCE.STEP_KEY_CONFIRMED,
        reason: null,
      };
    }

    const fieldNames = this._itemFieldNames(payloadItem);
    if (fieldNames.length === 0) {
      return {
        contract: null,
        source: SCHEMA_SOURCE.UNIDENTIFIED,
        reason: 'the payload item declares no fields to identify it by',
      };
    }

    const scored = this._candidateContracts(assumedContract)
      .map((contract) => {
        const definition = validator.describeSchema(
          contract.spec,
          contract.schema
        );
        if (!definition) return null;

        const declared = new Set(definition.properties);
        const matched = fieldNames.filter((name) => declared.has(name));
        return {
          contract,
          matched: matched.length,
          coverage: matched.length / fieldNames.length,
        };
      })
      .filter(Boolean);

    const best = scored.reduce(
      (leader, candidate) =>
        !leader || candidate.matched > leader.matched ? candidate : leader,
      null
    );

    const fieldCount = `${fieldNames.length} top-level field${
      fieldNames.length === 1 ? '' : 's'
    }`;
    const assumedMatched = scored.find(
      (candidate) =>
        assumedContract &&
        candidate.contract.spec === assumedContract.spec &&
        candidate.contract.schema === assumedContract.schema
    )?.matched;
    const assumption = assumedContract
      ? `the step suggested ${assumedContract.schema}, which declares ${
          assumedMatched ?? 0
        } of the item's ${fieldCount}`
      : 'no schema was suggested for this step';

    if (!best || best.matched === 0 || best.coverage < MIN_SHAPE_COVERAGE) {
      return {
        contract: null,
        source: SCHEMA_SOURCE.UNIDENTIFIED,
        reason: `no loaded schema describes this item - ${assumption}; fields seen: ${fieldNames.join(', ')}`,
      };
    }

    const leaders = scored.filter(
      (candidate) => candidate.matched === best.matched
    );

    // The step key is a real signal, so it wins its own ties; only a schema
    // that beats it outright is allowed to displace it.
    const assumedLeads = leaders.some(
      (candidate) =>
        assumedContract &&
        candidate.contract.spec === assumedContract.spec &&
        candidate.contract.schema === assumedContract.schema
    );

    if (assumedLeads) {
      return {
        contract: assumedContract,
        source: SCHEMA_SOURCE.STEP_KEY_CONFIRMED,
        reason: null,
      };
    }

    if (leaders.length > 1) {
      return {
        contract: null,
        source: SCHEMA_SOURCE.UNIDENTIFIED,
        reason: `the item's shape matches ${leaders
          .map((candidate) => candidate.contract.schema)
          .join(
            ' and '
          )} equally well, so no schema could be chosen - ${assumption}`,
      };
    }

    return {
      contract: best.contract,
      source: SCHEMA_SOURCE.PAYLOAD_SHAPE,
      reason: `it declares ${best.matched} of the item's ${fieldCount}, where ${assumption}`,
    };
  }

  /**
   * Runs a payload item back through ContractValidator, against the schema
   * that actually describes it rather than the one its step key named.
   *
   * @returns {{status: string, errors: Array, reason?: string,
   *   contract?: object|null, assumedContract?: object|null,
   *   schemaSource?: string}}
   */
  assessLocally(assumedContract, payloadItem) {
    const validator = this.ctx?.contractValidator;
    const unassessed = (reason, extra = {}) => ({
      status: LOCAL_ASSESSMENT.SKIPPED,
      errors: [],
      reason,
      contract: null,
      assumedContract: assumedContract || null,
      ...extra,
    });

    if (!validator) {
      return unassessed('No ContractValidator registered on the SDK context');
    }
    if (!assumedContract) {
      return unassessed('No OpenAPI contract is mapped for this entity type');
    }
    if (!payloadItem || typeof payloadItem !== 'object') {
      return unassessed(
        'Failed item could not be correlated with a submitted payload item'
      );
    }

    // A placeholder spec's schemas assert almost nothing, so validating against
    // one would report PASSED - and this report tells a human that means the
    // payload is contract-clean and the fault lies server-side. Say we could
    // not assess it instead of asserting something we did not check.
    if (
      typeof validator.isPlaceholderSpec === 'function' &&
      validator.isPlaceholderSpec(assumedContract.spec)
    ) {
      return unassessed(
        `${assumedContract.spec} is a placeholder spec (it declares no paths), so it cannot meaningfully assess ${assumedContract.schema} payloads - re-sync it with scripts/sync-schemas.js`,
        { schemaSource: SCHEMA_SOURCE.UNIDENTIFIED }
      );
    }

    const identified = this.identifySchema(assumedContract, payloadItem);

    if (!identified.contract) {
      return unassessed(identified.reason, { schemaSource: identified.source });
    }

    const contract = identified.contract;
    const provenance = {
      contract: { spec: contract.spec, schema: contract.schema },
      assumedContract: {
        spec: assumedContract.spec,
        schema: assumedContract.schema,
      },
      schemaSource: identified.source,
      schemaReason: identified.reason,
    };

    try {
      validator.validate(contract.spec, contract.schema, payloadItem);
      return { status: LOCAL_ASSESSMENT.PASSED, errors: [], ...provenance };
    } catch (error) {
      if (error.name !== 'ContractViolationError') {
        return unassessed(`Local validation could not run: ${error.message}`, {
          schemaSource: identified.source,
        });
      }

      return {
        status: LOCAL_ASSESSMENT.FAILED,
        message: error.message,
        errors: (error.errors || []).map((ajvError) => ({
          path: this._formatErrorPath(ajvError),
          keyword: ajvError.keyword,
          message: ajvError.message,
          params: ajvError.params,
        })),
        ...provenance,
      };
    }
  }

  /**
   * Renders an ajv error location as the payload path a developer can follow -
   * 'skus[3]' rather than '/skus/3'. Where a nested item is at fault, that
   * index is the whole of the actionable information.
   */
  _formatErrorPath(ajvError) {
    const instancePath = ajvError.instancePath || '';
    if (!instancePath) return ajvError.schemaPath || '';

    return instancePath
      .split('/')
      .filter(Boolean)
      .reduce(
        (path, segment) =>
          /^\d+$/.test(segment)
            ? `${path}[${segment}]`
            : path
              ? `${path}.${segment}`
              : segment,
        ''
      );
  }

  _verdictFor(assessment) {
    if (assessment.status === LOCAL_ASSESSMENT.FAILED) {
      return VERDICT.LOCALLY_PREVENTABLE;
    }
    if (assessment.status === LOCAL_ASSESSMENT.PASSED) {
      return VERDICT.SERVER_SIDE_ONLY;
    }
    return VERDICT.UNDIAGNOSED;
  }

  /**
   * Resolves the payload that was submitted for a batch, preferring what the
   * caller already has in memory over a (comparatively expensive) round trip
   * to the batch engine's submitted-content endpoint.
   * @returns {Promise<{items: Array, source: string}>}
   */
  async resolveSubmittedItems({
    config,
    batchId,
    submittedItems,
    fetchSubmittedContent = true,
  }) {
    const provided = this.normalizePayloadItems(submittedItems);
    if (provided.length > 0) return { items: provided, source: 'provided' };

    const liferay = this.ctx?.liferay;
    if (
      !fetchSubmittedContent ||
      !batchId ||
      typeof liferay?.getImportTaskSubmittedContent !== 'function'
    ) {
      return { items: [], source: 'unavailable' };
    }

    try {
      const content = await liferay.getImportTaskSubmittedContent(
        config,
        batchId
      );
      const items = this.normalizePayloadItems(content);
      return {
        items,
        source: items.length > 0 ? 'importTaskSubmittedContent' : 'unavailable',
      };
    } catch (error) {
      this.ctx?.logger?.warn(
        `Could not retrieve submitted content for batch ${batchId} while building the schema correlation report`,
        { batchId, error: error.message }
      );
      return { items: [], source: 'unavailable' };
    }
  }

  /**
   * Builds the Schema Correlation Report for a failed batch.
   *
   * @param {object} opts
   * @param {object} opts.config Liferay connection config
   * @param {string|number} opts.batchId downstream (Liferay) import task id
   * @param {string} [opts.batchERC] the SDK's batch external reference code
   * @param {string} [opts.stepKey] workflow step key
   * @param {string} [opts.entityType] normalized entity type
   * @param {Array} opts.failureReport rows from getImportTaskFailedItemReport
   * @param {Array} [opts.submittedItems] the payload items, when already known
   * @param {object} [opts.contract] explicit {spec, schema} override
   * @param {number} [opts.maxEntries] cap on correlated entries (default 25)
   * @param {boolean} [opts.fetchSubmittedContent] allow the submitted-content fetch
   */
  async correlate({
    config,
    batchId,
    batchERC = null,
    stepKey = null,
    entityType = null,
    failureReport = [],
    submittedItems = null,
    contract: contractOverride = null,
    maxEntries = DEFAULT_MAX_ENTRIES,
    fetchSubmittedContent = true,
  } = {}) {
    const rows = Array.isArray(failureReport) ? failureReport : [];
    const contract = this.resolveContract({
      contract: contractOverride,
      entityType,
      stepKey,
    });

    const { items: payloadItems, source: payloadSource } =
      await this.resolveSubmittedItems({
        config,
        batchId,
        submittedItems,
        fetchSubmittedContent,
      });

    const ercIndex = new Map();
    payloadItems.forEach((item) => {
      const erc = item && item.externalReferenceCode;
      if (erc && !ercIndex.has(String(erc))) ercIndex.set(String(erc), item);
    });

    const considered = rows.slice(0, Math.max(0, maxEntries));

    const entries = considered.map((row, index) => {
      const failedItem = this.normalizeFailedItem(row, index + 1);
      const { item, matchedBy } = this.matchPayloadItem(
        failedItem,
        payloadItems,
        ercIndex
      );
      const localAssessment = this.assessLocally(contract, item);

      return {
        position: failedItem.position,
        externalReferenceCode:
          failedItem.externalReferenceCode ||
          (item && item.externalReferenceCode) ||
          null,
        liferayError: {
          message: failedItem.message,
          itemIndex: failedItem.itemIndex,
          raw: failedItem.raw,
        },
        localAssessment,
        payloadItem: item,
        payloadMatchedBy: matchedBy,
        verdict: this._verdictFor(localAssessment),
      };
    });

    const countOf = (verdict) =>
      entries.filter((entry) => entry.verdict === verdict).length;

    return {
      batchId: batchId ?? null,
      batchERC,
      stepKey,
      entityType,
      contract: contract
        ? { spec: contract.spec, schema: contract.schema }
        : null,
      payloadSource,
      summary: {
        failedItemCount: rows.length,
        analyzedCount: entries.length,
        truncated: rows.length > entries.length,
        correlatedCount: entries.filter((entry) => entry.payloadItem).length,
        locallyPreventableCount: countOf(VERDICT.LOCALLY_PREVENTABLE),
        serverSideOnlyCount: countOf(VERDICT.SERVER_SIDE_ONLY),
        undiagnosedCount: countOf(VERDICT.UNDIAGNOSED),
      },
      entries,
    };
  }

  _formatLocalAssessment(localAssessment) {
    if (localAssessment.status === LOCAL_ASSESSMENT.FAILED) {
      const detail = localAssessment.errors
        .map((error) => `${error.path || '(root)'} ${error.message}`.trim())
        .join('; ');
      return `FAILED - ${detail || localAssessment.message}`;
    }
    if (localAssessment.status === LOCAL_ASSESSMENT.PASSED) {
      return 'PASSED - payload satisfies the Liferay OpenAPI contract';
    }
    // Deliberately not a verdict. A reader scanning a failed run has to be able
    // to tell "we checked and found nothing wrong" from "we could not check",
    // because only the first one licenses blaming the server.
    return `NOT ASSESSED - ${localAssessment.reason || 'no reason recorded'}`;
  }

  /**
   * Names the schema an item was actually assessed against, and says why that
   * one - so a reader can tell a verdict drawn from the right contract from a
   * step key's guess, without having to know the workflow's step names.
   */
  _formatSchemaApplied(localAssessment = {}) {
    const { contract, assumedContract, schemaSource, schemaReason } =
      localAssessment;

    if (!contract) {
      return assumedContract
        ? `none - ${assumedContract.schema} was suggested by the step but not applied`
        : 'none';
    }

    const applied = `${contract.schema} (${contract.spec})`;
    if (schemaSource === SCHEMA_SOURCE.PAYLOAD_SHAPE) {
      return `${applied} - ${schemaReason}`;
    }
    if (schemaSource === SCHEMA_SOURCE.OVERRIDE) {
      return `${applied} - named explicitly by the caller`;
    }
    return applied;
  }

  _formatPayloadItem(payloadItem, maxChars) {
    if (!payloadItem) return '(not correlated)';
    const json = JSON.stringify(payloadItem);
    return json.length > maxChars ? `${json.slice(0, maxChars)}...` : json;
  }

  /**
   * Renders a report as the human-facing "Liferay Error vs ContractValidator
   * Local Assessment vs Failed Payload Item" comparison.
   *
   * @param {object} report output of correlate()
   * @param {{maxPayloadChars?: number}} [options]
   * @returns {string}
   */
  formatReport(report, { maxPayloadChars = DEFAULT_PAYLOAD_CHARS } = {}) {
    if (!report) return 'Schema Correlation Report unavailable.';

    const { summary } = report;
    const lines = [];

    lines.push(
      `Schema Correlation Report - batch ${report.batchId ?? 'unknown'}${
        report.batchERC ? ` (${report.batchERC})` : ''
      }`
    );
    lines.push(
      `Step: ${report.stepKey || 'unknown'} | Entity: ${
        report.entityType || 'unknown'
      } | Contract suggested by the step: ${
        report.contract
          ? `${report.contract.schema} (${report.contract.spec})`
          : 'none mapped'
      }`
    );
    lines.push(
      `Failed items: ${summary.failedItemCount} | Analyzed: ${summary.analyzedCount}${
        summary.truncated ? ' (truncated)' : ''
      } | Correlated with payload: ${summary.correlatedCount}`
    );
    lines.push(
      `Locally preventable: ${summary.locallyPreventableCount} | Server-side only: ${summary.serverSideOnlyCount} | Undiagnosed: ${summary.undiagnosedCount}`
    );
    lines.push(`Payload source: ${report.payloadSource}`);

    for (const entry of report.entries) {
      lines.push('');
      lines.push(
        `[${entry.position}] ${
          entry.externalReferenceCode
            ? `ERC ${entry.externalReferenceCode}`
            : 'ERC unknown'
        } -> ${entry.verdict}`
      );
      lines.push(
        `    Liferay Error ............ ${entry.liferayError.message}`
      );
      lines.push(
        `    Local Assessment ......... ${this._formatLocalAssessment(
          entry.localAssessment
        )}`
      );
      lines.push(
        `    Schema Applied ........... ${this._formatSchemaApplied(
          entry.localAssessment
        )}`
      );
      lines.push(
        `    Failed Payload Item ...... ${this._formatPayloadItem(
          entry.payloadItem,
          maxPayloadChars
        )} [matched by: ${entry.payloadMatchedBy}]`
      );
    }

    return lines.join('\n');
  }
}

module.exports = SchemaCorrelationService;
module.exports.VERDICT = VERDICT;
module.exports.LOCAL_ASSESSMENT = LOCAL_ASSESSMENT;
module.exports.SCHEMA_SOURCE = SCHEMA_SOURCE;
