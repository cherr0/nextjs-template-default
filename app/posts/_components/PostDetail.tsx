'use client'

import styles from './PostDetail.module.scss'

import QueryAsyncBoundary from '~/components/common/QueryAsyncBoundary'
import { usePostQuery } from '~/hooks/queries/usePosts'

interface PostDetailProps {
  postId: number
}

const PostDetailContent = ({ post }: { post: any }) => {
  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>작성자: {post.author}</span>
            <span className={styles.date}>
              {new Date(post.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </header>

        <div className={styles.content}>
          <p>{post.content}</p>
        </div>

        <footer className={styles.footer}>
          <p className={styles.seoInfo}>
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
          <div className={styles.empty}>게시물을 찾을 수 없습니다.</div>
        </div>
      }
      isEmpty={(data) => !data}
    >
      <PostDetailContent post={post} />
    </QueryAsyncBoundary>
  )
}

export default PostDetail
