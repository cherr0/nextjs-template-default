import styled from 'styled-components'

import { darkVariables, lightVariables } from '~/styles/variables'
import { ThemeType } from '~/types/common'

export const MainLayoutWrapper = styled.article<{ mode: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${({ mode }) => (mode === 'light' ? lightVariables : darkVariables)};
`

export const MainContentBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
