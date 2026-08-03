const legacyProfile = require('./profiles/legacyProfile.cjs');

const exportsObject = {
  PATH: legacyProfile.PATH,
  CUSTOM_OBJECTS: legacyProfile.CUSTOM_OBJECTS,
  byERC: legacyProfile.byERC,
  q: legacyProfile.q,
};

module.exports = exportsObject;
