# Rewarded ads follow-up

Status checked 2026-09-23: AdSense site kotonoha-post.pages.dev is pending review. The owner confirmed the approval notice was a misunderstanding. No live ads or ad rewards were enabled in this change.

Requested rewards to implement after eligibility and integration are confirmed:
- Anonymous diary: one additional diary that day after completing one rewarded ad (the existing two-entry bonus limit).
- Sticker gacha: one additional draw per completed rewarded ad, up to three per Japan calendar day. This daily interpretation was communicated to the owner.
- Use an actual reward-capable ad format with a completion event; never infer completion from a timer, display impression, or ad click. Keep normal free use available when ads are unavailable or dismissed.
- Confirm suitable Google Ad Manager rewarded-web inventory / configuration or an officially supported AdSense integration before implementation. AdSense Offerwall grants content access; it does not by itself implement these app-specific rewards.
- Persist claims and daily limits atomically, bind grants to the signed-in account, handle retries, midnight, unavailable ads and dismissal; show exact rewards and random-item details before opt-in.

References:
https://developers.google.com/publisher-tag/samples/display-rewarded-ad
https://support.google.com/adsense/answer/12726063?hl=ja
https://support.google.com/adsense/answer/9121589?hl=en
