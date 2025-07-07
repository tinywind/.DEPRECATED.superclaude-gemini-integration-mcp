# SuperClaude MCP Server - Quick Start Guide 🚀

## Get Started in 5 Minutes

### 1. Quick Install (1 minute)

```bash
# Create and navigate to directory
mkdir ~/superclaude-mcp && cd ~/superclaude-mcp

# Download necessary files (save the artifact files above)
# - superclaude-mcp-server.js
# - package.json

# Install dependencies
npm install
```

### 2. Configure Gemini CLI (2 minutes)

```bash
# Open Gemini settings file
nano ~/.gemini/settings.json
```

Add the following:
```json
{
  "mcpServers": {
    "superclaude": {
      "command": "node",
      "args": ["~/superclaude-mcp/superclaude-mcp-server.js"]
    }
  }
}
```

### 3. Run Your First Command (2 minutes)

```bash
# Start Gemini CLI
gemini

# Verify MCP server
/mcp

# Your first SuperClaude command
"Use sc_build to create a React todo app"
```

## Top 10 Essential Commands

### 1. Create Project
```bash
gemini "Use sc_build to create React app with TypeScript and TDD"
```

### 2. Switch Persona
```bash
gemini "Switch to frontend persona for UI development"
```

### 3. Analyze Code
```bash
gemini "Use sc_analyze to check code quality and architecture"
```

### 4. Troubleshoot Issues
```bash
gemini "Use sc_troubleshoot to debug the API timeout issue"
```

### 5. Security Check
```bash
gemini "Switch to security persona and run sc_scan"
```

### 6. Generate Tests
```bash
gemini "Use sc_test to create comprehensive test suite"
```

### 7. Optimize Performance
```bash
gemini "Use sc_improve to optimize database queries"
```

### 8. Create Checkpoint
```bash
gemini "Create checkpoint before major refactoring"
```

### 9. Generate Documentation
```bash
gemini "Use sc_document to create API documentation"
```

### 10. Deploy
```bash
gemini "Use sc_deploy to staging with validation"
```

## Real-World Scenarios

### Scenario 1: New Feature Development

```bash
# 1. Design with architect
gemini "Switch to architect persona and design user authentication feature"

# 2. Create checkpoint
gemini "Create checkpoint named feature-auth-start"

# 3. Implement
gemini "Use sc_build to implement auth module with --api --tdd"

# 4. Test
gemini "Switch to qa persona and use sc_test with full coverage"

# 5. Security review
gemini "Switch to security persona and scan the auth implementation"
```

### Scenario 2: Bug Fix

```bash
# 1. Analyze issue
gemini "Use sc_troubleshoot to investigate login failures"

# 2. Checkpoint
gemini "Create emergency checkpoint"

# 3. Fix
gemini "Fix the authentication bug based on troubleshooting results"

# 4. Verify
gemini "Run regression tests to ensure no side effects"
```

### Scenario 3: Performance Improvement

```bash
# 1. Optimize tokens
gemini "Set token mode to compressed for efficiency"

# 2. Analyze performance
gemini "Use sc_analyze with --performance flag on API endpoints"

# 3. Improve
gemini "Use sc_improve to optimize the identified bottlenecks"

# 4. Benchmark
gemini "Run performance benchmarks to verify improvements"
```

## Pro Tips 💡

### 1. Speed Up with Aliases
```bash
# Add to ~/.bashrc or ~/.zshrc
alias gsc="gemini 'Execute SuperClaude command:'"
alias gsc-build="gemini 'Use sc_build to'"
alias gsc-fix="gemini 'Use sc_troubleshoot to fix'"
```

### 2. Automate with GEMINI.md
Create `GEMINI.md` in project root:
```markdown
# Project Commands

When I say "build", use sc_build with our standard flags
When I say "check", run sc_analyze and sc_test
When I say "ship", run sc_deploy with validation
```

### 3. Workflow Scripts
```bash
#!/bin/bash
# daily-workflow.sh

echo "🌅 Starting daily workflow..."

# Code quality check
gemini "Use sc_analyze for daily code review"

# Run tests
gemini "Run all tests with coverage report"

# Security scan
gemini "Quick security scan for new code"

echo "✅ Daily checks complete!"
```

## Troubleshooting

### "MCP server not found"
```bash
# Restart Gemini CLI
pkill gemini
gemini
```

### "Command not recognized"
```bash
# Check MCP server status
gemini "/mcp"
# Verify superclaude is listed
```

### "Permission denied"
```bash
chmod +x ~/superclaude-mcp/superclaude-mcp-server.js
```

## Next Steps

1. **Explore Advanced Workflows**: Use `superclaude-workflows.js`
2. **Share Team Configuration**: Commit settings to Git
3. **Add Custom Personas**: Define personas for your team
4. **Extend Automation**: Integrate with CI/CD pipelines

## Getting Help

- GitHub Issues: [SuperClaude MCP Issues](https://github.com/your-repo)
- Community: SuperClaude Discord
- Documentation: [Full Documentation](./README.md)

---

🎉 **Congratulations!** You can now use all SuperClaude features in Gemini CLI!
