# Next.js + TanStack Query + SEO 최적화 템플릿

현대적인 웹 개발을 위한 Next.js 템플릿입니다. TanStack Query를 활용한 SEO 최적화된 데이터 관리 방식을 구현했습니다.

## 🚀 주요 기능

### SEO 최적화

- **서버 컴포넌트에서 초기 데이터 렌더링**: 검색 엔진이 콘텐츠를 크롤링할 수 있도록 서버에서 미리 렌더링
- **동적 메타데이터**: 각 페이지에 맞는 메타데이터 자동 생성
- **하이브리드 렌더링**: SEO를 위한 서버 렌더링 + UX를 위한 클라이언트 렌더링

### TanStack Query 통합

- **서버에서 Prefetch**: 초기 데이터를 서버에서 미리 가져와서 클라이언트로 전달
- **HydrationBoundary**: 서버의 캐시된 데이터를 클라이언트에서 재사용
- **효율적인 캐싱**: 클라이언트에서 데이터 캐싱과 상태 관리

### 개발자 경험

- **TypeScript**: 완전한 타입 안전성
- **SCSS 모듈**: 스타일링 시스템
- **ESLint + Prettier**: 코드 품질 관리
- **Storybook**: 컴포넌트 문서화

## 📁 프로젝트 구조

```
├── app/
│   ├── (home)/
│   │   └── page.tsx              # 메인 페이지
│   ├── posts/
│   │   ├── page.tsx              # 게시물 목록 (서버 컴포넌트)
│   │   └── [id]/
│   │       └── page.tsx          # 게시물 상세 (서버 컴포넌트)
│   ├── layout.tsx                # 루트 레이아웃
│   └── providers.tsx             # TanStack Query Provider
├── src/
│   ├── components/
│   │   ├── posts/
│   │   │   ├── PostList.tsx      # 게시물 목록 (클라이언트 컴포넌트)
│   │   │   └── PostDetail.tsx    # 게시물 상세 (클라이언트 컴포넌트)
│   │   └── ui/                   # 공통 UI 컴포넌트
│   ├── hooks/
│   │   └── usePosts.ts           # TanStack Query 훅
│   ├── lib/
│   │   ├── api/
│   │   │   └── posts.ts          # API 함수
│   │   └── query.ts              # TanStack Query 유틸리티
│   └── styles/                   # 전역 스타일
```

## 🔧 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Data Fetching**: TanStack Query v5
- **State Management**: Zustand
- **UI Components**: Custom Components
- **Development**: ESLint, Prettier, Storybook

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

### 환경 변수

```env
# .env.local
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

## 📖 사용 예시

### 게시물 목록 페이지

- **URL**: `/posts`
- **기능**: 서버에서 미리 렌더링된 게시물 목록
- **SEO**: 검색 엔진이 콘텐츠를 크롤링할 수 있음

### 게시물 상세 페이지

- **URL**: `/posts/[id]`
- **기능**: 개별 게시물의 상세 정보
- **SEO**: 동적 메타데이터 생성

## 🔍 SEO 최적화 포인트

1. **서버에서 초기 데이터 렌더링**: 검색 엔진이 콘텐츠를 크롤링할 수 있도록 서버에서 미리 렌더링
2. **동적 메타데이터**: 각 페이지에 맞는 제목, 설명, Open Graph 태그 자동 생성
3. **하이브리드 렌더링**: SEO를 위한 서버 렌더링 + UX를 위한 클라이언트 렌더링 조합
4. **TanStack Query Hydration**: 서버의 캐시된 데이터를 클라이언트에서 재사용하여 성능 최적화

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.
