const fs = require('fs');
const path = require('path');

function updateHeaderGroup(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (content.sections && content.sections.header && content.sections.header.blocks) {
    Object.values(content.sections.header.blocks).forEach(block => {
      if (block.type === 'topbar' && block.settings) {
        if (block.settings.alert_message && block.settings.alert_message.includes('Fashion')) {
          block.settings.alert_message = '<span>Pure Botanical Alchemy  |  <a class=\"m-link-underline\" href=\"/collections/all\">Explore Formulations</a></span>';
          console.log(`Updated topbar alert_message in ${filePath}`);
        }
      }
    });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
}

function updateIndexTemplate(filePath) {
  if (!fs.existsSync(filePath)) return;
  const index = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Slider section
  const sliderSec = index.sections['1621243260e1af0c20'];
  if (sliderSec && sliderSec.blocks) {
    const b0 = sliderSec.blocks['1621243260e1af0c20-0'];
    if (b0 && b0.settings) {
      b0.settings.title = 'Bio-Ferment Barrier<br> Glow Serum';
      b0.settings.subheading = 'Clinically Proven Active Botanical Alchemy';
      b0.settings.button_text = 'Discover Serum';
      b0.settings.button_link = '/collections/all';
    }
    const b1 = sliderSec.blocks['1621243260e1af0c20-1'];
    if (b1 && b1.settings) {
      b1.settings.title = 'Deep Lipid Moisture<br> Cloud Cream';
      b1.settings.subheading = 'Multi-Ceramide Barrier Restoration with Squalane';
      b1.settings.button_text = 'Explore Creams';
      b1.settings.button_link = '/collections/all';
    }
    const b2 = sliderSec.blocks['1621243260e1af0c20-2'];
    if (b2 && b2.settings) {
      b2.settings.title = 'Golden Bakuchiol<br> Midnight Nectar';
      b2.settings.subheading = 'Gentle Plant Retinol for Youthful Cellular Renewal';
      b2.settings.button_text = 'Shop Night Rituals';
      b2.settings.button_link = '/collections/all';
    }
  }

  // 2. Collection list 1
  const catSec = index.sections['16225316461d1cff80'];
  if (catSec && catSec.blocks) {
    catSec.settings.title = 'Shop Formulations by Ritual';
    const catMap = {
      '65e38235-f03b-43c9-8590-38c9c656e51c': { title: 'Active Serums', collection: 'all' },
      '694c01c9-a95f-4c09-9cf0-ec75f0131e98': { title: 'Barrier Creams', collection: 'all' },
      '16225316461d1cff80-1': { title: 'Botanical Cleansers', collection: 'all' },
      '6d4abb37-5aa2-4499-a2b0-5d85f0d36eec': { title: 'Facial Elixirs', collection: 'all' },
      '12985deb-0775-45ce-80f6-6be7f3150a91': { title: 'Curated Sets', collection: 'all' }
    };
    Object.entries(catMap).forEach(([bid, data]) => {
      if (catSec.blocks[bid] && catSec.blocks[bid].settings) {
        catSec.blocks[bid].settings.title = data.title;
        catSec.blocks[bid].settings.collection = data.collection;
      }
    });
  }

  // 3. Product tabs
  const tabSec = index.sections['162251092958fcda7c'];
  if (tabSec && tabSec.blocks) {
    tabSec.settings.heading = 'Pure Botanical Alchemy';
    const t0 = tabSec.blocks['162251092958fcda7c-0'];
    if (t0 && t0.settings) {
      t0.settings.title = 'Award Winners';
      t0.settings.collection = 'all';
    }
    const t1 = tabSec.blocks['162251092958fcda7c-1'];
    if (t1 && t1.settings) {
      t1.settings.title = 'New Formulations';
      t1.settings.collection = 'all';
    }
  }

  // 4. Custom content card
  const cc1 = index.sections['7ea56e8d-5794-4708-8812-8ee9604a3a21'];
  if (cc1 && cc1.blocks) {
    const card = cc1.blocks['5c5877d5-05b2-4a50-81e3-78c3f6d0d833'];
    if (card && card.settings) {
      card.settings.title = 'Wild-Harvested Rosehip<br> & Squalane Elixir';
      card.settings.button_text = 'Explore Elixir';
      card.settings.button_link = '/collections/all';
    }
  }

  // 5. Collection tabs
  const colTabs = index.sections['collection_tabs_QE4TLj'];
  if (colTabs && colTabs.blocks) {
    colTabs.settings.title = 'Cellular Science Meets<br> Conscious Botanical Craft';
    const tabData = [
      { id: 'collection_Yy3bMf', title: 'Antioxidant Serums', collection: 'all' },
      { id: 'collection_EhyPJ6', title: 'Hydrating Creams', collection: 'all' },
      { id: 'collection_PEi4at', title: 'Restorative Oils', collection: 'all' }
    ];
    tabData.forEach(td => {
      if (colTabs.blocks[td.id] && colTabs.blocks[td.id].settings) {
        colTabs.blocks[td.id].settings.title = td.title;
        colTabs.blocks[td.id].settings.collection = td.collection;
      }
    });
  }

  // 6. Custom content text editorial
  const ccText1 = index.sections['custom_content_f3reLw'];
  if (ccText1 && ccText1.blocks) {
    const b = ccText1.blocks['text_DppTKH'];
    if (b && b.settings) {
      b.settings.title = 'The Botanical Apothecary';
      b.settings.sub_title = 'HARVESTED IN HARMONY WITH NATURE';
    }
  }

  const ccText2 = index.sections['custom_content_hh6hmV'];
  if (ccText2 && ccText2.blocks) {
    const b = ccText2.blocks['text_Dxjzb6'];
    if (b && b.settings) {
      b.settings.title = 'Clean botanical formulations honoring the wisdom of earth and cellular science';
    }
  }

  const ccText3 = index.sections['custom_content_KiFzqG'];
  if (ccText3 && ccText3.blocks) {
    const b = ccText3.blocks['text_ADAEHz'];
    if (b && b.settings) {
      b.settings.title = 'Nourish your skin with<br> concentrated botanical extracts';
    }
  }

  // 7. Second collection list
  const colList2 = index.sections['collection_list_tjXYY7'];
  if (colList2 && colList2.blocks) {
    const list2Map = {
      'collection_block_jRJk76': { title: 'Cleansers', collection: 'all' },
      'collection_block_F6rPLj': { title: 'Toners & Mists', collection: 'all' },
      'collection_block_rFmir7': { title: 'Active Serums', collection: 'all' },
      'collection_block_YXwFjp': { title: 'Barrier Creams', collection: 'all' },
      'collection_block_pYgiyF': { title: 'Face Oils', collection: 'all' },
      'collection_block_i7CRfm': { title: 'Treatment Masks', collection: 'all' }
    };
    Object.entries(list2Map).forEach(([bid, data]) => {
      if (colList2.blocks[bid] && colList2.blocks[bid].settings) {
        colList2.blocks[bid].settings.title = data.title;
        colList2.blocks[bid].settings.collection = data.collection;
      }
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Successfully updated skincare data in: ${filePath}`);
}

['sections/header-group.json', 'shopify-theme/sections/header-group.json'].forEach(updateHeaderGroup);
['templates/index.json', 'shopify-theme/templates/index.json'].forEach(updateIndexTemplate);
console.log('All templates and header groups successfully updated.');

