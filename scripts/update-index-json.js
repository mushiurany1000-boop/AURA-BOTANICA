const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'shopify-theme', 'templates', 'index.json'),
  path.join(__dirname, '..', 'templates', 'index.json')
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.sections['section'] = {
    type: 'section',
    disabled: true,
    settings: {
      eyebrow: 'Botanical Atelier',
      title: 'Conscious Cellular Skincare',
      subheading: 'Pure bioactive botanical compounds extracted via supercritical fluid CO2.',
      padding_top: 60,
      padding_bottom: 60
    },
    blocks: {
      liquid_1: {
        type: 'custom_liquid',
        settings: {
          custom_liquid: '<div style="text-align:center;font-style:italic;color:#3D5A45;">&ldquo;Beauty is skin in physiological harmony with nature.&rdquo;</div>'
        }
      }
    },
    block_order: ['liquid_1']
  };

  if (data.sections['collection_list']) data.sections['collection_list'].disabled = true;
  if (data.sections['product_tabs']) data.sections['product_tabs'].disabled = true;
  if (data.sections['brands_list']) data.sections['brands_list'].disabled = true;
  if (data.sections['instagram']) data.sections['instagram'].disabled = true;
  if (data.sections['customer_review_carousel']) data.sections['customer_review_carousel'].disabled = true;

  data.order = [
    'image_with_text_overlay',
    'featured_categories',
    'collection_list',
    'product_tabs',
    'section',
    'custom_banner',
    'collage_tabs',
    'brands_list',
    'size_chart',
    'testimonials',
    'instagram',
    'customer_review_carousel',
    'newsletter'
  ];

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully updated:', file);
});

