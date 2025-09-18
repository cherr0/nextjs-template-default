import * as React from 'react'

// 자동 변환된 예시: kebab.svg → React 컴포넌트
const SvgKebab = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <circle cx={12} cy={5} r={2} fill='currentColor' />
    <circle cx={12} cy={12} r={2} fill='currentColor' />
    <circle cx={12} cy={19} r={2} fill='currentColor' />
  </svg>
)

export default SvgKebab
