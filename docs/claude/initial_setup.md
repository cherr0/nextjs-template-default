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
# 특정 설정 값을 추가하세요
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

### TypeScript 설정
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint 설정
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' }
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ]
  }
}
```

### Prettier 설정
```json
// .prettierrc
{
  "semi": false,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🎨 스타일링 설정

### SCSS 설정
프로젝트는 CSS Modules와 SCSS를 사용합니다. 전역 스타일은 `src/styles/`에 있습니다:

```scss
// src/styles/_variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;

// 브레이크포인트
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

### 컴포넌트 스타일링
```scss
// component.module.scss
@import '~/styles/variables';

.container {
  padding: 1rem;
  
  @media (min-width: $breakpoint-md) {
    padding: 2rem;
  }
}
```

## 🗄️ 상태 관리

### Zustand 스토어 설정
```typescript
// src/stores/example.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExampleStore {
  count: number
  increment: () => void
  decrement: () => void
}

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 }))
    }),
    {
      name: 'example-storage'
    }
  )
)
```

## 📡 데이터 페칭

### React Query 설정
```typescript
// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

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

### Jest 설정
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.js 앱 경로 제공
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^~(.*)$': '<rootDir>/src$1'
  },
  testEnvironment: 'jest-environment-jsdom'
}

module.exports = createJestConfig(customJestConfig)
```

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

## 🛠️ 문제 해결

### 일반적인 문제들

#### Node 버전 불일치
```bash
# 현재 버전 확인
node --version

# 올바른 버전으로 전환
nvm use 18
```

#### 포트가 이미 사용 중
```bash
# 포트 3000에서 프로세스 종료
npx kill-port 3000

# 또는 다른 포트 사용
yarn dev -p 3001
```

#### 모듈 해결 문제
```bash
# Next.js 캐시 정리
rm -rf .next

# node_modules 정리
rm -rf node_modules
yarn install
```

### 도움 받기
- [Next.js 문서](https://nextjs.org/docs) 확인
- 오류 메시지 주의 깊게 검토
- 클라이언트 사이드 문제는 브라우저 콘솔 확인
- 디버깅에 React DevTools 사용

---

*설정 완료 후, 개발 워크플로우 가이드라인을 위해 개발-워크플로우.md로 진행하세요.*