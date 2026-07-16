
const { asItems, asCount } = require("../../utils/liferayUtils.cjs");
const { delay, fromI18n } = require('../../utils/misc.cjs');
const { PATH } = require('../../utils/liferayPaths.cjs');
class TaxonomyService {
  constructor(liferay) {
    this.liferay = liferay;
  }

  async getCurrencies(config) {
    return await this.liferay.rest.getCurrencies(config);
  }

  async getTaxonomyVocabularies(config, siteKey) {
    const res = await this.liferay.graphql.getTaxonomyVocabularies(
      config,
      siteKey
    );
    const items = asItems(res);
    return items.map((item) => ({
      ...item,
      name: fromI18n(item.name),
      description: fromI18n(item.description),
    }));
  }

  async getTaxonomyCategories(config, vocabularyId) {
    const res = await this.liferay.graphql.getTaxonomyCategories(
      config,
      vocabularyId
    );
    const items = asItems(res);
    return items.map((item) => ({
      ...item,
      name: fromI18n(item.name),
      description: fromI18n(item.description),
    }));
  }

  async getRegions(config, countryId) {
    return this.liferay.rest.getRegions(config, countryId);
  }

  async getLanguages(config, siteKey) {
    const { logger } = this.liferay.ctx;
    try {
      if (!siteKey) {
        logger.warn(
          'siteKey is missing for getLanguages, falling back to REST'
        );
        return await this.liferay.rest.getLanguages(config, siteKey);
      }
      const res = await this.liferay.graphql.getLanguages(config, siteKey);
      const items = asItems(res);
      if (!items || items.length === 0) {
        logger.warn(
          `GraphQL returned 0 languages for site ${siteKey}, falling back to REST`
        );
        return await this.liferay.rest.getLanguages(config, siteKey);
      }
      return items.map((lang) => ({
        id: lang.id,
        name: lang.name,
        isDefault: lang.markedAsDefault || false,
      }));
    } catch (err) {
      logger.warn(
        `Failed to fetch languages for site ${siteKey}: ${err.message}. Attempting REST fallback.`
      );
      try {
        return await this.liferay.rest.getLanguages(config, siteKey);
      } catch (restErr) {
        logger.error(
          `Critical failure: Failed to fetch languages via GraphQL AND REST for site ${siteKey}.`
        );
        throw restErr;
      }
    }
  }

  async getCountries(config) {
    const { cache } = this.liferay.ctx;
    const cacheKey = 'LIFERAY_COUNTRIES';
    let countries = cache.get(cacheKey);
    if (countries) {
      return countries;
    }
    const res = await this.liferay.graphql.getCountries(config);
    countries = asItems(res);
    if (countries && countries.length > 0) {
      cache.set(cacheKey, countries, 900000);
    } else {
      this.liferay.ctx.logger.warn(
        'Fetched 0 countries from Liferay. Not caching empty result.'
      );
    }
    return countries;
  }

  async getCountryRegions(config, countryId) {
    const { cache } = this.liferay.ctx;
    const cacheKey = `LIFERAY_REGIONS_${countryId}`;
    let regions = cache.get(cacheKey);
    if (regions) {
      return regions;
    }
    const res = await this.liferay.graphql.getCountryRegions(config, countryId);
    regions = asItems(res);
    cache.set(cacheKey, regions, 900000);
    return regions;
  }

  createTaxonomyCategory(config, vocabularyId, categoryPayload) {
    return this.liferay.rest.createTaxonomyCategory(
      config,
      vocabularyId,
      categoryPayload
    );
  }
}
module.exports = TaxonomyService;
