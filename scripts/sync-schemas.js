/**
 * Liferay Schema Sync Utility
 *
 * This script pulls the authoritative OpenAPI and GraphQL schemas from a
 * running Liferay instance. This ensures the SDK stays aligned with
 * any custom objects, dynamic APIs, or Liferay version upgrades.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Target directory for schemas
const SCHEMA_DIR = path.join(__dirname, '../api-schemas');

/**
 * Where each spec came from, keyed by file name.
 *
 * A Liferay openapi.json records nothing about the portal that served it: no
 * release, and a `servers` entry that only ever says the host it was fetched
 * from. So a spec captured from a 2026.Q1 instance is indistinguishable from
 * one captured from 2026.Q3, while scripts/validate-rest-paths.cjs treats
 * whatever is in api-schemas as the authoritative contract for the paths and
 * methods this SDK sends to production. That is a gate that looks authoritative
 * and silently is not.
 *
 * This file is that missing provenance, written beside the specs rather than
 * into them so the specs stay byte-for-byte what the instance served (LDM #61).
 */
const PROVENANCE_FILE = path.join(SCHEMA_DIR, 'PROVENANCE.json');

/**
 * Basic ENV loader for scripts
 */
function loadEnv() {
  const envPath = path.join(__dirname, '../../../.env');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts
        .slice(1)
        .join('=')
        .trim()
        .replace(/^"(.*)"$/, '$1');
      process.env[key] = value;
    }
  });
}

/**
 * List of core Liferay APIs to sync
 */
const APIS = [
  {
    name: 'headless-admin-user-v1.0',
    path: '/o/headless-admin-user/v1.0/openapi.json',
  },
  {
    name: 'headless-commerce-admin-catalog-v1.0',
    path: '/o/headless-commerce-admin-catalog/v1.0/openapi.json',
  },
  {
    name: 'headless-commerce-admin-order-v1.0',
    path: '/o/headless-commerce-admin-order/v1.0/openapi.json',
  },
  {
    name: 'headless-commerce-admin-pricing-v1.0',
    path: '/o/headless-commerce-admin-pricing/v1.0/openapi.json',
  },
  {
    name: 'headless-commerce-admin-pricing-v2.0',
    path: '/o/headless-commerce-admin-pricing/v2.0/openapi.json',
  },
  {
    name: 'headless-commerce-admin-inventory-v1.0',
    path: '/o/headless-commerce-admin-inventory/v1.0/openapi.json',
  },
  {
    name: 'headless-commerce-admin-channel-v1.0',
    path: '/o/headless-commerce-admin-channel/v1.0/openapi.json',
  },
  {
    name: 'headless-admin-address-v1.0',
    path: '/o/headless-admin-address/v1.0/openapi.json',
  },
  {
    name: 'headless-admin-site-v1.0',
    path: '/o/headless-admin-site/v1.0/openapi.json',
  },
  {
    name: 'headless-delivery-v1.0',
    path: '/o/headless-delivery/v1.0/openapi.json',
  },
  {
    name: 'headless-batch-engine-v1.0',
    path: '/o/headless-batch-engine/v1.0/openapi.json',
  },
  // Added for LDM #61 so the object, taxonomy, list-type and workflow paths the
  // SDK already emits stop being excused as unverifiable by
  // scripts/validate-rest-paths.cjs.
  {
    name: 'object-admin-v1.0',
    path: '/o/object-admin/v1.0/openapi.json',
  },
  {
    name: 'headless-admin-taxonomy-v1.0',
    path: '/o/headless-admin-taxonomy/v1.0/openapi.json',
  },
  {
    name: 'headless-admin-list-type-v1.0',
    path: '/o/headless-admin-list-type/v1.0/openapi.json',
  },
  {
    name: 'headless-admin-workflow-v1.0',
    path: '/o/headless-admin-workflow/v1.0/openapi.json',
  },
  // Data Engine carries the DDM DataDefinition contracts LDM #54 needs; added
  // by the same issue (LDM #61) once #54 turned out to depend on it.
  {
    name: 'data-engine-v2.0',
    path: '/o/data-engine/v2.0/openapi.json',
  },
  // LDM #61 also asked for /o/client-extension-admin/v1.0. It is deliberately
  // absent: no such JAX-RS context is registered on DXP 2026.q1.12-lts - it is
  // missing from /o/api and every openapi.json under it 404s - so listing it
  // here would only make every sync report a failure it cannot fix. Add it if
  // and when Liferay ships the context.
];

/**
 * Narrows APIS to the names given on the command line.
 *
 * Added for LDM #61. A blanket sync rewrites every file in api-schemas, and the
 * eleven already committed were captured from an older DXP, so re-fetching them
 * rewrites all eleven end to end - key order included - and buries the specs an
 * issue actually adds under ~150k lines of unrelated drift. Re-syncing the rest
 * is a real change with real risk (paths and methods this SDK calls may have
 * moved), and it deserves its own commit and its own review rather than
 * riding along with an addition.
 *
 * With no names given the behaviour is unchanged: everything syncs.
 *
 * @param {string[]} names API names as they appear in APIS, e.g. 'object-admin-v1.0'
 * @returns {Array<{name: string, path: string}>}
 */
function selectApis(names) {
  if (names.length === 0) return APIS;

  const unknown = names.filter((name) => !APIS.some((a) => a.name === name));
  if (unknown.length > 0) {
    console.error(`✗ Unknown API name(s): ${unknown.join(', ')}`);
    console.error(`  Known names: ${APIS.map((a) => a.name).join(', ')}`);
    process.exit(1);
  }

  return APIS.filter((api) => names.includes(api.name));
}

/**
 * Reads the recorded provenance, tolerating its absence.
 *
 * @returns {{schemas: Object}}
 */
function readProvenance() {
  if (!fs.existsSync(PROVENANCE_FILE)) return { schemas: {} };

  try {
    const record = JSON.parse(fs.readFileSync(PROVENANCE_FILE, 'utf8'));
    return { ...record, schemas: record.schemas || {} };
  } catch (error) {
    console.warn(`! Ignoring unreadable PROVENANCE.json: ${error.message}`);
    return { schemas: {} };
  }
}

/**
 * Names the DXP release a sync is reading from.
 *
 * `Liferay-Portal` is the only header that carries the product, and on DXP it
 * is routinely trimmed to the product name with no version, so the environment
 * has the last word. When neither says, this records 'unknown' rather than
 * guessing: an honest gap is re-syncable, an invented version is not.
 *
 * @param {import('axios').AxiosResponse} response any portal response
 * @returns {{release: string, source: string}}
 */
function describeRelease(response) {
  const configured = process.env.LIFERAY_DXP_RELEASE;
  if (configured) {
    return { release: configured, source: 'LIFERAY_DXP_RELEASE' };
  }

  const header = response?.headers?.['liferay-portal'];
  // The bare product name is not a version, so it is not provenance.
  if (header && /\d/.test(header)) {
    return { release: header, source: 'Liferay-Portal response header' };
  }

  return {
    release: 'unknown',
    source:
      'not reported by the instance; set LIFERAY_DXP_RELEASE to record it',
  };
}

async function syncREST(baseUrl, auth, apis = APIS) {
  console.log(`\n--- Syncing REST Schemas from ${baseUrl} ---`);

  if (!fs.existsSync(SCHEMA_DIR)) {
    fs.mkdirSync(SCHEMA_DIR, { recursive: true });
  }

  const headers = process.env.LIFERAY_API_COOKIE
    ? { Cookie: process.env.LIFERAY_API_COOKIE }
    : {};
  const requestConfig = process.env.LIFERAY_API_COOKIE ? { headers } : { auth };
  const failed = [];
  const provenance = readProvenance();
  const syncedAt = new Date().toISOString();

  for (const api of apis) {
    const url = `${baseUrl}${api.path}`;
    try {
      console.log(`Fetching ${api.name}...`);
      const response = await axios.get(url, requestConfig);

      const fileName = `${api.name}-openapi.json`;
      const filePath = path.join(SCHEMA_DIR, fileName);

      fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));

      const { release, source } = describeRelease(response);
      provenance.schemas[fileName] = {
        sourceUrl: url,
        dxpRelease: release,
        dxpReleaseSource: source,
        syncedAt,
      };

      console.log(`✓ Saved to ${fileName} (DXP ${release})`);
    } catch (error) {
      const detail = error.response?.status || error.message || error;
      console.error(`✗ Failed to fetch ${api.name}: ${detail}`);
      failed.push(`${api.name} (${detail})`);
    }
  }

  writeProvenance(provenance);

  return failed;
}

/**
 * Writes the provenance record back, sorted so a sync of one spec does not
 * reshuffle the file.
 *
 * @param {{schemas: Object}} provenance
 */
function writeProvenance(provenance) {
  const sorted = {};
  for (const key of Object.keys(provenance.schemas).sort()) {
    sorted[key] = provenance.schemas[key];
  }

  fs.writeFileSync(
    PROVENANCE_FILE,
    `${JSON.stringify({ ...provenance, schemas: sorted }, null, 2)}\n`
  );
  console.log(`✓ Recorded provenance in ${path.basename(PROVENANCE_FILE)}`);
}

async function syncGraphQL(baseUrl, auth) {
  console.log(`\n--- Syncing GraphQL Schema from ${baseUrl} ---`);

  const url = `${baseUrl}/o/graphql`;
  const introspectionQuery = `
    query IntrospectionQuery {
      __schema {
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          description
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const headers = process.env.LIFERAY_API_COOKIE
    ? { Cookie: process.env.LIFERAY_API_COOKIE }
    : {};
  const requestConfig = process.env.LIFERAY_API_COOKIE ? { headers } : { auth };

  try {
    const response = await axios.post(
      url,
      { query: introspectionQuery },
      requestConfig
    );

    const filePath = path.join(SCHEMA_DIR, 'liferay-graphql-schema.json');
    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
    console.log(
      `✓ Saved GraphQL introspection result to liferay-graphql-schema.json`
    );
  } catch (error) {
    console.error(`✗ Failed to fetch GraphQL schema: ${error.message}`);
  }
}

async function main() {
  loadEnv();

  const baseUrl = process.env.LIFERAY_API_URL || 'http://localhost:8080';
  const username = process.env.LIFERAY_API_USERNAME || 'test@liferay.com';
  const password = process.env.LIFERAY_API_PASSWORD || 'test';

  const auth = {
    username,
    password,
  };

  // Named APIs sync on their own; the GraphQL introspection is skipped, because
  // asking for a subset means the caller is not re-capturing the whole tree
  // (LDM #61).
  const requested = process.argv.slice(2);
  const apis = selectApis(requested);

  console.log(`Starting schema sync for ${baseUrl}...`);

  const failed = await syncREST(baseUrl, auth, apis);

  if (requested.length === 0) {
    await syncGraphQL(baseUrl, auth);
  }

  // A sync that could not reach a context used to exit 0, so a stale or absent
  // schema looked like a successful run to anything downstream (LDM #61).
  if (failed.length > 0) {
    console.error(`\n--- Sync Incomplete: ${failed.join(', ')} ---`);
    process.exit(1);
  }

  console.log('\n--- Sync Complete ---');
}

main().catch((err) => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});
