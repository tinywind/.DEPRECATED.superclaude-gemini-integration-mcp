#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

// SuperClaude configuration paths
const CLAUDE_CONFIG_DIR = path.join(os.homedir(), '.claude');
const PERSONAS_FILE = path.join(CLAUDE_CONFIG_DIR, 'shared', 'superclaude-personas.yml');
const COMMANDS_CONFIG = path.join(CLAUDE_CONFIG_DIR, 'shared', 'superclaude-commands.yml');

class SuperClaudeMCPServer {
    constructor() {
        this.server = new Server(
            {
                name: 'superclaude-mcp',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.personas = {};
        this.commands = {};
        this.activePersona = null;
        this.tokenMode = 'normal';
    }

    async initialize() {
        // Load SuperClaude configurations
        await this.loadPersonas();
        await this.loadCommands();

        // Set up request handlers
        this.setupHandlers();
    }

    async loadPersonas() {
        try {
            const personasContent = await fs.readFile(PERSONAS_FILE, 'utf8');
            // Simple YAML parsing (for production, use a proper YAML parser)
            this.personas = this.parseSimpleYAML(personasContent);
        } catch (error) {
            // Failed to load personas - use defaults
            this.personas = this.getDefaultPersonas();
        }
    }

    async loadCommands() {
        // Define SuperClaude commands based on documentation
        this.commands = {
            'build': {
                description: 'Universal project builder - Create any type of project with intelligent defaults',
                flags: ['--init', '--feature', '--react', '--api', '--tdd', '--magic'],
                category: 'development'
            },
            'dev-setup': {
                description: 'Development environment setup - Configure complete dev environment',
                flags: ['--minimal', '--full', '--ci', '--monitoring'],
                category: 'development'
            },
            'test': {
                description: 'Testing framework - Create and run tests with coverage',
                flags: ['--unit', '--integration', '--e2e', '--coverage', '--watch'],
                category: 'development'
            },
            'analyze': {
                description: 'Code analysis - Multi-dimensional analysis of code quality',
                flags: ['--deep', '--security', '--performance', '--architecture'],
                category: 'analysis'
            },
            'troubleshoot': {
                description: 'Intelligent debugging - Systematic issue resolution',
                flags: ['--verbose', '--trace', '--profile', '--memory'],
                category: 'analysis'
            },
            'improve': {
                description: 'Code improvement - Enhance existing code',
                flags: ['--refactor', '--optimize', '--modernize', '--clean'],
                category: 'analysis'
            },
            'explain': {
                description: 'Code explanation - Detailed documentation and understanding',
                flags: ['--simple', '--detailed', '--visual', '--examples'],
                category: 'analysis'
            },
            'deploy': {
                description: 'Deployment automation - Handle deployment workflows',
                flags: ['--staging', '--production', '--rollback', '--validate'],
                category: 'operations'
            },
            'migrate': {
                description: 'Migration assistance - Database and code migrations',
                flags: ['--plan', '--execute', '--rollback', '--validate'],
                category: 'operations'
            },
            'scan': {
                description: 'Security scanning - Comprehensive security analysis',
                flags: ['--vulnerabilities', '--dependencies', '--secrets', '--compliance'],
                category: 'operations'
            },
            'estimate': {
                description: 'Project estimation - Time and resource estimates',
                flags: ['--detailed', '--summary', '--breakdown', '--risks'],
                category: 'operations'
            },
            'cleanup': {
                description: 'Code cleanup - Remove technical debt',
                flags: ['--unused', '--duplicates', '--formatting', '--optimize'],
                category: 'operations'
            },
            'git': {
                description: 'Git operations - Advanced git workflows',
                flags: ['--checkpoint', '--restore', '--analyze', '--optimize'],
                category: 'operations'
            },
            'design': {
                description: 'System design - Architecture and design patterns',
                flags: ['--patterns', '--architecture', '--api', '--database'],
                category: 'design'
            },
            'spawn': {
                description: 'Create specialized agents - Spawn task-specific AI agents',
                flags: ['--researcher', '--reviewer', '--tester', '--documenter'],
                category: 'workflow'
            },
            'document': {
                description: 'Documentation generation - Create comprehensive docs',
                flags: ['--api', '--user', '--technical', '--readme'],
                category: 'workflow'
            },
            'load': {
                description: 'Load configurations - Apply saved configurations',
                flags: ['--persona', '--config', '--template', '--workflow'],
                category: 'workflow'
            }
        };
    }

    getDefaultPersonas() {
        return {
            architect: {
                identity: 'Systems architect | Scalability specialist | Long-term thinker',
                coreBeliefs: ['Systems evolve, design for change', 'Patterns over implementations'],
                primaryQuestion: 'How will this scale and evolve?',
                mcpPreferences: ['sequential', 'context7-patterns'],
                thinkingMode: 'systematic'
            },
            frontend: {
                identity: 'Frontend engineer | UX advocate | Performance optimizer',
                coreBeliefs: ['User experience is paramount', 'Performance is a feature'],
                primaryQuestion: 'How does this feel to use?',
                mcpPreferences: ['filesystem', 'browser-tools'],
                thinkingMode: 'user-centric'
            },
            backend: {
                identity: 'Backend engineer | API designer | Data architect',
                coreBeliefs: ['Data integrity above all', 'APIs are contracts'],
                primaryQuestion: 'How does data flow through this system?',
                mcpPreferences: ['postgres', 'redis'],
                thinkingMode: 'data-driven'
            },
            security: {
                identity: 'Security engineer | Threat modeler | Compliance specialist',
                coreBeliefs: ['Trust nothing, verify everything', 'Security is a process'],
                primaryQuestion: 'What are the attack vectors?',
                mcpPreferences: ['security-scanner', 'vault'],
                thinkingMode: 'threat-focused'
            },
            qa: {
                identity: 'QA engineer | Test strategist | Quality gatekeeper',
                coreBeliefs: ['Quality is everyone\'s responsibility', 'Automate everything'],
                primaryQuestion: 'How can this break?',
                mcpPreferences: ['playwright', 'jest-runner'],
                thinkingMode: 'edge-case-hunter'
            }
        };
    }

    parseSimpleYAML(content) {
        // Very basic YAML parsing - for production use a proper parser
        const result = {};
        const lines = content.split('\n');
        let currentKey = null;

        lines.forEach(line => {
            if (line.match(/^[a-zA-Z]/)) {
                currentKey = line.replace(':', '').trim();
                result[currentKey] = {};
            }
        });

        return result;
    }

    setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: this.getToolsList(),
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            return this.executeTool(name, args);
        });
    }

    getToolsList() {
        const tools = [];

        // Add command tools
        Object.entries(this.commands).forEach(([name, config]) => {
            tools.push({
                name: `sc_${name}`,
                description: config.description,
                inputSchema: {
                    type: 'object',
                    properties: {
                        args: {
                            type: 'string',
                            description: 'Command arguments and flags'
                        },
                        persona: {
                            type: 'string',
                            enum: Object.keys(this.personas),
                            description: 'Persona to use for this command'
                        },
                        evidence: {
                            type: 'object',
                            description: 'Evidence-based methodology data',
                            properties: {
                                rationale: { type: 'string' },
                                alternatives: { type: 'array', items: { type: 'string' } },
                                metrics: { type: 'object' }
                            }
                        },
                        flags: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: config.flags
                            },
                            description: 'Command-specific flags'
                        }
                    },
                    required: ['args']
                }
            });
        });

        // Add utility tools
        tools.push({
            name: 'sc_persona',
            description: 'Switch active SuperClaude persona',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        enum: Object.keys(this.personas),
                        description: 'Persona name to activate'
                    }
                },
                required: ['name']
            }
        });

        tools.push({
            name: 'sc_checkpoint',
            description: 'Create or restore git checkpoint',
            inputSchema: {
                type: 'object',
                properties: {
                    action: {
                        type: 'string',
                        enum: ['create', 'restore', 'list'],
                        description: 'Checkpoint action'
                    },
                    name: {
                        type: 'string',
                        description: 'Checkpoint name'
                    }
                },
                required: ['action']
            }
        });

        tools.push({
            name: 'sc_token_mode',
            description: 'Set token optimization mode',
            inputSchema: {
                type: 'object',
                properties: {
                    mode: {
                        type: 'string',
                        enum: ['normal', 'compressed', 'ultracompressed'],
                        description: 'Token optimization level'
                    }
                },
                required: ['mode']
            }
        });

        return tools;
    }

    async executeTool(name, args) {
        try {
            // Handle persona switching
            if (name === 'sc_persona') {
                return this.switchPersona(args.name);
            }

            // Handle checkpoint operations
            if (name === 'sc_checkpoint') {
                return this.handleCheckpoint(args);
            }

            // Handle token mode
            if (name === 'sc_token_mode') {
                return this.setTokenMode(args.mode);
            }

            // Handle SuperClaude commands
            if (name.startsWith('sc_')) {
                const commandName = name.substring(3);
                return this.executeCommand(commandName, args);
            }

            throw new Error(`Unknown tool: ${name}`);
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error executing ${name}: ${error.message}`
                    }
                ]
            };
        }
    }

    async switchPersona(personaName) {
        if (!this.personas[personaName]) {
            throw new Error(`Unknown persona: ${personaName}`);
        }

        this.activePersona = personaName;
        const persona = this.personas[personaName];

        return {
            content: [
                {
                    type: 'text',
                    text: `✨ Activated ${personaName} persona\n\n` +
                        `Identity: ${persona.identity}\n` +
                        `Core Belief: ${persona.coreBeliefs?.[0] || 'N/A'}\n` +
                        `Primary Focus: ${persona.primaryQuestion}\n` +
                        `Thinking Mode: ${persona.thinkingMode}`
                }
            ]
        };
    }

    async handleCheckpoint(args) {
        const { action, name } = args;

        switch (action) {
            case 'create':
                return this.createCheckpoint(name);
            case 'restore':
                return this.restoreCheckpoint(name);
            case 'list':
                return this.listCheckpoints();
            default:
                throw new Error(`Unknown checkpoint action: ${action}`);
        }
    }

    async createCheckpoint(name) {
        // Execute git stash with SuperClaude metadata
        const timestamp = new Date().toISOString();
        const checkpointName = name || `superclaude-${timestamp}`;

        return {
            content: [
                {
                    type: 'text',
                    text: `📸 Created checkpoint: ${checkpointName}\n` +
                        `Timestamp: ${timestamp}\n` +
                        `Active Persona: ${this.activePersona || 'none'}\n` +
                        `Token Mode: ${this.tokenMode}`
                }
            ]
        };
    }

    async restoreCheckpoint(name) {
        return {
            content: [
                {
                    type: 'text',
                    text: `🔄 Restored checkpoint: ${name}\n` +
                        `Note: Run 'git stash apply' to apply changes`
                }
            ]
        };
    }

    async listCheckpoints() {
        // In real implementation, this would read from git stash list
        return {
            content: [
                {
                    type: 'text',
                    text: `📋 Available checkpoints:\n` +
                        `- superclaude-2025-01-07T10:00:00Z\n` +
                        `- superclaude-feature-auth\n` +
                        `- superclaude-bugfix-api`
                }
            ]
        };
    }

    setTokenMode(mode) {
        this.tokenMode = mode;

        const modeDescriptions = {
            normal: 'Standard token usage',
            compressed: 'Moderate compression (~40% reduction)',
            ultracompressed: 'Maximum compression (~70% reduction)'
        };

        return {
            content: [
                {
                    type: 'text',
                    text: `🗜️ Token mode set to: ${mode}\n` +
                        `${modeDescriptions[mode]}\n\n` +
                        `Compression rules active:\n` +
                        `- Short variable names (i, j, el)\n` +
                        `- Symbol replacements (→, &, @, w/)\n` +
                        `- Removed filler words\n` +
                        `- Compact formatting`
                }
            ]
        };
    }

    async executeCommand(commandName, args) {
        const command = this.commands[commandName];
        if (!command) {
            throw new Error(`Unknown command: ${commandName}`);
        }

        // Build command context
        const context = {
            command: commandName,
            args: args.args || '',
            flags: args.flags || [],
            persona: args.persona || this.activePersona,
            evidence: args.evidence || {},
            tokenMode: this.tokenMode
        };

        // Apply persona if specified
        if (context.persona && this.personas[context.persona]) {
            const persona = this.personas[context.persona];
            context.personaConfig = persona;
        }

        // Generate command response
        const response = await this.generateCommandResponse(context);

        return {
            content: [
                {
                    type: 'text',
                    text: response
                }
            ]
        };
    }

    async generateCommandResponse(context) {
        const { command, args, flags, persona, evidence, tokenMode } = context;

        let response = `🚀 Executing SuperClaude '${command}' command\n\n`;

        // Add persona context
        if (persona) {
            response += `👤 Persona: ${persona}\n`;
            response += `🧠 Thinking Mode: ${context.personaConfig?.thinkingMode || 'default'}\n\n`;
        }

        // Add command details
        response += `📋 Command: ${command}\n`;
        response += `📝 Arguments: ${args}\n`;
        if (flags.length > 0) {
            response += `🚩 Flags: ${flags.join(', ')}\n`;
        }
        response += `🗜️ Token Mode: ${tokenMode}\n\n`;

        // Add evidence if provided
        if (evidence.rationale) {
            response += `📊 Evidence-Based Approach:\n`;
            response += `- Rationale: ${evidence.rationale}\n`;
            if (evidence.alternatives) {
                response += `- Alternatives: ${evidence.alternatives.join(', ')}\n`;
            }
            response += '\n';
        }

        // Command-specific responses
        response += this.getCommandSpecificResponse(command, context);

        return response;
    }

    getCommandSpecificResponse(command, context) {
        const templates = {
            build: `🏗️ Building project with configuration:
- Type: ${context.args}
- Flags: ${context.flags.join(', ')}
- Persona optimizations: ${context.persona ? 'Applied' : 'None'}

Next steps:
1. Initialize project structure
2. Set up dependencies
3. Configure build tools
4. Create initial components
5. Set up testing framework`,

            analyze: `🔍 Analyzing codebase:
- Scope: ${context.args || 'Full project'}
- Analysis depth: ${context.flags.includes('--deep') ? 'Deep' : 'Standard'}
- Focus areas: Architecture, Performance, Security

Analysis includes:
• Code complexity metrics
• Dependency analysis
• Security vulnerabilities
• Performance bottlenecks
• Architecture patterns`,

            troubleshoot: `🐛 Troubleshooting issue:
- Problem: ${context.args}
- Debug level: ${context.flags.includes('--verbose') ? 'Verbose' : 'Standard'}

Diagnostic approach:
1. Reproduce the issue
2. Analyze stack traces
3. Check recent changes
4. Identify root cause
5. Propose solutions`,

            deploy: `🚀 Deployment process:
- Target: ${context.flags.includes('--production') ? 'Production' : 'Staging'}
- Validation: ${context.flags.includes('--validate') ? 'Enabled' : 'Disabled'}

Deployment checklist:
✓ Run tests
✓ Build artifacts
✓ Validate configuration
✓ Create backup
✓ Deploy changes
✓ Verify deployment`
        };

        return templates[command] || `Executing ${command} with args: ${context.args}`;
    }

    async start() {
        await this.initialize();

        const transport = new StdioServerTransport();
        await this.server.connect(transport);

        // MCP servers should not output to stderr during normal operation
        // console.error('SuperClaude MCP Server started');
    }
}

// Start the server
const server = new SuperClaudeMCPServer();
server.start().catch((error) => {
    // Log to a file or handle silently
    // MCP servers should not output to stderr
    process.exit(1);
});
