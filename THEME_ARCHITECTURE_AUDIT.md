# 🌿 AURA BOTANICA — COMPREHENSIVE THEME ARCHITECTURE AUDIT

**Date:** November 2026  
**Auditor:** Senior Shopify Theme Architect & Principal Liquid Developer  
**Theme:** Aura Botanica (Luxury Botanical Skincare)  
**Standard:** Shopify Online Store 2.0 (OS 2.0) Architecture & Theme Editor Specification  
**Package:** `aura-skincare-theme.zip`  

---

## 1. Executive Summary & Repository Inspection (Rule 1)

Following strict architectural review of the repository, the project consists of two distinct subsystems:
1. **The Storefront Shopify Liquid Theme:**
   - Primary distribution package directory: `/shopify-theme/`
   - Mirrored development roots: `/assets/`, `/blocks/`, `/config/`, `/layout/`, `/locales/`, `/sections/`, `/snippets/`, `/templates/`
   - Installable release archive: `aura-skincare-theme.zip`
2. **The Standalone Developer Preview & Admin Engine:**
   - Zero-dependency Node.js HTTP server: `dev-server.js` (Ports 3000 / 3001)
   - Merchant Admin Hub: `/preview/admin.html`, `/preview/admin-login.html`
   - Storefront Mock Preview: `/preview/index.html`, `/preview/product.html`, `/preview/collection.html`, `/preview/cart.html`, `/preview/checkout.html`
   - Local JSON Datastores: `/data/products.json`, `/data/orders.json`

---

## 2. Structural & Architectural Deficiencies Identified

Prior to this rebuild, the repository suffered from several architectural inconsistencies:

### A. Non-Standard / Legacy Setting Naming in `settings_data.json`
- `settings_data.json` lacked an explicit `presets.Default` block conforming to modern OS 2.0 standards, relying solely on `current`.
- Legacy keys (`enable_page_transition`, `show_variant_swatch_image`, `use_theme_currencies`, `theme_currencies`) lingered in data definitions without corresponding declarations in `settings_schema.json`, causing the Shopify Theme Editor parser to crash and drop `color_schemes`.

### B. Missing Core OS 2.0 Sections Required by Aura Botanica Specification
Several essential luxury botanical skincare sections specified in Rule 6 were either missing, aliased under legacy names, or lacked native block support:
- `slideshow.liquid` (aliased as legacy `banner-with-slider.liquid`)
- `image-banner.liquid` (aliased as `custom-banner.liquid`)
- `multicolumn.liquid` (missing standard multicolumn section)
- `logo-list.liquid` (aliased as `brands-list.liquid`)
- `featured-collection.liquid` (missing standard grid-based featured collection)
- `collection-list.liquid` (only `collection-list-template` existed)
- `product-comparison.liquid` (missing dedicated standalone comparison section)
- `ingredient-spotlight.liquid` (essential for botanical actives storytelling)
- `ritual-steps.liquid` (essential for morning/evening skincare routines)
- `before-after.liquid` (essential for clinical before & after image slider)
- `announcement-bar.liquid` (aliased as misspelled `annoucement.liquid`)
- `promotional-banner.liquid` (missing dedicated promo section)
- `marquee.liquid` (missing continuous botanical ticker)
- `spacer-divider.liquid` (aliased as `empty-space.liquid`)

### C. Missing Presets Block in `config/settings_data.json`
Rule 4 mandates both a `current` object and a `presets` object ("Default") with comprehensive Aura Botanica luxury skincare tokens (Warm Ivory `#FCFBF7`, Deep Forest Green `#18231F`, Sand `#F4EFE6`, Muted Copper `#B9784D`).

### D. CSS Variables Mapping in Liquid
While `main.css` and `style-tags.liquid` existed, global layout tokens (`container_width`, `global_border_radius`, `card_border_radius`, `btn_border_radius`, typography scales) required clean synchronization with CSS custom properties on `:root` and `.m-color-{{ scheme.id }}`.

---

## 3. Architecture Audit & Compliance Matrix

| Component | Shopify OS 2.0 Requirement | Pre-Rebuild Status | Rebuild Target |
|---|---|---|---|
| **Root Directories** | 8 mandatory folders + `customers/` | PASS (9/9 present) | Maintain strict POSIX structure |
| **`theme.liquid`** | Valid HTML5, `content_for_header`, `content_for_layout`, section groups | PARTIAL (CSS bridge required) | Complete native Liquid layout |
| **`settings_schema.json`** | 10 logical categories (A-J) with valid Shopify types | PARTIAL (Missing explicit A-J groups) | Full 10-group re-architecture |
| **`settings_data.json`** | `current` + `presets.Default` matching schema 1:1 | PARTIAL (Missing presets block) | Populate 100% matching presets |
| **Header Group** | JSON section group (`header-group.json`) | PASS | Standardize section references |
| **Footer Group** | JSON section group (`footer-group.json`) | PASS | Standardize section references |
| **JSON Templates** | 11 core templates referencing valid sections | PASS (36 templates present) | Ensure 100% valid section types |
| **Rule 6 Sections** | 27 required modular sections | 14 Present, 13 Missing/Aliased | Implement all 27 sections |
| **Product Form & Cart** | Native `<form action="/cart/add">`, variant ID, AJAX endpoints | PASS (Dual sync implemented) | Maintain zero-data-loss pipeline |
| **ZIP Packaging** | `tar.exe` POSIX forward slashes (`/`) | PASS (bsdtar verified) | Retain POSIX forward slashes |
| **Admin Portal** | Separate React/Node preview engine | PASS (Preserved on ports 3000/3001) | Keep zero-interference boundary |

---

## 4. Rebuild & Execution Plan

1. **Step 1:** Establish clean directory structure in `shopify-theme/` and root.
2. **Step 2:** Implement all missing Rule 6 sections (`slideshow.liquid`, `image-banner.liquid`, `multicolumn.liquid`, `logo-list.liquid`, `featured-collection.liquid`, `collection-list.liquid`, `product-comparison.liquid`, `ingredient-spotlight.liquid`, `ritual-steps.liquid`, `before-after.liquid`, `announcement-bar.liquid`, `promotional-banner.liquid`, `marquee.liquid`, `spacer-divider.liquid`).
3. **Step 3:** Re-architect `config/settings_schema.json` into the comprehensive 10 logical categories (A-J).
4. **Step 4:** Construct `config/settings_data.json` with both `current` and `presets.Default` containing Aura Botanica luxury tokens.
5. **Step 5:** Synchronize CSS custom properties in `snippets/style-tags.liquid` and `layout/theme.liquid`.
6. **Step 6:** Validate all templates, section groups, and schemas using `validate-theme.js`.
7. **Step 7:** Re-package `aura-skincare-theme.zip` with `tar.exe` and verify POSIX integrity.

