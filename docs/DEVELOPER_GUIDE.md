# AURA BOTANICA v2.0 — DEVELOPER ARCHITECTURE & WORKFLOW GUIDE

**Theme Base:** Shopify Online Store 2.0  
**Motion Framework:** Official GSAP 3.15.1 Core + ScrollTrigger + SplitText  
**CSS Architecture:** Token-Driven Base (`assets/aura-base.css`), Scoped Component Styles, Fluid Typography  

---

## 1. Architectural Overview & Safe-Update Principles

### Core Invariants
1. **Zero-FOUC & No-JS Fallback**: Initial hidden states for animations exist *strictly* under `.js-anim`. Never set `opacity: 0` globally on untriggered elements.
2. **Directory Mirroring**: The repository maintains two identical theme structures:
   - Root `/` (e.g. `sections/`, `snippets/`, `assets/`, `layout/`)
   - `shopify-theme/` (exact mirror)
   Any addition or modification in root **must** be mirrored identically to `shopify-theme/`. Verify with `node scripts/diff-all-theme-files.js` (must return 0 diffs).
3. **No External CDN Dependencies**: All vendor assets (GSAP, ScrollTrigger, SplitText, Swiper, PhotoSwipe) are bundled directly inside `assets/`.
4. **Preserve Minimog 5.3.0 Foundation**: Never rename existing section types, block types, setting IDs, or template filenames that appear in `config/settings_data.json` or `templates/*.json`.

---

## 2. How to Add a New Section

Follow this step-by-step checklist when authoring a new section:

### Step 1: Create Section File (`sections/<section-name>.liquid`)
```liquid
{%- comment -%}
  Aura Botanica v2.0 — <Section Title>
{%- endcomment -%}

{%- liquid
  assign container = section.settings.container
  assign color_scheme = section.settings.color_scheme
-%}

<section
  id="m-<section-name>--{{ section.id }}"
  class="m-<section-name> m-section m-gradient m-color-{{ color_scheme }}"
  style="--section-padding-top: {{ section.settings.padding_top }}px; --section-padding-bottom: {{ section.settings.padding_bottom }}px;"
  data-section-id="{{ section.id }}"
  data-section-type="<section-name>"
>
  <div class="{{ container }} m-section__inner">
    {%- if section.settings.heading != blank -%}
      <div class="m-section__header" data-anim="fade-up">
        <h2 class="m:text-3xl m:font-serif" data-anim="mask-lines">{{ section.settings.heading }}</h2>
      </div>
    {%- endif -%}

    <div class="m-<section-name>__content" data-anim="stagger-children">
      {%- for block in section.blocks -%}
        <div class="m-<section-name>__item" data-anim-child {{ block.shopify_attributes }}>
          {{ block.settings.text }}
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "<Section Title>",
  "settings": [
    {
      "type": "color_scheme",
      "id": "color_scheme",
      "label": "Color scheme",
      "default": "default"
    },
    {
      "type": "select",
      "id": "container",
      "label": "Container width",
      "default": "container",
      "options": [
        { "value": "container", "label": "Default" },
        { "value": "container-fluid", "label": "Fluid" },
        { "value": "container-narrow", "label": "Narrow" }
      ]
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Botanical Heading"
    },
    {
      "type": "header",
      "content": "Section Padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Top padding",
      "min": 0,
      "max": 120,
      "step": 4,
      "unit": "px",
      "default": 64
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Bottom padding",
      "min": 0,
      "max": 120,
      "step": 4,
      "unit": "px",
      "default": 64
    }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Content item",
      "settings": [
        {
          "type": "text",
          "id": "text",
          "label": "Text",
          "default": "Active Botanical Extract"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "<Section Title>",
      "category": "Storytelling"
    }
  ]
}
{% endschema %}
```

### Step 2: Mirror to Theme Directory
```powershell
Copy-Item "sections/<section-name>.liquid" -Destination "shopify-theme/sections/<section-name>.liquid" -Force
```

### Step 3: Verify Section Schema & Theme Integrity
```powershell
node scripts/validate-theme.js
node scripts/diff-all-theme-files.js
```

---

## 3. How to Add a Setting or Block to an Existing Section

1. **Locate Target Section**: Open `sections/<section-name>.liquid`.
2. **Add to `{% schema %}`**: Append the new block or setting definition inside the JSON schema. Use standard Shopify types (`text`, `textarea`, `richtext`, `image_picker`, `range`, `select`, `checkbox`, `color_scheme`).
3. **Always Include Defaults**: Provide sensible botanical skincare defaults so empty fields do not break storefront layouts.
4. **Render in Liquid**: Output the setting via `{{ section.settings.<setting_id> }}` or `{{ block.settings.<setting_id> }}`.
5. **Always Mirror**: Copy the updated section to `shopify-theme/sections/<section-name>.liquid`.

---

## 4. Testing, Build, Packaging & Deployment

### Local Automated Test Commands
Run the complete suite locally before committing:
```powershell
# 1. AST Validation across all templates & schemas (180 checks)
node scripts/validate-theme.js

# 2. Check Snippets & Assets reference integrity
node scripts/check-all-snippets.js
node scripts/check-all-assets.js

# 3. Motion Engine behavioral & lifecycle verification (60 checks)
node scripts/test-phase3-motion.js

# 4. Gumdrop Benchmark & Section library verification (127 checks)
node scripts/test-gumdrop-upgrade.js

# 5. Bit-for-bit parity check between root and shopify-theme/
node scripts/diff-all-theme-files.js
```

### Packaging for Shopify Upload
```powershell
node package-theme.js
node scripts/verify-zip-archive.js
```
The script generates `aura-skincare-theme.zip` with POSIX forward-slashes and verifies:
- 0 backslashes in header paths
- Standard OS 2.0 folder hierarchy (no wrapper parent directory)
- 0 development/secret files included

### Uploading to Shopify
1. In **Shopify Admin**, navigate to **Online Store → Themes**.
2. Click **Add Theme → Upload zip file**.
3. Select `aura-skincare-theme.zip`.
4. Click **Actions → Preview** to verify in live Theme Customizer before publishing.

---

## 5. Rollback Procedures

If an unexpected regression occurs in production:
1. **Shopify Admin Rollback**:
   - In **Online Store → Themes**, click **Actions → Publish** on your previous working theme.
2. **Git Rollback**:
   - Baseline pre-upgrade state is permanently tagged at `v1-backup-before-v2` (`08afdc7`).
   - Cold storage backup is permanently preserved on disk in `_backup_v1/` (493 files).
   - To checkout baseline:
     ```powershell
     git checkout v1-backup-before-v2
     ```
