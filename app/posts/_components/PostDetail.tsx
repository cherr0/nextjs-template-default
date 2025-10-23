'use client'

import QueryAsyncBoundary from '~/components/common/QueryAsyncBoundary'
import { usePostQuery } from '~/hooks/queries/usePosts'

interface PostDetailProps {
  postId: number
}

const PostDetailContent = ({ post }: { post: any }) => {
  return (
    <div className='mx-auto max-w-3xl p-8'>
      <article className='overflow-hidden rounded-lg bg-white shadow-md'>
        <header className='border-b border-gray-200 bg-gray-50 p-8'>
          <h1 className='mb-4 text-4xl font-bold leading-tight text-gray-800'>
            {post.title}
          </h1>
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <span className='font-medium text-gray-700'>
              작성자: {post.author}
            </span>
            <span className='text-gray-500'>
              {new Date(post.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </header>

        <div className='p-8 text-lg leading-loose text-gray-800'>
          <p>{post.content}</p>
        </div>

        <footer className='border-t border-gray-200 bg-gray-50 px-8 py-6'>
          <p className='m-0 text-center text-sm italic text-gray-600'>
            이 콘텐츠는 서버에서 미리 렌더링되어 SEO에 최적화되어 있으며,
            클라이언트에서 TanStack Query로 관리됩니다.
          </p>
        </footer>
      </article>
    </div>
  )
}

const PostDetail = ({ postId }: PostDetailProps) => {
  const { data: post, isLoading, error } = usePostQuery(postId)

  return (
    <QueryAsyncBoundary
      queryState={{ isLoading, error, data: post }}
      loadingComponent={
        <div className='mx-auto max-w-3xl p-8'>
          <div className='p-12 text-center text-lg text-gray-600'>
            게시물을 불러오는 중...
          </div>
        </div>
      }
      errorComponent={
        <div className='mx-auto max-w-3xl p-8'>
          <div className='p-12 text-center text-lg text-red-600'>
            게시물을 불러오는데 실패했습니다.
          </div>
        </div>
      }
      emptyComponent={
        <div className='mx-auto max-w-3xl p-8'>
          <div className='p-12 text-center text-lg text-gray-600'>
            게시물을 찾을 수 없습니다.
          </div>
        </div>
      }
      isEmpty={(data) => !data}
    >
      <PostDetailContent post={post} />
    </QueryAsyncBoundary>
  )
}

export default PostDetail
