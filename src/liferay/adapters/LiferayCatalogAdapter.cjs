class LiferayCatalogAdapter {
  constructor(restService, pathsProfile) {
    this.rest = restService;
    this.paths = pathsProfile;
  }

  async getProducts(_config, _params) {
    throw new Error('Not Implemented');
  }

  async getProductsByERC(_config, _ercs, _fields) {
    throw new Error('Not Implemented');
  }

  async createProductsBatch(_config, _items, _opts) {
    throw new Error('Not Implemented');
  }

  async deleteProductsBatch(_config, _opts) {
    throw new Error('Not Implemented');
  }

  async createProductSkusBatch(_config, _skusData, _opts) {
    throw new Error('Not Implemented');
  }

  async createProductSku(_config, _productId, _skuData) {
    throw new Error('Not Implemented');
  }

  async getSkusByERC(_config, _ercs, _fields) {
    throw new Error('Not Implemented');
  }

  async getProductOptions(_config, _productId) {
    throw new Error('Not Implemented');
  }

  async deleteProductOption(_config, _productId, _optionId) {
    throw new Error('Not Implemented');
  }

  async addProductOptions(_config, _productId, _productOptions, _productERC) {
    throw new Error('Not Implemented');
  }

  async getProductSpecifications(_config, _productId) {
    throw new Error('Not Implemented');
  }

  async deleteProductSpecification(_config, _productId, _specId) {
    throw new Error('Not Implemented');
  }

  async addProductSpecifications(_config, _productId, _specs) {
    throw new Error('Not Implemented');
  }
}

module.exports = LiferayCatalogAdapter;
