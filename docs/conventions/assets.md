---
title: 에셋(이미지/폰트) 컨벤션
audience: human
scope: frontend
tags: [conventions, assets]
version: 1.0.0
updated: 2025-09-19
---

# 에셋(이미지/폰트) 컨벤션

간단 규칙 요약

- 위치는 `src/assets/`를 기본으로 합니다. 정적 URL이 꼭 필요한 특별한 경우만 `public/`을 사용합니다.
- 이미지 사용은 정적 임포트 + `next/image`를 권장합니다.
- 폰트는 `next/font/local` 사용을 권장합니다(공개 노출 불필요).
- 임포트 경로는 `@/assets/...`(tsconfig 설정)로 통일합니다.

폴더 구조

```
src/assets/
├── images/   # 컴포넌트/페이지에서 사용하는 이미지 소스
└── fonts/    # next/font/local로 로드할 폰트 소스
```

이미지 사용 예시

```tsx
import Image from 'next/image'
import hero from '@/assets/images/hero.jpg'

export default function Page() {
  return <Image src={hero} alt='Hero' priority />
}
```

폰트 사용 예시

```ts
import localFont from 'next/font/local'

export const Pretendard = localFont({
  src: [
    {
      path: '@/assets/fonts/Pretendard-Variable.woff2',
      weight: '100 900',
      style: 'normal'
    }
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: true
})
```

public 사용 예외(최소화)

- 외부가 고정 URL로 직접 접근해야 하는 파일(예: 다운로드 파일)만 `public/`에 둡니다.
- OG/Twitter 이미지, favicon, robots/sitemap/manifest는 App Router Metadata API를 우선 고려합니다.

참고

- 프로젝트 구조/네이밍 원칙: `docs/conventions/coding-style.md`
- 스타일링: CSS Modules + SCSS 규칙은 `docs/guides/ui-customizations.md`
