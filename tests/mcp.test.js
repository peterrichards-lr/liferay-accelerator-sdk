import { spawn } from 'child_process';
import path from 'path';

describe('Liferay LDK MCP Server stdio integration', () => {
  it('should start and respond to tools/list request', () => {
    return new Promise((resolve, reject) => {
      const serverPath = path.resolve(__dirname, '../bin/mcp-server.cjs');
      const cp = spawn('node', [serverPath], {
        env: {
          ...process.env,
          LIFERAY_URL: 'http://localhost:8080',
          LIFERAY_OAUTH_CLIENT_ID: 'client-id',
          LIFERAY_OAUTH_CLIENT_SECRET: 'client-secret',
        },
      });

      let stdoutData = '';
      let stderrData = '';

      cp.stdout.on('data', (data) => {
        stdoutData += data.toString();
        // Once we get a full newline-delimited JSON response, parse and verify it
        try {
          const res = JSON.parse(stdoutData.trim());
          if (res.id === 1) {
            expect(res.result.tools).toBeDefined();
            expect(res.result.tools.length).toBeGreaterThan(0);
            expect(res.result.tools.some((t) => t.name === 'ldk_graphql')).toBe(
              true
            );
            cp.kill();
            resolve();
          }
        } catch (e) {
          // Keep buffering until valid JSON is received
        }
      });

      cp.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      cp.on('error', (err) => {
        reject(err);
      });

      cp.on('close', (code) => {
        if (stdoutData === '') {
          reject(
            new Error(`MCP server closed prematurely. Stderr: ${stderrData}`)
          );
        }
      });

      // Write list tools request to stdin
      const req = {
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 1,
      };
      cp.stdin.write(JSON.stringify(req) + '\n');
    });
  });
});
