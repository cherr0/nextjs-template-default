import { css } from 'styled-components'

export type ThemeType = 'light' | 'dark'

export type StyleRecord<T extends string> = Record<T, ReturnType<typeof css>>

export type OptionalStyleRecord<T extends string> = Partial<StyleRecord<T>>
