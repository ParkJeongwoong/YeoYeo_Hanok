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
  
  return (
    <>
      <Head>
        <title>한옥스테이 여여</title>
        <link rel="icon" href="/assets/temp/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="subject" content="경주여여,한옥스테이여여,경주한옥스테이,경주한옥펜션,경주한옥숙소,경주힐링펜션,경주조용한펜션" />
        <meta name="keywords" content="경주여여,한옥스테이여여,경주한옥스테이,경주한옥펜션,경주한옥숙소,경주힐링펜션,경주조용한펜션" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="그와 같이 아름다운, 여여(如麗)" />
        <meta name="author" content="dvlprjw" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="한옥스테이 여여(如麗)" />
        <meta property="og:description" content="그와 같이 아름다운, 여여(如麗)" />
        <meta property="og:image" content="https://yeoyeo.co.kr/logo192.png" />
        <meta property="og:url" content="https://yeoyeo.co.kr" />
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