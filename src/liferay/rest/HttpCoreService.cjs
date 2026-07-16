const { resolveEffectiveLiferayConnection } = require('../../utils/liferayEnv.cjs');
const axios = require('axios');
const fs = require('fs');
const { logger } = require('../../utils/logger.cjs');
const { PATH, CUSTOM_OBJECTS } = require('../../utils/liferayPaths.cjs');
const { ERC_PREFIX, ENV } = require('../../utils/constants.cjs');
const { findContract } = require('../../utils/contractMappings.cjs');
const { delay, createERC } = require('../../utils/misc.cjs');
const { ErrorHandler } = require('../../utils/expressErrorHandler.cjs');
const { SOFT_STATUS_BY_OP } = require('./config.cjs');

class HttpCoreService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async _request(
    config,
    {
      method = 'GET',
      url,
      data,
      params,
      headers,
      op,
      friendly,
      fullResponse = false,
      responseType = 'json',
      maxRetries: maxRetriesOverride,
    } = {}
  ) {
    // RUNTIME CONTRACT VALIDATION
    if (data && (ENV.NODE_ENV === 'development' || ENV.NODE_ENV === 'test')) {
      const contract = findContract(url, method);
      if (contract && !contract.isBatch && this.ctx.contractValidator) {
        try {
          if (contract.isArray) {
            this.ctx.contractValidator.validateArray(
              contract.spec,
              contract.schema,
              data
            );
          } else {
            this.ctx.contractValidator.validate(
              contract.spec,
              contract.schema,
              data
            );
          }
        } catch (err) {
          if (err.name === 'ContractViolationError') {
            this.ctx.logger.error(
              `Outbound request to ${url} violates Liferay OpenAPI contract`,
              {
                op,
                schema: contract.schema,
                errors: err.errors,
              }
            );
            // In development/test, we want to fail fast to catch schema drifts.
            throw err;
          }
        }
      }
    }

    const maxRetries = Math.max(
      1,
      maxRetriesOverride !== undefined
        ? maxRetriesOverride
        : parseInt(ENV.LIFERAY_API_MAX_RETRIES, 10) || 3
    );

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const client = await this._client(config);

        if (
          data &&
          (method === 'POST' || method === 'PATCH' || method === 'PUT')
        ) {
          const raw = JSON.stringify(data);
          logger.trace(
            `Outbound payload structure (${op}): ${raw.substring(0, 1000)}...`,
            { correlationId: config?.correlationId }
          );
        }

        logger.debug('Liferay API Request', {
          operation: op,
          method,
          url,
          correlationId: config?.correlationId,
          data: this._stringifySafe(data),
        });

        const res = await client.request({
          method,
          url,
          data,
          params,
          headers,
          responseType,
          timeout: 30000, // 30 second timeout
        });

        const logData = {
          operation: op,
          status: res.status,
          correlationId: config?.correlationId,
        };

        if (res.data) {
          if (Array.isArray(res.data.items)) {
            logData.itemCount = res.data.items.length;
            logData.totalCount = res.data.totalCount;
          } else if (typeof res.data === 'object') {
            logData.dataKeys = Object.keys(res.data);
          }
        }

        logger.debug('Liferay API Response', {
          ...logData,
          correlationId: config?.correlationId,
        });

        // INBOUND RESPONSE CONTRACT VALIDATION
        const shouldValidateInbound =
          config.validateInboundResponse ||
          (ENV.NODE_ENV === 'development' && !process.env.VITEST);

        if (res.data && shouldValidateInbound) {
          const contract = findContract(url, method);
          if (contract && contract.isInbound && this.ctx.contractValidator) {
            try {
              if (contract.isPage) {
                if (Array.isArray(res.data.items)) {
                  this.ctx.contractValidator.validateArray(
                    contract.spec,
                    contract.schema,
                    res.data.items
                  );
                }
              } else {
                this.ctx.contractValidator.validate(
                  contract.spec,
                  contract.schema,
                  res.data
                );
              }
              logger.debug(
                `Inbound response from ${url} conforms to Liferay OpenAPI contract`,
                {
                  op,
                  schema: contract.schema,
                }
              );
            } catch (err) {
              if (err.name === 'ContractViolationError') {
                logger.error(
                  `Inbound response from ${url} violates Liferay OpenAPI contract`,
                  {
                    op,
                    schema: contract.schema,
                    errors: err.errors,
                  }
                );
                throw err;
              }
            }
          }
        }

        if (fullResponse) {
          return {
            data: res.data,
            headers: res.headers || {},
            status: res.status,
            statusText: res.statusText,
          };
        }

        return res.data;
      } catch (err) {
        if (err.name === 'ContractViolationError') {
          throw err;
        }
        // Determine if we should retry
        const isRetryable =
          err.name !== 'ContractViolationError' &&
          ErrorHandler.isRetryableError(err) &&
          attempt < maxRetries;

        if (isRetryable) {
          const baseDelay =
            parseInt(process.env.LIFERAY_RETRY_DELAY_MS, 10) ||
            parseInt(ENV.LIFERAY_RETRY_DELAY_MS, 10) ||
            2000;
          const retryDelay = baseDelay * attempt;
          logger.warn(
            `Liferay API request failed (${op}), retrying ${attempt}/${maxRetries} in ${retryDelay}ms: ${err.message}`,
            {
              correlationId: config?.correlationId,
              status: err.response?.status,
            }
          );
          await delay(retryDelay);
          continue;
        }

        const hasHTTPResponse = !!err?.response;
        const res = err.response;

        const status = hasHTTPResponse ? res.status : undefined;
        const statusText = hasHTTPResponse ? res.statusText : undefined;
        const resHeaders = hasHTTPResponse ? res.headers || {} : {};
        const body = hasHTTPResponse ? res.data : undefined;

        const problem =
          hasHTTPResponse && body && typeof body === 'object'
            ? {
                status: body.status,
                title: body.title,
                type: body.type,
                detail: body.detail,
                errorReference:
                  body.errorReference ||
                  resHeaders['x-liferay-error-reference'],
              }
            : null;

        const existingRef =
          problem?.errorReference ||
          err?.errorReference ||
          err?.response?.headers?.['x-liferay-error-reference'];

        const errorReference = existingRef || createERC(ERC_PREFIX.ERROR);

        const detailMsg =
          (hasHTTPResponse && (problem?.detail || problem?.title)) ||
          friendly ||
          statusText ||
          err?.message ||
          'Request failed';

        if (hasHTTPResponse && op && SOFT_STATUS_BY_OP[op]?.includes(status)) {
          logger?.info?.('Soft HTTP status treated as empty result', {
            op,
            method,
            url,
            status,
            errorReference,
            problem,
            responseBody:
              typeof body === 'string'
                ? body
                : body
                  ? this._stringifySafe(body)
                  : null,
          });

          const softResult = this._buildSoftFallback(op, status);

          if (fullResponse) {
            return {
              data: softResult,
              headers: resHeaders,
              status,
              statusText,
            };
          }

          return softResult;
        }

        if (hasHTTPResponse) {
          logger?.error?.('Request failed (HTTP error)', {
            op,
            friendly,
            method,
            url,
            params,
            status,
            statusText,
            correlationId: config?.correlationId,
            errorReference,
            problem,
            responseBody:
              typeof body === 'string'
                ? body
                : body
                  ? this._stringifySafe(body)
                  : null,
            headers,
            responseHeaders: resHeaders,
          });
        } else {
          logger?.error?.('Request failed (no response from server)', {
            op,
            friendly,
            method,
            url,
            params,
            correlationId: config?.correlationId,
            errorReference,
            errorName: err?.name,
            errorCode: err?.code,
            message: err?.message,
            stack: err?.stack,
          });
        }

        const e = new Error(friendly || op || 'Request failed');
        e.name = 'LiferayRequestError';

        if (hasHTTPResponse) {
          e.status = status;
          e.statusText = statusText;
        }

        e.errorReference = errorReference;
        e.problem = problem || null;
        e.operation = op || friendly || 'request';
        e.userMessage = detailMsg;
        e.response = hasHTTPResponse
          ? { status, statusText, headers: resHeaders, data: body }
          : null;
        e.request = {
          method,
          url,
          params,
          hasData: !!data,
        };

        if (!hasHTTPResponse && err?.code) {
          e.networkCode = err.code;
        }

        throw e;
      }
    }
  }

  async _client(config) {
    const { persistence } = this.ctx;
    const effective = resolveEffectiveLiferayConnection(
      { ...this.ctx, ...config },
      this.ctx.oauth,
      persistence
    );
    return this.createAxiosInstance(effective);
  }

  async _get(config, url, op, friendly, opts = {}, fullResponse = false) {
    const { params, headers, responseType, maxRetries } = opts || {};

    const paramsSerializer = (p) =>
      new URLSearchParams(
        Object.entries(p || {}).filter(
          ([, v]) => v !== undefined && v !== null && v !== ''
        )
      ).toString();

    const qs = paramsSerializer(params);
    const finalUrl = qs ? `${url}${url.includes('?') ? '&' : '?'}${qs}` : url;

    logger.trace('http:get', { url: finalUrl, params });

    return this._request(config, {
      method: 'GET',
      url: finalUrl,
      headers,
      op,
      friendly,
      fullResponse,
      responseType,
      maxRetries,
    });
  }

  async _post(
    config,
    url,
    data,
    op,
    friendly,
    onError = 'throw',
    fullResponse = false
  ) {
    return this._request(config, {
      method: 'POST',
      url,
      data,
      op,
      friendly,
      onError,
      fullResponse,
    });
  }

  async _put(config, url, data, op, friendly, fullResponse = false) {
    return this._request(config, {
      method: 'PUT',
      url,
      data,
      op,
      friendly,
      fullResponse,
    });
  }

  async _patch(config, url, data, op, friendly, fullResponse = false) {
    return this._request(config, {
      method: 'PATCH',
      url,
      data,
      op,
      friendly,
      fullResponse,
    });
  }

  async _delete(config, url, data, op, friendly, fullResponse = false) {
    return this._request(config, {
      method: 'DELETE',
      url,
      data,
      op,
      friendly,
      fullResponse,
    });
  }

  async _downloadFile(config, url, destination) {
    const writer = fs.createWriteStream(destination);

    const response = await this._get(
      config,
      url,
      'download-file',
      'Failed to download file',
      { responseType: 'stream' },
      true
    );

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

  async createAxiosInstance(config) {
    const { oauth } = this.ctx;
    let authHeader;

    // HARDENING: Fallback to Basic Auth if OAuth is not configured or specifically requested
    const useBasic =
      config.authMethod === 'basic' ||
      (!config.clientId &&
        ENV.LIFERAY_API_USERNAME &&
        ENV.LIFERAY_API_PASSWORD);

    if (useBasic) {
      const user = config.username || ENV.LIFERAY_API_USERNAME;
      const pass = config.password || ENV.LIFERAY_API_PASSWORD;
      const token = Buffer.from(`${user}:${pass}`).toString('base64');
      authHeader = `Basic ${token}`;
      this.ctx.logger.debug('Using Basic Auth for Liferay connection', {
        user,
        passLen: pass ? pass.length : 0,
        liferayUrl: config.liferayUrl,
      });
    } else {
      const accessToken = await oauth.getAccessToken(
        config.liferayUrl,
        config.clientId,
        config.clientSecret
      );
      authHeader = `Bearer ${accessToken}`;
    }

    return axios.create({
      baseURL: config.liferayUrl,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000,
    });
  }

  async testConnection(config) {
    const { logger, oauth, persistence } = this.ctx;
    try {
      const effective = {
        ...config,
        ...resolveEffectiveLiferayConnection(config, oauth, persistence),
      };

      try {
        new URL(effective.liferayUrl);
      } catch {
        throw new Error(`Invalid URL format: ${effective.liferayUrl}`);
      }

      // HARDENING: Only validate OAuth if we aren't using Basic Auth
      const useBasic =
        effective.authMethod === 'basic' ||
        ENV.LIFERAY_AUTH_METHOD === 'basic' ||
        (!effective.clientId &&
          ENV.LIFERAY_API_USERNAME &&
          ENV.LIFERAY_API_PASSWORD);

      if (!useBasic && !oauth.isLiferayRouteAvailable()) {
        oauth.validateOAuthConfig(effective);
      }

      await this._get(effective, PATH.ME, 'test-connection');

      // Probe for LPD-35443 feature flag (Page Management API)
      try {
        await this._get(
          effective,
          '/o/headless-admin-site/v1.0/sites/0/site-pages',
          'probe-feature-flag'
        );
      } catch (err) {
        const status = err.response?.status;
        const errMsg = err.response?.data?.error?.message;

        // If the route is missing entirely, JAX-RS returns 404 "Not Found".
        // If the route exists but site '0' is missing, it returns 404 "No Site exists...".
        if (status === 404 && errMsg === 'Not Found') {
          throw new Error(
            'Liferay Page Management API feature flag (LPD-35443) is disabled. ' +
              "Please add 'feature.flag.LPD-35443=true' to your portal-ext.properties file and restart Liferay.",
            { cause: err }
          );
        }

        // Log other acceptable status codes/messages (like 401/403 or detailed site error)
        logger.debug('LPD-35443 feature flag probe complete', {
          status,
          message: errMsg,
        });
      }

      return {
        status: 'connected',
        message: 'Successfully connected to Liferay Commerce using OAuth 2',
      };
    } catch (error) {
      logger.error('OAuth connection test failed', {
        error: error.response?.data || error.message,
      });

      const structuredError = {
        success: false,
        error: '',
        errorType: '',
        field: '',
        originalError: error.message,
        status: error.response?.status || error.statusCode || error.status,
      };

      if (
        error.code === 'ENOTFOUND' ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'EHOSTUNREACH' ||
        error.code === 'ECONNRESET' ||
        error.message.includes('Invalid URL') ||
        error.message.includes('Network Error') ||
        error.message.includes('timeout') ||
        error.message.includes('ENOTFOUND') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('getaddrinfo') ||
        (!error.response && error.request)
      ) {
        structuredError.error = `Unable to connect to ${config.liferayUrl}. Please verify the URL is correct and the server is accessible.`;
        structuredError.errorType = 'connection';
        structuredError.field = 'liferayUrl';
      } else if (error.message.includes('OAuth configuration missing')) {
        structuredError.error =
          'OAuth configuration is incomplete. Please provide valid Client ID and Client Secret.';
        structuredError.errorType = 'auth_config';
        structuredError.field = 'clientSecret';
      } else if (
        [401, 403].includes(error.response?.status) ||
        [401, 403].includes(error.statusCode) ||
        [401, 403].includes(error.status) ||
        error.message.includes('OAuth authentication failed')
      ) {
        structuredError.error =
          'Authentication failed. Please verify your OAuth Client ID and Client Secret are correct.';
        structuredError.errorType = 'auth_error';
        structuredError.field = 'clientSecret';

        if (error.errorReference) {
          structuredError.errorReference = error.errorReference;
        }
      } else {
        structuredError.error = `Connection failed: ${
          error.response?.statusText || error.message
        }`;
        structuredError.errorType = 'connection';
        structuredError.field = 'liferayUrl';
      }

      const errorReference =
        structuredError.errorReference || createERC(ERC_PREFIX.ERROR);
      logger.error(`Error Reference: ${errorReference}`);
      structuredError.errorReference = errorReference;

      const uiErrorResponse = {
        success: false,
        error: structuredError.error,
        errorType: structuredError.errorType,
        field: structuredError.field,
        status: structuredError.status,
        errorReference,
      };

      const errorResponse = new Error(structuredError.error);
      errorResponse.response = {
        data: uiErrorResponse,
        status: structuredError.status || 500,
      };

      throw errorResponse;
    }
  }

  async getConfig(config, configKey) {
    const erc = String(configKey || '').toUpperCase();

    // MANDATE: Filter-In-Memory. Avoid 'or' filters.
    // We try to find by configKey first.
    try {
      const response = await this._get(
        config,
        PATH.CUSTOM_OBJECT_QUERY(CUSTOM_OBJECTS.AICA_CONFIGS, {
          filter: `configKey eq '${configKey}'`,
          pageSize: 500,
        }),
        `get-config:${configKey}`
      );

      // If we found a direct match, return it
      if (response?.items?.length) {
        return response;
      }

      // FALLBACK: Try fetching by ERC directly (another simple filter)
      return await this._get(
        config,
        PATH.CUSTOM_OBJECT_QUERY(CUSTOM_OBJECTS.AICA_CONFIGS, {
          filter: `externalReferenceCode eq '${erc}'`,
          pageSize: 10,
        }),
        `get-config-by-erc:${configKey}`
      );
    } catch (err) {
      // If the object definition doesn't exist yet, it will throw 404. Just return empty.
      if (
        err.message?.includes('404') ||
        err.response?.status === 404 ||
        err.problem?.status === 'NOT_FOUND'
      ) {
        return { items: [] };
      }
      throw err;
    }
  }
}
module.exports = HttpCoreService;
