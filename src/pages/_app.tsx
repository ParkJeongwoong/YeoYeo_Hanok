import type { AppProps } from "next/app";
import Head from "next/head";
import SEO from "src/utils/seo";
import '@styles/App.css';
import "@styles/common.scss";
import axios from "axios";
import ScrollToTop from "@components/common/ScrollRestoration";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import MasterBtn from "@components/v2/master_btn";
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
        <link rel="icon" href="/assets/temp/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="dvlprjw" />
        <meta name="naver-site-verification" content="d932cb4fe0d3d9db6dcc599c97f8e580eb769338" />
        <meta name="naver-site-verification" content="e99d8fbe7868187b90e8afefe7a4595f55da7b31" />
      </Head>
      <SEO />
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
        <MediaQueryProvider>
          <Header setFadeState={setFadeState} />
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Component {...pageProps} fadeState={fadeState} setFadeState={setFadeState} />
          <MasterBtn {...pageProps} fadeState={fadeState} setFadeState={setFadeState} />
          <Footer />
          <ScrollToTop />
        </MediaQueryProvider>
      </div>
    </>
  );
}

export default App;
