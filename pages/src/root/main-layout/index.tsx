import React, { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

import { MainContentBox, MainLayoutWrapper } from './style'

import { themeState } from '~/atoms/common'
import AsyncBoundary from '~/common/async-boundary'

interface Props {
  children?: ReactNode
}
const MainLayout = ({ children }: Props) => {
  const theme = useRecoilValue(themeState)

  return (
    <AsyncBoundary>
      <MainLayoutWrapper mode={theme}>
        <MainContentBox>{children}</MainContentBox>
      </MainLayoutWrapper>
    </AsyncBoundary>
  )
}

export default MainLayout
