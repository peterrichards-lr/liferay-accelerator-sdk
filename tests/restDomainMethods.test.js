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
