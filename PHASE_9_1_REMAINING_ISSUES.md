# PHASE 9.1 — REMAINING ISSUES & MERCHANT ONBOARDING GUIDE
## Aura Botanica — Post-Upgrade Merchant Actions
**Report Date:** November 5, 2026  
**Theme Version:** Aura Botanica v2.0.0 (Phase 9.1)

---

## 1. Executive Summary

With the code-level implementation, typography pipeline, botanical color palette, and OS 2.0 customization fully verified across automated test suites, the theme is technically production-ready. 

The following items are outside the theme code codebase and require merchant action within the live Shopify admin dashboard.

---

## 2. Action Items Requiring Merchant Configuration

### 2.1 Bespoke Botanical Photography & Media Assets
* **Current State:** The theme templates utilize elegant SVG placeholders and royalty-free botanical mockup images.
* **Merchant Recommendation:** Replace placeholder imagery with authentic, high-resolution product photography:
  - **Product Photography Aspect Ratio:** Strictly capture or crop bottles in **4:5 portrait ratio** (e.g. 1600px wide $\times$ 2000px tall).
  - **Visual Treatment:** Consistent lighting with warm natural shadows, amber glass apothecary bottles, dropper dispensers, and tactile natural stone or linen surfaces.
  - **Lifestyle / Storytelling Imagery:** Macro photography of wild-harvested botanicals (damask rose petals, cold-pressed sea buckthorn berries, camellia seeds).

### 2.2 Live Instagram & Social Media Handles
* **Current State:** Default demo social placeholders (`https://instagram.com/shopify`).
* **Merchant Action:**
  1. Navigate to **Shopify Admin $\rightarrow$ Online Store $\rightarrow$ Themes $\rightarrow$ Customize**.
  2. Select **Theme settings $\rightarrow$ Social media**.
  3. Enter the brand's verified social URLs (`instagram_link`, `tiktok_link`, `pinterest_link`).
  4. Optionally connect an official Instagram Feed app (e.g., Instafeed / Mintt) into the App wrapper block in `templates/index.json`.

### 2.3 Store Legal Policies & Regulatory Compliance
* **Current State:** Standard template links (`/policies/refund-policy`, `/policies/shipping-policy`, `/policies/terms-of-service`, `/policies/privacy-policy`).
* **Merchant Action:**
  1. In **Shopify Admin $\rightarrow$ Settings $\rightarrow$ Policies**, generate or paste the official company policies:
     - Refund Policy (30-day botanical guarantee)
     - Privacy Policy (GDPR / CCPA disclosures)
     - Terms of Service
     - Shipping Policy (Domestic & International cold-chain or standard fulfillment)
  2. The theme will automatically link these into the footer copyright navigation and checkout pages.

### 2.4 Live Payment Gateway & Shopify Payments Activation
* **Current State:** Verified that cart redirect routes to `/checkout`. Live transactions were marked **BLOCKED** during local testing due to sandbox security boundaries.
* **Merchant Action:**
  1. In **Shopify Admin $\rightarrow$ Settings $\rightarrow$ Payments**, activate **Shopify Payments**, **Shop Pay**, **Apple Pay**, and **Google Pay**.
  2. Enable Shopify Test Mode (`Bogus Gateway`) to run a complete end-to-end sandbox checkout test before taking the storefront live.

---

## 3. Theme Deployment Verification Checklist

When deploying `aura-skincare-theme.zip` to your Shopify store:
1. Go to **Shopify Admin $\rightarrow$ Online Store $\rightarrow$ Themes**.
2. Click **Add Theme $\rightarrow$ Upload zip file**, and select `aura-skincare-theme.zip`.
3. Click **Customize** on the uploaded theme.
4. Verify that the typography shows **Playfair Display** headings and **Montserrat** body.
5. Verify that the primary button is **Forest Green** (`#315B45`) and turns **Deep Botanical Green** on hover.
6. Verify that Tab navigation displays the **Champagne Gold** focus outline.
7. Click **Actions $\rightarrow$ Publish** when ready to take the theme live.
