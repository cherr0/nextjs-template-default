import React, { ReactNode } from 'react'

interface QueryState {
  isLoading: boolean
  error: Error | null
  data?: any
}

interface QueryAsyncBoundaryProps {
  queryState: QueryState
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  emptyComponent?: ReactNode
  children: ReactNode
  isEmpty?: (data: any) => boolean
}

const QueryAsyncBoundary = ({
  queryState,
  loadingComponent = <div>로딩 중...</div>,
  errorComponent = <div>오류가 발생했습니다.</div>,
  emptyComponent = <div>데이터가 없습니다.</div>,
  children,
  isEmpty
}: QueryAsyncBoundaryProps) => {
  const { isLoading, error, data } = queryState

  if (isLoading) {
    return <>{loadingComponent}</>
  }

  if (error) {
    return <>{errorComponent}</>
  }

  if (isEmpty && isEmpty(data)) {
    return <>{emptyComponent}</>
  }

  return <>{children}</>
}

export default QueryAsyncBoundary