import type { Config } from 'tailwindcss'
// eslint-disable-next-line import/no-unresolved
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // CVA variants도 포함하여 purge 방지
    './src/lib/cva.ts'
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors (HEX 기반)
        background: '#FFFFFF',
        foreground: '#121212',

        primary: {
          DEFAULT: '#F97316', // orange
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#808080',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#F7F7F7',
          foreground: '#212121'
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#737373'
        },
        border: '#D6D6D6',
        input: '#D6D6D6',
        ring: '#F97316',

        // 브랜드 색상
        orange: '#F97316',
        black: {
          DEFAULT: '#121212',
          '02': '#161616',
          sub: '#808080'
        },
        white: '#FFFFFF',

        // Background colors
        'bg-black': '#292929',
        'bg-gray': '#F7F7F7',

        // Line colors
        'line-gray': '#D6D6D6'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)'
      },
      fontFamily: {
        // Primary fonts (메인 폰트)
        primary: ['var(--font-primary)'],
        'primary-en': ['var(--font-primary-en)'],

        // Legacy aliases (하위 호환성)
        kor: ['var(--font-kor)'],
        eng: ['var(--font-eng)'],

        // Secondary fonts (서브 폰트)
        secondary: ['var(--font-secondary)'],
        accent: ['var(--font-accent)'],

        // Specialized fonts (특수 용도)
        mono: ['var(--font-mono)']
      },
      screens: {
        mobile: { max: '1280px' },
        desktop: { min: '1281px' }
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)'
      },
      fontSize: {
        // Typography 시스템 - 기존 @utility를 대체
        title: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'subtitle-strong': [
          '0.875rem',
          { lineHeight: '1.5rem', fontWeight: '700' }
        ],
        subtitle: ['0.875rem', { lineHeight: '1.5rem', fontWeight: '500' }]
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out'
      }
    }
  },
  plugins: [
    // 커스텀 유틸리티 클래스 정의
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke': {
          color: 'transparent',
          '-webkit-text-stroke': '1px hsl(var(--orange))'
        },
        '.no-drag': {
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none'
        }
      }
      addUtilities(newUtilities)
    })
  ]
}

export default config
