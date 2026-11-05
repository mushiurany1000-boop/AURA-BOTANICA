const fs = require('fs');
const path = require('path');

function updateBoth(relPath, updaterFn) {
  const rootFile = path.join(__dirname, '..', relPath);
  const themeFile = path.join(__dirname, '..', 'shopify-theme', relPath);

  if (fs.existsSync(rootFile)) {
    const original = fs.readFileSync(rootFile, 'utf8');
    const updated = updaterFn(original);
    fs.writeFileSync(rootFile, updated, 'utf8');
    if (fs.existsSync(themeFile)) {
      fs.writeFileSync(themeFile, updated, 'utf8');
    }
    console.log(`[UPDATED] ${relPath} in root and shopify-theme`);
  }
}

function updateJsonBoth(relPath, modifierFn) {
  updateBoth(relPath, content => {
    const data = JSON.parse(content);
    modifierFn(data);
    return JSON.stringify(data, null, 2);
  });
}

// 1. templates/product.json
updateJsonBoth('templates/product.json', data => {
  for (const sId in data.sections) {
    const s = data.sections[sId];
    if (s.settings && s.settings.heading === 'Why Minimog?') {
      s.settings.heading = 'Why Aura Botanica?';
    }
    if (s.blocks) {
      for (const bId in s.blocks) {
        const b = s.blocks[bId];
        if (b.settings && b.settings.title === 'Customers Services' && b.settings.description.includes('activewear')) {
          b.settings.title = 'Pure Formulation Guarantee';
          b.settings.description = '<p>Cold-pressed botanical bio-actives backed by our 30-day radiant skin satisfaction guarantee.</p>';
        }
      }
    }
  }
});

// 2. templates/product.grid-2-columns.json
updateJsonBoth('templates/product.grid-2-columns.json', data => {
  for (const sId in data.sections) {
    const s = data.sections[sId];
    if (s.settings && s.settings.heading === 'Why Minimog?') {
      s.settings.heading = 'Why Aura Botanica?';
    }
  }
});

// 3. templates/product.grid-mix-columns.json
updateJsonBoth('templates/product.grid-mix-columns.json', data => {
  for (const sId in data.sections) {
    const s = data.sections[sId];
    if (s.settings && s.settings.heading === 'Why Minimog?') {
      s.settings.heading = 'Why Aura Botanica?';
    }
    if (s.blocks) {
      for (const bId in s.blocks) {
        const b = s.blocks[bId];
        if (b.settings && typeof b.settings.tag === 'string') {
          b.settings.tag = b.settings.tag.replace(/Dresses|Dress/g, 'Serum, Cream, Elixir');
        }
      }
    }
  }
});

// 4. templates/collection.filter-by-tags.json
updateJsonBoth('templates/collection.filter-by-tags.json', data => {
  if (data.sections && data.sections.main && data.sections.main.blocks) {
    const blocks = data.sections.main.blocks;
    if (blocks.filter_tREaVe && blocks.filter_tREaVe.settings) {
      blocks.filter_tREaVe.settings.filtergroup = '30ml, 50ml, 100ml, 150ml, Travel Size';
    }
    if (blocks.filter_MUPNEm && blocks.filter_MUPNEm.settings) {
      blocks.filter_MUPNEm.settings.filtergroup = 'Aura Botanica, Bio-Ferment, Pure Alchemy, Phyto-Active';
    }
    if (blocks.filter_KAT8gx && blocks.filter_KAT8gx.settings) {
      blocks.filter_KAT8gx.settings.filtergroup = 'Barrier Repair, Deep Hydration, Firming, Radiance, Calm & Soothe, Gentle Cleansing';
    }
  }
});

// 5. templates/page.find-a-store.json
updateJsonBoth('templates/page.find-a-store.json', data => {
  if (data.sections && data.sections.main && data.sections.main.blocks) {
    const blocks = data.sections.main.blocks;
    if (blocks['f984f10b-1b7b-4cdf-a354-e37f31a6467c']) {
      blocks['f984f10b-1b7b-4cdf-a354-e37f31a6467c'].settings.heading = 'San Francisco Flagship Atelier';
      blocks['f984f10b-1b7b-4cdf-a354-e37f31a6467c'].settings.content = `<div class="m-store-info">
  <div class="m-store-info__item">
      <h4>Atelier Address</h4>
      <p class="m:text-color-subtext">461 Valencia Street<br> San Francisco, CA 94103</p>
      <a href="#">Directions &amp; Map</a>
  </div>
  <div class="m-store-info__item">
      <h4 class="h5">Consultation Hours</h4>
      <p class="m:text-color-subtext">Skin Consultations &amp; Custom Blending<br> Tuesday – Sunday: 11am to 7pm</p>
  </div>
  <div class="m-store-info__item">
      <h4 class="h5">Concierge</h4>
      <p class="m:text-color-subtext">Reach our apothecary concierge for private routine appointments.</p>
      <p>concierge@aurabotanica.com</p>
  </div>
</div>`;
    }
    if (blocks['3a34b2ba-f10f-430f-be03-f6a5385416c6']) {
      blocks['3a34b2ba-f10f-430f-be03-f6a5385416c6'].settings.heading = 'Tokyo Ginza Studio';
      blocks['3a34b2ba-f10f-430f-be03-f6a5385416c6'].settings.content = `<div class="m-store-info">
  <div class="m-store-info__item">
      <h4>Studio Address</h4>
      <p class="m:text-color-subtext">Ginza Six 4F, Chuo City<br> Tokyo 104-0061, Japan</p>
      <a href="#">Directions &amp; Map</a>
  </div>
  <div class="m-store-info__item">
      <h4 class="h5">Consultation Hours</h4>
      <p class="m:text-color-subtext">Fermentation Bar &amp; Ritual Consultations<br> Daily: 10:30am to 8:30pm</p>
  </div>
  <div class="m-store-info__item">
      <h4 class="h5">Concierge</h4>
      <p class="m:text-color-subtext">Bilingual skincare specialists available for walk-in diagnosis.</p>
      <p>tokyo@aurabotanica.com</p>
  </div>
</div>`;
    }
  }
});

// 6. snippets/theme-info.liquid
updateBoth('snippets/theme-info.liquid', () => {
  return `{%- comment -%}
  Aura Botanica v2.0.0 — Luxury Botanical Clinical Skincare
  [{"version":"2.0.0"},{"name":"aura-botanica"}]
{%- endcomment -%}\n`;
});

// 7. snippets/preload.liquid
updateBoth('snippets/preload.liquid', content => {
  return content.replace(/Minimog prefetch resources/g, 'Aura Botanica prefetch resources');
});

// 8. sections/main-collection-product-grid.liquid
updateBoth('sections/main-collection-product-grid.liquid', content => {
  return content.replace(/"default":\s*"shirts"/g, '"default": "all"');
});

// 9. sections/testimonials.liquid
updateBoth('sections/testimonials.liquid', content => {
  return content.replace(
    /We believe getting dressed should be the easiest part of your day/g,
    'We believe nourishing your skin should be the most restorative part of your day'
  );
});

// 10. config/settings_data.json
updateJsonBoth('config/settings_data.json', data => {
  const cur = data.current;
  cur.filter_color1 = 'Rose Clay';
  cur.filter_color2 = 'Golden Bakuchiol';
  cur.filter_color3 = 'Camellia Blanc';

  // Replace Minimog CDN Jost fonts with clean standard local font definitions
  cur.custom_body_font = '';
  cur.custom_heading_font = '';
  cur.use_custom_font_body = false;
  cur.use_custom_font_heading = false;
  cur.type_base_font = 'cormorant_garamond_n4';
  cur.type_header_font = 'cormorant_garamond_n6';

  // Skincare product swatch colors
  cur.product_colors = `silk ivory: #FCFBF7,
forest green: #18231F,
sage: #4D6459,
mineral clay: #D9C9B8,
copper: #B9784D,
soft gold: #D4AF37,
rose clay: #D4A396,
bakuchiol purple: #8F728E,
camellia cream: #F7F3EB,
botanical amber: #C2873E,
charcoal: #2A2E2B,
white: #FFFFFF`;

  // Build 3 presets: Botanical Ivory, Forest Night, Clay Rose
  data.presets = data.presets || {};
  
  // Preset 1: Botanical Ivory (Default Light Luxury)
  data.presets['Botanical Ivory'] = JSON.parse(JSON.stringify(cur));

  // Preset 2: Forest Night (Deep Luxury)
  const forestNight = JSON.parse(JSON.stringify(cur));
  forestNight.default_color_scheme = 'dark';
  data.presets['Forest Night'] = forestNight;

  // Preset 3: Clay Rose (Warm Terracotta)
  const clayRose = JSON.parse(JSON.stringify(cur));
  clayRose.default_color_scheme = 'scheme-cee058e4-58e3-46aa-9af9-219dadc79066';
  data.presets['Clay Rose'] = clayRose;

  // Keep Default pointing to Botanical Ivory
  data.presets['Default'] = JSON.parse(JSON.stringify(cur));
});

console.log('Phase 1 cleanup execution completed successfully.');

