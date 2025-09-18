---
title: 세션 시작 프로토콜 가이드
audience: agent
scope: agents
tags: [agents, protocol]
version: 2.0.0
updated: 2025-09-18
---

# 세션 시작 프로토콜 가이드

> 역할 분리 안내: 본 문서는 "세션 시작/문서 로드" 프로토콜에 집중합니다. 계획 수립(Plan-First), 승인 흐름, 품질 검증·명령어 등 실행 워크플로우는 `docs/agents/development-workflow.md`를 참조하세요.

## 🎯 개요

이 문서는 Claude Code 세션 시작 시 반드시 따라야 할 문서 로드 프로토콜과 체크리스트를 제공합니다. 일관된 작업 품질과 프로젝트 규칙 준수를 보장하기 위해 모든 세션에서 이 프로토콜을 실행해야 합니다.

## 📋 세션 시작 필수 체크리스트

### 1단계: 핵심 문서 로드 (필수)

모든 세션에서 **작업 시작 전** 반드시 읽어야 하는 문서들입니다.

```bash
✅ MANDATORY READS (세션마다 필수)
- [ ] ./CLAUDE.md (프로젝트 루트의 기본 지침)
- [ ] ./docs/conventions/coding-style.md (코딩 표준 및 아키텍처)
- [ ] ./docs/conventions/frontend-rules.md (프론트엔드 디자인 가이드라인)
- [ ] ./docs/conventions/patterns.md (개발 패턴 가이드)
- [ ] ./docs/agents/session-protocol.md (이 문서 - 세션 프로토콜)
```

### 2단계: 작업 유형별 문서 로드 (조건부)

작업 유형에 따라 추가로 읽어야 하는 문서들입니다.

#### Frontend/UI 작업
```bash
- [ ] ./docs/guides/feature-module-guide.md
- [ ] ./docs/guides/ui-customizations.md
```

#### API 통합 작업
```bash
- [ ] ./docs/guides/api-integration.md
- [ ] ./docs/conventions/data-management-architecture.md
```

#### 라우팅 변경 작업
```bash
  (별도 라우팅 문서 참조 항목 제거)
```

#### 새 기능 개발
```bash
- [ ] ./docs/guides/feature-module-guide.md
- [ ] ./docs/agents/development-workflow.md
```

#### 커스터마이징 작업
```bash
- [ ] ./docs/guides/ui-customizations.md
```

### 3단계: 검증 및 확인

문서 로드 완료 후 다음을 확인합니다:

```bash
✅ VERIFICATION CHECKLIST
- [ ] 기술 스택 확인 (Next.js 15, React, TanStack Query, Zustand)
- [ ] 프로젝트 구조 패턴 확인 (app/, src/components/, src/stores/)
- [ ] 상태 관리 규칙 확인 (TanStack Query vs Zustand vs React State)
- [ ] Next.js 패턴 확인 (Server/Client Components, App Router)
- [ ] 스타일링 규칙 확인 (CSS Modules + SCSS, cn() 유틸리티)
- [ ] 로드된 제약사항 간단 요약 제공
```

## 🔧 작업 유형 분류 가이드

### A. code_edit/file_create/implementation
- 파일 변경, 생성, 구현이 포함된 작업
- **포함 사항**: 컴포넌트 생성, API 연동, 라우팅 변경, 기능 추가
- **필수**: 1단계 + 해당 작업 유형별 문서
- **승인 필요**: 사용자 승인 후 진행

### B. code_analysis
- 디버그, 리뷰, 설명, 조사 작업
- **포함 사항**: 코드 리뷰, 버그 분석, 성능 조사, 구조 설명
- **필수**: 1단계 문서만
- **승인 불필요**: 바로 진행 가능

### C. documentation
- README, 가이드, 문서 개선
- **포함 사항**: 문서 작성/수정, 가이드 생성, 주석 추가
- **필수**: 1단계 + patterns.md + `./docs/guides/documentation-guidelines.md`
- **승인 필요**: 문서 변경 시

### D. server_ops
- 개발서버, 빌드, 배포 실행
- **포함 사항**: npm run dev, npm run build, 개발 환경 설정
- **필수**: 1단계 문서만
- **승인 필요**: 서버 상태 변경 시

## 🚨 Next.js 특화 체크사항

### Server vs Client Components
```bash
✅ SERVER COMPONENTS
- [ ] 기본은 Server Components로 시작
- [ ] 데이터 fetch는 서버에서 우선 고려
- [ ] 상호작용 없는 UI는 서버에서 렌더링

✅ CLIENT COMPONENTS
- [ ] 'use client' 지시어 최소화
- [ ] useState, useEffect 등 클라이언트 훅 사용 시에만
- [ ] 사용자 상호작용 필요 시에만 전환
```

### App Router 규칙
```bash
✅ FILE-BASED ROUTING
- [ ] page.tsx: 페이지 컴포넌트
- [ ] layout.tsx: 레이아웃 컴포넌트
- [ ] loading.tsx: 로딩 UI
- [ ] error.tsx: 에러 처리
- [ ] not-found.tsx: 404 페이지

✅ ROUTE ORGANIZATION
- [ ] 기능별 폴더 구조
- [ ] 동적 라우트 [param] 패턴
- [ ] 라우트 그룹 (group) 활용
- [ ] 병렬/인터셉팅 라우트 고려
```

### 데이터 처리 패턴
```bash
✅ DATA FETCHING
- [ ] Server Components: fetch with cache
- [ ] Client Components: TanStack Query
- [ ] Server Actions: 폼 처리 및 뮤테이션
- [ ] Route Handlers: API 엔드포인트

✅ CACHING STRATEGY
- [ ] Next.js 캐시: 정적 데이터
- [ ] TanStack Query: 동적 서버 상태
- [ ] Zustand: 클라이언트 전역 상태
- [ ] React Hook Form: 폼 상태
```

## 🚨 프로토콜 실행 실패 시 대응

### 문서 로드 누락 시
1. 즉시 작업 중단
2. 누락된 문서 로드 완료
3. 핵심 제약사항 재확인
4. Next.js 특화 사항 재점검
5. 작업 재시작

### 문서 읽기 거부 시
1. 사용자에게 프로토콜 중요성 설명
2. 최소한 CLAUDE.md와 coding_style.md는 필수 로드
3. Next.js 환경 특성상 잘못된 패턴 사용 위험성 알림
4. 품질 저하 위험성 알림

### Next.js 패턴 위반 시
1. Server/Client Components 혼동 확인
2. App Router 파일 규칙 재점검
3. 상태 관리 도구 사용법 재확인
4. 데이터 fetch 패턴 검증

## 📊 세션 중 리마인더

### 30분마다 체크
- [ ] 현재 작업이 로드된 문서 규칙을 따르고 있는가?
- [ ] Server/Client Components 구분이 적절한가?
- [ ] Next.js App Router 패턴을 올바르게 사용하고 있는가?
- [ ] 새로운 작업 유형으로 전환되었는가?
- [ ] 추가 문서 로드가 필요한가?

### 새 작업 시작 시
- [ ] 작업 유형 재분류
- [ ] Server vs Client Components 전략 수립
- [ ] 필요한 추가 문서 로드
- [ ] TodoWrite로 작업 계획 수립
- [ ] Next.js 특화 고려사항 확인

## 🔍 Next.js 환경 확인사항

### 개발 환경
```bash
✅ DEVELOPMENT CHECK
- [ ] Node.js 버전 확인 (18.17+)
- [ ] npm run dev 정상 동작 확인
- [ ] 포트 3000 사용 확인
- [ ] TypeScript 설정 확인
```

### 프로젝트 구조
```bash
✅ PROJECT STRUCTURE
- [ ] app/ 디렉토리 존재 (App Router)
- [ ] src/ 디렉토리 구조 확인
- [ ] next.config.js 설정 확인
- [ ] package.json dependencies 확인
```

### 성능 고려사항
```bash
✅ PERFORMANCE
- [ ] 번들 사이즈 최적화 고려
- [ ] 이미지 최적화 (next/image)
- [ ] 코드 분할 전략
- [ ] SEO 메타데이터 고려
```

## 🔄 프로토콜 개선

이 프로토콜은 Next.js 프로젝트 발전에 따라 지속적으로 개선됩니다:

- 새로운 Next.js 기능 도입 시 → 체크리스트 업데이트
- App Router 패턴 변경 시 → 가이드 수정
- 성능 최적화 방안 발견 시 → 체크사항 추가
- 문제 발생 시 → 대응 방안 보완

## 🚀 빠른 시작 템플릿

### 세션 시작 시 사용할 체크리스트
```bash
□ 1. CLAUDE.md 읽기
□ 2. coding_style.md 읽기
□ 3. frontend_rules.md 읽기
□ 4. patterns.md 읽기
□ 5. 작업 유형 분류
□ 6. 해당 유형별 추가 문서 읽기
□ 7. Next.js 환경 확인
□ 8. Server/Client Components 전략 수립
□ 9. 사용자 승인 요청 (필요시)
□ 10. 작업 시작
```

---

**💡 팁**: 이 문서를 세션 시작 시 북마크하여 빠르게 체크리스트를 확인하세요. Next.js 환경의 특성을 항상 염두에 두고 작업하세요.

---

*최종 업데이트: 2025년 1월*
*버전: 2.0.0 (Next.js 15 환경)*
