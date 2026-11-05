const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Update config/settings_schema.json with Phase 3 Animation settings
function patchSchema(baseDir) {
  const filePath = path.join(baseDir, 'config', 'settings_schema.json');
  let schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const anim = schema.find(x => x.name === 'Animations');
  if (anim) {
    const existingIds = new Set(anim.settings.map(s => s.id));
    const toAdd = [];

    if (!existingIds.has('animation_magnetic_buttons')) {
      toAdd.push({
        type: "checkbox",
        id: "animation_magnetic_buttons",
        label: "Enable magnetic button hover pull",
        default: false
      });
    }

    if (!existingIds.has('animation_image_hover_zoom')) {
      toAdd.push({
        type: "checkbox",
        id: "animation_image_hover_zoom",
        label: "Enable image hover zoom transition",
        default: true
      });
    }

    if (!existingIds.has('animation_text_mask_reveal')) {
      toAdd.push({
        type: "checkbox",
        id: "animation_text_mask_reveal",
        label: "Enable editorial text line-mask reveals",
        default: true
      });
    }

    if (toAdd.length > 0) {
      anim.settings.push(...toAdd);
      fs.writeFileSync(filePath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
      console.log(`[PASS] Added ${toAdd.length} Phase 3 settings to ${filePath}`);
    }
  }
}

// 2. Update config/settings_data.json with default values
function patchSettingsData(baseDir) {
  const filePath = path.join(baseDir, 'config', 'settings_data.json');
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  function applyDefaults(target) {
    if (typeof target.animation_magnetic_buttons === 'undefined') {
      target.animation_magnetic_buttons = false;
    }
    if (typeof target.animation_image_hover_zoom === 'undefined') {
      target.animation_image_hover_zoom = true;
    }
    if (typeof target.animation_text_mask_reveal === 'undefined') {
      target.animation_text_mask_reveal = true;
    }
  }

  applyDefaults(data.current);
  if (data.presets) {
    for (const [pName, pData] of Object.entries(data.presets)) {
      applyDefaults(pData);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Initialized Phase 3 settings in ${filePath}`);
}

// 3. Patch layout/theme.liquid to load GSAP in exact order with defer
function patchThemeLiquid(baseDir) {
  const filePath = path.join(baseDir, 'layout', 'theme.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  const gsapScripts = `
    {%- comment -%}
      Aura Botanica v2.0 Creative Motion Architecture (GSAP 3.15.1 + AuraMotion Engine)
    {%- endcomment -%}
    <script>
      window.AuraSettings = {
        animation_enable: {{ settings.animation_enable | default: true | json }},
        animation_intensity: {{ settings.animation_intensity | default: 'subtle' | json }},
        animation_smooth_scroll: {{ settings.animation_smooth_scroll | default: false | json }},
        animation_custom_cursor: {{ settings.animation_custom_cursor | default: false | json }},
        animation_magnetic_buttons: {{ settings.animation_magnetic_buttons | default: false | json }},
        animation_image_hover_zoom: {{ settings.animation_image_hover_zoom | default: true | json }},
        animation_text_mask_reveal: {{ settings.animation_text_mask_reveal | default: true | json }}
      };
    </script>
    {%- if settings.animation_enable and settings.animation_intensity != 'off' and settings.animations != 'off' -%}
      <script src="{{ 'gsap.min.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'ScrollTrigger.min.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'SplitText.min.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'aura-motion.js' | asset_url }}" defer="defer"></script>
    {%- endif -%}`;

  if (!content.includes('aura-motion.js')) {
    // Inject right before </head>
    content = content.replace('</head>', `${gsapScripts}\n  </head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected GSAP loading block in ${filePath}`);
  }
}

[rootDir, shopifyThemeDir].forEach(dir => {
  patchSchema(dir);
  patchSettingsData(dir);
  patchThemeLiquid(dir);
});

console.log('Phase 3 Settings & Theme.liquid patched successfully.');

