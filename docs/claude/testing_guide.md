# 테스트 가이드라인

## 🎯 개요
코드 품질과 안정성 유지를 위한 테스트 전략, 모범 사례, 구현 가이드라인입니다.

## 🧪 테스트 전략

### 테스트 피라미드
```
        /\
       /  \
      / UI \     <- 적은 수의 고수준 테스트
     /______\
    /        \
   / 통합 테스트 \ <- 일부 통합 테스트
  /______________\
 /                \
/     단위 테스트    \ <- 많은 수의 빠른 단위 테스트
/__________________\
```

### 테스트 유형
- **단위 테스트**: 개별 함수와 컴포넌트
- **통합 테스트**: 컴포넌트 상호작용과 API 호출
- **E2E 테스트**: 전체 사용자 워크플로우 (향후 구현)

## 🛠️ 테스트 설정

### 의존성
```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}
```

### Jest 설정
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^~(.*)$': '<rootDir>/src$1'
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}

module.exports = createJestConfig(customJestConfig)
```

## 🧩 컴포넌트 테스트

### 기본 컴포넌트 테스트
```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('올바른 텍스트로 렌더링된다', () => {
    render(<Button>클릭하세요</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('클릭하세요')
  })

  it('올바른 variant 클래스를 적용한다', () => {
    render(<Button variant="secondary">테스트</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('secondary')
  })

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>클릭하세요</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled prop이 true일 때 비활성화된다', () => {
    render(<Button disabled>비활성화</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### 폼 컴포넌트 테스트
```typescript
// LoginForm.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('올바른 데이터로 폼을 제출한다', async () => {
    const user = userEvent.setup()
    const handleSubmit = jest.fn()
    
    render(<LoginForm onSubmit={handleSubmit} />)
    
    await user.type(screen.getByLabelText(/이메일/i), 'test@example.com')
    await user.type(screen.getByLabelText(/비밀번호/i), 'password123')
    await user.click(screen.getByRole('button', { name: /로그인/i }))
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  it('잘못된 입력에 대해 유효성 검사 오류를 표시한다', async () => {
    const user = userEvent.setup()
    
    render(<LoginForm onSubmit={jest.fn()} />)
    
    await user.click(screen.getByRole('button', { name: /로그인/i }))
    
    expect(screen.getByText(/이메일이 필요합니다/i)).toBeInTheDocument()
    expect(screen.getByText(/비밀번호가 필요합니다/i)).toBeInTheDocument()
  })
})
```

## 🔌 훅 테스트

### 커스텀 훅 테스트
```typescript
// useCounter.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('기본값으로 초기화된다', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('제공된 값으로 초기화된다', () => {
    const { result } = renderHook(() => useCounter(5))
    expect(result.current.count).toBe(5)
  })

  it('카운트를 증가시킨다', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

### API 훅 테스트
```typescript
// useUsers.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUsers } from './useUsers'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// fetch 모킹
global.fetch = jest.fn()

describe('useUsers', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  it('사용자를 성공적으로 가져온다', async () => {
    const mockUsers = [{ id: '1', name: 'John' }]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    })

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockUsers)
  })
})
```

## 🔄 스토어 테스트

### Zustand 스토어 테스트
```typescript
// themeStore.test.ts
import { act, renderHook } from '@testing-library/react'
import { useThemeStore } from './themeStore'

describe('useThemeStore', () => {
  beforeEach(() => {
    // 스토어 상태 초기화
    useThemeStore.setState({ theme: 'light' })
  })

  it('라이트 테마로 초기화된다', () => {
    const { result } = renderHook(() => useThemeStore())
    expect(result.current.theme).toBe('light')
  })

  it('테마를 토글한다', () => {
    const { result } = renderHook(() => useThemeStore())
    
    act(() => {
      result.current.setTheme('dark')
    })
    
    expect(result.current.theme).toBe('dark')
  })
})
```

## 🎭 모킹 전략

### API 모킹
```typescript
// __mocks__/api.ts
export const mockApi = {
  users: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}
```

### 컴포넌트 모킹
```typescript
// 무거운 컴포넌트 모킹
jest.mock('./HeavyComponent', () => {
  return function MockedHeavyComponent({ title }: { title: string }) {
    return <div data-testid="heavy-component">{title}</div>
  }
})
```

## 🚀 통합 테스트

### 페이지 컴포넌트 테스트
```typescript
// HomePage.test.tsx
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './page'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
})

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient()
  
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('HomePage', () => {
  it('환영 메시지를 렌더링한다', () => {
    render(<HomePage />, { wrapper: AllProviders })
    expect(screen.getByText(/환영/i)).toBeInTheDocument()
  })

  it('로드된 사용자 데이터를 표시한다', async () => {
    // API 응답 모킹
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'John Doe' })
    })

    render(<HomePage />, { wrapper: AllProviders })
    
    expect(await screen.findByText('John Doe')).toBeInTheDocument()
  })
})
```

## 📊 테스트 커버리지

### 커버리지 명령어
```bash
# 커버리지와 함께 테스트 실행
yarn test --coverage

# 커버리지 리포트 생성
yarn test --coverage --watchAll=false

# 브라우저에서 커버리지 확인
open coverage/lcov-report/index.html
```

## 🐛 테스트 모범 사례

### 테스트 구성
```typescript
describe('ComponentName', () => {
  // 설정과 정리
  beforeEach(() => {
    // 상태 초기화, 모킹 정리
  })

  // 연관된 테스트 그룹화
  describe('렌더링', () => {
    it('기본 props로 올바르게 렌더링된다', () => {})
    it('커스텀 props로 올바르게 렌더링된다', () => {})
  })

  describe('사용자 상호작용', () => {
    it('클릭 이벤트를 처리한다', () => {})
    it('폼 제출을 처리한다', () => {})
  })

  describe('오류 상태', () => {
    it('API 실패 시 오류 메시지를 표시한다', () => {})
  })
})
```

### 테스트 네이밍
- 서술적인 테스트 이름 사용
- "Y일 때 X를 해야 한다" 패턴 따르기
- 관련 테스트를 `describe` 블록으로 그룹화
- 개별 테스트 케이스에 `it` 사용

### 좋은 어서션
```typescript
// ✅ 좋은 어서션
expect(screen.getByRole('button')).toBeInTheDocument()
expect(screen.getByText('로딩 중...')).toBeVisible()
expect(mockFunction).toHaveBeenCalledWith(expectedArg)

// ❌ 피해야 할 것들
expect(container.firstChild).toBeTruthy()
expect(element.className).toContain('active')
```

## 🔧 테스트 유틸리티

### 커스텀 렌더 함수
```typescript
// test-utils.tsx
import { render as rtlRender } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

export const render = (ui: React.ReactElement, options = {}) => {
  const testQueryClient = createTestQueryClient()
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
```

### 테스트 데이터 팩토리
```typescript
// test-factories.ts
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides
})

export const createMockUsers = (count = 3) =>
  Array.from({ length: count }, (_, i) =>
    createMockUser({ id: String(i + 1), name: `User ${i + 1}` })
  )
```

## 🚀 지속적 테스트

### 워치 모드
```bash
# 워치 모드로 테스트 실행
yarn test --watch

# 특정 테스트 파일 실행
yarn test Button.test.tsx --watch

# 패턴과 일치하는 테스트 실행
yarn test --testNamePattern="Button" --watch
```

### 사전 커밋 테스트
```bash
# .husky/pre-commit에서
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn test --passWithNoTests --watchAll=false
yarn lint
yarn type-check
```

---

*코드에 대한 신뢰를 주고 회귀를 방지하는 테스트를 작성하세요.*