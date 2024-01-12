import type { AppProps } from 'next/app'
import {PrimaryLayout} from "@/components/layouts/primary";
import {GlobalStyle} from "@/styles/globals";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<PrimaryLayout>
    <GlobalStyle />
    <Component {...pageProps} />
  </PrimaryLayout>)
}
