---
title: 기능/제품 명세 제목(예: 검색 결과 개인화)
status: draft
version: 0.1.0
updated: YYYY-MM-DD
scope: product
tags: [prd, product, llm]
related: ["../guides/documentation-guidelines.md", "https://issue-tracker/ISSUE-123"]
---

# PRD: 기능/제품 명세 제목

> LLM이 바로 구현에 착수할 수 있도록 컨텍스트 엔지니어링 기반으로 정보를 제공합니다.

## 0) 컨텍스트 엔지니어링
- 최종 목표(Final Goal): …
- 중간 산출물(Intermediate Output): …
- 페르소나(Core Persona): 예) Next.js 프론트엔드 시니어 엔지니어
- 제약/스타일(Constraints/Style): 예) App Router, CSS Modules, 한국어 주석, 테스트 우선 등
- 원본 데이터(Raw Inputs): 예) 스키마/와이어프레임/예시 JSON/링크

## 1) 요약(Summary)
- 배경/문제: 1~2문장
- 목표: 1~2문장
- 성공 판단(간단): 예) 전환율 +2pp, CS 감소

## 2) 범위(Scope)
- Goals: • … • …
- Non-Goals(선택): • … • …

## 3) 프로세스 플로우(Process Flow)
- 단계 흐름: • 입력 → 처리 → 출력(캐시/상태/네비게이션 포함)
- 다이어그램(선택): mermaid 등 텍스트 다이어그램 사용 가능

## 4) 데이터/API(Data & API)
- 엔터티/필드(요약): …
- 엔드포인트(요약): … (요청/응답 핵심 키만)

## 5) 검증/에러(Validation & Errors)
- 테스트 케이스(Given/When/Then 요약): • … • …
- 에러 상태/복구: • … • …
- 모니터링/로그(선택): • …

## 6) 케이스/시나리오(Cases)
- 일반/엣지/경계값: • … • …

## 4) 사용자/주요 시나리오
- 주요 사용자/페르소나: • …
- 핵심 플로우(간단): • 시나리오 A • 시나리오 B

## 5) 결정/옵션(미정 사안 기록)
- 결정 항목: 제목
  - 옵션 A: 장점/단점 요약
  - 옵션 B: 장점/단점 요약
  - 제안/코멘트: …
  - 결정 상태: 미정 | 채택(A/B/기타)

반복 사용용 표
| 항목 | 옵션 | 장점 | 단점 | 상태 |
|---|---|---|---|---|
| 예) 데이터 보관 | A(30일) | 비용 낮음 | 분석 제한 | 미정 |

## 7) 오픈 이슈(Open Issues)
- [ ] 이슈 제목 — 영향/리스크: … — 다음 단계: …
- [ ] …

## 8) 참고(Links)
- 관련 문서/이슈/PR: …
