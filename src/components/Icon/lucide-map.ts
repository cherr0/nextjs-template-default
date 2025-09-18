import {
  Check,
  Info,
  AlertTriangle,
  X,
  Plus,
  Minus,
  Search,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  CircleX
} from 'lucide-react'
import type { SVGProps } from 'react'

// lucide-react 폴백 아이콘: 최소 셋만 선별 임포트
export const lucideMap = {
  check: Check,
  info: Info,
  warning: AlertTriangle,
  error: CircleX,
  close: X,
  plus: Plus,
  minus: Minus,
  search: Search,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  help: HelpCircle
} as const

export type LucideIconName = keyof typeof lucideMap
export type LucideIconComponent = (
  props: SVGProps<SVGSVGElement>
) => JSX.Element
