# PHASE 7 & 7.1 — AURA BOTANICA: CHANGED & CREATED FILES INVENTORY

**Theme:** Aura Botanica — Modern Luxury Skincare  
**Date:** November 4, 2026  
**Phase:** Phase 7 & 7.1 Liquid Repair, Save Conflict Resolution & Independent Verification  

---

## 1. Newly Created Production Theme Files

| File Path | Component | Purpose & Description |
| :--- | :--- | :--- |
| `assets/hero.js` | JavaScript Custom Element | Defines `<m-hero>` controller for background video autoplay, muted audio handling, and parallax integration. |
| `shopify-theme/assets/hero.js` | Mirror Asset | Synchronized copy of `hero.js` in theme mirror directory. |
| `assets/custom.css` | Stylesheet | Clean merchant stylesheet eliminating 404 console errors in `style-tags.liquid`. |
| `shopify-theme/assets/custom.css` | Mirror Asset | Synchronized copy of `custom.css` in theme mirror directory. |
| `sections/image-gallery.liquid` | Modular Section | Complete luxury image gallery grid supporting 2 to 5 columns on desktop, 1 to 2 columns on mobile, resilient CSS grid styles, aspect ratio controls, and presets. Resolved save conflict. |
| `shopify-theme/sections/image-gallery.liquid` | Mirror Section | Synchronized copy of `image-gallery.liquid`. |
| `sections/faq.liquid` | Modular Section | Standalone FAQ section with accessible HTML5 `<details><summary>` accordions, question/answer blocks, and presets. |
| `shopify-theme/sections/faq.liquid` | Mirror Section | Synchronized copy of `faq.liquid`. |
| `snippets/judgeme_widgets.liquid` | Snippet Bridge | Fallback bridge delegating to `mm-judgeme-widgets.liquid` preventing missing asset errors when review app is uninstalled. |
| `shopify-theme/snippets/judgeme_widgets.liquid` | Mirror Snippet | Synchronized copy of `judgeme_widgets.liquid`. |
| `snippets/ssw-widget-avg-rate-listing.liquid` | Snippet Bridge | Fallback bridge for Growave review listings. |
| `shopify-theme/snippets/ssw-widget-avg-rate-listing.liquid` | Mirror Snippet | Synchronized copy of `ssw-widget-avg-rate-listing.liquid`. |
| `snippets/socialshopwave-widget-recommends.liquid`| Snippet Bridge | Fallback bridge for Growave recommendations widget. |
| `shopify-theme/snippets/socialshopwave-widget-recommends.liquid` | Mirror Snippet | Synchronized copy of `socialshopwave-widget-recommends.liquid`. |

---

## 2. Modified & Repaired Production Files

| File Path | Description of Modification |
| :--- | :--- |
| `sections/image-gallery.liquid` | Upgraded markup with scoped inline CSS grid styles for bulletproof responsive rendering; resolved editor save conflict. |
| `shopify-theme/sections/image-gallery.liquid` | Synchronized fix in `shopify-theme/`. |
| `templates/404.json` | Stripped auto-generated `/* ... */` comment block injected by Shopify's editor, restoring standard JSON compliance while preserving merchant customization. |
| `shopify-theme/templates/404.json` | Synchronized fix in `shopify-theme/`. |
| `layout/password.liquid` | Corrected script reference typo from `vendor.min.js` to the existing production `vendor.js`. |
| `shopify-theme/layout/password.liquid` | Synchronized fix in `shopify-theme/`. |
| `snippets/theme-data.liquid` | Corrected parallax asset handler URL from `simple-parallax.js` to the native `parallax.js`. |
| `shopify-theme/snippets/theme-data.liquid` | Synchronized fix in `shopify-theme/`. |
| `snippets/product-form.liquid` | Repaired master variant input: replaced unconditional `disabled` attribute with conditional `{% if product.selected_or_first_available_variant.available == false %}disabled{% endif %}`. |
| `shopify-theme/snippets/product-form.liquid` | Synchronized fix in `shopify-theme/`. |
| `templates/gift_card.liquid` | Removed legacy Dawn stylesheets (`grid.css`, `base.css`, `modules.css`) and linked native Aura stylesheets (`main.css`, `theme.css`). |
| `shopify-theme/templates/gift_card.liquid` | Synchronized fix in `shopify-theme/`. |
| `templates/page.faqs.json` | Removed external CDN image link and generic `Lorem ipsum` clothing copy; implemented genuine Aura Botanica skincare FAQs. |
| `shopify-theme/templates/page.faqs.json` | Synchronized fix in `shopify-theme/`. |
| `aura-skincare-theme.zip` | Rebuilt production archive containing 493 entries (1.01 MB) with 100% POSIX compliance. |

---

## 3. Auditing & Verification Scripts Created

| Script File | Purpose |
| :--- | :--- |
| `scripts/deep-phase7-audit.js` | Comprehensive scanner for sections, snippet calls, asset calls, templates, and section groups. |
| `scripts/audit-sections-deep.js` | Audits existence and line counts of all core sections required by Shopify OS 2.0. |
| `scripts/find-placeholder-content.js` | Scans all JSON templates for external CDN URLs or `Lorem ipsum` placeholder text. |
| `scripts/check-all-assets.js` | Cross-references every `\| asset_url` across all Liquid, JS, and JSON files against `assets/`. |
