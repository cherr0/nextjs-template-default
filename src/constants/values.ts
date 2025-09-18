// 전역 상수 값 (비즈니스 무관 공통 값)

export const VALUES = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 20,
  },
  CACHE: {
    STALE_TIME_MS: 5 * 60 * 1000, // 5분
    GC_TIME_MS: 10 * 60 * 1000,   // 10분
  },
} as const;

