---
title: 단일 소스 인덱스 (Single Source of Truth)
audience: human
scope: repo
tags: [docs, index]
version: 2.0.0
updated: 2025-09-18
---

# 단일 소스 인덱스 (Single Source of Truth)

본 인덱스는 도메인별 권위 문서를 지정하고, 중복 서술을 줄이기 위한 참조 허브입니다. 요약은 각 문서 상단 안내 블록을 따르며, 상세 규칙은 아래 권위 문서를 기준으로 합니다.

## 매핑 (Domains → Authority Docs)
- 상태관리: `docs/conventions/data-management-architecture.md`
- Next.js 패턴: `docs/conventions/patterns.md`
- 프로젝트 구조/네이밍: `docs/conventions/coding-style.md`
- 스타일/테마: `docs/guides/ui-customizations.md`
- API 워크플로우: `docs/guides/api-integration.md`
- 코드 리뷰: `docs/conventions/code-review.md`

## 공용 안내 블록 스니펫
아래 블록을 각 문서 상단(타이틀 바로 아래)에 배치합니다. `{도메인명}`은 해당 문서의 도메인으로 교체합니다.

> 단일 소스 안내: 이 문서는 [Single-Source Index](./single-source-index.md)의 '{도메인명}' 권위 문서로 지정되었습니다. 중복 섹션은 요약으로 유지하고, 상세 규칙은 본문을 기준으로 합니다.

## 운영 원칙
- 권위 문서의 내용 변경 시, 관련 문서에서는 요약만 갱신하고 상세는 링크로 위임합니다.
- 신규 문서가 같은 도메인을 다루는 경우, 요약(3~5줄) + 본 인덱스 링크를 추가합니다.
- 교차 참조는 상대 경로를 유지하고, 헤딩 앵커는 가급적 2단계 이내로 제한합니다.
