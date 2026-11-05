# AURA BOTANICA v2.0 — FEATURE PARITY MATRIX

**Theme Base:** Minimog 5.3.0 (Shopify Online Store 2.0)  
**Upgrade Target:** Aura Botanica v2.0.0 (Luxury Botanical Clinical Skincare)  
**Branch:** `v2-upgrade` | **Baseline Tag:** `v1-backup-before-v2`  
**Date:** November 5, 2026  

---

## 1. Feature Parity & Evolution Plan

This document tracks every existing Minimog and Aura Botanica theme capability to ensure that zero features, settings, or customer journeys are lost during the v2.0 upgrade.

| Feature Domain | Specific Capability | Current Implementation File(s) | v2.0 Evolution Strategy | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Header** | 3 Header Layout Designs | `sections/header.liquid` | Kept & refined; clean design tokens applied | **KEPT** |
| **Header** | Sticky Header (Scroll Up / Always) | `sections/header.liquid`, `assets/header.js` | Upgraded to GSAP ScrollTrigger smooth show/hide | **IMPROVED** |
| **Header** | Transparent Header Mode | `sections/header.liquid` | Kept; supports hero banner overlays | **KEPT** |
| **Header** | Mega Menu with Column Cards | `sections/header.liquid`, `snippets/header-mega-menu.liquid` | Staggered GSAP reveal for submenu items | **IMPROVED** |
| **Header** | Mobile Off-Canvas Navigation | `sections/header.liquid`, `snippets/header-menu-drawer.liquid` | Touch-optimized, smooth slide transition | **KEPT** |
| **Header** | Account / Login Link & Icon | `snippets/header-option-item__account.liquid` | Accessible SVG icon and tooltip | **KEPT** |
| **Header** | Currency & Language Selector | `snippets/localization-form.liquid` | Native Shopify Markets API integration | **KEPT** |
| **Announcement Bar** | Multi-Message Announcement Ticker | `sections/annoucement.liquid`, `assets/announcement-bar.js` | GSAP marquee/ticker animation option | **IMPROVED** |
| **Search** | Predictive Search Modal | `snippets/search-popup.liquid`, `assets/predictive-search.js` | Full-screen modal with popular/recent queries | **IMPROVED** |
| **Cart** | Slide-out Cart Drawer | `snippets/cart-drawer.liquid`, `assets/cart-drawer.js` | Kept; GSAP smooth slide, zero layout shift | **IMPROVED** |
| **Cart** | Dedicated Cart Page | `sections/cart-template.liquid`, `templates/cart.json` | Kept for non-drawer checkouts and fallbacks | **KEPT** |
| **Cart** | Order Note Input | `snippets/cart-drawer.liquid`, `sections/cart-template.liquid` | Kept; persists to `/cart/update.js` | **KEPT** |
| **Cart** | Gift Wrapping Addon | `sections/cart-gift-wrapping.liquid`, `assets/gift-wrapping.js` | Kept; optional upsell check | **KEPT** |
| **Cart** | Free Shipping Progress Bar | `snippets/cart-drawer.liquid`, `sections/cart-template.liquid` | Settings-driven threshold ($75.00 default) | **KEPT** |
| **Cart** | In-Cart Upsell ("Complete the Routine") | `snippets/cart-drawer.liquid` | Kept; dynamic complementary product slider | **IMPROVED** |
| **Cart** | Cart Empty State | `snippets/cart-drawer.liquid` | Refined with botanical illustration and CTA | **IMPROVED** |
| **Product Discovery** | Quick View Modal | `snippets/product-quick-view.liquid`, `assets/product-quick-view.js` | Fast AJAX modal with accessible focus trap | **KEPT** |
| **Product Discovery** | Quick Add to Bag | `snippets/product-card-1.liquid` through `product-card-5.liquid` | 1-click for single variant; drawer for options | **KEPT** |
| **Product Cards** | 5 Card Layout Variations | `snippets/product-card-1.liquid` to `product-card-5.liquid` | Kept; hover secondary image, ratio locks | **KEPT** |
| **Product Cards** | Color & Pattern Swatches | `snippets/product-card-swatch.liquid`, `assets/product-card-swatch.js` | Auto-detected from product option values | **KEPT** |
| **Wishlist** | Native LocalStorage Wishlist | `snippets/tooltip.liquid`, `assets/wishlist.js` | 100% native; no monthly app fees needed | **KEPT** |
| **Wishlist** | Wishlist Page Template | `sections/page-wishlist.liquid`, `templates/page.wishlist.json` | Renders user's saved formulation grid | **KEPT** |
| **Compare** | Formulation Comparator Drawer | `snippets/tooltip.liquid`, `assets/compare-product.js` | Side-by-side comparison modal | **KEPT** |
| **Compare** | Compare Page Template | `sections/page-compare.liquid`, `templates/page.product-compare.json` | Full table comparing active ingredients | **KEPT** |
| **Browsing History**| Recently Viewed Formulations | `sections/recent-viewed-products.liquid` | Browser-cached product carousel | **KEPT** |
| **Product Page** | Sticky Add to Cart (ATC) | `snippets/sticky-atc.liquid`, `assets/sticky-atc.js` | Mobile and desktop bottom floating bar | **KEPT** |
| **Product Page** | Pickup Availability | `snippets/pickup-availability.liquid`, `assets/pickup-availability.js` | Native Shopify local pickup status | **KEPT** |
| **Product Page** | Bundles / Frequently Bought Together| `sections/product-bundles.liquid`, `assets/product-bundles.js` | Multi-product discount selector | **KEPT** |
| **Product Page** | Pre-Order Functionality | `snippets/product-form.liquid` | Dynamic button text for backordered SKUs | **KEPT** |
| **Product Page** | Flash Sale & Countdown Timer | `sections/countdown-timer.liquid`, `assets/countdown-timer.js` | Scoped product-level countdown bar | **KEPT** |
| **Product Page** | Low Stock Inventory Bar | `snippets/product-inventory.liquid`, `assets/product-inventory.js` | Dynamic visual stock level bar | **KEPT** |
| **Product Page** | Collapsible Tabs (INCI, Ritual, FAQ)| `sections/collapsible-tabs.liquid` | Accessible `<details><summary>` accordions | **IMPROVED** |
| **Product Page** | Custom Product Layouts (1 to 5) | `templates/product.custom-layout-1.json` to `5.json` | 100% preserved; distinct media/sidebar layouts | **KEPT** |
| **Product Page** | Grid Media Layouts (1, 2, Mix) | `templates/product.grid-1-column.json`, `2-columns`, `mix` | Editorial high-fashion skincare grids | **KEPT** |
| **Collections** | Grid Columns (2, 3, 4, 5) | `templates/collection.grid-2-columns.json` to `5-columns.json` | Responsive CSS grid with zero layout shift | **KEPT** |
| **Collections** | List View Layout | `templates/collection.view-list.json` | Horizontal product card orientation | **KEPT** |
| **Collections** | Sidebar Variations | `templates/collection.filter-left-sidebar.json`, `right`, `hidden` | Desktop and mobile drawer filter placements | **KEPT** |
| **Collections** | Facet & Tag Filters | `assets/storefont-filters.js`, `assets/tags-filters.js` | Shopify Storefront Facets API integration | **KEPT** |
| **Collections** | Pagination Types | `templates/collection.json`, `infinite-scroll`, `load-more` | Standard paginator, infinite scroll, button | **KEPT** |
| **Editorial** | Hero Slideshow & Video Hero | `sections/slider.liquid`, `sections/video-hero.liquid` | GSAP line-mask reveal and progress bar | **IMPROVED** |
| **Editorial** | Lookbook Hotspots | `sections/lookbook.liquid`, `assets/hotspots-image.js` | Interactive botanical formula tags | **KEPT** |
| **Editorial** | Testimonials / Social Proof | `sections/testimonials.liquid`, `assets/testimonials.js` | Verified skincare customer reviews slider | **KEPT** |
| **Editorial** | Press Logos & Brand Matrix | `sections/press.liquid`, `sections/brands-list.liquid` | Monochrome luxury media features | **KEPT** |
| **Editorial** | Instagram / Social Feed | `sections/instagram.liquid`, `assets/instagram.js` | Grid with hover caption overlay | **KEPT** |
| **Editorial** | Before & After Formulation Slider | `sections/before-after.liquid`, `assets/image-comparison.js` | Touch and keyboard draggable divider | **KEPT** |
| **Editorial** | Ingredient Spotlight | `sections/ingredient-spotlight.liquid` | Pinned ScrollTrigger layout in Phase 4 | **IMPROVED** |
| **Editorial** | Ritual Timeline Steps | `sections/ritual-steps.liquid` | SVG animated timeline in Phase 4 | **IMPROVED** |
| **Informational** | Store Locator | `sections/page-find-a-store.liquid`, `templates/page.find-a-store.json` | Multi-boutique listing | **KEPT** |
| **Informational** | FAQ Page | `sections/faq.liquid`, `templates/page.faqs.json` | Accessible Q&A accordion list | **KEPT** |
| **Informational** | 404, Password, Gift Card | `templates/404.json`, `password.json`, `gift_card.liquid` | Luxury botanical branded templates | **KEPT** |
| **Customer Hub** | Accounts, Orders, Addresses | `templates/customers/*.liquid` | Cleaned customer portal templates | **KEPT** |
| **App Bridges** | Review Integrations (Judge.me, Loox) | `snippets/product-reviews-app__badge.liquid`, `snippets/mm-*.liquid`| Non-breaking silent fallback architecture | **KEPT** |
| **Localization** | 31 Language Translations | `locales/*.json` | Full multi-language store coverage | **KEPT** |

---

## 2. Phase 1 Foundation Deliverables & Honest Status Matrix

| Foundation Subsystem | Verification Metric | Status | Evidence / Notes |
| :--- | :--- | :---: | :--- |
| **Scoped Base Stylesheet** | `assets/aura-base.css` created, linked in `layout/theme.liquid`, un-scoped prototype assets removed | **VERIFIED** | Zero global resets (`*, *::before, *::after { margin: 0; padding: 0; }` excluded), zero `!important` flags |
| **Fluid Design System** | Fluid typography (`clamp(...)`), fluid spacing, easing & duration tokens declared | **VERIFIED** | `--font-size-hero` to `--font-size-body`, `--space-xs` to `--space-xl`, `--ease-out-expo`, `--duration-*` |
| **Typography & Fonts** | Cormorant Garamond + Body font loaded via Shopify `font_picker` | **VERIFIED** | `snippets/font-face.liquid` uses `font_face: font_display: 'swap'` + Shopify prefetch CDN |
| **Settings Schema** | 24 categories, 285 settings, version 2.0.0 | **VERIFIED** | Preserved all 281 original setting IDs; added 4 animation controls (`animation_enable`, `animation_intensity`, `animation_smooth_scroll`, `animation_custom_cursor`) |
| **Color Schemes** | `color_scheme_group` with 8 complete palettes | **VERIFIED** | All 8 palettes contain all 18 mandatory tokens (`default`, `dark`, `footer`, `badge-*`, UUIDs) |
| **Theme Presets** | 3 distinct presets in `config/settings_data.json` | **VERIFIED** | *Botanical Ivory* (`#FCFBF7`), *Forest Night* (`#121A17`), and *Clay Rose* (`#FBF6F2`) verified truly distinct |
| **Duplicate Sections** | 5 redundant section clones retired to `_deprecated/sections/` | **VERIFIED** | Authoritative Minimog base sections active; 0 broken template/JSON references |
| **Apparel Cleanups** | Zero fashion/clothing remnants across all templates and settings | **VERIFIED** | Cleaned `product*.json`, `collection*.json`, `find-a-store.json`, `index.json`, customer templates audited |
| **Directory Parity** | Bit-for-bit parity between `/` and `/shopify-theme/` | **VERIFIED** | `scripts/diff-all-theme-files.js` reports 0 differences across all 490+ theme files |
| **Local Test Suite** | AST validation, Theme Editor deep check, Shopping flows, ZIP package | **VERIFIED** | `validate-theme.js` (172/172 PASS), `test-theme-editor-deep.js` (24/24 PASS, 100%) |
| **Shopify CLI Check** | `shopify theme check` or `npx @shopify/theme-check` | **BLOCKED** | Shopify CLI binary not installed globally on host; sandbox network isolation blocks npm registry |

---

## 3. Parity Verification Rules
1. **Zero Feature Drop:** No setting, section type, or block type can be removed without providing an alias migration in `config/settings_data.json` or `templates/*.json`.
2. **Tooling Preservation:** Development tooling (`dev-server.js`, `preview/`, `data/`, `scripts/`, `package.json`) remains 100% operational in the local environment and is safely excluded from final Shopify theme archives.
