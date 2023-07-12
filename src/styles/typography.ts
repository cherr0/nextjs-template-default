import { css } from 'styled-components'
import { StyleRecord } from '~/types/common'

export const noneDraggable = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const typography: StyleRecord<string> = {
  title: css`
    font-size: 18px;
    line-height: 28px;
    font-weight: 700;
  `,
  subtitle_strong: css`
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
  `,
  subtitle: css`
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
  `
}
