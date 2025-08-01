'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from './PostList.module.scss'

import QueryAsyncBoundary from '~/components/common/QueryAsyncBoundary'
import { usePostsQuery } from '~/hooks/queries/usePosts'

const PostListContent = ({ data, page, setPage, isFetching }: any) => {
  const router = useRouter()
  const totalPages = Math.ceil((data?.total || 0) / 10)

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>게시물 목록</h2>
      <p className={styles.description}>
        이 콘텐츠는 클라이언트에서 TanStack Query로 관리되며, 초기 데이터는
        서버에서 미리 렌더링되어 SEO에 최적화되어 있습니다.
      </p>

      <div className={styles.posts}>
        {data.posts.map((post: any) => (
          <article 
            key={post.id} 
            className={styles.post}
            onClick={() => handlePostClick(post.id)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>
            <div className={styles.postMeta}>
              <span className={styles.author}>작성자: {post.author}</span>
              <span className={styles.date}>
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          이전
        </button>

        <span className={styles.pageInfo}>
          {page} / {totalPages}
        </span>

        <button
          className={styles.pageButton}
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          다음
        </button>
      </div>

      {isFetching && (
        <div className={styles.fetching}>새로운 데이터를 불러오는 중...</div>
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
        <div className={styles.container}>
          <div className={styles.loading}>게시물을 불러오는 중...</div>
        </div>
      }
      errorComponent={
        <div className={styles.container}>
          <div className={styles.error}>게시물을 불러오는데 실패했습니다.</div>
        </div>
      }
      emptyComponent={
        <div className={styles.container}>
          <div className={styles.empty}>게시물이 없습니다.</div>
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
