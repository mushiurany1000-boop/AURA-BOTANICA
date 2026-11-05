# GUMDROP BENCHMARK vs AURA BOTANICA — FEATURE COMPARISON REPORT

**Benchmark Theme:** Gumdrop (Shopify Theme Store)  
**Target Theme:** Aura Botanica v2.0.0 (Luxury Botanical Clinical Skincare)  
**Date:** November 5, 2026  
**Status:** Audit & Gap Analysis Complete  

---

## 1. Executive Summary

This report establishes a rigorous baseline comparison between the ecommerce capabilities of the Shopify Theme Store benchmark (**Gumdrop**) and the current implementation of **Aura Botanica**. 

Aura Botanica utilizes Gumdrop strictly as a functional benchmark for merchant empowerment, conversion optimization, and product discovery. Aura Botanica maintains its own distinct visual identity (Cormorant Garamond serif headings, Plus Jakarta Sans body typography, organic color tokens: Ivory, Forest, Copper, Sage, Clay) and proprietary GSAP 3.15.1 motion architecture.

---

## 2. Benchmark Feature Matrix

| Gumdrop Benchmark Feature | Aura Botanica Current Implementation | File Path(s) | Status | Required Upgrade Action |
| :--- | :--- | :--- | :---: | :--- |
| **1. Quick Buy** | AJAX direct-to-cart for single-variant items; variant drawer popup for multi-option products | `snippets/product-card.liquid`<br>`snippets/product-card-quick-add-btn.liquid`<br>`snippets/product-form.liquid` | **HAVE** | **KEEP & REFINE** — Ensure loading states and error toasts display correctly on mobile viewports. |
| **2. Quick View** | Modal drawer with AJAX fetch of `?view=quickview`, gallery thumbnails, variant picker, and add-to-bag | `sections/product-quickview.liquid`<br>`assets/product-quick-view.js` | **HAVE** | **KEEP & REFINE** — Maintain WCAG focus trap on modal open and ESC dismiss. |
| **3. Slide-out Cart** | AJAX drawer with live subtotal, free shipping progress bar, gift wrapping addon, order notes, and cross-sells | `snippets/cart-drawer.liquid`<br>`sections/cart-drawer.liquid`<br>`assets/cart-drawer.js` | **HAVE** | **KEEP & REFINE** — Phase 2 improvements already tokenized; verify real cart endpoint persistence. |
| **4. Sticky Cart / Sticky ATC** | Bottom floating action bar appearing once primary product page button scrolls out of view | `snippets/sticky-atc.liquid`<br>`assets/sticky-atc.js`<br>`assets/sticky-add-to-cart.css` | **HAVE** | **KEEP & IMPROVE** — Add Theme Editor toggle for mobile vs desktop visibility. |
| **5. Mega Menu** | Multi-column navigation with promotional image banners, collection cards, and staggered GSAP entrance | `sections/header.liquid`<br>`snippets/header-main-menu-container.liquid`<br>`assets/mega-menu.js` | **HAVE** | **KEEP & IMPROVE** — Support secondary menu and transparent header styling in Theme Editor. |
| **6. Enhanced Search** | Predictive search modal with instant product matches, query suggestions, and collections | `snippets/search-popup.liquid`<br>`assets/predictive-search.js`<br>`sections/main-search.liquid` | **HAVE** | **KEEP & REFINE** — Verify ESC key return and zero layout shift. |
| **7. Product Filters** | Native Shopify Storefront Facets API filtering (price range, availability, vendor, tags, swatches) | `snippets/collection-filters-facets.liquid`<br>`snippets/storefront-filters.liquid`<br>`assets/storefont-filters.js` | **HAVE** | **KEEP & REFINE** — Ensure dynamic URL parameters pushState without full page reload. |
| **8. Recently Viewed** | Client-side LocalStorage cache of viewed product handles rendered as a dynamic product card carousel | `sections/recent-viewed-products.liquid`<br>`assets/recently-viewed-products.js` | **HAVE** | **KEEP & REFINE** — Add empty state handling when visitor has no history. |
| **9. Product Recommendations** | Native Shopify `/recommendations/products` API endpoint integration for related & complementary SKUs | `sections/product-recommendations.liquid`<br>`assets/product-recommendations.js` | **HAVE** | **KEEP & REFINE** — Support intent types: `related` and `complementary`. |
| **10. Color Swatches** | Automated detection of color/tone options with image textures and CSS color swatches | `snippets/get_swatch_texture.liquid`<br>`snippets/product-card-option.liquid`<br>`assets/product-card-swatch.js` | **HAVE** | **KEEP & REFINE** — Preserve skincare shade swatches (`Rose Clay`, `Golden Bakuchiol`, `Camellia Blanc`). |
| **11. Back-in-Stock Alerts** | Sold-out variant notification modal and customer alert capture form | *Currently Missing* | **MISSING** | **BUILD** — Create `snippets/back-in-stock.liquid`, `assets/back-in-stock.js`, and block in `sections/main-product.liquid`. |
| **12. Product Tabs** | Accessible `<details><summary>` accordions and tabbed interfaces for ingredients, ritual, and FAQs | `sections/product-tabs.liquid`<br>`sections/collapsible-tabs.liquid`<br>`sections/main-product.liquid` | **HAVE** | **KEEP & IMPROVE** — Add dedicated skincare blocks for Ingredients, Ritual, and Suitability in PDP. |
| **13. Image Zoom & Lightbox** | Desktop hover zoom and Photoswipe full-resolution lightbox gallery modal | `assets/product-media.js`<br>`snippets/product-media.liquid` | **HAVE** | **KEEP & REFINE** — Ensure touch pinch-to-zoom works smoothly on mobile. |
| **14. Lookbook / Hotspots** | Shoppable editorial images with interactive hotspot pins and hover/click product cards | `sections/lookbook.liquid`<br>`snippets/lookbook-card.liquid`<br>`assets/hotspots-image.js` | **HAVE** | **KEEP & REFINE** — Add pulsing pin animations and mobile bottom sheet. |
| **15. Promo Banners** | Full-width editorial banners with countdown overlays, video backgrounds, and dual CTAs | `sections/promotion-banner.liquid`<br>`sections/featured-collection-banner.liquid` | **HAVE** | **KEEP & REFINE** — Ensure video autoplay respects user low-power settings. |
| **16. Countdown Timer** | Client-side urgent offer timer with customizable end date, hours, minutes, and expiry banner | `sections/countdown-timer.liquid`<br>`assets/countdown-timer.js` | **HAVE** | **KEEP & REFINE** — Add configurable background color schemes and auto-hide when expired. |

---

## 3. Skincare-Specific Section Library Gap Analysis (Task 3 & Task 8)

To achieve true market leadership in the botanical clinical skincare vertical, the following 8 dedicated sections are identified for direct implementation into the section library:

1. **`sections/brand-story.liquid` (BUILD)**: Editorial storytelling section with founder narrative, botanical philosophy, quote callout, signature image, and clinical laboratory badge.
2. **`sections/product-benefits-grid.liquid` (BUILD)**: High-conversion formulation benefits grid showcasing key efficacy pillars (Barrier Support, Pure Bio-Ferments, Clean Clinical Standards) with icon selectors and GSAP staggered reveals.
3. **`sections/best-sellers.liquid` (BUILD)**: Dedicated curated best-sellers showcase featuring luxury badges, customer favorite ranking, and instant quick-buy drawer triggers.
4. **`sections/new-arrivals.liquid` (BUILD)**: Dedicated new formulation launch section highlighting fresh laboratory releases with efficacy badges and clinical trial quotes.
5. **`sections/trending-products.liquid` (BUILD)**: Dynamic trending collection carousel featuring numbered rank indicators (#1, #2, #3, #4) for viral skincare formulations.
6. **`sections/product-comparison-table.liquid` (BUILD)**: Interactive side-by-side formulation matrix comparing active percentages, skin concern targets, texture, and ritual timings.
7. **`sections/reviews-showcase.liquid` (BUILD)**: Dedicated verified customer review cards with 5-star ratings, verified buyer badges, skin type tags, and product links.
8. **`sections/trust-badges.liquid` (BUILD)**: Botanical certifications bar highlighting Cruelty-Free, 100% Vegan, Dermatologist Formulated, and Recyclable Violet Glass packaging.

---

## 4. Theme Editor Customization Audit (Task 7)

- **Global Settings Schema:** 25 setting groups in `config/settings_schema.json` with 285 merchant settings.
- **Color Schemes:** 8 complete color schemes configured in `color_scheme_group` with 18 tokens each.
- **Typography:** Fully integrated font pickers for Heading (`Cormorant Garamond`) and Body (`Plus Jakarta Sans`), plus fluid typography scales (`clamp(...)`).
- **Motion Controls:** Master toggle, 3 intensity tiers (`off`, `subtle`, `full`), smooth scroll toggle, magnetic cursor, and reduced-motion automatic override.
- **One-Click Presets:** 3 verified distinct presets in `config/settings_data.json` (*Botanical Ivory*, *Forest Night*, *Clay Rose*).

---

## 5. Development & Implementation Roadmap

1. **Step 1:** Implement `snippets/back-in-stock.liquid` and `assets/back-in-stock.js` (closes Gap #11).
2. **Step 2:** Enhance `sections/main-product.liquid` with dedicated skincare blocks (`botanical_ingredients`, `ritual_steps`, `skin_suitability`, `back_in_stock`).
3. **Step 3:** Implement the 8 dedicated Skincare OS 2.0 sections with complete schemas, blocks, presets, and GSAP motion attributes.
4. **Step 4:** Mirror all additions to `shopify-theme/` to maintain 100% parity.
5. **Step 5:** Run full test suite (AST validation, reference verification, responsive checks, ZIP packaging).
6. **Step 6:** Author all 7 required Phase reports.
