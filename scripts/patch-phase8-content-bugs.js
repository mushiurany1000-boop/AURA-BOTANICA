const fs = require('fs');
const path = require('path');

function patchFile(relPath, transformFn) {
  const rootFile = path.join(__dirname, '..', relPath);
  const themeFile = path.join(__dirname, '..', 'shopify-theme', relPath);

  if (fs.existsSync(rootFile)) {
    const data = JSON.parse(fs.readFileSync(rootFile, 'utf8'));
    transformFn(data);
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(rootFile, content, 'utf8');
    if (fs.existsSync(themeFile)) {
      fs.writeFileSync(themeFile, content, 'utf8');
    }
    console.log(`[PATCHED] ${relPath} in root and shopify-theme`);
  }
}

// 1. Patch 404.json: remove hardcoded "beggy-pant"
patchFile('templates/404.json', data => {
  if (data.sections && data.sections.new_featured_product_Lk9UQU) {
    data.sections.new_featured_product_Lk9UQU.settings.featured_product = '';
  }
});

// 2. Patch index.json: lookbook titles and product_list, testimonials descriptions
patchFile('templates/index.json', data => {
  // Lookbook
  if (data.sections && data.sections.lookbook_MB4Mr4 && data.sections.lookbook_MB4Mr4.blocks) {
    const blocks = data.sections.lookbook_MB4Mr4.blocks;
    if (blocks.shop_this_look_amDhCa) {
      blocks.shop_this_look_amDhCa.settings.title_text = 'Botanical Alchemy. Clinically Proven.';
      blocks.shop_this_look_amDhCa.settings.product_list = [];
    }
    if (blocks.shop_this_look_AVdw3f) {
      blocks.shop_this_look_AVdw3f.settings.title_text = 'Daily Restorative Rituals for Radiance.';
      blocks.shop_this_look_AVdw3f.settings.product_list = [];
    }
    if (blocks.shop_this_look_EcLGgQ) {
      blocks.shop_this_look_EcLGgQ.settings.title_text = 'Pure Active Phyto-Nutrients for Barrier Health.';
      blocks.shop_this_look_EcLGgQ.settings.product_list = [];
    }
  }

  // Testimonials
  if (data.sections && data.sections.testimonials_pnyUnX && data.sections.testimonials_pnyUnX.blocks) {
    const tBlocks = data.sections.testimonials_pnyUnX.blocks;
    const skincareReviews = [
      '<p>The Bio-Ferment Barrier Serum completely restored my skin barrier within two weeks. My complexion has never felt this deeply nourished and luminous.</p>',
      '<p>Aura Botanica has transformed my evening ritual. The Bakuchiol Midnight Nectar gives all the benefits of retinol without a hint of irritation or redness.</p>',
      '<p>The Camellia Cleansing Balm melts away waterproof SPF effortlessly without stripping essential lipids. Absolute luxury in a glass jar.</p>',
      '<p>After trying countless luxury brands, Aura Botanica is the only formulation that healed my dry, reactive skin. Truly clinical alchemy in every drop.</p>',
      '<p>My skin texture is remarkably softer and more radiant. The botanical aromatics make my morning skincare routine feel like a high-end spa retreat.</p>',
      '<p>Clean, thoughtful ingredients with real results. The Deep Lipid Moisture Cream keeps my skin plump and protected all day long.</p>'
    ];
    let idx = 0;
    for (const bId in tBlocks) {
      tBlocks[bId].settings.description = skincareReviews[idx % skincareReviews.length];
      idx++;
    }
  }
});

// 3. Patch page.about-us.json: replace apparel text with luxury skincare philosophy
patchFile('templates/page.about-us.json', data => {
  if (data.sections && data.sections['custom-content'] && data.sections['custom-content'].blocks) {
    const blocks = data.sections['custom-content'].blocks;
    if (blocks['f5e88f1f-ff68-4d03-b686-0cb9fe62fab1']) {
      blocks['f5e88f1f-ff68-4d03-b686-0cb9fe62fab1'].settings.title = '<h4 class="about__block-heading">Rooted in Botanical Alchemy.<br> Proven by Modern Dermatological Science.</h4>\n<p class="about__block-subheading">Formulating conscious, biocompatible skincare that nurtures the lipid barrier and respects the skin microbiome.</p>';
      blocks['f5e88f1f-ff68-4d03-b686-0cb9fe62fab1'].settings.text = '<p>Aura Botanica was founded on the conviction that true luxury lies in uncompromised purity and botanical potency. Our restorative elixirs combine cold-pressed botanicals with micro-fermented bio-actives to deliver transformative clinical results without irritating sensitive complexions. Every formula is sustainably harvested, cruelty-free, and formulated without synthetic fragrance, parabens, or mineral oils.</p>';
    }
    if (blocks['9a3a8077-de29-4141-9162-b9484d4a85f8']) {
      blocks['9a3a8077-de29-4141-9162-b9484d4a85f8'].settings.code = '<div class="sf__about-custom-list">\n  <h3>Our Botanical<br> Commitments.</h3>\n  <ul>\n    <li>\n      <span><svg class="m-svg-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><path d="M12 6v6l4 2"/></svg></span>\n      <div class="rte">\n          <h4>Bio-Ferment Actives</h4>\n          <p class="text-color-subtext">Nutrient bioavailability maximized through slow, sustainable fermentation.</p>\n      </div>\n    </li>\n    <li>\n      <span><svg class="m-svg-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>\n      <div class="rte">\n          <h4>Lipid Barrier Protection</h4>\n          <p class="text-color-subtext">Ceramides, squalane, and omegas that replenish what daily exposure depletes.</p>\n      </div>\n    </li>\n    <li>\n      <span><svg class="m-svg-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>\n      <div class="rte">\n          <h4>100% Conscious Crafting</h4>\n          <p class="text-color-subtext">Sustainable violet glass packaging, Leaping Bunny certified cruelty-free, and carbon-neutral shipping.</p>\n      </div>\n    </li>\n  </ul>\n</div>';
    }
    if (blocks['28e3ce35-e364-43f3-ba87-18b633233063']) {
      blocks['28e3ce35-e364-43f3-ba87-18b633233063'].settings.title = '<h4 class="about__block-heading">Sustainable formulation without compromise.<br> For skin resilience and global biodiversity.</h4>';
      blocks['28e3ce35-e364-43f3-ba87-18b633233063'].settings.text = '<p>We work directly with ethical agricultural cooperatives across Japan, Madagascar, and Provence to source organic camellia seed oil, wild-crafted bakuchiol, and organic botanicals. Every batch is formulated in micro-lots to maintain unyielding active stability and sensory elegance.</p>';
    }
  }
});

// 4. Patch collection.custom-content-banner.json
patchFile('templates/collection.custom-content-banner.json', data => {
  if (data.sections && data.sections.collection_list_aVhnwB && data.sections.collection_list_aVhnwB.blocks) {
    const blocks = data.sections.collection_list_aVhnwB.blocks;
    const skincareCats = [
      { title: 'Bio-Ferment Serums', collection: '' },
      { title: 'Lipid Barrier Creams', collection: '' },
      { title: 'Botanical Cleansers', collection: '' },
      { title: 'Restorative Facial Oils', collection: '' },
      { title: 'Clarifying Elixirs', collection: '' }
    ];
    let i = 0;
    for (const bId in blocks) {
      if (skincareCats[i]) {
        blocks[bId].settings.title = skincareCats[i].title;
        blocks[bId].settings.collection = skincareCats[i].collection;
      }
      i++;
    }
  }
});

console.log('Phase 8 content bug patching completed successfully.');

