# 개발 패턴 상세 가이드

> 단일 소스 안내: 이 문서는 [Single-Source Index](./single-source-index.md)의 'Next.js 패턴' 권위 문서입니다. 중복 섹션은 요약으로 유지하고, 상세 규칙은 본문을 기준으로 합니다.

> 참고: 스타일/테마 및 CSS Modules + SCSS와 관련된 상세 규칙은 `docs/common/customizations.md`를 참조하세요.

## 🚀 기능 추가 워크플로우

### 0. 기능 명세 확인 (필수)
새 기능 개발 시작 전, 프로젝트 요구사항과 관련 문서를 반드시 확인하세요. 이를 통해 구현이 요구사항에 정확히 부합하도록 보장합니다.

- **프로젝트 문서**: `README.md`, `CLAUDE.md`
- **기능별 가이드**: `docs/common/` 폴더 내 관련 문서

### 1. 새 기능 생성

#### Next.js App Router 기반 구조
```
app/
├── (group)/                    # 라우트 그룹
├── dashboard/                  # 기능별 폴더
│   ├── page.tsx               # 페이지 컴포넌트
│   ├── layout.tsx             # 레이아웃
│   ├── loading.tsx            # 로딩 UI
│   └── error.tsx              # 에러 UI
├── api/                       # Route Handlers
│   └── dashboard/
│       └── route.ts
└── actions/                   # Server Actions
    └── dashboard.ts

src/
├── components/features/       # 기능별 컴포넌트
│   └── dashboard/
│       ├── DashboardStats.tsx
│       ├── DashboardChart.tsx
│       └── index.ts
├── hooks/                     # 커스텀 훅
│   └── dashboard/
│       └── use-dashboard.ts
├── lib/api/services/          # API 서비스
│   └── dashboard.service.ts
└── types/                     # 타입 정의
    └── dashboard.ts
```

### 2. 컴포넌트 패턴

#### Server Components (기본)
```typescript
// app/dashboard/page.tsx
import { DashboardStats } from '@/components/features/dashboard/DashboardStats';
import { getDashboardData } from '@/lib/api/services/dashboard.service';

export default async function DashboardPage() {
  // 서버에서 초기 데이터 fetch
  const initialData = await getDashboardData();

  return (
    <div>
      <h1>대시보드</h1>
      <DashboardStats initialData={initialData} />
    </div>
  );
}
```

#### Client Components (상호작용 필요)
```typescript
// src/components/features/dashboard/DashboardStats.tsx
'use client';

import { useState } from 'react';
import { useDashboardStats } from '@/hooks/dashboard/use-dashboard';

interface DashboardStatsProps {
  initialData?: DashboardData;
}

export function DashboardStats({ initialData }: DashboardStatsProps) {
  const [filter, setFilter] = useState('all');
  const { data, isLoading } = useDashboardStats(filter, { initialData });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">전체</option>
        <option value="today">오늘</option>
      </select>
      <div className="stats-grid">
        {data?.stats.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
```

### 3. 폼 구현 패턴

#### Server Actions 활용
```typescript
// app/actions/dashboard.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createReportSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(['daily', 'weekly', 'monthly']),
});

export async function createReport(formData: FormData) {
  const validated = createReportSchema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
    type: formData.get('type'),
  });

  try {
    const report = await db.report.create({
      data: validated,
    });

    revalidatePath('/dashboard');
    return { success: true, data: report };
  } catch (error) {
    return { success: false, error: '리포트 생성에 실패했습니다.' };
  }
}
```

#### React Hook Form + Server Actions
```typescript
// src/components/features/dashboard/CreateReportForm.tsx
'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReport } from '@/app/actions/dashboard';
import { createReportSchema } from '@/lib/validations/dashboard';

export function CreateReportForm() {
  const [state, formAction, isPending] = useActionState(createReport, null);

  const form = useForm({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      title: '',
      content: '',
      type: 'daily',
    },
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title">제목</label>
        <input
          {...form.register('title')}
          className="input"
          disabled={isPending}
        />
        {form.formState.errors.title && (
          <p className="error">{form.formState.errors.title.message}</p>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? '생성 중...' : '리포트 생성'}
      </button>

      {state?.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

### 4. 컴포넌트 배치 규칙
```
서버 컴포넌트 → app/ 디렉토리
클라이언트 컴포넌트 → src/components/
재사용 가능한 UI → src/components/ui/
기능 전용 → src/components/features/{feature}/
레이아웃 → src/components/layout/
폼 → src/components/forms/
```

### 5. 상태 관리 결정 트리
```
서버 데이터 → TanStack Query + Server Components
전역 클라이언트 상태 → Zustand (UI 설정, 테마)
로컬 UI 상태 → useState
폼 상태 → React Hook Form
정적 데이터 → Next.js Cache (ISR/SSG)
```

## Next.js 라우팅 컨벤션

### App Router 패턴
- **페이지**: `page.tsx`
- **레이아웃**: `layout.tsx`
- **로딩**: `loading.tsx`
- **에러**: `error.tsx`
- **404**: `not-found.tsx`

### 동적 라우트
```
app/
├── posts/
│   ├── page.tsx              # /posts
│   └── [slug]/
│       └── page.tsx          # /posts/[slug]
├── dashboard/
│   ├── page.tsx              # /dashboard
│   └── [...segments]/
│       └── page.tsx          # /dashboard/[...segments] (catch-all)
```

### 라우트 그룹
```
app/
├── (dashboard)/              # 그룹 라우트 (URL에 포함 안됨)
│   ├── analytics/
│   └── reports/
├── (auth)/
│   ├── login/
│   └── register/
```

### 병렬 라우트
```
app/
├── @sidebar/                 # 병렬 라우트
├── @main/
└── layout.tsx                # children, sidebar, main props 받음
```

## API 패턴

### Route Handlers
```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  try {
    const posts = await getPosts({ page: parseInt(page) });
    return NextResponse.json({ data: posts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPost = await createPost(body);
    return NextResponse.json({ data: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

### Server Actions
```typescript
// 폼 처리용 Server Actions
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
  // 폼 데이터 처리
  const name = formData.get('name') as string;

  // 데이터베이스 업데이트
  await updateUser({ name });

  // 캐시 무효화
  revalidatePath('/profile');
  revalidateTag('user');
}
```

## 스타일링 시스템

### CSS Modules + SCSS
```scss
// src/components/DashboardCard/DashboardCard.module.scss
.card {
  @apply rounded-lg border p-6 shadow-sm;

  &.loading {
    @apply opacity-50;
  }

  &.error {
    @apply border-red-200 bg-red-50;
  }
}

.title {
  @apply text-lg font-semibold;
}

.content {
  @apply mt-2 text-sm text-gray-600;
}
```

```typescript
// src/components/DashboardCard/DashboardCard.tsx
import { cn } from '@/lib/utils';
import styles from './DashboardCard.module.scss';

interface DashboardCardProps {
  title: string;
  content: string;
  loading?: boolean;
  error?: boolean;
  className?: string;
}

export function DashboardCard({
  title,
  content,
  loading,
  error,
  className
}: DashboardCardProps) {
  return (
    <div className={cn(
      styles.card,
      loading && styles.loading,
      error && styles.error,
      className
    )}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
```

### 테마 시스템
```scss
// src/styles/globals.scss
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
}

[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

## 🛠️ 유틸리티 함수 활용 패턴

### 전역 유틸리티 함수 사용

프로젝트에는 다양한 전역 유틸리티 함수들이 제공됩니다. 일관성을 위해 다음 패턴을 따르세요:

#### 스타일링 유틸리티
```typescript
import { cn } from '@/lib/utils';

// 조건부 클래스 적용
<div className={cn(
  'base-class',
  isActive && 'active-class',
  size === 'large' && 'large-class',
  className
)} />
```

#### 타입 안전한 유틸리티
```typescript
import { z } from 'zod';

// 런타임 타입 검증
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
```

#### Import 패턴
```typescript
// 필요한 함수만 각 파일에서 직접 import
import { cn } from '@/lib/utils';
import { formatDate, formatNumber } from '@/lib/formatters';
import { apiClient } from '@/lib/api/client';
```

## 성능 최적화 패턴

### 코드 분할
```typescript
// 동적 임포트로 코드 분할
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // 클라이언트에서만 렌더링
});
```

### 이미지 최적화
```typescript
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  width={800}
  height={600}
  priority // LCP 이미지인 경우
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 메타데이터 최적화
```typescript
// app/dashboard/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대시보드',
  description: '프로젝트 대시보드 페이지',
  openGraph: {
    title: '대시보드',
    description: '프로젝트 대시보드 페이지',
  },
};
```

## 에러 처리 패턴

### Error Boundaries
```typescript
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>문제가 발생했습니다!</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
```

### Not Found 페이지
```typescript
// app/dashboard/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>페이지를 찾을 수 없습니다</h2>
      <Link href="/dashboard">대시보드로 돌아가기</Link>
    </div>
  );
}
```

**참고**: 유틸리티 사용 원칙은 각 단일 소스 문서와 해당 섹션 요약을 따릅니다.

---

이 가이드는 **Next.js 15 + React + TanStack Query + Zustand** 환경에서 팀 내 코드 일관성과 유지보수성을 높이기 위한 기준이며, 상황에 맞는 유연한 판단이 동반되어야 합니다.

---

*최종 업데이트: 2025년 1월*
*버전: 2.0.0 (Next.js 15 환경)*
