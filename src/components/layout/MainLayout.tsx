'use client'

import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import AsyncBoundary from '~/components/common/AsyncBoundary'
import { useThemeStore } from '~/stores/common'

interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <AsyncBoundary>
      <article className={cn('flex w-full flex-col items-center', theme)}>
        <div className='flex w-full justify-center'>{children}</div>
      </article>
    </AsyncBoundary>
  )
}

export default MainLayout
