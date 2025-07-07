#!/bin/bash
# setup-superclaude-aliases.sh
# SuperClaude MCP를 위한 쉘 별칭 설정 스크립트

echo "Setting up SuperClaude aliases for Gemini CLI..."

# 쉘 설정 파일 결정
SHELL_CONFIG=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.bashrc"
else
    echo "Unsupported shell. Please add aliases manually."
    exit 1
fi

# 별칭 정의
ALIASES='
# ========== SuperClaude MCP Aliases ==========
# 기본 SuperClaude 명령어
alias gsc="gemini \"Execute SuperClaude command:\""

# 개발 명령어
alias gsc-build="gemini \"Use sc_build to\""
alias gsc-setup="gemini \"Use sc_dev-setup to\""
alias gsc-test="gemini \"Use sc_test to\""

# 분석 명령어
alias gsc-analyze="gemini \"Use sc_analyze to\""
alias gsc-trouble="gemini \"Use sc_troubleshoot to\""
alias gsc-improve="gemini \"Use sc_improve to\""
alias gsc-explain="gemini \"Use sc_explain to\""

# 운영 명령어
alias gsc-deploy="gemini \"Use sc_deploy to\""
alias gsc-migrate="gemini \"Use sc_migrate to\""
alias gsc-scan="gemini \"Use sc_scan to\""
alias gsc-clean="gemini \"Use sc_cleanup to\""

# 디자인 및 워크플로우
alias gsc-design="gemini \"Use sc_design to\""
alias gsc-doc="gemini \"Use sc_document to\""

# 유틸리티
alias gsc-persona="gemini \"Switch to persona:\""
alias gsc-checkpoint="gemini \"Create checkpoint named\""
alias gsc-restore="gemini \"Restore checkpoint\""
alias gsc-token="gemini \"Set token mode to\""

# 페르소나 단축어
alias gsc-architect="gemini \"Switch to architect persona and\""
alias gsc-frontend="gemini \"Switch to frontend persona and\""
alias gsc-backend="gemini \"Switch to backend persona and\""
alias gsc-security="gemini \"Switch to security persona and\""
alias gsc-qa="gemini \"Switch to qa persona and\""

# 자주 사용하는 조합
alias gsc-react="gemini \"Use sc_build to create React app with --react --tdd --magic flags\""
alias gsc-api="gemini \"Use sc_build to create API with --api --tdd flags\""
alias gsc-fullstack="gemini \"Use sc_build to create fullstack app with --react --api --tdd flags\""

# 워크플로우 단축어
alias gsc-start-project="gemini \"Start new project: 1) Switch to architect persona, 2) Use sc_design, 3) Use sc_build\""
alias gsc-security-check="gemini \"Security check: 1) Switch to security persona, 2) Use sc_scan with all flags\""
alias gsc-deploy-safe="gemini \"Safe deployment: 1) Create checkpoint, 2) Run tests, 3) Deploy to staging, 4) Validate\""

# 압축 모드 단축어
alias gsc-uc="gemini \"Set token mode to ultracompressed, then\""
alias gsc-normal="gemini \"Set token mode to normal\""

# Evidence 기반 명령어 (함수로 구현)
gsc-evidence() {
    local command=$1
    shift
    local args="$@"
    gemini "Use sc_$command with evidence-based approach: $args"
}

# 인터랙티브 페르소나 선택
gsc-select-persona() {
    echo "Select persona:"
    echo "1) architect"
    echo "2) frontend"
    echo "3) backend"
    echo "4) security"
    echo "5) qa"
    read -p "Choice (1-5): " choice

    case $choice in
        1) gemini "Switch to architect persona";;
        2) gemini "Switch to frontend persona";;
        3) gemini "Switch to backend persona";;
        4) gemini "Switch to security persona";;
        5) gemini "Switch to qa persona";;
        *) echo "Invalid choice";;
    esac
}

# 프로젝트 초기화 헬퍼
gsc-init() {
    local project_name=$1
    local project_type=${2:-react}

    echo "Initializing $project_name as $project_type project..."
    gemini "Execute SuperClaude workflow:
    1. Switch to architect persona
    2. Use sc_design for $project_name architecture
    3. Use sc_build to create $project_type project with --tdd --magic
    4. Use sc_dev-setup with --full
    5. Create initial checkpoint"
}

# ========== End SuperClaude Aliases =========='

# 백업 생성
if [ -f "$SHELL_CONFIG" ]; then
    cp "$SHELL_CONFIG" "$SHELL_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    echo "Backup created: $SHELL_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
fi

# 별칭이 이미 있는지 확인
if grep -q "SuperClaude MCP Aliases" "$SHELL_CONFIG" 2>/dev/null; then
    echo "SuperClaude aliases already exist in $SHELL_CONFIG"
    echo "Please remove them manually if you want to reinstall."
    exit 1
fi

# 별칭 추가
echo "$ALIASES" >> "$SHELL_CONFIG"
echo "✅ SuperClaude aliases added to $SHELL_CONFIG"

echo ""
echo "🎉 Setup complete! Please run:"
echo "   source $SHELL_CONFIG"
echo ""
echo "Or restart your terminal to use the new aliases."
echo ""
echo "📚 Quick usage examples:"
echo "   gsc-react my-app        # Create React app"
echo "   gsc-persona architect   # Switch persona"
echo "   gsc-analyze             # Analyze code"
echo "   gsc-security-check      # Full security scan"
echo "   gsc-init myproject api  # Initialize API project"
echo ""
echo "Type 'alias | grep gsc' to see all available SuperClaude aliases."
