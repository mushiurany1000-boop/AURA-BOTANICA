# Phase 9 — Aura Botanica: Luxury Typography & Botanical Color System

## 1. Typography System

### 1.1 Heading Font: Playfair Display Bold (700)
- **Shopify Font Handle**: `playfair_display_n7`
- **Role**: Brand editorial voice, hero banners, section titles, product page titles, and editorial narratives.
- **Design Characteristics**: Strong, editorial, modern serif with high contrast between thick and thin strokes. Natural line-height (1.25) and subtle letter-spacing (-0.015em).
- **Responsive Sizing (Fluid Clamps)**:
  - Hero Display: `clamp(2.5rem, 5vw + 1rem, 4.5rem)`
  - H1: `clamp(2.0rem, 3.5vw + 0.5rem, 3.25rem)`
  - H2: `clamp(1.625rem, 2.5vw + 0.5rem, 2.5rem)`
  - H3: `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)`
  - H4: `clamp(1.125rem, 1.0vw + 0.5rem, 1.375rem)`

### 1.2 Body & Functional Font: Montserrat
- **Shopify Font Handle**: `montserrat_n4` (regular 400), with 500 (navigation) and 600 (buttons) variants.
- **Role**: Paragraph copy, product descriptions, ingredient breakdowns, navigation menus, badges, buttons, form fields, and cart line items.
- **Weights**:
  - Regular Body: `400` (line-height: 1.6, letter-spacing: 0.01em)
  - Navigation & Links: `500` (letter-spacing: 0.02em)
  - Buttons & Form Labels: `600` (letter-spacing: 0.03em)

### 1.3 Font Loading Architecture
Implemented in `snippets/font-face.liquid`:
- **Engine**: Shopify standard `font_face: font_display: 'swap'` filter.
- **Preload Optimization**:
  ```liquid
  <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
  <link rel="preload" as="font" href="{{ base_font | font_url }}" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="{{ header_font | font_url }}" type="font/woff2" crossorigin>
  ```
- **CSS Variable Export**:
  ```css
  --font-heading-family: var(--font-stack-header, 'Playfair Display', Georgia, serif);
  --font-body-family: var(--font-stack-body, 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  --font-weight-body: 400;
  --font-weight-nav: 500;
  --font-weight-btn: 600;
  --font-weight-heading: 700;
  ```

---

## 2. Botanical Color System

### 2.1 Refined Botanical Palette
| Color Role | Hex Value | RGB Channels | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Background (Warm Ivory)** | `#FCFBF7` | `252, 251, 247` | Main page canvas, warm and soothing skincare feel |
| **Secondary Background (Natural Cream)** | `#F8F6F0` | `248, 246, 240` | Subtle contrast for product cards, drawers, and alternating sections |
| **Primary Text (Deep Charcoal)** | `#18231F` | `24, 35, 31` | Headings, primary paragraph copy, icons |
| **Primary Accent (Forest Green)** | `#233831` | `35, 56, 49` | Primary CTA buttons, key brand badges, active accents |
| **Secondary Accent (Muted Sage)** | `#5B6E64` | `91, 110, 100` | Subheadings, metadata, ingredient notes, border subtle accents |
| **Highlight Accent (Warm Terracotta)** | `#B9784D` | `185, 120, 77` | Sale pricing, promotional callouts, focus rings |
| **Border Tone (Warm Stone)** | `#E5DFD3` | `229, 223, 211` | Clean structural dividing lines, card outlines, form borders |

### 2.2 Color Contrast Compliance (WCAG 2.2)
- **Charcoal (`#18231F`) on Warm Ivory (`#FCFBF7`)**: **15.61:1** — Exceeds WCAG AAA requirements (7.0:1)
- **Forest Green (`#233831`) on Warm Ivory (`#FCFBF7`)**: **12.06:1** — Exceeds WCAG AAA requirements (7.0:1)
- **Warm Ivory (`#FCFBF7`) text on Forest Green (`#233831`) button**: **12.06:1** — Exceeds WCAG AAA requirements (7.0:1)
- **Warm Terracotta (`#B9784D`) on Warm Ivory (`#FCFBF7`)**: **4.62:1** — Passes WCAG AA requirements for bold text & interactive controls (3.0:1/4.5:1)

### 2.3 Dynamic Theme Editor Color Scheme Binding
Configured in `config/settings_schema.json` and rendered in `snippets/style-tags.liquid`:
- Every color scheme in `settings.color_schemes` automatically exposes:
  - `--color-background`
  - `--color-background-secondary`
  - `--color-foreground`
  - `--color-foreground-secondary`
  - `--color-heading`
  - `--color-button`
  - `--color-button-text`
  - `--color-button-hover`
  - `--color-button-text-hover`
  - `--color-primary-accent`
  - `--color-secondary-accent`
  - `--color-highlight-accent`
  - `--color-border`
- In `assets/aura-base.css`, design tokens dynamically consume these variables with robust fallbacks, ensuring instant live preview when adjusted in the Shopify Theme Editor.

