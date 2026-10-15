import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://yeoyeo.kr";
const ROOM_IMAGE = "/assets/images/room/room_banner1.jpg";

type PageMetadata = {
  key: string;
  image: string;
  imageAlt: string;
  indexable: boolean;
};

const pages: Record<string, PageMetadata> = {
  "/": { key: "home", image: ROOM_IMAGE, imageAlt: "roomBanner", indexable: true },
  "/room/": { key: "room", image: "/assets/images/room/roomA_intro.jpg", imageAlt: "roomAIntro", indexable: true },
  "/service/": {
    key: "service",
    image: "/assets/images/service/service_banner.jpg",
    imageAlt: "serviceBanner",
    indexable: true,
  },
  "/reservation/": { key: "reservation", image: ROOM_IMAGE, imageAlt: "roomBanner", indexable: true },
  "/reservation/check/": { key: "check", image: ROOM_IMAGE, imageAlt: "roomBanner", indexable: false },
  "/reservation/detail/": { key: "detail", image: ROOM_IMAGE, imageAlt: "roomBanner", indexable: false },
};

// Use the router's route pattern rather than asPath: queries and private IDs must
// never appear in canonical URLs, social metadata, or structured data.
export function getPageMetadata(pathname: string) {
  const cleanPath = pathname.split(/[?#]/)[0];
  const path = `${cleanPath.replace(/\/+$/, "")}/`;
  const page = pages[path];
  if (page) return { ...page, canonical: `${SITE_URL}${path}` };
  return {
    key: path.startsWith("/reservation/success/") ? "success" : "notFound",
    image: ROOM_IMAGE,
    imageAlt: "roomBanner",
    indexable: false,
    canonical: null,
  };
}

export default function SEO() {
  const { pathname } = useRouter();
  const { t, i18n } = useTranslation("common");
  const language = i18n.resolvedLanguage === "en" ? "en" : "ko";
  const page = getPageMetadata(pathname);
  const title = String(t(`seo.${page.key}.title`));
  const description = String(t(`seo.${page.key}.description`));
  const image = `${SITE_URL}${page.image}`;
  const imageAlt = String(t(`imageAlt.${page.imageAlt}`));

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: "한옥스테이 여여",
    alternateName: "Hanok Stay YeoYeo",
    url: `${SITE_URL}/`,
    description,
    image,
    logo: `${SITE_URL}/logo192.png`,
    telephone: "+82-10-8959-9091",
    sameAs: ["https://www.instagram.com/yeoyeo9091/"],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="robots" name="robots" content={page.indexable ? "index, follow" : "noindex, follow"} />
      {page.canonical && <link key="canonical" rel="canonical" href={page.canonical} />}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:site_name" property="og:site_name" content={String(t("yeoyeo-normal"))} />
      <meta key="og:locale" property="og:locale" content={language === "en" ? "en_US" : "ko_KR"} />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="og:image:alt" property="og:image:alt" content={imageAlt} />
      {page.canonical && <meta key="og:url" property="og:url" content={page.canonical} />}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={image} />
      <meta key="twitter:image:alt" name="twitter:image:alt" content={imageAlt} />
      {page.key === "home" && (
        <script
          key="lodging-data"
          id="lodging-data"
          type="application/ld+json"
          // Escape '<' so future content cannot terminate the script element.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      )}
    </Head>
  );
}
