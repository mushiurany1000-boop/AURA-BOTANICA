# PHASE 9.1 — CHANGED FILES & MODIFICATION REGISTER
## Aura Botanica — Complete File-Level Audit
**Audit Date:** November 5, 2026  
**Status:** 100% Synchronized Across Root and `shopify-theme/`

---

## 1. Theme Production Files (Liquid, CSS, Config, Assets)

| File Path | Action | Description / Functional Rationale |
| :--- | :---: | :--- |
| `snippets/preload.liquid`<br>`shopify-theme/snippets/preload.liquid` | **MODIFIED** | Added preconnect links to `fonts.googleapis.com` and `fonts.gstatic.com` and direct webfont link for Playfair Display (600, 700, 800) and Montserrat (400, 500, 600, 700). |
| `layout/theme.liquid`<br>`shopify-theme/layout/theme.liquid` | **MODIFIED** | Verified inclusion of `snippets/preload.liquid`, `assets/theme.css`, `assets/aura-base.css`, and deferred `assets/theme.js`. |
| `snippets/style-tags.liquid`<br>`shopify-theme/snippets/style-tags.liquid` | **MODIFIED** | Injected default RGB fallback values for botanical color tokens (`--color-primary-accent`, `--color-secondary-accent`, `--color-highlight-accent`). |
| `assets/theme.css`<br>`shopify-theme/assets/theme.css` | **MODIFIED** | Updated `:root` CSS variables to declare Playfair Display as heading font and Montserrat as body font; set botanical color variables (Warm Ivory `#F8F5EF`, Deep Green `#244638`, Forest Green `#315B45`, Muted Sage `#A7B49B`, Champagne Gold `#B89A62`, Rich Charcoal `#292D28`). Added 44px min-height button rules and 2px Champagne Gold `:focus-visible` ring. |
| `assets/aura-base.css`<br>`shopify-theme/assets/aura-base.css` | **MODIFIED** | Enforced high-specificity `!important` font family overrides on all heading selectors (`h1-h6`, `.m-product-card__title`, `.sf-hero__title`) to Playfair Display 700. Enforced Montserrat on body elements. Styled `.button--primary` and `.button--secondary` with botanical tokens and Champagne Gold focus outlines. |
| `config/settings_schema.json`<br>`shopify-theme/config/settings_schema.json` | **MODIFIED** | Added color picker settings for `primary_accent`, `secondary_accent`, and `highlight_accent` within `color_schemes` definition. Updated font picker default values to `playfair_display_n7` and `montserrat_n4`. |
| `config/settings_data.json`<br>`shopify-theme/config/settings_data.json` | **MODIFIED** | Updated `current` theme values and all 4 theme presets (`Default`, `Botanical Ivory`, `Forest Night`, `Clay Rose`) with refined hex values for botanical colors, Playfair Display heading font, Montserrat body font, and 600 button font weight. |

---

## 2. Local Preview Files (`preview/*.html`)

All 10 local preview files were patched to directly load Google Fonts (Playfair Display & Montserrat), `../assets/theme.css`, and `../assets/aura-base.css` to guarantee local preview visual parity:

| File Path | Action | Description / Functional Rationale |
| :--- | :---: | :--- |
| `preview/index.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/product.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/collection.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/cart.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/about.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/contact.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/checkout.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/admin.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/admin-login.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |
| `preview/404.html` | **MODIFIED** | Patched Google Fonts links and added `aura-base.css` link. |

---

## 3. Automation, Validation & Build Artifacts

| File Path | Action | Description / Functional Rationale |
| :--- | :---: | :--- |
| `scripts/patch-phase9-1-settings.js` | **CREATED** | Node.js utility script safely updating settings schema and settings data with botanical color presets. |
| `scripts/patch-phase9-1-preview-files.js` | **CREATED** | Node.js utility script synchronizing all 10 `preview/*.html` files with modern Google Fonts and stylesheet references. |
| `scripts/test-phase9-1.js` | **CREATED** | Comprehensive 42-check test suite validating fonts, color contrast, CSS rules, button heights, preview files, and directory parity. |
| `scripts/sync-root-to-theme.js` | **UPDATED** | Synchronized 8 core theme directories between root `/` and `shopify-theme/`. |
| `aura-skincare-theme.zip` | **UPDATED** | Authoritative 1.09 MB production distribution archive containing 504 entries, verified 20/20 PASS via `scripts/verify-zip-archive.js`. |

---

## 4. Phase 9.1 Documentation Reports

| Report File | Topic / Focus |
| :--- | :--- |
| `PHASE_9_1_ROOT_CAUSE_AUDIT.md` | In-depth diagnosis of Git branch tracking, local preview disconnect, and CSS cascade. |
| `PHASE_9_1_VISUAL_IMPLEMENTATION_REPORT.md` | Storefront visual redesign, Playfair Display 700 headings, Montserrat body, 4:5 cards. |
| `PHASE_9_1_FONT_COLOR_VERIFICATION.md` | Google Fonts loading proof, WCAG contrast verification, RGB token channels. |
| `PHASE_9_1_THEME_EDITOR_REPORT.md` | Verification of merchant settings, presets, color schemes, and animation controls. |
| `PHASE_9_1_RESPONSIVE_TEST_REPORT.md` | Multi-device viewport testing (320px–1920px), zero overflow, 44px touch targets. |
| `PHASE_9_1_FEATURE_TEST_REPORT.md` | 16-point feature status table with PASS/BLOCKED statuses and evidence. |
| `PHASE_9_1_CHANGED_FILES.md` | Exhaustive register of all modified and created files. |
| `PHASE_9_1_REMAINING_ISSUES.md` | Merchant guidance on live photography, Instagram feed linking, and policy documents. |

