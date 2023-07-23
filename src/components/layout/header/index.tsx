'use client'

import React from 'react'

import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Logo</h1>
        </div>
        <nav className={styles.nav}>
          {/* 네비게이션 메뉴 */}
        </nav>
      </div>
    </header>
  )
}

export default Header