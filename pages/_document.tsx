import { Html, Head, Main, NextScript } from 'next/document'
import Document from 'next/document'
import {ServerStyleSheet} from "styled-components";

export default function MyDocument() {
  return (
    <Html lang="ru">
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// fix styled components flicker on load
// https://stackoverflow.com/questions/74242349/styles-take-time-to-load-next-js/74244275#74244275
MyDocument.getInitialProps = async function (ctx: any) {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheet.collectStyles(<App {...props} />),
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [initialProps.styles, sheet.getStyleElement()],
    }
  } finally {
    sheet.seal()
  }
}
