# Production launch checklist

- [ ] Replace every `assets/demo/` hero/gallery illustration with owner-controlled photography.
- [ ] Verify commercial image rights and parent/guardian releases for identifiable minors.
- [ ] Owner reconfirms phone, address, hours, licensed age range and license number.
- [ ] Owner confirms any additional programs before they are added.
- [ ] Owner confirms any tuition, financial assistance, meal or transportation claims before they are added.
- [ ] Confirm final production hostname and update canonical, Open Graph URL/image URL, and sitemap URLs to absolute production URLs.
- [ ] Confirm final public inquiry email or connect a reviewed form endpoint.
- [ ] Update privacy page if analytics, cookies, embedded maps, hosted forms, scheduling tools, or other third-party services are introduced.
- [ ] Add social links only after official profiles are verified.
- [ ] Run `python scripts/validate.py` and all `node --check js/*.js` checks after final content/assets are installed.
- [ ] Re-run desktop/mobile screenshots and browser accessibility smoke checks.
- [ ] Validate Schema.org JSON-LD using the deployed public URL.
- [ ] Obtain owner sign-off on final text, photography, hours, programs, contact information and license display.
