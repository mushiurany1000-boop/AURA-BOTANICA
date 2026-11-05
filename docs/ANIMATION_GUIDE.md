# Aura Botanica v2.0 — Creative Motion & GSAP Animation Guide

## 1. Overview & Architecture

The Aura Botanica v2.0 creative motion engine (`assets/aura-motion.js`) is an enterprise-grade, declarative animation framework built directly on official **GSAP 3.15.1** minified binaries:
- `assets/gsap.min.js` (73,357 bytes) — Official GSAP Core
- `assets/ScrollTrigger.min.js` (44,683 bytes) — Official ScrollTrigger Plugin
- `assets/SplitText.min.js` (7,955 bytes) — Official SplitText Typography Plugin

### Botanical Luxury Pacing
Unlike aggressive consumer retail animations, Aura Botanica uses gentle, botanical clinical luxury pacing:
- **Default Ease**: `power2.out` / `cubic-bezier(0.16, 1, 0.3, 1)` for smooth organic deceleration.
- **Duration**: `0.8s` base (subtle mode) to give elements graceful presence without sluggishness.
- **Stagger**: `0.05s – 0.08s` intervals for natural cascades.

---

## 2. Declarative HTML API (`data-anim`)

Any Liquid template, section, snippet, or block can be animated simply by adding `data-anim="<type>"` to HTML elements. No custom JavaScript is required.

### Supported Animation Types

| Attribute | Description | Default Behavior |
| :--- | :--- | :--- |
| `data-anim="fade-up"` | Upward drift + opacity reveal | 28px offset (subtle) / 48px offset (full), 0.8s duration |
| `data-anim="fade-in"` | Pure opacity reveal | Smooth linear/power1 fade from opacity 0 to 1 |
| `data-anim="slide-left"` | Entrance from the left | -35px offset (subtle) / -60px offset (full) |
| `data-anim="slide-right"` | Entrance from the right | +35px offset (subtle) / +60px offset (full) |
| `data-anim="scale-in"` | Gentle scale reveal | Scales smoothly from 0.94 to 1.0 |
| `data-anim="clip-reveal"` | Inset curtain mask | Clips from bottom (`inset(0 0 100% 0)`) to full view |
| `data-anim="mask-lines"` | Editorial typography line reveal | Splits headings into lines, wraps in overflow masks, slides up |
| `data-anim="stagger-children"`| Cascading children entrance | Staggers all direct children or elements matching `[data-anim-child]` |
| `data-anim="parallax"` | Scrubbed scroll translation | Moves vertically at rate set by `data-anim-speed` (-100px * speed) |
| `data-anim="counter"` | Numerical count-up | Smoothly interpolates text content from 0 to target number |
| `data-anim="marquee"` | Seamless infinite ticker | Infinite linear marquee scroll at `data-marquee-speed` |
| `data-anim="pin"` | Sticky scroll pinning | Pins section on desktop until `data-pin-end` threshold |

---

## 3. Modifiers & Fine-Tuning Attributes

Combine modifier attributes on the same element to fine-tune motion without touching JavaScript:

```html
<!-- Example 1: Section Header with Line Mask & Delay -->
<h2 class="aura-editorial__title" 
    data-anim="mask-lines" 
    data-anim-delay="0.15" 
    data-anim-duration="1.1">
  Clinically Proven Botanical Actives
</h2>

<!-- Example 2: Product Grid with Staggered Cards -->
<div class="m-product-grid" 
     data-anim="stagger-children" 
     data-anim-stagger="0.08" 
     data-anim-delay="0.2">
  <div class="m-product-card" data-anim-child>...</div>
  <div class="m-product-card" data-anim-child>...</div>
  <div class="m-product-card" data-anim-child>...</div>
</div>

<!-- Example 3: Clinical Results Counter -->
<div class="m-stat__number" 
     data-anim="counter" 
     data-counter-suffix="%" 
     data-anim-duration="1.6">
  98%
</div>

<!-- Example 4: Parallax Ingredient Image -->
<div class="m-image-wrapper" 
     data-anim="parallax" 
     data-anim-speed="0.2">
  <img src="botanical-extract.jpg" alt="Botanical Extract" />
</div>

<!-- Example 5: Magnetic CTA Button -->
<button class="m-button m-button--primary" data-magnetic>
  Explore Clinical Formulations
</button>
```

### Modifier Reference
- `data-anim-delay="<seconds>"`: Delay before animation triggers (e.g. `0.2`).
- `data-anim-duration="<seconds>"`: Base duration override (e.g. `1.2`).
- `data-anim-stagger="<seconds>"`: Interval between staggered items (e.g. `0.05`).
- `data-anim-speed="<number>"`: Parallax rate multiplier (default: `0.15`).
- `data-marquee-speed="<seconds>"`: Time for marquee loop completion (default: `30`).
- `data-counter-prefix="<string>"` / `data-counter-suffix="<string>"`: Unit affix for counters.
- `data-magnetic`: Enables interactive cursor magnetic pull on hover.

---

## 4. Merchant Theme Settings (`settings_schema.json`)

All animations are merchant-controllable from the Shopify Theme Editor under **Theme Settings > Animations**:

1. **Master Toggle (`animation_enable`)**:
   - When set to `false`, GSAP, ScrollTrigger, and SplitText scripts are **never loaded** (`layout/theme.liquid`), preserving maximum network bandwidth and native rendering.
2. **Animation Intensity (`animation_intensity`)**:
   - `off`: Complete motion suppression.
   - `subtle` (Default): Paced luxury timings (0.8s), shorter travel distances (22–28px).
   - `full`: Dynamic energetic pacing (0.65s), standard travel distances (36–48px).
3. **Smooth Scroll (`animation_smooth_scroll`)**:
   - Native-friendly scroll normalization preventing jarring viewport leaps.
4. **Interactive Magnetic Cursor (`animation_custom_cursor`)**:
   - Custom copper dot and tracking ring cursor for desktop users with interactive expansion over links and buttons. Automatically disabled on touch screens.
5. **Magnetic Buttons (`animation_magnetic_buttons`)**:
   - Micro-interaction pulling buttons slightly toward cursor position on mouseover.
6. **Text Mask Reveals (`animation_text_mask_reveal`)**:
   - Toggle for SplitText heading animations. When disabled, falls back to lightweight `fade-up`.
7. **Image Hover Zoom (`animation_image_hover_zoom`)**:
   - Subtle scale-in effect on product cards and banner images upon hover.

---

## 5. Accessibility & `prefers-reduced-motion`

Aura Botanica strictly adheres to **WCAG 2.1 AA (Guideline 2.3 - Seizures and Physical Reactions)**.

### Automatic Detection & Behavior
When a visitor's operating system requests reduced motion (`prefers-reduced-motion: reduce`):
1. **Spatial Movement Zeroed**: All transforms (`y`, `x`, `scale`, `clip-path`) are completely neutralized.
2. **Opacity Fade Only**: Elements perform a simple, quick 0.3s opacity fade-in or render immediately.
3. **Parallax & Pinning Disabled**: Parallax triggers and pinned layouts are deactivated.
4. **Custom Cursor Suppressed**: The custom cursor element is hidden via CSS (`display: none !important;`).
5. **CSS Media Query Protection**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .js-anim [data-anim="fade-up"],
     .js-anim [data-anim="fade-in"],
     .js-anim [data-anim="slide-left"],
     .js-anim [data-anim="slide-right"],
     .js-anim [data-anim="scale-in"],
     .js-anim [data-anim="clip-reveal"],
     .js-anim [data-anim="mask-lines"],
     .js-anim [data-anim="stagger-children"] > * {
       transition: opacity 0.3s ease !important;
       transform: none !important;
     }
   }
   ```

---

## 6. Performance Best Practices

To ensure 90+ Google Lighthouse performance scores, follow these core principles:

1. **Hardware Acceleration Only**:
   - We only animate `transform` (`translate3d`, `scale`) and `opacity`.
   - Never animate layout-triggering properties (`top`, `left`, `width`, `height`, `margin`, `padding`).
2. **Strict Initial States Scoped to `.js-anim`**:
   - Initial hidden states (`opacity: 0; will-change: transform, opacity;`) are scoped *exclusively* under `.js-anim`.
   - The `.js-anim` class is added to `<html>` **only** by `aura-motion.js` after verifying that animations are active.
3. **No-JS & Crawler Fallback**:
   - If JavaScript is disabled, blocked, or fails to load, `.js-anim` is never applied.
   - All text, imagery, and interactive controls render 100% visible immediately, guaranteeing zero Cumulative Layout Shift (CLS) and flawless indexing by search engines.
4. **ScrollTrigger Efficiency**:
   - Entrance tweens use `once: true`. Once triggered, the ScrollTrigger instance kills its listeners, freeing CPU and memory.
   - Batching and debounced resize handlers prevent layout thrashing.

---

## 7. Shopify Theme Editor Lifecycle (Zero Memory Leaks)

Shopify Online Store 2.0 dynamically injects, reorders, and removes section HTML in the Theme Editor customizer. Traditional animation scripts cause severe memory leaks and duplicate tweens in this environment.

Aura Botanica solves this with a scoped `WeakMap` instance registry:

```javascript
// Lifecycle hook in aura-motion.js:
document.addEventListener("shopify:section:load", function (e) {
  if (e.target) AuraMotion.init(e.target);
});

document.addEventListener("shopify:section:unload", function (e) {
  if (e.target) AuraMotion.kill(e.target);
});

document.addEventListener("shopify:section:reorder", function () {
  if (ScrollTrigger) ScrollTrigger.refresh();
});
```

### What happens on `shopify:section:unload`:
1. Every active `ScrollTrigger` created inside that section is killed.
2. Every active `gsap.tween` is killed and garbage-collected.
3. Any `SplitText` DOM line-wrappers are safely reverted to raw text nodes.
4. `[data-anim-initialized]` flags are cleaned up.
5. The section entry is deleted from the `WeakMap` registry.

---

## 8. Summary Checklist for Developers

- [x] Official GSAP 3.15.1 minified binaries in `assets/`
- [x] Zero external CDN dependencies
- [x] Conditional script loading deferred via `layout/theme.liquid`
- [x] Full `prefers-reduced-motion` compliance
- [x] Zero-leak Shopify Section lifecycle integration
- [x] 100% no-JS fallback safety (Zero CLS)
