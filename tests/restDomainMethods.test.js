import { describe, it, expect, vi, beforeEach } from 'vitest';
import LiferayRestService from '../src/liferay/rest.cjs';

describe('rest.cjs Domain Methods (Table-Driven Op & Shape Verification)', () => {
  let restClient;
  let mockConfig;

  beforeEach(() => {
    restClient = new LiferayRestService({});
    mockConfig = { liferayUrl: 'http://localhost:8080' };
    vi.spyOn(restClient.httpCore, '_get').mockImplementation(() =>
      Promise.resolve({})
    );
    vi.spyOn(restClient.httpCore, '_post').mockImplementation(() =>
      Promise.resolve({})
    );
    vi.spyOn(restClient.httpCore, '_put').mockImplementation(() =>
      Promise.resolve({})
    );
    vi.spyOn(restClient.httpCore, '_delete').mockImplementation(() =>
      Promise.resolve({})
    );
  });

  const domainCases = [
    {
      name: 'getPrimaryAccountId',
      call: (client, config) => client.getPrimaryAccountId(config),
      mockResponse: { defaultAccountId: 20124 },
      expectedOp: 'get-primary-account-id',
      expectedUrl: '/o/headless-admin-user/v1.0/my-user-account',
      expectedMethod: '_get',
      expectedReturn: 20124,
    },
    {
      name: 'getAccountCount',
      call: (client, config) => client.getAccountCount(config),
      mockResponse: { totalCount: 5 },
      expectedOp: 'get-accounts',
      expectedUrl: '/o/headless-admin-user/v1.0/accounts',
      expectedMethod: '_get',
      expectedReturn: 5,
    },
    {
      name: 'getImportTask',
      call: (client, config) => client.getImportTask(config, '80101'),
      mockResponse: { id: 80101, executeStatus: 'COMPLETED' },
      expectedOp: 'import-task',
      expectedUrl: '/o/headless-batch-engine/v1.0/import-task/80101',
      expectedMethod: '_get',
      expectedReturn: { id: 80101, executeStatus: 'COMPLETED' },
    },
    {
      name: 'getImportTaskFailedItemReport',
      call: (client, config) =>
        client.getImportTaskFailedItemReport(config, '80101'),
      mockResponse: 'header1,header2\nval1,val2',
      expectedOp: 'import-task-error-report',
      expectedUrl:
        '/o/headless-batch-engine/v1.0/import-task/80101/failed-items/report',
      expectedMethod: '_get',
      expectedReturn: [{ header1: 'val1', header2: 'val2' }],
    },
    {
      name: 'getAccountByERC',
      call: (client, config) => client.getAccountByERC(config, 'ERC-123'),
      mockResponse: { id: 30101, externalReferenceCode: 'ERC-123' },
      expectedOp: 'get-account-by-erc',
      expectedUrl:
        '/o/headless-admin-user/v1.0/accounts/by-external-reference-code/ERC-123',
      expectedMethod: '_get',
      expectedReturn: { id: 30101, externalReferenceCode: 'ERC-123' },
    },
  ];

  for (const tc of domainCases) {
    it(`executes ${tc.name} passing expected op and url to httpCore`, async () => {
      restClient.httpCore[tc.expectedMethod].mockResolvedValueOnce(
        tc.mockResponse
      );
      const res = await tc.call(restClient, mockConfig);

      expect(restClient.httpCore[tc.expectedMethod]).toHaveBeenCalled();
      const callArgs = restClient.httpCore[tc.expectedMethod].mock.calls[0];
      expect(callArgs[0]).toBe(mockConfig);
      expect(callArgs[1]).toBe(tc.expectedUrl);
      expect(callArgs[2]).toBe(tc.expectedOp);
      expect(res).toEqual(tc.expectedReturn);
    });
  }

  it('handles 404 gracefully in getAccountByERC by returning null', async () => {
    const error = new Error('Not found');
    error.response = { status: 404 };
    restClient.httpCore._get.mockRejectedValueOnce(error);

    const result = await restClient.getAccountByERC(
      mockConfig,
      'nonexistent-erc'
    );
    expect(result).toBeNull();
  });
});

describe('getPrimaryAccountId failure contract (#228)', () => {
  let restClient;
  let mockConfig;

  beforeEach(() => {
    restClient = new LiferayRestService({});
    mockConfig = { liferayUrl: 'http://localhost:8080' };
    vi.spyOn(restClient.httpCore, '_get');
  });

  it('returns the default account id when the user has one', async () => {
    restClient.httpCore._get.mockResolvedValueOnce({ defaultAccountId: 20124 });

    await expect(restClient.getPrimaryAccountId(mockConfig)).resolves.toBe(
      20124
    );
  });

  it('falls back to the first account brief when there is no default', async () => {
    restClient.httpCore._get.mockResolvedValueOnce({
      accountBriefs: [{ id: 30301 }, { id: 30302 }],
    });

    await expect(restClient.getPrimaryAccountId(mockConfig)).resolves.toBe(
      30301
    );
  });

  // The only outcome that may still be reported as `null`: the request
  // succeeded, and the account it came back with names no account.
  it('returns null when an authenticated response names no account', async () => {
    restClient.httpCore._get.mockResolvedValueOnce({
      id: 20126,
      accountBriefs: [],
    });

    await expect(
      restClient.getPrimaryAccountId(mockConfig)
    ).resolves.toBeNull();
  });

  // Each of these used to return `null` - the same value a genuinely
  // account-less user produces - so no caller could tell absence from failure,
  // and the live suite passed against a host that did not resolve (#228).
  const failures = [
    {
      name: 'a 401 from a rejected credential',
      error: Object.assign(new Error('Unauthorized'), {
        name: 'LiferayRequestError',
        status: 401,
      }),
    },
    {
      name: 'a 404 from a missing headless-admin-user API',
      error: Object.assign(new Error('Not Found'), {
        name: 'LiferayRequestError',
        status: 404,
      }),
    },
    {
      name: 'a 500 from the instance',
      error: Object.assign(new Error('Internal Server Error'), {
        name: 'LiferayRequestError',
        status: 500,
      }),
    },
    {
      name: 'a host that does not resolve',
      error: Object.assign(new Error('getaddrinfo ENOTFOUND'), {
        name: 'LiferayRequestError',
        networkCode: 'ENOTFOUND',
      }),
    },
  ];

  for (const { name, error } of failures) {
    it(`propagates ${name} rather than reporting it as no account`, async () => {
      restClient.httpCore._get.mockRejectedValueOnce(error);

      await expect(restClient.getPrimaryAccountId(mockConfig)).rejects.toThrow(
        error.message
      );
    });
  }

  it('declares no soft status for its op, so no status is tolerated', () => {
    const { SOFT_STATUS_BY_OP } = require('../src/liferay/rest/config.cjs');

    expect(SOFT_STATUS_BY_OP['get-primary-account-id']).toBeUndefined();
  });
});
