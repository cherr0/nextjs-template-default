'use client'

import * as React from 'react'

// 레지스트리(자동 생성 파일)와 lucide 폴백 매핑
import { lucideMap } from './lucide-map'
import { localIcons } from './registry'

// 자동 생성된 타입이 없을 때를 대비한 선언 병합(빌드 전 임시)
// 실제로는 registry.ts에서 LocalIconName이 제공됩니다.
export type LocalIconName = Parameters<typeof getLocalKeys>[0] extends never
  ? never
  : any

// 폴백 및 로컬 합집합 네이밍
export type IconName = keyof typeof localIcons | keyof typeof lucideMap

type SizeToken = 'xs' | 'sm' | 'md' | 'lg'

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'color'> {
  // 사용하려는 아이콘 이름 (로컬 우선, 없으면 lucide 폴백)
  name: IconName
  // 사이즈 토큰 또는 숫자(px)
  size?: SizeToken | number
  // 색상 지정 (기본 currentColor)
  color?: string
  // 접근성 제목(제공 시 role="img")
  title?: string
  className?: string
}

// 사이즈 토큰 매핑
const sizeMap: Record<SizeToken, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32
}

// 유틸: 타입 검사용(런타임 사용 안 함)
function getLocalKeys<T extends Record<string, unknown>>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}

// 서버 컴포넌트 호환 (상태 없음)
export const Icon = ({
  name,
  size = 'md',
  color,
  title,
  className,
  ...rest
}: IconProps) => {
  const pixel = typeof size === 'number' ? size : sizeMap[size]

  // 로컬(사내 SVG 변환) → lucide 폴백 순
  const Local = (localIcons as any)[name]
  const Lucide = (lucideMap as any)[name]
  const Component = Local || Lucide

  // 미존재 아이콘: 폴백이 없다면 아무것도 렌더링하지 않음(개발 중 쉽게 발견)
  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] 아이콘을 찾을 수 없습니다: "${name}"`)
    }
    return null
  }

  type AriaProps = {
    role?: 'img'
    'aria-label'?: string
    'aria-hidden'?: boolean
  }
  const ariaProps: AriaProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true }

  // color prop이 명시적으로 제공될 때만 전달
  const colorProps = color ? { color } : {}

  return (
    <Component
      width={pixel}
      height={pixel}
      {...colorProps}
      focusable={false}
      className={className}
      {...ariaProps}
      {...rest}
    />
  )
}

export default Icon
