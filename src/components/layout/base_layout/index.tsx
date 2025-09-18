'use client'

import React from 'react'

import Footer from '../footer'
import Header from '../header'
import styles from './base_layout.module.scss'

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
    <div className={styles.baseLayout}>
      {showHeader && <Header />}
      <main className={styles.main}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default BaseLayout
