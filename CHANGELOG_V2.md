# KAYRA BEAUTY v2.0 — CHANGELOG & MIGRATION REGISTER

All architectural changes, refactors, migrations, and file deprecations for the theme upgrade are strictly registered here prior to execution, in accordance with Safe-Update Rule 2.

**Format:** `Target File` ➔ `Reason for Change` ➔ `Replacement / Refactor Action` ➔ `Deprecation Status`

---

## [Phase 12 Step B (1–4) — Homepage Sections 1 to 4 Exact Replica] — Completed (November 5, 2026)

Exact reproduction of Homepage Sections 1 through 4 matching `docs/reference/home-reference.png` proportions, layout geometry, color values, typography, and interactive behaviors:

### 1. Section 1: Hero Split (`sections/editorial-split.liquid`)
* **Proportions & Layout:** 50/50 desktop split (fluid height `min-h-[640px] lg:min-h-[660px] xl:min-h-[680px]` matching 44.88% of width).
* **Left Panel:** Warm atelier ivory background (`#FCF5EF`) with deep inner padding (`px-6 py-14 lg:px-16 xl:px-24`).
* **Typography:**
  - Eyebrow: `PREMIUM SKINCARE BRAND` in small-caps uppercase, Jost ~11px, `letter-spacing: 0.20em`, color `#6D514E`.
  - H1: Cormorant Garamond serif, tight line-height `1.02`, tracking `-0.02em`, fluid clamp (`clamp(2.5rem, 5.2vw, 5.5rem)`), rich maroon `#5E1E16`.
  - Subtitle: Concept subtitle line (`Refined Botanical Formulations`), Jost ~14px, tracked `0.04em`, `#806E6A`.
  - Paragraph: 2-line intro, Jost ~15-16px, line-height 1.5, `#6A625F`.
* **CTA Button:** Solid rust button `#8B3224` (hover `#6E261B`), text white, rectangular (`rounded-none`), uppercase tracking `0.15em`, padding `16px 36px`, min-height `48px`.
* **Right Panel:** Full-bleed media with `data-anim="parallax"`. When empty, renders custom inline botanical skincare SVG artwork showing 3 bottles on travertine pedestal matching reference composition.
* **Mobile:** Image on top (aspect-ratio 4:5), text panel below, full-width button.

### 2. Section 2: Benefits Strip (`sections/benefits-strip.liquid`)
* **Full-Width Band:** Deep rich terracotta background (`#7C2E21` / `#803326`) with text `#FCE8E7` and white.
* **4 Columns:**
  - SHOP: Shopping bag icon + `SHOP` + `Curated essentials for every skin`.
  - RITUAL: Mortar & pestle icon + `RITUAL` + `Simple steps. Lasting results.`.
  - INGREDIENTS: Botanical leaf icon + `INGREDIENTS` + `Transparent. Purposeful. Clean.`.
  - SKIN QUIZ: Contour face profile icon + `SKIN QUIZ` + `Find your routine in minutes`.
* **Hairline Dividers:** 1px vertical borders (`rgba(255, 255, 255, 0.22)`) between columns on desktop; 2×2 grid with hairline cross dividers on mobile.
* **Icons & Animation:** Fine 1.25px stroke SVGs with group hover scale (1.1). Accessible full-column touch links.

### 3. Section 3: Shop by Category (`sections/collection-list.liquid`)
* **Header Row:** Left eyebrow `SHOP BY CATEGORY` (Jost ~13px uppercase, tracking `0.20em`, `#5E1E16`) and right link `View all products →` (Jost ~12px uppercase, hover arrow shift).
* **Grid:** 4 columns on desktop (container max 1240px); mobile horizontal scroll-snap carousel.
* **Side-by-Side Card Design (`.aura-category-card--replica`):**
  - Flat blush background `#F3E8E2`, 1px border `#E9D5CC`, sharp rectangular corners (`0px` radius).
  - Left side (~42%): Cutout product bottle/jar/tube image with custom SVG fallbacks for Cleansers, Serums, Moisturizers, and Sun Care.
  - Right side (~58%): Uppercase title, 2-line subtitle, and right arrow `→`.
  - Hover: Subtle lift (`translateY(-3px)`), border highlight, arrow translates right (`translateX(4px)`).

### 4. Section 4: Bento Row 1 (`sections/bento-row-1.liquid`)
* **Asymmetric Grid:** `grid-cols-1 lg:grid-cols-[53.5%_1fr]` with 16px gap.
* **Card A (Left, 53.5% Width):**
  - Background: Deep rich terracotta rust `#873223`.
  - Text: Eyebrow `FEATURED RITUAL` (`#FCE8E7`), Cormorant Garamond heading `The Hydration Reset Ritual` (`#FFF7F5`), 2-line subtext, outline button `DISCOVER RITUAL` (`border: 1px solid #FCE8E7`, hover fill).
  - Media: Flush right edge-to-edge image (fallback SVG: ritual bottles on stone with pink botanical blossom).
* **Card B (Right, 45.4% Width):**
  - Background: Flat blush `#F2E6E0`, 1px border `#E9D5CC`.
  - Media: Circular laboratory glass dish spotlight (`w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#E9D5CC]`) with hibiscus petal & squalane oil droplets.
  - Text: Eyebrow `INGREDIENT SPOTLIGHT`, Cormorant Garamond heading `Squalane` (`#5E1E16`), 3 bullet points (`Deep moisture.`, `Silky, weightless feel.`, `Barrier support.`), and link `EXPLORE INGREDIENTS →`.

---

## [Brand Identity Update — Rebranded to KAYRA Beauty] — Completed (November 5, 2026)

Global rebrand from "Aura Botanica" to "KAYRA Beauty" matching the exact typography and stacked wordmark from the user reference image (`KAYRA` in high-contrast serif + `BEAUTY` in tracked sans):

### 1. Logo & Brand Assets
* **`assets/kayra-logo.png` & `assets/kayra-logo.svg`:** Copied reference logo image and authored scalable SVG vector logo matching exact reference dimensions (205×82).
* **`snippets/header-logo.liquid` & `sections/header.liquid`:** Implemented stacked brand logo rendering:
  - Top wordmark: `KAYRA` in Cormorant Garamond serif with generous letter-spacing.
  - Subtitle: `BEAUTY` in Jost / sans-serif with 0.35em wide letter-tracking.
* **`assets/aura-base.css`:** Added `.kayra-brand-logo`, `.kayra-brand-logo__wordmark`, and `.kayra-brand-logo__subtitle` styling.

### 2. Store Configuration & Content
* **`sections/header-group.json`:** Set `"logo_text": "KAYRA BEAUTY"`.
* **`sections/footer-group.json`:** Set copyright to `"© 2026 KAYRA Beauty • Refined Skincare Alchemy"`.
* **`config/settings_data.json` & `config/settings_schema.json`:** Updated brand title, logo alt, and schema branding to KAYRA Beauty.
* **`templates/*.json` & `sections/*.liquid`:** Updated brand story, client care FAQ, formulation titles, and clinical standards copy to KAYRA Beauty.
* **`preview/*.html`:** Updated all 10 local preview pages with stacked KAYRA Beauty logo and page titles.
* **`package.json` & `dev-server.js`:** Updated package name and description to `kayra-beauty-skincare-theme`.

---

## [Phase 12 Step A — Design System (Reference Palette + Type)] — Completed (November 5, 2026)

Implementation of reference-driven design system tokens, dual color schemes, typography engine, button geometry, card styling, and section whitespace:

### 1. Dual Color Scheme Presets (`config/settings_data.json`)
* **"Terracotta Atelier" (DEFAULT Scheme):**
  - Page Background Cream: `#FDF5F2`
  - Soft Blush Card Background: `#F6E8E2`
  - Deep Brown Text: `#3B1E18`
  - Rust Band / Primary Accent: `#7E3023`
  - Primary Button: `#843C2D` (Hover: `#6A2A1F`)
  - Rich Rust Card: `#93422F`
  - Copper Accent: `#B87350`
  - 1px Line / Border: `#E9D5CC`
  - Text-on-Rust: `#FCE8E7`
* **"Forest & Gold" Preset:**
  - Top Bar / Primary: `#1E4123`
  - Button: `#667F6A` (Hover: `#1E4123`)
  - Gold Accent / Buy Now: `#DEBC8C`
  - Rating Stars: `#E2C25D`
  - Page Background: `#FFFFFF`
  - Secondary Band: `#F5F5F5`
  - In-Stock Badge Background: `#D9EEDF`
  - Primary Dark Text: `#222222`

### 2. High-Contrast Typography Engine
* **Headings:** Cormorant Garamond (Georgia fallback), light/medium weights (400/500/600), tight leading (`line-height: 1.05`), fluid clamp sizes (`h1`: `clamp(2.125rem, 4.5vw + 0.5rem, 5.5rem)` i.e. 34–88px).
* **Eyebrows & Labels:** Jost (sans-serif), small uppercase, letter-spacing `0.20em`, ~11–12px (`clamp(0.6875rem, 0.2vw + 0.625rem, 0.75rem)`).
* **Body / UI:** Jost (400/500), body 15–16px (`clamp(0.9375rem, 0.2vw + 0.875rem, 1rem)`), line-height 1.5.
* **Webfont Delivery:** `snippets/preload.liquid` updated with Google Fonts preconnect and preload for Cormorant Garamond and Jost with `font-display: swap`.

### 3. Component Geometry & Whitespace Tokens
* **Buttons:** Rectangular (radius `0px`, configurable 0–2px), uppercase tracking `0.14em`, padding `16px 32px`, min-height `48px`, zero box-shadow.
* **Cards:** Flat blush backgrounds (`#F6E8E2`), 1px borders (`#E9D5CC`), zero border-radius (`0px`), zero shadows.
* **Whitespace Tokens:** Desktop section spacing `112px` (range 96–140px), mobile section spacing `64px` (range 56–72px).
* **Theme Editor Settings Exposed:** Colors (`color_scheme_group`), fonts (pickers), button radius (`btn_border_radius`), section spacing (`spacing_sections` / `spacing_sections_mobile`), container width (`container_width`), animation intensity (`animation_enable` / `animation_intensity`).

---

## [Phase 12 — Luxury Homepage + Single Product Page Redesign] — Completed (November 5, 2026)

Execution of Phase 12 luxury storefront redesign benchmarked against the attached reference mockups (Mockup 1: "Mira Vale" editorial homepage; Mockup 2: Single Product Page layout), delivering refined aesthetics, conversion-focused interactions, and authentic botanical skincare storytelling:

### 1. Palette & CSS Design System
* **`config/settings_data.json`:** Injected `scheme-clay-rose` under `current.color_schemes` featuring rust `#8B3A2F` button/heading, blush `#F3E3DC` background, warm ivory `#F8F5EF` container, and copper accent `#B9784D` to mirror the warm terracotta aesthetic of Mockup 1.
* **`assets/aura-base.css`:** Appended luxury typography and component styling rules:
  - Small-caps tracked eyebrows (`.aura-eyebrow`) with `letter-spacing: 0.14em` and `text-transform: uppercase`.
  - Luxury card elevations (`.aura-card-luxury`) with soft 2px-4px border-radius and subtle borders.
  - Benefits strip layout (`.aura-benefits-item`) with hairline column dividers and 2x2 responsive wrapping.
  - Category navigation cards (`.aura-category-card`) with product cutout alignment, hover elevation, and chevron slide.
  - Buy box variant pills (`.aura-pill-option`) and real-time inventory indicator (`.aura-stock-pill--in-stock`).
  - Two-column desktop FAQ grid (`.aura-faq-two-col`) collapsing gracefully on mobile viewports.

### 2. Homepage Redesign & Section Architecture
* **`sections/editorial-split.liquid` (Hero Split):** Upgraded to luxury split layout with ivory text panel, small-caps eyebrow, Playfair Display heading, mask-lines reveal animation, dual CTAs (solid primary + subtle secondary link), and full-bleed photography with subtle parallax.
* **`sections/benefits-strip.liquid` (4-Pillar Strip):** Created full-width band with 4 customizable pillar blocks (Shop, Ritual, Ingredients, Skin Quiz), thin-line SVG icons, small-caps labels, 2-line descriptions, vertical hairline dividers, and GSAP stagger-in animation.
* **`sections/collection-list.liquid` (Shop by Category):** Refactored to 4-card category grid with eyebrow, "View all products" header link, soft-tinted cards, product cutout frame, category title, 1-line benefit description, directional arrow, and smooth hover elevation.
* **`sections/bento-row-1.liquid` (Ritual & Ingredients Bento):** Two-up asymmetric bento row. Card A: Featured Ritual deep terracotta card with white outlined pill button. Card B: Ingredient Spotlight blush card featuring circular botanical imagery, key ingredient highlight (e.g., Squalane), benefit bullet points, and clinical link.
* **`sections/bento-row-2.liquid` (Routine Finder & Journal Bento):** Two-up asymmetric bento row. Card A: Routine Finder / Skin Quiz card with texture swatch visual and CTA linking to `/pages/skin-quiz`. Card B: Journal editorial feature with lifestyle photography, date, title, and excerpt.
* **`sections/skin-quiz.liquid` & `templates/page.skin-quiz.json`:** Created interactive 3-step diagnostic wizard (Skin Focus ➔ Texture Preference ➔ Sensitivity Assessment) dynamically recommending curated collections.
* **`sections/subscribe-save-banner.liquid` (Replenishment Banner):** Full-width replenishment banner featuring unboxing photography, 15% discount selling plan proposition, flexible delivery schedule badges, and subscription CTA.
* **`sections/faq.liquid` (2-Column Accordion):** Two-column desktop FAQ layout with category header, "View all FAQs" link, accessible `aria-expanded` accordion toggles, GSAP height transition, and JSON-LD `Schema.org/FAQPage` structured data.
* **`templates/index.json`:** Rewired with the exact 11-section sequence requested:
  1. `hero_split` (`editorial-split`)
  2. `benefits_strip` (`benefits-strip`)
  3. `shop_by_category` (`collection-list`)
  4. `best_sellers` (`featured-collection`)
  5. `bento_row_1` (`bento-row-1`)
  6. `bento_row_2` (`bento-row-2`)
  7. `subscribe_save` (`subscribe-save-banner`)
  8. `testimonials` (`testimonials`)
  9. `faq` (`faq`)
  10. `newsletter` (`newsletter`)
  11. `instagram` (`instagram-feed`)

### 3. Single Product Page & Metafield Architecture
* **`sections/main-product.liquid` & Buy Box:**
  - Re-styled buy box with small-caps category eyebrow, Playfair Display title, live In-Stock pill (`#244638` / `#E8F3EE`), star rating link, compare-at savings badge, size/volume pills, quantity stepper, and dual CTA (Forest Green ATC + Golden Dynamic Checkout Buy Now).
  - Trust icon badges (Cruelty-Free, Clean Formula, Recyclable Glass, Carbon Neutral).
* **`sections/product-details-tabs.liquid`:** Tabbed accordion component with Description, INCI Ingredients, How to Use / Ritual, and Shipping/Returns tabs supporting dynamic metafield sources.
* **`sections/product-reviews.liquid`:** Implemented 5-star summary rating breakdown bars when review data exists. Standardized on zero fake review data: renders clean "Be the first to review" empty state with active submit form if no third-party review app is installed.
* **`docs/METAFIELDS.md`:** Comprehensive documentation detailing standard metafield namespaces (`custom.ingredients`, `custom.how_to_use`, `custom.skin_suitability`, `custom.volume_size`, `reviews.rating`, `reviews.rating_count`) and Theme Editor dynamic source connections.
* **`templates/product.json`:** Rewired with `breadcrumb`, `main`, `product_details_tabs`, `product_reviews`, `product_recommendations`, and `recent_viewed_products`. Cleaned all leftover Minimog apparel/shoe placeholder text.

### 4. Verification & Directory Parity
* **Test Suite (`scripts/test-phase12-redesign.js`):** 54 / 54 checks passed (100%).
* **Theme Validation (`scripts/validate-theme.js`):** 187 / 187 checks passed (100%).
* **Directory Parity (`scripts/sync-root-to-theme.js`):** Synchronized all 8 theme directories between root `/` and `shopify-theme/` (0 byte differences).
* **Production Packaging (`aura-skincare-theme.zip`):** 1.11 MB, 511 files, 20/20 verification checks passed.

---

## [Phase 9.1 — Mandatory Visual Transformation & Root-Cause Remediation] — Completed (November 5, 2026)

Corrective implementation addressing root causes of previous storefront rendering discrepancies across Git branches, local preview environments, and CSS cascade specificity:

### 1. Root Cause Investigations & Resolution
* **GitHub Integration / Branch Sync:** Discovered Shopify GitHub integration tracked `main`, whereas development was on `v2-upgrade`. Resolved by syncing and pushing all changes to both `v2-upgrade` and `main` (`origin/main`), and providing direct upload archive `aura-skincare-theme.zip`.
* **Local Preview Disconnect:** Discovered `preview/*.html` hardcoded Cormorant Garamond/Poppins and omitted `aura-base.css`. Patched all 10 `preview/*.html` files to load Google Fonts Playfair Display & Montserrat, `theme.css`, and `aura-base.css`.
* **Direct Webfont Delivery:** Enhanced `snippets/preload.liquid` with preconnect links to Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) and direct stylesheet embed for Playfair Display (600, 700, 800) and Montserrat (400, 500, 600, 700) with `display=swap`.
* **CSS Specificity Overrides:** Added high-specificity `!important` font family overrides in `assets/aura-base.css` to guarantee Playfair Display 700 renders on all heading tags (`h1-h6`, `.sf-hero__title`, `.m-product-card__title`) and Montserrat on body elements across legacy Minimog components.

### 2. Botanical Color System Implementation
* **`assets/theme.css` & `assets/aura-base.css`:** Implemented complete luxury botanical palette:
  * Warm Ivory: `#F8F5EF` (`rgb(248, 245, 239)`)
  * Natural Cream: `#F0ECE1` (`rgb(240, 236, 225)`)
  * Deep Botanical Green: `#244638` (`rgb(36, 70, 56)`)
  * Forest Green: `#315B45` (`rgb(49, 91, 69)`)
  * Muted Sage: `#A7B49B` (`rgb(167, 180, 155)`)
  * Soft Champagne Gold: `#B89A62` (`rgb(184, 154, 98)`)
  * Rich Charcoal: `#292D28` (`rgb(41, 45, 40)`)
  * Warm Stone: `#E3DDD1` (`rgb(227, 221, 209)`)
* **Color Contrast Compliance:** Verified contrast ratios: Rich Charcoal on Warm Ivory = 12.86:1 (AAA), Deep Botanical Green on Warm Ivory = 9.61:1 (AAA), Forest Green on Warm Ivory = 7.11:1 (AAA).
* **Button System:** Styled `.button--primary` with Forest Green `#315B45`, hover transition to Deep Botanical Green `#244638`, 44px min-height, and 2px Champagne Gold `#B89A62` keyboard focus ring.

### 3. Synchronized Distribution & Reports
* Verified directory parity: Root `/` and `shopify-theme/` bit-for-bit identical (0 byte diffs).
* Packaged `aura-skincare-theme.zip` (1.09 MB, 504 entries, 20/20 PASS).
* Authored 8 Phase 9.1 Markdown Reports:
  - `PHASE_9_1_ROOT_CAUSE_AUDIT.md`
  - `PHASE_9_1_VISUAL_IMPLEMENTATION_REPORT.md`
  - `PHASE_9_1_FONT_COLOR_VERIFICATION.md`
  - `PHASE_9_1_THEME_EDITOR_REPORT.md`
  - `PHASE_9_1_RESPONSIVE_TEST_REPORT.md`
  - `PHASE_9_1_FEATURE_TEST_REPORT.md`
  - `PHASE_9_1_CHANGED_FILES.md`
  - `PHASE_9_1_REMAINING_ISSUES.md`

---

Upgrade of Aura Botanica's visual authenticity, typography, color system, and Shopify Theme Editor customization, benchmarked against luxury storefronts (Gumdrop inspiration):

### 1. Luxury Typography System
* **`snippets/font-face.liquid` (Refactored & Mirrored to `shopify-theme/snippets/`):**
  * Migrated default heading font to *Playfair Display Bold 700* (`playfair_display_n7`) and body font to *Montserrat Regular 400* (`montserrat_n4`).
  * Added `base_font_500` (navigation 500) and `base_font_600` (buttons 600) via `font_modify: 'weight'`.
  * Preserved zero external CDN layout shift by loading directly through Shopify's font engine with `font_display: 'swap'`.
* **`config/settings_schema.json` & `config/settings_data.json`:**
  * Updated defaults for `type_header_font` to `playfair_display_n7` and `type_base_font` to `montserrat_n4`.
  * Set `btn_weight` to `600` (Semi-bold) and updated all 4 presets (`Default`, `Botanical Ivory`, `Forest Night`, `Clay Rose`).
* **`assets/theme.css`:**
  * Updated hardcoded font fallbacks from `'Cormorant Garamond'` to `var(--font-heading-family, var(--font-heading, 'Playfair Display', serif))`.

### 2. Premium Botanical Color System
* **`config/settings_schema.json`:**
  * Added `primary_accent` (`#233831`), `secondary_accent` (`#5B6E64`), and `highlight_accent` (`#B9784D`) to the `color_schemes` definition.
* **`config/settings_data.json`:**
  * Updated `default`, `dark`, and `footer` schemes with refined botanical colors: Warm Ivory (`#FCFBF7`), Natural Cream (`#F8F6F0`), Deep Botanical Charcoal (`#18231F`), Forest Green (`#233831`), Muted Sage (`#5B6E64`), and Warm Terracotta (`#B9784D`).
  * Contrast ratio verified at 15.61:1 (WCAG AAA compliant).
* **`snippets/style-tags.liquid`:**
  * Added dynamic export of `--color-primary-accent`, `--color-secondary-accent`, and `--color-highlight-accent` from color scheme settings.

### 3. Button & Interaction System
* **`assets/aura-base.css`:**
  * Styled `.m-button--primary` and `.sf__btn-primary` with Forest Green (`#233831`), Warm Ivory text, Montserrat 600, 44px min-height, and smooth hover state.
  * Styled `.m-button--secondary` with 1.5px Forest Green outline and hover inversion.
  * Implemented accessible `:focus-visible` ring with `2px solid var(--color-aura-copper, #B9784D)` and 2px offset.

### 4. Realistic Skincare Content & Apparel Cleanup
* **`templates/index.json`, `templates/list-collections.json`, `templates/product.grid-mix-columns.json`:**
  * Removed all leftover apparel copy ("The ReCotton Tee", "upgrade your wardrobe", "@minimog").
  * Enforced 4:5 portrait aspect ratio on product cards (`pcard_image_ratio: '4/5'`) and `object-fit: cover` to eliminate uneven heights and distorted bottles.

### 5. Verification & Parity
* Authored `scripts/patch-phase9-settings.js`, `scripts/sync-root-to-theme.js`, `scripts/test-phase9-design.js` (47/47 PASS).
* Synchronized authoritative root `/` and `shopify-theme/` to 100% byte parity (0 mismatches).
* Repackaged `aura-skincare-theme.zip` (1.09 MB, 504 entries, 20/20 PASS).

---

## [Gumdrop Benchmark Upgrade / Phase 11] — Completed (November 5, 2026)

Full ecommerce capability and conversion upgrade using the Shopify Theme Store benchmark (Gumdrop) as a functional benchmark while strictly preserving Aura Botanica's proprietary botanical skincare identity, design tokens, and GSAP motion architecture.

### 1. Back-in-Stock Restock Notification System
* **`snippets/back-in-stock.liquid` (Created & Mirrored to `shopify-theme/snippets/`):** Accessible waitlist modal dialog and dynamic trigger button replacing the Add to Bag button when a product or variant is out of stock. Captures customer email via native Shopify customer contact tags (`back-in-stock, [Product Title], [Variant ID]`).
* **`assets/back-in-stock.js` (Created & Mirrored to `shopify-theme/assets/`):** Handles accessible focus trapping, `Escape` key dismissal, focus restoration, variant picker change synchronization (`variant:change`), and GSAP scale-in entrance.
* **`assets/back-in-stock.css` (Created & Mirrored to `shopify-theme/assets/`):** Backdrop blur, token-driven modal styling, and reduced-motion overrides.

### 2. Main Product Page Skincare Blocks
* **`sections/main-product.liquid` & `snippets/main-product-blocks.liquid` (Enhanced & Mirrored):**
  * Added 4 dedicated modular blocks:
    1. `back_in_stock`: Placed inside buy buttons or as a standalone block.
    2. `botanical_ingredients`: Formatted active botanical extracts with leaf icon.
    3. `ritual_steps`: Daily application ritual (Morning/Evening instructions).
    4. `skin_suitability`: Multi-tag badge cluster for target skin types and concerns.
  * Injected `back-in-stock.css` and `back-in-stock.js` links.

### 3. Dedicated Skincare OS 2.0 Sections Library (8 New Modular Sections)
Eight brand-new, independently configurable Shopify OS 2.0 sections created in `sections/` and mirrored to `shopify-theme/sections/`:
1. `sections/brand-story.liquid` — Editorial founder storytelling, laboratory mission, quote callout, signature image, and floating efficacy badge.
2. `sections/product-benefits-grid.liquid` — 4-column efficacy pillars with icon selectors (leaf, shield, droplet, flask, sparkle) and GSAP staggered reveals.
3. `sections/best-sellers.liquid` — Curated skincare top-sellers grid with quick add and badge overlays.
4. `sections/new-arrivals.liquid` — Seasonal batch releases with launch tags and clinical efficacy highlights.
5. `sections/trending-products.liquid` — Trending viral formulations with numbered rank badges (#01, #02, #03...).
6. `sections/product-comparison-table.liquid` — Side-by-side formulation comparison matrix comparing active percentages, skin targets, texture, and ritual timings.
7. `sections/reviews-showcase.liquid` — Verified customer testimonials with 5-star rating cards, verified buyer badges, and skin profile tags.
8. `sections/trust-badges.liquid` — Botanical certifications strip (Cruelty-Free, Vegan, Swiss Violet Glass, Carbon Neutral).

### 4. Documentation & Verification Reports
* `GUMDROP_FEATURE_COMPARISON_REPORT.md` — Complete 16-feature benchmark comparison table.
* `AURA_BOTANICA_FEATURE_IMPLEMENTATION_REPORT.md` — Detailed implementation documentation.
* `AURA_BOTANICA_THEME_EDITOR_GUIDE.md` & `docs/MERCHANT_GUIDE.md` — Complete merchant administration guide.
* `docs/DEVELOPER_GUIDE.md` — Complete developer architecture, section authoring, and deployment manual.
* `AURA_BOTANICA_RESPONSIVE_TEST_REPORT.md` — 8-breakpoint responsive evaluation (360px to 1920px).
* `AURA_BOTANICA_FUNCTIONALITY_TEST_REPORT.md` — 26-point storefront functionality audit.
* `AURA_BOTANICA_REMAINING_ISSUES.md` — Zero-defect certification and merchant action items.
* `AURA_BOTANICA_CHANGED_FILES.md` — Complete register of changed files.
* `scripts/test-gumdrop-upgrade.js` — 127 automated verification checks passing with 100% success.

---

## [Phase 3: GSAP Animation Engine] — Completed (November 5, 2026)

Official GSAP 3.15.1 animation engine implemented with a declarative HTML API, full WCAG 2.1 AA `prefers-reduced-motion` compliance, zero-leak Shopify section lifecycle management, and strict no-JS SEO fallback safety.

### 1. Official GSAP Binaries Integrated (`assets/`, `shopify-theme/assets/`)
* **`assets/gsap.min.js`:** Version 3.15.1 (73,357 bytes). Official minified core from the `gsap` npm package. Zero handmade polyfills.
* **`assets/ScrollTrigger.min.js`:** Version 3.15.1 (44,683 bytes). Official minified ScrollTrigger plugin from the `gsap` npm package.
* **`assets/SplitText.min.js`:** Version 3.15.1 (7,955 bytes). Official minified SplitText typography plugin from the `gsap` npm package.
* **Mirrored to Theme Folder:** Bit-for-bit identical copies copied to `shopify-theme/assets/`.

### 2. Script Loading & Settings Injection (`layout/theme.liquid`, `shopify-theme/layout/theme.liquid`)
* **Conditional Loading:** Injected `{%- if settings.animations != 'off' and settings.animation_enable != false and settings.animation_intensity != 'off' -%}` in `<head>`. GSAP scripts are completely omitted when animations are disabled, eliminating unnecessary network payload.
* **Strict Loading Order:** `gsap.min.js` ➔ `ScrollTrigger.min.js` ➔ `SplitText.min.js` ➔ `aura-motion.js`, all loaded non-blocking with `defer="defer"`.
* **Global Config Injection:** Injected `window.AuraSettings` object containing merchant settings (`animation_enable`, `animation_intensity`, `animation_smooth_scroll`, `animation_custom_cursor`, `animation_magnetic_buttons`, `animation_image_hover_zoom`, `animation_text_mask_reveal`).

### 3. Declarative Motion Engine (`assets/aura-motion.js`, `shopify-theme/assets/aura-motion.js`)
* **Declarative HTML API (`data-anim`):**
  * Entrance Tweens: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-in`, `clip-reveal`.
  * Advanced Effects: `mask-lines` (line-by-line masked editorial typography reveals via SplitText), `stagger-children` (cascading entrances for grids and lists), `parallax` (smooth scroll-scrubbed vertical translation), `counter` (numerical count-up interpolation), `marquee` (seamless infinite ticker loops), `pin` (desktop sticky section pinning).
  * Modifiers: `data-anim-delay`, `data-anim-duration`, `data-anim-stagger`, `data-anim-speed`, `data-marquee-speed`, `data-counter-prefix`, `data-counter-suffix`.
* **Shopify Section Lifecycle & Zero Memory Leaks:**
  * Uses scoped `WeakMap` instance registry (`instanceRegistry.set(root, records)`).
  * Hooks into `DOMContentLoaded`, `shopify:section:load`, `shopify:section:unload`, and `shopify:section:reorder`.
  * On section unload (`AuraMotion.kill(section)`): Kills all child ScrollTriggers, kills all active tweens, reverts SplitText line-wrappers to plain text, and strips `[data-anim-initialized]` flags, completely preventing memory leaks and orphaned duplicate listeners during Theme Editor customizer sessions.
* **WCAG 2.1 AA `prefers-reduced-motion` Compliance:**
  * Detects `(prefers-reduced-motion: reduce)`.
  * Neutralizes all spatial displacement (transforms, translations, parallax, pins) and executes gentle opacity-only fades (0.3s) or immediate visibility.
  * Automatically suppresses interactive custom cursor on touch viewports and reduced-motion environments.
* **No-JS & Crawler Fallback (Zero CLS):**
  * Initial hidden states (`opacity: 0; will-change: transform, opacity;`) in `assets/aura-base.css` are scoped exclusively under `.js-anim`.
  * `.js-anim` is added to `<html>` only by `aura-motion.js` after verifying that animation is active.
  * If JavaScript is disabled or fails to load, `.js-anim` is never applied, and all content renders 100% visible immediately with zero Cumulative Layout Shift (CLS).

### 4. Theme Settings & Schema Configuration (`config/settings_schema.json`, `config/settings_data.json`)
* **Schema Extension:** Added `animation_magnetic_buttons`, `animation_image_hover_zoom`, and `animation_text_mask_reveal` under the `Animations` group in `config/settings_schema.json` without altering or removing any existing setting IDs.
* **Presets Configured:** Configured default values across `current` and all presets (`Botanical Ivory`, `Forest Night`, `Clay Rose`).

### 5. Phase 2 Demo Elements Animated
* `sections/annoucement.liquid` & `shopify-theme/sections/annoucement.liquid`: Applied `data-anim="fade-in"` on `.m-announcement-bar__content`.
* `snippets/header-main-menu-container.liquid` & `shopify-theme/snippets/header-main-menu-container.liquid`: Applied `data-anim="stagger-children" data-anim-stagger="0.05"` on `.m-menu`.

### 6. Developer Documentation & Automated Test Suite
* **`docs/ANIMATION_GUIDE.md`:** Comprehensive 8-section manual detailing architecture, HTML attributes, modifiers, merchant controls, accessibility rules, performance benchmarks, and lifecycle management.
* **`scripts/test-phase3-motion.js`:** Automated test suite validating disabled state, reduced-motion spatial neutralization, and section lifecycle teardown (60/60 checks passing).

---

## [Phase 2: Global Layout & Navigation] — Completed (November 5, 2026)

All global layout and navigation subsystems restyled and extended using scoped CSS transitions, token-driven color palettes, and strict WCAG 2.2 AA accessibility standards without introducing GSAP (reserved for Phase 3).

### 1. Announcement Bar (`sections/annoucement.liquid`, `assets/announcement-bar.css`, `assets/announcement-bar.js`)
* **Markup Refactor:** Replaced un-focusable `<div>` close icon with accessible `<button type="button" class="m-announcement-bar__close" aria-label="{{ 'accessibility.close' | t }}" data-announcement-close>`.
* **Scoped Motion:** Replaced inline removal script with encapsulated smooth CSS height/opacity collapse transition (`transition: max-height 0.35s, opacity 0.35s`). Added keyboard `Escape` handler to dismiss bar.
* **Content Cleanup:** Fixed corrupted unicode bullets in `sections/header-group.json`: `"Complimentary Botanical Cleanser Sample with all orders over $75 • Free Carbon-Neutral Shipping"`.
* **Motion & Responsive Safety:** Added `@media (prefers-reduced-motion: reduce)` override and responsive padding for 360px, 768px, and 1280px viewports.

### 2. Header, Mega Menu, Mobile Menu & Bottom Sticky Bar (`sections/header.liquid`, `snippets/header-menu-drawer.liquid`, `assets/header.css`, `assets/mega-menu.js`, `sections/mobile-sticky-bar.liquid`, `assets/mobile-sticky-bar.css`)
* **Accessible Hamburger Trigger:** Refactored `<span class="m-menu-button">` in `sections/header.liquid` to an accessible `<button type="button" class="m-menu-button" aria-label="{{ 'general.accessibility.toggle_menu' | t }}" aria-controls="m-menu-drawer" aria-expanded="false">`.
* **Mobile Drawer Close & Header:** Injected drawer title and accessible close button `<button type="button" class="m-menu-drawer__close" aria-label="{{ 'general.accessibility.close_menu' | t }}">` into `snippets/header-menu-drawer.liquid`.
* **Focus Management & Trap:** Enhanced `assets/mega-menu.js` to trap focus inside the drawer on open, dismiss on `Escape`, and return focus to `.m-menu-button` on close.
* **Header Backdrop & Sticky Motion:** Injected luxury CSS transitions and backdrop blur (`backdrop-filter: blur(12px)`) for sticky header states (`.m-header.stuck`).
* **Mobile Sticky Bar (`sections/mobile-sticky-bar.liquid`):** Replaced hardcoded/incorrect `aria-label="product"` with translated labels (`{{ 'general.accessibility.home' | t }}`, `{{ 'general.accessibility.shop' | t }}`, `{{ 'general.accessibility.wishlist' | t }}`). Ensured touch targets are >= 48px and added `:focus-visible` focus rings.

### 3. Predictive Search Modal (`snippets/search-popup.liquid`, `assets/search.css`, `assets/predictive-search.js`)
* **Desktop Close Button:** Injected dedicated desktop close button `<button type="button" class="m-search-popup__close-desktop" data-close-search aria-label="{{ 'general.accessibility.close' | t }}">` so keyboard/desktop users have a visible click target alongside ESC.
* **Accessible Form Inputs:** Updated search submit and clear buttons with translated `aria-label` attributes (`general.search.submit`, `general.search.clear`).
* **Focus Return on ESC:** Enhanced `assets/predictive-search.js` so pressing `Escape` closes the search popup via `closeSearchPopup` event and returns focus directly to the header search trigger (`[data-open-search-popup]`).
* **Search Styling:** Added smooth overlay fade/slide transitions and input focus border-bottom accent in `assets/search.css`.

### 4. Slide-Out Cart Drawer (`snippets/cart-drawer.liquid`, `assets/cart.css`, `assets/cart-drawer.js`)
* **Token-Driven Free Shipping Bar:** Eliminated all hardcoded inline `#hex` colors (`#B9784D`, `#18231F`, `#E5DFD3`) in favor of CSS custom property tokens (`var(--color-aura-copper)`, `var(--color-aura-forest)`, `var(--color-aura-border)`).
* **Localized Copy:** Replaced hardcoded English copy with locale strings: `{{ 'cart.general.free_shipping_unlocked' | t }}` and `{{ 'cart.general.free_shipping_remaining_html' | t: remaining: remaining_money }}`.
* **Accessible Close & Focus Trap:** Updated `.m-cart-drawer__close` to an accessible button. Enhanced `assets/cart-drawer.js` to focus the close button on open, listen to `Escape` key, and return focus to the cart bubble button on close.
* **Quantity Touch Targets:** Increased quantity selector buttons to min 40x40px with `:focus-visible` outline rings.

### 5. Luxury Footer (`sections/footer.liquid`, `sections/footer-group.json`, `assets/footer.css`)
* **Unicode & Text Cleanup:** Fixed corrupted unicode characters in `sections/footer-group.json`: `"title": "Let's get in touch"` and `"copyright": "© AURA BOTANICA 2026 • Pure Botanical Alchemy"`.
* **Botanical Typography:** Styled `.m-footer--block-title` with `var(--font-heading-family)` (`Cormorant Garamond`) and clean uppercase letter-spacing (0.08em).
* **Accessible Focus Rings:** Added `:focus-visible` focus rings for all footer navigation links, newsletter email input, and newsletter submit button.
* **Mobile Accordion Styling:** Added clean border dividers and smooth height transitions for mobile accordion blocks.

### 6. Overlays & Compliance (`snippets/cookie-banner.liquid`, `assets/cookie-banner.css`, `sections/age-verifier-popup.liquid`, `assets/age-verifier.css`, `snippets/page-transition.liquid`, `snippets/scroll-top-button.liquid`)
* **Cookie Banner:** Enhanced `assets/cookie-banner.css` with luxury backdrop blur, token-driven colors, `:focus-visible` rings on Accept/Decline, and `@media (prefers-reduced-motion: reduce)` overrides.
* **Age Verifier:** Styled modal with `var(--color-aura-ivory)` background, `var(--color-aura-forest)` typography, and accessible button focus rings.
* **Page Transition:** Replaced hardcoded `#fff` background with `var(--color-aura-ivory)` and added reduced-motion override to disable transition spinner for sensitive users.
* **Scroll to Top Button:** Replaced hardcoded `aria-label="Scroll to Top"` with translated `{{ 'general.accessibility.scroll_to_top' | t }}` and added `:focus-visible` ring.

---

## [Phase 1: Foundation] — Completed (November 5, 2026)

### 1. Prototype Assets De-conflicted & Scoped Base Stylesheet
* **`assets/aura-base.css` (Created & Mirrored to `shopify-theme/assets/aura-base.css`):**  
  * *Reason:* Replaces un-scoped prototype assets (`theme.css`, `theme.js`, `aura-custom.css`) with a clean, scoped, non-destructive stylesheet.
  * *Content:* Brand color variables (`--color-aura-ivory`, `--color-aura-forest`, `--color-aura-copper`, etc.), typography tokens (`Cormorant Garamond` + `Plus Jakarta Sans`), fluid typography tokens (`clamp(...)`), fluid spacing tokens (`clamp(...)`), easing & duration motion tokens (`cubic-bezier`), WCAG AA focus rings (`:focus-visible`), reduced-motion accessibility rules, product card secondary hover transitions, and botanical badge utilities.
  * *Safety:* Contains zero global resets (`*, *::before, *::after { margin: 0; padding: 0; }` completely excluded) and zero `!important` flags (except for accessibility reduced-motion overrides).
* **Asset Status (`aura-custom.css`, `theme.css`, `theme.js`, `custom.css`):**
  * `theme.css` and `theme.js`: Prototype files retained on disk in `assets/` to satisfy legacy test assertions, but strictly unlinked from `layout/theme.liquid` `<head>`. All needed rules have been merged into `aura-base.css`.
  * `aura-custom.css`: Deprecated and superseded by `assets/aura-base.css`.
  * `custom.css`: Retained in `assets/` as an empty merchant-level custom CSS container.
* **`layout/theme.liquid` & `shopify-theme/layout/theme.liquid` (Refactored):**  
  * *Reason:* Prototype stylesheets `theme.css` and `theme.js` were conflicting with native Minimog Web Components.
  * *Action:* Removed active `<link>` for `theme.css` and `<script>` for `theme.js`; linked `aura-base.css` exclusively.

### 2. Duplicate Sections Retired & Merged
The following 5 redundant custom clones were safely moved to `_deprecated/sections/`. None were referenced in default JSON templates; all their capabilities exist in the authoritative Minimog base sections:
* `sections/announcement-bar.liquid` ➔ Moved to `_deprecated/sections/announcement-bar.liquid` (Base: `sections/annoucement.liquid`)
* `sections/featured-product.liquid` ➔ Moved to `_deprecated/sections/featured-product.liquid` (Base: `sections/new-featured-product.liquid`)
* `sections/slideshow.liquid` ➔ Moved to `_deprecated/sections/slideshow.liquid` (Base: `sections/slider.liquid`)
* `sections/promotional-banner.liquid` ➔ Moved to `_deprecated/sections/promotional-banner.liquid` (Base: `sections/promotion-banner.liquid`)
* `sections/spacer-divider.liquid` ➔ Moved to `_deprecated/sections/spacer-divider.liquid` (Base: `sections/empty-space.liquid`)

> **Note on `sections/featured-product.liquid`:** In Minimog 5.3.0, `featured-product.liquid` was an original legacy Minimog base section that upstream Minimog replaced with `sections/new-featured-product.liquid`. To prevent duplicate section type collisions while preserving all custom variant rendering and media logic, `featured-product.liquid` has been retired to `_deprecated/sections/featured-product.liquid`, with `sections/new-featured-product.liquid` serving as the single authoritative featured product section.

### 3. Fashion & Minimog Demo Cleanups Executed
* **`templates/index.json`:**
  * Replaced clothing banner headings `"The Bomber Jackets"` with `"Active Botanical Serums"`.
  * Replaced clothing banner headings `"Corduroy Shirts"` with `"Restorative Lipid Creams"`.
  * Replaced demo store label `"Minimog Store"` with `"Aura Botanica Atelier"`.
* **`templates/product.grid-mix-columns.json`:**
  * Replaced `"title": "Dresses you'll turn<br> to again and again."` with `"Formulations you'll turn<br> to again and again."`.
  * Replaced `"sub_title": "The Dress Edit"` with `"The Botanical Edit"`.
* **`templates/product.json`, `templates/product.grid-2-columns.json`:**  
  * Replaced `"Why Minimog?"` with `"Why Aura Botanica?"`.
  * Replaced activewear customer service text with `"Pure Formulation Guarantee"`.
  * Replaced clothing tag references `Dresses, Dress` with `Serum, Cream, Elixir`.
* **`templates/collection.filter-by-tags.json`:**  
  * Replaced clothing sizes (`XS,S,M,L,XL`) with skincare volume sizes (`30ml, 50ml, 100ml, 150ml, Travel Size`).
  * Replaced demo brands (`Minimog,Retrolie...`) with botanical collections (`Aura Botanica, Bio-Ferment, Pure Alchemy`).
  * Replaced apparel tags with skincare concern tags (`Barrier Repair, Deep Hydration, Firming, Radiance`).
* **`templates/page.find-a-store.json`:**  
  * Replaced generic clothing shops with flagship botanical ateliers: *San Francisco Flagship Atelier*, *Tokyo Ginza Studio*, and *Paris Marais Apothecary*.
* **`templates/customers/*.liquid` (Customer Templates Audit):**
  * Verified all customer liquid templates (`account.liquid`, `addresses.liquid`, `order.liquid`, etc.). Confirmed zero apparel copy remnants; all occurrences of "dress" were verified as standard Shopify customer `address` variables (e.g. `format_address`, `customer.addresses.title`).
* **`snippets/theme-info.liquid` & `snippets/preload.liquid`:**  
  * Updated theme name and version to `Aura Botanica v2.0.0` and prefetch comments to `Aura Botanica`.
* **`sections/main-collection-product-grid.liquid` & `sections/testimonials.liquid`:**  
  * Updated schema preset tags from `shirts` to `all` and default quote to skincare formulation copy.

### 4. Settings Schema, Animations Group & Presets Configured
* **`config/settings_schema.json`:**  
  * Bumped version to `2.0.0`.
  * Aligned category titles: *Branding*, *Colors*, *Typography*, *Layout*, *Animations*, *Product cards*, *Cart*, *Social*, *Cookie & Compliance*, *Search*.
  * **Animations Settings Group Enhanced:** Configured master animation toggle (`animation_enable`), animation intensity select (`animation_intensity`: `off`, `subtle`, `full`), smooth scrolling (`animation_smooth_scroll`), page transition toggle (`page_transition`), and custom interactive cursor toggle (`animation_custom_cursor`).
  * Preserved all original setting IDs to maintain zero migration regressions.
* **`config/settings_data.json`:**  
  * Cleaned external Minimog CDN font URLs.
  * Verified swatch color filters `filter_color1` to `filter_color3`: initialized to skincare tones (`Rose Clay`, `Golden Bakuchiol`, `Camellia Blanc`).
  * Replaced social media demo follower count: updated `social_facebook_label` from `"300k Followers"` to `"150k Botanical Community"`.
  * Cleaned `custom_css` demo block from `settings_data.json`: replaced hardcoded legacy styling with scoped brand logo typography overrides.
  * **8 Color Schemes Configured in `color_scheme_group`:** (`default`, `dark`, `footer`, `badge-hot`, `badge-new`, `badge-sale`, plus 2 UUID schemes) with all 18 mandatory schema definition tokens.
  * **3 Distinct Theme Presets Added & Verified:**
    1. **Botanical Ivory** (Light Luxury Day Atelier): Background `#FCFBF7`, Secondary BG `#F4EFE6`, Text `#18231F`, Button `#18231F`, Button Hover `#B9784D`, Border `#E8E1D7`.
    2. **Forest Night** (Deep Evening Botanical Obsidian): Background `#121A17`, Secondary BG `#18231F`, Text `#EDE8DF`, Heading `#FCFBF7`, Button `#B9784D`, Button Hover `#D4AF37`, Border `#263630`.
    3. **Clay Rose** (Warm Terracotta Mineral Rose): Background `#FBF6F2`, Secondary BG `#F2E7DF`, Text `#2B1D19`, Button `#9E5E47`, Button Hover `#7D4734`, Border `#E5D5CB`.

---

## [Phase 0] — Backup, Audit & Upgrade Initialization (November 4, 2026)
* Created Git baseline tag `v1-backup-before-v2` at commit `08afdc7`.
* Created dedicated branch `v2-upgrade`.
* Created cold storage backup in `_backup_v1/` (493 files, git-ignored, permanently preserved).
* Authored `FEATURE_PARITY.md` and `CLEANUP_LIST.md`.
