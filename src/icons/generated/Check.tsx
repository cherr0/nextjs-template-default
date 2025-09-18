import * as React from 'react'

// 부트스트랩용 샘플 로컬 아이콘 (자동 생성 예시)
// 실제 운영에서는 SVGR 파이프라인으로 생성된 파일만 이 디렉토리에 위치해야 합니다.
const SvgCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={24}
    height={24}
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
)

export default SvgCheck
