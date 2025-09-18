module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:storybook/recommended',
    'next',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    // react
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function'
      }
    ],

    // next
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@next/next/no-img-element': 'off',
    'simple-import-sort/exports': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        'newlines-between': 'always'
      }
    ],
    // 아이콘 정책
    // 1) 원시 svg 직접 임포트 금지 (자동 생성 디렉토리/아이콘 컴포넌트 내부는 예외 오버라이드)
    // 2) lucide-react 직접 임포트 금지 (Icon 컴포넌트 내부는 예외 오버라이드)
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lucide-react',
            message:
              'lucide-react를 앱 코드에서 직접 임포트하지 마세요. 아이콘은 반드시 <Icon name=...>을 사용하세요.'
          }
        ],
        patterns: [
          {
            group: ['**/*.svg'],
            message:
              '원시 SVG 파일을 직접 임포트하지 마세요. 아이콘은 src/icons/raw 에 추가 후 빌드하여 src/icons/generated 사용 또는 <Icon> 사용.'
          }
        ]
      }
    ]
  },
  overrides: [
    {
      env: {
        jest: true
      },
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [
          'off',
          { devDependencies: ['**/?(*.)+(spec|test).[jt]s?(x)'] }
        ]
      }
    },
    // 예외: 아이콘 인프라 디렉토리에서는 위 제한 해제
    {
      files: ['src/components/Icon/**/*', 'src/icons/generated/**/*'],
      rules: {
        'no-restricted-imports': 'off'
      }
    }
  ],
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo'
  ]
}
