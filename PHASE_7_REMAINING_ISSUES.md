# PHASE 7 — AURA BOTANICA: REMAINING ISSUES & STORE ACCEPTANCE GUIDE

**Theme:** Aura Botanica — Modern Luxury Skincare  
**Date:** November 4, 2026  
**Status:** ZERO CODE-LEVEL DEFECTS (All Internal Issues Resolved)  

---

## 1. Code-Level Issues Status

* **Critical Defects:** 0
* **High Severity Defects:** 0
* **Medium Severity Defects:** 0
* **Missing Snippets:** 0
* **Missing Assets:** 0
* **Invalid Schemas:** 0
* **Broken Template References:** 0

All code-level Liquid, JSON, JavaScript, CSS, and Theme Editor issues have been identified, repaired, and verified across both the project root and the `shopify-theme/` directory.

---

## 2. External & Merchant-Dependent Actions (Pending Store Launch)

The following items cannot be executed locally and require merchant access inside the live Shopify store environment:

### 1. Payment Gateway & Real Checkout Verification (Status: BLOCKED / PENDING MERCHANT)
* **Reason:** Live store checkout processing requires a registered payment provider and merchant credentials.
* **Merchant Action:**
  1. In Shopify Admin, navigate to **Settings > Payments**.
  2. Activate **Shopify Bogus Gateway** (or test mode on Shopify Payments).
  3. Place a test transaction on the storefront using credit card number `1` with any future expiry date and 3-digit CVV.
  4. Confirm that the order confirmation and thank-you pages render smoothly.

### 2. Optional Third-Party App Installations (Status: OPTIONAL / PLUG-AND-PLAY)
* **Reason:** Third-party review apps (Judge.me, Loox, Yotpo) or wishlist apps (Growave) require merchant installation from the Shopify App Store.
* **Current Theme State:** The theme includes built-in fallback bridges for all review and wishlist snippets. The theme will render cleanly without error whether apps are installed or not.
* **Merchant Action:** If product reviews or advanced wishlist sync are desired, install the preferred app from the Shopify App Store and enable its App Embed in the Theme Editor.

### 3. Store Navigation Menus & Policy Pages (Status: PENDING MERCHANT SETUP)
* **Reason:** Navigation menus (Main Menu, Footer Menu) and legal policies (Privacy Policy, Terms of Service, Refund Policy) are configured in Shopify Admin settings, not within theme code.
* **Merchant Action:**
  1. Go to **Online Store > Navigation** and confirm links in your **Main menu** and **Footer menu**.
  2. Go to **Settings > Policies** to generate or paste your store's legal disclosures.

### 4. Theme Editor Template Selection Reminder
* When opening the Shopify Theme Editor, verify that the top-center page selector dropdown is set to **"Home page"** to customize the live storefront rather than the `404 page` error template.
