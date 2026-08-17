import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { ENV } = require('../src/utils/constants.cjs');
const {
  DEFAULT_BATCH_SAMPLE,
  MODES,
  batchSampleSize,
  mode,
  shouldValidateInbound,
  shouldValidateOutbound,
} = require('../src/utils/contractValidationPolicy.cjs');

describe('contract validation policy', () => {
  let original;

  beforeEach(() => {
    original = {
      nodeEnv: ENV.NODE_ENV,
      validation: ENV.LIFERAY_CONTRACT_VALIDATION,
      sample: ENV.LIFERAY_CONTRACT_VALIDATION_SAMPLE,
      vitest: process.env.VITEST,
    };
  });

  afterEach(() => {
    ENV.NODE_ENV = original.nodeEnv;
    ENV.LIFERAY_CONTRACT_VALIDATION = original.validation;
    ENV.LIFERAY_CONTRACT_VALIDATION_SAMPLE = original.sample;
    if (original.vitest === undefined) delete process.env.VITEST;
    else process.env.VITEST = original.vitest;
  });

  describe('mode resolution', () => {
    it('defaults to auto, and falls back to auto for anything unrecognised', () => {
      ENV.LIFERAY_CONTRACT_VALIDATION = 'auto';
      expect(mode()).toBe(MODES.AUTO);

      for (const value of ['', 'yes', 'true', 'sometimes', undefined]) {
        ENV.LIFERAY_CONTRACT_VALIDATION = value;
        expect(mode()).toBe(MODES.AUTO);
      }
    });

    it('accepts on and off regardless of case or padding', () => {
      ENV.LIFERAY_CONTRACT_VALIDATION = ' ON ';
      expect(mode()).toBe(MODES.ON);
      ENV.LIFERAY_CONTRACT_VALIDATION = 'Off';
      expect(mode()).toBe(MODES.OFF);
    });
  });

  describe('auto preserves the historical behaviour', () => {
    beforeEach(() => {
      ENV.LIFERAY_CONTRACT_VALIDATION = 'auto';
    });

    it('validates outbound payloads in development and test only', () => {
      ENV.NODE_ENV = 'development';
      expect(shouldValidateOutbound()).toBe(true);
      ENV.NODE_ENV = 'test';
      expect(shouldValidateOutbound()).toBe(true);
      ENV.NODE_ENV = 'production';
      expect(shouldValidateOutbound()).toBe(false);
    });

    it('validates inbound responses in development only, and never under Vitest', () => {
      ENV.NODE_ENV = 'development';
      delete process.env.VITEST;
      expect(shouldValidateInbound()).toBe(true);

      process.env.VITEST = 'true';
      expect(shouldValidateInbound()).toBe(false);

      delete process.env.VITEST;
      ENV.NODE_ENV = 'test';
      expect(shouldValidateInbound()).toBe(false);
      ENV.NODE_ENV = 'production';
      expect(shouldValidateInbound()).toBe(false);
    });
  });

  describe('explicit modes override NODE_ENV', () => {
    it('validates in production when switched on', () => {
      ENV.NODE_ENV = 'production';
      ENV.LIFERAY_CONTRACT_VALIDATION = 'on';

      expect(shouldValidateOutbound()).toBe(true);
      // Even under Vitest, which auto suppresses.
      process.env.VITEST = 'true';
      expect(shouldValidateInbound()).toBe(true);
    });

    it('validates nothing in development when switched off', () => {
      ENV.NODE_ENV = 'development';
      ENV.LIFERAY_CONTRACT_VALIDATION = 'off';

      expect(shouldValidateOutbound()).toBe(false);
      expect(shouldValidateInbound()).toBe(false);
    });
  });

  describe('batch sample size', () => {
    beforeEach(() => {
      ENV.LIFERAY_CONTRACT_VALIDATION_SAMPLE = NaN;
    });

    it('samples the leading items under auto', () => {
      ENV.LIFERAY_CONTRACT_VALIDATION = 'auto';
      expect(batchSampleSize(200)).toBe(DEFAULT_BATCH_SAMPLE);
      // Never more items than the batch holds.
      expect(batchSampleSize(2)).toBe(2);
    });

    it('validates every item when validation is explicitly on', () => {
      // At 1.1us per item, a 200-item batch costs 0.22ms; there is no reason to
      // let items through unchecked once validation is deliberately enabled.
      ENV.LIFERAY_CONTRACT_VALIDATION = 'on';
      expect(batchSampleSize(200)).toBe(200);
    });

    it('honours an explicit sample count, with 0 meaning all', () => {
      ENV.LIFERAY_CONTRACT_VALIDATION = 'auto';
      ENV.LIFERAY_CONTRACT_VALIDATION_SAMPLE = 10;
      expect(batchSampleSize(200)).toBe(10);
      expect(batchSampleSize(4)).toBe(4);

      ENV.LIFERAY_CONTRACT_VALIDATION_SAMPLE = 0;
      expect(batchSampleSize(200)).toBe(200);
    });

    it('returns nothing to validate for an empty batch', () => {
      expect(batchSampleSize(0)).toBe(0);
      expect(batchSampleSize(undefined)).toBe(0);
    });
  });
});
