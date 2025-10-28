'use client'

import React from 'react'

import { LayoutProps } from '~/types/layout'

const BlankLayout = ({ children }: LayoutProps) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex-1 w-full'>{children}</main>
    </div>
  )
}

export default BlankLayout
