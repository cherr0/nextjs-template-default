import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo } from 'react'

import { Icon } from './Icon'
import { lucideMap } from './lucide-map'
import { localIcons } from './registry'

type SizeToken = 'xs' | 'sm' | 'md' | 'lg'

const sizeMap: Record<SizeToken, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32
}

const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true }
    // Figma 연동(선택): storybook-addon-designs 사용 시 아래에 Figma 파일 URL 추가
    // designs: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/xxxxxxxx',
    // },
  }
}

export default meta
type Story = StoryObj

const Grid: React.FC<{
  names: string[]
  title: string
  size: number
  color?: string
}> = ({ names, title, size, color }) => {
  return (
    <section style={{ padding: 16 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>{title}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          alignItems: 'center'
        }}
      >
        {names.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 8,
              border: '1px solid #e5e7eb',
              borderRadius: 8
            }}
          >
            <Icon name={name as any} size={size} color={color} />
            <code style={{ fontSize: 12 }}>{name}</code>
          </div>
        ))}
      </div>
    </section>
  )
}

const GalleryStory: React.FC<any> = (args) => {
  const { sizeToken, sizePx, color } = args
  const size = sizePx ?? sizeMap[sizeToken as SizeToken]

  const localNames = useMemo(() => Object.keys(localIcons).sort(), [])
  const lucideNames = useMemo(() => Object.keys(lucideMap).sort(), [])

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: '0 0 16px' }}>Icon Gallery</h2>
      <p style={{ margin: '0 0 24px', color: '#6b7280' }}>
        로컬(Figma) 아이콘이 우선이며, 미존재 시 lucide 폴백을 사용합니다.
      </p>
      <Grid
        names={localNames}
        title={`Local Icons (${localNames.length})`}
        size={size}
        color={color}
      />
      <Grid
        names={lucideNames}
        title={`Lucide Fallback (${lucideNames.length})`}
        size={size}
        color={color}
      />
    </div>
  )
}

export const Gallery: Story = {
  argTypes: {
    sizeToken: {
      control: { type: 'radio' },
      options: ['xs', 'sm', 'md', 'lg']
    },
    sizePx: { control: { type: 'number', min: 8, max: 128, step: 1 } },
    color: { control: 'color' }
  },
  args: {
    sizeToken: 'md',
    sizePx: undefined,
    color: '#111827'
  },
  render: (args: any) => <GalleryStory {...args} />
}
