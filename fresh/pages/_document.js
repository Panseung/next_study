import { Html, Head, Main, NextScript } from 'next/document'
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <div className="navbar">
          <Link href="/">home</Link>
          <Link href="/list">list페이지</Link>
          <Link href="/cart">cart페이지</Link>
        </div>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
