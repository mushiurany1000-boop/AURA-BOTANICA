# AURA BOTANICA v2.0 — CHANGELOG & MIGRATION REGISTER

All architectural changes, refactors, migrations, and file deprecations for the Aura Botanica v2.0 upgrade are strictly registered here prior to execution, in accordance with Safe-Update Rule 2.

**Format:** `Target File` ➔ `Reason for Change` ➔ `Replacement / Refactor Action` ➔ `Deprecation Status`

---

## [Phase 2: Global Layout & Navigation] — Completed (November 5, 2026)

All global layout and navigation subsystems restyled and extended using scoped CSS transitions, token-driven color palettes, and strict WCAG 2.2 AA accessibility standards without introducing GSAP (reserved for Phase 3).

### 1. Announcement Bar (`sections/annoucement.liquid`, `assets/announcement-bar.css`, `assets/announcement-bar.js`)
* **Markup Refactor:** Replaced un-focusable `<div>` close icon with accessible `<button type="button" class="m-announcement-bar__close" aria-label="{{ 'accessibility.close' | t }}" data-announcement-close>`.
* **Scoped Motion:** Replaced inline removal script with encapsulated smooth CSS height/opacity collapse transition (`transition: max-height 0.35s, opacity 0.35s`). Added keyboard `Escape` handler to dismiss bar.
* **Content Cleanup:** Fixed corrupted unicode bullets in `sections/header-group.json`: `"Complimentary Botanical Cleanser Sample with all orders over $75 • Free Carbon-Neutral Shipping"`.
* **Motion & Responsive Safety:** Added `@media (prefers-reduced-motion: reduce)` override and responsive padding for 360px, 768px, and 1280px viewports.

### 2. Header, Mega Menu, Mobile Menu & Bottom Sticky Bar (`sections/header.liquid`, `snippets/header-menu-drawer.liquid`, `assets/header.css`, `assets/mega-menu.js`, `sections/mobile-sticky-bar.liquid`, `assets/mobile-sticky-bar.css`)
* **Accessible Hamburger Trigger:** Refactored `<span class="m-menu-button">` in `sections/header.liquid` to an accessible `<button type="button" class="m-menu-button" aria-label="{{ 'general.accessibility.toggle_menu' | t }}" aria-controls="m-menu-drawer" aria-expanded="false">`.
* **Mobile Drawer Close & Header:** Injected drawer title and accessible close button `<button type="button" class="m-menu-drawer__close" aria-label="{{ 'general.accessibility.close_menu' | t }}">` into `snippets/header-menu-drawer.liquid`.
* **Focus Management & Trap:** Enhanced `assets/mega-menu.js` to trap focus inside the drawer on open, dismiss on `Escape`, and return focus to `.m-menu-button` on close.
* **Header Backdrop & Sticky Motion:** Injected luxury CSS transitions and backdrop blur (`backdrop-filter: blur(12px)`) for sticky header states (`.m-header.stuck`).
* **Mobile Sticky Bar (`sections/mobile-sticky-bar.liquid`):** Replaced hardcoded/incorrect `aria-label="product"` with translated labels (`{{ 'general.accessibility.home' | t }}`, `{{ 'general.accessibility.shop' | t }}`, `{{ 'general.accessibility.wishlist' | t }}`). Ensured touch targets are >= 48px and added `:focus-visible` focus rings.

### 3. Predictive Search Modal (`snippets/search-popup.liquid`, `assets/search.css`, `assets/predictive-search.js`)
* **Desktop Close Button:** Injected dedicated desktop close button `<button type="button" class="m-search-popup__close-desktop" data-close-search aria-label="{{ 'general.accessibility.close' | t }}">` so keyboard/desktop users have a visible click target alongside ESC.
* **Accessible Form Inputs:** Updated search submit and clear buttons with translated `aria-label` attributes (`general.search.submit`, `general.search.clear`).
* **Focus Return on ESC:** Enhanced `assets/predictive-search.js` so pressing `Escape` closes the search popup via `closeSearchPopup` event and returns focus directly to the header search trigger (`[data-open-search-popup]`).
* **Search Styling:** Added smooth overlay fade/slide transitions and input focus border-bottom accent in `assets/search.css`.

### 4. Slide-Out Cart Drawer (`snippets/cart-drawer.liquid`, `assets/cart.css`, `assets/cart-drawer.js`)
* **Token-Driven Free Shipping Bar:** Eliminated all hardcoded inline `#hex` colors (`#B9784D`, `#18231F`, `#E5DFD3`) in favor of CSS custom property tokens (`var(--color-aura-copper)`, `var(--color-aura-forest)`, `var(--color-aura-border)`).
* **Localized Copy:** Replaced hardcoded English copy with locale strings: `{{ 'cart.general.free_shipping_unlocked' | t }}` and `{{ 'cart.general.free_shipping_remaining_html' | t: remaining: remaining_money }}`.
* **Accessible Close & Focus Trap:** Updated `.m-cart-drawer__close` to an accessible button. Enhanced `assets/cart-drawer.js` to focus the close button on open, listen to `Escape` key, and return focus to the cart bubble button on close.
* **Quantity Touch Targets:** Increased quantity selector buttons to min 40x40px with `:focus-visible` outline rings.

### 5. Luxury Footer (`sections/footer.liquid`, `sections/footer-group.json`, `assets/footer.css`)
* **Unicode & Text Cleanup:** Fixed corrupted unicode characters in `sections/footer-group.json`: `"title": "Let's get in touch"` and `"copyright": "© AURA BOTANICA 2026 • Pure Botanical Alchemy"`.
* **Botanical Typography:** Styled `.m-footer--block-title` with `var(--font-heading-family)` (`Cormorant Garamond`) and clean uppercase letter-spacing (0.08em).
* **Accessible Focus Rings:** Added `:focus-visible` focus rings for all footer navigation links, newsletter email input, and newsletter submit button.
* **Mobile Accordion Styling:** Added clean border dividers and smooth height transitions for mobile accordion blocks.

### 6. Overlays & Compliance (`snippets/cookie-banner.liquid`, `assets/cookie-banner.css`, `sections/age-verifier-popup.liquid`, `assets/age-verifier.css`, `snippets/page-transition.liquid`, `snippets/scroll-top-button.liquid`)
* **Cookie Banner:** Enhanced `assets/cookie-banner.css` with luxury backdrop blur, token-driven colors, `:focus-visible` rings on Accept/Decline, and `@media (prefers-reduced-motion: reduce)` overrides.
* **Age Verifier:** Styled modal with `var(--color-aura-ivory)` background, `var(--color-aura-forest)` typography, and accessible button focus rings.
* **Page Transition:** Replaced hardcoded `#fff` background with `var(--color-aura-ivory)` and added reduced-motion override to disable transition spinner for sensitive users.
* **Scroll to Top Button:** Replaced hardcoded `aria-label="Scroll to Top"` with translated `{{ 'general.accessibility.scroll_to_top' | t }}` and added `:focus-visible` ring.

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
