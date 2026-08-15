const { findContractByEntityType } = require('../utils/contractMappings.cjs');

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

const DEFAULT_MAX_ENTRIES = 25;
const DEFAULT_PAYLOAD_CHARS = 600;

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
    if (contract && contract.spec && contract.schema) return contract;
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

  /**
   * Runs a payload item back through ContractValidator.
   * @returns {{status: string, errors: Array, reason?: string}}
   */
  assessLocally(contract, payloadItem) {
    const validator = this.ctx?.contractValidator;

    if (!validator) {
      return {
        status: LOCAL_ASSESSMENT.SKIPPED,
        errors: [],
        reason: 'No ContractValidator registered on the SDK context',
      };
    }
    if (!contract) {
      return {
        status: LOCAL_ASSESSMENT.SKIPPED,
        errors: [],
        reason: 'No OpenAPI contract is mapped for this entity type',
      };
    }
    if (!payloadItem || typeof payloadItem !== 'object') {
      return {
        status: LOCAL_ASSESSMENT.SKIPPED,
        errors: [],
        reason:
          'Failed item could not be correlated with a submitted payload item',
      };
    }

    // A placeholder spec's schemas assert almost nothing, so validating against
    // one would report PASSED - and this report tells a human that means the
    // payload is contract-clean and the fault lies server-side. Say we could
    // not assess it instead of asserting something we did not check.
    if (
      typeof validator.isPlaceholderSpec === 'function' &&
      validator.isPlaceholderSpec(contract.spec)
    ) {
      return {
        status: LOCAL_ASSESSMENT.SKIPPED,
        errors: [],
        reason: `${contract.spec} is a placeholder spec (it declares no paths), so it cannot meaningfully assess ${contract.schema} payloads - re-sync it with scripts/sync-schemas.js`,
      };
    }

    try {
      validator.validate(contract.spec, contract.schema, payloadItem);
      return { status: LOCAL_ASSESSMENT.PASSED, errors: [] };
    } catch (error) {
      if (error.name !== 'ContractViolationError') {
        return {
          status: LOCAL_ASSESSMENT.SKIPPED,
          errors: [],
          reason: `Local validation could not run: ${error.message}`,
        };
      }

      return {
        status: LOCAL_ASSESSMENT.FAILED,
        message: error.message,
        errors: (error.errors || []).map((ajvError) => ({
          path: ajvError.instancePath || ajvError.schemaPath || '',
          keyword: ajvError.keyword,
          message: ajvError.message,
          params: ajvError.params,
        })),
      };
    }
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
    return `SKIPPED - ${localAssessment.reason || 'not assessed'}`;
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
      } | Contract: ${
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
