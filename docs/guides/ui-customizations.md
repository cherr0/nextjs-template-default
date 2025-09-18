---
title: Next.js 템플릿 커스터마이징 가이드
audience: human
scope: frontend
tags: [guides, styling]
version: 2.0.0
updated: 2025-09-18
---

# Next.js 템플릿 커스터마이징 가이드

> 단일 소스 안내: 이 문서는 [Single-Source Index](./single-source-index.md)의 '스타일/테마' 권위 문서입니다. 중복 섹션은 요약으로 유지하고, 상세 규칙은 본문을 기준으로 합니다.

## 🎯 커스터마이징 원칙

### **기본 방침**
- **컴포넌트 재사용성**: 공통 컴포넌트는 `src/components/` 디렉토리에서 관리
- **스타일 일관성**: CSS Modules + SCSS를 통한 스타일 격리
- **타입 안전성**: TypeScript 인터페이스로 props 타입 정의
- **확장성**: 새로운 요구사항에 유연하게 대응할 수 있는 구조

> ⚠️ **주의사항**: 커스터마이징 시 기존 패턴과 일관성을 유지하고 테스트 코드 작성

---

## 🎨 스타일링 시스템

### CSS Modules + SCSS 패턴
```scss
// src/components/Button/Button.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // 크기 변형
  &.small {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }

  &.large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  // 색상 변형
  &.primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &.secondary {
    background-color: #6b7280;
    color: white;

    &:hover {
      background-color: #4b5563;
    }
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;

    &:hover {
      background-color: #f9fafb;
    }
  }
}
```

### 글로벌 스타일 변수
```scss
// src/styles/variables.scss
// 색상 시스템
:root {
  // Primary colors
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;

  // Gray colors
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;

  // Spacing
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;

  // Border radius
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  // Font sizes
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
}
```

---

## 🧩 공통 컴포넌트 시스템

### 기본 컴포넌트 구조
```
src/components/
├── ui/                     # 기본 UI 컴포넌트
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.scss
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   └── ...
├── layout/                 # 레이아웃 컴포넌트
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
└── features/              # 기능별 컴포넌트
    ├── auth/
    ├── posts/
    └── dashboard/
```

### Button 컴포넌트 예시
```typescript
// src/components/ui/Button/Button.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'medium',
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Input 컴포넌트 예시
```typescript
// src/components/ui/Input/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    ...props
  }, ref) => {
    return (
      <div className={styles.inputGroup}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={cn(
          styles.inputWrapper,
          error && styles.error,
          leftIcon && styles.hasLeftIcon,
          rightIcon && styles.hasRightIcon
        )}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

          <input
            className={cn(styles.input, className)}
            ref={ref}
            {...props}
          />

          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>

        {error && <span className={styles.errorText}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

## 🎨 테마 시스템

### 다크모드 지원
```typescript
// src/hooks/useTheme.ts
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 다크모드 스타일
```scss
// src/styles/themes.scss
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --border: #e4e4e7;
  --input: #e4e4e7;
}

[data-theme="dark"] {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #0a0a0a;
  --card-foreground: #fafafa;
  --border: #27272a;
  --input: #27272a;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

## 📱 반응형 디자인 시스템

### 브레이크포인트 정의
```scss
// src/styles/mixins.scss
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);

@mixin responsive($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// 사용 예시
.container {
  padding: 1rem;

  @include responsive('md') {
    padding: 2rem;
  }

  @include responsive('lg') {
    padding: 3rem;
  }
}
```

### 그리드 시스템
```scss
// src/styles/grid.scss
.grid {
  display: grid;
  gap: 1rem;

  &.cols-1 { grid-template-columns: repeat(1, 1fr); }
  &.cols-2 { grid-template-columns: repeat(2, 1fr); }
  &.cols-3 { grid-template-columns: repeat(3, 1fr); }
  &.cols-4 { grid-template-columns: repeat(4, 1fr); }

  @include responsive('md') {
    &.md\:cols-2 { grid-template-columns: repeat(2, 1fr); }
    &.md\:cols-3 { grid-template-columns: repeat(3, 1fr); }
    &.md\:cols-4 { grid-template-columns: repeat(4, 1fr); }
  }

  @include responsive('lg') {
    &.lg\:cols-3 { grid-template-columns: repeat(3, 1fr); }
    &.lg\:cols-4 { grid-template-columns: repeat(4, 1fr); }
    &.lg\:cols-6 { grid-template-columns: repeat(6, 1fr); }
  }
}
```

---

## 🔧 유틸리티 함수

### className 병합 유틸리티
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 사용 예시
<div className={cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  size === 'large' && 'large-class',
  className
)} />
```

### 폼 검증 유틸리티
```typescript
// src/lib/validations.ts
import { z } from 'zod';

export const createFormSchema = <T extends Record<string, z.ZodType>>(shape: T) => {
  return z.object(shape);
};

// 공통 검증 규칙
export const validations = {
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  required: (message: string) => z.string().min(1, message),
  phone: z.string().regex(/^[0-9-+().\s]+$/, '올바른 전화번호 형식이 아닙니다'),
  url: z.string().url('올바른 URL 형식이 아닙니다'),
};

// 사용 예시
const loginSchema = createFormSchema({
  email: validations.email,
  password: validations.password,
});
```

---

## 🎯 커스텀 훅 패턴

### API 호출 훅
```typescript
// src/hooks/useApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useApiQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    retry?: number;
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // 5분 기본값
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      options?.invalidateQueries?.forEach(key => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: options?.onError,
  });
}
```

### 로컬 스토리지 훅
```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

---

## 🔄 상태 관리 패턴

### Zustand 스토어 패턴
```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
```

---

## 📦 컴포넌트 배럴 익스포트

### 인덱스 파일 패턴
```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';
export { Card } from './Card';
export { Table } from './Table';

// 타입도 함께 익스포트
export type { ButtonProps } from './Button';
export type { InputProps } from './Input';
export type { ModalProps } from './Modal';
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
1. **모듈화**: CSS Modules로 스타일 격리
2. **변수 사용**: CSS 커스텀 속성으로 일관성 유지
3. **반응형**: 모바일 퍼스트 접근법
4. **성능**: CSS 번들 사이즈 최적화
5. **유지보수**: 명확한 클래스명 컨벤션

---

*최종 업데이트: 2025년 1월*
*버전: 2.0.0 (Next.js 15 환경)*
