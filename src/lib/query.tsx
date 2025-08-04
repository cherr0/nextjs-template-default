import {
  QueryClient,
  dehydrate,
  HydrationBoundary
} from '@tanstack/react-query'
import { cache } from 'react'

// 서버 컴포넌트에서 사용할 QueryClient 인스턴스 생성
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // 서버에서 prefetch할 때는 staleTime을 0으로 설정
          staleTime: 0,
          // 서버에서는 refetch하지 않음
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false
        }
      }
    })
)

// 서버 컴포넌트에서 데이터를 prefetch하는 유틸리티 함수
export async function prefetchQuery<TData>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>
): Promise<TData> {
  const queryClient = getQueryClient()

  // 이미 캐시된 데이터가 있다면 반환
  const cachedData = queryClient.getQueryData(queryKey)
  if (cachedData) {
    return cachedData as TData
  }

  // 데이터를 prefetch하고 반환
  await queryClient.prefetchQuery({
    queryKey,
    queryFn
  })

  return queryClient.getQueryData(queryKey) as TData
}

// HydrationBoundary를 위한 래퍼 컴포넌트
export function createHydrationBoundary() {
  const queryClient = getQueryClient()

  return function HydrationWrapper({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    )
  }
}
