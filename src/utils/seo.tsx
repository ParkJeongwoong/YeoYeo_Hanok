import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  siteTitle: string;
}

export default function SEO({ title, description, siteTitle }: SEOProps) {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
    </Head>
  );
}
