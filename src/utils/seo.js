import Head from "next/head";

export default function SEO({ description, title, siteTitle }) {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <link rel="icon" href="/myLogo_transp.png" />
    </Head>
  );
}
