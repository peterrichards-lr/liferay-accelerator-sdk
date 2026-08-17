const { ENV } = require('./constants.cjs');

/**
 * Decides whether runtime contract validation runs.
 *
 * Validation used to be hard-gated on NODE_ENV being development or test, which
 * meant the safety net was off in production - exactly where a malformed payload
 * costs a failed batch and a diagnosis. That gate was presumed expensive. It
 * isn't: measured against the catalog Product schema with a realistic 22-field
 * payload, a validation costs 1.1us, so checking all 200 items of a batch costs
 * 0.22ms - a fraction of a percent of the HTTP round trip that follows.
 *
 * What does cost is one-time: loading and preprocessing the 11 specs takes
 * ~210ms in the ContractValidator constructor, and AJV compiles each schema on
 * first use (~40ms for Product). Both are paid by any caller that constructs a
 * ContractValidator at all, whatever this policy decides, so neither is a reason
 * to keep per-request validation off.
 *
 * LIFERAY_CONTRACT_VALIDATION:
 *   auto (default) - the historical behaviour: outbound in development and test,
 *                    inbound in development only
 *   on             - always validate, whatever NODE_ENV says
 *   off            - never validate
 */
const MODES = {
  AUTO: 'auto',
  ON: 'on',
  OFF: 'off',
};

/** The batch gate samples rather than validating every item; 0 means all. */
const DEFAULT_BATCH_SAMPLE = 3;

function mode() {
  const raw = String(ENV.LIFERAY_CONTRACT_VALIDATION || MODES.AUTO)
    .trim()
    .toLowerCase();
  return Object.values(MODES).includes(raw) ? raw : MODES.AUTO;
}

/**
 * Outbound request and batch payloads.
 * @returns {boolean}
 */
function shouldValidateOutbound() {
  const current = mode();
  if (current === MODES.ON) return true;
  if (current === MODES.OFF) return false;
  return ENV.NODE_ENV === 'development' || ENV.NODE_ENV === 'test';
}

/**
 * Inbound responses. Under `auto` this stays development-only and skips Vitest,
 * because the suite asserts against fixtures that do not always satisfy the
 * response contracts.
 * @returns {boolean}
 */
function shouldValidateInbound() {
  const current = mode();
  if (current === MODES.ON) return true;
  if (current === MODES.OFF) return false;
  return ENV.NODE_ENV === 'development' && !process.env.VITEST;
}

/**
 * How many items of a batch to validate.
 *
 * `auto` keeps sampling the first few, which is enough to catch a systematic
 * payload-shape error without walking a large batch. Explicitly turning
 * validation on validates everything, because the measured cost does not justify
 * letting an item through unchecked.
 *
 * LIFERAY_CONTRACT_VALIDATION_SAMPLE overrides the count; 0 means every item.
 *
 * @param {number} itemCount total items in the batch
 * @returns {number} how many leading items to validate
 */
function batchSampleSize(itemCount) {
  const total = Number(itemCount) || 0;
  if (total <= 0) return 0;

  const configured = ENV.LIFERAY_CONTRACT_VALIDATION_SAMPLE;
  if (Number.isFinite(configured) && configured >= 0) {
    return configured === 0 ? total : Math.min(configured, total);
  }

  return mode() === MODES.ON ? total : Math.min(DEFAULT_BATCH_SAMPLE, total);
}

module.exports = {
  DEFAULT_BATCH_SAMPLE,
  MODES,
  batchSampleSize,
  mode,
  shouldValidateInbound,
  shouldValidateOutbound,
};
