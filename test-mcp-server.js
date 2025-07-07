#!/usr/bin/env node

// test-mcp-server.js
// SuperClaude MCP Server 테스트 스크립트

import { spawn } from 'child_process';
import { createInterface } from 'readline';

console.log('🧪 Testing SuperClaude MCP Server...\n');

// MCP 서버 시작
const server = spawn('node', ['./superclaude-mcp-server.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
        ...process.env,
        CLAUDE_CONFIG_DIR: process.env.HOME + '/.claude'
    }
});

// 에러 스트림 모니터링
server.stderr.on('data', (data) => {
    console.error('❌ Server Error:', data.toString());
});

// 입력을 위한 readline 인터페이스
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

// 응답 처리
server.stdout.on('data', (data) => {
    console.log('📥 Server Response:', data.toString());
});

// 테스트 요청 전송
async function sendRequest(request) {
    console.log('📤 Sending:', JSON.stringify(request, null, 2));
    server.stdin.write(JSON.stringify(request) + '\n');
}

// 기본 테스트 실행
async function runTests() {
    console.log('Running basic tests...\n');

    // 1. Initialize 요청
    await sendRequest({
        jsonrpc: '2.0',
        method: 'initialize',
        params: {
            protocolVersion: '1.0.0',
            capabilities: {}
        },
        id: 1
    });

    // 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 100));

    // 2. List tools 요청
    await sendRequest({
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 2
    });

    // 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 100));

    // 3. Call tool 테스트
    await sendRequest({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
            name: 'sc_persona',
            arguments: {
                name: 'architect'
            }
        },
        id: 3
    });

    console.log('\n✅ Basic tests sent. Check responses above.');
    console.log('\nYou can now send custom requests. Type "exit" to quit.\n');
}

// 사용자 입력 처리
rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        console.log('👋 Shutting down...');
        server.kill();
        rl.close();
        process.exit(0);
    }

    try {
        const request = JSON.parse(input);
        sendRequest(request);
    } catch (e) {
        console.error('❌ Invalid JSON. Example request:');
        console.log(JSON.stringify({
            jsonrpc: '2.0',
            method: 'tools/call',
            params: {
                name: 'sc_build',
                arguments: {
                    args: 'my-app',
                    flags: ['--react', '--tdd']
                }
            },
            id: Date.now()
        }, null, 2));
    }
});

// 서버 종료 처리
server.on('close', (code) => {
    console.log(`\n🛑 Server exited with code ${code}`);
    rl.close();
    process.exit(code);
});

// 초기 테스트 실행
setTimeout(runTests, 500);
