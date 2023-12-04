import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
          <div className='relative flex-col flex w-full justify-center'>
            {/* <Layout> */}
              <Header />
              <Component {...pageProps} />
              <Footer />
            {/* </Layout>  */}
          </div>
  )
}
