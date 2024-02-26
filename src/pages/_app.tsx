import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { CurrentUserProvider } from '../context/UserContext'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import AppLayout from '../components/Layouts/AppLayout'
import { UpdateUiProvider } from '../context/UpdateContext'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type PageProps = JSX.IntrinsicAttributes

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function renderMain(page) {
      return <AppLayout>{page}</AppLayout>
    }

  return (
    <ChakraProvider>
      <UpdateUiProvider>
        <CurrentUserProvider>
          {renderWithLayout(<Component {...pageProps} />)}
        </CurrentUserProvider>
      </UpdateUiProvider>
    </ChakraProvider>
  )
}
