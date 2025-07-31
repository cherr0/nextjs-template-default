# 개발 워크플로우 & 규칙

## 🎯 개요
일일 개발 관례, 워크플로우 가이드라인, 일관된 개발 경험을 위한 규칙입니다.

## 🔄 개발 워크플로우

### 일일 워크플로우
1. **개발 시작**
   ```bash
   git pull origin main
   yarn install  # package.json이 변경된 경우
   yarn dev
   ```

2. **기능 개발**
   ```bash
   git checkout -b feature/기능-이름
   # 기능 개발
   git add .
   git commit -m "feat: 새 기능 추가"
   git push origin feature/기능-이름
   ```

3. **코드 품질 확인**
   ```bash
   yarn lint        # 코드 스타일 확인
   yarn type-check  # TypeScript 확인
   yarn test        # 테스트 실행
   ```

### 브랜치 네이밍 규칙
- `feature/기능-이름` - 새로운 기능
- `fix/문제-설명` - 버그 수정
- `refactor/컴포넌트-이름` - 코드 리팩토링
- `docs/readme-업데이트` - 문서 업데이트
- `chore/의존성-업데이트` - 유지보수 작업

### 커밋 메시지 형식
```
type(scope): 설명

타입:
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서
- style: 코드 스타일 변경
- refactor: 코드 리팩토링
- test: 테스트 추가
- chore: 유지보수
```

## 🏗️ 컴포넌트 개발

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
  
  @include breakpoint-up($breakpoint-md) {
    padding: 2rem;
  }
}
```

### 반응형 디자인
```scss
// _variables.scss의 믹스인 사용
.component {
  padding: 1rem;
  
  @include breakpoint-up($breakpoint-sm) {
    padding: 1.5rem;
  }
  
  @include breakpoint-up($breakpoint-md) {
    padding: 2rem;
  }
}
```

## 🗄️ 상태 관리 규칙

### Zustand 사용 시기
- 전역 애플리케이션 상태
- 사용자 기본설정
- 인증 상태
- 컴포넌트 간 공유되는 UI 상태

### React State 사용 시기
- 컴포넌트별 상태
- 폼 입력
- 로컬 UI 상태
- 임시 상태

### 스토어 구성
```typescript
// 기능별 스토어 구성
src/stores/
├── auth.ts          # 인증 상태
├── theme.ts         # 테마 기본설정
├── user.ts          # 사용자 프로필 데이터
└── index.ts         # 통합 익스포트
```

## 📡 데이터 페칭 패턴

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
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
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

## 🧪 테스트 전략

### 단위 테스트
```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('올바른 텍스트로 렌더링된다', () => {
    render(<Button>클릭하세요</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('클릭하세요')
  })

  it('클릭 시 onClick을 호출한다', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>클릭하세요</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 🔧 개발 도구

### ESLint 통합
```bash
# 린팅 문제 자동 수정
yarn lint:fix

# 특정 파일 확인
yarn lint src/components/ui/Button/index.tsx
```

### TypeScript 통합
```bash
# 전체 프로젝트 타입 체크
yarn type-check

# 워치 모드로 타입 체크
yarn type-check --watch
```

### VS Code 설정
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🐛 디버깅 가이드라인

### 브라우저 개발자 도구
- 컴포넌트 검사에 React DevTools 사용
- Zustand 스토어에 Redux DevTools 사용
- API 디버깅에 Network 탭 사용
- 오류 추적에 Console 사용

### 훅 디버깅
```typescript
// 커스텀 훅 디버그
const useDebugValue = (value: any, label?: string) => {
  React.useDebugValue(value, (val) => `${label}: ${JSON.stringify(val)}`)
}

const useUsers = () => {
  const query = useQuery(/* ... */)
  useDebugValue(query.data, 'Users Data')
  return query
}
```

## 📝 코드 문서화

### 컴포넌트 문서화
```typescript
/**
 * 여러 변형을 가진 재사용 가능한 버튼 컴포넌트
 * 
 * @param variant - 버튼의 시각적 스타일
 * @param size - 버튼의 크기
 * @param disabled - 버튼 비활성화 여부
 * @param onClick - 클릭 핸들러 함수
 * @param children - 버튼 내용
 */
const Button = ({ variant, size, disabled, onClick, children }: ButtonProps) => {
  // 구현
}
```

## 🚀 성능 최적화

### 코드 분할
```typescript
// 컴포넌트 지연 로딩
import { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

const App = () => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <LazyComponent />
  </Suspense>
)
```

### 메모이제이션
```typescript
// 비용이 큰 컴포넌트에 메모 사용
import { memo } from 'react'

const ExpensiveComponent = memo(({ data }: { data: any[] }) => {
  // 비용이 큰 렌더링 로직
  return <div>{data.map(/* ... */)}</div>
})

// 비용이 큰 계산에 useMemo 사용
const expensiveValue = useMemo(() => {
  return data.reduce(/* 비용이 큰 계산 */)
}, [data])
```

## 🔄 핫 리로딩

### 개발 서버
```bash
# 핫 리로드로 시작
yarn dev

# 다른 포트에서 시작
yarn dev -p 3001

# 터보 모드로 시작
yarn dev --turbo
```

### 핫 리로드 모범 사례
- 개발 중 상태를 최소한으로 유지
- React Fast Refresh 적절히 사용
- 모듈 스코프에서 부작용 피하기
- 오류를 우아하게 처리

---

*일관된 코드 품질과 개발 효율성을 위해 이 가이드라인을 일관되게 따르세요.*