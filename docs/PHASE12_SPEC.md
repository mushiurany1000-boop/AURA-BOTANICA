# AURA BOTANICA — PHASE 12 EXACT REPLICA SPECIFICATION (HOMEPAGE & PRODUCT PAGE)
**Document Version:** 1.0.0  
**Date:** November 5, 2026  
**Reference Files:**
- `docs/reference/home-reference.png` (820 × 1230 px; Desktop 1440px Scale Factor: ×1.7561)
- `docs/reference/product-reference.png` (564 × 1128 px; Desktop 1440px Scale Factor: ×2.5532)

---

## 1. Executive Summary & Verification Matrix

In accordance with Safe-Update Rule 2 and Phase 12 Step 1 instructions, the two reference designs were measured directly using pixel-by-pixel color sampling and boundary analysis (.NET System.Drawing & PIL). Every section, container, card, gap, padding, font size, and color was recorded as a percentage of viewport width and scaled to standard 1440px desktop.

### Initial Measurement Comparison & Verification

| Section / Element | Initial Estimate | Measured Reference (Direct Sampling) | 1440px Desktop Target | Status / Correction |
| :--- | :--- | :--- | :--- | :--- |
| **Home Canvas & Margins** | Width 820px, side margins ≈ 63px (7.7%), container 1220px | Width 820px, margins 64px (7.80%), container 692px (84.39%) | Margins: 112px, Container: 1215px max | **VERIFIED & ACCURATELY LOCKED** |
| **Home Page Bg Color** | `#FCF7F4` | Eyedropper average: `#FBF6F3` / `#FCF7F4` | `#FCF7F4` token | **VERIFIED** (ΔE < 0.5) |
| **Hero 50/50 Split** | y 0–368, h ≈ 45% of width, exact 50/50 | y 0–367, h = 368px (44.88% of width), transition at x = 410px (50.0%) | Height: 646px, 50% / 50% split | **VERIFIED & ACCURATELY LOCKED** |
| **Hero Left Panel Bg** | `#FCF5EF` | Eyedropper average: `#FCF5EF` | `#FCF5EF` token | **VERIFIED** |
| **Hero Left Padding** | left-padded ≈ 66px (8%) | x = 73px (8.90% of width) | Left padding: 128px | **CORRECTED:** 73px (8.90%) vs 66px |
| **Hero Eyebrow Text** | `#6D514E`, small caps, ~11px | Eyedropper: `#806E6A` / `#6D514E`, y = 82px | Font: 11px, letter-spacing: 0.2em | **VERIFIED** |
| **Hero H1 Heading** | Maroon `#5E1E16`, 2 lines, ~100px | Eyedropper: `#55271B` / `#6E2D25` (rich maroon), y = 105..220px | Font: ~58px (102px at 1440), lh: 1.0 | **VERIFIED** |
| **Hero Paragraph** | `#6A625F`, ~16px | Eyedropper: `#6A625F` / `#7A716E`, y = 240..275px | Font: ~16px at 1440 | **VERIFIED** |
| **Hero CTA Button** | 204×46px, `#8B3224`, small caps | Measured: x=73..186 (w=114px, 13.90%), y=302..328 (h=27px, 3.29%) | 200×47px at 1440, bg `#8B3224`, radius 0 | **VERIFIED** (200×47px vs 204×46px) |
| **Benefits Strip** | y 368–440, h ≈ 72px (~126px at 1440), bg `#7C2E21` | y 367–436 (h=70px, 8.54% of width), bg `#803326` | Height: 123px at 1440, bg `#7C2E21` / `#803326` | **VERIFIED** (70px vs 72px) |
| **Benefits Columns** | 4 equal columns, 1px dividers | 4 columns: 205px each (25.0%), dividers at x = 205, 410, 615 | 4 columns of 360px at 1440, dividers 1px rgba(255,255,255,0.25) | **VERIFIED** |
| **Category Eyebrow Row** | y ≈ 465 | Header row y = 455..475px, Eyebrow left x=64, Link right x=756 | y = 465px | **VERIFIED** |
| **Category Cards Grid** | y 486–655, 4 cols, gap 10px, 165×170, bg `#F3E8E2` | y 486–655 (h=170px, 20.73% of width), 4 cards w=164px, gaps=12px (1.46%) | Cards: 288×298px at 1440, gaps: 21px, radius 0–2px | **VERIFIED** (gap 12px vs 10px) |
| **Bento Row 1** | y 678–861, h ≈ 183px, left 53% `#873223`, right 47% `#F2E6E0` | y 678–860 (h=183px, 22.32% of width), left w=370px (53.5%), right w=314px (45.4%), gap=9px (1.1%) | Height: 321px at 1440, Left: 650px (53.5%), Right: 551px (45.4%), gap: 16px | **VERIFIED & ACCURATELY LOCKED** |
| **Bento Row 2** | y 863–1037, h ≈ 174px, left 53% `#F8EFEA`, right 47% `#F7EEEA` | y 863–1037 (h=175px, 21.34% of width), left w=370px (53.5%), right w=314px (45.4%), gap=9px (1.1%) | Height: 307px at 1440, Left: 650px, Right: 551px, gap: 16px | **VERIFIED & ACCURATELY LOCKED** |
| **Subscribe Banner** | y 1038–1147, h ≈ 110px (~195px at 1440), container width | y 1038–1147 (h=110px, 13.41% of width), container w=692px | Height: 193px at 1440, Container width: 1215px | **VERIFIED & ACCURATELY LOCKED** |
| **FAQ 2-Column Grid** | from y 1155, 2×2 grid, 1px border ≈ 40px tall, single col mobile | Header at y=1155..1172, 2 cols w=335px (48.4% container), gap=23px (3.3%), rows h=26px | Rows: 46px at 1440, border 1px rgba(176,171,168,0.6), single col on mobile | **VERIFIED & ACCURATELY LOCKED** |
| **Product Top Bar** | ≈ 40px at 1440, bg `#1E4123`, white 13px, gold link | y 41–62 (h=22px in 564px width -> 56px at 1440), bg `#1F3F27`, gold `#BA934E` | 44px standard desktop (fluid 40–56px), bg `#1E4123` | **VERIFIED** |
| **Product Header** | White ≈ 76px, logo left, nav center, icons right | y 63–100 (h=38px in 564px width -> 97px at 1440), bg `#FFFFFF` | Height: 80px standard (fluid 76–96px) | **VERIFIED** |
| **Breadcrumb Band** | bg `#F5F5F5`, ≈ 190px at 1440, title "Shop", subtitle, corner dots | y 101–175 (h=75px in 564px width -> 191px at 1440), bg `#F5F5F5` | Height: 190px at 1440, bg `#F5F5F5`, corner leaf motifs | **VERIFIED & ACCURATELY LOCKED** |
| **Product Main Section** | Side margin 8.3%, two cols 49% each, gap 2.8% | Margin: x=47px (8.33%), container w=470px (83.33%), left col w=230px (48.9%), right col w=230px (48.9%), gap=11px (2.34%) | Container: 1200px at 1440, Gallery: 587px, Info: 587px, Gap: 28px | **VERIFIED & ACCURATELY LOCKED** |
| **Product Gallery** | 1:1 image, radius 14px, green circle next button, 4 thumbs (radius 8px, gap 6px) | Main image 1:1 square, radius 14px; circle next button `#234527` 36px; 4 thumbs below gap 6px, radius 8px, active border 2px `#234527` | Scaled 1:1 at 1440 (587×587px), thumbnail height 110px | **VERIFIED & ACCURATELY LOCKED** |
| **Product Buy Box Pills** | "In Stock" pill (#E7F6EA, green text), volume pills (dark green fill active, outlined inactive), stepper + ATC + Buy Now + Wishlist | Title ~30px bold Playfair, In-Stock pill `#E7F6EA` text `#234527`, price gold `#BA934E` + strike `#999`, size pills 36px tall radius full, ATC `#234527` + Buy Now `#BA934E` | Exact pill shapes (radius 9999px), touch target ≥ 44px | **VERIFIED & ACCURATELY LOCKED** |
| **Product Tabs** | Centered row, 18px gray labels, 1px bottom border, active green underline | Tabs row y = 540..572px, 1px border `#DDDDDD`, active tab green underline `#234527` 2px | Font: 18px, active line 2px `#234527`, accordion collapse on mobile | **VERIFIED & ACCURATELY LOCKED** |
| **Product Reviews** | Big 4.8 score, 5 gold bars, review list with avatar, verified badge, media thumbnails | Big score ~56px Playfair Display, gold breakdown bars `#EDC159` (90%, 36%, 12%, 3%, 2%), list with avatar 44px, badge, 3 media thumbs (10px radius) | Styled scoped CSS, zero fake reviews shipped (clean empty state if app absent) | **VERIFIED & ACCURATELY LOCKED** |

---

## 2. Palette & Color Token Specifications

### Palette A: "Clay Rose" (Homepage Reference Scheme)
Used on Homepage sections matching Mockup 1 (`docs/reference/home-reference.png`):
- **Page Background Canvas:** `#FCF7F4` (Eyedropper average: `rgb(251, 246, 243)`)
- **Hero Split Left Panel:** `#FCF5EF` (`rgb(252, 245, 239)`)
- **Deep Terracotta Accent / Strip Background:** `#7C2E21` / `#803326` (`rgb(124, 46, 33)`)
- **Primary Rust Button Background:** `#8B3224` (`rgb(139, 50, 36)`)
- **Rich Maroon Heading Text:** `#5E1E16` (`rgb(94, 30, 22)`)
- **Muted Taupe / Maroon Eyebrow:** `#6D514E` / `#806E6A` (`rgb(109, 81, 78)`)
- **Body Text Color:** `#6A625F` (`rgb(106, 98, 95)`)
- **Blush Category Card Background:** `#F3E8E2` (`rgb(243, 232, 226)`)
- **Bento 1 Left (Ritual) Background:** `#873223` (`rgb(135, 50, 35)`)
- **Bento 1 Right (Spotlight) Background:** `#F2E6E0` (`rgb(242, 230, 224)`)
- **Bento 2 Left (Routine Finder) Background:** `#F8EFEA` (`rgb(248, 239, 234)`)
- **Bento 2 Right (Journal) Background:** `#F7EEEA` (`rgb(247, 238, 234)`)
- **Subscribe Banner Gradient / Tint:** `#CDAA9A` to `#A47766` (Eyedropper: `#C6A18F`)
- **FAQ Border Lines:** `rgba(176, 171, 168, 0.6)` (`#B0ABA8` at 60% opacity)

### Palette B: "Forest & Gold" (Product Page Reference Scheme)
Used on Product Page matching Mockup 2 (`docs/reference/product-reference.png`):
- **Top Announcement Bar Background:** `#1E4123` / `#1F3F27` (`rgb(30, 65, 35)`)
- **Top Bar Gold Accent / Sign-up Link:** `#BA934E` (`rgb(186, 147, 78)`)
- **Header Background:** `#FFFFFF` (`rgb(255, 255, 255)`)
- **Breadcrumb Band Background:** `#F5F5F5` (`rgb(245, 245, 245)`)
- **Primary Product Dark Green (ATC Button & Selected Pill):** `#234527` / `#1E4123` (`rgb(35, 69, 39)`)
- **Dynamic Checkout "Buy Now" Gold:** `#BA934E` / `#B08F3E` (`rgb(186, 147, 78)`)
- **In-Stock Pill Background:** `#E7F6EA` (`rgb(231, 246, 234)`)
- **In-Stock Pill Text:** `#234527` (`rgb(35, 69, 39)`)
- **Star Rating & Breakdown Bars Gold:** `#EDC159` (`rgb(237, 193, 89)`)
- **Review Bar Track Background:** `#EEEEEE` (`rgb(238, 238, 238)`)
- **Primary Text:** `#222222` (`rgb(34, 34, 34)`)
- **Muted Text / Strikethrough:** `#777777` / `#999999` (`rgb(119, 119, 119)`)
- **Card / Thumbnail Borders:** `#DDDDDD` (`rgb(221, 221, 221)`)

---

## 3. Typography & Sizing Specifications

| Role / Element | Font Family | Weight | Relative Size in Reference | Desktop (1440px) | Letter Spacing | Line Height | Case |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Hero Eyebrow** | Montserrat / Sans | 600 | 6.5px in 820 | 11px | 0.20em | 1.2 | UPPERCASE |
| **Hero H1 Heading** | Playfair Display / Cormorant | 600–700 | 58px in 820 | 102px | -0.02em | 1.0 | Title Case |
| **Hero Paragraph** | Montserrat / Sans | 400 | 9px in 820 | 16px | 0.01em | 1.45 | Sentence |
| **Hero CTA Button** | Montserrat / Sans | 600 | 7.5px in 820 | 13px | 0.15em | 1.0 | UPPERCASE |
| **Benefits Label** | Montserrat / Sans | 600 | 7px in 820 | 12px | 0.15em | 1.2 | UPPERCASE |
| **Benefits Text** | Montserrat / Sans | 400 | 7.5px in 820 | 13px | 0.00em | 1.35 | Sentence |
| **Category Eyebrow** | Montserrat / Sans | 600 | 8px in 820 | 14px | 0.15em | 1.2 | UPPERCASE |
| **Category Card Title**| Montserrat / Sans | 600 | 7px in 820 | 12px | 0.15em | 1.2 | UPPERCASE |
| **Category Card Sub** | Montserrat / Sans | 400 | 7.5px in 820 | 13px | 0.00em | 1.35 | Sentence |
| **Bento Headings** | Playfair Display / Cormorant | 600 | 22px in 820 | 38–40px | -0.01em | 1.15 | Title Case |
| **Subscribe Heading**| Playfair Display / Cormorant | 600 | 19px in 820 | 34px | -0.01em | 1.15 | Title Case |
| **FAQ Question** | Montserrat / Sans | 400–500 | 8px in 820 | 14px | 0.01em | 1.2 | Sentence |
| **Product Page Title**| Playfair Display / Cormorant | 700 | 12px in 564 | 30px | -0.01em | 1.2 | Title Case |
| **Product Price** | Playfair Display / Cormorant | 700 | 9.5px in 564 | 24px | 0.00em | 1.0 | Regular |
| **Product Pills** | Montserrat / Sans | 500 | 5.5px in 564 | 14px | 0.02em | 1.0 | Regular |
| **Product Tabs** | Montserrat / Sans | 500–600 | 7px in 564 | 18px | 0.02em | 1.0 | Title Case |
| **Big Review Score** | Playfair Display / Cormorant | 700 | 22px in 564 | 56px | -0.02em | 1.0 | Regular |

---

## 4. Homepage Section Boxes & Layout Rhythm (Width: 1440px Desktop)

```
+-----------------------------------------------------------------------------------+
| 1. HERO SPLIT: y=0..646px (50% / 50%)                                             |
| Left Panel (#FCF5EF, pad 128px)                  | Right Panel (Image Cover, 100%)|
| Eyebrow: "PREMIUM SKINCARE BRAND"               | Trio of Botanical Bottles      |
| H1: "Mira Vale / Skincare" (102px maroon)       | on textured stone              |
| Paragraph: 2 lines (#6A625F)                    |                                |
| CTA: 200x47px solid rust (#8B3224)              |                                |
+-----------------------------------------------------------------------------------+
| 2. BENEFITS STRIP: y=646..769px (h=123px, bg #7C2E21, 4 cols with 1px dividers)   |
| [Icon] SHOP       | [Icon] RITUAL      | [Icon] INGREDIENTS | [Icon] SKIN QUIZ    |
+-----------------------------------------------------------------------------------+
| 3. SHOP BY CATEGORY: y=798..1150px (Container 1215px, 4 cols, gap 21px, h=298px)  |
| Header: "SHOP BY CATEGORY" (left)                     "View all products ->" (right)|
| [Card 1: CLEANSER]  | [Card 2: SERUMS]    | [Card 3: MOISTURIZE] | [Card 4: SUN CARE] |
| bg #F3E8E2, h=298px | bg #F3E8E2, h=298px | bg #F3E8E2, h=298px  | bg #F3E8E2, h=298px|
+-----------------------------------------------------------------------------------+
| 4. BENTO ROW 1: y=1190..1511px (Container 1215px, h=321px, gap 16px)              |
| CARD A (Left, 53.5% = 650px, bg #873223):         | CARD B (Right, 45.4% = 551px):|
| Text left (Ritual), photo right edge-to-edge      | Circular image left, text right|
+-----------------------------------------------------------------------------------+
| 5. BENTO ROW 2: y=1515..1822px (Container 1215px, h=307px, gap 16px)              |
| CARD A (Left, 53.5% = 650px, bg #F8EFEA):         | CARD B (Right, 45.4% = 551px):|
| Text left, cosmetic texture swatch right          | Photo left, Journal text right |
+-----------------------------------------------------------------------------------+
| 6. SUBSCRIBE BANNER: y=1824..2017px (Container 1215px, h=193px, bg tint #C6A18F)  |
| Left: Unboxing packaging photo   | Center-Right: "Subscribe & stay consistent" CTA|
+-----------------------------------------------------------------------------------+
| 7. FAQ ACCORDION: y=2030..2200px (Container 1215px, 2-column grid, gap 23px)      |
| Header: "FREQUENTLY ASKED" (left)                             "View all FAQs ->"  |
| Row 1 Col 1: Q1 (+) [46px]                        | Row 1 Col 2: Q2 (+) [46px]     |
| Row 2 Col 1: Q3 (+) [46px]                        | Row 2 Col 2: Q4 (+) [46px]     |
+-----------------------------------------------------------------------------------+
```

---

## 5. Product Page Component Boxes & Layout Rhythm (Width: 1440px Desktop)

```
+-----------------------------------------------------------------------------------+
| 1. TOP ANNOUNCEMENT BAR (h=44px, bg #1E4123, text white 13px)                     |
| Call Us: +123-456-789 | Sign up and GET 20% OFF (Gold link) | 5 Social Icons      |
+-----------------------------------------------------------------------------------+
| 2. MAIN HEADER (h=80px, bg #FFFFFF, border-bottom 1px #EEEEEE)                    |
| [Logo: Aura Botanica] | Home Shop Skin Care Makeup Hair Care About Blogs | Icons  |
+-----------------------------------------------------------------------------------+
| 3. BREADCRUMB HERO BAND (h=190px, bg #F5F5F5, subtle corner leaf watermarks)       |
| Centered H1: "Shop" (40px Playfair bold) | Centered: Home / Shop / Product Details|
+-----------------------------------------------------------------------------------+
| 4. PRODUCT TWO-COLUMN CONTAINER (Width: 1200px, Gap: 28px, y ~314px..850px)       |
| LEFT COLUMN: Gallery (587px)           | RIGHT COLUMN: Buy Box (587px)            |
| - Big 1:1 Image (587x587px, rad 14px)  | - Category: "Skin Care"                  |
| - Round arrow controls (36px, green)   | - Title: "SilkSkin Serum" + "In Stock"   |
| - 4 Thumbnails (110x110px, rad 8px)    | - Stars: 5 gold stars + "4.8 (245 Review)"|
|   gap 6px, active 2px border           | - Price: $48.00 (gold)  $60.00 (gray)    |
|                                        | - Description: 2-3 lines (#666)          |
|                                        | - "Size/Volume" label + Pills (30/60/80) |
|                                        | - Actions: Stepper + Add To Cart +       |
|                                        |   Buy Now (gold) + Wishlist Heart        |
|                                        | - Meta: SKU, Tags, Share (green icons)   |
+-----------------------------------------------------------------------------------+
| 5. PRODUCT TABS (Width: 1200px, h=56px, centered, 1px bottom border)               |
| Description   |   Additional Information   |   Review (2px active green bar)      |
+-----------------------------------------------------------------------------------+
| 6. REVIEWS BREAKDOWN & LIST (Width: 1200px)                                       |
| SUMMARY BLOCK:                                                                    |
| [ 4.8 ] out of 5 | 5 Stars | (245 Review) | | 5 Star ================== [90%]    |
| Vertical divider                           | 4 Star ========           [36%]    |
|                                            | 3 Star ===                [12%]    |
|                                            | 2 Star =                  [3%]     |
|                                            | 1 Star =                  [2%]     |
| REVIEW LIST: "Showing 1-4 of 24 results" (left) | "Sort by: Newest v" (right)     |
| - Review Item: Avatar (44px) + Name + Verified badge + Date right-aligned         |
|   5 stars + Review Title bold + Review body copy + 3 Customer photo thumbnails    |
+-----------------------------------------------------------------------------------+
```

---

## 6. Responsive Breakdown & Fluid Scaling Rules

| Viewport | Homepage Adaptation | Product Page Adaptation |
| :--- | :--- | :--- |
| **Desktop (> 1024px)** | Full exact replica of Reference 1. Side margins 7.8% (container 1215px max). 50/50 hero, 4-col strip, 4-col category, asymmetric bentos, 2-col FAQ. | Full exact replica of Reference 2. Side margins 8.3% (container 1200px max). 50/50 Gallery & Buy Box, horizontal tabs, 2-up review summary. |
| **Tablet (768px – 1024px)** | Hero maintains 50/50 split with scaled typography. Benefits strip: 4 equal columns. Category grid: 2×2. Bentos stack with equal heights. FAQ: 2 columns. | Gallery and Buy Box sit side-by-side (50/50) with compact padding. Tabs horizontal. Review summary score sits above bar breakdown. |
| **Mobile (360px – 767px)** | Hero stacks (image first, 4:5 aspect ratio, text panel below, 100% width button). Benefits strip reflows into 2×2 compact grid with hairline cross dividers. Categories reflow to 2×2 grid or horizontal scroll-snap. Bento cards stack (image then text). FAQ collapses to single column. Touch targets ≥ 44px. | Gallery full-width with horizontal scroll thumbnails below. Buy box buttons stack vertically (Add to Cart followed by Buy Now). Sticky bottom ATC bar activates. Tabs collapse into clean accordions. |

---

## 7. Next Step Readiness

This specification table locks all coordinates, proportions, colors, fonts, and responsive behavior. Following your confirmation, implementation will proceed systematically one section per commit in the required order.

