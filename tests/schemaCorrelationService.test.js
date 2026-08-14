import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const SchemaCorrelationService = require('../src/services/schemaCorrelationService.cjs');
const ContractValidator = require('../src/services/contractValidator.cjs');
const {
  findContractByEntityType,
} = require('../src/utils/contractMappings.cjs');

const { VERDICT, LOCAL_ASSESSMENT } = SchemaCorrelationService;

const createLogger = () => ({
  trace: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  success: vi.fn(),
});

describe('findContractByEntityType', () => {
  it('resolves normalized plural entity types', () => {
    expect(findContractByEntityType('products')).toMatchObject({
      spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
      schema: 'Product',
    });
    expect(findContractByEntityType('priceLists')).toMatchObject({
      schema: 'PriceList',
    });
    expect(findContractByEntityType('addresses')).toMatchObject({
      schema: 'PostalAddress',
    });
  });

  it('resolves raw step keys right-to-left so the trailing entity wins', () => {
    expect(findContractByEntityType('create-product-skus')).toMatchObject({
      schema: 'Sku',
    });
    expect(findContractByEntityType('create-products')).toMatchObject({
      schema: 'Product',
    });
  });

  it('returns null for entity types with no mapped contract', () => {
    expect(findContractByEntityType('data-generation')).toBeNull();
    expect(findContractByEntityType('')).toBeNull();
    expect(findContractByEntityType(undefined)).toBeNull();
  });
});

describe('SchemaCorrelationService', () => {
  let ctx;
  let service;

  beforeEach(() => {
    ctx = { logger: createLogger() };
    ctx.contractValidator = new ContractValidator(ctx);
    service = new SchemaCorrelationService(ctx);
  });

  describe('failed item normalization', () => {
    it('accepts the alternative column names Liferay reports', () => {
      const normalized = service.normalizeFailedItem(
        {
          error: 'Boom',
          itemExternalReferenceCode: 'ERC-1',
          index: '4',
          item: '{"externalReferenceCode":"ERC-1"}',
        },
        1
      );

      expect(normalized).toMatchObject({
        position: 1,
        message: 'Boom',
        externalReferenceCode: 'ERC-1',
        itemIndex: 4,
      });
    });

    it('falls back to a stringified row when the report entry is not an object', () => {
      expect(service.normalizeFailedItem('exploded', 2)).toMatchObject({
        position: 2,
        message: 'exploded',
        externalReferenceCode: null,
        itemIndex: null,
      });
    });
  });

  describe('payload matching', () => {
    const payloadItems = [
      { externalReferenceCode: 'ERC-A', name: { en_US: 'A' } },
      { externalReferenceCode: 'ERC-B', name: { en_US: 'B' } },
    ];
    const ercIndex = new Map(
      payloadItems.map((item) => [item.externalReferenceCode, item])
    );

    it('matches on external reference code first', () => {
      const match = service.matchPayloadItem(
        { externalReferenceCode: 'ERC-B', itemIndex: 0, content: null },
        payloadItems,
        ercIndex
      );
      expect(match).toEqual({
        item: payloadItems[1],
        matchedBy: 'externalReferenceCode',
      });
    });

    it('falls back to the embedded failed item content', () => {
      const match = service.matchPayloadItem(
        {
          externalReferenceCode: null,
          itemIndex: null,
          content:
            '{"externalReferenceCode":"ERC-UNKNOWN","productType":"simple"}',
        },
        payloadItems,
        ercIndex
      );
      expect(match.matchedBy).toBe('failedItemReportContent');
      expect(match.item).toMatchObject({ productType: 'simple' });
    });

    it('resolves an embedded ERC back to the submitted payload item', () => {
      const match = service.matchPayloadItem(
        {
          externalReferenceCode: null,
          itemIndex: null,
          content: { externalReferenceCode: 'ERC-A' },
        },
        payloadItems,
        ercIndex
      );
      expect(match).toEqual({
        item: payloadItems[0],
        matchedBy: 'embeddedExternalReferenceCode',
      });
    });

    it('accepts a 1-based reported index when 0-based is out of range', () => {
      const match = service.matchPayloadItem(
        { externalReferenceCode: null, itemIndex: 2, content: null },
        payloadItems,
        ercIndex
      );
      expect(match).toEqual({
        item: payloadItems[1],
        matchedBy: 'itemIndex(1-based)',
      });
    });

    it('reports unmatched items instead of guessing', () => {
      const match = service.matchPayloadItem(
        {
          externalReferenceCode: 'ERC-MISSING',
          itemIndex: null,
          content: null,
        },
        payloadItems,
        ercIndex
      );
      expect(match).toEqual({ item: null, matchedBy: 'unmatched' });
    });
  });

  describe('local assessment', () => {
    it('flags a locally preventable failure when the payload breaks the contract', () => {
      const assessment = service.assessLocally(
        findContractByEntityType('products'),
        { externalReferenceCode: 'ERC-A', productType: 42 }
      );

      expect(assessment.status).toBe(LOCAL_ASSESSMENT.FAILED);
      expect(assessment.errors.length).toBeGreaterThan(0);
      expect(service._verdictFor(assessment)).toBe(VERDICT.LOCALLY_PREVENTABLE);
    });

    it('passes a payload that satisfies the contract', () => {
      const assessment = service.assessLocally(
        findContractByEntityType('products'),
        {
          externalReferenceCode: 'ERC-A',
          active: true,
          name: { en_US: 'Widget' },
          productType: 'simple',
        }
      );

      expect(assessment.status).toBe(LOCAL_ASSESSMENT.PASSED);
      expect(service._verdictFor(assessment)).toBe(VERDICT.SERVER_SIDE_ONLY);
    });

    it('skips when no contract is mapped for the entity', () => {
      const assessment = service.assessLocally(null, { anything: true });
      expect(assessment.status).toBe(LOCAL_ASSESSMENT.SKIPPED);
      expect(assessment.reason).toMatch(/No OpenAPI contract/);
      expect(service._verdictFor(assessment)).toBe(VERDICT.UNDIAGNOSED);
    });

    it('skips when the failed item could not be correlated', () => {
      const assessment = service.assessLocally(
        findContractByEntityType('products'),
        null
      );
      expect(assessment.status).toBe(LOCAL_ASSESSMENT.SKIPPED);
      expect(assessment.reason).toMatch(/could not be correlated/);
    });

    it('skips when no ContractValidator is registered on the context', () => {
      const bare = new SchemaCorrelationService({ logger: createLogger() });
      const assessment = bare.assessLocally(
        findContractByEntityType('products'),
        { externalReferenceCode: 'ERC-A' }
      );
      expect(assessment.status).toBe(LOCAL_ASSESSMENT.SKIPPED);
      expect(assessment.reason).toMatch(/No ContractValidator/);
    });
  });

  describe('correlate', () => {
    it('classifies each failed item against the submitted payload', async () => {
      const report = await service.correlate({
        config: {},
        batchId: '9001',
        batchERC: 'PRODUCT_BATCH_1',
        stepKey: 'create-products',
        entityType: 'products',
        failureReport: [
          { externalReferenceCode: 'ERC-BAD', errorMessage: 'Invalid product' },
          {
            externalReferenceCode: 'ERC-GOOD',
            errorMessage: 'Catalog not found',
          },
          { externalReferenceCode: 'ERC-GHOST', errorMessage: 'Unknown error' },
        ],
        submittedItems: [
          { externalReferenceCode: 'ERC-BAD', productType: 42 },
          {
            externalReferenceCode: 'ERC-GOOD',
            active: true,
            name: { en_US: 'Widget' },
            productType: 'simple',
          },
        ],
      });

      expect(report.contract).toEqual({
        spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
        schema: 'Product',
      });
      expect(report.payloadSource).toBe('provided');
      expect(report.summary).toMatchObject({
        failedItemCount: 3,
        analyzedCount: 3,
        correlatedCount: 2,
        locallyPreventableCount: 1,
        serverSideOnlyCount: 1,
        undiagnosedCount: 1,
        truncated: false,
      });

      expect(report.entries.map((entry) => entry.verdict)).toEqual([
        VERDICT.LOCALLY_PREVENTABLE,
        VERDICT.SERVER_SIDE_ONLY,
        VERDICT.UNDIAGNOSED,
      ]);
      expect(report.entries[0].liferayError.message).toBe('Invalid product');
      expect(report.entries[0].payloadItem).toMatchObject({ productType: 42 });
    });

    it('fetches the submitted content when the payload is not supplied', async () => {
      ctx.liferay = {
        getImportTaskSubmittedContent: vi
          .fn()
          .mockResolvedValue([
            { externalReferenceCode: 'ERC-BAD', productType: 42 },
          ]),
      };

      const report = await service.correlate({
        config: { liferayUrl: 'http://localhost:8080' },
        batchId: '9002',
        entityType: 'products',
        failureReport: [
          { externalReferenceCode: 'ERC-BAD', errorMessage: 'Invalid product' },
        ],
      });

      expect(ctx.liferay.getImportTaskSubmittedContent).toHaveBeenCalledWith(
        { liferayUrl: 'http://localhost:8080' },
        '9002'
      );
      expect(report.payloadSource).toBe('importTaskSubmittedContent');
      expect(report.entries[0].verdict).toBe(VERDICT.LOCALLY_PREVENTABLE);
    });

    it('degrades gracefully when the submitted content cannot be retrieved', async () => {
      ctx.liferay = {
        getImportTaskSubmittedContent: vi
          .fn()
          .mockRejectedValue(new Error('403 Forbidden')),
      };

      const report = await service.correlate({
        config: {},
        batchId: '9003',
        entityType: 'products',
        failureReport: [{ errorMessage: 'Invalid product' }],
      });

      expect(report.payloadSource).toBe('unavailable');
      expect(report.entries[0].verdict).toBe(VERDICT.UNDIAGNOSED);
      expect(ctx.logger.warn).toHaveBeenCalled();
    });

    it('does not fetch submitted content when the fetch is disabled', async () => {
      ctx.liferay = { getImportTaskSubmittedContent: vi.fn() };

      const report = await service.correlate({
        config: {},
        batchId: '9004',
        entityType: 'products',
        failureReport: [{ errorMessage: 'Invalid product' }],
        fetchSubmittedContent: false,
      });

      expect(ctx.liferay.getImportTaskSubmittedContent).not.toHaveBeenCalled();
      expect(report.payloadSource).toBe('unavailable');
    });

    it('caps the number of analyzed entries and flags truncation', async () => {
      const failureReport = Array.from({ length: 5 }, (_, index) => ({
        externalReferenceCode: `ERC-${index}`,
        errorMessage: 'Invalid product',
      }));

      const report = await service.correlate({
        config: {},
        batchId: '9005',
        entityType: 'products',
        failureReport,
        submittedItems: [],
        maxEntries: 2,
      });

      expect(report.entries).toHaveLength(2);
      expect(report.summary).toMatchObject({
        failedItemCount: 5,
        analyzedCount: 2,
        truncated: true,
      });
    });

    it('honours an explicit contract override', async () => {
      const report = await service.correlate({
        config: {},
        batchId: '9006',
        entityType: 'data-generation',
        contract: {
          spec: 'headless-admin-user-v1.0-openapi.json',
          schema: 'Account',
        },
        failureReport: [{ externalReferenceCode: 'ACC-1', error: 'Nope' }],
        submittedItems: [{ externalReferenceCode: 'ACC-1', type: 'business' }],
      });

      expect(report.contract.schema).toBe('Account');
      expect(report.entries[0].verdict).toBe(VERDICT.SERVER_SIDE_ONLY);
    });
  });

  describe('formatReport', () => {
    it('presents Liferay error, local assessment and failed payload item together', async () => {
      const report = await service.correlate({
        config: {},
        batchId: '9007',
        batchERC: 'PRODUCT_BATCH_7',
        stepKey: 'create-products',
        entityType: 'products',
        failureReport: [
          { externalReferenceCode: 'ERC-BAD', errorMessage: 'Invalid product' },
        ],
        submittedItems: [{ externalReferenceCode: 'ERC-BAD', productType: 42 }],
      });

      const formatted = service.formatReport(report);

      expect(formatted).toContain('Schema Correlation Report - batch 9007');
      expect(formatted).toContain('Product (headless-commerce-admin-catalog');
      expect(formatted).toContain('Liferay Error');
      expect(formatted).toContain('Invalid product');
      expect(formatted).toContain('Local Assessment');
      expect(formatted).toContain('FAILED');
      expect(formatted).toContain('Failed Payload Item');
      expect(formatted).toContain('"productType":42');
      expect(formatted).toContain(VERDICT.LOCALLY_PREVENTABLE);
    });

    it('truncates oversized payload items', () => {
      const long = 'x'.repeat(2000);
      const formatted = service.formatReport(
        {
          batchId: '1',
          batchERC: null,
          stepKey: null,
          entityType: null,
          contract: null,
          payloadSource: 'provided',
          summary: {
            failedItemCount: 1,
            analyzedCount: 1,
            truncated: false,
            correlatedCount: 1,
            locallyPreventableCount: 0,
            serverSideOnlyCount: 0,
            undiagnosedCount: 1,
          },
          entries: [
            {
              position: 1,
              externalReferenceCode: null,
              liferayError: { message: 'Boom', itemIndex: null, raw: {} },
              localAssessment: {
                status: LOCAL_ASSESSMENT.SKIPPED,
                errors: [],
                reason: 'no contract',
              },
              payloadItem: { blob: long },
              payloadMatchedBy: 'itemIndex',
              verdict: VERDICT.UNDIAGNOSED,
            },
          ],
        },
        { maxPayloadChars: 50 }
      );

      expect(formatted).toContain('...');
      expect(formatted).not.toContain(long);
    });

    it('handles a missing report without throwing', () => {
      expect(service.formatReport(null)).toMatch(/unavailable/);
    });
  });
});
