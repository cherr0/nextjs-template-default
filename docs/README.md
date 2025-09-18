---
title: 문서 구조와 운영 가이드
audience: shared
scope: repo
tags: [docs, governance]
version: 2.0.0
updated: 2025-09-18
---

# 문서 구조와 운영 가이드

이 문서는 저장소의 문서를 어디에, 어떻게 작성·관리할지에 대한 공통 규칙을 제공합니다. 팀원과 LLM 에이전트가 동일한 기준으로 문서를 찾고 유지보수할 수 있도록 합니다.

## PRD 문서 개요
- 위치: `docs/project/prd/`에 PRD(제품 요구사항 문서)를 보관합니다.
- 템플릿: `docs/templates/prd-template.md`를 복사해 새 문서를 생성합니다.
 - 파일명: `한글-명칭.md` (예: `정렬-필터-기능-prd.md`).
- Frontmatter(필수): `title, status(draft|review|approved), version, updated, scope, tags, related`(일정/담당자 정보 제외).
- 운영 원칙: PRD는 제품 요구/의사결정의 정본입니다. 개발 문서(`docs/**`)와 이슈/PR에서 PRD로 링크해 추적성을 보장하세요.
- 컨텍스트 엔지니어링 권장: PRD 상단에 양파 모델(최종 목표 → 중간 산출물 → 페르소나 → 제약/스타일 → 원본 데이터)을 작성하면 LLM 구현에 유리합니다.

## 에이전트 안내(Agents Overview)
- 기본 언어 정책: 한국어 우선(COMMUNICATION_POLICY는 루트 `AGENTS.md` 참조)
- 필수 규칙과 워크플로우는 `AGENTS.md` 및 개별 전용 문서에 따릅니다.
- 사람 대상 정본 규칙은 `docs/conventions/*`, 실무 흐름은 `docs/guides/*`를 우선 참조합니다.

## 문서 구조(3개 카테고리)
- `docs/conventions/` — 규칙·관례·원칙(정책의 정본)
  - 예: 코딩 스타일, 프론트엔드 규칙, 패턴, 데이터 관리 원칙, 리뷰 기준
- `docs/guides/` — 실무 흐름 및 절차(How‑To)
  - 예: 개발 워크플로우, API 통합, 기능 모듈 작성, UI 커스터마이징, 테스트 가이드
- `docs/agents/` — 에이전트 전용 문서
  - 예: 세션 프로토콜, Doc Gate 체크리스트, 로딩/집행 규칙, 에이전트용 안내

## 분류 기준(어디에 둘지 판단)
- 규칙/정책/원칙은 `conventions`에 둡니다. 사람과 에이전트가 참조하는 “정본”입니다.
- 절차/예제/체크리스트 등 수행 중심 내용은 `guides`에 둡니다.
- 사람에게 불필요하거나 실행 제약이 포함된 에이전트 워크플로우는 `agents`에 둡니다.
- 동일 내용의 중복 금지: 정본은 `conventions`에 두고, `guides`/`agents`에서는 링크로 참조합니다.

## 작성 규칙
- 기본 언어: 한국어(ko). 코드/명령어/경로는 원문 유지, 설명/주석은 한국어.
- 파일명: 소문자 kebab‑case(`my-doc-title.md`).
- 마크다운: 문서당 하나의 H1(`# 제목`). 불필요한 깊은 중첩 지양.
- 내부 링크: 항상 상대경로 사용. 정본(규칙)은 `conventions`를 우선 링크.
- 금지: 하단에 “최종 업데이트/버전” 푸터 추가. 해당 정보는 Frontmatter로만 관리.

### Frontmatter(필수)
모든 문서 상단에 다음 항목을 포함합니다.
```
---
title: 문서 제목(한국어)
audience: human | agent | shared
scope: frontend | repo | agents | build | api
tags: [키워드, 콤마, 구분]
version: 2.0.0
updated: YYYY-MM-DD
---
```

## 변경/운영 워크플로우
1) 새 문서 추가
- 카테고리 선택(`conventions`/`guides`/`agents`) → Frontmatter 작성 → 상대 링크 추가.

2) 문서 이동/개편
- 참조 경로 검색: `rg -n "docs/(common|conventions|guides|agents)/" -S`
- 링크 일괄 갱신 후, 에이전트 문서(`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`)의 참조도 확인/수정.

3) 날짜/버전 관리
- 기능적 의미가 있는 변경 시 `updated` 갱신. 프로젝트 버전 전략과 함께 `version` 유지.

4) 에이전트 호환성
- 에이전트 의무 로딩 문서는 `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`에 경로가 반영되어야 합니다.
- 에이전트 전용 문서에는 `audience: agent`를 지정합니다.

## 품질 게이트(권장)
- 링크 점검(수동): 이동 후 주요 링크 클릭 확인 또는 `rg`로 잔존 경로 탐색.
- 일관성 점검: Frontmatter 유무, H1 존재 여부, 카테고리 오배치 여부 확인.
- 중복 방지: 정본은 하나만 유지하고, 나머지는 링크로 참조.

## 네이밍/경로 규칙 요약
- 디렉터리: `conventions/`, `guides/`, `agents/` 3개만 사용.
- 파일명: kebab‑case, 확장자는 `.md`.
- 경로 표기: 항상 상대 경로(`../` 없이 현재 문맥 기준 합리적으로 작성).

## 자주 하는 실수
- `docs/common/` 경로 사용(금지).
- Frontmatter 누락 또는 하단 푸터로 버전/업데이트 일자 표기.
- 정본을 `guides`/`agents`에 중복 서술(반드시 `conventions`로 수렴 후 링크).

## 참고
- 규칙 정본 예: `docs/conventions/coding-style.md`, `docs/conventions/frontend-rules.md`, `docs/conventions/patterns.md`
- 가이드 예: `docs/guides/development-workflow.md`, `docs/guides/api-integration.md`
- 에이전트: `docs/agents/session-protocol.md`, `docs/agents/doc-gate.md`
