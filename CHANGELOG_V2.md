# AURA BOTANICA v2.0 — CHANGELOG & MIGRATION REGISTER

All architectural changes, refactors, migrations, and file deprecations for the Aura Botanica v2.0 upgrade are strictly registered here prior to execution, in accordance with Safe-Update Rule 2.

**Format:** `Target File` → `Reason for Change` → `Replacement / Refactor Action` → `Deprecation Status`

---

## [Phase 0] — Backup, Audit & Upgrade Initialization (November 4, 2026)

### Baseline & Safety Setup
* **Git Baseline Tag:** `v1-backup-before-v2` created at commit `08afdc7`.
* **Dedicated Upgrade Branch:** Switched to branch `v2-upgrade`. All v2.0 development is isolated to this branch.
* **Cold Storage Backup:** Created full replica of `shopify-theme/` in `_backup_v1/`. Added to `.gitignore`; permanently preserved and never deleted.
* **Admin Tooling Isolation:** Confirmed zero modifications to admin panel or preview tooling (`dev-server.js`, `preview/`, `data/`, `scripts/`, `package.json`).

### Audits Completed
* Created `FEATURE_PARITY.md` documenting 50+ theme capabilities to ensure zero feature loss.
* Created `CLEANUP_LIST.md` identifying all Minimog fashion demo strings, apparel tags, demo store locations, and prototype stylesheet/script conflicts in `layout/theme.liquid`.

---

## [Phase 1: Planned Queue] — Foundation & Token Architecture (Pending User Approval)

The following actions are scheduled for Phase 1 and will only be executed after user authorization:

| File | Reason | Action / Replacement | Status |
| :--- | :--- | :--- | :---: |
| `layout/theme.liquid` | Overlapping prototype assets `theme.css` and `theme.js` inject disruptive global resets and mock scripts after `main.css`. | Remove `<link>` for `theme.css` and `<script>` for `theme.js`. Replace with scoped `aura-base.css`. | Queued |
| `assets/aura-base.css` | Need a clean, non-conflicting home for Aura Botanica brand utility classes and design tokens. | Create scoped stylesheet containing only design tokens, fluid typography, and custom utility classes. No global resets. | Queued |
| `config/settings_schema.json` | Reorganize theme settings into clean categories (Branding, Colors, Typography, Layout, Animations, Product Cards, Cart, Social, Cookie, Search). | Refactor schema with 8+ semantic color schemes and 3 presets (Botanical Ivory, Forest Night, Clay Rose). Preserve all existing setting IDs as aliases. | Queued |
| `config/settings_data.json` | Replace Minimog fashion colors (`Gingham`, `flannel`, fabric lists) and external Minimog CDN fonts with self-hosted typography tokens and skincare tints. | Update settings data while strictly preserving existing block and section IDs. | Queued |
| `templates/product.json` | Section `icon_box_9UtNky` contains demo text `"Why Minimog?"` and activewear guarantee. | Replace with `"Why Aura Botanica?"` and clinical botanical guarantees. | Queued |
| `templates/collection.filter-by-tags.json` | Contains clothing sizes (`XS,S,M,L,XL`), demo apparel brands (`Minimog,Retrolie...`), and fashion tags (`Dress,Shirts,Denim...`). | Replace with skincare sizes (`30ml, 50ml, 100ml`), brand collections, and skin concerns (`Barrier Repair, Hydration, Radiance`). | Queued |
| `templates/page.find-a-store.json` | Contains demo clothing stores in San Francisco with generic return policies. | Replace with Aura Botanica flagship ateliers (San Francisco, Tokyo, Paris). | Queued |
| Duplicate Sections (`announcement-bar.liquid`, `featured-product.liquid`, `slideshow.liquid`, `promotional-banner.liquid`, `spacer-divider.liquid`) | Redundant clones that duplicate authoritative sections. | Move deprecated files to `_deprecated/` outside theme folder. Maintain section aliases in schemas so existing merchant data continues working. | Queued |
