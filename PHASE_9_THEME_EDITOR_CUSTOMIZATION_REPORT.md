# Phase 9 — Aura Botanica: Theme Editor Customization Report

## 1. Overview
This report documents the Shopify Theme Editor (Online Store 2.0 Customizer) settings available to merchants under **Online Store → Themes → Customize** in the Aura Botanica v2.0 theme.

---

## 2. Global Customization Settings (`config/settings_schema.json`)

Merchants have complete control over global visual styling across 25 categorized configuration panels:

### 2.1 Typography Panel (`Typography`)
- **Heading Font Picker (`type_header_font`)**: Font picker supporting any Shopify library font (defaults to *Playfair Display Bold 700*).
- **Body Font Picker (`type_base_font`)**: Font picker supporting any Shopify library font (defaults to *Montserrat Regular 400*).
- **Custom Web Font Inputs**: URLs and weights for custom font hosting (`custom_heading_font`, `custom_body_font`).
- **Typography Scale**:
  - H1 Size (`h1_font_size`): 36px to 80px (default 60px)
  - H2 Size (`h2_font_size`): 28px to 60px (default 42px)
  - H3 Size (`type_header_base_size`): 20px to 48px (default 36px)
  - H4 Size (`h4_font_size`): 16px to 32px (default 24px)
  - Base Body Size (`type_base_size`): 13px to 20px (default 16px)
  - Line Height (`type_base_line_height`): 20px to 36px (default 28px)
  - Heading Letter Spacing (`type_header_spacing`): -2px to 5px (default 0px)
- **Button Typography & Styling**:
  - Button Font Size (`btn_base_size`): 12px to 22px (default 15px)
  - Button Font Weight (`btn_weight`): 100 to 900 (default 600 Semi-bold)
  - Button Border Radius (`btn_border_radius`): 0px to 30px (default 4px)
  - Button Letter Spacing (`btn_letter_spacing`): 0px to 5px (default 0px)
  - Uppercase Toggle (`btn_uppercase_text`): boolean (default false for natural editorial look)

### 2.2 Colors Panel (`Colors`)
- **Color Scheme Group (`color_schemes`)**:
  Allows merchants to define unlimited color schemes (`default`, `dark`, `footer`, custom presets) with controls for:
  - Background (`background`)
  - Background Secondary (`background_secondary`)
  - Background Gradient (`background_gradient`)
  - Primary Text (`text`)
  - Subtext / Muted Text (`subtext`)
  - Heading Text (`heading_text`)
  - Solid Button Background (`button`)
  - Solid Button Label (`button_label`)
  - Outline Button Label (`outline_button_label`)
  - Button Hover Background (`button_hover`)
  - Button Hover Text (`button_text_hover`)
  - **Primary Accent (`primary_accent`)**: Forest Green default (`#233831`)
  - **Secondary Accent (`secondary_accent`)**: Muted Sage default (`#5B6E64`)
  - **Highlight Accent (`highlight_accent`)**: Warm Terracotta default (`#B9784D`)
  - Border Color (`border`)
  - Price Regular & Sale Colors (`price_regular`, `price_sale`)
  - Form Field Background & Text (`form_field`, `form_field_label`)
  - Tooltip Background & Text (`tooltip`, `tooltip_label`)

### 2.3 Product Cards Panel (`Product cards`)
- **Aspect Ratio Picker (`pcard_image_ratio`)**:
  - `original` (Adapt to image)
  - `1/1` (Square)
  - `4/5` (Luxury Editorial Portrait — Aura Botanica default)
  - `3/4` (Standard Portrait)
  - `4/3` (Landscape)
  - `16/9` (Widescreen)
- **Product Card Layout (`pcard_layout`)**: Styles 1 through 5
- **Secondary Image Hover (`show_second_img`)**: boolean toggle
- **Quick Add & Quick View Toggles**: boolean controls

### 2.4 Layout & Section Spacing Panels (`Layout settings`, `Section`)
- Container Width (`container_width`): 1000px to 1600px (default 1280px)
- Container Fluid Width (`container_fluid_width`): default 1620px
- Desktop Section Spacing (`spacing_sections`): 0px to 250px (default 80px)
- Mobile Section Spacing (`spacing_sections_mobile`): 0px to 60px (default 48px)

---

## 3. Section-Level Theme Editor Controls

All homepage, product, and collection sections support native Shopify Section settings:
1. **Header & Navigation (`sections/header.liquid`)**:
   - Logo upload, logo width slider (desktop & mobile)
   - Menu selection, mega menu layout options
   - Header sticky behavior, transparent header toggle
   - Color scheme selector
2. **Hero Slideshow (`sections/slider.liquid`)**:
   - Slideshow height (adapt, small, medium, large, full)
   - Autoplay, transition speed, pagination dot style
   - Per-slide: background image (desktop & mobile), heading, subheading, CTA button label & URL, content alignment
3. **Dedicated Skincare Sections**:
   - `brand-story.liquid`: Story image, quote, founder signature, clinical metrics
   - `product-benefits-grid.liquid`: Benefit icons, headline, clinical claim descriptions
   - `best-sellers.liquid`: Collection selector, product limit, grid columns (2 to 5)
   - `new-arrivals.liquid`: Tag filtering, product count, banner image
   - `product-comparison-table.liquid`: Feature comparison matrix vs generic skincare
   - `trust-badges.liquid`: Clean clinical badges (Dermatologist Tested, Cruelty Free, Vegan, Recyclable)
4. **Main Product Template (`sections/main-product.liquid`)**:
   - Gallery style: grid, thumbnail carousel, stacked
   - Desktop layout & mobile layout options
   - 30 block types including:
     - `back_in_stock`: Restock modal & variant listener
     - `botanical_ingredients`: Collapsible phyto-nutrient cards
     - `ritual_steps`: Morning/evening application regimen
     - `skin_suitability`: Skin type suitability checklist

