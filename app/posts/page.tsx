import { Metadata } from 'next'

import PostList from './_components/PostList'

import { fetchPostsServer } from '~/lib/api/posts'
import { prefetchQuery, createHydrationBoundary } from '~/lib/query'

// SEO를 위한 메타데이터
export const metadata: Metadata = {
  title: '게시물 목록 - SEO 최적화된 Next.js + TanStack Query',
  description:
    '서버에서 미리 렌더링된 게시물 목록입니다. SEO에 최적화되어 있으며, 클라이언트에서 TanStack Query로 관리됩니다.',
  keywords: ['게시물', '블로그', 'Next.js', 'TanStack Query', 'SEO'],
  openGraph: {
    title: '게시물 목록 - SEO 최적화된 Next.js + TanStack Query',
    description: '서버에서 미리 렌더링된 게시물 목록입니다.',
    type: 'website'
  }
}

// 서버 컴포넌트에서 초기 데이터 prefetch
async function getInitialData() {
  try {
    // 서버에서 초기 데이터를 미리 가져옴 (SEO 최적화)
    const initialData = await prefetchQuery(['posts', 1, 10], () =>
      fetchPostsServer(1, 10)
    )

    return initialData
  } catch (error) {
    console.error('초기 데이터 로드 실패:', error)
    return null
  }
}

const PostsPage = async () => {
  // 서버에서 초기 데이터를 미리 가져옴
  const initialData = await getInitialData()

  // HydrationBoundary 생성
  const HydrationWrapper = createHydrationBoundary()

  return (
    <div>
      {/* SEO를 위한 서버에서 렌더링된 초기 콘텐츠 */}
      <section>
        <h1>게시물 목록</h1>
        <p>
          이 페이지는 SEO를 위해 서버에서 미리 렌더링됩니다. 초기 데이터는
          서버에서 가져오고, 이후 상호작용은 클라이언트에서 TanStack Query로
          관리됩니다.
        </p>

        {initialData && (
          <div>
            <h2>서버에서 미리 렌더링된 초기 데이터</h2>
            <p>총 {initialData.total}개의 게시물이 있습니다.</p>
            <ul>
              {initialData.posts.slice(0, 3).map((post) => (
                <li key={post.id}>
                  <strong>{post.title}</strong> - {post.author}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 클라이언트 컴포넌트로 전달 */}
      <HydrationWrapper>
        <PostList />
      </HydrationWrapper>
    </div>
  )
}

export default PostsPage
