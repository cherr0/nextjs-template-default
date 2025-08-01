# 코딩 스타일 & 아키텍처 가이드라인

## 🎯 개요

이 문서는 Next.js 프로젝트의 코딩 표준, 아키텍처 패턴, 모범 사례를 설명합니다.

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── layout/         # 레이아웃 전용 컴포넌트
│   └── ui/             # 범용 UI 컴포넌트
│       ├── Button/     # 컴포넌트별 폴더 구조
│       │   ├── index.ts           # export 전용
│       │   ├── Button.tsx         # 메인 컴포넌트
│       │   └── Button.module.scss # 컴포넌트 스타일
│       ├── Card/
│       │   ├── index.ts
│       │   ├── Card.tsx
│       │   └── Card.module.scss
│       └── Badge/
│           ├── index.ts
│           ├── Badge.tsx
│           └── Badge.module.scss
├── stores/             # Zustand 상태 스토어
├── styles/             # 전역 스타일과 SCSS 변수
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수

app/                    # Next.js App Directory
├── layout.tsx          # 루트 레이아웃
├── page.tsx           # 홈페이지
└── providers.tsx      # 클라이언트 사이드 프로바이더
```

### 컴포넌트 폴더 구조 원칙

1. **개별 컴포넌트는 자체 폴더로 분리**: 관련 파일들의 응집성 확보
2. **index.ts로 export 정리**: 깔끔한 import 경로 제공
3. **PascalCase 폴더명**: 컴포넌트명과 일치하는 폴더명 사용
4. **관련 파일 집중화**: 컴포넌트, 스타일, 타입이 한 곳에 위치

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

Query 커스텀 훅은 `src/queries` 에서 관리합니다.
접미사로 \_Query라는 명칭을 가지게 됩니다.

```typescript
// API 데이터용 커스텀 훅
const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000 // 5분
  })
}

// 컴포넌트에서 사용
const UserProfile = () => {
  const { data: user, isLoading, error } = useUserQuery()

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
