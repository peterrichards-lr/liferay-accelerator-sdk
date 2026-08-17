import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { LiferayService } = require('../src/liferay/index.cjs');
const LiferayRestService = require('../src/liferay/rest.cjs');

/**
 * Both LiferayService and LiferayRestService are largely facades: 138 and 24 of
 * their methods respectively do nothing but forward to a collaborator. Those
 * surfaces sat at 18% and 24% statement coverage, which is exactly where a
 * rename or an argument-forwarding slip hides - the wrapper still exists, so
 * nothing fails until a caller reaches for it.
 *
 * Rather than write 160 near-identical assertions, the delegating methods are
 * discovered from each prototype and driven through the same checks.
 */
const DELEGATION = /return (?:await )?this\.(\w+)\.(\w+)\(\.\.\.args\)/;

const FACADES = [
  {
    label: 'LiferayService',
    Ctor: LiferayService,
    minimum: 100,
    collaborators: [
      'commerce',
      'content',
      'pricing',
      'account',
      'taxonomy',
      'rest',
    ],
  },
  {
    label: 'LiferayRestService',
    Ctor: LiferayRestService,
    minimum: 15,
    collaborators: ['httpCore', 'batch', 'batchDelete', 'multipart'],
  },
];

function findDelegations(Ctor) {
  const proto = Ctor.prototype;
  return Object.getOwnPropertyNames(proto)
    .filter((name) => name !== 'constructor')
    .map((name) => {
      const fn = proto[name];
      if (typeof fn !== 'function') return null;
      const match = DELEGATION.exec(fn.toString());
      return match ? { name, collaborator: match[1], target: match[2] } : null;
    })
    .filter(Boolean);
}

const createCtx = () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    trace: vi.fn(),
    success: vi.fn(),
  },
  oauth: { getAccessToken: vi.fn().mockResolvedValue('token') },
});

describe.each(FACADES)(
  '$label delegation',
  ({ Ctor, minimum, collaborators }) => {
    let delegations;

    beforeEach(() => {
      delegations = findDelegations(Ctor);
    });

    it('finds the delegating methods', () => {
      // Guards the discovery itself: if the facade is refactored away, this file
      // should be revisited rather than silently passing on zero methods.
      expect(delegations.length).toBeGreaterThanOrEqual(minimum);
      for (const { collaborator } of delegations) {
        expect(collaborators).toContain(collaborator);
      }
    });

    it('forwards to a method of the same name on the collaborator', () => {
      // Catches the rename slip: a wrapper still present, pointing at a method
      // that no longer carries that name.
      const mismatched = delegations
        .filter(({ name, target }) => name !== target)
        .map(
          ({ name, collaborator, target }) =>
            `${name} -> ${collaborator}.${target}`
        );

      expect(mismatched).toEqual([]);
    });

    it('passes every argument through and returns what the collaborator returns', () => {
      const service = new Ctor(createCtx());
      const args = [
        { liferayUrl: 'http://localhost:8080' },
        'second',
        42,
        { nested: { deep: true } },
        ['a', 'b'],
      ];

      const failures = [];

      for (const { name, collaborator, target } of delegations) {
        const sentinel = Symbol(`${collaborator}.${target}`);
        const spy = vi.fn().mockReturnValue(sentinel);
        const original = service[collaborator];

        // Shadow only the targeted method so unrelated wiring stays intact.
        service[collaborator] = Object.create(original);
        service[collaborator][target] = spy;

        const returned = service[name](...args);

        if (spy.mock.calls.length !== 1) {
          failures.push(
            `${name}: called target ${spy.mock.calls.length} times`
          );
        } else if (
          spy.mock.calls[0].length !== args.length ||
          JSON.stringify(spy.mock.calls[0]) !== JSON.stringify(args)
        ) {
          failures.push(`${name}: forwarded ${spy.mock.calls[0].length} args`);
        }

        // An async wrapper returns a promise; a sync one returns the value.
        const promise = returned && typeof returned.then === 'function';
        if (!promise && returned !== sentinel) {
          failures.push(`${name}: dropped the collaborator's return value`);
        }
        if (promise) {
          returned.catch(() => {});
        }

        service[collaborator] = original;
      }

      expect(failures).toEqual([]);
    });
  }
);

describe('LiferayService delegation semantics', () => {
  it('resolves to the domain service result', async () => {
    const service = new LiferayService(createCtx());
    const expected = { items: [{ id: 1 }], totalCount: 1 };

    service.commerce = Object.create(service.commerce);
    service.commerce.getProducts = vi.fn().mockResolvedValue(expected);

    await expect(service.getProducts({}, 'filter')).resolves.toBe(expected);
    expect(service.commerce.getProducts).toHaveBeenCalledWith({}, 'filter');
  });

  it('propagates a rejection from the domain service untouched', async () => {
    const service = new LiferayService(createCtx());
    const boom = new Error('downstream exploded');

    service.account = Object.create(service.account);
    service.account.getAccounts = vi.fn().mockRejectedValue(boom);

    // The facade must not wrap or swallow the cause.
    await expect(service.getAccounts({})).rejects.toBe(boom);
  });
});
