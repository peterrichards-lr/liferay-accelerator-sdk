/**
 * @liferay/accelerator-sdk
 * Hardened foundation for Liferay accelerators.
 */

const { LiferayService } = require('./liferay/index.cjs');
const LiferayRestService = require('./liferay/rest.cjs');
const LiferayGraphQLService = require('./liferay/graphql.cjs');
const OAuthService = require('./liferay/oauth.cjs');
const ContractValidator = require('./services/contractValidator.cjs');
const GeneratedLiferayClient = require('./liferay/GeneratedLiferayClient.cjs');
const ExtractionFacade = require('./services/extractionFacade.cjs');

// Workflow Engine
const BaseWorkflowService = require('./workflow/baseWorkflowService.cjs');
const BaseGenerator = require('./workflow/baseGenerator.cjs');
const PersistenceService = require('./services/persistenceService.cjs');
const BatchCallbackService = require('./services/batchCallbackService.cjs');
const BatchProcessorService = require('./services/batchProcessorService.cjs');
const SchemaCorrelationService = require('./services/schemaCorrelationService.cjs');

// Utils
const liferayPaths = require('./utils/liferayPaths.cjs');
const liferayUtils = require('./utils/liferayUtils.cjs');
const constants = require('./utils/constants.cjs');
const commerceConstants = require('./utils/commerceConstants.cjs');
const misc = require('./utils/misc.cjs');
const exclusionKeys = require('./utils/exclusionKeys.cjs');
// Signing and verifying the batch callback URL. Exported because the
// consuming service verifies what this package signs - the two halves live in
// one process, so a consumer that cannot reach the verifier has to deep-import
// past this package's surface to do its half (#272).
const callbackSignature = require('./utils/callbackSignature.cjs');
const expressErrorHandler = require('./utils/expressErrorHandler.cjs');
const serviceErrorHandler = require('./utils/serviceErrorHandler.cjs');

module.exports = {
  LiferayService,
  LiferayRestService,
  LiferayGraphQLService,
  OAuthService,
  ContractValidator,
  GeneratedLiferayClient,
  ExtractionFacade,

  // Workflow Engine
  BaseWorkflowService,
  BaseGenerator,
  PersistenceService,
  BatchCallbackService,
  BatchProcessorService,
  SchemaCorrelationService,

  // The exclusion-list declaration, exported so a consumer can generate its
  // configuration surface from it rather than maintaining a second copy (#254).
  ...exclusionKeys,

  // Expose key utilities
  utils: {
    ...liferayPaths,
    ...liferayUtils,
    ...commerceConstants,
    ...misc,
    ...exclusionKeys,
    ...callbackSignature,
    ...expressErrorHandler,
    ...serviceErrorHandler,
    constants,
  },

  version: require('../package.json').version,
};
