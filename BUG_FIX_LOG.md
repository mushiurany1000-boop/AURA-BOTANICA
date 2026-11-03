# AURA BOTANICA — BUG FIX LOG (BUG_FIX_LOG.md)

**Product:** Aura Botanica Luxury Skincare Theme (OS 2.0)  
**Version:** 5.3.0  
**Phase:** Phase 4 Critical Repair, 404 Fix & Full Functional Audit  
**Date:** November 3, 2026  

---

## 1. Resolved Defects & Architectural Fixes

### BUG-001: Red Banner Error in Theme Customizer
- **Severity:** CRITICAL (Blocker for Theme Editor)
- **Symptom:** Theme Customizer displayed a persistent red banner: *"To preview your changes, color schemes must be defined in settings_data and settings_schema files"* and Announcement bar displayed *"Unable to display color schemes. Schemes must be defined in settings_data and settings_schema."*
- **Root Cause:** Older drafts of `settings_data.json` contained 4 undeclared legacy keys (`enable_page_transition`, `show_variant_swatch_image`, `use_theme_currencies`, `theme_currencies`) and lacked the full 8 color palettes required by the `color_scheme_group` definition in `settings_schema.json`. When Shopify encounters schema mismatches, it drops the entire color scheme registry and renders the customizer non-functional.
- **Resolution:**
  1. Pruned all 4 undeclared legacy keys from `settings_data.json`.
  2. Defined all 8 color palettes (`default`, `dark`, `footer`, `badge-hot`, `badge-new`, `badge-sale`, plus 2 UUID schemes).
  3. Included all 18 mandatory definition tokens in every palette (`background`, `background_secondary`, `background_gradient`, `text`, `subtext`, `heading_text`, `button`, `button_label`, `outline_button_label`, `button_hover`, `button_text_hover`, `price_sale`, `price_regular`, `form_field`, `form_field_label`, `tooltip`, `tooltip_label`, `border`).
  4. Configured luxury tokens: Silk Ivory `#FCFBF7`, Deep Forest Green `#18231F`, Muted Sage `#5C6B61`, Soft Sand `#F4EFE6`, and Muted Copper `#B9784D`.
- **Files Modified:** `shopify-theme/config/settings_data.json`, `config/settings_data.json`.
- **Verification:** Verified in `scripts/test-theme-editor-deep.js` (8/8 schemes with 18 tokens pass).

---

### BUG-002: Storefront Rendered Completely Unstyled in Live Preview
- **Severity:** CRITICAL
- **Symptom:** The live preview iframe showed raw HTML with unstyled blue links, default serif fonts, and stacked unformatted images.
- **Root Cause:** When the theme customizer crashed due to the color scheme schema parsing failure (BUG-001), Shopify halted CSS compilation and asset injection in the live preview iframe. Additionally, `assets/theme.css` was missing responsive media queries and focus ring definitions.
- **Resolution:**
  1. Resolved BUG-001 so Shopify's customizer compiler succeeds.
  2. Injected required responsive media queries into `assets/theme.css` and `shopify-theme/assets/theme.css`:
     - `@media (max-width: 480px)` (Mobile layout)
     - `@media (min-width: 481px) and (max-width: 768px)` (Tablet layout)
     - `@media (min-width: 769px) and (max-width: 1024px)` (Small desktop layout)
     - `@media (min-width: 1440px)` (Wide desktop layout)
     - `:focus-visible { outline: 2px solid #B9784D; outline-offset: 2px; }` (WCAG 2.1 AA focus ring)
     - `aspect-ratio: 4/5` (CLS ratio lock)
  3. Verified `layout/theme.liquid` loads `main.css`, `style-tags.liquid`, `aura-custom.css`, and `theme.css`.
- **Files Modified:** `assets/theme.css`, `shopify-theme/assets/theme.css`, `layout/theme.liquid`.
- **Verification:** Verified via `scripts/test-phase6-responsive.js` (Section 2: 100% PASS).

---

### BUG-003: Missing Defaults for 126 Optional Schema Settings
- **Severity:** HIGH
- **Symptom:** Deep theme editor testing identified 126 declared inputs in `settings_schema.json` without default entries in `current` of `settings_data.json` (such as image pickers, swatch images `filter_color1.png` to `filter_color50.png`, and optional social links).
- **Root Cause:** Optional settings were omitted from `current`, which could result in `null` reference errors when accessed via Liquid without fallback filters.
- **Resolution:** Populated default values (or empty strings `""` for optional image pickers) for all 126 settings in `settings_data.json`. Total settings in `current` increased from 155 to 281.
- **Files Modified:** `shopify-theme/config/settings_data.json`, `config/settings_data.json`.
- **Verification:** Verified via `scripts/test-theme-editor-deep.js` (24/24 checks pass, 100%).

---

### BUG-004: Prohibited Development File in Theme ZIP Archive
- **Severity:** MEDIUM
- **Symptom:** ZIP archive verification script flagged `assets/.gitkeep` present inside the production ZIP file.
- **Root Cause:** `.gitkeep` was originally placed to track the empty assets directory during initial repository scaffolding.
- **Resolution:** Removed `.gitkeep` from `assets/` and `shopify-theme/assets/`. Repackaged `aura-skincare-theme.zip`.
- **Files Modified:** `assets/.gitkeep`, `shopify-theme/assets/.gitkeep`, `aura-skincare-theme.zip`.
- **Verification:** Verified via `scripts/verify-zip-archive.js` (20/20 checks pass, zero prohibited files).

---

### BUG-005: Packaging Path Separator Compatibility
- **Severity:** HIGH (Linux Shopify Upload Failure)
- **Symptom:** Windows default compression utilities create ZIP directory entries with backslash (`\`) separators, causing Shopify Admin on Linux to reject the upload or flatten directories into filenames.
- **Root Cause:** Standard Windows PowerShell `Compress-Archive` produces backslash paths.
- **Resolution:** Standardized `package-theme.js` to strictly use `tar.exe` (bsdtar) with `-C "shopify-theme"` and explicit POSIX forward-slash (`/`) directory entries.
- **Files Modified:** `package-theme.js`.
- **Verification:** Verified via `tar.exe -tf aura-skincare-theme.zip | Select-String "\\"` (0 backslashes found).

---

### BUG-006: Missing Growave Wishlist Snippet Reference (`ssw-widget-faveicon`)
- **Severity:** HIGH (Fatal Liquid `MissingTemplate` Risk)
- **Symptom:** `sections/main-product.liquid` (lines 93 and 99) called `{% render 'ssw-widget-faveicon' %}`. If the Social/Wishlist app was active, Liquid threw a fatal `MissingTemplate` error because `ssw-widget-faveicon.liquid` did not exist on disk.
- **Root Cause:** Incomplete app snippet integration from legacy Minimog codebase.
- **Resolution:** Created `snippets/ssw-widget-faveicon.liquid` delegating gracefully to `mm-ssw-widget-faveicon.liquid`.
- **Files Modified:** `snippets/ssw-widget-faveicon.liquid`, `shopify-theme/snippets/ssw-widget-faveicon.liquid`.
- **Verification:** Verified via `node scripts/audit-missing-snippets.js` (0 missing snippets across all 96 sections).

---

### BUG-007: Demo Fashion Collection Handles Triggering 404 Errors on Homepage
- **Severity:** CRITICAL
- **Symptom:** Clicking category cards, tabs, or promo banners on the homepage resulted in Shopify 404 (Not Found) errors.
- **Root Cause:** `templates/index.json` still contained legacy apparel collection handles (`sunglasses`, `knit-wears`, `women-bags`, `sneakers`, `accessories-bags`, `shirts`, `shorts`, `sandals`). Since skincare stores do not have fashion collections, clicking any card resulted in a 404 error.
- **Resolution:** Updated `templates/index.json` and `shopify-theme/templates/index.json` to reference universal skincare collection handles (`all`), and updated demo copy to Aura Botanica formulations:
  - Slide 1: **Bio-Ferment Barrier Glow Serum**
  - Slide 2: **Deep Lipid Moisture Cloud Cream**
  - Slide 3: **Golden Bakuchiol Midnight Nectar**
  - Categories: *Active Serums*, *Barrier Creams*, *Botanical Cleansers*, *Facial Elixirs*, *Curated Sets*.
- **Files Modified:** `templates/index.json`, `shopify-theme/templates/index.json`.
- **Verification:** Verified via `scripts/inspect-index-sections.js` (0 fashion handles remaining).

---

### BUG-008: Missing Collection Link Fallbacks in Sections
- **Severity:** MEDIUM
- **Symptom:** In sections like `collection-list.liquid`, `collection-showcase.liquid`, and `product-tabs.liquid`, collection links fell back to `#` or empty string `""` when a collection was unassigned, dead-ending navigation.
- **Root Cause:** Inadequate Liquid fallback filtering in section templates and card snippets.
- **Resolution:** Replaced all instances of `col.url | default: '#'` and `collection.url` link targets with `col.url | default: routes.all_products_collection_url` across 12 section and snippet files.
- **Files Modified:** `sections/collection-list.liquid`, `sections/product-tabs.liquid`, `sections/collection-showcase.liquid`, `sections/featured-collection.liquid`, `snippets/collection-card.liquid`, `snippets/cascade-collection-card.liquid` (and `shopify-theme/` mirrors).
- **Verification:** Verified via `node scripts/patch-collection-fallbacks.js`.

---

### BUG-009: Corrupt Unicode Character Encoding in Header & Footer Groups
- **Severity:** LOW (Cosmetic)
- **Symptom:** Announcement bar rendered `?` instead of bullet `•` (`orders over $75 ? Free Carbon-Neutral Shipping`) and footer rendered `Ac` instead of copyright `©` (`Ac AURA BOTANICA 2026 ?`).
- **Root Cause:** Legacy ASCII encoding conversion corrupted UTF-8 multi-byte characters.
- **Resolution:** Cleaned and saved `header-group.json` and `footer-group.json` with pristine UTF-8 strings: `•` and `©`.
- **Files Modified:** `sections/header-group.json`, `shopify-theme/sections/header-group.json`, `sections/footer-group.json`, `shopify-theme/sections/footer-group.json`.
- **Verification:** Verified via `scripts/audit-header-footer.js`.

---

### BUG-010: Local Dev Server 404 on Shopify Clean Routes
- **Severity:** HIGH (Local Preview Experience)
- **Symptom:** Visiting `/products/bio-ferment-barrier-glow-serum`, `/collections/all`, or `/pages/about-us` on `http://localhost:3000` returned raw 404 text.
- **Root Cause:** `dev-server.js` was a basic static file server that only matched exact file paths (`/product.html`, not `/products/*`).
- **Resolution:** Implemented an intelligent route dispatcher in `dev-server.js` supporting standard Shopify URL patterns (`/products/*`, `/collections/*`, `/pages/about-us`, `/pages/contact`, `/search`, `/404`), plus created styled preview templates for `preview/404.html`, `preview/about.html`, and `preview/contact.html`.
- **Files Modified:** `dev-server.js`, `preview/404.html`, `preview/about.html`, `preview/contact.html`.
- **Verification:** Verified via `scripts/verify-preview-pages.js` (10/10 preview pages pass).

---

## 2. Summary of Bug Status
- Total Defects Identified: 10
- Total Defects Resolved: 10
- Open Defects: 0
- Regressions Detected: 0
