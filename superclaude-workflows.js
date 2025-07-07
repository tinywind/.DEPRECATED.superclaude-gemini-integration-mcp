// superclaude-workflows.js
// 실무에서 자주 사용하는 SuperClaude 워크플로우 템플릿

const workflows = {
    // 1. 풀스택 프로젝트 초기화
    fullstackProject: {
        name: "Fullstack Project Setup",
        description: "Complete fullstack project initialization with best practices",
        steps: [
            {
                command: "sc_persona",
                args: { name: "architect" },
                description: "Set architect mindset for system design"
            },
            {
                command: "sc_design",
                args: {
                    args: "Design scalable fullstack architecture",
                    evidence: {
                        rationale: "Need to support 10k concurrent users",
                        alternatives: ["Monolith", "Microservices", "Serverless"],
                        metrics: { scalability: "high", complexity: "medium" }
                    }
                }
            },
            {
                command: "sc_checkpoint",
                args: { action: "create", name: "architecture-complete" }
            },
            {
                command: "sc_build",
                args: {
                    args: "fullstack-app",
                    flags: ["--react", "--api", "--tdd", "--magic"],
                    persona: "architect"
                }
            },
            {
                command: "sc_dev-setup",
                args: {
                    flags: ["--full", "--ci", "--monitoring"],
                    evidence: {
                        rationale: "Production-ready from day one"
                    }
                }
            }
        ]
    },

    // 2. 보안 감사 워크플로우
    securityAudit: {
        name: "Comprehensive Security Audit",
        description: "Full security assessment with remediation",
        steps: [
            {
                command: "sc_checkpoint",
                args: { action: "create", name: "pre-security-audit" }
            },
            {
                command: "sc_persona",
                args: { name: "security" }
            },
            {
                command: "sc_scan",
                args: {
                    flags: ["--vulnerabilities", "--dependencies", "--secrets", "--compliance"],
                    evidence: {
                        rationale: "Quarterly security audit requirement"
                    }
                }
            },
            {
                command: "sc_analyze",
                args: {
                    args: "security vulnerabilities",
                    flags: ["--deep", "--security"],
                    persona: "security"
                }
            },
            {
                command: "sc_document",
                args: {
                    args: "security audit report",
                    flags: ["--technical"],
                    evidence: {
                        rationale: "Compliance documentation"
                    }
                }
            }
        ]
    },

    // 3. 성능 최적화 워크플로우
    performanceOptimization: {
        name: "Performance Optimization Pipeline",
        description: "Systematic performance improvement process",
        steps: [
            {
                command: "sc_token_mode",
                args: { mode: "compressed" }
            },
            {
                command: "sc_persona",
                args: { name: "performance" }
            },
            {
                command: "sc_analyze",
                args: {
                    args: "performance bottlenecks",
                    flags: ["--performance", "--deep"],
                    evidence: {
                        metrics: {
                            current_response_time: "800ms",
                            target_response_time: "200ms"
                        }
                    }
                }
            },
            {
                command: "sc_troubleshoot",
                args: {
                    args: "slow API responses",
                    flags: ["--profile", "--memory", "--trace"]
                }
            },
            {
                command: "sc_improve",
                args: {
                    args: "optimize critical paths",
                    flags: ["--optimize", "--refactor"],
                    evidence: {
                        rationale: "Reduce response time by 75%"
                    }
                }
            },
            {
                command: "sc_test",
                args: {
                    flags: ["--performance", "--benchmark"],
                    evidence: {
                        metrics: { target: "200ms p95 latency" }
                    }
                }
            }
        ]
    },

    // 4. 레거시 마이그레이션
    legacyMigration: {
        name: "Legacy System Migration",
        description: "Safe migration from legacy to modern stack",
        steps: [
            {
                command: "sc_checkpoint",
                args: { action: "create", name: "legacy-baseline" }
            },
            {
                command: "sc_analyze",
                args: {
                    args: "legacy codebase",
                    flags: ["--deep", "--architecture"],
                    persona: "architect"
                }
            },
            {
                command: "sc_estimate",
                args: {
                    args: "migration effort",
                    flags: ["--detailed", "--risks"],
                    evidence: {
                        rationale: "Budget and timeline planning"
                    }
                }
            },
            {
                command: "sc_design",
                args: {
                    args: "migration strategy",
                    flags: ["--patterns", "--architecture"],
                    evidence: {
                        alternatives: ["Big Bang", "Strangler Fig", "Parallel Run"]
                    }
                }
            },
            {
                command: "sc_migrate",
                args: {
                    args: "phase 1 - data layer",
                    flags: ["--plan", "--validate"],
                    persona: "backend"
                }
            }
        ]
    },

    // 5. CI/CD 파이프라인 설정
    cicdPipeline: {
        name: "CI/CD Pipeline Setup",
        description: "Complete CI/CD automation",
        steps: [
            {
                command: "sc_persona",
                args: { name: "devops" }
            },
            {
                command: "sc_dev-setup",
                args: {
                    flags: ["--ci", "--monitoring"],
                    evidence: {
                        rationale: "Automated deployment pipeline"
                    }
                }
            },
            {
                command: "sc_test",
                args: {
                    flags: ["--unit", "--integration", "--e2e", "--coverage"],
                    evidence: {
                        metrics: { min_coverage: "80%" }
                    }
                }
            },
            {
                command: "sc_deploy",
                args: {
                    args: "staging environment",
                    flags: ["--staging", "--validate"],
                    evidence: {
                        rationale: "Test in production-like environment"
                    }
                }
            }
        ]
    },

    // 6. 긴급 버그 수정
    emergencyBugfix: {
        name: "Emergency Bugfix Workflow",
        description: "Rapid response to production issues",
        steps: [
            {
                command: "sc_checkpoint",
                args: { action: "create", name: "emergency-$(date +%Y%m%d-%H%M%S)" }
            },
            {
                command: "sc_token_mode",
                args: { mode: "ultracompressed" }
            },
            {
                command: "sc_troubleshoot",
                args: {
                    args: "production error",
                    flags: ["--verbose", "--trace"],
                    persona: "backend"
                }
            },
            {
                command: "sc_git",
                args: {
                    args: "create hotfix branch",
                    flags: ["--checkpoint"]
                }
            },
            {
                command: "sc_test",
                args: {
                    args: "regression tests",
                    flags: ["--quick", "--critical"],
                    evidence: {
                        rationale: "Ensure fix doesn't break existing functionality"
                    }
                }
            },
            {
                command: "sc_deploy",
                args: {
                    flags: ["--production", "--rollback-ready"],
                    evidence: {
                        rationale: "Emergency fix deployment"
                    }
                }
            }
        ]
    }
};

// 워크플로우 실행 함수
function executeWorkflow(workflowName, options = {}) {
    const workflow = workflows[workflowName];
    if (!workflow) {
        console.error(`Unknown workflow: ${workflowName}`);
        return;
    }

    console.log(`🚀 Executing workflow: ${workflow.name}`);
    console.log(`📝 ${workflow.description}\n`);

    workflow.steps.forEach((step, index) => {
        console.log(`Step ${index + 1}: ${step.description || step.command}`);
        console.log(`Command: ${step.command}`);
        console.log(`Args:`, JSON.stringify(step.args, null, 2));
        console.log('---');
    });
}

// Gemini CLI 통합을 위한 명령어 생성
function generateGeminiCommand(workflowName) {
    const workflow = workflows[workflowName];
    if (!workflow) return null;

    const commands = workflow.steps.map(step => {
        const args = JSON.stringify(step.args);
        return `Use ${step.command} with args: ${args}`;
    }).join(', then ');

    return `Execute SuperClaude workflow "${workflow.name}": ${commands}`;
}

// 워크플로우를 쉘 스크립트로 내보내기
function exportToShellScript(workflowName, outputFile) {
    const workflow = workflows[workflowName];
    if (!workflow) return;

    let script = `#!/bin/bash
# SuperClaude Workflow: ${workflow.name}
# ${workflow.description}
# Generated: ${new Date().toISOString()}

echo "🚀 Starting ${workflow.name}..."
`;

    workflow.steps.forEach((step, index) => {
        const args = JSON.stringify(step.args);
        script += `
# Step ${index + 1}: ${step.description || step.command}
echo "📍 Step ${index + 1}: Executing ${step.command}..."
gemini "Use ${step.command} with args: ${args}"

# Wait for user confirmation before next step
read -p "Press Enter to continue to next step..."
`;
    });

    script += `
echo "✅ Workflow complete!"
`;

    require('fs').writeFileSync(outputFile, script, { mode: 0o755 });
    console.log(`✅ Workflow exported to ${outputFile}`);
}

// 사용 예시
if (require.main === module) {
    // CLI 인터페이스
    const args = process.argv.slice(2);
    const command = args[0];
    const workflowName = args[1];

    switch (command) {
        case 'list':
            console.log('Available workflows:');
            Object.keys(workflows).forEach(name => {
                console.log(`- ${name}: ${workflows[name].description}`);
            });
            break;

        case 'show':
            executeWorkflow(workflowName);
            break;

        case 'gemini':
            const geminiCmd = generateGeminiCommand(workflowName);
            console.log('Gemini CLI command:');
            console.log(geminiCmd);
            break;

        case 'export':
            const outputFile = args[2] || `${workflowName}.sh`;
            exportToShellScript(workflowName, outputFile);
            break;

        default:
            console.log('Usage:');
            console.log('  node superclaude-workflows.js list');
            console.log('  node superclaude-workflows.js show <workflow-name>');
            console.log('  node superclaude-workflows.js gemini <workflow-name>');
            console.log('  node superclaude-workflows.js export <workflow-name> [output-file]');
    }
}

module.exports = { workflows, executeWorkflow, generateGeminiCommand };
