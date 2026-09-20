import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID
const UMAMI_URL = (process.env.NEXT_PUBLIC_UMAMI_URL || 'https://analytics.umami.is').replace(/\/$/, '')

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {UMAMI_ID && (
        <Script
          async
          src={`${UMAMI_URL}/script.js`}
          data-website-id={UMAMI_ID}
          strategy="afterInteractive"
        />
      )}
            <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SQLFix" />
        <meta property="og:description" content="SQLFix turns a plain-English question into a correct, dialect-aware SQL query with a plain explanation. Every generated query is screened by a deterministic safety ruleset (injection, DROP without WHERE, dangerous UPDATE/DELETE, syntax) before you copy it." />
        <meta property="og:url" content="https://sqlfix.lxsaihub.com/" />
        <meta property="og:image" content="https://sqlfix.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SQLFix" />
        <meta name="twitter:description" content="SQLFix turns a plain-English question into a correct, dialect-aware SQL query with a plain explanation. Every generated query is screened by a deterministic safety ruleset (injection, DROP without WHERE, dangerous UPDATE/DELETE, syntax) before you copy it." />
        <meta name="twitter:image" content="https://sqlfix.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"SQLFix","url":"https://sqlfix.lxsaihub.com/","description":"SQLFix turns a plain-English question into a correct, dialect-aware SQL query with a plain explanation. Every generated query is screened by a deterministic safety ruleset (injection, DROP without WHERE, dangerous UPDATE/DELETE, syntax) before you copy it.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
    </>
  )
}
