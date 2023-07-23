import { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export interface PageLayoutProps extends LayoutProps {
  showHeader?: boolean
  showFooter?: boolean
  containerPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'