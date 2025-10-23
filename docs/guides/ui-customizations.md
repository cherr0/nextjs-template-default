---
title: Next.js Tailwind CSS 커스터마이징 가이드
audience: human
scope: frontend
tags: [guides, styling, tailwind]
version: 3.0.0
updated: 2025-01-23
---

# Next.js Tailwind CSS 커스터마이징 가이드

> 단일 소스 안내: 이 문서는 [Single-Source Index](./single-source-index.md)의 '스타일/테마' 권위 문서입니다.

## 🎯 커스터마이징 원칙

### **기본 방침**

- **Tailwind CSS v4**: 최신 CSS 기반 설정 시스템
- **CSS 변수**: HSL 포맷 기반 디자인 토큰
- **CVA 패턴**: Class Variance Authority로 variant 관리
- **타입 안전성**: TypeScript 인터페이스로 props 타입 정의
- **확장성**: 새로운 요구사항에 유연하게 대응할 수 있는 구조

> ⚠️ **주의사항**: 커스터마이징 시 기존 디자인 토큰 시스템과 일관성을 유지하고 테스트 코드 작성

---

## 🎨 Tailwind CSS v4 시스템

### 글로벌 CSS 구조

```css
/* src/styles/globals.css */
@import 'tailwindcss';

@theme {
  /* Tailwind v4 테마 확장 */
  --font-kor: 'Pretendard', sans-serif;
  --radius: 0.625rem;
}

:root {
  /* CSS 변수 - HSL 포맷 */
  --primary: 24 95% 53%;
  --background: 0 0% 100%;
}

.dark {
  /* 다크모드 변수 */
  --background: 0 0% 7%;
}
```

### 디자인 토큰 시스템

#### 색상 토큰 (HSL 포맷)

```css
:root {
  /* Primary Colors */
  --primary: 24 95% 53%;
  --primary-foreground: 0 0% 100%;

  /* Secondary Colors */
  --secondary: 0 0% 50%;
  --secondary-foreground: 0 0% 100%;

  /* Accent Colors */
  --accent: 0 0% 97%;
  --accent-foreground: 0 0% 13%;

  /* Semantic Colors */
  --destructive: 0 84% 60%;
  --muted: 0 0% 96%;
  --border: 0 0% 84%;

  /* Brand Colors */
  --orange: 24 95% 53%;
}
```

#### 그림자 토큰

```css
:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

#### 사용 방법

```tsx
// Tailwind 클래스에서 CSS 변수 사용
<div className="bg-primary text-primary-foreground" />
<div className="shadow-md rounded-lg" />
```

---

## 🧩 CVA (Class Variance Authority) 패턴

### CVA 기본 구조

```typescript
// src/lib/cva.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles (항상 적용되는 클래스)
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

### 컴포넌트에서 CVA 사용

```tsx
// src/components/ui/Button/Button.tsx
import { buttonVariants, type ButtonVariants } from '@/lib/cva'
import { cn } from '@/lib/utils'

interface ButtonProps
  extends React.ComponentProps<'button'>,
    ButtonVariants {
  // variant, size는 ButtonVariants에서 자동으로 포함됨
}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export default Button

// 사용 예시
<Button variant="default" size="lg">Click me</Button>
<Button variant="outline">Cancel</Button>
```

---

## 🛠️ 유틸리티 함수

### cn() - 클래스 병합 유틸리티

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**사용 예시:**

```tsx
import { cn } from '@/lib/utils'

// 조건부 클래스 적용
<div
  className={cn(
    'base-class',
    isActive && 'active-class',
    size === 'large' && 'text-lg',
    className // 외부에서 전달받은 className
  )}
/>

// Tailwind 클래스 충돌 해결
<div
  className={cn(
    'p-4', // 이게
    'p-8'  // 이걸로 override됨 (tailwind-merge 덕분)
  )}
/>
```

---

## 📱 반응형 디자인

### Tailwind 반응형 클래스

```tsx
<div
  className='
  p-4 md:p-6 lg:p-8          /* 패딩 */
  text-sm md:text-base lg:text-lg  /* 폰트 크기 */
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  /* 그리드 */
'
>
  Responsive Content
</div>
```

### 브레이크포인트 정의

```css
/* @theme에서 커스텀 브레이크포인트 정의 가능 */
@theme {
  --breakpoint-mobile: 1280px;
  --breakpoint-desktop: 1281px;
}
```

```tsx
// 사용 예시
<div className='mobile:hidden desktop:block'>Desktop Only</div>
```

---

## 🎨 다크모드 지원

### 다크모드 설정

```css
/* src/styles/globals.css */
.dark {
  --background: 0 0% 7%;
  --foreground: 0 0% 98%;
  --primary: 24 95% 53%;
  /* ... 다른 다크모드 색상 */
}
```

### 다크모드 클래스 사용

```tsx
<div
  className='
  bg-background text-foreground
  dark:bg-accent dark:text-accent-foreground
'
>
  Auto Dark Mode Support
</div>
```

### 다크모드 토글 구현 (Zustand)

```typescript
// src/stores/theme.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        // HTML class 토글
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }),
    { name: 'theme-storage' }
  )
)
```

---

## 🎯 컴포넌트 예시

### Button 컴포넌트

```tsx
// src/components/ui/Button/Button.tsx
import { Slot } from '@radix-ui/react-slot'
import { buttonVariants, type ButtonVariants } from '@/lib/cva'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ComponentProps<'button'>, ButtonVariants {
  asChild?: boolean
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export default Button
export type { ButtonProps }
```

### Card 컴포넌트

```tsx
// src/components/ui/Card/Card.tsx
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = ({ className, variant = 'default', ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground',
        {
          default: 'shadow-sm',
          elevated: 'shadow-md',
          outlined: 'border-2'
        }[variant],
        className
      )}
      {...props}
    />
  )
}

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
)

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
)

export { Card, CardHeader, CardTitle, CardContent }
```

---

## 🔧 커스텀 유틸리티 생성

### @utility 문법 (Tailwind v4)

```css
/* src/styles/globals.css */
@utility text-stroke {
  color: transparent;
  -webkit-text-stroke: 1px hsl(var(--orange));
}

@utility no-drag {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@utility typography-title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
}
```

**사용:**

```tsx
<h1 className="typography-title">Title</h1>
<div className="text-stroke">Stroke Text</div>
<div className="no-drag">No Selection</div>
```

---

## ⚠️ 주의사항 및 베스트 프랙티스

### 컴포넌트 개발 시 주의사항

1. **Props 인터페이스**: 명확한 타입 정의 필수
2. **ref 전달**: forwardRef 사용으로 ref 전달 지원
3. **접근성**: ARIA 속성 및 키보드 네비게이션 고려
4. **성능**: React.memo 적절한 사용
5. **테스트**: 각 컴포넌트별 테스트 코드 작성

### 스타일링 베스트 프랙티스

1. **일관성**: Tailwind 유틸리티 클래스 우선 사용
2. **변수 사용**: CSS 커스텀 속성으로 일관성 유지
3. **반응형**: Tailwind 반응형 클래스 (`md:`, `lg:`) 활용
4. **CVA 활용**: 복잡한 variant는 CVA로 관리
5. **유지보수**: 명확한 클래스명, 적절한 추상화

### 피해야 할 패턴

```tsx
// ❌ 인라인 스타일 (특별한 이유 없이)
<div style={{ backgroundColor: '#ff0000' }}>Bad</div>

// ✅ Tailwind 클래스 또는 CSS 변수
<div className="bg-destructive">Good</div>

// ❌ 하드코딩된 값
<div className="mt-[17px] text-[#ff0000]">Bad</div>

// ✅ 디자인 토큰 사용
<div className="mt-4 text-destructive">Good</div>
```

---

## 📦 컴포넌트 배럴 익스포트

```typescript
// src/components/ui/index.ts
export { default as Button, type ButtonProps } from './Button'
export { Card, CardHeader, CardTitle, CardContent } from './Card'
export { default as Badge } from './Badge'
```

---

## 🚀 마이그레이션 가이드 (SCSS → Tailwind)

### Before (SCSS Module)

```tsx
import styles from './Button.module.scss'

;<button className={`${styles.button} ${styles.primary} ${styles.large}`}>
  Click
</button>
```

### After (Tailwind + CVA)

```tsx
import { buttonVariants } from '@/lib/cva'
import { cn } from '@/lib/utils'

;<button className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
  Click
</button>
```

---

_최종 업데이트: 2025년 1월_
_버전: 3.0.0 (Tailwind CSS v4 환경)_
