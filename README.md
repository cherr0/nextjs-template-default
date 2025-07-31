# Next.js Template Default

## 🚀 빠른 시작

### 1. 프로젝트 생성
```bash
# 이 템플릿으로 새 레포지토리 생성
# GitHub에서 'Use this template' -> 'Create a new repository' 클릭

# 프로젝트 클론 후 의존성 설치
yarn install
```

### 2. 개발 서버 실행
```bash
yarn dev          # 개발 서버 (http://localhost:3000)
yarn sb           # Storybook (http://localhost:6006)
```

### 3. 개발 가이드라인 확인
📖 **[CLAUDE.md](./CLAUDE.md)** - 프로젝트 코딩 표준, 아키텍처 패턴, 개발 워크플로우

## 🛠️ 기술 스택

### 핵심 기술
- **Next.js 15** with App Directory (서버 컴포넌트)
- **TypeScript** - 타입 안정성
- **@tanstack/react-query v5** - 데이터 페칭
- **Zustand** - 상태 관리
- **CSS Modules with SCSS** - 스타일링

### 개발 도구
- **ESLint & Prettier** - 코드 품질 및 포맷팅
- **Husky & lint-staged** - Git 훅 및 커밋 전 검사
- **Storybook** - 컴포넌트 개발 및 문서화

### 유틸리티
- **axios** - HTTP 클라이언트
- **dayjs** - 날짜 처리
- **lodash-es** - 유틸리티 함수

## 📋 필수 설정

### 환경 요구사항
- Node.js >= 18.0.0
- npm >= 7.0.0

### GitHub 패키지 설정
프로젝트에서 GitHub 패키지 사용 시 `.npmrc` 파일 생성 필요:

```bash
//npm.pkg.github.com/:_authToken=[[package read token]]
@cherr0:registry=https://npm.pkg.github.com/
```

## 🔧 주요 스크립트

```bash
yarn dev          # 개발 서버 실행
yarn build        # 프로덕션 빌드
yarn start        # 프로덕션 서버 실행
yarn lint         # ESLint 검사
yarn sb           # Storybook 개발 서버
yarn build:sb     # Storybook 빌드
```

## 📖 개발 가이드

### 시작하기 전에
1. **[초기 설정](./docs/claude/initial_setup.md)** - 개발 환경 구성
2. **[개발 워크플로우](./docs/claude/development_workflow.md)** - 일일 작업 규칙

### 개발 중
1. **[코딩 스타일](./docs/claude/coding_style.md)** - 아키텍처 패턴 및 모범 사례
2. **[프론트엔드 가이드라인](./docs/claude/frontend_rules.md)** - 디자인 규칙 및 패턴
3. **[테스트 가이드](./docs/claude/testing_guide.md)** - 테스트 전략

### 코드 제출 전
1. **[코드 리뷰](./docs/claude/code_review.md)** - 체크리스트 및 기준

## 🎯 핵심 개발 원칙

1. **가독성** - 명확한 네이밍, 복잡성 추상화
2. **예측 가능성** - 일관된 패턴, 단일 책임
3. **응집성** - 기능 기반 구성, 관련 코드 근접성
4. **낮은 결합도** - 최소 의존성, 컴포지션 선호


