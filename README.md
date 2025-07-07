# SuperClaude MCP Server

An MCP server that brings all SuperClaude features to Gemini CLI.

## Prerequisites

- SuperClaude must already be installed in Claude Code
- Node.js 18 or higher
- Gemini CLI installed

## Installation

### Method 1: Local Installation

```bash
# Create project directory
mkdir superclaude-mcp && cd superclaude-mcp

# Copy files (save the code above)
# - superclaude-mcp-server.js
# - package.json

# Install dependencies
npm install

# Grant execution permissions
chmod +x superclaude-mcp-server.js
```

### Method 2: Global Installation

```bash
# Global install
npm install -g .

# Or use npm link
npm link
```

## Gemini CLI Configuration

Add the following to your `~/.gemini/settings.json` file:

```json
{
  "mcpServers": {
    "superclaude": {
      "command": "node",
      "args": ["/path/to/superclaude-mcp-server.js"],
      "env": {
        "CLAUDE_CONFIG_DIR": "${HOME}/.claude"
      }
    }
  }
}
```

Or configure using npx:

```json
{
  "mcpServers": {
    "superclaude": {
      "command": "npx",
      "args": ["-y", "superclaude-mcp-server"],
      "env": {
        "CLAUDE_CONFIG_DIR": "${HOME}/.claude"
      }
    }
  }
}
```

## Usage

### 1. Verify MCP Server

```bash
gemini

# In Gemini CLI
/mcp
# Check if superclaude server is listed
```

### 2. Using SuperClaude Commands

```bash
# Build project
gemini "Use sc_build to create a React app with TDD setup"

# Switch persona
gemini "Switch to architect persona using sc_persona"

# Analyze code
gemini "Run sc_analyze on the current codebase with deep analysis"

# Troubleshoot
gemini "Use sc_troubleshoot to debug the API connection issue"

# Create checkpoint
gemini "Create a git checkpoint named 'before-refactor'"
```

### 3. Using Flags and Options

```bash
# Include flags
gemini "Use sc_build with react type and flags --tdd --magic"

# Use with persona
gemini "Use sc_analyze with security persona for vulnerability scanning"

# Evidence-based approach
gemini "Use sc_design with evidence for new authentication system"
```

### 4. Token Optimization

```bash
# Set ultra-compressed mode
gemini "Set token mode to ultracompressed"

# All subsequent responses will be compressed
gemini "Build a complex microservices architecture"
```

## Available Tools

### Command Tools (sc_*)

- `sc_build` - Build projects
- `sc_dev-setup` - Set up development environment
- `sc_test` - Create and run tests
- `sc_analyze` - Analyze code
- `sc_troubleshoot` - Troubleshoot issues
- `sc_improve` - Improve code
- `sc_explain` - Explain code
- `sc_deploy` - Automate deployment
- `sc_migrate` - Handle migrations
- `sc_scan` - Security scanning
- `sc_estimate` - Project estimation
- `sc_cleanup` - Clean up code
- `sc_git` - Git operations
- `sc_design` - System design
- `sc_spawn` - Create specialized agents
- `sc_document` - Generate documentation
- `sc_load` - Load configurations

### Utility Tools

- `sc_persona` - Switch personas
- `sc_checkpoint` - Manage Git checkpoints
- `sc_token_mode` - Set token optimization

## Personas

Available personas:
- `architect` - System Architect
- `frontend` - Frontend Engineer
- `backend` - Backend Engineer
- `security` - Security Engineer
- `qa` - QA Engineer

## Advanced Usage

### Using with GEMINI.md

Create a `GEMINI.md` file in your project root:

```markdown
# SuperClaude Commands

## Shortcuts
- "sc:build" → Execute sc_build tool
- "sc:analyze" → Execute sc_analyze tool
- "sc:persona [name]" → Switch persona

## Default Persona
Activate architect persona at project start

## Token Mode
Automatically use compressed mode for complex tasks
```

### Setting Up Shell Aliases

Add to your `.bashrc` or `.zshrc`:

```bash
# SuperClaude shortcuts
alias gsc='gemini "Execute SuperClaude command"'
alias gsc-build='gemini "Use sc_build to"'
alias gsc-analyze='gemini "Use sc_analyze on"'
alias gsc-persona='gemini "Switch to persona"'
```

Usage examples:
```bash
gsc-build "create a Next.js app with TypeScript"
gsc-analyze "the authentication module"
gsc-persona "security for threat modeling"
```

## Troubleshooting

### MCP Server Not Visible

1. Restart Gemini CLI
2. Check configuration file path
3. Verify Node.js version (18+)

### Commands Not Working

1. Verify SuperClaude installation: `ls ~/.claude`
2. Check logs: `gemini --verbose`
3. Check MCP server status: `/mcp` command

### Personas Not Loading

1. Check persona file: `~/.claude/shared/superclaude-personas.yml`
2. Default personas will be used
3. Try manually switching personas

## Contributing

Issues and PRs are always welcome!

## License

MIT License
