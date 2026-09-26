# AdSense review preparation — 2026-09-27

## Evidence and limits
- AdSense onboarding reports account not approved; no specific violation or site-level code is exposed.
- The September 26 AdSense application email likewise asks for corrections and offers generic content guidance. It does not establish a specific cause, duplicate account, or invalid traffic finding.
- Public app content was mostly interactive/logged-in functionality with no dedicated guide or background page. This is an improvement opportunity, not a confirmed Google rejection cause.
- Ads are not currently served. Existing publisher account meta and ads.txt remain intact.

## Improvements
- /guide: public, server-rendered usage instructions, writing examples, safety guidance, and troubleshooting based on implemented behavior.
- /about: development background supplied by the owner, operator contact and links to policies.
- Footer links and replacement of the unimplemented rewarded-ad teaser with a working guide link.
- robots.txt and sitemap.xml covering public pages only; no private diary/DM content exposed.
- JavaScript-disabled homepage provides links to public information instead of only a loading screen.

## Advertising constraints
- Do not add Google ads to diary/DM screens focused on private communication.
- Ordinary display ad views/clicks must not grant diary/gacha rewards. A supported rewarded product requires separate eligibility and implementation review.
- Do not enable Auto ads globally as part of review preparation. Public informational pages may be considered separately after approval and consent/privacy setup.
- These changes do not guarantee approval or establish an approved advertising placement.

Sources checked:
- https://support.google.com/adsense/answer/81904?hl=ja
- https://support.google.com/adsense/answer/48182?hl=ja
- https://support.google.com/adsense/answer/1346295?hl=ja
- https://support.google.com/adsense/answer/7299563?hl=ja

Validation: typecheck, full test suite, build; public URLs and ads.txt return HTTP 200. Public guide/about text is present in server HTML without login. No ad-serving scripts are included in the app.
