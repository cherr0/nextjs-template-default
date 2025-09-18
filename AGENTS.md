---
title: Agent Code LLM Instructions
audience: agent
scope: agents
tags: [agents, workflow, nextjs]
version: 2.0.0
updated: 2025-09-18
---

# Agent Code LLM Instructions

## COMMUNICATION_POLICY (언어 정책)
- 기본 언어: 한국어(ko)를 사용합니다.
- 첫 인사, 도구 실행 전 프리앰블, 계획/결과 요약은 한국어로 작성합니다.
- 사용자가 영어로 요청하거나 영어가 명시된 경우에만 영어로 전환합니다.
- 코드, 파일 경로, 명령어 등은 원문 그대로 유지하고, 주석/설명은 한국어로 제공합니다.
- 번역은 요청 기반으로 수행하며, 다국어가 필요한 경우에는 "ko → en" 순서로 제공합니다.


## MANDATORY WORKFLOW EXECUTION SEQUENCE

### PRE_TASK_GATE (작업 전 필수 게이트)
```python
def pre_task_gate():
    task_type = classify_request()

    if task_type in ["code_edit", "file_create", "implementation"]:
        display_approval_template()          # 사용자 승인 요청
        wait_for_explicit_confirmation()     # 명시적 승인 대기

        # Doc Gate: 작업유형별 필수 문서 확인 및 5줄 요약
        for doc in get_docs_by_task_type(task_type):
            summarize_critical_rules(doc)

        # 개발 서버 포트 점유 여부 확인 (3000)
        exec("lsof -ti:3000")

    return proceed_authorization
```

### TASK_CLASSIFICATION_MAP
```json
{
  "code_edit": ["API integration", "component impl", "feature add", "state mgmt"],
  "code_analysis": ["debug", "explain", "review", "investigate"],
  "documentation": ["README", "guide create", "doc update"],
  "server_ops": ["dev server", "build", "deploy"]
}
```

### DOCUMENT_DEPENDENCY_MATRIX
```json
{
  "frontend_work": ["frontend_rules.md", "coding_style.md", "patterns.md", "feature-module-guide.md"],
  "api_integration": ["api-integration-workflow.md", "coding_style.md", "feature-module-guide.md"],
  "component_work": ["customizations.md", "frontend_rules.md", "feature-module-guide.md"],
  "state_management": ["frontend_rules.md", "patterns.md"]
}
```

## STATE_MANAGEMENT_CONSTRAINTS
```json
{
  "TanStack_Query": {
    "purpose": "server_state_only",
    "use_cases": ["API_data", "caching", "CRUD"],
    "forbidden": ["client_global_state"]
  },
  "Zustand": {
    "purpose": "global_state_only",
    "use_cases": ["auth", "theme", "UI_settings"],
    "forbidden": ["server_data"]
  },
  "React_State": {
    "purpose": "local_state_only",
    "use_cases": ["component_internal", "temporary_UI"],
    "forbidden": ["server_data", "global_state"]
  },
  "React_Hook_Form": {
    "purpose": "form_state_only",
    "use_cases": ["form_data", "validation"],
    "forbidden": ["general_state_mgmt"]
  }
}
```

## COMPONENT_PATTERNS
```json
{
  "Server_Components": {
    "location": "app/ directory",
    "use_cases": ["static_rendering", "data_fetching", "SEO_optimization"],
    "forbidden": ["client_side_interactivity", "browser_APIs"]
  },
  "Client_Components": {
    "directive": "'use client'",
    "use_cases": ["interactivity", "browser_APIs", "state_management"],
    "location": "src/components/ with 'use client'"
  },
  "Shared_Components": {
    "location": "src/components/",
    "pattern": "props_based_reusability",
    "styling": "CSS_modules_with_scoping"
  }
}
```


## TECHNICAL_STACK_MAPPINGS
```json
{
  "framework_migration": {
    "from_vite": "npm run dev (port 3000)",
    "from_tanstack_router": "Next.js App Router",
    "from_shadcn": "CSS Modules + SCSS"
  },
  "import_patterns": {
    "@/": "src/ directory alias",
    "components": "@/components/",
    "stores": "@/stores/",
    "utils": "@/utils/"
  },
  "styling": {
    "method": "CSS Modules",
    "extension": ".module.scss",
    "global": "src/styles/globals.scss"
  }
}
```

## AGENT_WORKFLOW_ENFORCEMENT
```python
def agent_execution_pattern():
    # 1. 문서 컨텍스트 로딩
    load_mandatory_docs([
        "coding_style.md",
        "frontend_rules.md",
        "patterns.md"
    ])

    # 2. 작업 분류 및 특화 문서 로딩
    task_type = classify_task()
    load_task_specific_docs(task_type)

    # 3. Next.js 환경 확인
    verify_nextjs_environment()
    check_port_availability(3000)

    # 4. 승인 요청 (코드 변경 시)
    if requires_code_changes():
        request_explicit_approval()

    # 5. 실행 및 검증
    execute_with_constraints()
    verify_compliance()
```

## NEXT_JS_SPECIFIC_RULES
```json
{
  "app_directory": {
    "required_files": ["layout.tsx", "page.tsx"],
    "optional_files": ["loading.tsx", "error.tsx", "not-found.tsx"],
    "forbidden": ["index.js", "_app.js", "_document.js"]
  },
  "server_components_default": {
    "behavior": "server_side_rendering_by_default",
    "client_opt_in": "use 'use client' directive",
    "data_fetching": "async components with fetch()"
  },
  "build_optimization": {
    "image_optimization": "next/image component",
    "font_optimization": "next/font",
    "bundle_analysis": "npm run build && npm run analyze"
  }
}
```

## DEVELOPMENT_COMMANDS_MAPPING
```json
{
  "command_conversion": {
    "pnpm dev": "npm run dev",
    "pnpm build": "npm run build",
    "pnpm lint": "npm run lint",
    "pnpm start": "npm start"
  },
  "port_changes": {
    "development": "localhost:3000 (from 5173)",
    "storybook": "localhost:6006 (unchanged)"
  }
}
```

## PLAN_SYSTEM
```json
{
  "plan_docs": "docs/plans/",
  "plan_template": "docs/templates/plan-template.md",
  "require_plan_for": ["code_edit", "file_create", "implementation", "server_ops"],
  "pr_includes_plan_link": true
}
```

## QUALITY_GATES
```json
{
  "pre_commit": {
    "type_check": "npm run type-check",
    "linting": "npm run lint",
    "formatting": "npm run format"
  },
  "build_verification": {
    "development": "npm run dev (successful start)",
    "production": "npm run build (no errors)",
    "type_safety": "tsc --noEmit"
  }
}
```

## AGENT_SPECIFIC_CONSTRAINTS
```json
{
  "approval_required_operations": [
    "file_creation",
    "file_modification",
    "server_operations",
    "package_json_changes"
  ],
  "auto_completion_forbidden": [
    "task_status_changes",
    "workflow_completion_marking"
  ],
  "mandatory_verification": [
    "Next.js_compliance",
    "TypeScript_type_safety",
    "import_path_validation"
  ]
}
```

## ERROR_HANDLING_PATTERNS
```json
{
  "common_migration_issues": {
    "router_imports": "Replace 'next/router' with 'next/navigation'",
    "page_structure": "Convert pages/ to app/ directory structure",
    "css_imports": "Use CSS modules instead of global CSS imports"
  },
  "debugging_steps": [
    "Check Next.js app directory structure",
    "Verify 'use client' directives placement",
    "Validate import paths with @/ alias",
    "Confirm TypeScript types compatibility"
  ]
}
```

## DOCUMENTATION_REQUIREMENTS
```json
{
  "mandatory_docs_reading": [
    "./AGENTS.md",
    "./docs/conventions/coding-style.md",
    "./docs/conventions/frontend-rules.md",
    "./docs/conventions/patterns.md"
  ],
  "task_specific_docs": {
    "api_integration": "./docs/guides/api-integration.md",
    "components": "./docs/guides/ui-customizations.md"
  }
}
```
