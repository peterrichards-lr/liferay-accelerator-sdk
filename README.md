# Liferay Accelerator SDK

Hardened Liferay DXP Integration SDK for Batch, Workflow, and API orchestration.

## Features

- **Dynamic Catalog Adapters**: Decouples API paths between legacy Commerce (Product-first) and standalone Liferay PIM (SKU-first tree) models.
- **Runtime Auto-Discovery**: Probes target DXP capabilities dynamically at boot to select the correct adapter.
- **Contract Enforcement**: Validates inbound and outbound payloads against Liferay DXP OpenAPI specifications, in any environment via `LIFERAY_CONTRACT_VALIDATION`.
- **API Drift Detection**: Statically validates every GraphQL query and REST path the SDK can emit against the Liferay schema and OpenAPI specs in CI.
- **Schema Correlation Reporting**: Explains batch import failures by pairing each Liferay error with the payload item that caused it and the SDK's own contract assessment.
- **Transient Error Resilience**: Configurable retry thresholds and soft-status error mapping.

## Setup

```bash
yarn install
```

Requires Node `20.x` or `>=22` (`better-sqlite3` supports both but not 21.x).

## Consuming the SDK

The SDK is consumed as a git dependency pinned to a release tag:

```json
{
  "dependencies": {
    "@liferay/accelerator-sdk": "github:peterrichards-lr/liferay-accelerator-sdk#v0.6.0"
  }
}
```

Pin the tag rather than a branch. The SDK is pre-1.0, so a minor bump can change
runtime behaviour - `v0.6.0`, for example, changed `getOrders`' default field
selection and made `getWarehouseItems` reject a filter argument.

The `files` allowlist in `package.json` bounds what a published tarball
contains: `src` (minus `src/logs`), `bin`, and `api-schemas/*.json`, which
`ContractValidator` reads at runtime. That comes to 69 files.

> **Pack with npm, not yarn.** `npm pack` honours `files` exactly. `yarn pack`
> in yarn 1.22 ignores both `files` and `.npmignore` - measured at 285 files and
> 12 MB, including coverage output, the test suite, and whatever logs happen to
> sit in `src/logs` on the packing machine.

## Testing

```bash
yarn test
```

## Linting & Formatting

```bash
yarn lint
```

## GraphQL Schema Validation

```bash
yarn validate:graphql
```

`LiferayGraphQLService` builds its queries as template strings at call time, so
there are no static `gql` literals to lint. Instead, `scripts/validate-graphql-queries.cjs`
harvests the real query strings by invoking every service method against a stub
transport, then parses and validates each one against
`api-schemas/liferay_schema.graphql`. Missing fields, renamed query methods and
unsupported arguments therefore fail in CI rather than at runtime.

Add an entry to `QUERY_SPECS` in that script whenever a new query method is
added to `src/liferay/graphql.cjs` - `tests/graphqlSchemaValidation.test.js`
fails if a public query method is left uncovered.

## REST Path Validation

```bash
yarn validate:rest
```

The same treatment for the REST surface. `scripts/validate-rest-paths.cjs`
invokes every entry in the path profile
(`src/utils/profiles/legacyProfile.cjs`, which also backs the catalog adapters)
with sentinel arguments, then matches each emitted path segment-wise against the
path templates declared by the OpenAPI documents in `api-schemas/`.

Paths fall into four buckets, all reported:

- **verified** - the path exists in a spec, with its supported methods listed
- **prefixes** - API roots and collection bases that longer paths are built
  from, which are not endpoints in their own right
- **unverifiable** - Liferay Objects (`/o/c`), the API explorer, the unsynced
  taxonomy API, and anything served by a placeholder spec
- **failures** - paths that exist in no spec, which fail the build

`yarn validate` runs both gates.

## Contract Validation

Outbound payloads, batch items and inbound responses can be validated against
the Liferay OpenAPI specs at runtime. Historically this was hard-gated on
`NODE_ENV`, so the safety net was unavailable in production - where a malformed
payload actually costs a failed batch and a diagnosis.

| `LIFERAY_CONTRACT_VALIDATION` | Behaviour                                                           |
| :---------------------------- | :------------------------------------------------------------------ |
| `auto` (default)              | outbound in `development` and `test`, inbound in `development` only |
| `on`                          | always validate, whatever `NODE_ENV` says                           |
| `off`                         | never validate                                                      |

Batch submissions validate a sample of leading items: 3 under `auto`, every item
under `on`, or `LIFERAY_CONTRACT_VALIDATION_SAMPLE` items (`0` means all).

The gate was assumed to be expensive. Measured against the catalog `Product`
schema with a realistic 22-field payload:

|                                                          |        Cost |
| :------------------------------------------------------- | ----------: |
| validate one item                                        |  **1.1 us** |
| validate all 200 items of a batch                        | **0.22 ms** |
| load and preprocess all 11 specs (constructor, one-time) |      210 ms |
| AJV compiling one schema (first use, one-time)           |       40 ms |

Per-item validation is therefore free next to the 20-200 ms HTTP round trip that
follows it, which is why `on` validates every batch item rather than sampling.
The one-time costs are paid by any caller that constructs a `ContractValidator`
at all, whatever this setting says.

## Batch Failure Diagnostics

When a Liferay batch import reports failed items, `BatchCallbackService` builds
a **Schema Correlation Report** via `SchemaCorrelationService`. Each failed item
is presented as:

- **Liferay Error** - the message from `getImportTaskFailedItemReport`.
- **ContractValidator Local Assessment** - the same payload item re-validated
  against the authoritative OpenAPI contract.
- **Failed Payload Item** - the submitted item, matched by external reference
  code, embedded report content or reported index.

Each entry is given a verdict: `LOCALLY_PREVENTABLE` (the SDK's own contract
rejects the item too), `SERVER_SIDE_ONLY` (the payload is contract-valid, so the
rejection is a data/business/permission problem) or `UNDIAGNOSED` (no payload
match, no contract mapped for the entity, or the mapped spec is a placeholder).

A spec that declares no paths is treated as a placeholder rather than a synced
Liferay API description - its schemas assert too little for a passing validation
to mean anything, so the report says it could not assess the item instead of
claiming the payload is contract-clean. `headless-commerce-admin-order-v1.0`
is currently in that state; re-syncing it with `yarn sync` restores full
assessment for orders automatically.

The report is logged, broadcast with `emitBatchItemsFailed` and persisted with
the workflow failure event. Correlation is purely diagnostic - a failure to
build it never affects callback processing.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-08-17_ | _Last Reviewed: 2026-08-17_
