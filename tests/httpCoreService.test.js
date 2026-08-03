import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { Readable } = require('stream');

const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');

describe('HttpCoreService._downloadFile', () => {
  let httpCore;
  let destination;

  beforeEach(() => {
    const mockCtx = {
      logger: {
        info: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        trace: vi.fn(),
      },
    };
    httpCore = new HttpCoreService(mockCtx);
    destination = path.join(
      os.tmpdir(),
      `http-core-service-download-test-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.tmp`
    );
  });

  afterEach(() => {
    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
  });

  it('does not create a partial file or leak a write stream when the GET fails', async () => {
    const getError = new Error('Request failed');
    httpCore._get = vi.fn().mockRejectedValue(getError);

    await expect(
      httpCore._downloadFile({}, '/some/url', destination)
    ).rejects.toThrow('Request failed');

    // Because the write stream is only opened once the GET succeeds, a
    // failed GET must never create (or leave behind) a destination file,
    // and therefore never leaks an open file descriptor for it.
    expect(fs.existsSync(destination)).toBe(false);
  });

  it('writes the downloaded content to disk when the GET succeeds', async () => {
    const fakeStream = Readable.from(['hello ', 'world']);
    httpCore._get = vi.fn().mockResolvedValue({ data: fakeStream });

    await httpCore._downloadFile({}, '/some/url', destination);

    expect(fs.existsSync(destination)).toBe(true);
    expect(fs.readFileSync(destination, 'utf8')).toBe('hello world');
  });

  it('closes the write stream and removes the partial file if the response stream errors mid-download', async () => {
    const fakeStream = new Readable({
      read() {
        this.push('partial-data');
        process.nextTick(() => this.emit('error', new Error('stream boom')));
      },
    });
    httpCore._get = vi.fn().mockResolvedValue({ data: fakeStream });

    await expect(
      httpCore._downloadFile({}, '/some/url', destination)
    ).rejects.toThrow('stream boom');

    expect(fs.existsSync(destination)).toBe(false);
  });
});
