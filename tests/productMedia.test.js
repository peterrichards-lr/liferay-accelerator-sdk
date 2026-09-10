import { vi, describe, it, expect, beforeEach } from 'vitest';

const LiferayRestService = require('../src/liferay/rest.cjs');
const { PATH } = require('../src/utils/liferayPaths.cjs');
const { ATTACHMENT_PROJECTION } = require('../src/utils/commerceConstants.cjs');
const catalogSchema = require('../api-schemas/headless-commerce-admin-catalog-v1.0-openapi.json');

// Taken from the spec rather than hand-listed, so that a read which quietly
// stops returning a field the schema declares fails here (#187). The `x-`
// entries are OpenAPI vendor extensions, not attachment fields.
const ATTACHMENT_FIELDS = Object.keys(
  catalogSchema.components.schemas.Attachment.properties
).filter((field) => !field.startsWith('x-'));

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

  // Every field the Attachment schema declares, each with a value that is not
  // the one a caller would assume if the field went missing - galleryEnabled
  // and neverExpire are false, so a dropped field reads as a different
  // attachment rather than the same one.
  const fullAttachment = (id) => ({
    ...attachment(id),
    attachment: null,
    cdnEnabled: true,
    cdnURL: `https://cdn.example.com/images/${id}`,
    customFields: [{ name: 'photographer', value: 'A. Nother' }],
    displayDate: '2026-01-01T00:00:00Z',
    expirationDate: '2027-01-01T00:00:00Z',
    fileEntryExternalReferenceCode: `DL-IMG-${id}`,
    fileEntryGroupExternalReferenceCode: `DL-GROUP-${id}`,
    galleryEnabled: false,
    neverExpire: false,
    options: { color: 'yellow' },
    tags: ['hero', 'seasonal'],
    type: 1,
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
    it('reads the ERC-keyed images collection and returns the whole attachment', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValue({ items: [fullAttachment(1)], totalCount: 1 });

      const images = await restService.getProductImages(config, 'PROD-1');

      expect(getSpy.mock.calls[0][1]).toBe(
        PATH.PRODUCT_IMAGES_BY_ERC('PROD-1')
      );
      expect(images).toEqual([fullAttachment(1)]);
      expect(Object.keys(images[0]).sort()).toEqual(
        [...ATTACHMENT_FIELDS].sort()
      );
    });

    it('carries galleryEnabled through, so an image hidden from the gallery is not read back as a visible one', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        items: [fullAttachment(1)],
        totalCount: 1,
      });

      const images = await restService.getProductImages(config, 'PROD-1');

      expect(images[0].galleryEnabled).toBe(false);
      expect(images[0].neverExpire).toBe(false);
      expect(images[0].displayDate).toBe('2026-01-01T00:00:00Z');
      expect(images[0].tags).toEqual(['hero', 'seasonal']);
    });

    it('narrows to exactly the requested fields when the caller asks for the media projection', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        items: [fullAttachment(1)],
        totalCount: 1,
      });

      const images = await restService.getProductImages(config, 'PROD-1', {
        fields: ATTACHMENT_PROJECTION.MEDIA,
      });

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
      expect(Object.keys(images[0]).sort()).toEqual(
        [...ATTACHMENT_PROJECTION.MEDIA].sort()
      );
    });

    it('sets every projected field even when the attachment lacks it, so the shape does not vary per item', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        items: [{ id: 1 }],
        totalCount: 1,
      });

      const images = await restService.getProductImages(config, 'PROD-1', {
        fields: ATTACHMENT_PROJECTION.MEDIA,
      });

      expect(Object.keys(images[0]).sort()).toEqual(
        [...ATTACHMENT_PROJECTION.MEDIA].sort()
      );
      expect(images[0].src).toBeUndefined();
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

    it('takes the same fields projection as getProductImages', async () => {
      vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        items: [fullAttachment(3)],
        totalCount: 1,
      });

      const whole = await restService.getProductAttachments(config, 'PROD-2');
      const narrowed = await restService.getProductAttachments(
        config,
        'PROD-2',
        { fields: ATTACHMENT_PROJECTION.MEDIA }
      );

      expect(whole).toEqual([fullAttachment(3)]);
      expect(Object.keys(narrowed[0]).sort()).toEqual(
        [...ATTACHMENT_PROJECTION.MEDIA].sort()
      );
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

    // The exact string lctsolara-uat returned on 2026-09-10 (#189). Liferay
    // advertises its internal listener - https on 8080 - while the public host
    // serves 443, so as returned this URL connects to nothing.
    it('rewrites the origin on an absolute src, because the one Liferay advertises need not be reachable', async () => {
      const getSpy = vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('png-bytes'),
        headers: { 'content-type': 'image/png' },
      });

      await restService.getProductImageContent(
        config,
        'https://webserver-lctsolara-uat.lfr.cloud:8080/o/commerce-media/accounts/-9223372036854775808/images/90623?download=true'
      );

      expect(getSpy.mock.calls[0][1]).toBe(
        'http://localhost:8080/o/commerce-media/accounts/-9223372036854775808/images/90623?download=true'
      );
    });

    it('keeps the query string, which is what the commerce-media servlet reads', async () => {
      const getSpy = vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('png-bytes'),
        headers: {},
      });

      await restService.getProductImageContent(
        config,
        'https://internal.example.com:8080/o/commerce-media/images/1?download=true&foo=bar%20baz'
      );

      expect(getSpy.mock.calls[0][1]).toBe(
        'http://localhost:8080/o/commerce-media/images/1?download=true&foo=bar%20baz'
      );
    });

    it('is a no-op on a src the consumer already reduced to a path, so normalising twice does not compound', async () => {
      const getSpy = vi.spyOn(restService.httpCore, '_get').mockResolvedValue({
        data: Buffer.from('png-bytes'),
        headers: {},
      });

      const absolute =
        'https://webserver-lctsolara-uat.lfr.cloud:8080/o/commerce-media/accounts/-9223372036854775808/images/90623?download=true';
      const once = restService.httpCore._resolveUrl(config, absolute);
      const twice = restService.httpCore._resolveUrl(config, once);

      expect(twice).toBe(once);

      // And what AICA's mediaExtractor actually passes - path plus query -
      // lands on the same URL as the raw src it was derived from.
      await restService.getProductImageContent(
        config,
        '/o/commerce-media/accounts/-9223372036854775808/images/90623?download=true'
      );

      expect(getSpy.mock.calls[0][1]).toBe(once);
    });

    it('dials a CDN-hosted src as-is, because the attachment says that origin is genuinely elsewhere', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValueOnce({
          src: 'https://cdn.example.com/images/1.png',
          cdnEnabled: true,
          cdnURL: 'https://cdn.example.com',
        })
        .mockResolvedValueOnce({ data: Buffer.from('cdn'), headers: {} });

      const content = await restService.getProductImageContent(
        config,
        'IMG-CDN'
      );

      expect(getSpy.mock.calls[1][1]).toBe(
        'https://cdn.example.com/images/1.png'
      );
      expect(content.contentType).toBeNull();
    });

    it('rewrites a src the attachment did not flag as CDN-hosted, even when it is absolute', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValueOnce({
          src: 'https://webserver-lctsolara-uat.lfr.cloud:8080/o/commerce-media/images/9?download=true',
          cdnEnabled: false,
        })
        .mockResolvedValueOnce({ data: Buffer.from('bytes'), headers: {} });

      await restService.getProductImageContent(config, 'IMG-9');

      expect(getSpy.mock.calls[1][1]).toBe(
        'http://localhost:8080/o/commerce-media/images/9?download=true'
      );
    });

    it('resolves a portal-rooted src even when the attachment claims a CDN, there being no origin on it to trust', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValueOnce({
          src: '/o/commerce-media/images/4',
          cdnEnabled: true,
          cdnURL: 'https://cdn.example.com',
        })
        .mockResolvedValueOnce({ data: Buffer.from('bytes'), headers: {} });

      await restService.getProductImageContent(config, 'IMG-4');

      expect(getSpy.mock.calls[1][1]).toBe(
        'http://localhost:8080/o/commerce-media/images/4'
      );
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
