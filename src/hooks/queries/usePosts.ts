'use client'

import { useQuery } from '@tanstack/react-query'

import {
  fetchPosts,
  fetchPost,
  type Post,
  type PostsResponse
} from '~/lib/api/posts'

// 게시물 목록 조회 훅
export const usePostsQuery = (page: number = 1, limit: number = 10) => {
  return useQuery<PostsResponse>({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts(page, limit)
  })
}

// 게시물 상세 조회 훅
export const usePostQuery = (id: number) => {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id // id가 있을 때만 실행
  })
}

// 게시물 검색 훅 (추가 기능)
export const usePostsBySearchQuery = (
  searchTerm: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<PostsResponse>({
    queryKey: ['posts', 'search', searchTerm, page, limit],
    queryFn: () => fetchPosts(page, limit), // 실제로는 검색 API 호출
    enabled: !!searchTerm.trim() // 검색어가 있을 때만 실행
  })
}