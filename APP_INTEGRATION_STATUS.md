# AURA BOTANICA: APP & THIRD-PARTY INTEGRATION STATUS

**Theme:** Aura Botanica (Shopify OS 2.0)  
**Date:** November 3, 2026  
**Document Purpose:** Complete audit of all app integrations, theme app extensions, and third-party bridges supported by the theme.

---

## 1. App Integration Overview

The Aura Botanica theme follows Shopify Online Store 2.0 best practices:
1. Core ecommerce features (Cart Drawer, Free Shipping Bar, Variant Picker, Quick View, Predictive Search, Image Swatches) are built **natively into the theme with zero app dependencies**.
2. Third-party integrations (Reviews, Wishlist, Analytics) are structured via **App Blocks**, **Theme App Extensions**, or **defensive fallback bridges** so that the theme functions flawlessly whether an app is installed or not.

---

## 2. Integration Status Matrix

| Integration Domain | Required App / Service | Theme Implementation | Configuration Required in Admin | Test Status | Remaining Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Product Reviews & Star Ratings** | Judge.me, Loox, Yotpo, or Shopify Reviews | `snippets/product-reviews-app__badge.liquid` & `snippets/product-reviews-app__snippet.liquid` | Install preferred review app from Shopify App Store; add App Block in Theme Editor | **PASS (Fallback Verified)** | Merchant to install review app if product ratings are desired |
| **Customer Wishlist** | Growave, Swym, or Smart Wishlist | `snippets/ssw-widget-faveicon.liquid` & `snippets/header-option-item__wishlist.liquid` | Install wishlist app or enable theme wishlist page template (`templates/page.wishlist.json`) | **PASS (Fallback Verified)** | Merchant can choose between theme local-storage wishlist or specialized app |
| **Product Recommendations** | Native Shopify Search & Discovery App | `sections/product-recommendations.liquid` querying `routes.product_recommendations_url` | Install free **Shopify Search & Discovery** app to curate custom product relationships | **PASS (100% Native)** | None required (works out of the box using Shopify's default AI model) |
| **Email Marketing & Newsletter** | Klaviyo, Omnisend, Mailchimp, or Shopify Forms | `snippets/newsletter-form.liquid` using native `{% form 'customer' %}` tag | Submissions automatically create customer profiles tagged `newsletter` in Shopify Admin | **PASS (100% Native)** | Connect Klaviyo or email app via official Shopify App Integration if automated campaigns needed |
| **Free Shipping Progress Bar** | None (100% Built-in Native) | `snippets/cart-drawer.liquid` & `sections/cart-template.liquid` using `settings.free_shipping_threshold` | Adjust threshold in Theme Editor under **Theme Settings > Cart & Checkout > Free shipping threshold ($)** | **PASS (100% Built-in)** | Merchant can customize dollar threshold (default: $75.00) |
| **Quick View Modal** | None (100% Built-in Native) | `snippets/product-card.liquid` & `assets/quick-view.js` | Toggle on/off in **Theme Settings > Product Cards > Enable Quick View** | **PASS (100% Built-in)** | None required |
| **Live Predictive Search** | None (100% Built-in Native) | `assets/predictive-search.js` querying `/search/suggest.json` | Configure searchable fields via **Shopify Search & Discovery** app if synonyms needed | **PASS (100% Native)** | None required |
| **Cookie & Privacy Consent** | None (Built-in) or Shopify Customer Privacy | `snippets/cookie-banner.liquid` using `settings.show_cookie_consent` | Configure banner text and link in Theme Settings or use Shopify Privacy preferences | **PASS (Built-in)** | Configure under **Settings > Customer privacy** for GDPR/CCPA compliance |
| **Multi-Currency & Language** | Shopify Markets | `snippets/country-selector.liquid` & `snippets/currency-switcher.liquid` | Set up international markets in **Shopify Admin > Settings > Markets** | **PASS (100% Native)** | Add supported currencies in Shopify Markets |
| **Analytics & Pixel Tracking** | Google Analytics 4, Meta Pixel, TikTok Pixel | Loaded securely via Shopify native Customer Events / Web Pixels | In Shopify Admin, go to **Settings > Customer events > Add custom pixel** | **PASS (Shopify Native)** | Add tracking IDs directly in Shopify Admin settings |

---

## 3. App Bridge Architecture & Defensive Design

### Defensive Snippets
Every third-party app snippet includes defensive conditionals. For example, in `snippets/product-reviews-app__badge.liquid`:
```liquid
{%- case settings.review_app -%}
  {%- when 'judgeme' -%}
    {%- render 'judgeme_widgets', widget_type: 'judgeme_preview_badge', ... -%}
  {%- when 'other' -%}
    {%- render 'other-review-app-snippet' -%}
  {%- else -%}
    {%- comment -%} App not configured: safely output zero broken HTML {%- endcomment -%}
{%- endcase -%}
```
If an app is not installed or uninstalled, the theme gracefully renders empty space without throwing Liquid errors or breaking page layout.

