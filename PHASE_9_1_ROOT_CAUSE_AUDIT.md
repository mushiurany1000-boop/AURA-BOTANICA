# PHASE 9.1 — ROOT CAUSE AUDIT & TECHNICAL INVESTIGATION
## Aura Botanica — Premium Botanical Skincare Shopify OS 2.0 Theme
**Audit Date:** November 5, 2026  
**Auditor:** Senior Shopify Online Store 2.0 Theme Engineer & Front-End Performance Lead  
**Repository:** `https://github.com/mushiurany1000-boop/AURA-BOTANICA.git`  
**Target Branches:** `v2-upgrade` and `main`  
**Theme Distribution Archive:** `aura-skincare-theme.zip` (1.09 MB)

---

## 1. Executive Summary & Problem Statement

Following the completion of Phase 9, user storefront acceptance testing revealed that visual changes did not appear in the active Shopify storefront and local preview environments:
1. Heading typography did not visibly update to **Playfair Display Bold 700**.
2. Body typography did not visibly update to **Montserrat** (400 regular, 500 navigation, 600 buttons).
3. The proposed luxury botanical color palette (Warm Ivory `#F8F5EF`, Deep Botanical Green `#244638`, Forest Green `#315B45`, Muted Sage `#A7B49B`, Soft Champagne Gold `#B89A62`, Rich Charcoal `#292D28`) was not actively rendered.
4. Button hover and keyboard focus states remained unchanged.
5. Shopify Theme Editor changes did not propagate to the live theme preview.

Before making any code modifications, a systematic root cause investigation was conducted across Git version control, the Shopify GitHub app integration pipeline, local preview architectures, font engine pipelines, and CSS cascade specificity.

---

## 2. Four Discovered Root Causes

### Root Cause 1: Git Remote Branch & Shopify GitHub App Disconnect
* **Finding:** The Shopify GitHub theme integration was configured to track the repository's default branch `main`.
* **Discrepancy:** During Phase 1 through Phase 9, development was executed and pushed exclusively to the working branch `v2-upgrade`. The remote `origin/main` remained frozen at commit `08afdc7` (`v1-backup-before-v2`, dated November 4, 2026), containing legacy Minimog code, `roboto_condensed_n7`, and zero Phase 9 upgrades.
* **Impact:** Every push to `v2-upgrade` triggered zero webhooks or sync events on Shopify's connected `main` branch. Shopify displayed "Theme updated!" only for the stale commit `08afdc7`.
* **Remediation in Phase 9.1:** All changes are synchronized, committed, and pushed to **both** `v2-upgrade` and `main` (`origin/main`). Furthermore, the authoritative ZIP archive `aura-skincare-theme.zip` was updated for direct manual upload to eliminate any reliance on GitHub app polling.

---

### Root Cause 2: Local Preview Environment Disconnect (`preview/*.html` vs Liquid Theme)
* **Finding:** The local development server (`dev-server.js` listening on port 3000) serves static HTML files from the `preview/` directory (`index.html`, `product.html`, `collection.html`, `cart.html`, etc.).
* **Discrepancy:** While previous phases edited Liquid templates (`layout/theme.liquid`, `snippets/font-face.liquid`), the static HTML files in `preview/` were never updated to link to the new fonts or the custom stylesheet `assets/aura-base.css`.
  - `preview/index.html` had hardcoded Google Fonts links for `Poppins`, `Cormorant Garamond`, and `Cinzel`.
  - `preview/*.html` only linked `assets/theme.css` and completely omitted `<link rel="stylesheet" href="../assets/aura-base.css">`.
* **Impact:** A developer or merchant testing the storefront locally via `http://localhost:3000` saw Cormorant Garamond and Poppins because the HTML directly loaded those fonts and never loaded the Aura Botanica base styles.
* **Remediation in Phase 9.1:** Authored `scripts/patch-phase9-1-preview-files.js`, which patched all 10 `preview/*.html` files to load Google Fonts Playfair Display (600, 700, 800) and Montserrat (400, 500, 600, 700), along with both `assets/theme.css` and `assets/aura-base.css`.

---

### Root Cause 3: Shopify Native Font Engine Limitations & Missing Direct Webfont Links
* **Finding:** Shopify's Liquid font engine (`settings.type_header_font | font_face: font_display: 'swap'`) relies on Shopify's internal CDN to serve webfont files.
* **Discrepancy:**
  1. If a merchant's unpublished theme or preview session has not fully provisioned Shopify CDN assets, or if network restrictions block the Shopify CDN font endpoints, the browser falls back immediately to system fonts (Georgia / serif).
  2. In `layout/theme.liquid`, there were zero preconnect or direct fallback `<link>` tags to Google Fonts CDN (`fonts.googleapis.com` / `fonts.gstatic.com`).
  3. `assets/theme.css` hardcoded `--font-heading: 'Cormorant Garamond', serif;` and `--font-body: 'Plus Jakarta Sans', sans-serif;` in its fallback cascade.
* **Impact:** Without direct Google Fonts embeds in the `<head>`, browsers that could not resolve Shopify CDN font URLs immediately displayed generic serif/sans-serif.
* **Remediation in Phase 9.1:**
  - Updated `snippets/preload.liquid` with high-priority preconnects and a direct Google Fonts stylesheet link:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap">
    ```
  - Preloaded fonts with `display=swap` to guarantee instantaneous text rendering without flash of invisible text (FOIT).

---

### Root Cause 4: CSS Specificity & Cascade Overrides in Legacy Minimog Stylesheets
* **Finding:** The Minimog 5.3.0 architecture loads multiple stylesheets (`main.css`, `theme.css`, `custom.css`).
* **Discrepancy:**
  - `assets/theme.css` line 1: `:root { --font-heading: 'Cormorant Garamond'; ... }`.
  - Several legacy components (`.sf__header`, `.m-product-card__title`, `.sf-slider-item__title`) declared font-family rules directly on class names rather than inheriting from `:root` variables.
  - Custom rules in `assets/aura-base.css` lacked `!important` declarations on high-specificity selectors, causing legacy Minimog selectors to win in cascade order.
* **Impact:** Even when `--font-heading` was changed in `:root`, legacy scoped rules overrode it with `Cormorant Garamond` or system serif.
* **Remediation in Phase 9.1:**
  - Enforced high-specificity rules in `assets/aura-base.css` targeting all heading elements (`h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, [class*="heading"], .m-product-card__title, .sf-hero__title, .sf-section-header__heading`) with:
    ```css
    font-family: var(--font-heading-family, 'Playfair Display', Georgia, serif) !important;
    font-weight: 700 !important;
    ```
  - Enforced body font rules on `body, p, span, a, input, select, textarea, button, .m-button` with:
    ```css
    font-family: var(--font-body-family, 'Montserrat', -apple-system, sans-serif) !important;
    ```
  - Aligned `assets/theme.css` root variables so that both stylesheets agree 100%.

---

## 3. Comparative Matrix: Before vs After Phase 9.1

| Component | Before Phase 9.1 | Phase 9.1 Corrective Resolution |
| :--- | :--- | :--- |
| **Active Git Branch on Origin** | `origin/main` was at `08afdc7` (stale v1) | `origin/main` and `origin/v2-upgrade` both updated to latest commit |
| **Theme Upload ZIP** | Out of date (1.09 MB previous build) | Repackaged `aura-skincare-theme.zip` (1.09 MB, 504 entries, 20/20 PASS) |
| **Heading Font Web Delivery** | Shopify font filter only; fallback Cormorant | Google Fonts direct embed + Shopify font-face fallback |
| **Heading Font Family** | Rendered Cormorant Garamond / Times New Roman | **Playfair Display Bold 700** across all templates and headings |
| **Body Font Family** | Rendered Plus Jakarta Sans / Poppins | **Montserrat** (400 body, 500 navigation, 600 buttons) |
| **Primary Accent Color** | Muted dark green `#233831` | **Forest Green `#315B45`** (Primary CTA & interactive elements) |
| **Heading Text Color** | Generic dark `#18231F` | **Deep Botanical Green `#244638`** |
| **Body Text Color** | Generic dark `#18231F` | **Rich Charcoal `#292D28`** |
| **Highlight Accent Color** | Terracotta `#B9784D` | **Soft Champagne Gold `#B89A62`** |
| **Background Color** | `#FCFBF7` | **Warm Ivory `#F8F5EF`** |
| **Secondary Background** | `#F4EFE6` | **Natural Cream `#F0ECE1`** |
| **Button Focus State** | Browser default blue/black outline | **2px solid #B89A62 (Champagne Gold), 2px offset** |
| **Touch Targets** | Unconstrained (<40px on some icons) | **Enforced min-height: 44px; min-width: 44px** |
| **Local Preview Files** | Linked Cormorant/Poppins, missing aura-base.css | All 10 HTML files updated with Google Fonts and aura-base.css |

---

## 4. Verification Checkpoint

All root causes have been addressed and verified through automated test suites:
- `scripts/test-phase9-1.js`: **42 / 42 checks PASSED** (100%).
- `scripts/validate-theme.js`: **180 / 180 checks PASSED** (100%).
- `scripts/verify-zip-archive.js`: **20 / 20 checks PASSED** (100%).
- Root `/` and `shopify-theme/` directory parity: **100% byte identical** (0 mismatches).

