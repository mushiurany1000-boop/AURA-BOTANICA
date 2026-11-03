# AURA BOTANICA — HEADER & FOOTER SECTION ARCHITECTURAL AUDIT

**Theme:** Aura Botanica Luxury Skincare Theme (Online Store 2.0)  
**Version:** 5.3.0  
**Phase:** Phase 4 Header, Footer & Section Group Verification  
**Status:** PASS (Local Code & Architecture) | PENDING (Live Shopify Store Upload)  
**Date:** November 3, 2026  

---

## 1. Overview & Structure

In Shopify Online Store 2.0, headers and footers are organized into **Section Groups**:
- `sections/header-group.json` (type: `"header"`)
- `sections/footer-group.json` (type: `"footer"`)

These groups allow merchants to add, remove, and reorder sections in the header and footer areas across the entire storefront through the Shopify Theme Editor.

---

## 2. Header Group Audit (`sections/header-group.json`)

### 2.1 Section Composition & Hierarchy
```
header-group.json
  ├── annoucement (type: "annoucement")
  │     ├── block: item_dGj4GU (Complimentary Botanical Cleanser Sample...)
  │     └── block: item_6Ycmkw (Free shipping for all orders from $60+)
  └── header (type: "header")
        └── block: 5e153016... (topbar: Pure Botanical Alchemy | Explore Formulations)
```

### 2.2 Announcement Bar Section (`sections/annoucement.liquid`)
- **Schema Name:** `Announcement bar`
- **Supported Settings:** Container type, Color scheme, Show announcement, Homepage only, Show close button, Show divider, Auto-rotate slides, Slider speed.
- **Blocks Supported:** `item` (announcement message, link).
- **Encoding Status:** UTF-8 verified (clean bullet `•` character).
- **Color Scheme Binding:** Bound to `color_scheme` in `settings_data.json` (`badge-sale` scheme).

### 2.3 Main Header Section (`sections/header.liquid`)
- **Schema Name:** `Header`
- **Settings Count:** 44 settings.
- **Blocks Count:** 6 blocks (`topbar`, `menu_item`, `mega_menu`, etc.).
- **Header Designs Supported:** `logo-center-menu-left`, `logo-left-menu-center`, `logo-center-menu-split`.
- **Sticky Header Options:** `none`, `always`, `on_scroll_up`.
- **Transparent Header on Top:** Supported with configurable text colors.
- **Sub-Snippets Rendered:**
  - `header__topbar.liquid` (Language, currency, social media links, alert bar)
  - `header-logo.liquid` (SVG & typography branding with max-width controls)
  - `header-main-menu-container.liquid` (Multi-level navigation, hover dropdowns, mega-menus)
  - `header-menu-drawer.liquid` (Mobile responsive drawer navigation)
  - `search-popup.liquid` (Predictive modal search popup)
  - `cart.liquid` (Cart icon counter, drawer trigger)
- **Accessibility:** Keyboard tab navigation, `aria-expanded`, `aria-label`, and `role="navigation"` attributes validated.

---

## 3. Footer Group Audit (`sections/footer-group.json`)

### 3.1 Section Composition & Hierarchy
```
footer-group.json
  ├── footer (type: "footer")
  │     ├── block: newsletter (Let’s get in touch)
  │     ├── block: spacing (width: 16%)
  │     ├── block: menu (Quick link)
  │     ├── block: menu (Company)
  │     └── block: our_store (Our store)
  ├── mobile-sticky-bar (type: "mobile-sticky-bar")
  └── age-verifier-popup (type: "age-verifier-popup")
```

### 3.2 Main Footer Section (`sections/footer.liquid`)
- **Schema Name:** `Footer`
- **Settings Count:** 21 settings.
- **Blocks Count:** 6 block types (`newsletter`, `menu`, `our_store`, `text`, `custom_html`, `spacing`).
- **Footer Designs:** Multi-column layout with customizable column widths (50%, 25%, 33%, 16%).
- **Branding & Copyright:** Clean UTF-8 string: `"© AURA BOTANICA 2026 • Pure Botanical Alchemy"`.
- **Payment Icons:** Dynamic Shopify payment icon renderer (`payment-icons.liquid`).
- **Follow on Shop:** Supported via `enable_follow_on_shop`.

### 3.3 Mobile Sticky Bottom Bar (`sections/mobile-sticky-bar.liquid`)
- **Schema Name:** `Mobile sticky bar`
- **Settings Count:** 9 settings.
- **Functionality:** Provides quick thumb access on mobile devices to Home, Collections, Search, and Cart Drawer.
- **Visibility:** Hidden on screens $\ge 768\text{px}$, visible on mobile viewports.

### 3.4 Age Verifier Popup (`sections/age-verifier-popup.liquid`)
- **Schema Name:** `Age verifier popup`
- **Settings Count:** 13 settings.
- **Blocks Count:** 5 block types (`heading`, `text`, `buttons`).
- **Functionality:** Optional age verification overlay with cookie persistence and backdrop blur.

---

## 4. Verification & Defect Log

| Component | Status | Details |
| :--- | :--- | :--- |
| `header-group.json` schema | **PASS** | Valid JSON, type `"header"`, 2 sections registered |
| `annoucement.liquid` | **PASS** | Valid schema, slider logic, clean UTF-8 text |
| `header.liquid` | **PASS** | Valid schema, 44 settings, 6 block types, all snippets present |
| `footer-group.json` schema | **PASS** | Valid JSON, type `"footer"`, 3 sections registered |
| `footer.liquid` | **PASS** | Valid schema, 21 settings, clean copyright symbol |
| `mobile-sticky-bar.liquid` | **PASS** | Responsive mobile bottom navigation bar verified |
| `age-verifier-popup.liquid` | **PASS** | Accessible modal dialog with cookie persistence |
| Live Shopify Store Customizer | **PENDING** | Requires store upload of `aura-skincare-theme.zip` |

