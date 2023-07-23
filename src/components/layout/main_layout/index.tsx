'use client'

import React, { ReactNode } from 'react'

import styles from './main_layout.module.scss'

import AsyncBoundary from '~/components/common/async_boundary'
import { useThemeStore } from '~/stores/common'

interface Props {
  children?: ReactNode
}
const MainLayout = ({ children }: Props) => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <AsyncBoundary>
      <article className={`${styles.mainLayoutWrapper} ${styles[theme]}`}>
        <div className={styles.mainContentBox}>{children}</div>
      </article>
    </AsyncBoundary>
  )
}

export default MainLayout
