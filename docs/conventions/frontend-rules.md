---
title: 프론트엔드 디자인 가이드라인
audience: human
scope: frontend
tags: [conventions, ui]
version: 2.0.0
updated: 2025-09-18
---

# 프론트엔드 디자인 가이드라인

이 문서는 프론트엔드 디자인의 핵심 원칙과 규칙을 요약하고 권장 패턴을 제시합니다. 프론트엔드 코드를 작성할 때 이 가이드라인을 따르세요.

---

# 🧐 가독성 (Readability)

코드의 명확성을 높여 쉽게 이해할 수 있도록 만드는 것을 목표로 합니다.

## 매직 넘버에 이름 붙이기

**규칙:** 의미를 알 수 없는 숫자(매직 넘버)는 명확성을 위해 이름이 있는 상수로 대체하세요.

**이유:**

- 의미 없는 값에 시맨틱한 의미를 부여하여 명확성을 향상시킵니다.
- 유지보수성을 높입니다.

#### 권장 패턴:

```typescript
const ANIMATION_DELAY_MS = 300

async function onLikeClick() {
  await postLike(url)
  await delay(ANIMATION_DELAY_MS) // 애니메이션을 기다리는 것을 명확히 나타냄
  await refetchPostLike()
}
```

## 구현 세부사항 추상화하기

**규칙:** 복잡한 로직이나 상호작용은 전용 컴포넌트나 고차 컴포넌트(HOC)로 추상화하세요.

**이유:**

- 관심사를 분리하여 인지 부하를 줄입니다.
- 컴포넌트의 가독성, 테스트 용이성, 유지보수성을 향상시킵니다.

#### 권장 패턴 1: 인증 가드 (Auth Guard)

```tsx
const App = () => {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  )
}

const AuthGuard = ({ children }) => {
  const status = useCheckLoginStatus()
  useEffect(() => {
    if (status === 'LOGGED_IN') {
      location.href = '/home'
    }
  }, [status])

  return status !== 'LOGGED_IN' ? children : null
}

const LoginStartPage = () => {
  return <>{/* 로그인 관련 컴포넌트들 */}</>
}
```

#### 권장 패턴 2: 전용 인터랙션 컴포넌트

```tsx
const FriendInvitation = () => {
  const { data } = useQuery(/* ... */)

  return (
    <>
      <InviteButton name={data.name} />
    </>
  )
}

const InviteButton = ({ name }) => {
  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog title={`${name}님과 공유하기`} />
    ))

    if (canInvite) {
      await sendPush()
    }
  }

  return <Button onClick={handleClick}>초대하기</Button>
}
```

## 조건부 렌더링 경로 분리하기

**규칙:** 조건에 따라 UI나 로직이 크게 달라진다면, 별개의 컴포넌트로 분리하세요.

**이유:**

- 복잡한 조건문을 피하여 가독성 향상
- 단일 책임의 명확한 컴포넌트 제공

#### 권장 패턴:

```tsx
const SubmitButton = () => {
  const isViewer = useRole() === 'viewer'
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />
}

const ViewerSubmitButton = () => {
  return <TextButton disabled>제출</TextButton>
}

const AdminSubmitButton = () => {
  useEffect(() => {
    showAnimation()
  }, [])

  return <Button type='submit'>제출</Button>
}
```

## 복잡한 삼항 연산자 단순화하기

**규칙:** 중첩된 삼항 연산자는 if/else 또는 IIFE로 대체하세요.

#### 권장 패턴:

```ts
const status = (() => {
  if (ACondition && BCondition) return 'BOTH'
  if (ACondition) return 'A'
  if (BCondition) return 'B'
  return 'NONE'
})()
```

## 시선 이동 줄이기 (간단한 로직 함께 배치하기)

**규칙:** 간단한 로직은 인라인으로 정의하여 시선 이동을 줄이세요.

#### 권장 패턴 A: 인라인 switch

```tsx
switch (user.role) {
  case 'admin':
    return <Button disabled={false}>초대하기</Button>
  case 'viewer':
    return <Button disabled={true}>초대하기</Button>
  default:
    return null
}
```

#### 권장 패턴 B: 정책 객체

```tsx
const policy = {
  admin: { canInvite: true, canView: true },
  viewer: { canInvite: false, canView: true }
}[user.role]
```

## 복잡한 조건에 이름 붙이기

**규칙:** 복잡한 boolean 조건은 명명된 변수에 할당하세요.

#### 권장 패턴:

```ts
const isSameCategory = product.categories.some(
  (c) => c.id === targetCategory.id
)
const isPriceInRange = product.prices.some(
  (p) => p >= minPrice && p <= maxPrice
)
return isSameCategory && isPriceInRange
```

---

# 🔮 예측 가능성 (Predictability)

## 반환 타입 표준화하기

**규칙:** 비슷한 기능의 함수나 훅은 일관된 타입을 반환하세요.

#### 권장 패턴:

```ts
function useUser(): UseQueryResult<UserType, Error> { return useQuery(...) }

function checkIsNameValid(name: string): ValidationResult {
  if (name.length === 0) return { ok: false, reason: '이름은 비워둘 수 없습니다.' }
  return { ok: true }
}
```

## 숨겨진 로직 드러내기 (단일 책임 원칙)

```ts
async function fetchBalance(): Promise<number> {
  return await http.get<number>('...')
}

async function handleUpdateClick() {
  const balance = await fetchBalance()
  logging.log('balance_fetched')
  await syncBalance(balance)
}
```

## 고유하고 서술적인 이름 사용하기

```ts
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken()
    return http.get(url, { headers: { Authorization: `Bearer ${token}` } })
  }
}
```

---

# 🧩 응집성 (Cohesion)

## 폼 응집성 고려하기

- 필드 레벨: 독립적인 유효성, 재사용성 높음
- 폼 레벨: 상호의존 유효성, 멀티스텝 처리에 적합

## 기능/도메인 중심 디렉토리 구성

```txt
src/
├── domains/
│   ├── user/components/UserProfileCard.tsx
│   ├── product/components/ProductList.tsx
```

## 매직 넘버와 로직 연결하기

- 관련 로직 근처에 상수 정의 및 의미 명시

---

# 🔗 결합성 (Coupling)

## 추상화와 결합성의 균형

- 모든 사용 사례에 동일하지 않은 로직은 추상화보다 분리를 선택

## 상태 관리 범위 좁히기

```ts
export function useCardIdQueryParam() {
  const [cardIdParam, setCardIdParam] = useQueryParam('cardId', NumberParam)
  const setCardId = useCallback((id) => setCardIdParam(id, 'replaceIn'), [])
  return [cardIdParam ?? undefined, setCardId] as const
}
```

## 합성으로 Props Drilling 제거하기

```tsx
const ItemEditModal = ({ open, items, recommendedItems, onConfirm, onClose }) => {
  const [keyword, setKeyword] = useState('')
  return (
    <Modal open={open} onClose={onClose}>
      <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button onClick={onClose}>닫기</Button>
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </Modal>
  )
}
```

---

이 가이드는 팀 내 코드 일관성과 유지보수성을 높이기 위한 기준이며, 상황에 맞는 유연한 판단이 동반되어야 합니다.
