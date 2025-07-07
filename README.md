# SuperClaude MCP Server

SuperClaude의 모든 기능을 Gemini CLI에서 사용할 수 있게 해주는 MCP 서버입니다.

## 전제 조건

- SuperClaude가 Claude Code에 이미 설치되어 있어야 합니다
- Node.js 18 이상
- Gemini CLI 설치 완료

## 설치

### 방법 1: 로컬 설치

```bash
# 프로젝트 디렉토리 생성
mkdir superclaude-gemini-integration-mcp && cd superclaude-gemini-integration-mcp

# 파일 복사 (위의 코드들을 저장)
# - superclaude-mcp-server.js
# - package.json

# 의존성 설치
npm install

# 실행 권한 부여
chmod +x superclaude-mcp-server.js
```

### 방법 2: 글로벌 설치

```bash
# 글로벌 설치
npm install -g .

# 또는 npm link 사용
npm link
```

## Gemini CLI 설정

`~/.gemini/settings.json` 파일에 다음 내용 추가:

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

또는 npx를 사용한 설정:

```json
{
  "mcpServers": {
    "superclaude": {
      "command": "npx",
      "args": ["-y", "superclaude-gemini-integration-mcp"],
      "env": {
        "CLAUDE_CONFIG_DIR": "${HOME}/.claude"
      }
    }
  }
}
```

## 사용 방법

### 1. MCP 서버 확인

```bash
gemini

# Gemini CLI에서
/mcp
# superclaude 서버가 목록에 표시되는지 확인
```

### 2. SuperClaude 명령어 사용

```bash
# 프로젝트 빌드
gemini "Use sc_build to create a React app with TDD setup"

# 페르소나 전환
gemini "Switch to architect persona using sc_persona"

# 코드 분석
gemini "Run sc_analyze on the current codebase with deep analysis"

# 트러블슈팅
gemini "Use sc_troubleshoot to debug the API connection issue"

# 체크포인트 생성
gemini "Create a git checkpoint named 'before-refactor'"
```

### 3. 플래그와 옵션 사용

```bash
# 플래그 포함
gemini "Use sc_build with react type and flags --tdd --magic"

# 페르소나와 함께 사용
gemini "Use sc_analyze with security persona for vulnerability scanning"

# Evidence-based approach
gemini "Use sc_design with evidence for new authentication system"
```

### 4. 토큰 최적화

```bash
# 울트라 압축 모드 설정
gemini "Set token mode to ultracompressed"

# 이후 모든 응답이 압축됨
gemini "Build a complex microservices architecture"
```

## 사용 가능한 도구

### 명령어 도구 (sc_*)

- `sc_build` - 프로젝트 빌드
- `sc_dev-setup` - 개발 환경 설정
- `sc_test` - 테스트 생성 및 실행
- `sc_analyze` - 코드 분석
- `sc_troubleshoot` - 문제 해결
- `sc_improve` - 코드 개선
- `sc_explain` - 코드 설명
- `sc_deploy` - 배포 자동화
- `sc_migrate` - 마이그레이션
- `sc_scan` - 보안 스캔
- `sc_estimate` - 프로젝트 추정
- `sc_cleanup` - 코드 정리
- `sc_git` - Git 작업
- `sc_design` - 시스템 설계
- `sc_spawn` - 특수 에이전트 생성
- `sc_document` - 문서 생성
- `sc_load` - 설정 로드

### 유틸리티 도구

- `sc_persona` - 페르소나 전환
- `sc_checkpoint` - Git 체크포인트 관리
- `sc_token_mode` - 토큰 최적화 설정

## 페르소나

사용 가능한 페르소나:
- `architect` - 시스템 아키텍트
- `frontend` - 프론트엔드 엔지니어
- `backend` - 백엔드 엔지니어
- `security` - 보안 엔지니어
- `qa` - QA 엔지니어

## 고급 사용법

### GEMINI.md와 함께 사용

프로젝트 루트에 `GEMINI.md` 파일 생성:

```markdown
# SuperClaude Commands

## 단축어
- "sc:build" → sc_build 도구 실행
- "sc:analyze" → sc_analyze 도구 실행
- "sc:persona [name]" → 페르소나 전환

## 기본 페르소나
프로젝트 시작 시 architect 페르소나 활성화

## 토큰 모드
복잡한 작업 시 자동으로 compressed 모드 사용
```

### 쉘 별칭 설정

`.bashrc` 또는 `.zshrc`에 추가:

```bash
# SuperClaude 단축어
alias gsc='gemini "Execute SuperClaude command"'
alias gsc-build='gemini "Use sc_build to"'
alias gsc-analyze='gemini "Use sc_analyze on"'
alias gsc-persona='gemini "Switch to persona"'
```

사용 예:
```bash
gsc-build "create a Next.js app with TypeScript"
gsc-analyze "the authentication module"
gsc-persona "security for threat modeling"
```

## 문제 해결

### MCP 서버가 보이지 않을 때

1. Gemini CLI 재시작
2. 설정 파일 경로 확인
3. Node.js 버전 확인 (18+)

### 명령어가 작동하지 않을 때

1. SuperClaude 설치 확인: `ls ~/.claude`
2. 로그 확인: `gemini --verbose`
3. MCP 서버 상태: `/mcp` 명령어로 확인

### 페르소나가 로드되지 않을 때

1. 페르소나 파일 확인: `~/.claude/shared/superclaude-personas.yml`
2. 기본 페르소나 사용됨
3. 수동으로 페르소나 전환 시도

## 기여하기

이슈나 PR은 언제든 환영합니다!

## 라이선스

MIT License
