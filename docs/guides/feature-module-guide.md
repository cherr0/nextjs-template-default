---
title: Feature Module Guide
audience: human
scope: frontend
tags: [guides, features]
version: 2.0.0
updated: 2025-09-18
---

# Feature Module Guide

> 요약 안내: 본 문서는 "피처 모듈 설계/구성"에 집중합니다. 상태관리·스타일·프로젝트 구조의 세부 규칙은 단일 소스 문서를 기준으로 하며, 중복 서술은 최소화합니다. 자세한 규칙은 [Single-Source Index](./single-source-index.md)를 참고하세요.

## Purpose

기능별 코드 구조와 작성 규칙을 표준화하여 Next.js 15 + TypeScript + TanStack Query + Zustand + React Hook Form + Zod 스택에 최적화된 개발 흐름을 제공합니다.

## Feature Module 구성 요소

### 1. Domain Types (`src/types/<domain>.ts`)

**목적**: 도메인 전체에서 공유되는 API 응답/요청 타입 정의
**포함 내용**:

- API DTO 인터페이스 (서버 응답 형태 그대로)
- 공통 Enum 타입 (상태값, 카테고리 등)
- 페이지네이션 관련 공통 타입
- 여러 기능에서 재사용되는 타입

**작성 패턴**:

```typescript
// API 응답 타입 - 서버 스키마와 정확히 일치
export interface User {
  id: string
  name: string /* ... */
}

// 공통 Enum - 도메인 전체에서 사용
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

// 요청 타입 - API 호출 시 사용
export interface CreateUserRequest {
  name: string /* ... */
}
```

### 2. Schemas (`src/schemas/`)

#### 백엔드 기준 스키마 (`<domain>.ts`)

**목적**: 백엔드 API 스키마를 그대로 반영한 기본 스키마
**원칙**: 백엔드에서 제공하는 스키마를 최대한 그대로 사용
**특징**:

- 백엔드 API 응답 구조와 정확히 일치
- 기본적인 타입 변환만 수행 (ISO 문자열 → Date 등)
- 프로젝트 전체에서 공통으로 사용

```typescript
// 백엔드 API 스키마 그대로 반영
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val))
})

export const UserListResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number()
  })
})
```

#### Feature별 변환 스키마 (`src/components/features/<domain>/_schemas/`)

**목적**: 특정 feature에서 백엔드 스키마를 변환해서 사용해야 하는 경우
**사용 시기**:

- UI 표시용으로 데이터 가공이 필요한 경우
- 특정 feature만의 추가 검증이 필요한 경우
- 폼 검증 스키마

```typescript
// Feature별 변환이 필요한 경우에만 사용
export const UserDisplaySchema = UserSchema.transform((user) => ({
  ...user,
  displayName: `${user.name} (${user.email})`, // UI 표시용 변환
  isActive: user.status === 'active'
}))

export const CreateUserFormSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다'),
  email: z.string().email('유효한 이메일을 입력하세요')
  // 폼 검증에 특화된 스키마
})
```

### 3. API Services (`src/services/<domain>.service.ts`)

**목적**: 도메인별 API 통신 로직 중앙화
**원칙**: 백엔드 스키마를 기준으로 데이터 검증
**책임**:

- HTTP 요청/응답 처리
- URL 파라미터 구성
- 백엔드 스키마로 응답 데이터 검증
- 에러 처리 표준화

```typescript
import { UserSchema, UserListResponseSchema } from '@/schemas/user'

export const userService = {
  async getList(filters?: UserFilters) {
    // URL 구성, fetch 실행
    const response = await fetch(url)
    const data = await response.json()

    // 백엔드 스키마로 검증
    return UserListResponseSchema.parse(data)
  },

  async getDetail(id: string) {
    const response = await fetch(`/api/users/${id}`)
    const data = await response.json()

    // 백엔드 스키마로 검증
    return UserSchema.parse(data)
  }
}
```

> 스타일 가이드 참고: 컴포넌트 스타일/테마, CSS Modules + SCSS 패턴은 `docs/guides/ui-customizations.md`를 따릅니다.

### 5. 아이콘 사용 규칙

- 앱 코드에서 아이콘은 반드시 `<Icon name="..." />`를 사용합니다.
- 로컬(Figma) 아이콘이 우선이며, 없을 경우에만 lucide 폴백을 사용합니다.
- 새 아이콘 추가 시 `src/icons/raw/`에 SVG를 넣고 `yarn icons:build` 실행 후 사용합니다.
- 금지: `lucide-react` 직접 임포트, 원시 `.svg` 직접 임포트(ESLint로 강제).

### 4. Custom Hooks (`src/hooks/<domain>/`)

**목적**: TanStack Query를 활용한 서버 상태 관리
**패턴**:

- 쿼리 훅: 데이터 조회 (`useUsers`, `useUser`)
- 뮤테이션 훅: 데이터 변경 (`useCreateUser`, `useUpdateUser`)
- 자동 캐시 무효화 설정

```typescript
import { createQueryKeys } from '@/constants/query-keys'
const userKeys = createQueryKeys('users')

export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => userService.getList(filters)
    // staleTime 등 캐시 전략 설정
  })
}
```

### 5. Query Keys (`src/constants/query-keys.ts`)

**목적**: TanStack Query 캐시 키 표준화
**구조**: 도메인 → 기능 → 필터 계층 구조
**패턴**: `all()` → `lists()` → `list(filters)` → `details()` → `detail(id)`

```typescript
export const createQueryKeys = <T extends string>(ns: T) => ({
  all: () => [ns] as const,
  lists: () => [ns, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [ns, 'list', { filters }] as const,
  details: () => [ns, 'detail'] as const,
  detail: (id: string | number) => [ns, 'detail', String(id)] as const
})

// 사용 예시
const userKeys = createQueryKeys('users')
```

### 6. Feature Components (`src/components/features/<domain>/`)

**목적**: 도메인별 비즈니스 로직 포함 컴포넌트
**구성**:

- `<Domain>List.tsx`: 목록 표시 + 검색/필터링 + 페이지네이션
- `<Domain>Form.tsx`: 생성/수정 폼 + 검증 + 제출
- `<Domain>Card.tsx`: 아이템 표시 + 액션 버튼
- `_schemas/`: Feature별 변환 스키마 (필요시에만)
- `index.ts`: 배럴 익스포트로 깔끔한 import

**Feature별 스키마 작성 규칙**:

- `_schemas/` 폴더는 해당 feature에서만 사용하는 변환 스키마
- 백엔드 기본 스키마를 `transform()`으로 가공
- 폼 검증 스키마도 여기에 포함

```typescript
// 기본: 백엔드 스키마 그대로 사용
export function UserList({ initialData }: UserListProps) {
  const { data, isLoading } = useUsers(filters, { initialData })
  // 백엔드 스키마 그대로 사용
}

// 변환 필요시: feature별 _schemas 사용
import { UserDisplaySchema } from './_schemas/user-display'

export function UserCard({ user }: UserCardProps) {
  const displayUser = UserDisplaySchema.parse(user)
  // Feature별 변환된 데이터 사용
}
```

### 7. Next.js Pages (`app/<domain>/`)

**목적**: App Router 기반 라우팅과 서버 컴포넌트
**구조**:

- `page.tsx`: 서버 컴포넌트에서 초기 데이터 fetch
- `[id]/page.tsx`: 동적 라우트
- `loading.tsx`, `error.tsx`: 로딩/에러 UI
- `layout.tsx`: 도메인별 레이아웃 (선택사항)

```typescript
// 서버 컴포넌트에서 초기 데이터 제공
export default async function UsersPage() {
  const initialUsers = await userService.getList()
  return <UserList initialData={initialUsers} />
}
```

### 8. Server Actions (`app/actions/<domain>.ts`)

**목적**: 폼 제출과 서버 측 데이터 변경
**특징**:

- 'use server' 지시어 사용
- 폼 검증 후 처리
- revalidatePath로 캐시 무효화

```typescript
'use server'
export async function createUserAction(formData: FormData) {
  const validated = createUserSchema.parse(formData)
  const result = await userService.create(validated)
  revalidatePath('/users')
  return { success: true, data: result }
}
```

## Feature Module 개발 플로우

### 1. 기획 → 타입 정의

도메인 요구사항을 분석하여 `src/types/<domain>.ts`에 인터페이스 정의

### 2. API 설계 → 검증 스키마

서버 API 스펙에 맞춰 `src/schemas/<domain>.ts`에 백엔드 기준 Zod 스키마 작성

### 3. 데이터 레이어 → 서비스 구현

`src/services/<domain>.service.ts`에 API 통신 로직 구현

참고: 백엔드 연동 전 임시 데이터는 `src/services/mocks/`에 `*.mock.ts`로 작성하세요.

### 4. 상태 관리 → 훅 작성

`src/hooks/<domain>/`에 TanStack Query 기반 데이터 훅 구현

### 5. UI 구현 → 컴포넌트 작성

`src/components/features/<domain>/`에 비즈니스 로직 포함 컴포넌트 구현

### 6. 라우팅 → 페이지 구성

`app/<domain>/`에 서버 컴포넌트 기반 페이지 구성

### 7. 폼 처리 → Server Actions

`app/actions/<domain>.ts`에 폼 제출 및 데이터 변경 로직 구현

### 8. Feature별 스키마 → 변환 로직 (필요시)

특정 feature에서 백엔드 데이터를 UI용으로 변환해야 하는 경우 `src/components/features/<domain>/_schemas/`에 변환 스키마 작성

## Next.js 통합 패턴

### Route Handlers

**위치**: `app/api/<domain>/route.ts`
**목적**: RESTful API 엔드포인트 제공

```typescript
export async function GET(request: NextRequest) {
  // 쿼리 파라미터 처리, 데이터 조회, 응답 반환
}

export async function POST(request: NextRequest) {
  // 요청 body 검증, 데이터 생성, 응답 반환
}
```

### Server Actions

**위치**: `app/actions/<domain>.ts`
**목적**: 폼 기반 서버 측 데이터 처리

```typescript
'use server'
export async function createUserAction(formData: FormData) {
  // 폼 데이터 검증, 서비스 호출, 캐시 무효화
  revalidatePath('/users')
}
```

### API Client

**위치**: `src/lib/api/client.ts`
**목적**: 외부 API 통신 표준화

```typescript
export class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    // HTTP GET 요청, 에러 처리, 응답 반환
  }
}
```

## 상태 관리 규칙 (요약)

> 단일 소스: `docs/conventions/data-management-architecture.md`

- 서버 상태는 TanStack Query로만 관리합니다. 클라이언트 전역 상태(Zustand)에 서버 데이터를 보관하지 않습니다.
- 전역 상태는 인증/테마/설정 등으로 한정합니다.
- 폼 상태는 React Hook Form(+Zod)로 관리하고 일반 전역/로컬 상태로 대체하지 않습니다.
- Server Components는 초기 데이터 제공, 클라이언트는 상호작용 중심으로 분리합니다.

## 데이터 플로우 패턴 (요약)

> 단일 소스: `docs/conventions/patterns.md`, `docs/conventions/data-management-architecture.md`

- 서버에서 초기 데이터(prefetch/SSR)를 제공하고, 클라이언트는 TanStack Query로 후속 동기화를 담당합니다.
- 캐시 무효화는 네임스페이스화된 쿼리 키와 `invalidateQueries`/`revalidatePath`를 조합합니다.
- 폼 제출/뮤테이션은 Server Actions 우선 패턴을 권장합니다.
- 상세 예시는 패턴 가이드 문서를 참고하세요.

## 프로젝트 구조 가이드 (요약)

상세한 프로젝트 구조와 네이밍 규칙은 단일 소스 문서 `docs/conventions/coding-style.md`를 참고하세요. 본 문서에서는 피처 모듈 관점에서 필요한 최소 디렉터리 힌트만 제공합니다.

## 개발 가이드라인

### 파일 네이밍

- **케밥케이스**: 폴더, 파일명
- **PascalCase**: 컴포넌트, 타입
- **camelCase**: 함수, 변수
- **훅 파일**: `use-<domain>.ts`

### Import 규칙

- **절대 경로**: `@/`만 사용
- **상대 경로**: 금지
- **배럴 익스포트**: `index.ts`로 깔끔한 import

### 컴포넌트 분리 원칙

- **Server Components**: 초기 데이터 fetch, SEO 최적화
- **Client Components**: 상호작용, 상태 관리 필요시만
- **'use client'**: 최소 범위에서만 사용

## Best Practices

### Do ✅

- Server Components에서 초기 데이터 fetch
- 백엔드 스키마를 기준으로 API 응답 검증
- 서비스 레이어에서 `src/schemas/` 스키마 사용
- TanStack Query로 서버 상태 관리
- Server Actions로 폼 처리
- 계층적 쿼리 키 구조 사용
- Feature별 변환이 필요할 때만 `_schemas/` 사용

### Don't ❌

- 서버 상태를 Zustand에 저장
- 클라이언트에서 직접 fetch (Server Component 우선)
- Server Components에서 클라이언트 훅 사용
- ad-hoc 쿼리 키 생성
- 상대 경로 import 사용
- 백엔드 스키마와 다른 임의의 스키마 생성
- 불필요한 feature별 스키마 남발

## 품질 체크리스트

### 구현 완료 확인

- [ ] 쿼리 키 도메인 네임스페이스 추가
- [ ] `src/schemas/`에 백엔드 기준 Zod 스키마 작성
- [ ] API 서비스에서 백엔드 스키마로 응답 검증
- [ ] TanStack Query 훅 구현
- [ ] Server/Client 컴포넌트 적절히 분리
- [ ] Server Actions 폼 처리 구현
- [ ] 캐시 무효화 전략 적용
- [ ] Feature별 변환이 필요한 경우에만 `_schemas/` 사용

### 코드 품질 확인

- [ ] `@/` 절대 경로만 사용
- [ ] 타입 안전성 확보
- [ ] 에러 처리 구현
- [ ] 접근성 고려
- [ ] Next.js App Router 규칙 준수

---

_최종 업데이트: 2025년 1월_
_Feature Module Guide v2.0.0_
