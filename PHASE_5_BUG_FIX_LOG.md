# AURA BOTANICA — PHASE 5: BUG FIX & REMEDIATION LOG

**Theme:** Aura Botanica Luxury Skincare Theme (Online Store 2.0)  
**Version:** 5.3.0  
**Phase:** Phase 5 Feature Expansion  
**Date:** November 3, 2026  

---

## 1. Resolved Issues During Phase 5

### BUG-011: Card Tooltip Setting Property Syntax Typo
- **Severity:** HIGH (Blocked Quick View & Compare Button on Product Cards)
- **Symptom:** Quick View and Compare buttons failed to display on product cards despite being enabled in Theme Settings.
- **Root Cause:** In `snippets/product-card-1.liquid` through `snippets/product-card-5.liquid`, tooltip settings were checked via `{%- if [settings_key] -%}` rather than `{%- if settings[settings_key] -%}`. Without the `settings` object accessor, Liquid failed to evaluate the boolean toggle.
- **Resolution:** Replaced all occurrences of `{%- if [settings_key] -%}` with `{%- if settings[settings_key] -%}` across all five product card snippets.
- **Files Modified:** `snippets/product-card-1.liquid` through `product-card-5.liquid` (and `shopify-theme/` mirrors).
- **Verification:** Verified via `node scripts/fix-card-tooltips.js`.

---

### BUG-012: Missing Free Shipping Goal in Cart Drawer
- **Severity:** MEDIUM (Missed Premium AOV Conversion Feature)
- **Symptom:** Cart drawer rendered empty `<foxkit-cart-goal></foxkit-cart-goal>` which was inert without a third-party app subscription.
- **Root Cause:** The theme lacked a native Liquid calculation engine for free shipping thresholds.
- **Resolution:**
  1. Registered `free_shipping_threshold` setting in `config/settings_schema.json` under Cart settings.
  2. Initialized default threshold of `$75` in `config/settings_data.json`.
  3. Built and embedded a native, lightweight Free Shipping Progress Bar into `snippets/cart-drawer.liquid` and `sections/cart-template.liquid`.
- **Files Modified:** `config/settings_schema.json`, `config/settings_data.json`, `snippets/cart-drawer.liquid`, `sections/cart-template.liquid` (and `shopify-theme/` mirrors).
- **Verification:** Verified via `node scripts/patch-cart-shipping-bar.js` and `node scripts/test-shopping-flows.js`.

---

### BUG-013: Missing Keyboard Escape Key Handlers in Search & Navigation
- **Severity:** MEDIUM (Accessibility / WCAG Compliance)
- **Symptom:** Keyboard-only users could not dismiss the predictive search popup or open mega-menus by pressing the `Escape` key.
- **Root Cause:** Event listeners in `assets/predictive-search.js` and `assets/header.js` only listened to pointer clicks, without global keyboard `Escape` handling.
- **Resolution:** Added `keydown` event listeners to `assets/predictive-search.js` (`event.key === "Escape"` -> `this.close(true)`) and `assets/header.js` (closes open drawers and active menus).
- **Files Modified:** `assets/predictive-search.js`, `assets/header.js` (and `shopify-theme/` mirrors).
- **Verification:** Verified via `node scripts/patch-keyboard-accessibility.js`.

---

### BUG-014: Residual Trailing Newline Diff in Snippet Mirroring
- **Severity:** LOW
- **Symptom:** `scripts/diff-all-theme-files.js` detected 1 line difference between root and `shopify-theme/snippets/ssw-widget-faveicon.liquid`.
- **Root Cause:** Formatting difference during Phase 4 bridge generation.
- **Resolution:** Synchronized file byte-for-byte.
- **Files Modified:** `shopify-theme/snippets/ssw-widget-faveicon.liquid`.
- **Verification:** Verified via `node scripts/diff-all-theme-files.js` (0 differences).

---

## 2. Summary
- Total Defects Identified in Phase 5: 4
- Total Defects Resolved in Phase 5: 4
- Regressions Detected: 0
- Cumulative Resolved Defects Across All Phases: 14 (BUG-001 through BUG-014)
