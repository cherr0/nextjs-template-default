---
title: Gemini Code LLM Instructions
audience: agent
scope: agents
tags: [agents, workflow, nextjs]
version: 2.0.0
updated: 2025-09-18
---

# Gemini Code LLM Instructions

## 1. MANDATORY WORKFLOW & CONTEXT LOADING

### Session Start Protocol

At the beginning of EVERY session, you MUST load and understand the project's core rules. This is not optional.

**Use `read_many_files` to load the following core documents immediately:**

- `./GEMINI.md` (This file)
- `./docs/conventions/coding-style.md`
- `./docs/conventions/frontend-rules.md`
- `./docs/conventions/patterns.md`
- `./docs/agents/session-protocol.md`

After loading, provide a one-sentence confirmation acknowledging the core constraints have been loaded.

### Pre-Task Protocol

BEFORE executing any request, follow this sequence:

1. **Classify Task**: Determine the user's intent (e.g., `code_edit`, `code_analysis`, `server_ops`).
2. **Load Task-Specific Docs**: Based on the classification, read the necessary documents from the `DOCUMENT_DEPENDENCY_MATRIX`.
3. **State Your Plan**: Briefly outline your plan. For code changes, specify the files you will modify.
4. **Request Approval**: For any file modification (`write_file`, `replace`) or sensitive command (`run_shell_command`), you MUST ask for user approval before proceeding.
5. **Execute & Verify**: Execute the plan using the available tools. For code changes, run `yarn lint` to verify quality.

## 2. TASK & DOCUMENT MAPPING

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

## 3. PROJECT CONSTRAINTS & CONVENTIONS

### Next.js 15 App Router Constraints

```json
{
  "framework": "Next.js 15 with App Router",
  "typescript": "Strict mode enabled",
  "routing": {
    "structure": "app/ directory based",
    "files": ["page.tsx", "layout.tsx", "loading.tsx", "error.tsx"],
    "forbidden": ["pages/ directory", "_app.js", "_document.js"]
  },
  "components": {
    "server_default": "Server Components by default",
    "client_opt_in": "'use client' directive for interactivity",
    "location": "src/components/ for reusable components"
  }
}
```

### State Management Rules

```json
{
  "TanStack_Query": {
    "purpose": "Server state management only",
    "use_cases": ["API data", "caching", "background sync"],
    "forbidden": ["Client global state", "UI state"]
  },
  "Zustand": {
    "purpose": "Client global state only",
    "use_cases": ["Auth state", "theme", "UI preferences"],
    "forbidden": ["Server data", "form state"]
  },
  "React_State": {
    "purpose": "Local component state only",
    "use_cases": ["Component internal state", "temporary UI state"],
    "forbidden": ["Cross-component state", "persistent data"]
  }
}
```

### Styling Constraints

```json
{
  "method": "Tailwind CSS v4 + CVA",
  "file_naming": "Tailwind utility classes",
  "global_styles": "src/styles/globals.css",
  "component_variants": "CVA (Class Variance Authority)",
  "utilities": "cn() function for class merging",
  "forbidden": [
    "Inline styles (without justification)",
    "styled-components",
    "emotion"
  ]
}
```

## 4. DEVELOPMENT WORKFLOW

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

### Command Mapping (Next.js Environment)

```json
{
  "development": "yarn dev (port 3000)",
  "build": "yarn build",
  "lint": "yarn lint",
  "type_check": "yarn type-check",
  "start_production": "yarn start"
}
```

### Port Configuration

```json
{
  "dev_server": "3000 (changed from 5173)",
  "storybook": "6006 (unchanged)",
  "preview": "3001 (if needed)"
}
```

### Quality Gates

```json
{
  "pre_commit_checks": [
    "yarn lint (ESLint)",
    "yarn type-check (TypeScript)",
    "yarn build (Build verification)"
  ],
  "mandatory_before_completion": [
    "No TypeScript errors",
    "No ESLint errors",
    "Successful build"
  ]
}
```

## 5. FILE STRUCTURE PATTERNS

### Next.js App Router Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles
├── [dynamic]/
│   └── page.tsx        # Dynamic route
└── api/
    └── route.ts        # API route

src/
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   └── features/      # Feature-specific components
├── stores/            # Zustand stores
├── utils/             # Utility functions
└── styles/            # Global CSS files (Tailwind)
```

### Component Organization

```json
{
  "server_components": {
    "location": "app/ directory or src/components/",
    "purpose": "Static rendering, data fetching, SEO",
    "no_client_directive": true
  },
  "client_components": {
    "location": "src/components/ with 'use client'",
    "purpose": "Interactivity, browser APIs, state management",
    "required_directive": "'use client'"
  }
}
```

## 6. IMPORT & ALIAS PATTERNS

### Path Aliases

```json
{
  "@/": "src/",
  "@/components/": "src/components/",
  "@/stores/": "src/stores/",
  "@/utils/": "src/utils/",
  "@/styles/": "src/styles/"
}
```

### Import Conventions

```typescript
// External libraries first
import { useQuery } from '@tanstack/react-query'
import { create } from 'zustand'

// Internal imports with alias
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
```

## 7. ERROR HANDLING & DEBUGGING

### Common Next.js Migration Issues

```json
{
  "router_import_error": {
    "problem": "Using 'next/router' instead of 'next/navigation'",
    "solution": "Use useRouter, usePathname from 'next/navigation'"
  },
  "client_component_error": {
    "problem": "Using hooks without 'use client' directive",
    "solution": "Add 'use client' at top of component file"
  },
  "tailwind_config_error": {
    "problem": "Tailwind classes not working",
    "solution": "Check globals.css imports Tailwind and config is correct"
  }
}
```

### Debugging Checklist

```json
{
  "development_issues": [
    "Check if 'use client' directive is needed",
    "Verify import paths with @/ alias",
    "Confirm Tailwind classes are properly configured",
    "Validate Next.js app directory structure"
  ],
  "build_issues": [
    "Run 'yarn type-check' for TypeScript errors",
    "Check 'yarn lint' for ESLint violations",
    "Verify all imports are properly resolved"
  ]
}
```

## 8. MANDATORY VERIFICATION STEPS

### Before Code Completion

```json
{
  "type_safety": "yarn type-check passes",
  "code_quality": "yarn lint passes",
  "build_success": "yarn build completes without errors",
  "dev_server": "yarn dev starts successfully on port 3000"
}
```

### Documentation Compliance

```json
{
  "mandatory_reads": [
    "./GEMINI.md",
    "./docs/conventions/coding-style.md",
    "./docs/conventions/frontend-rules.md",
    "./docs/conventions/patterns.md"
  ],
  "task_specific_reads": {
    "api_work": "./docs/guides/api-integration.md",
    "component_work": "./docs/guides/ui-customizations.md"
  }
}
```

## 9. GEMINI-SPECIFIC WORKFLOW

### Multi-File Analysis Pattern

```python
def gemini_workflow():
    # 1. Load all required documentation
    docs = read_many_files([
        './docs/conventions/coding-style.md',
        './docs/conventions/frontend-rules.md',
        './docs/conventions/patterns.md'
    ])

    # 2. Analyze task context
    task_type = classify_user_request()

    # 3. Load task-specific documentation
    if task_type in ['api', 'components']:
        load_additional_docs(task_type)

    # 4. Request approval for code changes
    if requires_file_modification():
        request_user_approval()

    # 5. Execute with Next.js constraints
    execute_with_nextjs_patterns()

    # 6. Verify quality gates
    run_verification_checks()
```

### File Operation Patterns

```json
{
  "read_multiple": "Use read_many_files for batch reading",
  "write_operations": "Always request approval first",
  "error_recovery": "Provide specific Next.js debugging steps",
  "completion_verification": "Run quality gates before marking complete"
}
```
