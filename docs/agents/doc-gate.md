---
title: Doc Gate — 작업 시작 전 문서 확인 체크리스트
audience: agent
scope: agents
tags: [agents, checklist]
version: 2.0.0
updated: 2025-09-18
---

# Doc Gate — 작업 시작 전 문서 확인 체크리스트

작업을 `in-progress`로 전환하기 전, 아래 문서를 확인하고 주요 규칙을 요약해 주세요. 사용자가 작업 범위를 명시하지 않는 한, Doc Gate 확인과 요약 승인 후에만 다음 단계로 진행합니다.

## 공통(모든 작업 필수)

- 프로젝트 명세: `README.md` 또는 `CLAUDE.md`
- 코딩 스타일: `docs/conventions/coding-style.md`
- 개발 워크플로우: `docs/agents/development-workflow.md`
- 개발 패턴 가이드: `docs/conventions/patterns.md`
- 프론트엔드 규칙: `docs/conventions/frontend-rules.md`

## 작업 유형별 필수 문서

### 1) API 연동/서버 상태 작업

- API 연동 워크플로우: `docs/guides/api-integration.md`
- 데이터 관리 아키텍처: `docs/conventions/data-management-architecture.md`
- 쿼리 키: `src/constants/query-keys.ts`
- 서비스 레이어: `src/services/`
- **금지**: 서버 상태를 Zustand로 관리 금지 (TanStack Query 사용)
- **금지**: 클라이언트 컴포넌트에서 직접 fetch (서버 컴포넌트 우선 고려)

### 2) 컴포넌트 구현/UI 개발

- 커스터마이징 가이드: `docs/guides/ui-customizations.md`
- 피처 모듈 가이드: `docs/guides/feature-module-guide.md`
- 아이콘 사용 가이드: `docs/guides/icon-usage.md`
- 컴포넌트 위치: `src/components/`
- 스타일: CSS Modules + SCSS 사용
- 스타일 유틸: `src/lib/utils.ts`의 `cn()` 함수

### 3) 라우팅 변경(Next.js App Router)

- App Router 패턴: `app/` 디렉토리 구조
- **주의**: Server Components vs Client Components 구분
- **금지**: 상대경로 import 금지 (`@/` 절대경로 사용)

### 4) 전역 상태/Zustand

- 데이터 관리 아키텍처 재확인
- **금지**: 서버 상태를 Zustand로 관리 금지
- 전역 상태 스토어 위치: `src/stores/`
- 사용 용도: UI 상태, 테마, 사용자 선호도만

### 5) 폼 작업(React Hook Form + Zod)

- 패턴: RHF + Zod 사용 원칙
- Server Actions 통합 고려
- 유효성 스키마 위치: `src/lib/validations/`
- **권장**: useActionState와 Server Actions 조합

### 6) Next.js 특화 작업

- **Server Components**: 데이터 fetch는 서버에서 우선
- **Client Components**: 상호작용이 필요한 경우만
- **Server Actions**: 폼 처리 및 뮤테이션 처리
- **Route Handlers**: API 엔드포인트 구현 (`app/api/`)
- **캐싱**: Next.js 캐시 + TanStack Query 조합 활용

### 7) 문서 작업(Documentation)

- 문서 작성 가이드: `docs/guides/documentation-guidelines.md`
- 원칙: 설명 중심, 불필요한 코드 예시 금지(필요 시 함수 단위 최소 예시)
- 중복 방지: 단일 소스 문서 링크 활용(요약+링크)

## 체크 절차 & 승인 대기 체크포인트

### 🚨 MANDATORY: 승인 대기 체크포인트

> **절대 혼자 진행하지 않는 원칙**: 각 단계마다 사용자 승인 없이 다음 단계로 진행 금지

1. **문서 식별**: 해당 작업 유형을 식별하고 관련 문서를 모두 확인합니다.
2. **규칙 요약**: 작업에 적용될 핵심 규칙을 5줄 내로 요약합니다.
3. **위험 명시**: 위험/금지 사항을 별도 명시합니다.
4. **Next.js 고려사항**: Next.js 특화 고려사항(SSR/CSR, Server/Client 컴포넌트)을 포함합니다.
5. **🚨 승인 대기**: 요약을 사용자에게 공유하고 **명시적 승인**을 받을 때까지 대기합니다.
6. **🚨 충돌 검증**: 문서 규칙과 사용자 요청 간 충돌이 있는지 확인하고, 충돌 시 즉시 중단 후 명확화 요청합니다.
7. **진행 승인**: 승인 후에만 `in-progress`로 전환하고 다음 단계를 진행합니다.

### ⚠️ 승인 대기 필수 상황

- **문서 규칙 충돌**: 로드된 문서와 사용자 요청이 상충하는 경우
- **패턴 불일치**: 기존 프로젝트 패턴과 다른 접근이 필요한 경우
- **구현 방식 선택**: 여러 가능한 구현 방식 중 선택이 필요한 경우
- **Next.js 특화 결정**: Server/Client Components, 라우팅 방식 등의 아키텍처 결정
- **리스크 존재**: 잠재적 위험이나 되돌리기 어려운 변경사항

### 🚨 자율 진행 절대 금지 사항

- 문서에 명시되지 않은 새로운 패턴 도입
- 사용자 요청과 문서 규칙이 충돌하는 상황에서의 임의 판단
- 복수의 구현 방식 중 독립적 선택
- 기존 아키텍처 변경을 수반하는 결정

## 요약 예시 템플릿

### API 연동 작업

```
Doc Gate 요약 (작업 유형: API 연동)
- TanStack Query 필수, 쿼리 키는 상수화 (src/constants/query-keys.ts)
- 서버 컴포넌트에서 초기 데이터 fetch, 클라이언트에서 TanStack Query 활용
- 서비스 레이어 경유 (src/services/), Route Handlers (app/api/) 구현
- 상태: 서버(TanStack Query)/전역(Zustand)/로컬(React) 구분 엄수
- Server Actions로 뮤테이션 처리, 캐시 무효화 자동화
잠재 리스크: SSR/CSR 데이터 동기화, 하이드레이션 불일치 주의
```

### 컴포넌트 구현 작업

```
Doc Gate 요약 (작업 유형: 컴포넌트 구현)
- CSS Modules + SCSS로 스타일 격리, cn() 유틸로 클래스 병합
- src/components/ 구조에 따른 계층적 컴포넌트 배치
- TypeScript 인터페이스로 props 타입 정의 필수
- forwardRef 사용으로 ref 전달 지원, 접근성 속성 고려
- Server/Client 컴포넌트 구분하여 렌더링 최적화
잠재 리스크: 하이드레이션 불일치, 클라이언트 전용 기능 서버 실행
```

### 라우팅 작업

```
Doc Gate 요약 (작업 유형: 라우팅 변경)
- Next.js App Router 패턴, app/ 디렉토리 구조 준수
- page.tsx, layout.tsx, loading.tsx, error.tsx 파일 역할 구분
- 동적 라우트 [id], 그룹 라우트 (group) 패턴 활용
- 절대경로 import (@/) 사용, 상대경로 금지
- Server Components 기본, 상호작용 시에만 Client Components
잠재 리스크: 파일 기반 라우팅 규칙 위반, 잘못된 파일명/위치
```

### 폼 작업

```
Doc Gate 요약 (작업 유형: 폼 처리)
- React Hook Form + Zod 스키마 검증 조합
- Server Actions와 useActionState 훅 연동
- 클라이언트/서버 검증 이중화, 에러 처리 일관성
- 폼 상태는 RHF만 사용, 전역 상태 금지
- revalidatePath/revalidateTag로 캐시 무효화
잠재 리스크: Server Actions 직렬화 제한, 파일 업로드 별도 처리
```

## Next.js 특화 주의사항 (요약)

- 기본은 Server Components, 상호작용 필요 시에만 Client Components로 전환합니다.
- 데이터는 서버에서 초기 fetch, 클라이언트는 TanStack Query로 동기화합니다.
- 폼/뮤테이션은 Server Actions 우선, 캐시는 `revalidatePath`와 쿼리 무효화 병행.
- 상세 패턴은 `docs/conventions/patterns.md`를, 빌드/품질 흐름은 `docs/agents/development-workflow.md`를 참조하세요.

---

_최종 업데이트: 2025년 1월_
_버전: 2.0.0 (Next.js 15 환경)_
