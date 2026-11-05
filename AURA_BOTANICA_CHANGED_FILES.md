# AURA BOTANICA v2.0 — CHANGED FILES REGISTER
## GUMDROP BENCHMARK UPGRADE

**Theme:** Aura Botanica v2.0.0 (Luxury Botanical Clinical Skincare)  
**Date:** November 5, 2026  

---

## 1. Summary of Changes
* **Modified Files:** 5
* **Newly Created Theme Files:** 22 (11 in root `/`, 11 mirrored in `/shopify-theme/`)
* **Test & Verification Scripts:** 1
* **Documentation & Reports:** 8

---

## 2. Exhaustive File Breakdown

### A. Back-in-Stock Restock Notification Subsystem
1. `snippets/back-in-stock.liquid` (Created) — Accessible modal markup & waitlist trigger.
2. `shopify-theme/snippets/back-in-stock.liquid` (Mirrored)
3. `assets/back-in-stock.js` (Created) — Focus trap, variant listener, ESC dismiss, and GSAP scale-in reveal.
4. `shopify-theme/assets/back-in-stock.js` (Mirrored)
5. `assets/back-in-stock.css` (Created) — Backdrop blur, modal card design tokens, reduced-motion overrides.
6. `shopify-theme/assets/back-in-stock.css` (Mirrored)

### B. Main Product Page Skincare Blocks
7. `sections/main-product.liquid` (Modified) — Injected stylesheet/script links and registered 4 blocks: `back_in_stock`, `botanical_ingredients`, `ritual_steps`, `skin_suitability`.
8. `shopify-theme/sections/main-product.liquid` (Modified & Mirrored)
9. `snippets/main-product-blocks.liquid` (Modified) — Handled case rendering for the 4 new blocks and automatic back-in-stock fallback under buy buttons.
10. `shopify-theme/snippets/main-product-blocks.liquid` (Modified & Mirrored)

### C. Dedicated Skincare OS 2.0 Sections Library
11. `sections/brand-story.liquid` (Created) — Editorial narrative, founder quote, badge, and line-mask text reveals.
12. `shopify-theme/sections/brand-story.liquid` (Mirrored)
13. `sections/product-benefits-grid.liquid` (Created) — 4-column efficacy pillars with accessible SVG icons.
14. `shopify-theme/sections/product-benefits-grid.liquid` (Mirrored)
15. `sections/best-sellers.liquid` (Created) — Curated skincare top-sellers grid with quick add and badge overlays.
16. `shopify-theme/sections/best-sellers.liquid` (Mirrored)
17. `sections/new-arrivals.liquid` (Created) — New formulation release showcase with launch tags.
18. `shopify-theme/sections/new-arrivals.liquid` (Mirrored)
19. `sections/trending-products.liquid` (Created) — Trending formulations with numbered rank badges (#01, #02...).
20. `shopify-theme/sections/trending-products.liquid` (Mirrored)
21. `sections/product-comparison-table.liquid` (Created) — Side-by-side formulation matrix comparing actives & textures.
22. `shopify-theme/sections/product-comparison-table.liquid` (Mirrored)
23. `sections/reviews-showcase.liquid` (Created) — Verified customer review cards with 5-star ratings and skin type tags.
24. `shopify-theme/sections/reviews-showcase.liquid` (Mirrored)
25. `sections/trust-badges.liquid` (Created) — Botanical certifications strip (Cruelty-Free, Vegan, Violet Glass).
26. `shopify-theme/sections/trust-badges.liquid` (Mirrored)

### D. Packaging & Verification Scripts
27. `scripts/test-gumdrop-upgrade.js` (Created) — 127 automated checks for benchmark features, sections, PDP blocks, and presets.
28. `aura-skincare-theme.zip` (Updated) — Validated POSIX archive ready for direct Shopify Admin upload (1.09 MB).

### E. Documentation & Phase Reports
29. `GUMDROP_FEATURE_COMPARISON_REPORT.md` (Created)
30. `AURA_BOTANICA_FEATURE_IMPLEMENTATION_REPORT.md` (Created)
31. `AURA_BOTANICA_THEME_EDITOR_GUIDE.md` (Created)
32. `docs/MERCHANT_GUIDE.md` (Created)
33. `docs/DEVELOPER_GUIDE.md` (Created)
34. `AURA_BOTANICA_RESPONSIVE_TEST_REPORT.md` (Created)
35. `AURA_BOTANICA_FUNCTIONALITY_TEST_REPORT.md` (Created)
36. `AURA_BOTANICA_REMAINING_ISSUES.md` (Created)
37. `AURA_BOTANICA_CHANGED_FILES.md` (This file)
