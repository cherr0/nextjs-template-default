'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import QueryAsyncBoundary from '~/components/common/QueryAsyncBoundary'
import { usePostsQuery } from '~/hooks/queries/usePosts'

const PostListContent = ({ data, page, setPage, isFetching }: any) => {
  const router = useRouter()
  const totalPages = Math.ceil((data?.total || 0) / 10)

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`)
  }

  return (
    <div className='mx-auto max-w-3xl p-8'>
      <h2 className='mb-4 text-3xl font-bold text-gray-800'>게시물 목록</h2>
      <p className='mb-8 leading-relaxed text-gray-600'>
        이 콘텐츠는 클라이언트에서 TanStack Query로 관리되며, 초기 데이터는
        서버에서 미리 렌더링되어 SEO에 최적화되어 있습니다.
      </p>

      <div className='mb-8 flex flex-col gap-6'>
        {data.posts.map((post: any) => (
          <article
            key={post.id}
            className='cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-lg'
            onClick={() => handlePostClick(post.id)}
          >
            <h3 className='mb-2 text-xl font-semibold text-gray-800'>
              {post.title}
            </h3>
            <p className='mb-4 leading-relaxed text-gray-600'>{post.content}</p>
            <div className='flex items-center justify-between text-sm text-gray-500'>
              <span className='font-medium'>작성자: {post.author}</span>
              <span className='text-gray-400'>
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className='mt-8 flex items-center justify-center gap-4'>
        <button
          className='rounded border border-gray-300 bg-white px-4 py-2 text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          이전
        </button>

        <span className='min-w-[60px] text-center text-sm text-gray-600'>
          {page} / {totalPages}
        </span>

        <button
          className='rounded border border-gray-300 bg-white px-4 py-2 text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          다음
        </button>
      </div>

      {isFetching && (
        <div className='mt-8 text-center italic text-blue-600'>
          새로운 데이터를 불러오는 중...
        </div>
      )}
    </div>
  )
}

const PostList = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching } = usePostsQuery(page, 10)

  return (
    <QueryAsyncBoundary
      queryState={{ isLoading, error, data }}
      loadingComponent={
        <div className='mx-auto max-w-3xl p-8'>
          <div className='p-8 text-center text-gray-600'>
            게시물을 불러오는 중...
          </div>
        </div>
      }
      errorComponent={
        <div className='mx-auto max-w-3xl p-8'>
          <div className='p-8 text-center text-red-600'>
            게시물을 불러오는데 실패했습니다.
          </div>
        </div>
      }
      emptyComponent={
        <div className='mx-auto max-w-3xl p-8'>
          <div className='p-8 text-center text-gray-600'>
            게시물이 없습니다.
          </div>
        </div>
      }
      isEmpty={(data) => !data?.posts?.length}
    >
      <PostListContent
        data={data}
        page={page}
        setPage={setPage}
        isFetching={isFetching}
      />
    </QueryAsyncBoundary>
  )
}

export default PostList
