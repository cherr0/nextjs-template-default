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

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
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
      <ThemeProvider theme={{}}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate>
            <RecoilRoot>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </RecoilRoot>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
