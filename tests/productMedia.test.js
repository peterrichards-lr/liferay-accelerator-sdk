import { vi, describe, it, expect, beforeEach } from 'vitest';

const LiferayRestService = require('../src/liferay/rest.cjs');
const { PATH } = require('../src/utils/liferayPaths.cjs');

/**
 * Read side of product media (#181). The two cases that would otherwise fail
 * silently - a dropped page and an unresolved relative `src` - are called out
 * as their own tests rather than being implied by the happy path.
 */
describe('product media reads', () => {
  let restService;
  let mockCtx;

  const config = {
    liferayUrl: 'http://localhost:8080',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  const attachment = (id) => ({
    id,
    externalReferenceCode: `IMG-${id}`,
    title: { en_US: `Image ${id}` },
    priority: id,
    contentType: 'image/png',
    src: `/o/commerce-media/images/${id}`,
    fileEntryId: 9000 + id,
  });

  beforeEach(() => {
    mockCtx = {
      logger: {
        info: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        trace: vi.fn(),
      },
    };

    restService = new LiferayRestService(mockCtx);
  });

  describe('getProductImages', () => {
    it('reads the ERC-keyed images collection and narrows each entry', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValue({ items: [attachment(1)], totalCount: 1 });

      const images = await restService.getProductImages(config, 'PROD-1');

      expect(getSpy.mock.calls[0][1]).toBe(
        PATH.PRODUCT_IMAGES_BY_ERC('PROD-1')
      );
      expect(images).toEqual([
        {
          id: 1,
          externalReferenceCode: 'IMG-1',
          title: { en_US: 'Image 1' },
          priority: 1,
          contentType: 'image/png',
          src: '/o/commerce-media/images/1',
        },
      ]);
    });

    it('collects every page, so a product with more images than fit one page keeps its tail', async () => {
      const firstPage = Array.from({ length: 20 }, (_, i) => attachment(i + 1));
      const secondPage = Array.from({ length: 5 }, (_, i) =>
        attachment(i + 21)
      );

      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValueOnce({ items: firstPage, totalCount: 25 })
        .mockResolvedValueOnce({ items: secondPage, totalCount: 25 });

      const images = await restService.getProductImages(config, 'PROD-1', {
        pageSize: 20,
      });

      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(getSpy.mock.calls[0][4].params).toMatchObject({
        page: 1,
        pageSize: 20,
      });
      expect(getSpy.mock.calls[1][4].params).toMatchObject({
        page: 2,
        pageSize: 20,
      });
      expect(images).toHaveLength(25);
      expect(images[24].id).toBe(25);
    });
  });

  describe('getProductAttachments', () => {
    it('reads the ERC-keyed attachments collection, not the images one', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValue({ items: [], totalCount: 0 });

      const attachments = await restService.getProductAttachments(
        config,
        'PROD-2'
      );

      expect(getSpy.mock.calls[0][1]).toBe(
        PATH.PRODUCT_ATTACHMENTS_BY_ERC('PROD-2')
      );
      expect(attachments).toEqual([]);
    });
  });

  describe('getProductImageContent', () => {
    it('resolves a relative src against the configured Liferay URL and asks for bytes', async () => {
      const bytes = Buffer.from('png-bytes');
      const getSpy = vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: bytes,
        headers: { 'content-type': 'image/png' },
        status: 200,
      });

      const content = await restService.getProductImageContent(
        config,
        '/o/commerce-media/images/1'
      );

      const [, url, , , opts, fullResponse] = getSpy.mock.calls[0];
      expect(url).toBe('http://localhost:8080/o/commerce-media/images/1');
      expect(opts).toEqual({ responseType: 'arraybuffer' });
      expect(fullResponse).toBe(true);
      expect(Buffer.isBuffer(content.buffer)).toBe(true);
      expect(content.buffer.toString()).toBe('png-bytes');
      expect(content.contentType).toBe('image/png');
    });

    it('leaves an already-absolute src alone, so a CDN-hosted image stays reachable', async () => {
      const getSpy = vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('cdn'),
        headers: {},
      });

      const content = await restService.getProductImageContent(
        config,
        'https://cdn.example.com/images/1.png'
      );

      expect(getSpy.mock.calls[0][1]).toBe(
        'https://cdn.example.com/images/1.png'
      );
      expect(content.contentType).toBeNull();
    });

    it('looks an external reference code up through the attachment endpoint first', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValueOnce({ src: '/o/commerce-media/images/7' })
        .mockResolvedValueOnce({
          data: Buffer.from('bytes'),
          headers: { 'content-type': 'image/jpeg' },
        });

      const content = await restService.getProductImageContent(config, 'IMG-7');

      expect(getSpy.mock.calls[0][1]).toBe(PATH.ATTACHMENT_BY_ERC('IMG-7'));
      expect(getSpy.mock.calls[1][1]).toBe(
        'http://localhost:8080/o/commerce-media/images/7'
      );
      expect(content.contentType).toBe('image/jpeg');
    });

    it('rejects an attachment that carries no src rather than returning empty bytes', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({ id: 7 });

      await expect(
        restService.getProductImageContent(config, 'IMG-7')
      ).rejects.toThrow(/has no src/);
    });

    it('rejects a non-string identifier', async () => {
      const getSpy = vi.spyOn(restService.httpCore, '_get');

      await expect(
        restService.getProductImageContent(config, 12345)
      ).rejects.toThrow(
        /expected an attachment src or external reference code/
      );
      expect(getSpy).not.toHaveBeenCalled();
    });
  });

  describe('getProductAttachmentContent', () => {
    it('fetches the bytes behind an attachment src', async () => {
      const getSpy = vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('%PDF-1.4'),
        headers: { 'content-type': 'application/pdf' },
      });

      const content = await restService.getProductAttachmentContent(
        config,
        '/o/commerce-media/attachments/3'
      );

      expect(getSpy.mock.calls[0][1]).toBe(
        'http://localhost:8080/o/commerce-media/attachments/3'
      );
      expect(getSpy.mock.calls[0][2]).toBe('get-product-attachment-content');
      expect(content.buffer.toString()).toBe('%PDF-1.4');
      expect(content.contentType).toBe('application/pdf');
    });
  });

  describe('base64 wrappers', () => {
    it('getProductImageContentByBase64 encodes the same bytes the buffer read returns', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('png-bytes'),
        headers: { 'content-type': 'image/png' },
      });

      const content = await restService.getProductImageContentByBase64(
        config,
        '/o/commerce-media/images/1'
      );

      expect(content).toEqual({
        base64: Buffer.from('png-bytes').toString('base64'),
        contentType: 'image/png',
      });
    });

    it('getProductAttachmentContentByBase64 encodes the attachment bytes', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('%PDF-1.4'),
        headers: { 'content-type': 'application/pdf' },
      });

      const content = await restService.getProductAttachmentContentByBase64(
        config,
        '/o/commerce-media/attachments/3'
      );

      expect(content).toEqual({
        base64: Buffer.from('%PDF-1.4').toString('base64'),
        contentType: 'application/pdf',
      });
    });
  });

  describe('CommerceService delegation', () => {
    it('forwards each read to the rest service', async () => {
      const rest = {
        getProductImages: vi.fn().mockResolvedValue([]),
        getProductAttachments: vi.fn().mockResolvedValue([]),
        getProductImageContent: vi.fn().mockResolvedValue({}),
        getProductAttachmentContent: vi.fn().mockResolvedValue({}),
        getProductImageContentByBase64: vi.fn().mockResolvedValue({}),
        getProductAttachmentContentByBase64: vi.fn().mockResolvedValue({}),
      };
      const CommerceService = require('../src/liferay/services/CommerceService.cjs');
      const commerce = new CommerceService({ rest });

      await commerce.getProductImages(config, 'PROD-1', { pageSize: 10 });
      await commerce.getProductAttachments(config, 'PROD-1', { pageSize: 10 });
      await commerce.getProductImageContent(config, 'IMG-1');
      await commerce.getProductAttachmentContent(config, 'ATT-1');
      await commerce.getProductImageContentByBase64(config, 'IMG-1');
      await commerce.getProductAttachmentContentByBase64(config, 'ATT-1');

      expect(rest.getProductImages).toHaveBeenCalledWith(config, 'PROD-1', {
        pageSize: 10,
      });
      expect(rest.getProductAttachments).toHaveBeenCalledWith(
        config,
        'PROD-1',
        { pageSize: 10 }
      );
      expect(rest.getProductImageContent).toHaveBeenCalledWith(config, 'IMG-1');
      expect(rest.getProductAttachmentContent).toHaveBeenCalledWith(
        config,
        'ATT-1'
      );
      expect(rest.getProductImageContentByBase64).toHaveBeenCalledWith(
        config,
        'IMG-1'
      );
      expect(rest.getProductAttachmentContentByBase64).toHaveBeenCalledWith(
        config,
        'ATT-1'
      );
    });
  });
});
