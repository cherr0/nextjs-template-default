---
title: 개발 워크플로우
audience: human
scope: repo
tags: [guides, workflow]
version: 2.0.0
updated: 2025-09-18
---

# 개발 워크플로우

> 역할 분리 안내: 세션 시작 절차와 필수 문서 로드는 `docs/agents/session-protocol.md`를 참조하세요. 본 문서는 Plan-First, 승인 흐름, 품질 검증, 실행 명령에 집중합니다.

## ⚠️ **절대 규칙 - 반드시 읽고 준수하세요**

> 🚨 **사용자 승인 없이 작업을 진행하지 마세요!**
>
> - 작업 시작 전 반드시 사용자 승인 대기
> - 작업 완료 후 반드시 사용자 검토 및 승인 대기
> - 자동으로 작업 완료 처리 절대 금지

### 🚨 **CRITICAL: 문서 규칙 위반 시 즉시 중단**

> **절대 혼자 진행하지 않는 원칙**
>
> - **문서 로드 실패**: 필수 문서 로드가 실패하면 즉시 모든 작업 중단
> - **규칙 충돌 발견**: 로드된 문서 규칙과 사용자 요청이 충돌하면 즉시 중단하고 명확화 요청
> - **패턴 불일치**: 기존 프로젝트 패턴과 다른 구현 방식이 필요하면 사용자 승인 필수
> - **자율 판단 금지**: 문서에 명시되지 않은 구현 결정은 사용자 확인 없이 절대 진행 금지
> - **프로토콜 준수**: CONTEXT_LOADING_PROTOCOL 미준수 시 즉시 중단

### ⚠️ **문서 규칙 위반 대응 절차**

1. **즉시 중단**: 현재 작업을 즉시 멈춤
2. **상황 보고**: 발견된 충돌/문제 상황을 사용자에게 명확히 보고
3. **옵션 제시**: 가능한 해결 방안들을 제시 (문서 수정, 요청 수정, 예외 승인 등)
4. **승인 대기**: 사용자의 명확한 지시를 받을 때까지 대기
5. **명시적 확인**: 사용자가 충돌을 인지하고 진행 방향을 명시적으로 승인했을 때만 재개

---

## 📋 **워크플로우 시작 전 필수 확인사항**

> 기본 모드: 단일 단계 진행
>
> - 사용자가 범위를 명시(예: "계획+구현까지 진행")하지 않는 한, 한 단계씩만 수행하고 매 단계마다 승인 대기합니다.
> - 상태 변경(set-status), 대규모 작업 확장(expand) 등은 항상 사용자 승인 후에만 진행합니다.

**모든 작업 시작 전 아래 체크리스트를 확인하세요:**

- [ ] **👤 작업 범위 설명 및 승인 대기** ⚠️
- [ ] Doc Gate 요약(5줄) 공유 및 승인
- [ ] `docs/plans/`에 Plan 문서 생성(템플릿 기반)
- [ ] 구현 1단계 수행 및 Plan 체크리스트 갱신
- [ ] 품질 검증 (lint, build, format)
- [ ] **👤 사용자 검토 대기** ⚠️

---

## 📘 Plan-First 워크플로우

### 1. 작업 선택 및 승인

- 사용자에게 작업 범위와 기대 결과를 설명하고 승인 대기합니다.
- 승인 없이는 구현을 시작하지 않습니다. 항상 단일 단계만 수행합니다.

### 1.1 Doc Gate (문서 확인 게이트)

작업을 시작하기 전 아래 문서를 확인하고 핵심 규칙을 요약하여 사용자에게 공유하세요. 승인 후 다음 단계로 진행합니다.

- 공통: 프로젝트 명세, 코딩 스타일, 개발 워크플로우, 패턴 가이드
- 유형별: API 연동/컴포넌트/Shadcn/라우팅/Zustand/폼 등
- 자세한 체크리스트: `docs/agents/doc-gate.md`

권장 플로우:

1. `docs/agents/doc-gate.md` 기준으로 해당 문서를 확인
2. 5줄 내 요약 + 금지/주의 사항 명시
3. 사용자 승인 대기 → 승인 시 다음 단계 진행

### 2. 계획 수립 및 문서화

- `docs/templates/plan-template.md`를 복사해 `docs/plans/<feature-name>.md`로 생성합니다.
- 최소 포함 항목: Scope, Goals/Out of scope, Dependencies & Docs, Risks, Step-by-step Plan(체크박스), Validation, Rollback, Decision Log.
- 진행 중에는 체크박스와 결정 기록을 수시로 업데이트합니다. PR 본문에 해당 Plan 문서 링크를 포함합니다.

예시

```bash
cp docs/templates/plan-template.md docs/plans/2025-01-17-content-store-bulk-edit.md
```

### 3. 구현 단계

```bash
git pull origin main
git checkout -b feature/작업-이름

# 필요 시 개발 서버는 사용자 승인 후 시작
# yarn dev

# (아이콘 추가 포함 시) 원시 SVG 추가 후 아이콘 빌드
# yarn icons:build
```

### 4. 품질 검증 단계

#### 📋 기본 품질 검증

```bash
# 코드 품질 확인 (필수 순서대로 실행)
yarn lint               # ESLint 검사 - 에러 시 중단
yarn build              # TypeScript 타입 체크 및 빌드 - 에러 시 수정 필요

# 최종 검증 (모든 체크 통과 확인)
yarn lint && yarn build && echo "✅ 모든 품질 검증 통과"
```

#### 🤖 서브에이전트 품질 검증 (권고/승인 후 실행)

```bash
# 검증 서브에이전트 실행 조건 (조건 충족 시 제안 후, 사용자 승인 시 실행)
if [[ $(wc -l < "큰파일.txt") -gt 2000 ]]; then
  # Task 도구로 python-expert 서브에이전트 실행
  echo "→ 큰 파일 감지, python-expert 서브에이전트 실행"
fi

# quality-engineer 서브에이전트 (모든 개발 완료 후 권고 — 사용자 승인 후 실행)
# → 코드 품질 체크리스트 자동 생성
# → 테스트 커버리지 분석 및 엣지케이스 검출
# → 성능 이슈 및 보안 취약점 자동 스캔

# task-checker 서브에이전트 (작업 완료 전 권고 — 사용자 승인 후 실행)
# → 요구사항 대비 구현 완성도 자동 검증
# → 품질 기준 통과 여부 판단
# → 작업 완료 조건 체크
```

#### 🖥️ 서버 상태 확인

```bash
# Next.js 개발 서버 포트 확인 (3000번 포트)
lsof -ti:3000 || echo "포트 비어 있음 (서버 시작 전 승인 필요)"
```

### 6. 사용자 검토 및 완료

- 구현 결과와 검증 로그를 공유하고 사용자 검토/승인을 기다립니다.
- 승인이 확인되면 Plan 문서의 체크리스트를 마무리하고 PR을 머지합니다.

---

## 🚨 **자동 완료 금지 규칙**

### ❌ 절대 하지 말 것

- 사용자 승인 없이 작업 완료 선언
- 작업 내용을 사용자에게 보고하지 않고 바로 구현 시작
- 구현 완료 후 사용자 검토 없이 바로 다음 작업 진행
- "자동으로 완료되었습니다" 같은 메시지 사용

### ✅ 반드시 할 것

- 작업 시작 전 사용자에게 상세 설명 및 승인 요청
- 구현 완료 후 결과 보고 및 검토 요청
- 사용자가 "승인", "진행해주세요" 등의 명시적 승인 메시지 대기
- 각 단계에서 투명한 소통

---

## 🚀 기존 일일 워크플로우

### 개발 시작

```bash
git pull origin main
yarn install  # package.json이 변경된 경우
yarn dev      # Next.js 개발 서버 시작 (포트 3000)
```

### 기능 개발

```bash
git checkout -b feature/기능-이름

# 코드 작성 후 품질 검증
yarn lint          # 린트 체크 - 에러 시 수정
yarn build         # 빌드 체크 - 타입 에러 시 수정

# 커밋 및 푸시
git add .
git commit -m "feat: 기능 설명"
git push origin feature/기능-이름
```

## 🚀 기존 개발 완료 후 테스트

### 개발 완료 후 테스트

```bash
# Next.js 개발 서버 포트 확인 (3000번 포트)
lsof -ti:3000 || yarn dev &

# 서버가 떠있으면 기존 서버 사용, 없으면 새로 시작
sleep 2  # 서버 시작 대기
curl -s http://localhost:3000 > /dev/null && echo "서버 정상" || echo "서버 시작 필요"
```

### TypeScript 타입 체크

```bash
yarn build  # TypeScript 컴파일 에러 확인 (빌드를 통한 타입 체크)
```

## 📋 브랜치 & 커밋 규칙

### 브랜치 네이밍

- `feature/기능-이름` - 새 기능
- `fix/버그-이름` - 버그 수정
- `refactor/리팩토링-범위` - 코드 리팩토링

### 커밋 메시지

```
feat: 새 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 업데이트
style: 코드 포맷팅
```

## 🔍 코드 품질 확인

```bash
# 표준 품질 검증 순서 (install-lint-build 워크플로우)
yarn install    # 의존성 설치 (package.json 변경 시)
yarn lint       # ESLint 린트 체크 - 에러 시 중단
yarn build      # Next.js 프로덕션 빌드 및 TypeScript 타입 체크

# (아이콘 정책 준수 여부 확인)
yarn icons:build  # 누락된 레지스트리/변환물이 있으면 갱신

# 최종 검증
yarn lint && yarn build && echo "✅ CI/CD 준비 완료"
```

## 🛠️ 서버 상태 확인 스크립트

```bash
# Next.js 개발 서버 포트 체크 및 서버 시작
check_server() {
  if lsof -ti:3000 > /dev/null; then
    echo "✓ Next.js 서버가 이미 실행 중입니다 (포트 3000)"
    return 0
  else
    echo "→ Next.js 개발 서버를 시작합니다..."
    yarn dev &
    sleep 3
    return $?
  fi
}

# 사용법: check_server
```

## 🎯 Next.js App Router 관련 명령어

```bash
# 라우트 구조 확인
ls -la app/

# 빌드 및 타입 체크
yarn build

# 정적 분석
yarn lint
```

## 📘 Plan-First 원칙 요약

- 사용자 승인 기반 단일 단계 진행, 자동 완료 금지.
- 모든 기능/수정 작업은 `docs/plans/`에 계획 문서를 생성하고 갱신합니다.
- Doc Gate 요약(5줄)과 금지/주의 사항을 Plan 문서에 포함합니다.
- 품질 검증 순서 준수: `lint` → `build`.
- Next.js 포트 3000 상태 확인 후 서버 시작은 반드시 사용자 승인 하에 진행합니다.
