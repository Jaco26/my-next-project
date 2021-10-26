import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ScrollProvider } from '@/providers/scroll-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  )

}
export default MyApp
