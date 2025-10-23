'use client'

import React from 'react'

const Header = () => {
  return (
    <header className='sticky top-0 z-[100] w-full border-b border-border bg-white'>
      <div className='mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-5'>
        <div className='logo'>
          <h1 className='m-0 text-2xl font-bold text-primary'>Logo</h1>
        </div>
        <nav className='flex items-center gap-5'>{/* 네비게이션 메뉴 */}</nav>
      </div>
    </header>
  )
}

export default Header
