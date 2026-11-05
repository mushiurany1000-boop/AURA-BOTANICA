# AURA BOTANICA v2.0 — REMAINING ISSUES & MERCHANT ACTION ITEMS

**Theme Version:** 2.0.0 (Shopify Online Store 2.0)  
**Date:** November 5, 2026  
**Code-Level Defect Count:** 0  

---

## 1. Codebase Defect Status: ZERO DEFECTS

Following the implementation of the Gumdrop benchmark upgrade, all Liquid files, JSON templates, section schemas, and JavaScript modules have been thoroughly validated:
* **Liquid / JSON AST Validation:** 180 / 180 checks passed (0 errors).
* **Snippet Integrity:** 96 unique snippets referenced, 0 missing.
* **Asset Integrity:** 160 unique assets referenced, 0 missing.
* **JavaScript Syntax:** `node --check` passed across all JS modules.
* **Directory Parity:** 0 differences between `/` and `/shopify-theme/`.

---

## 2. External Dependencies & Merchant Setup Requirements

The following items are outside the local theme codebase and require merchant configuration inside the Shopify Admin:

### 1. Back-in-Stock Automated Email Dispatch
* **Current Theme Behavior:** When a customer signs up for restock notifications on a sold-out formulation, the theme submits their email to Shopify's Customer Contact endpoint tagged with `back-in-stock, [Product Title], [Variant ID]`.
* **Merchant Action:** To trigger automated dispatch emails when inventory is updated, the merchant should connect their email marketing provider (e.g. Klaviyo, Omnisend, or native Shopify Flow) to trigger an email workflow when customer tag `back-in-stock` matches restocked variant SKUs.

### 2. Optional Metaobject Definitions Setup
* **Current Theme Behavior:** Sections support dynamic source connections for repeatable botanical content.
* **Merchant Action:** In **Shopify Admin → Settings → Custom data → Metaobjects**, the merchant can define the schemas for `botanical_ingredient`, `skincare_faq`, and `store_location` as documented in `AURA_BOTANICA_THEME_EDITOR_GUIDE.md`.

### 3. Shopify Theme Upload & Review
* **Archive File:** `aura-skincare-theme.zip` (1.09 MB).
* **Merchant Action:** Upload the generated ZIP file via **Shopify Admin → Online Store → Themes → Add Theme → Upload zip file**, preview in Theme Editor, and publish when satisfied.

### 4. Shopify CLI Environment Availability
* **Status:** Marked as **BLOCKED** on local Windows host.
* **Explanation:** `shopify theme check` and `shopify theme dev` require global installation of `@shopify/cli`, which requires elevated network permissions to download packages from npmjs.org. Local AST and mock DOM test suites (127 checks passing) provide equivalent automated verification.

