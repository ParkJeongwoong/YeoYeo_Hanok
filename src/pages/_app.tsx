import type { AppProps } from "next/app";
import Head from "next/head";
import '@styles/App.css';
import "@styles/common.scss";
import axios from "axios";
import ScrollToTop from "@components/common/ScrollRestoration";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import "../i18n";
import { useState } from "react";
import Script from "next/script";
import { MediaQueryProvider } from "../hooks/useMediaQuery";
import * as gtag from '../lib/gtag';

axios.defaults.baseURL = "https://api.yeoyeo.co.kr";

function App({ Component, pageProps }: AppProps) {
  const [fadeState, setFadeState] = useState("fade-in");

  const searchKeywords = "경주한옥숙소, 경주여여, 한옥스테이여여, 한옥스테이 여여, 경주 한옥스테이 여여, 경주한옥스테이, 경주한옥스테이여여, 경주한옥펜션,경주한옥숙소,경주힐링펜션,경주힐링한옥,경주조용한펜션";

  const structuredData = {
    "@context": "https://schema.org", // 데이터가 Schema.org 어휘를 사용하여 설명되고 있음을 나타냅니다.
    "@type": ["Hotel","HotelRoom","House","Product"],
    name: "한옥스테이 여여",
    description: "그와 같이 아름다운, 여여(如麗)",
    keywords: searchKeywords,
    url: "https://yeoyeo.co.kr",
    sameAs: [
      "https://www.yeoyeo.co.kr",
      "https://yeoyeo.kr",
      "https://www.yeoyeo.kr",
    ],
    logo: "https://yeoyeo.co.kr/logo192.png",
    publisher: {
      "@type": "Person",
      name: "dvlprjw",
    },
    telephone: "010-8959-9091",
    email: "dvlprjw@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "갯마을길 53",
      addressLocality: "경주시",
      addressRegion: "경상북도",
      postalCode: "38174",
    },
    datePublished: "2023-04-01",
  };
  
  return (
    <>
      <Head>
        <title>한옥스테이 여여</title>
        <link rel="icon" href="/assets/temp/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="subject" content={searchKeywords} />
        <meta name="keywords" content={searchKeywords} />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="그와 같이 아름다운, 여여(如麗)" />
        <meta name="author" content="dvlprjw" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="한옥스테이 여여(如麗)" />
        <meta property="og:description" content="그와 같이 아름다운, 여여(如麗)" />
        <meta property="og:image" content="https://yeoyeo.co.kr/logo192.png" />
        <meta property="og:url" content="https://yeoyeo.co.kr" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className="App">
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* iamport.payment.js */}
        <Script
          strategy="afterInteractive"
          src="https://cdn.iamport.kr/v1/iamport.js"
        />
        <MediaQueryProvider>
          <Header setFadeState={setFadeState} />
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Component {...pageProps} fadeState={fadeState} setFadeState={setFadeState} />
          <Footer />
          <ScrollToTop />
        </MediaQueryProvider>
      </div>
    </>
  );
}

export default App;