import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ThemeType } from '~/types/common'

interface ThemeStore {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage'
    }
  )
)