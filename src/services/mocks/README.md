서비스 목업 가이드

- 위치: `src/services/mocks/`
- 파일명: `*.mock.ts` (예: `posts.mock.ts`, `users.mock.ts`)
- 목적: 실제 백엔드 연동 전까지 임시 데이터/응답 시뮬레이션 제공
- 사용 예시:

```typescript
// src/services/mocks/posts.mock.ts
export const postsMock = [
  { id: '1', title: 'Hello', content: 'World', category: 'general', createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: '2', title: 'Next.js', content: 'RSC + Query', category: 'tech', createdAt: '2025-01-02', updatedAt: '2025-01-02' },
];

export async function getPostsMock() {
  // 네트워크 지연 시뮬레이션
  await new Promise((r) => setTimeout(r, 200));
  return postsMock;
}
```

- 주의: 실제 API 연동 시작 시 목업 호출 경로를 서비스 실제 구현으로 교체하고, 테스트 전용으로만 유지하세요.

