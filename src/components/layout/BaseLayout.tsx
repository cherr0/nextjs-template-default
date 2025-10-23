'use client'

import React from 'react'

import Footer from './Footer'
import Header from './Header'

import { LayoutProps } from '~/types/layout'

interface BaseLayoutProps extends LayoutProps {
  showHeader?: boolean
  showFooter?: boolean
}

const BaseLayout = ({
  children,
  showHeader = true,
  showFooter = true
}: BaseLayoutProps) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      {showHeader && <Header />}
      <main className='flex-1 w-full'>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default BaseLayout
