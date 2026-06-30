#!/usr/bin/env node
const memoryCache = require('memory-cache');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const {
  StdioServerTransport,
} = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const OAuthService = require('../src/liferay/oauth.cjs');
const { LiferayService } = require('../src/liferay/index.cjs');

// Log to stderr because stdout is used for stdio JSON-RPC transport protocol!
const logger = {
  info: (...args) => console.error('[INFO]', ...args),
  warn: (...args) => console.error('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  debug: (...args) => console.error('[DEBUG]', ...args),
};

const cache = {
  get: (key) => memoryCache.get(key),
  set: (key, value, ttl) => memoryCache.put(key, value, ttl),
  clear: () => memoryCache.clear(),
};

const config = {
  get: (key) => process.env[key],
};

// Initialize SDK services
let oauth;
let liferayService;

try {
  oauth = new OAuthService({ cache, logger });
  liferayService = new LiferayService({
    oauth,
    logger,
    cache,
    config,
  });
} catch (err) {
  logger.error('Failed to initialize Liferay services:', err);
  process.exit(1);
}

// Initialize MCP Server
const server = new Server(
  {
    name: 'liferay-ldk-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define Tools
const TOOLS = [
  {
    name: 'ldk_get_capabilities',
    description:
      'Probe Liferay DXP capabilities and connection details (Legacy Commerce vs standalone PIM).',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'ldk_graphql',
    description: 'Run a raw GraphQL query against Liferay DXP endpoints.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'The GraphQL query string' },
        variables: { type: 'object', description: 'Query variables' },
      },
      required: ['query'],
    },
  },
  {
    name: 'ldk_create_batch',
    description:
      'Import/upsert a batch of entities (products, price lists, accounts, orders, etc.) using SDK methods.',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: [
            'products',
            'priceLists',
            'accounts',
            'orders',
            'warehouses',
            'specifications',
            'options',
          ],
          description: 'The type of entity to seed',
        },
        items: {
          type: 'array',
          items: { type: 'object' },
          description: 'The array of entity payload objects',
        },
      },
      required: ['entityType', 'items'],
    },
  },
  {
    name: 'ldk_delete_batch',
    description:
      'Delete a batch of entities by external reference codes (ERCs) or IDs.',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: [
            'products',
            'priceLists',
            'accounts',
            'orders',
            'warehouses',
            'specifications',
            'options',
          ],
          description: 'The type of entity to delete',
        },
        identifiers: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Array of externalReferenceCodes (ERCs) or numeric IDs to delete',
        },
      },
      required: ['entityType', 'identifiers'],
    },
  },
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const connectionConfig = {
    liferayUrl: process.env.LIFERAY_URL || process.env.LIFERAY_API_URL,
    clientId: process.env.LIFERAY_OAUTH_CLIENT_ID,
    clientSecret: process.env.LIFERAY_OAUTH_CLIENT_SECRET,
  };

  try {
    switch (name) {
      case 'ldk_get_capabilities': {
        const adapter =
          await liferayService.getCatalogAdapter(connectionConfig);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  liferayUrl: connectionConfig.liferayUrl,
                  adapterType: adapter.constructor.name,
                  isPimActive:
                    adapter.constructor.name !== 'LegacyProductFirstAdapter',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case 'ldk_graphql': {
        const result = await liferayService.graphql.query(
          connectionConfig,
          args.query,
          args.variables
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'ldk_create_batch': {
        let result;
        const { entityType, items } = args;

        switch (entityType) {
          case 'products':
            result = await liferayService.createProductsBatch(
              connectionConfig,
              items
            );
            break;
          case 'priceLists':
            result = await liferayService.createPriceListsBatch(
              connectionConfig,
              items
            );
            break;
          case 'accounts':
            result = await liferayService.createAccountsBatch(
              connectionConfig,
              items
            );
            break;
          case 'orders':
            result = await liferayService.createOrdersBatch(
              connectionConfig,
              items
            );
            break;
          case 'warehouses':
            result = await liferayService.createWarehousesBatch(
              connectionConfig,
              items
            );
            break;
          case 'specifications':
            result = await liferayService.createSpecificationsBatch(
              connectionConfig,
              items
            );
            break;
          case 'options':
            result = await liferayService.createOptionsBatch(
              connectionConfig,
              items
            );
            break;
          default:
            throw new Error(`Unsupported creation entity type: ${entityType}`);
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'ldk_delete_batch': {
        let result;
        const { entityType, identifiers } = args;

        switch (entityType) {
          case 'products':
            result = await liferayService.deleteProductsBatch(
              connectionConfig,
              identifiers
            );
            break;
          case 'priceLists':
            result = await liferayService.deletePriceListsBatch(
              connectionConfig,
              identifiers
            );
            break;
          case 'accounts':
            result = await liferayService.deleteAccountsBatch(
              connectionConfig,
              identifiers
            );
            break;
          case 'orders':
            result = await liferayService.deleteOrdersBatch(
              connectionConfig,
              identifiers
            );
            break;
          case 'warehouses':
            result = await liferayService.deleteWarehousesBatch(
              connectionConfig,
              identifiers
            );
            break;
          case 'specifications':
            result = await liferayService.deleteSpecificationsBatch(
              connectionConfig,
              identifiers
            );
            break;
          case 'options':
            result = await liferayService.deleteOptionsBatch(
              connectionConfig,
              identifiers
            );
            break;
          default:
            throw new Error(`Unsupported deletion entity type: ${entityType}`);
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    logger.error(`Error executing tool ${name}:`, err);
    return {
      isError: true,
      content: [{ type: 'text', text: err.message || String(err) }],
    };
  }
});

// Start Server over Stdio transport
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info(
    'Liferay LDK MCP Server started successfully over stdio transport.'
  );
}

run().catch((err) => {
  logger.error('Failed to run Liferay LDK MCP Server:', err);
  process.exit(1);
});
