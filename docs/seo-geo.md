# SEO and AI-search foundations

## Scope

Update the shared metadata renderer, Korean/English metadata and image descriptions,
public-page semantic headings and internal links, document language, and crawler files.
Keep the current Airbnb reservation links and all existing reservation lookup/cancel
behavior. No production deployment, search-console submissions, account permissions,
DNS/CDN changes, or crawler training-policy changes are part of this work.

## Content boundaries

Use the existing, supported name, Gyeongju Namsan location, room names, and amenities.
Street-address, cooking-policy, and parking discrepancies between channels need owner
verification; do not add these to new descriptive copy or structured data. Existing
visible property details remain unchanged. Do not add reviews, ratings, prices,
availability, or ranking promises.

## Technical approach

- Render one route-aware metadata component in `_app.tsx` for static export and client navigation.
- Use `https://yeoyeo.kr/` and trailing slashes; exclude query strings and fragments.
- Index only the home, room, service, and reservation landing pages in both sitemaps.
- Keep reservation check/detail/success pages crawlable but mark them `noindex, follow`.
  Do not emit a success URL containing a reservation identifier in metadata.
- Keep Korean as the static document language, and update language/metadata with the
  existing English toggle. The toggle is not a separate URL, so do not invent hreflang URLs.
- Describe the property as one `LodgingBusiness`, only on the homepage, with facts
  also available in visible page content. This is entity clarification, not a promise
  of rich results or AI citations.

## Official references reviewed 2026-10-15

- Google: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google canonicals: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Naver: https://searchadvisor.naver.com/guide/markup-content
- Bing: https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/
- OpenAI crawlers: https://developers.openai.com/api/docs/bots

Clear, useful, crawlable content and normal SEO foundations are the focus. No special
`llms.txt` or AI-only markup is added. OAI-SearchBot and GPTBot have different purposes;
the existing allow-all policy is unchanged except for publishing the sitemap location.

## Verification

Run `yarn build`, `yarn next export`, `yarn tsc --noEmit`, `yarn next lint`, and
`yarn test:seo`. The SEO regression script checks the exported HTML without making
network requests. Browser QA must block external requests or use mocks and must not
submit real reservations, cancellations, or payments.

Traffic and AI-citation gains cannot be measured from a code change alone. After an
authorized deployment, compare verified search-console impressions/clicks, indexed
URLs, and analytics referral/booking-link events against a recorded baseline. Search
console setup and submissions require a separate authorized task.

## Validation result (2026-10-15, local feature branch)

- Frozen lockfile dependency install succeeded with lifecycle scripts disabled; the
  project uses the installed Dart Sass package, not the unused node-sass binary.
- `yarn export` (Next build + static export): passed for all nine generated routes.
- `yarn tsc --noEmit`: passed.
- `yarn test:seo`: 404 offline export/component assertions passed, including Korean
  and English metadata, language updates, private URL handling, JSON-LD escaping,
  exported headings, existing Airbnb links, and sitemap/robots consistency.
- Focused lint on changed TypeScript/TSX files: passed with existing alert/console warnings.
- Full `next lint`: two existing accessibility errors in `LinkSelectModal.tsx`.
  Running the same command on unchanged main reproduces both errors. No new lint
  errors remain. Existing Sass `start` support, old Browserslist data, and Next 13
  `next export` deprecation warnings remain outside this scope.
- Validation runtime: Node 24.19.0, Yarn 1.22.22, dependencies from the existing lockfile.
  Deployment CI still specifies Node 18.14.x; CI parity has not been claimed.
- Real-browser mobile/layout, actual language-toggle interactions, and mocked
  lookup/cancel interactions are not verified: standalone cloud Chromium was
  blocked by the execution sandbox, and the supported cloud browser could not
  reach the local preview server. No live reservation/refund calls were made.
  Complete these browser checks before production deployment.

Self-review confirmed that all pre-existing Korean/English property facts and
translations remain unchanged. The address was omitted from the replacement
structured data while the visible address is preserved, pending owner verification.
The reservation title's SCSS selector was updated with its H1 change to retain the
existing appearance. No payment, cancellation, analytics, or deployment logic changed.
