# AURA BOTANICA v2.0 — THEME EDITOR & MERCHANT CUSTOMIZATION GUIDE

**Theme Version:** 2.0.0 (Shopify Online Store 2.0)  
**Target Merchant:** Luxury Botanical Skincare Atelier  
**Location:** Shopify Admin → Online Store → Themes → Customize  

---

## 1. Global Theme Settings Overview

Aura Botanica organizes all global storefront controls into 25 dedicated categories within the Theme Editor. No code editing is required to achieve complete brand alignment.

### A. Branding & Logo
* **Logo Image**: High-resolution PNG or SVG logo.
* **Desktop & Mobile Logo Width**: Independent sliders (50px to 350px).
* **Favicon**: 32x32px square icon for browser tabs.

### B. Color Schemes (`color_scheme_group`)
Aura Botanica includes **8 pre-configured color schemes**:
1. `default`: Light Luxury Ivory (`#FCFBF7` background, `#18231F` text, `#B9784D` accent).
2. `dark`: Forest Night Obsidian (`#121A17` background, `#EDE8DF` text, `#D4AF37` gold).
3. `footer`: Deep Botanical Footer (`#18231F` background, `#FCFBF7` text).
4. `badge-hot` / `badge-new` / `badge-sale`: Accent badge palettes.
5. Plus custom merchant schemes.
*Each scheme controls 18 individual CSS tokens (Background, Secondary BG, Text, Headings, Primary Button, Hover, Borders, etc.).*

### C. Typography
* **Heading Font**: Selected via native Shopify `font_picker` (Default: *Cormorant Garamond*).
* **Body Font**: Selected via native Shopify `font_picker` (Default: *Plus Jakarta Sans*).
* **Base Size & Heading Scale**: Fluid type scales automatically compute responsive sizing via CSS `clamp(...)`.

### D. Creative Motion & Animations (GSAP 3.15.1)
* **Master Animation Toggle**: Turn all GSAP scripts on or off.
* **Intensity**:
  * `off`: Pure static rendering.
  * `subtle` (Recommended): Paced luxury timings (0.8s), shorter travel distances (22–28px).
  * `full`: Dynamic energetic pacing (0.65s).
* **Smooth Scrolling**: Native scroll restoration normalization.
* **Interactive Magnetic Cursor**: Custom copper dot and tracking ring for desktop users.
* **Magnetic Button Pull**: Micro-interaction drawing primary buttons toward mouse cursor.
* **Text Mask Line Reveals**: SplitText typography reveals on headlines.

### E. One-Click Style Presets (`settings_data.json`)
Merchants can instantly re-theme their entire storefront by switching presets in the Theme Editor header:
1. **Botanical Ivory** (Default): Crisp day atelier aesthetic with warm porcelain backgrounds.
2. **Forest Night**: High-contrast, evening obsidian luxury with deep forest green and gold tones.
3. **Clay Rose**: Warm terracotta mineral rose aesthetic inspired by French clay and rosehip.

---

## 2. Header & Navigation Settings

* **Header Layout**: Centered logo, Left logo, or Split navigation.
* **Sticky Header**: `Scroll Up` (appears when scrolling upwards) or `Always`.
* **Transparent Header**: Automatically applies transparent background over hero slideshow banners.
* **Mega Menu**: Add promotional image banners, featured collection links, and nested category columns.
* **Search Popup**: Predictive live search overlay with suggestions and instant product results.
* **Mobile Drawer Navigation**: Slide-out off-canvas menu with contact links and currency selectors.

---

## 3. Product Page Customization (`main-product.liquid`)

### Block Library (Add, Remove, Reorder)
Merchants can reorder 30 distinct blocks in the product details column:
1. **Title & Rating**: Product heading, subtitle, and star review badge.
2. **Price**: Regular price, compare-at strike-through, unit pricing, and sale badges.
3. **Variant Picker**: Dropdown or Pill options with automated color swatches.
4. **Buy Buttons**: Quantity selector, Add to Bag, Dynamic Checkout (Shop Pay/Apple Pay).
5. **Back-in-Stock Alert** *(New)*: Automated restock notification signup modal when variant is sold out.
6. **Botanical Ingredients** *(New)*: Formatted active extracts with botanical leaf icon.
7. **Application Ritual** *(New)*: Morning & Evening application instructions.
8. **Skin Suitability** *(New)*: Skin type tags (Sensitive, Barrier Impaired, Dry).
9. **Collapsible Tabs**: Expandable accordions for INCI Ingredients, Ritual, Shipping, FAQ.
10. **Inventory Status**: Low stock threshold indicator bar.

---

## 4. Homepage Section Library (30 Available Sections)

Every section supports **Presets**, **Color Scheme**, **Container Width**, **Padding Top/Bottom**, and **GSAP Animations**:

1. `Announcement bar`: Multi-message rotating ticker with link and dismiss button.
2. `Header`: Configurable navigation with mega menu and predictive search.
3. `Slideshow / Hero banner`: Full-screen image/video slideshow with text reveals.
4. `Image with text`: Split layout with botanical imagery and callout text.
5. `Featured collection`: Product carousel or grid with view-all link.
6. `Featured product`: Deep dive into a single hero formulation.
7. `Collection list`: Visual category cards with aspect ratio controls.
8. `Promotion banner`: High-impact marketing banner with countdown timer.
9. `Editorial split`: Magazine-style asymmetric visual split.
10. `Before & after`: Touch/mouse draggable slider comparing clinical results.
11. `Brand story` *(New)*: Founder quote, heritage narrative, and floating stat badge.
12. `Ingredient spotlight`: Interactive botanical active breakdown.
13. `Product benefits grid` *(New)*: Efficacy pillars with accessible SVG icons.
14. `Best sellers` *(New)*: Curated top-converting skincare grid.
15. `New arrivals` *(New)*: Fresh seasonal batch releases.
16. `Trending products` *(New)*: Viral products with numbered rank badges (#1, #2...).
17. `Product comparison` *(New)*: Side-by-side formulation matrix comparing actives & textures.
18. `Lookbook`: Shoppable lifestyle photos with interactive pulsing pins.
19. `Testimonials`: Customer quotes slider with author avatars.
20. `Reviews showcase` *(New)*: Verified customer reviews with 5-star ratings and skin type tags.
21. `Press / Brand logos`: Media logos (Vogue, Harper's Bazaar, Allure).
22. `Countdown timer`: Time-limited offer banner with live clock.
23. `Newsletter`: Email capture with GDPR compliance text.
24. `FAQ`: Accordion list for formulation and shipping questions.
25. `Blog posts`: Recent journal articles with read time and dates.
26. `Recently viewed`: Dynamic client-side carousel of browsed products.
27. `Product recommendations`: Shopify algorithm-driven related formulations.
28. `Trust badges` *(New)*: Cruelty-Free, Vegan, Violet Glass certifications bar.
29. `Icon box / Featured promotion`: Micro value-proposition badges.
30. `Rich text`: Editorial headlines and paragraphs.

---

## 5. Metaobjects Architecture for Repeatable Content

To streamline store management, Aura Botanica supports native Shopify **Metaobjects**:

### 1. `botanical_ingredient`
* `name` (Single line text): e.g. "Rosehip Seed Bio-Ferment"
* `origin` (Single line text): e.g. "Chilean Andes"
* `function` (Single line text): e.g. "Cellular Barrier Regeneration"
* `image` (File): Botanical macro photograph.

### 2. `skincare_faq`
* `question` (Single line text)
* `answer` (Rich text)
* `category` (Single line text): e.g. "Formulation", "Packaging", "Shipping"

### 3. `store_location`
* `atelier_name` (Single line text): e.g. "Ginza Studio"
* `city` (Single line text): e.g. "Tokyo"
* `address` (Multi-line text)
* `hours` (Single line text)

---

## 6. Cart Drawer & Conversion Settings

In **Theme Settings > Cart**:
* **Cart Type**: `Drawer` (Slide-out) or `Page`.
* **Free Shipping Threshold**: Set numerical amount (e.g. `75.00`).
* **Cart Notes**: Toggle customer order instructions.
* **Gift Wrapping**: Configurable addon product and pricing.
* **In-Cart Recommendations**: Select collection for "Complete Your Ritual" upsells.
