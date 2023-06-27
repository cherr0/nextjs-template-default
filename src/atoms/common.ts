import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { ThemeType } from '~/types/common'

const localStorage = typeof window !== 'undefined' ? window.localStorage : null

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage
})

export const themeState = atom<ThemeType>({
  key: 'atomState',
  default: 'light',
  effects_UNSTABLE: [persistAtom]
})
