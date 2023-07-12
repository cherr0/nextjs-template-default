import type { Args, Parameters, Preview, ReactRenderer } from '@storybook/react'
import { ThemeProvider, themes } from '@storybook/theming'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { defaultTheme } from '~/styles/theme'
import GlobalStyle from '~/styles/global-style'
import { DecoratorFunction } from '@storybook/types'
import { Simplify } from 'type-fest'

const decorator: DecoratorFunction<ReactRenderer, Simplify<Args>> = (Story) => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <Story />
  </ThemeProvider>
)

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
