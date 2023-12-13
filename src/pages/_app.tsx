import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {NextIntlClientProvider } from 'next-intl'

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
