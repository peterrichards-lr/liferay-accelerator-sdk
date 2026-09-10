/**
 * Streaming site-initializer upload
 * (peterrichards-lr/liferay-demo-accelerator#65).
 *
 * The property under test is that the bundle reaches `form-data` as a stream.
 * A naive implementation - readFileSync, hand the Buffer over - passes every
 * "did it upload" assertion while losing the only thing the issue is about, so
 * the streaming assertions here look at what was appended, not at the result.
 */
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { Readable } = require('stream');
const FormData = require('form-data');

const MultipartService = require('../src/liferay/rest/MultipartService.cjs');
const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');
const { PATH } = require('../src/utils/liferayPaths.cjs');

const LIFERAY_URL = 'http://liferay.test';
const ERC = 'SITE-ERC-1';

/** Captured before any spy replaces it, so a spy can still open a real file. */
const openReadStream = fs.createReadStream.bind(fs);

function makeCtx() {
  return {
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      trace: vi.fn(),
    },
    oauth: { getAccessToken: vi.fn().mockResolvedValue('token') },
    persistence: {},
  };
}

/** A bundle big enough that buffering it would be visible in a heap snapshot. */
function writeBundle(bytes = 512 * 1024) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-upload-'));
  const file = path.join(dir, 'site-initializer.zip');
  fs.writeFileSync(file, Buffer.alloc(bytes, 0x5a));
  return { dir, file, bytes };
}

describe('MultipartService site initializer upload (LDM#65)', () => {
  let bundle;
  let service;
  let http_;
  let opened;

  beforeEach(() => {
    bundle = writeBundle();
    http_ = { _request: vi.fn().mockResolvedValue({ id: 7 }) };
    service = new MultipartService({}, http_);

    // `_request` is a stub here, so nothing consumes the streams the service
    // opens. Track them and close them, or a lazily-opened fd fires ENOENT
    // after the temp bundle is removed.
    opened = [];
    vi.spyOn(fs, 'createReadStream').mockImplementation((...args) => {
      const stream = openReadStream(...args);
      // A ReadStream opens lazily, so one destroyed before its first read still
      // reaches open() - after afterEach has deleted the bundle. That ENOENT is
      // teardown noise, not a finding.
      stream.on('error', () => {});
      opened.push(stream);
      return stream;
    });
  });

  afterEach(() => {
    opened.forEach((stream) => stream.destroy?.());
    fs.rmSync(bundle.dir, { recursive: true, force: true });
    delete process.env.LIFERAY_RETRY_DELAY_MS;
    vi.restoreAllMocks();
  });

  describe('streaming', () => {
    it('hands form-data a readable stream, never a Buffer', async () => {
      const appended = [];
      vi.spyOn(FormData.prototype, 'append').mockImplementation(
        function (field, value, options) {
          appended.push({ field, value, options });
        }
      );

      await service.uploadSiteInitializer({}, ERC, { zipPath: bundle.file });

      const filePart = appended.find((part) => part.field === 'file');
      expect(filePart).toBeDefined();

      // The assertion the issue is actually about.
      expect(Buffer.isBuffer(filePart.value)).toBe(false);
      expect(typeof filePart.value).not.toBe('string');
      expect(filePart.value).toBeInstanceOf(Readable);
      expect(typeof filePart.value.pipe).toBe('function');

      filePart.value.destroy();
    });

    it('never reads the bundle into memory', async () => {
      const readFileSync = vi.spyOn(fs, 'readFileSync');
      const readFile = vi.spyOn(fs.promises, 'readFile');

      await service.uploadSiteInitializer({}, ERC, { zipPath: bundle.file });

      expect(fs.createReadStream).toHaveBeenCalledWith(bundle.file);
      expect(
        readFileSync.mock.calls.some((call) => call[0] === bundle.file)
      ).toBe(false);
      expect(readFile.mock.calls.some((call) => call[0] === bundle.file)).toBe(
        false
      );
    });

    it('sets Content-Length from the size on disk', async () => {
      await service.uploadSiteInitializer({}, ERC, { zipPath: bundle.file });

      const [, opts] = http_._request.mock.calls[0];
      expect(opts.headers['Content-Length']).toBeGreaterThan(bundle.bytes);
    });
  });

  describe('request shape', () => {
    it('PUTs to the ERC-scoped site-initializer path the spec declares', async () => {
      await service.uploadSiteInitializer({}, ERC, { zipPath: bundle.file });

      const [, opts] = http_._request.mock.calls[0];
      expect(opts.method).toBe('PUT');
      expect(opts.url).toBe(
        '/o/headless-admin-site/v1.0/sites/SITE-ERC-1/site-initializer'
      );
      expect(opts.url).toBe(PATH.SITE_INITIALIZER(ERC));
      expect(opts.headers['content-type']).toContain('multipart/form-data');
    });

    it('leaves _request no room to resend a consumed stream', async () => {
      await service.uploadSiteInitializer({}, ERC, { zipPath: bundle.file });

      const [, opts] = http_._request.mock.calls[0];
      expect(opts.maxRetries).toBe(1);
    });

    it('refuses site metadata on the PUT, which declares only a file part', async () => {
      await expect(
        service.uploadSiteInitializer({}, ERC, {
          zipPath: bundle.file,
          site: { name: 'Solara' },
        })
      ).rejects.toThrow(/createSiteFromInitializer/);

      expect(http_._request).not.toHaveBeenCalled();
    });

    it('POSTs site and file together when creating a site', async () => {
      const appended = [];
      vi.spyOn(FormData.prototype, 'append').mockImplementation(
        function (field, value) {
          appended.push({ field, value });
        }
      );

      await service.createSiteFromInitializer(
        {},
        {
          zipPath: bundle.file,
          site: { name: 'Solara', friendlyUrlPath: '/s' },
        }
      );

      const [, opts] = http_._request.mock.calls[0];
      expect(opts.method).toBe('POST');
      expect(opts.url).toBe(
        '/o/headless-admin-site/v1.0/sites/site-initializer'
      );

      expect(appended.map((part) => part.field).sort()).toEqual([
        'file',
        'site',
      ]);
      const sitePart = appended.find((part) => part.field === 'site');
      expect(JSON.parse(sitePart.value)).toEqual({
        name: 'Solara',
        friendlyUrlPath: '/s',
      });

      appended.find((part) => part.field === 'file').value.destroy();
    });

    it('requires a bundle', async () => {
      await expect(service.uploadSiteInitializer({}, ERC, {})).rejects.toThrow(
        /zipPath or zipStream/
      );
    });
  });

  describe('retry', () => {
    it('opens a fresh stream for each attempt after a 5xx', async () => {
      process.env.LIFERAY_RETRY_DELAY_MS = '1';

      const streams = [];
      vi.spyOn(fs, 'createReadStream').mockImplementation((...args) => {
        const stream = Readable.from([Buffer.alloc(16)]);
        stream.path = args[0];
        streams.push(stream);
        return stream;
      });

      const serverError = Object.assign(new Error('boom'), {
        response: { status: 503, data: 'unavailable' },
      });

      http_._request
        .mockRejectedValueOnce(serverError)
        .mockResolvedValueOnce({ id: 7 });

      const result = await service.uploadSiteInitializer({}, ERC, {
        zipPath: bundle.file,
        maxRetries: 2,
      });

      expect(result).toEqual({ id: 7 });
      expect(streams).toHaveLength(2);
      // Two distinct stream objects: the second attempt cannot be replaying the
      // first, which is the truncation #65 warns about.
      expect(streams[0]).not.toBe(streams[1]);
      expect(streams[0].destroyed).toBe(true);
    }, 20000);

    it('never retries a caller-supplied stream, which cannot be rewound', async () => {
      const zipStream = Readable.from([Buffer.alloc(8)]);

      http_._request.mockRejectedValue(
        Object.assign(new Error('boom'), {
          response: { status: 503, data: 'unavailable' },
        })
      );

      await expect(
        service.uploadSiteInitializer({}, ERC, { zipStream, maxRetries: 5 })
      ).rejects.toThrow(/HTTP 503/);

      expect(http_._request).toHaveBeenCalledTimes(1);
      expect(zipStream.destroyed).toBe(true);
    });

    it('does not retry an auth failure', async () => {
      const streams = [];
      vi.spyOn(fs, 'createReadStream').mockImplementation(() => {
        const stream = Readable.from([Buffer.alloc(8)]);
        streams.push(stream);
        return stream;
      });

      http_._request.mockRejectedValue(
        Object.assign(new Error('nope'), {
          response: { status: 403, data: { detail: 'forbidden' } },
        })
      );

      await expect(
        service.uploadSiteInitializer({}, ERC, {
          zipPath: bundle.file,
          maxRetries: 5,
        })
      ).rejects.toMatchObject({
        siteInitializer: { kind: 'unauthorized', status: 403 },
      });

      expect(streams).toHaveLength(1);
      expect(streams[0].destroyed).toBe(true);
    });
  });

  describe('error contract', () => {
    beforeEach(() => {
      vi.spyOn(fs, 'createReadStream').mockImplementation(() =>
        Readable.from([Buffer.alloc(8)])
      );
    });

    const reject = (status, data) =>
      http_._request.mockRejectedValue(
        Object.assign(new Error('generic'), { response: { status, data } })
      );

    it('carries the body of a 400 so the offending entry is named', async () => {
      reject(400, 'Invalid entry: site/settings/portlet-preferences.json');

      const err = await service
        .uploadSiteInitializer({}, ERC, { zipPath: bundle.file })
        .catch((caught) => caught);

      expect(err.siteInitializer.kind).toBe('malformed-bundle');
      expect(err.message).toContain(
        'Invalid entry: site/settings/portlet-preferences.json'
      );
      expect(err.siteInitializer.responseBody).toBe(
        'Invalid entry: site/settings/portlet-preferences.json'
      );
    });

    it('distinguishes a missing site from a bad bundle', async () => {
      reject(404, { title: 'No Site exists with the key SITE-ERC-1' });

      const err = await service
        .uploadSiteInitializer({}, ERC, { zipPath: bundle.file })
        .catch((caught) => caught);

      expect(err.siteInitializer.kind).toBe('no-such-site');
      expect(err.message).toContain('SITE-ERC-1');
    });

    it('reports the actual size on a 413', async () => {
      reject(413, 'Request entity too large');

      const err = await service
        .uploadSiteInitializer({}, ERC, { zipPath: bundle.file })
        .catch((caught) => caught);

      expect(err.siteInitializer.kind).toBe('payload-too-large');
      expect(err.siteInitializer.byteLength).toBe(bundle.bytes);
      expect(err.message).toContain(String(bundle.bytes));
    });

    it('classifies a connectionless failure as network, not as a rejection', async () => {
      http_._request.mockRejectedValue(
        Object.assign(new Error('ECONNRESET'), { response: null })
      );

      const err = await service
        .uploadSiteInitializer({}, ERC, {
          zipPath: bundle.file,
          maxRetries: 1,
        })
        .catch((caught) => caught);

      expect(err.siteInitializer.kind).toBe('network');
      expect(err.siteInitializer.status).toBeNull();
    });

    it('throws rather than returning an empty result', async () => {
      reject(400, 'bad');
      await expect(
        service.uploadSiteInitializer({}, ERC, { zipPath: bundle.file })
      ).rejects.toBeInstanceOf(Error);
    });
  });
});

describe('site initializer upload over the wire (LDM#65)', () => {
  let bundle;
  let service;

  beforeEach(() => {
    bundle = writeBundle(64 * 1024);
    const ctx = makeCtx();
    service = new MultipartService(ctx, new HttpCoreService(ctx));
  });

  afterEach(() => {
    fs.rmSync(bundle.dir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  const config = {
    liferayUrl: LIFERAY_URL,
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  it('sends a multipart body carrying the whole bundle, and returns the Site', async () => {
    let seen;

    server.use(
      http.put(
        `${LIFERAY_URL}/o/headless-admin-site/v1.0/sites/:erc/site-initializer`,
        async ({ request, params }) => {
          const raw = Buffer.from(await request.arrayBuffer());
          seen = {
            erc: params.erc,
            contentType: request.headers.get('content-type'),
            length: raw.length,
            hasFilePart: raw.includes(Buffer.from('name="file"')),
            hasSitePart: raw.includes(Buffer.from('name="site"')),
            zipBytes: raw.filter((byte) => byte === 0x5a).length,
          };
          return HttpResponse.json({
            id: 42,
            externalReferenceCode: params.erc,
          });
        }
      )
    );

    const result = await service.uploadSiteInitializer(config, ERC, {
      zipPath: bundle.file,
    });

    expect(result).toEqual({ id: 42, externalReferenceCode: ERC });
    expect(seen.erc).toBe(ERC);
    expect(seen.contentType).toContain('multipart/form-data');
    expect(seen.hasFilePart).toBe(true);
    // Only POST /sites/site-initializer declares a `site` part; the PUT does not.
    expect(seen.hasSitePart).toBe(false);
    // Streaming must not mean truncating: every byte of the bundle arrived.
    expect(seen.zipBytes).toBe(bundle.bytes);
  }, 20000);

  it('is an upsert: the same ERC twice addresses the same site', async () => {
    const calls = [];

    server.use(
      http.put(
        `${LIFERAY_URL}/o/headless-admin-site/v1.0/sites/:erc/site-initializer`,
        async ({ request, params }) => {
          await request.arrayBuffer();
          calls.push({ method: request.method, erc: params.erc });
          return HttpResponse.json({
            id: 42,
            externalReferenceCode: params.erc,
          });
        }
      )
    );

    const first = await service.uploadSiteInitializer(config, ERC, {
      zipPath: bundle.file,
    });
    const second = await service.uploadSiteInitializer(config, ERC, {
      zipPath: bundle.file,
    });

    expect(calls).toEqual([
      { method: 'PUT', erc: ERC },
      { method: 'PUT', erc: ERC },
    ]);
    expect(second.id).toBe(first.id);
  }, 20000);

  it('surfaces Liferay’s own explanation to the caller on a rejection', async () => {
    server.use(
      http.put(
        `${LIFERAY_URL}/o/headless-admin-site/v1.0/sites/:erc/site-initializer`,
        async ({ request }) => {
          await request.arrayBuffer();
          return HttpResponse.json(
            {
              status: 'BAD_REQUEST',
              title: 'Unable to read site-initializer.zip',
              detail: 'Zip entry "documents/hero.jpg" is corrupt',
            },
            { status: 400 }
          );
        }
      )
    );

    const err = await service
      .uploadSiteInitializer(config, ERC, { zipPath: bundle.file })
      .catch((caught) => caught);

    expect(err.name).toBe('LiferayRequestError');
    expect(err.siteInitializer).toMatchObject({
      kind: 'malformed-bundle',
      status: 400,
      externalReferenceCode: ERC,
    });
    expect(err.message).toContain('documents/hero.jpg');
    expect(err.userMessage).toContain('documents/hero.jpg');
    expect(err.response.data.detail).toBe(
      'Zip entry "documents/hero.jpg" is corrupt'
    );
  }, 20000);
});
