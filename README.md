# Next.js 템플릿

현대적인 웹 개발을 위한 Next.js 템플릿입니다. TanStack Query를 활용한 SEO 최적화된 데이터 관리 방식을 구현했습니다.

## 🚀 주요 기능

### SEO 최적화

- **서버 컴포넌트에서 초기 데이터 렌더링**: 검색 엔진이 콘텐츠를 크롤링할 수 있도록 서버에서 미리 렌더링
- **동적 메타데이터**: 각 페이지에 맞는 메타데이터 자동 생성
- **하이브리드 렌더링**: SEO를 위한 서버 렌더링 + UX를 위한 클라이언트 렌더링

### TanStack Query 통합

- **서버에서 Prefetch**: 초기 데이터를 서버에서 미리 가져와서 클라이언트로 전달
- **HydrationBoundary**: 서버의 캐시된 데이터를 클라이언트에서 재사용
- **효율적인 캐싱**: 클라이언트에서 데이터 캐싱과 상태 관리

### 개발자 경험

- **TypeScript**: 완전한 타입 안전성
- **SCSS 모듈**: 스타일링 시스템
- **ESLint + Prettier**: 코드 품질 관리
- **Storybook**: 컴포넌트 문서화

## 🔧 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Data Fetching**: TanStack Query v5
- **State Management**: Zustand
- **UI Components**: Custom Components
- **Development**: ESLint, Prettier, Storybook

## 🚀 빠른 시작

### 📋 사전 요구사항

- **Node.js**: 버전 18.0.0 이상
- **패키지 매니저**: yarn (기본)
- **Git**: 최신 버전
- **코드 에디터**: VS Code (권장)

### ⚡ 설치 및 실행

```bash
# 저장소 복제
git clone <repository-url>
cd nextjs-template-default

# 의존성 설치
yarn install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 시작 (포트 3000)
yarn dev
```

### 🔧 환경 변수 설정

```bash
# .env.local 파일 생성 후 설정
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# 선택사항
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### ✅ 설치 확인

```bash
# 타입 체킹
yarn type-check

# 린팅
yarn lint

# 빌드 테스트
yarn build
```

## 📁 프로젝트 구조

```
nextjs-template-default/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 홈페이지
│   └── providers.tsx     # 클라이언트 프로바이더
├── src/
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── stores/          # Zustand 스토어
│   ├── styles/          # 전역 스타일 & SCSS
│   ├── types/           # TypeScript 정의
│   ├── utils/           # 유틸리티 함수
│   ├── constants/       # 전역 상수/쿼리 키/런타임
│   │   ├── query-keys.ts  # TanStack Query 키 네임스페이스
│   │   ├── runtime.ts     # 공개 런타임 상수(NEXT_PUBLIC_*) 접근자
│   │   ├── values.ts      # 공통 상수 값(페이지 사이즈 등)
│   │   └── index.ts       # 배럴 익스포트
│   └── services/        # API 서비스 (도메인별)
│       ├── <domain>.service.ts
│       └── mocks/       # 목업 데이터 (*.mock.ts)
├── docs/                # 문서 루트
│   ├── README.md       # 문서 구조/운영 가이드
│   ├── conventions/    # 규칙·관례·원칙(정책 정본)
│   ├── guides/         # 실무 흐름/How-To
│   └── agents/         # 에이전트 전용 문서
└── public/             # 정적 자산
```

## 📚 개발 가이드라인

문서 구조와 운영 정책은 `docs/README.md`에서 확인할 수 있습니다.
- 문서 개요: [docs/README.md](./docs/README.md)

이 프로젝트는 [CLAUDE.md](./CLAUDE.md) 문서를 통해 일관된 개발 가이드라인을 제공합니다.

### 핵심 문서

- **[코딩 스타일](./docs/conventions/coding-style.md)** - 코딩 스타일, 아키텍처 패턴, 모범 사례
- **[프론트엔드 규칙](./docs/conventions/frontend-rules.md)** - 코딩 디자인 핵심 규칙, 작업 권장 패턴
- **[개발 워크플로우](./docs/agents/development-workflow.md)** - 개발 워크플로우와 일일 작업 규칙
- **[테스트 가이드](./docs/guides/testing-guide.md)** - 테스트 전략과 구현 방법
- **[코드 리뷰](./docs/conventions/code-review.md)** - 코드 리뷰 기준과 체크리스트

### AI 도구 가이드

- **[Claude](./CLAUDE.md)** - Claude AI를 위한 프로젝트 가이드
- **[Agents](./AGENTS.md)** - Agent AI를 위한 워크플로우
- **[Gemini](./GEMINI.md)** - Gemini AI를 위한 개발 지침

## 📝 Plan 관리

- 위치: `docs/plans/`에 작업 단위의 계획서를 보관합니다.
- 템플릿: `docs/templates/plan-template.md`를 복사하여 사용하세요.
- 파일명 규칙: `YYYY-MM-DD-short-title.md` (예: `2025-09-18-docs-consolidation.md`).
- 필수 적용 범위: code_edit, file_create, implementation, server_ops 작업.
- PR 규칙: PR 본문 상단에 해당 Plan 파일의 링크를 포함합니다.
- 권장 필드: 목적/범위, 산출물, 변경 파일, 리스크/롤백, 검증 방법, 체크리스트.

## 📄 PRD 문서(docs/project/)

- 위치: `docs/project/` 폴더에 PRD(제품 요구사항 문서)를 보관합니다.
- 구분: `docs/`는 모든 문서의 루트이며, PRD 정본은 `docs/project/`에 위치합니다.
- 제안 구조:
  - PRD 운영 규칙은 `docs/README.md` 내 "PRD 문서 개요" 섹션을 참조하세요
  - `docs/project/prd/` — 개별 PRD 문서 (예: `2025-10-01-feature-x-prd.md`)
- 권장 Frontmatter:
  - `title, owner, status(draft|review|approved), version, updated, scope, tags, related`
- 연계: 관련 이슈/PR/문서(`docs/**`)에 PRD 링크를 첨부해 추적성을 유지합니다.

## 🛠️ 개발 명령어

```bash
# 개발
yarn dev              # 개발 서버 시작 (포트 3000)
yarn build            # 프로덕션용 빌드
yarn start            # 프로덕션 서버 시작

# 코드 품질
yarn lint             # ESLint 실행
yarn type-check       # TypeScript 확인

# 스토리북
yarn sb               # 스토리북 시작
yarn build:sb         # 스토리북 빌드
```

### 🛠️ 개발 워크플로우

1. **개발 시작 전**: 핵심 문서 읽기 (coding_style.md, frontend_rules.md)
2. **개발 중**: 패턴과 가이드라인 따르기
3. **제출 전**: code_review.md 체크리스트 사용
4. **배포 시**: 빌드 및 테스트 통과 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.
