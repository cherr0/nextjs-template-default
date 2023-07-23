'use client'

import React from 'react'

import BaseLayout from '../base_layout'
import styles from './page_layout.module.scss'

import { PageLayoutProps } from '~/types/layout'

const PageLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  containerPadding = 'md',
  maxWidth = 'lg'
}: PageLayoutProps) => {
  const containerClasses = [
    styles.container,
    styles[`padding-${containerPadding}`],
    styles[`maxWidth-${maxWidth}`]
  ].join(' ')

  return (
    <BaseLayout showHeader={showHeader} showFooter={showFooter}>
      <div className={containerClasses}>
        {children}
      </div>
    </BaseLayout>
  )
}

export default PageLayout