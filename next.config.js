/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout')

const withTM = require('next-transpile-modules')([])

const nextConfig = withTM({
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Sass에서 src 기준 절대 경로 사용을 허용
  sassOptions: {
    includePaths: ['src']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
})

module.exports = withInterceptStdout(
  {
    ...nextConfig
  },
  (text) =>
    text.includes('non-boolean') ||
    text.includes('Expected server HTML') ||
    text.includes('ECONNREFUSED')
      ? ''
      : text
)
