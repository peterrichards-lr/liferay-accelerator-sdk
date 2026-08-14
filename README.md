# Liferay Accelerator SDK

Hardened Liferay DXP Integration SDK for Batch, Workflow, and API orchestration.

## Features

- **Dynamic Catalog Adapters**: Decouples API paths between legacy Commerce (Product-first) and standalone Liferay PIM (SKU-first tree) models.
- **Runtime Auto-Discovery**: Probes target DXP capabilities dynamically at boot to select the correct adapter.
- **Contract Enforcement**: Validates inbound and outbound payloads against Liferay DXP OpenAPI specifications.
- **GraphQL Schema Drift Detection**: Statically validates every query the SDK can emit against `api-schemas/liferay_schema.graphql` in CI.
- **Schema Correlation Reporting**: Explains batch import failures by pairing each Liferay error with the payload item that caused it and the SDK's own contract assessment.
- **Transient Error Resilience**: Configurable retry thresholds and soft-status error mapping.

## Setup

```bash
yarn install
```

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
match or no contract mapped for the entity).

The report is logged, broadcast with `emitBatchItemsFailed` and persisted with
the workflow failure event. Correlation is purely diagnostic - a failure to
build it never affects callback processing.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-08-14_ | _Last Reviewed: 2026-08-14_
