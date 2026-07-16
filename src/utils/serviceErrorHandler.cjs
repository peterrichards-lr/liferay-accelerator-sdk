const { resolveErrorReference, createERC } = require('../utils/misc.cjs');
const { ERC_PREFIX } = require('../utils/constants.cjs');

function handleServiceError(res, logger, req, config, operation, error, extra = {}) {
  const rawMessage =
    (error && error.userMessage) ||
    (error && error.message) ||
    (typeof error === 'string' ? error : null) ||
    'An unexpected error occurred. Please try again.';

  const isValidationError =
    error?.status === 400 ||
    error?.statusCode === 400 ||
    error?.response?.status === 400 ||
    error?.code === 'VALIDATION_ERROR';

  const isAIKeyMissingError =
    error?.code === 'AI_KEY_MISSING' ||
    rawMessage.includes('AI API key not configured');

  let statusCode = isValidationError ? 400 : error?.status || error?.statusCode || 500;
  let userMessage = rawMessage;

  if (isAIKeyMissingError) {
    userMessage =
      'AI service error: AI credentials not configured. Please set them in the AI Configuration object.';
  }

  const errorRef = resolveErrorReference(error) || createERC(ERC_PREFIX.ERROR);

  logger.error('Operation failed', {
    correlationId: config?.correlationId,
    errorReference: errorRef,
    message: rawMessage,
    name: error?.name,
    stack: error?.stack,
    requestDetails: {
      method: req?.method,
      url: req?.url,
      ip: req?.ip,
      userAgent: req?.get && req.get('User-Agent'),
    },
    entityType: extra.entityType,
    ...extra,
  });

  if (!res.headersSent) {
    return res.status(statusCode).json({
      success: false,
      error: userMessage,
      operation: error?.operation || operation,
      errorReference: errorRef,
      demo: !!config?.demoMode,
      timestamp: new Date().toISOString(),
    });
  }
}
module.exports = { handleServiceError };
