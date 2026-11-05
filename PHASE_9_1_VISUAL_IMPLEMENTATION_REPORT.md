# PHASE 9.1 — VISUAL IMPLEMENTATION REPORT
## Aura Botanica — Premium Botanical Skincare Storefront Redesign
**Report Date:** November 5, 2026  
**Status:** Completed & Verified  
**Theme Version:** Aura Botanica v2.0.0 (Phase 9.1)

---

## 1. Overview & Visual Direction

The goal of Phase 9.1 is to elevate the Aura Botanica storefront from a generic template into a high-end botanical apothecary experience reminiscent of luxury organic beauty houses (such as Aesop, Vintner's Daughter, and Augustinus Bader), while incorporating modern conversion-first patterns benchmarked against Shopify Theme Store leaders (e.g. Gumdrop).

### Visual Pillar 1: Authentic High-Luxury Typography
* **Primary Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`):**
  - Font Family: **Playfair Display** (weights 600, 700, 800; primary rendering in **Bold 700**).
  - Editorial Character: Sophisticated serif with high thick-thin contrast, elegant curves, and tight optical kerning (`letter-spacing: -0.015em` on headlines).
  - Fallbacks: `Georgia, 'Times New Roman', serif`.
* **Body, Form Controls & Metadata:**
  - Font Family: **Montserrat** (weights 400 regular, 500 navigation, 600 buttons, 700 bold).
  - Editorial Character: Clean, geometric sans-serif that balances modern minimalism with legible readability at both 11px micro-copy and 16px body copy.
  - Fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

### Visual Pillar 2: Distinctive Botanical Apothecary Palette
The color system moves completely away from cold greys and stark whites toward an organic, grounded atmosphere:
1. **Warm Ivory (`#F8F5EF` / `rgb(248, 245, 239)`):** Primary page canvas background. Warm, tactile, reminiscent of unbleached botanical parchment.
2. **Natural Cream (`#F0ECE1` / `rgb(240, 236, 225)`):** Secondary card, drawer, and input background.
3. **Deep Botanical Green (`#244638` / `rgb(36, 70, 56)`):** Primary heading and title tone. Rich chlorophyll hue that conveys organic potency.
4. **Forest Green (`#315B45` / `rgb(49, 91, 69)`):** Primary CTA button and active indicator color. Inviting, trustworthy, and conversion-optimized.
5. **Muted Sage (`#A7B49B` / `rgb(167, 180, 155)`):** Secondary accent for subtle badges, secondary buttons, divider accents, and icon flourishes.
6. **Soft Champagne Gold (`#B89A62` / `rgb(184, 154, 98)`):** Highlight accent for star ratings, VIP awards, countdown badges, and accessible focus rings.
7. **Rich Charcoal (`#292D28` / `rgb(41, 45, 40)`):** Primary body text color. Softened from pure black (`#000000`) to avoid harsh eye strain while maintaining 12.86:1 contrast on Warm Ivory.
8. **Warm Stone Border (`#E3DDD1` / `rgb(227, 221, 209)`):** Subtle, organic hairline borders (`1px solid #E3DDD1`).

---

## 2. Storefront Component Overhauls

### 2.1 Hero Banner & Brand Story
* **Typography:** Hero headings render in Playfair Display 700 with fluid clamping (`clamp(2.5rem, 5vw + 1rem, 4.5rem)`).
* **CTA Button:** Primary CTA utilizes Forest Green (`#315B45`) with Warm Ivory text, 44px min-height, 12px vertical / 28px horizontal padding, and smooth transition to Deep Botanical Green (`#244638`) on hover.
* **Aesthetics:** Editorial framing with soft rounded corners (`8px`), subtle micro-badges ("100% Wild-Harvested Bio-Actives"), and Champagne Gold rating stars (`#B89A62`).

### 2.2 Product Cards & Grid Layouts
* **Aspect Ratio:** Fixed at **4:5 portrait ratio** across all collection grids, search results, and recommendations.
* **Image Rendering:** `object-fit: cover` with centered object position, preventing the bottle distortion and uneven row heights previously observed.
* **Card Surface:** Cards rest on Natural Cream (`#F0ECE1`) surfaces with Warm Stone hairline borders (`1px solid #E3DDD1`).
* **Micro-Details:**
  - Botanical Concern badges ("Barrier Repair", "Vitamin C Brightening") in Muted Sage tags.
  - Formula volume indicators ("30ml / 1.0 fl. oz.") in Montserrat 400 micro-caps.
  - Price display in Montserrat 600 with slash through comparative strike-through pricing.
  - Quick-add button in Forest Green with slide-up reveal on hover.

### 2.3 Navigation, Header & Announcement Bar
* **Announcement Bar:** Deep Botanical Green background (`#244638`) with Warm Ivory typography (`#F8F5EF`), Montserrat 500, and Champagne Gold accent text for shipping thresholds ("Complimentary Botanical Elixir sample on orders over $85").
* **Header & Mega Menu:** Warm Ivory background (`#F8F5EF`) with sticky blur transition. Navigation links styled in Montserrat 500 (`letter-spacing: 0.04em`, uppercase, 13px) with smooth underline expansion in Champagne Gold.
* **Search Drawer & Cart Drawer:** Slide-in panels rendered in Natural Cream (`#F0ECE1`) with Deep Botanical Green headings and Forest Green checkout buttons.

### 2.4 Button System & Interactive States

| Button Type | Background | Text Color | Border | Hover State | Focus-Visible State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary CTA** (`.button--primary`, `.m-button--primary`) | Forest Green (`#315B45`) | Warm Ivory (`#F8F5EF`) | None | Background: `#244638` (Deep Green); Transform: `translateY(-1px)` | `outline: 2px solid #B89A62; outline-offset: 2px;` |
| **Secondary Button** (`.button--secondary`, `.m-button--secondary`) | Transparent | Forest Green (`#315B45`) | `1.5px solid #315B45` | Background: `#315B45`; Color: `#F8F5EF` | `outline: 2px solid #B89A62; outline-offset: 2px;` |
| **Tertiary / Link CTA** (`.button--link`, `.sf__btn-link`) | Transparent | Deep Botanical Green (`#244638`) | Bottom underline (1px) | Underline color: `#B89A62`; Color: `#315B45` | `outline: 2px solid #B89A62; outline-offset: 2px;` |

All button elements enforce `min-height: 44px` and `min-width: 44px` touch targets in accordance with WCAG 2.1 Criterion 2.5.5 (Target Size).

---

## 3. Local Preview & Production Alignment

The 10 local preview files in `preview/` have been updated to ensure that developers and stakeholders reviewing the theme offline experience identical visual rendering to the live Shopify storefront:
1. `preview/index.html` (Homepage Atelier)
2. `preview/product.html` (Product Formulation Detail)
3. `preview/collection.html` (Botanical Collection Grid)
4. `preview/cart.html` (Shopping Bag & Restock Drawers)
5. `preview/about.html` (Botanical Philosophy & Sourcing)
6. `preview/contact.html` (Customer Concierge & Inquiries)
7. `preview/checkout.html` (Mock Order Processing)
8. `preview/admin.html` (Atelier Backoffice Dashboard)
9. `preview/admin-login.html` (Atelier Admin Authentication)
10. `preview/404.html` (Error State & Product Discovery)

Every file links to:
- Google Fonts (`Playfair Display` + `Montserrat`)
- `../assets/theme.css`
- `../assets/aura-base.css`
- `../assets/theme.js`
