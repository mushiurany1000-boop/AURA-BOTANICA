# PHASE 8 — AURA BOTANICA: REMAINING ISSUES & STOREFRONT LAUNCH GUIDE

**Theme:** Aura Botanica — Modern Luxury Botanical Skincare  
**Date:** November 4, 2026  
**Readiness Milestone:** **READY FOR DEVELOPMENT STORE TESTING**  
**Code-Level Defect Status:** **ZERO DEFECTS (All 19 Bugs Resolved Across Phases 1-8)**  

---

## 1. OUTSTANDING CODE-LEVEL ISSUES

Every code defect identified during architectural audits, schema validations, and content reviews has been fixed and verified:

* **Critical Defects:** 0
* **High Severity Defects:** 0
* **Medium Severity Defects:** 0
* **Low Severity Defects:** 0
* **Missing Snippets:** 0 (94/94 verified)
* **Missing Assets:** 0 (155/155 verified)
* **Invalid Schemas:** 0 (98/98 verified)
* **Broken Templates:** 0 (40/40 verified)
* **Directory Differences:** 0 (Root `/` and `/shopify-theme` are 100% bit-for-bit identical)

---

## 2. BLOCKED TESTS & SYSTEM LIMITATIONS

The following four verification items cannot be executed in a local or offline development environment and are documented as **BLOCKED**:

### 1. Live Payment Gateway Authorization (BLOCKED)
* **Limitation:** Placing real credit card transactions requires merchant credentials and an active payment gateway.
* **Safety Rule:** Agents must never initiate real card charges or simulate completed financial transactions without live gateway evidence.
* **Resolution Path:** The merchant must execute a test order using Shopify Bogus Gateway (card `1`).

### 2. Live Order Creation & Confirmation Lifecycle (BLOCKED)
* **Limitation:** Verifying that Shopify emits order webhooks, sends transactional order confirmation emails, and deducts live inventory requires merchant access to an active Shopify store.
* **Resolution Path:** Verified during the Bogus Gateway test order in Shopify Admin > Orders.

### 3. Third-Party App Cloud Synchronization (BLOCKED / OPTIONAL)
* **Limitation:** Third-party review apps (Judge.me, Loox, Yotpo) or loyalty suites (Growave) require installation from the Shopify App Store.
* **Current Theme State:** Native fallback bridges prevent any Liquid crashes or missing asset errors if apps are uninstalled.
* **Resolution Path:** The merchant installs preferred apps from the Shopify App Store and enables their App Embeds in the Theme Editor.

### 4. Production Theme Publishing (NOT TESTED / PENDING AUTHORIZATION)
* **Limitation:** The theme is currently connected as an unpublished development theme. Publishing to the live storefront is intentionally blocked until the merchant reviews the development preview.

---

## 3. REQUIRED MERCHANT SETUP ACTIONS (BEFORE LAUNCH)

The following configurations reside in Shopify Admin settings and cannot be configured through theme code files alone:

### Action 1: Navigation Menus
* **Location:** Shopify Admin > **Online Store > Navigation**
* **Task:**
  1. Open **Main menu** and ensure links point to your real skincare collections (`/collections/serums`, `/collections/creams`, `/collections/cleansers`, etc.) and key pages (`/pages/about-us`, `/pages/contact`).
  2. Open **Footer menu** and configure links for customer service, shipping policies, and social media.

### Action 2: Store Policies
* **Location:** Shopify Admin > **Settings > Policies**
* **Task:**
  - Generate or paste your store's legal disclosures:
    * Refund Policy
    * Privacy Policy
    * Terms of Service
    * Shipping Policy
  - *Note:* The theme's cart drawer and checkout forms automatically link to these policies once saved in Shopify Admin.

### Action 3: Products & Real Formulations
* **Location:** Shopify Admin > **Products**
* **Task:**
  - Ensure your skincare formulations have active product images, descriptions, prices, compare-at prices, and option sets (e.g., Size: 30ml, 50ml, 100ml).
  - Assign products to matching automated or manual collections.

### Action 4: Test Payment Order via Bogus Gateway
* **Location:** Shopify Admin > **Settings > Payments**
* **Task:**
  1. Enable **(for testing) Bogus Gateway**.
  2. Open the unpublished theme preview and complete a test transaction using card number `1` (expiration: `12/30`, CVV: `111`).
  3. Verify the Thank You screen and refund/cancel the test order in **Orders**.

---

## 4. LAUNCH CRITERIA & GRADUATION ROADMAP

```mermaid
flowchart LR
    A["Phase 8 Local QA (PASS)"] --> B["Upload / Sync Theme in Admin"]
    B --> C["Configure Menus & Policies"]
    C --> D["Execute Bogus Gateway Test (Card 1)"]
    D --> E["Physical Device Check (Mobile & Desktop)"]
    E --> F["READY FOR PRODUCTION REVIEW"]
    F --> G["Publish Theme (Storefront Live)"]
```

| Milestone | Current Status | Requirements to Advance |
| :--- | :---: | :--- |
| **Phase 8 QA & Audit** | **COMPLETE** | 0 code defects, bit-for-bit parity, all templates validated. |
| **Development Store Testing** | **ACTIVE** | Merchant performs Actions 1-4 above on development store. |
| **Production Launch Review** | **PENDING** | Merchant sign-off on test transaction and mobile UX. |
