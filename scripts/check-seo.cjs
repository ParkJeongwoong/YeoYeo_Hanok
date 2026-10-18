/* Offline regression checks. Run after next build && next export. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const source = fs.readFileSync("src/utils/seo.tsx", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
let renderedPath = "/";
let renderedLanguage = "ko";
const document = { documentElement: { lang: "ko" } };
const translations = Object.fromEntries(
  ["ko", "en"].map((language) => [
    language,
    JSON.parse(fs.readFileSync(`src/i18n/locales/${language}/common.json`, "utf8")),
  ]),
);
const sandbox = {
  exports: {},
  document,
  require: (name) => {
    if (name === "next/head")
      return { __esModule: true, default: ({ children }) => React.createElement(React.Fragment, null, children) };
    if (name === "next/router") return { useRouter: () => ({ pathname: renderedPath }) };
    if (name === "react") return { useEffect: (callback) => callback() };
    if (name === "react-i18next")
      return {
        useTranslation: () => ({
          i18n: { resolvedLanguage: renderedLanguage },
          t: (key) => key.split(".").reduce((value, part) => value?.[part], translations[renderedLanguage]),
        }),
      };
    return require(name);
  },
};
vm.runInNewContext(compiled, sandbox);
const { getPageMetadata } = sandbox.exports;
const publicRoutes = ["/", "/room/", "/service/", "/reservation/"];
const privateRoutes = ["/reservation/check/", "/reservation/detail/"];
const origin = "https://yeoyeo.kr";
let checks = 0;

function check(value, message) {
  assert.ok(value, message);
  checks += 1;
}

function tags(html, tag) {
  return html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) || [];
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
}

function meta(html, name) {
  return tags(html, "meta").filter((tag) => attribute(tag, "name") === name || attribute(tag, "property") === name);
}

function canonical(html) {
  return tags(html, "link").filter((tag) => attribute(tag, "rel") === "canonical");
}

const titles = new Set();
const descriptions = new Set();
for (const route of [...publicRoutes, ...privateRoutes]) {
  const expected = `${origin}${route}`;
  for (const variation of [
    route,
    route.replace(/\/$/, "") || "/",
    `${route}?utm_source=test&reservationId=private#section`,
  ]) {
    const metadata = getPageMetadata(variation);
    check(metadata.canonical === expected, `Canonical normalization: ${variation}`);
    check(metadata.indexable === publicRoutes.includes(route), `Indexability: ${variation}`);
  }
  const html = fs.readFileSync(path.join("out", route, "index.html"), "utf8");
  check(
    tags(html, "html").some((tag) => attribute(tag, "lang") === "ko"),
    `Static language: ${route}`,
  );
  check((html.match(/<title>/g) || []).length === 1, `One title: ${route}`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  check(title && !titles.has(title), `Unique title: ${route}`);
  titles.add(title);
  check(
    canonical(html).length === 1 && attribute(canonical(html)[0], "href") === expected,
    `One correct canonical: ${route}`,
  );
  for (const name of [
    "description",
    "og:title",
    "og:description",
    "og:type",
    "og:site_name",
    "og:url",
    "og:image",
    "og:image:alt",
    "og:locale",
    "robots",
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ]) {
    check(meta(html, name).length === 1, `One ${name}: ${route}`);
  }
  const description = attribute(meta(html, "description")[0], "content");
  check(description && !descriptions.has(description), `Unique description: ${route}`);
  descriptions.add(description);
  check(attribute(meta(html, "og:url")[0], "content") === expected, `OG URL: ${route}`);
  check(attribute(meta(html, "og:title")[0], "content") === title, `OG title: ${route}`);
  check(attribute(meta(html, "og:description")[0], "content") === description, `OG description: ${route}`);
  check(
    attribute(meta(html, "robots")[0], "content") ===
      (publicRoutes.includes(route) ? "index, follow" : "noindex, follow"),
    `Robots: ${route}`,
  );
  const image = attribute(meta(html, "og:image")[0], "content");
  check(
    image.startsWith(`${origin}/`) && fs.existsSync(path.join("public", image.slice(origin.length))),
    `Existing absolute image: ${route}`,
  );
  if (publicRoutes.includes(route)) {
    check(tags(html, "h1").length === 1, `One page H1: ${route}`);
    check(tags(html, "main").length === 1, `Main landmark: ${route}`);
  }
  check(!/<footer[\s\S]*?<h1[\s\S]*?<\/footer>/.test(html), `Footer is not an H1: ${route}`);
  if (route !== "/") check(!html.includes("application/ld+json"), `No duplicate property entity: ${route}`);
}

const home = fs.readFileSync("out/index.html", "utf8");
const jsonld = [...home.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
check(jsonld.length === 1, "One homepage JSON-LD entity");
const entity = JSON.parse(jsonld[0][1]);
check(
  entity["@type"] === "LodgingBusiness" && entity["@id"] === `${origin}/#lodging`,
  "One stable LodgingBusiness entity",
);
check(entity.url === `${origin}/` && entity.name === "한옥스테이 여여", "Factual property name and URL");
for (const key of ["aggregateRating", "review", "offers", "priceRange", "starRating"])
  check(!(key in entity), `No unverified ${key}`);
check(entity.address?.["@type"] === "PostalAddress", "Verified PostalAddress type");
check(entity.address.streetAddress === "갯마을길 53" && entity.address.addressLocality === "경주시" && entity.address.addressRegion === "경상북도" && entity.address.addressCountry === "KR", "Owner-confirmed guest arrival address");
check(home.includes("경주시 갯마을길 53"), "Address is visible as well as structured");
check(home.includes("성인 두 명") && home.includes("자쿠지"), "Factual Jacuzzi size visible on homepage");
check(fs.readFileSync("out/service/index.html", "utf8").includes("성인 두 명"), "Service page describes tub size");
check(fs.readFileSync("out/room/index.html", "utf8").includes("여유와 여행, 두 객실 둘러보기"), "Room overview is exported");
for (const route of publicRoutes.slice(1))
  check(
    tags(home, "a").some((tag) => attribute(tag, "href") === route),
    `Crawlable home link: ${route}`,
  );

for (const route of ["/reservation/success/[reservationId]", "/reservation/success/test-private-id?customer=example"]) {
  const data = getPageMetadata(route);
  check(data.key === "success" && !data.indexable && data.canonical === null, `Private success metadata: ${route}`);
}
check(
  !getPageMetadata("/missing/").indexable && getPageMetadata("/missing/").canonical === null,
  "Unknown paths are not indexed or canonicalized to home",
);
const successFile = "out/reservation/success/[reservationId]/index.html";
check(fs.existsSync(successFile), "Existing static success route is exported");
const success = fs.readFileSync(successFile, "utf8");
check(
  meta(success, "robots").length === 1 && attribute(meta(success, "robots")[0], "content") === "noindex, follow",
  "Success is noindex, follow",
);
check(
  canonical(success).length === 0 && meta(success, "og:url").length === 0,
  "Success has no reservation identifier or route placeholder in URL metadata",
);

const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(
  sitemapUrls,
  publicRoutes.map((route) => `${origin}${route}`),
);
checks += 1;
check(sitemap === fs.readFileSync("out/sitemap_kr.xml", "utf8"), "Legacy sitemap remains aligned");
const robots = fs.readFileSync("out/robots.txt", "utf8");
check(/^Sitemap: https:\/\/yeoyeo\.kr\/sitemap\.xml$/m.test(robots), "Sitemap is discoverable");
check(
  !/^Disallow:/m.test(robots) && /^Allow: \/$/m.test(robots),
  "Noindex pages remain crawlable; bot policy unchanged",
);
const reservation = fs.readFileSync("out/reservation/index.html", "utf8");
for (const url of ["https://airbnb.co.kr/h/yeoyeo1", "https://airbnb.co.kr/h/yeoyeo2", "/reservation/check/"]) {
  check(
    tags(reservation, "a").some((tag) => attribute(tag, "href") === url),
    `Booking link preserved: ${url}`,
  );
}
for (const language of ["ko", "en"]) {
  const translations = JSON.parse(fs.readFileSync(`src/i18n/locales/${language}/common.json`, "utf8"));
  for (const key of ["home", "room", "service", "reservation", "check", "detail", "success", "notFound"]) {
    check(translations.seo[key].title && translations.seo[key].description, `${language} metadata exists: ${key}`);
  }
}
// Render the real component in both languages with isolated router/translation
// hooks. This is a component check, not a replacement for real-browser layout QA.
for (const language of ["ko", "en", "ko"]) {
  renderedLanguage = language;
  for (const route of [...publicRoutes, ...privateRoutes, "/reservation/success/[reservationId]"]) {
    renderedPath = route;
    const html = renderToStaticMarkup(sandbox.exports.default());
    const data = getPageMetadata(route);
    check(document.documentElement.lang === language, `${language} document language effect: ${route}`);
    check(
      meta(html, "og:locale").length === 1 &&
        attribute(meta(html, "og:locale")[0], "content") === (language === "ko" ? "ko_KR" : "en_US"),
      `${language} rendered locale: ${route}`,
    );
    check(
      attribute(meta(html, "description")[0], "content") === translations[language].seo[data.key].description,
      `${language} rendered description: ${route}`,
    );
    check(
      attribute(meta(html, "robots")[0], "content") === (data.indexable ? "index, follow" : "noindex, follow"),
      `${language} rendered index policy: ${route}`,
    );
    check((html.match(/<title>/g) || []).length === 1, `${language} one rendered title: ${route}`);
    check(canonical(html).length === (data.canonical ? 1 : 0), `${language} canonical count: ${route}`);
    if (data.canonical)
      check(attribute(canonical(html)[0], "href") === data.canonical, `${language} canonical preserved: ${route}`);
    if (route !== "/")
      check(!html.includes("application/ld+json"), `${language} only home gets property schema: ${route}`);
  }
}
renderedPath = "/";
const originalDescription = translations.ko.seo.home.description;
translations.ko.seo.home.description = "</script><script>unsafe</script>";
const escaped = renderToStaticMarkup(sandbox.exports.default());
const escapedJson = escaped.match(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
check(escapedJson && !escapedJson.includes("<"), "Structured data escapes script-ending text");
check(
  JSON.parse(escapedJson).description === translations.ko.seo.home.description,
  "Escaped structured data preserves valid JSON",
);
translations.ko.seo.home.description = originalDescription;

console.log(`Passed ${checks} offline SEO/export/component regression checks.`);
