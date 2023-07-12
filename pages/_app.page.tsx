import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRef } from 'react'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'

import MainLayout from './src/root/main-layout'

import GlobalStyle from '~/styles/global-style'
import { defaultTheme } from '~/styles/theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true,
          refetchOnWindowFocus: false
        }
      }
    })
  }

  return (
    <>
      <Head>
        <title>page title</title>
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate>
            <RecoilRoot>
              <GlobalStyle />
              <MainLayout>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </MainLayout>
            </RecoilRoot>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
