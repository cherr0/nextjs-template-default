// Query Key 생성 헬퍼 (예시 전용)
// 사용 방법 예시:
// const postsKeys = createQueryKeys('posts')
// postsKeys.list({ page: 1, limit: 10 })

export type Filters = Record<string, unknown> | undefined;

export const createQueryKeys = <T extends string>(namespace: T) => ({
  all: () => [namespace] as const,
  lists: () => [namespace, 'list'] as const,
  list: (filters?: Filters) => [namespace, 'list', { filters }] as const,
  details: () => [namespace, 'detail'] as const,
  detail: (id: string | number) => [namespace, 'detail', String(id)] as const,
});

export type QueryKeyFactory = ReturnType<typeof createQueryKeys>;
