import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PostDetail from '../_components/PostDetail'

import { createQueryKeys } from '@/constants/query-keys'
import { fetchPostServer } from '~/lib/api/posts'
import { prefetchQuery, createHydrationBoundary } from '~/lib/query'
const postsKeys = createQueryKeys('posts')

type PostPageParams = Promise<{
  id: string
}>

// 동적 메타데이터 생성
export async function generateMetadata({
  params
}: {
  params: PostPageParams
}): Promise<Metadata> {
  const { id } = await params
  const postId = parseInt(id)

  if (isNaN(postId)) {
    return {
      title: '게시물을 찾을 수 없습니다'
    }
  }

  try {
    const post = await fetchPostServer(postId)

    return {
      title: `${post.title} - SEO 최적화된 Next.js + TanStack Query`,
      description: post.content.substring(0, 160) + '...',
      keywords: ['게시물', '블로그', 'Next.js', 'TanStack Query', 'SEO'],
      openGraph: {
        title: post.title,
        description: post.content.substring(0, 160) + '...',
        type: 'article',
        authors: [post.author],
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt
      }
    }
  } catch (error) {
    return {
      title: '게시물을 찾을 수 없습니다'
    }
  }
}

// 서버 컴포넌트에서 초기 데이터 prefetch
async function getInitialData(postId: number) {
  try {
    // 서버에서 초기 데이터를 미리 가져옴 (SEO 최적화)
    const initialData = await prefetchQuery(postsKeys.detail(postId), () =>
      fetchPostServer(postId)
    )

    return initialData
  } catch (error) {
    console.error('초기 데이터 로드 실패:', error)
    return null
  }
}

const PostPage = async ({ params }: { params: PostPageParams }) => {
  const { id } = await params
  const postId = parseInt(id)

  if (isNaN(postId)) {
    notFound()
  }

  // 서버에서 초기 데이터를 미리 가져옴
  const initialData = await getInitialData(postId)

  if (!initialData) {
    notFound()
  }

  // HydrationBoundary 생성
  const HydrationWrapper = createHydrationBoundary()

  return (
    <div>
      {/* SEO를 위한 서버에서 렌더링된 초기 콘텐츠 */}
      <section>
        <h1>{initialData.title}</h1>
        <div>
          <p>
            <strong>작성자:</strong> {initialData.author}
          </p>
          <p>
            <strong>작성일:</strong>{' '}
            {new Date(initialData.createdAt).toLocaleDateString('ko-KR')}
          </p>
        </div>
        <div>
          <p>{initialData.content}</p>
        </div>
        <p>
          이 콘텐츠는 SEO를 위해 서버에서 미리 렌더링됩니다. 검색 엔진이 이
          내용을 크롤링할 수 있도록 정적으로 생성되었습니다.
        </p>
      </section>

      {/* 클라이언트 컴포넌트로 전달 */}
      <HydrationWrapper>
        <PostDetail postId={postId} />
      </HydrationWrapper>
    </div>
  )
}

export default PostPage
