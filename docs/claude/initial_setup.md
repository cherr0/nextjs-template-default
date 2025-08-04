# 초기 설정 & 환경 구성

## 🎯 개요

개발 환경 및 프로젝트 초기화를 위한 완전한 설정 가이드입니다.

## 📋 사전 요구사항

### 시스템 요구사항

- **Node.js**: 버전 18.0.0 이상
- **패키지 매니저**: Yarn (권장) 또는 npm
- **Git**: 최신 버전
- **코드 에디터**: VS Code (권장)

### 개발 도구

- **브라우저**: Chrome/Firefox with DevTools
- **터미널**: 통합 터미널 또는 외부 터미널
- **Git 클라이언트**: 명령줄 또는 GUI 클라이언트

## 🚀 빠른 시작

### 1. 저장소 설정

```bash
# 저장소 복제
git clone <repository-url>
cd nextjs-template-default

# 의존성 설치
yarn install

# 개발 서버 시작
yarn dev
```

### 2. 환경 설정

```bash
# 환경 템플릿 복사
cp .env.example .env.local

# 환경 변수 편집
```

```bash
# 프로덕션에 필요한 변수들
NEXT_PUBLIC_API_URL=https://api.example.com
NEXTAUTH_URL=https://app.example.com
NEXTAUTH_SECRET=your-secret-key

# 선택사항
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### 3. 설치 확인

```bash
# 타입 체킅 실행
yarn type-check

# 린팅 실행
yarn lint

# 테스트 실행 (사용 가능한 경우)
yarn test

# 프로젝트 빌드
yarn build
```

## 🔧 상세 설정

### Node.js 설치

```bash
# nvm 사용 (권장)
nvm install 18
nvm use 18

# 설치 확인
node --version  # 18.x.x 이어야 함
npm --version   # 9.x.x 이상이어야 함
```

### Yarn 설치

```bash
# Yarn 전역 설치
npm install -g yarn

# 설치 확인
yarn --version  # 1.22.x 이상이어야 함
```

### VS Code 설정

권장 확장 프로그램 설치:

- ESLint
- Prettier
- TypeScript
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

## 📁 프로젝트 구조 개요

```
nextjs-template-default/
├── app/                    # Next.js App Directory
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 홈페이지
│   └── providers.tsx     # 클라이언트 프로바이더
├── src/
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── stores/          # Zustand 스토어
│   ├── styles/          # 전역 스타일 & SCSS
│   ├── types/           # TypeScript 정의
│   └── utils/           # 유틸리티 함수
├── .vscode/             # VS Code 설정
├── .husky/              # Git 훅
└── public/              # 정적 자산
```

## ⚙️ 설정 파일들

### 설정 파일 정보

주요 설정 파일들이 프로젝트에 미리 구성되어 있습니다:

- **tsconfig.json**: TypeScript 컴파일러 설정
- **.eslintrc.js**: 코드 품질 및 스타일 규칙
- **.prettierrc**: 코드 포맷팅 규칙
- **next.config.js**: Next.js 설정

자세한 코딩 스타일과 설정 정보는 **[코딩 스타일 가이드](./coding_style.md)**를 참조하세요.

## 🎨 스타일링 설정

프로젝트는 CSS Modules와 SCSS를 기본 스타일링 방식으로 사용합니다.

스타일링 패턴과 CSS 변수 사용법은 **[코딩 스타일 가이드](./coding_style.md#-스타일링-가이드라인)**를 참조하세요.

## 🗄️ 상태 관리

프로젝트는 Zustand를 전역 상태 관리 라이브러리로 사용합니다.

상태 관리 패턴과 사용법은 **[코딩 스타일 가이드](./coding_style.md#-상태-관리)**를 참조하세요.

## 📡 데이터 페칭

프로젝트는 TanStack Query (React Query v5)를 데이터 페칭 라이브러리로 사용합니다.

데이터 페칭 패턴과 커스텀 훅 사용법은 **[코딩 스타일 가이드](./coding_style.md#-데이터-페칭)**를 참조하세요.

## 🔐 환경 변수

### 필수 변수들

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# 선택사항
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### 환경 파일들

- `.env` - 기본값
- `.env.local` - 로컬 개발 (gitignore됨)
- `.env.development` - 개발 환경
- `.env.production` - 프로덕션 환경

## 🧪 테스트 설정

프로젝트는 Jest와 React Testing Library를 사용한 테스트 환경이 구성되어 있습니다.

테스트 전략과 작성 방법은 **[테스트 가이드](./testing_guide.md)**를 참조하세요.

## 🚀 개발 명령어

```bash
# 개발
yarn dev              # 개발 서버 시작
yarn build            # 프로덕션용 빌드
yarn start            # 프로덕션 서버 시작

# 코드 품질
yarn lint             # ESLint 실행
yarn lint:fix         # ESLint 문제 수정
yarn type-check       # TypeScript 확인
yarn format           # Prettier로 코드 포맷팅

# 테스트
yarn test             # 테스트 실행
yarn test:watch       # 워치 모드로 테스트 실행
yarn test:coverage    # 커버리지와 함께 테스트 실행

# 스토리북
yarn sb               # 스토리북 시작
yarn build:sb         # 스토리북 빌드
```

### 도움 받기

- [Next.js 문서](https://nextjs.org/docs) 확인
- 오류 메시지 주의 깊게 검토
- 클라이언트 사이드 문제는 브라우저 콘솔 확인
- 디버깅에 React DevTools 사용

## 📚 다음 단계

초기 설정 완료 후 다음 가이드를 참조하세요:

- **[개발 워크플로우](./development_workflow.md)**: 일일 개발 작업 흐름
- **[코딩 스타일](./coding_style.md)**: 코딩 표준과 아키텍처 패턴
- **[테스트 가이드](./testing_guide.md)**: 테스트 작성 방법

---

_모든 가이드라인은 프로젝트 발전에 따라 지속적으로 업데이트됩니다._
