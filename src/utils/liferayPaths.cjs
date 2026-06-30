const legacyProfile = require('./profiles/legacyProfile.cjs');

const exportsObject = {
  PATH: legacyProfile.PATH,
  CUSTOM_OBJECTS: legacyProfile.CUSTOM_OBJECTS,
  byERC: legacyProfile.byERC,
  q: legacyProfile.q,

  setProfile(profileName) {
    if (profileName === 'pim') {
      try {
        const pimProfile = require('./profiles/pimProfile.cjs');
        exportsObject.PATH = pimProfile.PATH;
        exportsObject.CUSTOM_OBJECTS = pimProfile.CUSTOM_OBJECTS;
        exportsObject.byERC = pimProfile.byERC;
        exportsObject.q = pimProfile.q;
      } catch (_e) {
        // Fallback silently to legacy if pimProfile doesn't exist yet
      }
    } else {
      exportsObject.PATH = legacyProfile.PATH;
      exportsObject.CUSTOM_OBJECTS = legacyProfile.CUSTOM_OBJECTS;
      exportsObject.byERC = legacyProfile.byERC;
      exportsObject.q = legacyProfile.q;
    }
  },
};

module.exports = exportsObject;
