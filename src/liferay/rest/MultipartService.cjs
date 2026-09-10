const { PATH } = require('../../utils/liferayPaths.cjs');
const { createERC, delay } = require('../../utils/misc.cjs');
const { ERC_PREFIX, ENV } = require('../../utils/constants.cjs');
const { ErrorHandler } = require('../../utils/expressErrorHandler.cjs');
const { logger } = require('../../utils/logger.cjs');
const FormData = require('form-data');
const fs = require('fs');
const nodePath = require('path');

/**
 * How a site-initializer upload failed, by the status Liferay answered with.
 *
 * The issue (peterrichards-lr/liferay-demo-accelerator#65) asks for "detailed
 * response status codes" to be parsed because these four failures are
 * indistinguishable from the status alone once a caller has a generic
 * LiferayRequestError in hand: a 404 means the ERC was never created and the
 * bug is upstream, while a 400 means the bundle itself is wrong and the
 * response body names the offending entry.
 */
const UPLOAD_FAILURE_KIND = {
  400: 'malformed-bundle',
  401: 'unauthorized',
  403: 'unauthorized',
  404: 'no-such-site',
  413: 'payload-too-large',
};

/** Renders whatever Liferay put in the body as something a message can carry. */
function describeResponseBody(body) {
  if (body === undefined || body === null || body === '') return null;
  if (typeof body === 'string') return body;
  try {
    return JSON.stringify(body);
  } catch {
    return null;
  }
}

class MultipartService {
  constructor(ctx, http) {
    this.ctx = ctx;
    this.http = http;
  }

  /**
   * `headers` and `maxRetries` are optional and default to today's behaviour,
   * so the product-media callers below are untouched. A streamed body passes
   * `maxRetries: 1` - see `_putMultipart` for why (LDM#65).
   */
  async _postMultipart(
    config,
    url,
    formData,
    op,
    friendly,
    { headers = {}, maxRetries } = {}
  ) {
    return await this.http._request(config, {
      method: 'POST',
      url,
      data: formData,
      headers: { ...formData.getHeaders(), ...headers },
      op,
      friendly,
      maxRetries,
    });
  }

  /**
   * The PUT counterpart of `_postMultipart`, added for
   * peterrichards-lr/liferay-demo-accelerator#65.
   *
   * A sibling rather than a `method` parameter on `_postMultipart`, because the
   * REST drift gate reads the verb off the helper's *name*
   * (`HTTP_HELPER_METHODS` in scripts/validate-rest-paths.cjs). Making the verb
   * a runtime argument would leave every multipart call site looking like a
   * POST to the gate, so a PUT against a POST-only template - the class of bug
   * #184 exists to catch - would sail through. One extra six-line method buys a
   * statically checkable call site.
   *
   * `maxRetries` defaults to 1: `data` here is a single-use stream, and
   * `_request`'s retry loop resends the object it was handed, which for a
   * consumed stream means a silently truncated upload. Retrying is the caller's
   * job, because only the caller can build a fresh stream - see
   * `uploadSiteInitializer`.
   */
  async _putMultipart(
    config,
    url,
    formData,
    op,
    friendly,
    { headers = {}, maxRetries = 1 } = {}
  ) {
    return await this.http._request(config, {
      method: 'PUT',
      url,
      data: formData,
      headers: { ...formData.getHeaders(), ...headers },
      op,
      friendly,
      maxRetries,
    });
  }

  /**
   * Opens the bundle as a readable stream, and reports its size when disk can
   * be asked for it.
   *
   * Returns a factory rather than a stream: a stream is consumed by the attempt
   * that sends it, so a retry needs a new one. When the caller supplied the
   * stream itself there is nothing to reopen, and `reopenable` says so - that
   * is what stops a retry from resending an exhausted body.
   */
  _openBundleSource({ zipPath, zipStream, fileName, knownLength }) {
    if (zipPath) {
      const stats = fs.statSync(zipPath);
      if (!stats.isFile()) {
        throw new Error(`Site initializer bundle is not a file: ${zipPath}`);
      }
      return {
        reopenable: true,
        // Sized from disk so Content-Length can be set, which is what makes a
        // truncated transfer detectable by Liferay rather than accepted (LDM#65).
        byteLength: stats.size,
        fileName: fileName || nodePath.basename(zipPath),
        open: () => fs.createReadStream(zipPath),
      };
    }

    if (zipStream) {
      if (typeof zipStream.pipe !== 'function') {
        throw new Error(
          'uploadSiteInitializer: zipStream must be a readable stream. Pass zipPath to have the SDK open one.'
        );
      }
      return {
        reopenable: false,
        byteLength:
          typeof knownLength === 'number' && knownLength >= 0
            ? knownLength
            : null,
        fileName: fileName || 'site-initializer.zip',
        open: () => zipStream,
      };
    }

    throw new Error(
      'uploadSiteInitializer: one of zipPath or zipStream is required'
    );
  }

  /**
   * Builds the multipart body for one attempt.
   *
   * The stream goes to `form-data` as a stream. Reading the bundle into a
   * Buffer first would defeat the whole point of LDM#65 - a generated initializer
   * with documents and imagery runs to tens of MB - so nothing here ever calls
   * readFileSync.
   */
  _buildBundleForm(source, site) {
    const formData = new FormData();
    const stream = source.open();

    const options = {
      filename: source.fileName,
      contentType: 'application/zip',
    };
    if (source.byteLength !== null) {
      options.knownLength = source.byteLength;
    }
    formData.append('file', stream, options);

    if (site !== undefined) {
      formData.append('site', JSON.stringify(site), {
        contentType: 'application/json',
      });
    }

    const headers = {};
    if (source.byteLength !== null) {
      try {
        headers['Content-Length'] = formData.getLengthSync();
      } catch {
        // Only reachable if a part of unknown length slipped in; chunked
        // encoding still delivers the bundle, it is just not length-checked.
      }
    }

    return { formData, stream, headers };
  }

  /** Releases the file handle an attempt opened, on every failure path (LDM#65). */
  _destroyBundleStream(stream) {
    if (stream && typeof stream.destroy === 'function' && !stream.destroyed) {
      stream.destroy();
    }
  }

  /**
   * Turns a generic LiferayRequestError into one that names what went wrong,
   * carrying Liferay's own explanation in the message.
   *
   * `_request` only lifts `detail`/`title` out of an RFC 7807 body; a site
   * initializer import failure answers with a plain-text body naming the entry
   * it choked on, which would otherwise survive only in `err.response.data`
   * where no log line shows it.
   */
  _describeUploadFailure(err, { externalReferenceCode, byteLength }) {
    const status = err?.response?.status ?? err?.status;
    const body = describeResponseBody(err?.response?.data);
    const kind = status
      ? UPLOAD_FAILURE_KIND[status] || (status >= 500 ? 'server' : 'rejected')
      : 'network';

    err.siteInitializer = {
      externalReferenceCode,
      kind,
      status: status ?? null,
      byteLength,
      responseBody: err?.response?.data ?? null,
    };

    const parts = [
      `Site initializer upload failed for "${externalReferenceCode}"`,
    ];
    if (status) parts.push(`(HTTP ${status}, ${kind})`);
    else parts.push(`(${kind})`);
    if (kind === 'payload-too-large' && byteLength !== null) {
      parts.push(`- bundle was ${byteLength} bytes`);
    }
    if (body) parts.push(`- ${body}`);

    err.message = parts.join(' ');
    err.userMessage = err.message;

    return err;
  }

  /**
   * Uploads a packaged site initializer bundle to an existing site, streaming
   * it rather than buffering it (peterrichards-lr/liferay-demo-accelerator#65).
   *
   * PUT by external reference code is an upsert, so re-uploading the same ERC
   * updates that site instead of creating a second one.
   *
   * The metadata part the issue asks for is deliberately not sent here:
   * `PutSiteSiteInitializerRequestBody` in headless-admin-site v1.0 declares
   * `file` alone. Metadata is only accepted when the site is created, by
   * `createSiteFromInitializer` below, so passing it here is a caller bug and
   * is refused rather than silently dropped on the floor.
   *
   * @param {object} config Liferay connection config.
   * @param {string} externalReferenceCode ERC of the site to upsert.
   * @param {object} options
   * @param {string} [options.zipPath] Path to the bundle. Preferred: it is the
   *   only form a retry can reopen.
   * @param {import('stream').Readable} [options.zipStream] An already-open
   *   bundle. Never retried, because it cannot be rewound.
   * @param {string} [options.fileName] Overrides the multipart filename.
   * @param {number} [options.knownLength] Size of `zipStream`, if known.
   * @param {number} [options.maxRetries] Attempts on a retryable failure.
   * @returns {Promise<object>} The Site Liferay returned.
   */
  async uploadSiteInitializer(
    config,
    externalReferenceCode,
    {
      zipPath,
      zipStream,
      fileName,
      knownLength,
      site,
      maxRetries: maxRetriesOverride,
    } = {}
  ) {
    if (!externalReferenceCode) {
      throw new Error(
        'uploadSiteInitializer: an external reference code is required'
      );
    }

    if (site !== undefined) {
      throw new Error(
        'uploadSiteInitializer: the PUT site-initializer endpoint declares only a "file" part. ' +
          'Use createSiteFromInitializer to send site metadata.'
      );
    }

    const source = this._openBundleSource({
      zipPath,
      zipStream,
      fileName,
      knownLength,
    });

    // The PATH expression stays in the argument list of the helper that sends
    // it rather than being hoisted into `_sendBundle`. scripts/validate-rest-paths.cjs
    // resolves a call's path statically from that argument, and a `url`
    // variable passed down a frame resolves to nothing - which would put this
    // PUT in the unverifiable bucket, and #184's method check is the whole
    // reason to prefer a named `_putMultipart` in the first place.
    return await this._sendBundle(config, {
      source,
      externalReferenceCode,
      op: 'upload-site-initializer',
      maxRetriesOverride,
      send: (formData, headers) =>
        this._putMultipart(
          config,
          PATH.SITE_INITIALIZER(externalReferenceCode),
          formData,
          'upload-site-initializer',
          'Failed to upload site initializer',
          { headers, maxRetries: 1 }
        ),
    });
  }

  /**
   * Creates a site from a site-initializer bundle, streaming the bundle and
   * sending the `site` metadata part alongside it.
   *
   * This is where the `site` + `file` pairing LDM#65 describes actually lives:
   * only `PostSiteSiteInitializerRequestBody` declares both.
   */
  async createSiteFromInitializer(
    config,
    {
      zipPath,
      zipStream,
      fileName,
      knownLength,
      site,
      maxRetries: maxRetriesOverride,
    } = {}
  ) {
    if (!site || typeof site !== 'object') {
      throw new Error(
        'createSiteFromInitializer: site metadata is required to create a site'
      );
    }

    const source = this._openBundleSource({
      zipPath,
      zipStream,
      fileName,
      knownLength,
    });

    return await this._sendBundle(config, {
      source,
      site,
      externalReferenceCode: site.externalReferenceCode || '(new site)',
      op: 'create-site-from-initializer',
      maxRetriesOverride,
      send: (formData, headers) =>
        this._postMultipart(
          config,
          PATH.SITE_INITIALIZER_CREATE,
          formData,
          'create-site-from-initializer',
          'Failed to create site from site initializer',
          { headers, maxRetries: 1 }
        ),
    });
  }

  /**
   * Sends a bundle, rebuilding the body from scratch on every attempt.
   *
   * The retry lives here rather than in `_request` because only this frame
   * knows how to reopen the file. A retryable failure with nothing to reopen
   * (the caller handed in a live stream) is thrown rather than retried: a
   * silently truncated site is worse than a failed upload.
   */
  async _sendBundle(
    config,
    { send, source, site, externalReferenceCode, op, maxRetriesOverride }
  ) {
    const configured =
      maxRetriesOverride !== undefined
        ? maxRetriesOverride
        : parseInt(ENV.LIFERAY_API_MAX_RETRIES, 10) || 3;

    const maxAttempts = source.reopenable ? Math.max(1, configured) : 1;

    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const { formData, stream, headers } = this._buildBundleForm(source, site);

      try {
        return await send(formData, headers);
      } catch (err) {
        this._destroyBundleStream(stream);
        lastError = err;

        const canRetry =
          attempt < maxAttempts && ErrorHandler.isRetryableError(err);

        if (!canRetry) break;

        const baseDelay =
          parseInt(process.env.LIFERAY_RETRY_DELAY_MS, 10) ||
          parseInt(ENV.LIFERAY_RETRY_DELAY_MS, 10) ||
          2000;

        logger.warn(
          `Site initializer upload failed (${op}), retrying ${attempt}/${maxAttempts} with a fresh stream`,
          {
            correlationId: config?.correlationId,
            externalReferenceCode,
            status: err?.response?.status,
          }
        );

        await delay(baseDelay * attempt);
      }
    }

    throw this._describeUploadFailure(lastError, {
      externalReferenceCode,
      byteLength: source.byteLength,
    });
  }

  async addProductImageMultipart(
    config,
    productId,
    { fileStream, fileName, title, priority = 1 }
  ) {
    const formData = new FormData();
    formData.append('file', fileStream, fileName);

    const metadata = {
      title: typeof title === 'object' ? title : { en_US: title || fileName },
      priority,
    };
    formData.append('metadata', JSON.stringify(metadata), {
      contentType: 'application/json',
    });

    return await this._postMultipart(
      config,
      PATH.PRODUCT_IMAGES(productId),
      formData,
      'add-product-image-multipart',
      'Failed to add product image via multipart'
    );
  }

  async addProductDocumentAttachmentMultipart(
    config,
    productId,
    { fileStream, fileName, title, priority = 1 }
  ) {
    const formData = new FormData();
    formData.append('file', fileStream, fileName);

    const metadata = {
      title: typeof title === 'object' ? title : { en_US: title || fileName },
      priority,
    };
    formData.append('metadata', JSON.stringify(metadata), {
      contentType: 'application/json',
    });

    return await this._postMultipart(
      config,
      PATH.PRODUCT_ATTACHMENTS(productId),
      formData,
      'add-product-document-attachment-multipart',
      'Failed to add product document attachment via multipart'
    );
  }

  async addProductImage(config, productId, image) {
    return await this.http._post(
      config,
      PATH.PRODUCT_IMAGES_BY_URL(productId),
      image,
      'add-product-image',
      'Failed to add product image'
    );
  }

  async addProductDocumentAttachment(config, productId, attachment) {
    return await this.http._post(
      config,
      PATH.PRODUCT_ATTACHMENTS_BY_URL(productId),
      attachment,
      'add-product-document-attachment',
      'Failed to add product document attachment'
    );
  }

  async addProductImageByBase64(config, productERC, image) {
    return await this.http._post(
      config,
      PATH.PRODUCT_IMAGES_BY_BASE64(productERC),
      image,
      'add-product-image-by-base64',
      'Failed to add product image by base64'
    );
  }

  async addProductDocumentAttachmentByBase64(config, productERC, attachment) {
    return await this.http._post(
      config,
      PATH.PRODUCT_ATTACHMENTS_BY_BASE64(productERC),
      attachment,
      'add-product-document-attachment-by-base64',
      'Failed to add product document attachment by base64'
    );
  }

  async addProductImageDocumentLibrary(
    config,
    productId,
    { documentId, title, priority = 1 }
  ) {
    const payload = {
      externalReferenceCode: createERC(ERC_PREFIX.IMAGE),
      priority,
      title: typeof title === 'object' ? title : { en_US: title },
      type: 2, // 2 is typically the type for Document Library entries in some Liferay versions, or we use standard URL pattern
      src: documentId, // The internal ID or UUID depending on the endpoint expectation
    };

    return await this.http._post(
      config,
      PATH.PRODUCT_IMAGES(productId),
      payload,
      'add-product-image-dl',
      'Failed to add product image via Document Library'
    );
  }

  async addProductDocumentAttachmentDocumentLibrary(
    config,
    productId,
    { documentId, title, priority = 1 }
  ) {
    const payload = {
      externalReferenceCode: createERC(ERC_PREFIX.ATTACHMENT),
      priority,
      title: typeof title === 'object' ? title : { en_US: title },
      type: 2,
      src: documentId,
    };

    return await this.http._post(
      config,
      PATH.PRODUCT_ATTACHMENTS(productId),
      payload,
      'add-product-attachment-dl',
      'Failed to add product attachment via Document Library'
    );
  }
}
module.exports = MultipartService;
