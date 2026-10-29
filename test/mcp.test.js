import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const executable = resolve(root, process.env.MCP_TEST_ENTRY || 'superclaude-mcp-server.js');

test('the public executable negotiates MCP and preserves tool state', { timeout: 15000 }, async (t) => {
    await mkdir(resolve(root, '.tmp'), { recursive: true });
    const client = new Client({ name: 'dependency-regression', version: '1.0.0' });
    const transport = new StdioClientTransport({ command: executable, cwd: root, stderr: 'pipe' });
    t.after(() => client.close());
    await client.connect(transport);
    assert.equal(client.getServerVersion().name, 'superclaude-mcp');

    const { tools } = await client.listTools();
    assert.equal(tools.length, 20);
    for (const name of ['sc_analyze', 'sc_persona', 'sc_checkpoint', 'sc_token_mode']) {
        assert.ok(tools.some(tool => tool.name === name), `Missing tool: ${name}`);
    }
    const persona = tools.find(tool => tool.name === 'sc_persona').inputSchema.properties.name.enum[0];
    assert.ok(persona);
    const switched = await client.callTool({ name: 'sc_persona', arguments: { name: persona } });
    assert.match(switched.content[0].text, new RegExp(`Activated ${persona} persona`));
    const token = await client.callTool({ name: 'sc_token_mode', arguments: { mode: 'compressed' } });
    assert.match(token.content[0].text, /Token mode set to: compressed/);
    const analyzed = await client.callTool({
        name: 'sc_analyze',
        arguments: { args: 'dependency compatibility', flags: ['--security'], evidence: { rationale: 'SDK upgrade' } }
    });
    const text = analyzed.content[0].text;
    assert.ok(text.includes(`Persona: ${persona}`));
    assert.ok(text.includes('Token Mode: compressed'));
    assert.ok(text.includes('Arguments: dependency compatibility'));
    assert.ok(text.includes('Flags: --security'));
    assert.ok(text.includes('Rationale: SDK upgrade'));
});
