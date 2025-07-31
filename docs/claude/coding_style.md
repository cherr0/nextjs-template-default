# 코딩 스타일 & 아키텍처 가이드라인

## 🎯 개요

이 문서는 Next.js 프로젝트의 코딩 표준, 아키텍처 패턴, 모범 사례를 설명합니다.

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── layout/         # 레이아웃 전용 컴포넌트
│   └── ui/             # 범용 UI 컴포넌트
├── stores/             # Zustand 상태 스토어
├── styles/             # 전역 스타일과 SCSS 변수
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수

app/                    # Next.js App Directory
├── layout.tsx          # 루트 레이아웃
├── page.tsx           # 홈페이지
└── providers.tsx      # 클라이언트 사이드 프로바이더
```

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

## 🎨 스타일링 가이드라인

### CSS Modules와 SCSS

```scss
// component.module.scss
.container {
  display: flex;

  &.primary {
    background-color: blue;
  }

  &.secondary {
    background-color: gray;
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

## 🔄 상태 관리

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

### React Query 패턴

```typescript
// API 데이터용 커스텀 훅
const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000 // 5분
  })
}

// 컴포넌트에서 사용
const UserProfile = () => {
  const { data: user, isLoading, error } = useUser()

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error.message}</div>

  return <div>{user?.name}</div>
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

## 📦 Import 정리

### Import 순서 (ESLint 설정됨)

```typescript
// 1. 외부 라이브러리
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

// 2. 내부 컴포넌트/유틸리티
import Button from '~/components/ui/Button'
import { useThemeStore } from '~/stores/common'

// 3. 상대 경로 import
import styles from './component.module.scss'
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
- **CSS 클래스**: 모듈에서 camelCase (`primaryButton`, `navigationContainer`)

## 🎯 성능 고려사항

- 기본적으로 서버 컴포넌트 사용
- 필요할 때만 'use client' 추가
- 적절한 로딩 상태 구현
- 비용이 큰 컴포넌트에 React.memo 사용
- 긴 목록에 가상화 고려
