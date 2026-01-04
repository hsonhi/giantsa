import { ReactElement, ReactNode } from 'react'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google'

import dayjs from 'dayjs'

import 'dayjs/locale/pt'

import '@/styles/globals.css'
import { Toast } from '@/components/UI/Toast'

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
})

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P & any,
  IP
> & {
  getLayout: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any>
}

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  dayjs.locale('pt')

  return (
    <>
      <Toast />
      {getLayout(
        <main className={`w-full ${spaceGrotesk.className}`}>
          <Component {...pageProps} />
        </main>,
      )}
    </>
  )
}
