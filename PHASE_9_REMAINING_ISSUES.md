# Phase 9 — Aura Botanica: Remaining Issues & Merchant Action Items

## 1. Overview
This document outlines non-code limitations, merchant content prerequisites, and image replacement recommendations required before final public launch on a production Shopify store.

---

## 2. Merchant Image Replacement Requirements (Task 8 Art Direction)
While all code-level aspect ratios (`4:5`), image containers, and layout rules are enforced, the merchant must replace placeholder catalog photography with real brand assets adhering to the following guidelines:

### 2.1 Product Photography Art Direction
- **Aspect Ratio**: Standardize on **4:5 portrait** (recommended resolution: `1600 x 2000 px`, web-optimized PNG or JPG).
- **Lighting & Ambiance**: Natural diffused daylight, warm ivory or soft mineral stone backgrounds, subtle realistic shadows.
- **Packaging Realism**: Authentic glass dropper bottles, amber cosmetic jars, matte cream pumps with clean typography. Avoid exaggerated artificial reflections or surreal AI compositions.
- **Secondary / Hover Images**: Texture macro shots (e.g., golden oil droplet, whipped cloud cream texture, foaming botanical cleanser lather).

### 2.2 Hero Slideshow Assets
- **Recommended Desktop Dimensions**: `2880 x 1400 px` (high-DPI 2x for Retina displays).
- **Recommended Mobile Dimensions**: `1080 x 1350 px` (vertical portrait orientation).
- **Current Status**: The slider references demo placeholders; the merchant should upload real lifestyle imagery showing clinical application or botanical sourcing.

---

## 3. Merchant Content Requirements
1. **Instagram Account Connection**:
   - Replace placeholder link `https://www.instagram.com/aurabotanica/` with the brand's verified Instagram handle in Theme Editor → Section "Instagram".
2. **Policy Pages**:
   - Populate standard store policies under Shopify Admin → Settings → Policies (Privacy Policy, Refund Policy, Terms of Service, Shipping Policy).
3. **Product Catalog & Inventory**:
   - Populate real Shopify product catalog with actual variant SKUs, inventory quantities, and prices.
   - Assign products to matching collections (`all`, `serums`, `creams`, `cleansers`, `elixirs`).

---

## 4. Development Store Testing Prerequisites
1. **Shopify Admin Upload**:
   - The packaged archive `aura-skincare-theme.zip` (1.09 MB) is ready to upload directly via:
     `Shopify Admin → Online Store → Themes → Add Theme → Upload zip file`.
2. **Shopify CLI Remote Dev Server**:
   - Running `shopify theme dev` requires an active Shopify Partner store login with the appropriate theme access tokens.
