---
title: 아이콘 사용 가이드
audience: human
scope: frontend
tags: [icons, figma, svgo, svgr, nextjs]
version: 1.0.0
updated: 2025-09-18
---

# 아이콘 사용 가이드

본 가이드는 Figma SVG 기반 사내 아이콘을 단일 소스로 관리하고, 미존재 시에만 lucide-react 폴백을 사용하는 워크플로우를 설명합니다.

## 폴더 구조

- `src/icons/raw/` — Figma에서 받은 원본 SVG를 저장합니다(케밥케이스 파일명).
- `src/icons/generated/` — SVGR로 변환된 React 컴포넌트(자동 생성, 직접 수정 금지).
- `src/components/Icon/` — 아이콘 래퍼(`Icon.tsx`), 로컬 레지스트리(`registry.ts` 자동 생성), 폴백 매핑(`lucide-map.ts`).

## Figma 내보내기 규칙

- 아트보드: 24×24px 기준, viewBox 유지.
- 스타일: stroke 또는 단색 fill 가능. 색상은 개발 단계에서 `currentColor`로 정규화됩니다.
- 파일명: 케밥케이스(ex: `user-avatar.svg`).

## 추가/변환 파이프라인

1. SVG 복사: `src/icons/raw/`에 파일 추가
2. 빌드 실행: `yarn icons:build`
   - 정규화(normalize): fill/stroke → `currentColor`
   - 최적화(optimize): SVGO로 불필요 속성 제거, viewBox 유지
   - 변환(generate): SVGR로 `.tsx` 컴포넌트 생성
   - 레지스트리 갱신: `registry.ts`와 `IconName` 자동 생성

## 코드 사용법

```tsx
import { Icon } from '@/components/Icon'

export const Example = () => (
  <div>
    {/* 로컬 아이콘(있으면 이걸 사용) */}
    <Icon name='kebab' size='md' />

    {/* 로컬에 없으면 lucide 폴백(ex: info/close 등) */}
    <Icon name='info' size={20} color='#0ea5e9' />
  </div>
)
```

### props

- `name`: 아이콘 이름(로컬 ∪ lucide). 로컬이 우선합니다.
- `size`: `xs|sm|md|lg` 또는 숫자(px). 기본 `md(24)`.
- `color`: 기본 `currentColor` 상속. 필요 시 문자열로 지정.
- `title`: 접근성 텍스트(제공 시 `role="img"`).

## 금지 사항(ESLint로 강제)

- 앱 코드에서 `lucide-react`를 직접 임포트하지 않습니다. 반드시 `<Icon name="..." />` 사용.
- 원시 `.svg`를 직접 임포트하지 않습니다. `src/icons/raw/`에 두고 빌드 후 사용.

## 스토리북에서 아이콘 확인

- 스토리: `Foundations/Icons > Gallery`
  - 로컬 아이콘과 lucide 폴백을 한 화면에서 목록으로 확인 가능
  - Controls: size 토큰/픽셀, color 조정
- 애드온: `storybook-addon-designs`로 Figma 링크 연동(필요 시 URL 추가)

## 컴포넌트에서의 사용 권장

- UI 컴포넌트의 아이콘은 모두 `<Icon>`을 사용합니다.
- 예) `Dialog` 닫기 버튼

```tsx
// before: import { X } from 'lucide-react'
// after:
import { Icon } from '@/components/Icon'
// ...
;<Icon name='close' />
```

## 트러블슈팅

- 아이콘이 보이지 않음: 이름 오타 여부 확인 → 스토리북 갤러리에서 존재 여부 확인 → 없는 경우 lucide 폴백 이름으로 임시 사용 → 디자이너에게 SVG 요청
- 색상이 고정됨: 원본 SVG의 fill/stroke가 강제 색상인지 확인 → `yarn icons:build`로 정규화 반영
- 레지스트리 미갱신: `yarn icons:registry` 또는 전체 `yarn icons:build` 실행
