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

Requires Node `>=22`. Node 20 is no longer supported: `better-sqlite3` 13
and the vitest 5 toolchain both declare `engines.node` of `>=22`, so an
install on Node 20 fails outright rather than degrading. Consumers still on
Node 20 must stay on a tag at or before `v0.8.22`.

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
`ContractValidator` reads at runtime. That comes to 84 files.

> **Pack with npm, not yarn.** `npm pack` honours `files` exactly. `yarn pack`
> in yarn 1.22 ignores both `files` and `.npmignore` - measured at 285 files and
> 12 MB, including coverage output, the test suite, and whatever logs happen to
> sit in `src/logs` on the packing machine.

### Which identity a call authenticates as

Every config that reaches the SDK carries `liferayUrl`, `clientId` and
`clientSecret`, and `OAuthService.getAccessToken` reads the credentials as an
indivisible pair:

| Supplied           | Result                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------- |
| both credentials   | a token from the instance named by `liferayUrl`, which is required and named if absent |
| neither credential | a token for this environment's own OAuth application, whatever `liferayUrl` says       |
| one credential     | **a 400 naming the one that is missing**                                               |

The three arguments used to be tested together, so any incomplete set fell
through to the route branch - which discards the caller's URL and uses this
environment's credentials. A caller whose secret came back empty from a config
read therefore received a valid token for the instance the process is deployed
beside, and found out as a 401 from the host it did name (#234, the same shape
as #227).

The credential-less case stays lenient on purpose. A colocated deployment
legitimately names its own portal and sends no credentials at all - the AICA
fragment hardcodes `themeDisplay.portalURL` with none - and a call that
specifies no identity can only mean the ambient one. A caller that wants that
explicitly can call `getAccessTokenFromRoute` itself.

## Testing

```bash
yarn test
```

### Integration suite

`tests/integration/` runs against a live Liferay and is opt-in:

```bash
yarn test:integration
```

It authenticates with **OAuth client credentials**, not Basic auth. The
username/password fallback in `HttpCoreService` and `graphql.cjs` is scheduled
for removal (`peterrichards-lr/liferay-demo-accelerator#64`), and this suite is
the only live coverage in the project that depended on it.

| Variable                      | Purpose                                                    |
| :---------------------------- | :--------------------------------------------------------- |
| `INTEGRATION_TEST`            | `true` to run the suite. `yarn test:integration` sets it.  |
| `LIFERAY_API_URL`             | Absolute origin of the instance, e.g. `https://host:8443`. |
| `LIFERAY_OAUTH_CLIENT_ID`     | Client id of a headless server OAuth application.          |
| `LIFERAY_OAUTH_CLIENT_SECRET` | Its client secret.                                         |

None of these have defaults, and none of them is optional. With the switch on
and any of them missing, the suite **fails** and names what is absent:

```
Error: The integration suite was asked to run, but 2 of its preconditions are
not met, so there is no live Liferay for it to verify anything against:
  - LIFERAY_OAUTH_CLIENT_ID is not set - the client id of a headless server
    OAuth application on that instance
  - LIFERAY_OAUTH_CLIENT_SECRET is not set - its client secret
```

Without the switch it still skips, which is the one case where skipping is the
right answer: the suite was not asked to run.

Register the OAuth application in Liferay under **Control Panel &rarr; Security
&rarr; OAuth2 Administration** as a _Headless Server_ application with the
**Client Credentials** grant, and grant it the scopes the covered endpoints
need - `Liferay.Headless.Admin.User.everything` for the account reads, and the
`Liferay.Headless.Commerce.Admin.Catalog.everything` /
`...Channel.everything` / `...Pricing.everything` scopes as commerce coverage
is added.

Every test in the suite fails when authentication fails. That was not true
until #228: `getPrimaryAccountId` ended in a bare `catch { return null }`, and
the assertion accepted `null`, so with a rejected client secret the account-id
test passed while only the account-count test failed. The swallow is gone, so
`null` from that method now means one thing - the call authenticated and the
service account names no account.

#### The fixture

The suite asserts against **named products**, never against catalogue totals. A
development instance is not clean and never will be - it holds products from
more than one generation run, and from imports - so `totalCount === 27` asserts
a property of the instance's history rather than of the code under test. Named
products and what each one holds are properties of the seed, and leftovers
cannot move them.

`tests/integration/fixture.json` is that record: per product, its SKU count, its
image and attachment counts, and the byte length, leading magic bytes, SHA-256
and content type of each. It is **recorded, not written**. AICA's `createERC`
builds a code from `Date.now()`, a within-millisecond collision counter and
eight random hex characters, so nothing after the `AICA-PRD-` prefix survives a
regeneration - not even the index, which is a collision counter rather than a
position.

So the fixture ships as data _and_ as a recipe. When the instance no longer
holds what was recorded, the suite fails before any assertion runs and prints
the way back:

```
Error: http://localhost:8080 no longer holds 1 of the products the fixture
names, so the recorded expectations cannot be checked:
  - AICA-PRD-9999999999999-0-deadbeef

Recreate the seed, then re-record the fixture:

  1. wipe (optional):  ./gradlew resetBundleFull
  2. seed:   node scripts/aica-cli.cjs generate --demo --products 5 \
               --images default --pdfs default --non-interactive
  3. record: node scripts/record-integration-fixture.cjs
```

"The fixture has gone" is an instruction rather than a mystery, because
`./gradlew resetBundleFull` wipes the bundle and somebody will hit this.

Recording needs the same three variables as the suite:

```bash
LIFERAY_API_URL=http://localhost:8080 \
LIFERAY_OAUTH_CLIENT_ID=... LIFERAY_OAUTH_CLIENT_SECRET=... \
node scripts/record-integration-fixture.cjs
```

Two things the recipe cannot control, both recorded in the file's `notes`: nine
SKUs per product is a consequence of `--demo` (there is no `--skus` flag), and
the default image and PDF come from the Liferay config object entries
`DEFAULT-IMAGE` and `DEFAULT-PDF`, so their bytes are stable only while those
are.

#### What it covers

| Covers                                                                                               | Why a unit test cannot                                                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| the media round trip - `getProductImages`/`getProductAttachments` then the content fetch             | this instance advertises `src` as `https://localhost:8080/...`, https on the plaintext port. A unit test supplies a well-formed `src`; only `_resolveUrl` rewriting the origin makes the bytes reachable (#189)                                                                         |
| products come back carrying their SKUs, and the four fields the projection returns                   | `getProductsWithSkus` named a path no profile defined, so every call requested `<liferay>/undefined` and the failure was swallowed into an empty list. Every unit test passed, because a mock returns what it is told to (#199)                                                         |
| a multi-page collection returns every row, and a ceiling truncates without moving the reported total | mocks cannot produce a real multi-page envelope. Asserted as relationships - `items.length === totalCount` unbounded, and `items.length === maxItems` with `totalCount` unchanged and `truncated` true - so the assertions hold whatever the collection size happens to be (#200, #203) |

The suite runs under `vitest.integration.config.mjs`, which deliberately does
**not** load `tests/setup.mjs`. That file installs `msw` handlers matching on
path with a wildcard host, so they answer for any origin - including a live
one. Run under the unit config, the suite passed in 1.35s against a hostname
that does not resolve. `tests/setup.mjs` now refuses to load when
`INTEGRATION_TEST` or `RUN_INTEGRATION_TESTS` is set, so that cannot be
recreated by running `vitest` directly.

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

Paths written inline in the source rather than taken from the profile are
harvested too, with `${...}` interpolations replaced by a sentinel segment - they
would otherwise bypass this gate entirely. Where no synced spec describes an
inline path, it must be listed in `KNOWN_UNVERIFIED_INLINE` with a reason; a new
unmatched inline path fails the build, and a listed one that starts matching must
be removed.

Paths fall into four buckets, all reported:

- **verified** - the path exists in a spec, with its supported methods listed
- **prefixes** - API roots and collection bases that longer paths are built
  from, which are not endpoints in their own right
- **unverifiable** - Liferay Objects (`/o/c`), the API explorer, roots with no
  synced spec, and anything served by a placeholder spec
- **failures** - paths that exist in no spec, which fail the build

Existing is not the same as being callable the way the SDK calls it, so the call
sites are checked as well: every `_get`/`_post`/`_put`/`_patch`/`_delete` in
`src/` is paired with the concrete path its second argument resolves to, and the
verb is asserted against the methods that path's template declares. Sending a
`GET` to a `DELETE`-only endpoint fails the build rather than 405ing on a live
DXP.

The verb comes from the call rather than from the `PATH` constant because paths
are routinely composed at the call site - `` `${PATH.WAREHOUSES}/${warehouseId}` ``
is a `DELETE` against `/warehouses/{id}`, not against `/warehouses`. A call whose
path is assembled at run time (a URL held in a variable, a ternary) is counted
and reported as unverifiable rather than guessed at.

`yarn validate` runs both gates.

## Syncing Schemas

```bash
yarn sync                      # every API in the list, plus GraphQL introspection
yarn sync object-admin-v1.0    # only the named APIs, no GraphQL
```

`scripts/sync-schemas.js` fetches the OpenAPI documents in `api-schemas/` from a
running instance, reading `LIFERAY_API_URL`, `LIFERAY_API_USERNAME` and
`LIFERAY_API_PASSWORD` (or `LIFERAY_API_COOKIE`) from the environment or a `.env`
at the repository root. That loader pointed three directories above the
repository until #231 - correct while the script lived inside the AICA monorepo,
outside the checkout entirely after the extraction in #198 - so `yarn sync`
silently loaded no environment at all. Naming APIs on the command line narrows
the run: a blanket sync rewrites every committed document, so an issue that adds
one spec would otherwise bury it in unrelated drift.

Which instance a document came from is the thing an OpenAPI document does not
record: no release, and a `servers` entry that only names the host it was fetched
from. Since these documents are what `validate-rest-paths.cjs` treats as the
authoritative contract for calls that go to production, a spec captured from the
wrong DXP line is a gate that looks authoritative and silently is not.
`api-schemas/PROVENANCE.json` carries that missing fact - source URL, DXP release
and timestamp per document - written on every sync, so it stays beside the specs
without editing them. Set `LIFERAY_DXP_RELEASE` when syncing: DXP usually trims
its `Liferay-Portal` header to the bare product name, and an unset release is
recorded honestly as `unknown` rather than guessed.

That variable is free text, it is the only source of a release in practice, and
nothing compared it to the instance - which is how the manifest came to record
`2026.Q3.2` for documents captured from a `2026.q3.0` box (#231). A sync now
refuses a value that is not a DXP release line (`2026.q3.0`,
`dxp-2025.q1.17-lts`) before it writes a single document, and records it as
`operator-asserted, not measured`, because that is what it is. A shape check
cannot tell a wrong release from a right one; it can refuse a typo, a
placeholder and a joke.

`yarn validate:rest` reads that record back (#204). It prints the lines the
contracts were captured from before it prints a single result, ends its summary
with which DXP line the gate just proved agreement with, and fails the build
when the record stops being true of the directory:

- a document in `api-schemas/` with no entry in the manifest - added by hand,
  never synced, provenance unknown to everyone including the gate
- an entry naming a document that is no longer there
- **a recorded release that is not a release line at all.** The gate asserted
  the manifest's shape and never a value until #231, so `2099.Q9.9` and `banana`
  both passed and were reported in the closing sentence as the line the
  contracts came from
- **a document whose release is unrecorded**, unless it is named in
  `TOLERATED_UNRECORDED_SPECS` in `scripts/spec-provenance.cjs` with the reason.
  `unknown` used to be filtered out before the only value-level check, so a
  manifest recording nothing at all was fully green
- **a tolerance that has outlived what it excuses** - naming a document that has
  since been re-synced, or that is no longer in `api-schemas/`. The two rules
  together pin the list to exactly the set it describes
- **two different recorded releases across the set**, which is the case the
  record exists for: Q1 and Q3 are a real API boundary in this ecosystem, so a
  call validated against one proves nothing about the other

Eleven of the sixteen committed documents record no release - every commerce spec
among them - and only a re-sync against a live instance can move them out of it.
They are tolerated by name rather than by a silent filter, which is the whole
difference: widening the list is a diff somebody reviews, and a twelfth document
going unrecorded fails immediately. The list shrinks to nothing when #231's
re-sync lands.

Conflict is still asserted over recorded releases only. A document whose line is
unrecorded might be from the same line as the rest, and claiming a conflict that
has not been measured is the same fault as claiming a line that has not been
measured. Comparing the recorded line against the line a configured target
actually reports is the follow-up #204 describes, and needs an instance to ask.

## Reading Collections

Liferay answers every collection request with one page and a `totalCount`. Two
kinds of reader sit on top of that, and the difference is in the name (#200).

**Collecting readers** return the whole set and page until `totalCount` is
reached. `liferay.getCatalogs()`, `liferay.rest.getCatalogs()`,
`getAccounts`/`getAccountGroups` and everything built on
`rest._collectPagedItems` are in this group. `getCatalogs` used to cap silently -
at 20 through `rest`, at 100 through the commerce service - which is how a
downstream total-delete path came to run over a truncated catalog list.

**Page readers** return exactly one page and end in `Page`. Every collection
method on `ExtractionFacade` is one of these, because it passes `queryParams`
straight to Liferay: the caller chooses `page` and `pageSize`, and the envelope
they get back carries `totalCount` next to `items`. The un-suffixed names
(`getCommerceCatalogs`, `getDocuments`, ...) still work and still return a page,
but they are deprecated in favour of the `...Page` spelling.

To read every page from a page reader, wrap it in `collectAll`:

```js
const { items, totalCount } = await liferay.extraction.collectAll(
  (params) => liferay.extraction.getCommerceCatalogsPage(config, params),
  { pageSize: 100 }
);
```

A page reader that returns fewer rows than `totalCount` logs a warning naming
the operation and both counts, unless the caller passed `page` - somebody
walking the pages themselves does not need telling. Truncation is therefore
always on the record: an incomplete read is never silent, whichever reader
produced it.

### Ceilings, and what a collecting reader reports

A collecting reader is bounded so an unbounded read cannot exhaust the heap: at
most 50,000 rows and at most 1000 requests. Neither number is a claim about how
many rows a collection has - which is the mistake `_collectAllItems` used to
make, returning its own 5000-row cap as `totalCount` so that a collection of
exactly 5000 and one of 40,000 looked identical (#203).

The readers built on it (`getProducts`, `getProductsWithSkus`, `getAccounts`,
`getAccountGroups`, `getWarehouses`, `getOptions`, `getOptionCategories`,
`getSpecifications`, `getOrders`) now return a `truncated` flag alongside
`items` and `totalCount`, so a caller can act on a partial read rather than
waiting for an operator to notice the warning:

```js
const { items, totalCount, truncated } = await liferay.getWarehouses(config);
if (truncated) {
  // items is a prefix of the collection, not the collection
}
```

`_collectAllItems` takes `maxItems`, `pageSize`, `maxPages` and `onTruncate`.
`onTruncate: 'throw'` raises a `TRUNCATED_READ` error instead of warning, for a
caller whose work is wrong unless it saw every row; `maxItems: null` opts out of
the row ceiling entirely and leaves the read bounded only by `maxPages`.

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

## Search Reindex Endpoint

`triggerReindex` calls the `search-reindex` OSGi module, which lives in the
shared modules repository and is deployed by the environment rather than
released with the SDK. Its application base is therefore configuration, in
descending precedence:

| Source                      | Scope                                                                     |
| :-------------------------- | :------------------------------------------------------------------------ |
| `config.reindexBasePath`    | per call, alongside `liferayUrl` and the credentials                      |
| `LIFERAY_REINDEX_BASE_PATH` | the deployment - an environment variable or client-extension config entry |
| `/o/search-reindex`         | the default, matching the module's own configuration                      |

A trailing slash and a missing leading slash are both tolerated, so
`search-reindex/` and `/o/search-reindex` are equivalent inputs. Only the base
is configurable; the `/reindex/{className}` and `/reindex/all` sub-paths belong
to the module.

The base and the OAuth scope have to be set together. A deployment under
`/o/search-reindex` answers to `Custom.Search.Reindex.everything.write`, so
moving the base without granting the new deployment's scope - or granting that
scope while calling a base that does not serve it - is rejected as a **403 with
an empty body**, which is indistinguishable by eye from a missing grant.

The scope is not configurable here and cannot be. It derives from the module's
`osgi.jaxrs.name` rather than from its application base, so it does not follow
the base this setting names - granting it stays the consumer's job, which is
where OAuth grants already live.

## Configuration Object

`getConfig` and `updateConfig` read and write entries in a Liferay object
definition under the portal's `/o/c` root. The definition is created when the
instance is provisioned rather than released with the SDK, so its REST label is
configuration, in descending precedence:

| Source                       | Scope                                                                     |
| :--------------------------- | :------------------------------------------------------------------------ |
| `config.configObjectName`    | per call, alongside `liferayUrl` and the credentials                      |
| `LIFERAY_CONFIG_OBJECT_NAME` | the deployment - an environment variable or client-extension config entry |
| `aicaconfigurations`         | the default, matching AICA's own object definition                        |

This is a name, not a path. Only the one segment under `/o/c` varies - the root
itself is portal-provided and fixed. A leading or trailing slash is tolerated,
so the `restContextPath` of an object definition (`/aicaconfigurations`) can be
pasted in as it reads; anything that would address a different endpoint rather
than name a segment - an interior slash, `?`, `#` or whitespace - is rejected
with a `TypeError` rather than concatenated into a URL.

The name and the OAuth scope have to be set together, and neither can be
computed from the other. AICA's definition is named `AICAConfiguration` and
served at `/aicaconfigurations`: the URL segment comes from its
`restContextPath` and the scope, `c_aicaconfiguration.everything`, from its
`name`. Pointing this setting at a differently-named definition therefore also
means granting **that** definition's scope in the consumer's
`client-extension.yaml`. A mismatch is rejected as a **403**, which reads as a
missing grant rather than as a name pointing at the wrong object.

Granting the scope stays the consumer's job, which is where OAuth grants
already live; the SDK can only name the object it calls.

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

_Last Updated: 2026-09-11_ | _Last Reviewed: 2026-09-11_
