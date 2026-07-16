const { logger } = require('../../utils/logger.cjs');
const { ERC_PREFIX, ENV } = require('../../utils/constants.cjs');
const { createERC } = require('../../utils/misc.cjs');

class BatchDeleteService {
  constructor(ctx, http, batch) {
    this.ctx = ctx;
    this.http = http;
    this.batch = batch;
  }

  _chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  _stringifySafe(obj) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return '[Unserializable object]';
    }
  }

  _getBaseCallbackUrl(config, session = null) {
    if (process.env.LIFERAY_BATCH_CALLBACK_URL) {
      return process.env.LIFERAY_BATCH_CALLBACK_URL;
    }
    const url =
      config?.microserviceUrl ||
      session?.context?.config?.microserviceUrl ||
      session?.context?.microserviceUrl ||
      session?.context?.microserviceURL ||
      ENV.MICROSERVICE_URL;

    if (!url) {
      const loggerToUse =
        this.ctx?.logger || require('../../utils/logger.cjs').logger;
      loggerToUse.warn(
        'microserviceUrl is not configured. Callbacks will likely fail.'
      );
      return null;
    }
    return `${url}/api/v1/batch/callback`;
  }

  _buildCallbackURL(baseUrl, meta = {}) {
    if (!baseUrl) return null;
    try {
      const u = new URL(baseUrl);
      const batchERC = meta.batchExternalReferenceCode || meta.batchERC;
      if (batchERC) {
        u.searchParams.set('batchERC', String(batchERC));
      }
      return u.toString();
    } catch {
      return baseUrl;
    }
  }

  async _deleteBatchNative(
    config,
    {
      entityName,
      ids,
      externalReferenceCode,
      dryRun,
      sessionId,
      session = null,
      path,
      op,
      friendly,
      idField = 'id',
    }
  ) {
    const { logger } = this.ctx;

    const prefixKey = `${entityName.toUpperCase()}_BATCH`;
    const batchERC =
      externalReferenceCode ??
      createERC(ERC_PREFIX[prefixKey] || ERC_PREFIX.BATCH);

    const taggedCallback = this._buildCallbackURL(
      this._getBaseCallbackUrl(config, session),
      {
        entity: entityName,
        op: 'delete',
        batchERC,
        sessionId,
        correlationId: config?.correlationId || session?.correlationId,
      }
    );

    const batchUrl = path(taggedCallback);

    logger.debug(`Submitting batch delete for ${entityName}`, {
      count: ids.length,
      dryRun,
      callbackUrl: taggedCallback || 'none',
      externalReferenceCode: batchERC,
    });

    const res = await this._deleteByBatch(config, {
      batchUrl,
      ids,
      batchSize: config.batchSize,
      dryRun,
      op: op,
      friendly: friendly,
      idField,
    });
    res.batchRefs = (res.batchRefs || []).map((r) => ({ ...r, erc: batchERC }));
    return res;
  }

  async _deleteByBatch(
    config,
    {
      batchUrl,
      ids,
      batchSize = 100,
      dryRun = false,
      op,
      friendly,
      idField = 'id',
    }
  ) {
    if (!ids || ids.length === 0) return { success: true, count: 0 };

    const chunks = this._chunkArray(ids, batchSize);
    const batchRefs = [];

    for (const chunk of chunks) {
      const payload = chunk.map((id) => ({ [idField]: id }));

      if (dryRun) {
        logger.info(`[DRY RUN] Would delete batch of ${chunk.length} items`, {
          url: batchUrl,
        });
        batchRefs.push({
          taskId: `dry-run-${crypto.randomUUID()}`,
          count: chunk.length,
        });
        continue;
      }

      const res = await this.http._delete(
        config,
        batchUrl,
        payload,
        op,
        friendly
      );
      batchRefs.push({ taskId: res.id, count: chunk.length });
    }

    return {
      success: true,
      count: ids.length,
      batchRefs,
    };
  }

  async _deleteByIds(
    config,
    {
      baseDeletePath,
      ids,
      concurrency = 5,
      retryOn = [404],
      dryRun = false,
      op,
      friendly,
    }
  ) {
    if (!ids || ids.length === 0) return { success: true, count: 0 };

    let deletedCount = 0;
    const errors = [];
    const maxErrors = ENV.LIFERAY_MAX_DELETION_ERRORS || 3;

    const chunks = this._chunkArray(ids, concurrency);

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (id) => {
          const url = `${baseDeletePath}/${id}`;
          if (dryRun) {
            logger.info(`[DRY RUN] Would delete entity at ${url}`);
            deletedCount++;
            return;
          }

          try {
            await this.http._delete(config, url, null, op, friendly);
            deletedCount++;
          } catch (err) {
            if (retryOn && retryOn.includes(err.status)) {
              logger.debug(`Ignored error ${err.status} deleting ${url}`);
              deletedCount++; // Count as "processed"
              return;
            }
            errors.push({ id, error: err.message });
          }
        })
      );

      if (errors.length >= maxErrors) {
        logger.error(
          `Stopping deletion loop: encountered ${errors.length} errors (threshold: ${maxErrors})`
        );
        throw new Error(
          `Deletion failed: encountered ${errors.length} errors. Last error: ${errors[errors.length - 1].error}`
        );
      }
    }

    return {
      success: errors.length === 0,
      count: deletedCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async _deleteBatchSimulated(
    config,
    { entityName, ids, dryRun, basePath, op, friendly, concurrency, retryOn }
  ) {
    const { logger } = this.ctx;

    logger.debug(`Submitting simulated batch delete for ${entityName}`, {
      count: ids.length,
      dryRun,
    });

    return await this._deleteByIds(config, {
      baseDeletePath: basePath,
      ids: ids,
      concurrency: concurrency,
      retryOn: retryOn,
      dryRun,
      op: op,
      friendly: friendly,
    });
  }
}
module.exports = BatchDeleteService;
