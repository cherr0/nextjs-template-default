---
title: Claude Code LLM Instructions
audience: agent
scope: agents
tags: [agents, workflow, nextjs]
version: 2.0.0
updated: 2025-09-18
---

# Claude Code LLM Instructions

## 🚨 CRITICAL: READ THIS FIRST - ABSOLUTE EXECUTION REQUIREMENT 🚨

**STOP. READ THESE INSTRUCTIONS CAREFULLY BEFORE ANY ACTION.**

This document (CLAUDE.md) has been automatically loaded into your context by the system. However, simply having it loaded IS NOT ENOUGH. You MUST actively process and execute the following steps:

### YOUR FIRST ACTION WHEN RECEIVING ANY USER REQUEST:

**Step 1: ACKNOWLEDGE THIS DOCUMENT**

- State out loud: "I have loaded CLAUDE.md and will now read the required convention documents before proceeding."

**Step 2: EXECUTE MANDATORY READS (NO EXCEPTIONS)**
You MUST use the Read tool to explicitly read these files in this exact order:

1. `Read ./docs/conventions/coding-style.md`
2. `Read ./docs/conventions/frontend-rules.md`
3. `Read ./docs/conventions/patterns.md`

**Step 3: VERIFY AND CONFIRM**
After reading all documents, you MUST:

- Provide a brief summary (2-3 sentences) of key constraints you loaded
- Confirm the tech stack: Next.js 15, App Router, TanStack Query, Zustand
- State: "I am ready to proceed following the loaded guidelines"

**Step 4: ONLY THEN START THE TASK**
Do not skip Steps 1-3. Do not assume you "already know" the conventions. The documents may have been updated.

### WHY THIS MATTERS:

- The system loads CLAUDE.md automatically, but YOU must execute the Read commands
- Having context ≠ Following instructions
- Each session requires fresh document loading to ensure latest conventions are followed

### FAILURE TO COMPLY:

If you proceed without completing Steps 1-3, you are violating project protocols and your work WILL be incorrect.

---

## MANDATORY WORKFLOW EXECUTION SEQUENCE

## CONTEXT_LOADING_PROTOCOL

### Session Start Required Actions

BEFORE starting ANY task, IMMEDIATELY execute these Read operations:

**MANDATORY CORE DOCUMENTS** (Execute every session - NO EXCEPTIONS):

- `Read ./CLAUDE.md` (this file - project foundation)
- `Read ./docs/conventions/coding-style.md`
- `Read ./docs/conventions/frontend-rules.md`
- `Read ./docs/conventions/patterns.md`
- `Read ./docs/agents/session-protocol.md` (session checklist)

**TASK-SPECIFIC DOCUMENTS** (Load based on work type):

- Frontend/UI work: `Read ./docs/guides/feature-module-guide.md`, `Read ./docs/guides/ui-customizations.md`
- API integration: `Read ./docs/guides/api-integration.md`
- New features: `Read ./docs/guides/feature-module-guide.md`

**VERIFICATION REQUIREMENTS**:

- After loading documents, provide brief summary of key constraints loaded
- Confirm understanding of tech stack (Next.js 15, App Router, TanStack Query, Zustand)
- Acknowledge project structure (app/, src/components/, src/stores/)
- State readiness to follow loaded guidelines

**PROTOCOL FAILURE HANDLING**:

- If documents fail to load: Stop all work, report error, request manual intervention
- If protocol is skipped: User must explicitly override with acknowledgment of risks
- If partial loading: Complete missing documents before proceeding

### PRE_TASK_GATE (Execute BEFORE any action)

```python
# ALGORITHMIC WORKFLOW ENFORCEMENT
def pre_task_check():
    # NEW: Mandatory context loading check
    if not session_context_loaded:
        load_mandatory_documents()  # Execute Read calls for core docs
        session_context_loaded = True

    task_type = classify_request()

    # NEW: Task-specific context loading
    load_conditional_documents(task_type)  # Load task-specific docs

    if task_type in ["code_edit", "file_create", "implementation"]:
        # BLOCKING: User approval required
        display_approval_template()
        wait_for_explicit_confirmation()

        # Doc gate execution (docs already loaded above)
        relevant_docs = get_docs_by_task_type(task_type)
        for doc in relevant_docs:
            summarize_critical_rules(doc)

        # Server state verification
        exec("lsof -ti:3000")

    return proceed_authorization
```

### TASK_CLASSIFICATION_MAP

```json
{
  "code_edit": [
    "API integration",
    "component impl",
    "feature add",
    "state mgmt"
  ],
  "code_analysis": ["debug", "explain", "review", "investigate"],
  "documentation": ["README", "guide create", "doc update"],
  "server_ops": ["dev server", "build", "deploy"]
}
```

### DOCUMENT_DEPENDENCY_MATRIX

```json
{
  "frontend_work": [
    "frontend_rules.md",
    "coding_style.md",
    "patterns.md",
    "feature-module-guide.md"
  ],
  "api_integration": [
    "api-integration-workflow.md",
    "coding_style.md",
    "feature-module-guide.md"
  ],
  "component_work": [
    "customizations.md",
    "frontend_rules.md",
    "feature-module-guide.md"
  ],
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

## CRITICAL_DOCUMENT_PATHS

```json
{
  "mandatory_reads": {
    "claude_instructions": "./CLAUDE.md",
    "session_protocol": "./docs/agents/session-protocol.md",
    "coding_style": "./docs/conventions/coding-style.md",
    "frontend_rules": "./docs/conventions/frontend-rules.md",
    "patterns": "./docs/conventions/patterns.md",
    "doc_gate": "./docs/agents/doc-gate.md",
    "development_workflow": "./docs/agents/development-workflow.md"
  },
  "conditional_reads": {
    "api_integration": "./docs/guides/api-integration.md",
    "customizations": "./docs/guides/ui-customizations.md",
    "feature_module_guide": "./docs/guides/feature-module-guide.md"
  }
}
```

## EXECUTION_CONSTRAINTS

```json
{
  "user_approval_required": [
    "file_write",
    "file_edit",
    "server_start",
    "task_status_change"
  ],
  "single_step_execution": true,
  "auto_completion_forbidden": ["set-status done", "task completion"],
  "server_check_before_start": "lsof -ti:3000"
}
```

## TECHNICAL_STACK_CONSTRAINTS

```json
{
  "framework": "Next.js 15 + TypeScript",
  "build_tool": "Next.js (Turbopack/Webpack)",
  "router": "Next.js App Router",
  "ui": "Tailwind CSS v4",
  "styling": "Tailwind CSS + CSS Variables + CVA (Class Variance Authority)",
  "state": "Zustand + TanStack Query v5",
  "import_alias": "@/ → src/",
  "disabled_features": [],
  "forbidden_actions": [
    "relative_path_imports",
    "app_router_modification_without_pattern",
    "inline_styles_without_justification"
  ]
}
```

## PROJECT_STRUCTURE_MAP

```json
{
  "app/": "next_app_router_pages",
  "src/components/": "reusable_components",
  "src/stores/": "zustand_global_state",
  "src/utils/": "utility_functions",
  "src/styles/": "global_tailwind_css",
  "src/lib/": "utility_libraries_and_helpers"
}
```

## DEVELOPMENT_COMMANDS

```json
{
  "dev": "yarn dev",
  "build": "yarn build",
  "lint": "yarn lint",
  "start": "yarn start"
}
```

## BUSINESS_DOMAIN

```json
{
  "project": "nextjs_template_default",
  "purpose": "modern_nextjs_template_with_best_practices",
  "core_features": [
    "server_components",
    "client_components",
    "state_management",
    "api_integration"
  ]
}
```

## PLAN_SYSTEM

```json
{
  "plan_docs": "docs/plans/",
  "plan_template": "docs/templates/plan-template.md",
  "require_plan_for": [
    "code_edit",
    "file_create",
    "implementation",
    "server_ops"
  ],
  "pr_includes_plan_link": true,
  "notes": "Plan-First로 작업을 진행합니다."
}
```

## LLM_EXECUTION_ALGORITHM

```python
def execute_user_request(user_input):
    # NEW: Context loading enforcement
    ensure_session_context_loaded()  # Execute CONTEXT_LOADING_PROTOCOL

    task_type = classify_request(user_input)

    # MANDATORY: Pre-task gate (includes context loading)
    if task_type in BLOCKING_OPERATIONS:
        request_user_approval()
        load_required_documents(task_type)  # Already loaded by context protocol
        verify_server_state()

    # Execute with constraints
    if approved:
        execute_task_with_monitoring()

    # FORBIDDEN: Auto-completion
    # wait_for_user_validation_before_status_change()
```

## MANDATORY_BEHAVIORS

### Context Loading Requirements

- **EVERY SESSION**: Load coding_style.md, frontend_rules.md, patterns.md before ANY task
- **TASK-SPECIFIC**: Load additional docs based on work type classification
- **VERIFICATION**: Confirm document loading with brief summary of loaded constraints
- **COMPLIANCE**: Never skip context loading - it's required for all implementation work

### Document Loading Triggers

- **Session Initialization**: First task in any Claude Code session
- **Implementation Tasks**: Any code_edit, file_create, or implementation work
- **Complex Operations**: Multi-file changes, architectural modifications
- **Manual Override**: User can request context reload with explicit Read commands

### Language Output Requirements

- **Korean Primary**: All user-facing information, explanations, and documentation must be provided in Korean
- **Korean Analysis**: Technical analysis, component descriptions, implementation plans in Korean
- **Korean Guidelines**: Project guidelines, best practices, and recommendations in Korean
- **English Preserved**: Code comments, variable names, technical terms follow international standards
- **Bilingual Context**: Include English technical terms in parentheses when helpful for clarity

### 🚨 CRITICAL: Never Proceed Alone Rule

- **ABSOLUTE PROHIBITION**: Never proceed with any implementation task without explicit user approval
- **DOCUMENT COMPLIANCE**: If loaded documents contain patterns/rules that conflict with user request, IMMEDIATELY halt and request clarification
- **NO AUTONOMOUS DECISIONS**: Never make independent decisions about implementation approaches when documents specify different patterns
- **PROTOCOL VIOLATION RESPONSE**: If document loading is incomplete or rules are ambiguous, STOP all work and request manual intervention
- **USER OVERRIDE ONLY**: Only proceed when user explicitly acknowledges rule conflicts and provides clear override instructions
