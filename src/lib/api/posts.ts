import axios from 'axios'

// 타입 정의
export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
}

// API 기본 설정
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

// 게시물 목록 조회 (서버 컴포넌트용)
export async function fetchPostsServer(
  page: number = 1,
  limit: number = 10
): Promise<PostsResponse> {
  try {
    // 실제 API가 있다면 여기서 호출
    // const response = await api.get(`/posts?_page=${page}&_limit=${limit}`)

    // 임시 데이터 (실제 프로젝트에서는 실제 API 호출)
    const mockPosts: Post[] = Array.from({ length: limit }, (_, index) => ({
      id: (page - 1) * limit + index + 1,
      title: `게시물 제목 ${(page - 1) * limit + index + 1}`,
      content: `이것은 게시물 ${
        (page - 1) * limit + index + 1
      }의 내용입니다. SEO를 위한 서버에서 미리 렌더링된 콘텐츠입니다.`,
      author: `작성자 ${index + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))

    return {
      posts: mockPosts,
      total: 100, // 전체 게시물 수
      page,
      limit
    }
  } catch (error) {
    console.error('게시물 조회 실패:', error)
    throw new Error('게시물을 불러오는데 실패했습니다.')
  }
}

// 게시물 상세 조회 (서버 컴포넌트용)
export async function fetchPostServer(id: number): Promise<Post> {
  try {
    // 실제 API가 있다면 여기서 호출
    // const response = await api.get(`/posts/${id}`)

    // 임시 데이터
    const mockPost: Post = {
      id,
      title: `게시물 제목 ${id}`,
      content: `이것은 게시물 ${id}의 상세 내용입니다. SEO를 위해 서버에서 미리 렌더링되는 중요한 콘텐츠입니다. 이 내용은 검색 엔진이 크롤링할 수 있도록 서버에서 정적으로 생성됩니다.`,
      author: `작성자 ${id}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return mockPost
  } catch (error) {
    console.error('게시물 상세 조회 실패:', error)
    throw new Error('게시물을 불러오는데 실패했습니다.')
  }
}

// 클라이언트 컴포넌트용 API 함수들
export async function fetchPosts(
  page: number = 1,
  limit: number = 10
): Promise<PostsResponse> {
  return fetchPostsServer(page, limit)
}

export async function fetchPost(id: number): Promise<Post> {
  return fetchPostServer(id)
}
