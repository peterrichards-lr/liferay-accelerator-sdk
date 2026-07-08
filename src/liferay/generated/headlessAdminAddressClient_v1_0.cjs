/**
 * HeadlessAdminAddressClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessAdminAddressClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getCountry
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountry(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}`,
      data,
      op: 'getCountry',
      friendly: 'Generated method getCountry failed',
      ...opts,
    });
  }

  /**
   * putCountry
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async putCountry(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}`,
      data,
      op: 'putCountry',
      friendly: 'Generated method putCountry failed',
      ...opts,
    });
  }

  /**
   * deleteCountry
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async deleteCountry(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}`,
      data,
      op: 'deleteCountry',
      friendly: 'Generated method deleteCountry failed',
      ...opts,
    });
  }

  /**
   * patchCountry
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async patchCountry(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}`,
      data,
      op: 'patchCountry',
      friendly: 'Generated method patchCountry failed',
      ...opts,
    });
  }

  /**
   * getCountryByA2
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountryByA2(config, a2, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/by-a2/${a2}`,
      data,
      op: 'getCountryByA2',
      friendly: 'Generated method getCountryByA2 failed',
      ...opts,
    });
  }

  /**
   * getCountryByA3
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountryByA3(config, a3, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/by-a3/${a3}`,
      data,
      op: 'getCountryByA3',
      friendly: 'Generated method getCountryByA3 failed',
      ...opts,
    });
  }

  /**
   * getCountryByName
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountryByName(config, name, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/by-name/${name}`,
      data,
      op: 'getCountryByName',
      friendly: 'Generated method getCountryByName failed',
      ...opts,
    });
  }

  /**
   * getCountryByNumber
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountryByNumber(config, number, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/by-number/${number}`,
      data,
      op: 'getCountryByNumber',
      friendly: 'Generated method getCountryByNumber failed',
      ...opts,
    });
  }

  /**
   * getCountriesPage
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountriesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries`,
      data,
      op: 'getCountriesPage',
      friendly: 'Generated method getCountriesPage failed',
      ...opts,
    });
  }

  /**
   * postCountry
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postCountry(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/countries`,
      data,
      op: 'postCountry',
      friendly: 'Generated method postCountry failed',
      ...opts,
    });
  }

  /**
   * postCountriesPageExportBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postCountriesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/countries/export-batch`,
      data,
      op: 'postCountriesPageExportBatch',
      friendly: 'Generated method postCountriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * putCountryBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async putCountryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-address/v1.0/countries/batch`,
      data,
      op: 'putCountryBatch',
      friendly: 'Generated method putCountryBatch failed',
      ...opts,
    });
  }

  /**
   * postCountryBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postCountryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/countries/batch`,
      data,
      op: 'postCountryBatch',
      friendly: 'Generated method postCountryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteCountryBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async deleteCountryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-address/v1.0/countries/batch`,
      data,
      op: 'deleteCountryBatch',
      friendly: 'Generated method deleteCountryBatch failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getRegion
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getRegion(config, regionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/regions/${regionId}`,
      data,
      op: 'getRegion',
      friendly: 'Generated method getRegion failed',
      ...opts,
    });
  }

  /**
   * putRegion
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async putRegion(config, regionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-address/v1.0/regions/${regionId}`,
      data,
      op: 'putRegion',
      friendly: 'Generated method putRegion failed',
      ...opts,
    });
  }

  /**
   * deleteRegion
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async deleteRegion(config, regionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-address/v1.0/regions/${regionId}`,
      data,
      op: 'deleteRegion',
      friendly: 'Generated method deleteRegion failed',
      ...opts,
    });
  }

  /**
   * patchRegion
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async patchRegion(config, regionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-address/v1.0/regions/${regionId}`,
      data,
      op: 'patchRegion',
      friendly: 'Generated method patchRegion failed',
      ...opts,
    });
  }

  /**
   * getCountryRegionsPage
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountryRegionsPage(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}/regions`,
      data,
      op: 'getCountryRegionsPage',
      friendly: 'Generated method getCountryRegionsPage failed',
      ...opts,
    });
  }

  /**
   * postCountryRegion
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postCountryRegion(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}/regions`,
      data,
      op: 'postCountryRegion',
      friendly: 'Generated method postCountryRegion failed',
      ...opts,
    });
  }

  /**
   * getCountryRegionByRegionCode
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getCountryRegionByRegionCode(
    config,
    countryId,
    regionCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}/regions/by-region-code/${regionCode}`,
      data,
      op: 'getCountryRegionByRegionCode',
      friendly: 'Generated method getCountryRegionByRegionCode failed',
      ...opts,
    });
  }

  /**
   * getRegionsPage
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async getRegionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-address/v1.0/regions`,
      data,
      op: 'getRegionsPage',
      friendly: 'Generated method getRegionsPage failed',
      ...opts,
    });
  }

  /**
   * postCountryRegionsPageExportBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postCountryRegionsPageExportBatch(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}/regions/export-batch`,
      data,
      op: 'postCountryRegionsPageExportBatch',
      friendly: 'Generated method postCountryRegionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postCountryRegionBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postCountryRegionBatch(config, countryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/countries/${countryId}/regions/batch`,
      data,
      op: 'postCountryRegionBatch',
      friendly: 'Generated method postCountryRegionBatch failed',
      ...opts,
    });
  }

  /**
   * postRegionsPageExportBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async postRegionsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-address/v1.0/regions/export-batch`,
      data,
      op: 'postRegionsPageExportBatch',
      friendly: 'Generated method postRegionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * putRegionBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async putRegionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-address/v1.0/regions/batch`,
      data,
      op: 'putRegionBatch',
      friendly: 'Generated method putRegionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteRegionBatch
   * API: headless-admin-address-v1.0 | Version: v1.0
   */
  async deleteRegionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-address/v1.0/regions/batch`,
      data,
      op: 'deleteRegionBatch',
      friendly: 'Generated method deleteRegionBatch failed',
      ...opts,
    });
  }
}

module.exports = HeadlessAdminAddressClient_v1_0;
