# 코딩 스타일 & 아키텍처 가이드라인

## 🎯 개요

이 문서는 Next.js 프로젝트의 코딩 표준, 아키텍처 패턴, 모범 사례를 설명합니다.

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/         # 공통 유틸리티 컴포넌트
│   │   └── async_boundary/  # 비동기 경계 처리
│   ├── layout/         # 레이아웃 전용 컴포넌트
│   │   ├── base_layout/     # 기본 레이아웃
│   │   ├── main_layout/     # 메인 레이아웃
│   │   ├── header/          # 헤더 컴포넌트
│   │   └── footer/          # 푸터 컴포넌트
│   ├── ui/             # 범용 UI 컴포넌트
│   │   ├── Button/     # 컴포넌트별 폴더 구조
│   │   │   ├── index.ts           # export 전용
│   │   │   ├── Button.tsx         # 메인 컴포넌트
│   │   │   └── Button.module.scss # 컴포넌트 스타일
│   │   ├── Card/
│   │   └── Badge/
│   └── [feature]/      # 특정 기능별 컴포넌트 (예: posts/)
├── constants/          # 상수 정의
│   ├── config.ts      # 설정 상수
│   ├── message.ts     # 메시지 상수
│   ├── query.ts       # 쿼리 키 상수
│   └── style.ts       # 스타일 상수
├── hooks/              # 커스텀 훅
│   └── queries/       # 데이터 페칭 관련 훅
├── lib/                # 라이브러리 설정 및 API
│   ├── api.ts         # API 클라이언트
│   ├── query.tsx      # React Query 설정
│   └── api/           # API 엔드포인트별 함수
├── stores/             # Zustand 상태 스토어
├── styles/             # 전역 스타일과 SCSS 변수
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수

app/                    # Next.js App Directory
├── (home)/             # 홈 페이지 그룹
│   ├── _components/    # 홈 페이지 전용 컴포넌트
│   └── page.tsx
├── posts/              # 게시물 기능
│   ├── [id]/          # 동적 라우트
│   ├── _components/   # 게시물 페이지 전용 컴포넌트
│   └── page.tsx
├── layout.tsx          # 루트 레이아웃
└── providers.tsx      # 클라이언트 사이드 프로바이더
```

### 컴포넌트 폴더 구조 원칙

1. **개별 컴포넌트는 자체 폴더로 분리**: 관련 파일들의 응집성 확보
2. **index.ts로 export 정리**: 깔끔한 import 경로 제공
3. **PascalCase 폴더명**: 컴포넌트명과 일치하는 폴더명 사용
4. **관련 파일 집중화**: 컴포넌트, 스타일, 타입이 한 곳에 위치
5. **기능별 컴포넌트 분리**: 특정 페이지/기능 전용 컴포넌트는 해당 위치에 \_components 폴더로 구성

### 새로운 아키텍처 패턴

#### 페이지별 컴포넌트 구성

```
app/
├── (home)/
│   ├── _components/          # 홈 전용 컴포넌트
│   │   └── FeatureCard/     # 홈에서만 사용하는 컴포넌트
│   └── page.tsx
└── posts/
    ├── _components/          # 게시물 전용 컴포넌트
    │   └── PostList.tsx     # posts 페이지에서만 사용
    └── page.tsx
```

#### 계층별 컴포넌트 분류

- **src/components/ui/**: 전역에서 재사용 가능한 기본 UI 컴포넌트
- **src/components/layout/**: 레이아웃 관련 컴포넌트
- **src/components/common/**: 여러 페이지에서 공통으로 사용하는 비즈니스 로직 컴포넌트
- **app/[route]/\_components/**: 특정 페이지에서만 사용하는 컴포넌트

## 🧩 컴포넌트 패턴

### 함수 컴포넌트 정의

```typescript
// ✅ 화살표 함수 사용
const HomePage = () => {
  return <div>내용</div>
}

export default HomePage
```

### Props 인터페이스

```typescript
// ✅ 컴포넌트 위에 props 인터페이스 정의
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  children: ReactNode
}

const Button = ({ variant = 'primary', disabled, children }: ButtonProps) => {
  // 컴포넌트 구현
}
```

### 컴포넌트 생성 과정

1. **컴포넌트 디렉토리 생성**

   ```
   src/components/ui/Button/
   ├── index.tsx
   ├── Button.module.scss
   └── Button.stories.tsx (스토리북 사용시)
   ```

2. **컴포넌트 템플릿**

   ```typescript
   // src/components/ui/Button/index.tsx
   import { ReactNode } from 'react'
   import styles from './Button.module.scss'

   interface ButtonProps {
     variant?: 'primary' | 'secondary'
     size?: 'sm' | 'md' | 'lg'
     disabled?: boolean
     onClick?: () => void
     children: ReactNode
   }

   const Button = ({
     variant = 'primary',
     size = 'md',
     disabled = false,
     onClick,
     children
   }: ButtonProps) => {
     return (
       <button
         className={`${styles.button} ${styles[variant]} ${styles[size]}`}
         disabled={disabled}
         onClick={onClick}
       >
         {children}
       </button>
     )
   }

   export default Button
   ```

3. **배럴 익스포트**
   ```typescript
   // src/components/ui/index.ts
   export { default as Button } from './Button'
   export { default as Input } from './Input'
   // ... 다른 익스포트
   ```

### 컴포넌트 모범 사례

- 컴포넌트에 화살표 함수 사용
- 컴포넌트 위에 props 인터페이스 정의
- 선택적 props에 기본값 제공
- 스타일링에 CSS Modules 사용
- 컴포넌트를 집중되고 단일 목적으로 유지

## 🎨 스타일링 가이드라인

### CSS Modules와 SCSS (기본 방식)

**이 프로젝트는 CSS Modules + SCSS를 기본 스타일링 방식으로 사용합니다.**

- 기본 단위는 rem으로 사용.
- 반응형 디자인은 1281 이상 (PC), 1280 이하 (모바일) 로 나뉘어짐

```scss
// component.module.scss
.container {
  display: flex;
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);

  &.primary {
    background-color: var(--color-primary);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }

  &.secondary {
    background-color: var(--color-secondary);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }
}
```

```typescript
// 컴포넌트 사용
import styles from './component.module.scss'

const Component = ({ variant }: { variant: 'primary' | 'secondary' }) => {
  return <div className={`${styles.container} ${styles[variant]}`}>내용</div>
}
```

### CSS Modules 패턴

```scss
// Component.module.scss
@import '~/styles/variables';

.container {
  display: flex;
  padding: 1rem;

  &.primary {
    background-color: $primary-color;
  }

  &.secondary {
    background-color: $secondary-color;
  }
}

.content {
  flex: 1;

  @include breakpoint_down($mobile) {
    padding: 2rem;
  }
}
```

### CSS 변수 사용

모든 색상과 공통 값은 `global.scss`에 정의된 CSS 변수를 사용하세요:

```scss
// ✅ 권장: CSS 변수 사용
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
}

// ❌ 지양: 하드코딩된 값
.button {
  background-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

## 🔄 상태 관리

### Zustand 사용 시기

- 전역 애플리케이션 상태
- 사용자 기본설정
- 인증 상태

### React State 사용 시기

- 컴포넌트별 상태
- 폼 입력
- 로컬 UI 상태
- 임시 상태

### Context API 사용 시기

- 컴포넌트 간 공유되는 UI 상태

### 스토어 구성

```typescript
// 기능별 스토어 구성
src/stores/
├── auth.ts          # 인증 상태
├── user.ts          # 사용자 프로필 데이터
└── common.ts        # 전역 기본설정 (테마 등)
```

### Zustand 스토어 패턴

```typescript
// stores/common.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage'
    }
  )
)
```

## 📡 데이터 페칭

### API 훅 패턴

```typescript
// src/hooks/api/useUsers.ts
import { useQuery } from '@tanstack/react-query'

interface User {
  id: string
  name: string
  email: string
}

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('사용자 조회 실패')
      return response.json()
    },
    staleTime: 5 * 60 * 1000 // 5분
  })
}

// 컴포넌트에서 사용
const UsersList = () => {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error.message}</div>
  if (!users) return <div>사용자를 찾을 수 없습니다</div>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### React Query 패턴

커스텀 훅은 `src/hooks/queries/` 에서 관리합니다.
API 관련 함수는 `src/lib/api/` 폴더에서 관리합니다.
TanStack Query를 반환하는 함수는 접미사로 **Query**가 붙습니다.

**공통 설정은 QueryClient에서 관리:**

- 개별 쿼리에서 특별한 요구사항이 있을 때만 개별 설정 사용

```typescript
// src/lib/api/posts.ts - API 함수 정의
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts')
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

// src/hooks/usePosts.ts - 커스텀 훅
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '~/lib/api/posts'
import { QUERY_KEYS } from '~/constants/query'

export const usePostsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: fetchPosts
    // staleTime, gcTime 등은 QueryClient 기본 설정에서 관리
  })
}

// 컴포넌트에서 사용
const PostList = () => {
  const { data: posts, isLoading, error } = usePostsQuery()

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error.message}</div>

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### 오류 처리

```typescript
// 전역 오류 경계
const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('경계에서 잡힌 오류:', error, errorInfo)
        // 오류 추적 서비스에 로그
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
```

## 🏗️ 아키텍처 패턴

### 서버/클라이언트 컴포넌트 전략

```typescript
// ✅ 서버 컴포넌트 (기본값)
const ServerComponent = async () => {
  const data = await fetchDataOnServer()
  return <div>{data}</div>
}

// ✅ 클라이언트 컴포넌트 (필요시에만)
;('use client')

const ClientComponent = () => {
  const [state, setState] = useState('')
  return <input value={state} onChange={(e) => setState(e.target.value)} />
}
```

### 프로바이더 패턴

```typescript
// app/providers.tsx
'use client'

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = useRef(new QueryClient())

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  )
}
```

## 🎯 SEO 최적화 구현 방식

### 1. 서버 컴포넌트에서 초기 데이터 Prefetch

```typescript
// app/posts/page.tsx
async function getInitialData() {
  const initialData = await prefetchQuery(['posts', 1, 10], () =>
    fetchPostsServer(1, 10)
  )
  return initialData
}
```

### 2. HydrationBoundary로 클라이언트 전달

```typescript
const HydrationWrapper = createHydrationBoundary()

return (
  <HydrationWrapper>
    <PostList /> {/* 클라이언트 컴포넌트 */}
  </HydrationWrapper>
)
```

### 3. 클라이언트에서 TanStack Query 사용

```typescript
// src/hooks/usePosts.ts
export const usePosts = (page: number = 1, limit: number = 10) => {
  return useQuery<PostsResponse>({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts(page, limit),
    staleTime: 5 * 60 * 1000 // 5분
  })
}
```

## 📦 Import 정리

### Import 순서 (ESLint 설정됨)

```typescript
// 1. 외부 라이브러리
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

// 2. 내부 컴포넌트/유틸리티
import Button from '~/components/ui/Button'
import { useThemeStore } from '~/stores/common'
import { QUERY_KEYS } from '~/constants/query'
import { usePostsQuery } from '~/hooks/queries/usePosts'

// 3. 상대 경로 import
import styles from './component.module.scss'
```

## 📂 Constants & Hooks 구조

### Constants 관리

상수는 용도별로 파일을 분리하여 관리합니다:

```typescript
// src/constants/config.ts - 설정 관련 상수
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export const APP_NAME = 'Next.js Template'
export const ITEMS_PER_PAGE = 10

// src/constants/query.ts - React Query 키 상수
export const QUERY_KEYS = {
  POSTS: 'posts',
  POST_DETAIL: 'post-detail',
  USER: 'user'
} as const

// src/constants/message.ts - 메시지 상수
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
  UNAUTHORIZED: '인증이 필요합니다.'
} as const

// src/constants/style.ts - 스타일 관련 상수
export const BREAKPOINTS = {
  MOBILE: 1280,
  DESKTOP: 1281
} as const
```

### Hooks 구조

커스텀 훅은 기능별로 분리하여 관리합니다:

```
src/hooks/
├── queries/        # 데이터 페칭 관련 훅
│   └── usePosts.ts
└── useIsMounted.ts # 일반 유틸리티 훅
```

```typescript
// src/hooks/useIsMounted.ts - 공통 유틸리티 훅
import { useEffect, useState } from 'react'

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

// src/hooks/queries/usePosts.ts - 도메인별 데이터 훅
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '~/lib/api/posts'
import { QUERY_KEYS } from '~/constants/query'

export const usePostsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: fetchPosts
  })
}
```

## 🔧 TypeScript 모범 사례

### 타입 정의

```typescript
// ✅ 구체적인 타입 사용
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

// ✅ 제네릭 제약 사용
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
```

## ❌ CSS Module 안티패턴

### 피해야 할 패턴들

```scss
// ❌ 하드코딩된 값 사용
.button {
  background-color: #2563eb;
  padding: 8px 16px;
  border-radius: 6px;
}

// ✅ CSS 변수와 일관된 값 사용
.button {
  background-color: var(--color-primary);
  padding: 8rem 16rem;
  border-radius: 6rem;
}

// ❌ 과도한 중첩
.card {
  .header {
    .title {
      .icon {
        .svg {
          color: red;
        }
      }
    }
  }
}

// ✅ 적절한 중첩 레벨 (최대 3단계)
.card {
  .header {
    .title {
      color: var(--color-gray-900);
    }
  }

  .icon {
    color: var(--color-primary);
  }
}
```

## 🚫 피해야 할 안티패턴

### 컴포넌트 정의

```typescript
// ❌ 함수 선언문 사용 안 함
export default function HomePage() {
  return <div>내용</div>
}

// ❌ 익명 함수 사용 안 함
export default () => {
  return <div>내용</div>
}
```

### 상태 관리

```typescript
// ❌ 전역 상태에 컨텍스트 사용 안 함
const GlobalContext = createContext()

// ❌ Props 드릴링 안 함
<Parent>
  <Child userRole={userRole}>
    <GrandChild userRole={userRole} />
  </Child>
</Parent>
```

## 📝 네이밍 규칙

- **컴포넌트**: PascalCase (`UserProfile`, `NavigationBar`)
- **파일**: 일반 파일은 snake_case, 컴포넌트는 PascalCase
- **변수/함수**: camelCase (`userData`, `handleClick`)
- **상수**: SCREAMING_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)
- **CSS 클래스**: 모듈에서 snake_case (`primary_button`, `navigation_container`)
- **React Query 훅**: camelCase + Query 접미사 (`usePostsQuery`, `useUserQuery`)

## 🎯 성능 고려사항

- 기본적으로 서버 컴포넌트 사용
- 필요할 때만 'use client' 추가
- 적절한 로딩 상태 구현
- 비용이 큰 컴포넌트에 React.memo 사용
- 긴 목록에 가상화 고려

## 📐 CSS Module 모범 사례

### 컴포넌트별 스타일 구조

```scss
// Button.module.scss
.button {
  // 기본 스타일
  display: inline-flex;
  align-items: center;
  padding: 8rem 16rem;
  border: none;
  border-radius: 6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  // CSS 변수 사용
  background-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);

  &:hover {
    background-color: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Variant 스타일
  &.secondary {
    background-color: var(--color-secondary);

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }

  &.outline {
    background-color: transparent;
    border: 1rem solid var(--color-primary);
    color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  // Size 스타일
  &.small {
    padding: 4rem 12rem;
    font-size: 14rem;
  }

  &.large {
    padding: 12rem 24rem;
    font-size: 18rem;
  }
}
```

### Mixin 활용

```scss
// _mixins.scss에서 공통 패턴 정의
@mixin button_base {
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

@mixin hover_effect($base-color, $hover-color) {
  background-color: var(#{$base-color});

  &:hover {
    background-color: var(#{$hover-color});
  }
}

// 컴포넌트에서 사용
.button {
  @include button_base;
  @include hover_effect(--color-primary, --color-primary-hover);
}
```

### 반응형 디자인

```scss
.container {
  padding: 16rem;

  @include breakpoint_up($breakpoint-md) {
    padding: 32rem;
  }

  @include breakpoint_up($breakpoint-lg) {
    padding: 48rem;
    max-width: 1200rem;
    margin: 0 auto;
  }
}
```
