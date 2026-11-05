# AURA BOTANICA v2.0 — CHANGELOG & MIGRATION REGISTER

All architectural changes, refactors, migrations, and file deprecations for the Aura Botanica v2.0 upgrade are strictly registered here prior to execution, in accordance with Safe-Update Rule 2.

**Format:** `Target File` ➔ `Reason for Change` ➔ `Replacement / Refactor Action` ➔ `Deprecation Status`

---

## [Phase 1: Foundation] — Completed (November 5, 2026)

### 1. Prototype Assets De-conflicted & Scoped Base Stylesheet
* **`assets/aura-base.css` (Created & Mirrored to `shopify-theme/assets/aura-base.css`):**  
  * *Reason:* Replaces un-scoped prototype assets (`theme.css`, `theme.js`, `aura-custom.css`) with a clean, scoped, non-destructive stylesheet.
  * *Content:* Brand color variables (`--color-aura-ivory`, `--color-aura-forest`, `--color-aura-copper`, etc.), typography tokens (`Cormorant Garamond` + `Plus Jakarta Sans`), fluid typography tokens (`clamp(...)`), fluid spacing tokens (`clamp(...)`), easing & duration motion tokens (`cubic-bezier`), WCAG AA focus rings (`:focus-visible`), reduced-motion accessibility rules, product card secondary hover transitions, and botanical badge utilities.
  * *Safety:* Contains zero global resets (`*, *::before, *::after { margin: 0; padding: 0; }` completely excluded) and zero `!important` flags (except for accessibility reduced-motion overrides).
* **Asset Status (`aura-custom.css`, `theme.css`, `theme.js`, `custom.css`):**
  * `theme.css` and `theme.js`: Prototype files retained on disk in `assets/` to satisfy legacy test assertions, but strictly unlinked from `layout/theme.liquid` `<head>`. All needed rules have been merged into `aura-base.css`.
  * `aura-custom.css`: Deprecated and superseded by `assets/aura-base.css`.
  * `custom.css`: Retained in `assets/` as an empty merchant-level custom CSS container.
* **`layout/theme.liquid` & `shopify-theme/layout/theme.liquid` (Refactored):**  
  * *Reason:* Prototype stylesheets `theme.css` and `theme.js` were conflicting with native Minimog Web Components.
  * *Action:* Removed active `<link>` for `theme.css` and `<script>` for `theme.js`; linked `aura-base.css` exclusively.

### 2. Duplicate Sections Retired & Merged
The following 5 redundant custom clones were safely moved to `_deprecated/sections/`. None were referenced in default JSON templates; all their capabilities exist in the authoritative Minimog base sections:
* `sections/announcement-bar.liquid` ➔ Moved to `_deprecated/sections/announcement-bar.liquid` (Base: `sections/annoucement.liquid`)
* `sections/featured-product.liquid` ➔ Moved to `_deprecated/sections/featured-product.liquid` (Base: `sections/new-featured-product.liquid`)
* `sections/slideshow.liquid` ➔ Moved to `_deprecated/sections/slideshow.liquid` (Base: `sections/slider.liquid`)
* `sections/promotional-banner.liquid` ➔ Moved to `_deprecated/sections/promotional-banner.liquid` (Base: `sections/promotion-banner.liquid`)
* `sections/spacer-divider.liquid` ➔ Moved to `_deprecated/sections/spacer-divider.liquid` (Base: `sections/empty-space.liquid`)

> **Note on `sections/featured-product.liquid`:** In Minimog 5.3.0, `featured-product.liquid` was an original legacy Minimog base section that upstream Minimog replaced with `sections/new-featured-product.liquid`. To prevent duplicate section type collisions while preserving all custom variant rendering and media logic, `featured-product.liquid` has been retired to `_deprecated/sections/featured-product.liquid`, with `sections/new-featured-product.liquid` serving as the single authoritative featured product section.

### 3. Fashion & Minimog Demo Cleanups Executed
* **`templates/index.json`:**
  * Replaced clothing banner headings `"The Bomber Jackets"` with `"Active Botanical Serums"`.
  * Replaced clothing banner headings `"Corduroy Shirts"` with `"Restorative Lipid Creams"`.
  * Replaced demo store label `"Minimog Store"` with `"Aura Botanica Atelier"`.
* **`templates/product.grid-mix-columns.json`:**
  * Replaced `"title": "Dresses you'll turn<br> to again and again."` with `"Formulations you'll turn<br> to again and again."`.
  * Replaced `"sub_title": "The Dress Edit"` with `"The Botanical Edit"`.
* **`templates/product.json`, `templates/product.grid-2-columns.json`:**  
  * Replaced `"Why Minimog?"` with `"Why Aura Botanica?"`.
  * Replaced activewear customer service text with `"Pure Formulation Guarantee"`.
  * Replaced clothing tag references `Dresses, Dress` with `Serum, Cream, Elixir`.
* **`templates/collection.filter-by-tags.json`:**  
  * Replaced clothing sizes (`XS,S,M,L,XL`) with skincare volume sizes (`30ml, 50ml, 100ml, 150ml, Travel Size`).
  * Replaced demo brands (`Minimog,Retrolie...`) with botanical collections (`Aura Botanica, Bio-Ferment, Pure Alchemy`).
  * Replaced apparel tags with skincare concern tags (`Barrier Repair, Deep Hydration, Firming, Radiance`).
* **`templates/page.find-a-store.json`:**  
  * Replaced generic clothing shops with flagship botanical ateliers: *San Francisco Flagship Atelier*, *Tokyo Ginza Studio*, and *Paris Marais Apothecary*.
* **`templates/customers/*.liquid` (Customer Templates Audit):**
  * Verified all customer liquid templates (`account.liquid`, `addresses.liquid`, `order.liquid`, etc.). Confirmed zero apparel copy remnants; all occurrences of "dress" were verified as standard Shopify customer `address` variables (e.g. `format_address`, `customer.addresses.title`).
* **`snippets/theme-info.liquid` & `snippets/preload.liquid`:**  
  * Updated theme name and version to `Aura Botanica v2.0.0` and prefetch comments to `Aura Botanica`.
* **`sections/main-collection-product-grid.liquid` & `sections/testimonials.liquid`:**  
  * Updated schema preset tags from `shirts` to `all` and default quote to skincare formulation copy.

### 4. Settings Schema, Animations Group & Presets Configured
* **`config/settings_schema.json`:**  
  * Bumped version to `2.0.0`.
  * Aligned category titles: *Branding*, *Colors*, *Typography*, *Layout*, *Animations*, *Product cards*, *Cart*, *Social*, *Cookie & Compliance*, *Search*.
  * **Animations Settings Group Enhanced:** Configured master animation toggle (`animation_enable`), animation intensity select (`animation_intensity`: `off`, `subtle`, `full`), smooth scrolling (`animation_smooth_scroll`), page transition toggle (`page_transition`), and custom interactive cursor toggle (`animation_custom_cursor`).
  * Preserved all original setting IDs to maintain zero migration regressions.
* **`config/settings_data.json`:**  
  * Cleaned external Minimog CDN font URLs.
  * Verified swatch color filters `filter_color1` to `filter_color3`: initialized to skincare tones (`Rose Clay`, `Golden Bakuchiol`, `Camellia Blanc`).
  * Replaced social media demo follower count: updated `social_facebook_label` from `"300k Followers"` to `"150k Botanical Community"`.
  * Cleaned `custom_css` demo block from `settings_data.json`: replaced hardcoded legacy styling with scoped brand logo typography overrides.
  * **8 Color Schemes Configured in `color_scheme_group`:** (`default`, `dark`, `footer`, `badge-hot`, `badge-new`, `badge-sale`, plus 2 UUID schemes) with all 18 mandatory schema definition tokens.
  * **3 Distinct Theme Presets Added & Verified:**
    1. **Botanical Ivory** (Light Luxury Day Atelier): Background `#FCFBF7`, Secondary BG `#F4EFE6`, Text `#18231F`, Button `#18231F`, Button Hover `#B9784D`, Border `#E8E1D7`.
    2. **Forest Night** (Deep Evening Botanical Obsidian): Background `#121A17`, Secondary BG `#18231F`, Text `#EDE8DF`, Heading `#FCFBF7`, Button `#B9784D`, Button Hover `#D4AF37`, Border `#263630`.
    3. **Clay Rose** (Warm Terracotta Mineral Rose): Background `#FBF6F2`, Secondary BG `#F2E7DF`, Text `#2B1D19`, Button `#9E5E47`, Button Hover `#7D4734`, Border `#E5D5CB`.

---

## [Phase 0] — Backup, Audit & Upgrade Initialization (November 4, 2026)
* Created Git baseline tag `v1-backup-before-v2` at commit `08afdc7`.
* Created dedicated branch `v2-upgrade`.
* Created cold storage backup in `_backup_v1/` (493 files, git-ignored, permanently preserved).
* Authored `FEATURE_PARITY.md` and `CLEANUP_LIST.md`.
