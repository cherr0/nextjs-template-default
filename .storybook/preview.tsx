import React from 'react'
import type { Parameters, Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../src/styles/globals.css'

const decorator = (Story: any) => <Story />

const parameters: Parameters = {
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.normal }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  viewport: {
    viewports: {
      '768px': {
        name: 'Desktop 768px',
        styles: {
          width: '768px',
          height: '100%'
        }
      },
      '480px': {
        name: 'Desktop 480px',
        styles: {
          width: '480px',
          height: '100%'
        }
      },
      '360px': {
        name: 'Desktop 360px',
        styles: {
          width: '360px',
          height: '100%'
        }
      },
      ...INITIAL_VIEWPORTS
    }
  }
}

const preview: Preview = {
  parameters,
  decorators: [decorator]
}

export default preview
