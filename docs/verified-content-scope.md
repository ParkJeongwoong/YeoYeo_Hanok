# Verified stay content and outbound measurement

## Scope (2026-10-18)

- Extend existing Korean/English homepage copy with the owner-confirmed arrival address
  (경주시 갯마을길 53) and a Jacuzzi sized for two adults. This describes tub size,
  not room occupancy, a swimming pool, natural hot spring, brand, or jet specification.
- Add matching PostalAddress to the existing homepage LodgingBusiness only.
- Improve the existing /room/ overview without making up differences between rooms.
  Existing room photos, floor plans, URL and booking links remain in place.
- Remove cooking-permission implications from both existing room equipment descriptions;
  equipment does not establish a cooking policy.
- Instrument existing Airbnb anchors with room_name and link_location only; never
  mark an outbound click as a paid booking. Do not modify consent or analytics setup.
- Extend offline regression tests and document unresolved facts. No merge/deployment.

Room-specific sizes, capacities, bed arrangements, parking, cooking rules, child
restrictions, tub operating hours/fees and room-specific Jacuzzi availability need
owner confirmation before further publication. Separate room pages are deferred:
current verified text does not establish enough distinct content for useful pages.

## Measurement contract

- Event: `airbnb_booking_click`.
- `room_name`: `yeoyu` (여유 / yeoyeo1) or `yeohaeng` (여행 / yeoyeo2).
- `link_location`: `reservation_page` or `booking_modal`.
- The same fixed room labels are used in Korean and English. No guest identifiers,
  booking IDs, destination query strings, or personal details are added by this event.
- Anchors keep their original href and browser behavior. There is no preventDefault,
  wait, callback redirect, or navigation dependency on GA. Missing/throwing analytics
  is ignored. Beacon transport is best effort; delivery is not guaranteed.
- This is an outbound-interest event, not `purchase`, confirmed revenue, or a verified
  Airbnb reservation. No GA admin settings, custom dimensions, key-event flags, or
  consent behavior are changed. Existing GA installation remains responsible for
  analytics initialization and user consent.
- After an authorized deployment, verify both rooms from both link locations in GA4
  DebugView/Realtime with the appropriate consent. If detailed reports are desired,
  separately configure event-scoped custom dimensions for these two parameters.
  Compare click counts by room and location with search/referral traffic, keeping
  completed Airbnb bookings as a separate data source.

## Validation

Commands use the installed lockfile dependencies (no dependency changes):
`npm run export`, `node node_modules/typescript/bin/tsc --noEmit`,
`npm run test:seo`, `npm run test:booking-analytics`, and Next lint.

The `/room/` canonical and both sitemaps intentionally stay unchanged: there are no
new indexable routes. Regression tests cover exact sitemap membership, canonical
normalization, both languages, schema/address visibility, and retained booking links.

### Results (2026-10-18)

- Production build and static export passed (nine routes).
- TypeScript `--noEmit` passed.
- 409 offline SEO/export/component assertions and 30 offline booking-analytics
  assertions passed. No real analytics events or reservations were submitted.
- Independent source review found no blocking issues; locale keys match.
- Focused lint passed for changed implementation files other than the modal's
  existing errors (one existing console warning in the room page).
- Full lint still fails on two existing accessibility errors on the modal backdrop
  in `LinkSelectModal.tsx:32`; both reproduce on the unchanged foundation checkout.
  The modal change here only supplies a fixed analytics placement prop.
- Existing Sass/autoprefixer, stale Browserslist and Next export deprecation warnings
  remain. Node runtime is 24.19.0; Node 18 deployment-CI parity is not claimed.
- Real mobile visual QA is unverified: dot's cloud browser could not access the local
  preview (connection error, followed by a browser URL-policy denial). No user
  computer was used and no alternate route around the denial was attempted.
  Mobile layout and live GA delivery must be checked before/after authorized release
  as appropriate. No merge or production deployment was performed.

Source baseline: all 180 tracked blobs in the local foundation checkout matched the
recursive GitHub tree for latest main `bc24f06fb762da34e0c0bfab15a6222c9379f35f`.
The new remote commit is parented to that exact main commit, preserving prior work.
