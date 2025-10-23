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
