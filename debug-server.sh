#!/bin/bash
# debug-server.sh
# SuperClaude MCP Server 디버그 실행 스크립트

echo "🔍 Starting SuperClaude MCP Server in debug mode..."
echo "Claude config directory: ${HOME}/.claude"
echo ""

# 환경 변수 설정
export CLAUDE_CONFIG_DIR="${HOME}/.claude"
export NODE_ENV="development"

# 디버그 로그 파일
LOG_FILE="superclaude-mcp-debug.log"

# 기존 로그 백업
if [ -f "$LOG_FILE" ]; then
    mv "$LOG_FILE" "$LOG_FILE.$(date +%Y%m%d_%H%M%S)"
fi

echo "📝 Logging to: $LOG_FILE"
echo "=================================" > "$LOG_FILE"
echo "SuperClaude MCP Server Debug Log" >> "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"
echo "=================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Node.js 버전 확인
echo "Node.js version: $(node --version)" | tee -a "$LOG_FILE"
echo "NPM version: $(npm --version)" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# SuperClaude 설정 파일 확인
echo "Checking SuperClaude configuration..." | tee -a "$LOG_FILE"
if [ -d "$CLAUDE_CONFIG_DIR" ]; then
    echo "✅ Claude config directory found" | tee -a "$LOG_FILE"

    if [ -f "$CLAUDE_CONFIG_DIR/shared/superclaude-personas.yml" ]; then
        echo "✅ Personas file found" | tee -a "$LOG_FILE"
    else
        echo "⚠️  Personas file not found - will use defaults" | tee -a "$LOG_FILE"
    fi

    if [ -f "$CLAUDE_CONFIG_DIR/shared/superclaude-commands.yml" ]; then
        echo "✅ Commands file found" | tee -a "$LOG_FILE"
    else
        echo "⚠️  Commands file not found - will use built-in commands" | tee -a "$LOG_FILE"
    fi
else
    echo "⚠️  Claude config directory not found - will use defaults" | tee -a "$LOG_FILE"
fi

echo "" | tee -a "$LOG_FILE"
echo "Starting server with debug output..." | tee -a "$LOG_FILE"
echo "Press Ctrl+C to stop" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# 서버 실행 (디버그 모드)
node --trace-warnings ./superclaude-mcp-server.js 2>&1 | tee -a "$LOG_FILE"
