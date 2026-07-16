const { PATH } = require('../../utils/liferayPaths.cjs');
const { createERC } = require('../../utils/misc.cjs');
const { ERC_PREFIX } = require('../../utils/constants.cjs');
const FormData = require('form-data');

class MultipartService {
  constructor(ctx, http) {
    this.ctx = ctx;
    this.http = http;
  }

  async _postMultipart(config, url, formData, op, friendly) {
    return await this.http._request(config, {
      method: 'POST',
      url,
      data: formData,
      headers: formData.getHeaders(),
      op,
      friendly,
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
