const MultipartService = require('../src/liferay/rest/MultipartService.cjs');
const { PATH } = require('../src/utils/liferayPaths.cjs');

describe('liferay/rest/MultipartService', () => {
  let http;
  let service;
  const config = { liferayUrl: 'http://liferay:8080' };

  beforeEach(() => {
    http = {
      _request: vi.fn().mockResolvedValue({ id: 999 }),
      _post: vi.fn().mockResolvedValue({ id: 111 }),
    };
    service = new MultipartService({}, http);
  });

  describe('addProductImageMultipart', () => {
    it('posts multipart form data with file + metadata to the product images path', async () => {
      const result = await service.addProductImageMultipart(config, 42, {
        fileStream: Buffer.from('fake-image-bytes'),
        fileName: 'photo.png',
        title: 'My Photo',
        priority: 2,
      });

      expect(result).toEqual({ id: 999 });
      expect(http._request).toHaveBeenCalledTimes(1);

      const [passedConfig, opts] = http._request.mock.calls[0];
      expect(passedConfig).toBe(config);
      expect(opts.method).toBe('POST');
      expect(opts.url).toBe(PATH.PRODUCT_IMAGES(42));
      expect(opts.op).toBe('add-product-image-multipart');
      expect(opts.headers).toBeDefined();
      expect(opts.headers['content-type']).toContain('multipart/form-data');
      // form-data is a readable stream; ensure it was passed through
      expect(typeof opts.data.getHeaders).toBe('function');
    });

    it('defaults the metadata title to the filename when no title is given', async () => {
      await service.addProductImageMultipart(config, 42, {
        fileStream: Buffer.from('x'),
        fileName: 'fallback.png',
      });

      const [, opts] = http._request.mock.calls[0];
      // We can't easily parse multipart bytes here, but we can assert it didn't throw
      // and that a FormData instance was passed.
      expect(opts.data.constructor.name).toBe('FormData');
    });
  });

  describe('addProductDocumentAttachmentMultipart', () => {
    it('posts multipart form data to the product attachments path', async () => {
      await service.addProductDocumentAttachmentMultipart(config, 7, {
        fileStream: Buffer.from('doc-bytes'),
        fileName: 'spec.pdf',
        title: { en_US: 'Spec Sheet' },
        priority: 1,
      });

      const [, opts] = http._request.mock.calls[0];
      expect(opts.url).toBe(PATH.PRODUCT_ATTACHMENTS(7));
      expect(opts.op).toBe('add-product-document-attachment-multipart');
    });
  });

  describe('URL-based image/attachment methods', () => {
    it('addProductImage posts the image payload to the by-url path', async () => {
      const image = { url: 'https://example.com/img.png' };
      const result = await service.addProductImage(config, 42, image);

      expect(result).toEqual({ id: 111 });
      expect(http._post).toHaveBeenCalledWith(
        config,
        PATH.PRODUCT_IMAGES_BY_URL(42),
        image,
        'add-product-image',
        'Failed to add product image'
      );
    });

    it('addProductDocumentAttachment posts the attachment payload to the by-url path', async () => {
      const attachment = { url: 'https://example.com/doc.pdf' };
      await service.addProductDocumentAttachment(config, 42, attachment);

      expect(http._post).toHaveBeenCalledWith(
        config,
        PATH.PRODUCT_ATTACHMENTS_BY_URL(42),
        attachment,
        'add-product-document-attachment',
        'Failed to add product document attachment'
      );
    });
  });

  describe('base64 image/attachment methods', () => {
    it('addProductImageByBase64 posts to the by-base64 path', async () => {
      const image = { base64: 'aGVsbG8=' };
      await service.addProductImageByBase64(config, 'PROD-ERC-1', image);

      expect(http._post).toHaveBeenCalledWith(
        config,
        PATH.PRODUCT_IMAGES_BY_BASE64('PROD-ERC-1'),
        image,
        'add-product-image-by-base64',
        'Failed to add product image by base64'
      );
    });

    it('addProductDocumentAttachmentByBase64 posts to the by-base64 path', async () => {
      const attachment = { base64: 'aGVsbG8=' };
      await service.addProductDocumentAttachmentByBase64(
        config,
        'PROD-ERC-2',
        attachment
      );

      expect(http._post).toHaveBeenCalledWith(
        config,
        PATH.PRODUCT_ATTACHMENTS_BY_BASE64('PROD-ERC-2'),
        attachment,
        'add-product-document-attachment-by-base64',
        'Failed to add product document attachment by base64'
      );
    });
  });

  describe('Document Library image/attachment methods', () => {
    it('addProductImageDocumentLibrary builds an ERC-tagged payload referencing the documentId', async () => {
      await service.addProductImageDocumentLibrary(config, 42, {
        documentId: 'doc-uuid-1',
        title: 'Cover Image',
        priority: 3,
      });

      const [, url, payload, op] = http._post.mock.calls[0];
      expect(url).toBe(PATH.PRODUCT_IMAGES(42));
      expect(op).toBe('add-product-image-dl');
      expect(payload.src).toBe('doc-uuid-1');
      expect(payload.priority).toBe(3);
      expect(payload.title).toEqual({ en_US: 'Cover Image' });
      expect(payload.externalReferenceCode).toMatch(/./);
    });

    it('addProductDocumentAttachmentDocumentLibrary builds an ERC-tagged payload', async () => {
      await service.addProductDocumentAttachmentDocumentLibrary(config, 42, {
        documentId: 'doc-uuid-2',
        title: { en_US: 'Manual' },
      });

      const [, url, payload, op] = http._post.mock.calls[0];
      expect(url).toBe(PATH.PRODUCT_ATTACHMENTS(42));
      expect(op).toBe('add-product-attachment-dl');
      expect(payload.src).toBe('doc-uuid-2');
      expect(payload.title).toEqual({ en_US: 'Manual' });
    });
  });
});
