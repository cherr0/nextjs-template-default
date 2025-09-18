export const isServer = typeof window === 'undefined'
export const isBrowser = !isServer

export const isDev = process.env.NODE_ENV !== 'production'
export const isProd = !isDev

export const runtimeEnv = {
  NODE_ENV: process.env.NODE_ENV,
}

