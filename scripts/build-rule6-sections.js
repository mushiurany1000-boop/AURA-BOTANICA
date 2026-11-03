const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '..', 'shopify-theme', 'sections'),
  path.join(__dirname, '..', 'sections')
];

const sections = {
  // 1. Slideshow
  'slideshow.liquid': `{%- liquid
  assign section_id = 'm-slideshow-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-slideshow" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="m-slideshow__wrapper relative overflow-hidden" data-autoplay="{{ section.settings.autoplay }}" data-speed="{{ section.settings.speed }}">
      {%- for block in section.blocks -%}
        <div class="m-slideshow__slide relative" {{ block.shopify_attributes }}>
          {%- if block.settings.image != blank -%}
            {{ block.settings.image | image_url: width: 2000 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover' }}
          {%- else -%}
            <div class="m-slideshow__placeholder bg-neutral-200 aspect-[16/9] flex items-center justify-center">
              <span class="text-neutral-500 font-serif text-2xl">{{ block.settings.heading | default: 'Aura Botanica Formulations' }}</span>
            </div>
          {%- endif -%}
          <div class="m-slideshow__content absolute inset-0 flex flex-col justify-center items-{{ block.settings.text_alignment }} p-8 md:p-16 bg-black/20">
            {%- if block.settings.subheading != blank -%}
              <span class="text-xs uppercase tracking-widest text-white/90 mb-2">{{ block.settings.subheading }}</span>
            {%- endif -%}
            {%- if block.settings.heading != blank -%}
              <h2 class="text-3xl md:text-5xl font-serif text-white mb-4">{{ block.settings.heading }}</h2>
            {%- endif -%}
            {%- if block.settings.button_label != blank -%}
              <a href="{{ block.settings.button_link }}" class="m-button m-button--primary inline-block">{{ block.settings.button_label }}</a>
            {%- endif -%}
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Slideshow",
  "settings": [
    {
      "type": "select",
      "id": "container",
      "label": "Container width",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Boxed container" }
      ],
      "default": "container-fluid"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background color",
      "default": "#18231F"
    },
    {
      "type": "checkbox",
      "id": "autoplay",
      "label": "Auto-rotate slides",
      "default": true
    },
    {
      "type": "range",
      "id": "speed",
      "label": "Rotation speed",
      "min": 3,
      "max": 10,
      "step": 1,
      "unit": "s",
      "default": 5
    }
  ],
  "blocks": [
    {
      "type": "slide",
      "name": "Slide Item",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Slide Image" },
        { "type": "text", "id": "subheading", "label": "Subheading", "default": "Pure Botanical Alchemy" },
        { "type": "text", "id": "heading", "label": "Heading", "default": "Bio-Ferment Barrier Restoration" },
        { "type": "text", "id": "button_label", "label": "Button Label", "default": "Explore Ritual" },
        { "type": "url", "id": "button_link", "label": "Button Link" },
        {
          "type": "select",
          "id": "text_alignment",
          "label": "Text alignment",
          "options": [
            { "value": "start", "label": "Left" },
            { "value": "center", "label": "Center" },
            { "value": "end", "label": "Right" }
          ],
          "default": "center"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Slideshow",
      "blocks": [
        { "type": "slide" },
        { "type": "slide" }
      ]
    }
  ]
}
{% endschema %}`,

  // 2. Image Banner
  'image-banner.liquid': `{%- liquid
  assign section_id = 'm-image-banner-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-image-banner relative overflow-hidden" style="min-height: {{ section.settings.banner_height }}px;">
  {%- if section.settings.image != blank -%}
    {{ section.settings.image | image_url: width: 2400 | image_tag: loading: 'lazy', class: 'absolute inset-0 w-full h-full object-cover' }}
  {%- else -%}
    <div class="absolute inset-0 bg-[#18231F] flex items-center justify-center"></div>
  {%- endif -%}
  <div class="absolute inset-0 bg-black" style="opacity: {{ section.settings.overlay_opacity }}%;"></div>
  <div class="relative z-10 {{ section.settings.container }} h-full flex flex-col justify-center items-{{ section.settings.alignment }} py-20">
    {%- if section.settings.subheading != blank -%}
      <span class="text-sm uppercase tracking-widest text-[#B9784D] font-medium mb-3">{{ section.settings.subheading }}</span>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <h2 class="text-4xl md:text-6xl font-serif text-white max-w-2xl mb-6 text-{{ section.settings.alignment }}">{{ section.settings.heading }}</h2>
    {%- endif -%}
    {%- if section.settings.text != blank -%}
      <div class="text-base md:text-lg text-white/80 max-w-xl mb-8 text-{{ section.settings.alignment }}">{{ section.settings.text }}</div>
    {%- endif -%}
    {%- if section.settings.button_label != blank -%}
      <a href="{{ section.settings.button_link }}" class="m-button m-button--primary">{{ section.settings.button_label }}</a>
    {%- endif -%}
  </div>
</div>

{% schema %}
{
  "name": "Image Banner",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Banner image" },
    { "type": "range", "id": "banner_height", "label": "Banner height", "min": 300, "max": 800, "step": 50, "unit": "px", "default": 550 },
    { "type": "range", "id": "overlay_opacity", "label": "Overlay opacity", "min": 0, "max": 90, "step": 5, "unit": "%", "default": 35 },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Botanical Science" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "The Architecture of Radiance" },
    { "type": "richtext", "id": "text", "label": "Description", "default": "<p>Harnessing clinical phyto-actives and regenerative lipid complexes for transformative cellular balance.</p>" },
    { "type": "text", "id": "button_label", "label": "Button label", "default": "Shop Formulations" },
    { "type": "url", "id": "button_link", "label": "Button link" },
    {
      "type": "select",
      "id": "alignment",
      "label": "Alignment",
      "options": [
        { "value": "start", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "end", "label": "Right" }
      ],
      "default": "center"
    }
  ],
  "presets": [
    { "name": "Image Banner" }
  ]
}
{% endschema %}`,

  // 3. Multicolumn
  'multicolumn.liquid': `{%- liquid
  assign section_id = 'm-multicolumn-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-multicolumn py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    {%- if section.settings.heading != blank -%}
      <div class="text-center mb-12">
        {%- if section.settings.subheading != blank -%}
          <span class="text-xs uppercase tracking-widest text-[#B9784D] font-medium block mb-2">{{ section.settings.subheading }}</span>
        {%- endif -%}
        <h2 class="text-3xl md:text-4xl font-serif text-[#18231F]">{{ section.settings.heading }}</h2>
      </div>
    {%- endif -%}
    <div class="grid grid-cols-1 md:grid-cols-{{ section.settings.columns_desktop }} gap-8">
      {%- for block in section.blocks -%}
        <div class="m-multicolumn__item p-6 rounded-lg text-{{ block.settings.align }}" style="background: {{ block.settings.card_bg }};" {{ block.shopify_attributes }}>
          {%- if block.settings.image != blank -%}
            <div class="mb-4 aspect-square overflow-hidden rounded">
              {{ block.settings.image | image_url: width: 600 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover' }}
            </div>
          {%- endif -%}
          {%- if block.settings.title != blank -%}
            <h3 class="text-xl font-serif text-[#18231F] mb-2">{{ block.settings.title }}</h3>
          {%- endif -%}
          {%- if block.settings.text != blank -%}
            <div class="text-sm text-[#5C6B61] leading-relaxed mb-4">{{ block.settings.text }}</div>
          {%- endif -%}
          {%- if block.settings.link_label != blank -%}
            <a href="{{ block.settings.link }}" class="text-xs uppercase tracking-wider font-semibold text-[#B9784D] hover:underline">{{ block.settings.link_label }} &rarr;</a>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Multicolumn",
  "settings": [
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Our Pillars" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Clinical Precision, Pure Botanicals" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "range", "id": "columns_desktop", "label": "Columns on desktop", "min": 2, "max": 4, "step": 1, "default": 3 },
    { "type": "color", "id": "bg_color", "label": "Section background", "default": "#FCFBF7" }
  ],
  "blocks": [
    {
      "type": "column",
      "name": "Column Item",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "text", "id": "title", "label": "Title", "default": "Bio-Ferment Actives" },
        { "type": "richtext", "id": "text", "label": "Description", "default": "<p>Micro-filtered fermentations enhance nutrient bioavailability and reinforce lipid barriers.</p>" },
        { "type": "text", "id": "link_label", "label": "Link label", "default": "Learn more" },
        { "type": "url", "id": "link", "label": "Link URL" },
        { "type": "color", "id": "card_bg", "label": "Card background", "default": "#F4EFE6" },
        {
          "type": "select",
          "id": "align",
          "label": "Text alignment",
          "options": [
            { "value": "left", "label": "Left" },
            { "value": "center", "label": "Center" }
          ],
          "default": "left"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Multicolumn",
      "blocks": [
        { "type": "column" },
        { "type": "column" },
        { "type": "column" }
      ]
    }
  ]
}
{% endschema %}`,

  // 4. Logo List
  'logo-list.liquid': `{%- liquid
  assign section_id = 'm-logo-list-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-logo-list py-12 border-y border-[#E5DFD3]" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    {%- if section.settings.heading != blank -%}
      <p class="text-center text-xs uppercase tracking-widest text-[#5C6B61] mb-8 font-medium">{{ section.settings.heading }}</p>
    {%- endif -%}
    <div class="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity">
      {%- for block in section.blocks -%}
        <div class="m-logo-list__item" {{ block.shopify_attributes }}>
          {%- if block.settings.image != blank -%}
            {{ block.settings.image | image_url: width: 240 | image_tag: loading: 'lazy', class: 'h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition' }}
          {%- else -%}
            <span class="text-sm font-serif uppercase tracking-widest text-[#18231F] font-bold">{{ block.settings.label | default: 'VOGUE BOTANICA' }}</span>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Logo list",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Featured in Global Editorial Publications" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#FCFBF7" }
  ],
  "blocks": [
    {
      "type": "logo",
      "name": "Logo item",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Logo Image" },
        { "type": "text", "id": "label", "label": "Text Fallback", "default": "VOGUE" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Logo list",
      "blocks": [
        { "type": "logo", "settings": { "label": "VOGUE" } },
        { "type": "logo", "settings": { "label": "ELLE BEAUTY" } },
        { "type": "logo", "settings": { "label": "HARPER'S BAZAAR" } },
        { "type": "logo", "settings": { "label": "VANITY FAIR" } }
      ]
    }
  ]
}
{% endschema %}`,

  // 5. Featured Collection
  'featured-collection.liquid': `{%- liquid
  assign section_id = 'm-featured-collection-' | append: section.id
  assign collection = collections[section.settings.collection]
-%}
<div id="{{ section_id }}" class="m-section m-featured-collection py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="flex justify-between items-end mb-10">
      <div>
        {%- if section.settings.subheading != blank -%}
          <span class="text-xs uppercase tracking-widest text-[#B9784D] block mb-2 font-medium">{{ section.settings.subheading }}</span>
        {%- endif -%}
        <h2 class="text-3xl md:text-4xl font-serif text-[#18231F]">{{ section.settings.heading }}</h2>
      </div>
      {%- if section.settings.show_view_all and collection != blank -%}
        <a href="{{ collection.url }}" class="text-sm uppercase tracking-wider font-semibold text-[#18231F] hover:text-[#B9784D] transition">View All &rarr;</a>
      {%- endif -%}
    </div>
    <div class="grid grid-cols-2 md:grid-cols-{{ section.settings.columns_desktop }} gap-6">
      {%- if collection != blank and collection.products.size > 0 -%}
        {%- for product in collection.products limit: section.settings.products_to_show -%}
          <div class="m-product-card-wrap">
            {% render 'product-card-1', product: product %}
          </div>
        {%- endfor -%}
      {%- else -%}
        {%- for i in (1..section.settings.products_to_show) -%}
          <div class="p-4 bg-[#F4EFE6] rounded text-center">
            <div class="aspect-square bg-neutral-200 mb-4 rounded"></div>
            <h4 class="font-serif text-[#18231F]">Botanical Formulation {{ i }}</h4>
            <p class="text-sm text-[#B9784D] font-medium mt-1">$68.00</p>
          </div>
        {%- endfor -%}
      {%- endif -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Featured Collection",
  "settings": [
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Pure Formulation Alchemy" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Curated Formulations" },
    { "type": "range", "id": "products_to_show", "label": "Products to show", "min": 2, "max": 12, "step": 1, "default": 4 },
    { "type": "range", "id": "columns_desktop", "label": "Columns on desktop", "min": 2, "max": 5, "step": 1, "default": 4 },
    { "type": "checkbox", "id": "show_view_all", "label": "Show 'View All' link", "default": true },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#FCFBF7" }
  ],
  "presets": [
    { "name": "Featured Collection" }
  ]
}
{% endschema %}`,

  // 6. Collection List
  'collection-list.liquid': `{%- liquid
  assign section_id = 'm-collection-list-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-collection-list py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="text-center mb-12">
      {%- if section.settings.subheading != blank -%}
        <span class="text-xs uppercase tracking-widest text-[#B9784D] block mb-2 font-medium">{{ section.settings.subheading }}</span>
      {%- endif -%}
      <h2 class="text-3xl md:text-4xl font-serif text-[#18231F]">{{ section.settings.heading }}</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-{{ section.settings.columns_desktop }} gap-6">
      {%- for block in section.blocks -%}
        {%- assign col = collections[block.settings.collection] -%}
        <div class="m-collection-card group relative overflow-hidden rounded-lg aspect-[4/5] bg-neutral-200" {{ block.shopify_attributes }}>
          {%- if block.settings.image != blank -%}
            {{ block.settings.image | image_url: width: 800 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' }}
          {%- elsif col.featured_image != blank -%}
            {{ col.featured_image | image_url: width: 800 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' }}
          {%- endif -%}
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 class="text-2xl font-serif text-white mb-2">{{ block.settings.title | default: col.title | default: 'Collection' }}</h3>
            <a href="{{ col.url | default: '#' }}" class="text-xs uppercase tracking-widest text-[#E2B293] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore Ritual &rarr;</a>
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Collection list",
  "settings": [
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Skincare Rituals" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Discover by Category" },
    { "type": "range", "id": "columns_desktop", "label": "Columns on desktop", "min": 2, "max": 4, "step": 1, "default": 3 },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#F4EFE6" }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "Collection Item",
      "settings": [
        { "type": "collection", "id": "collection", "label": "Collection" },
        { "type": "image_picker", "id": "image", "label": "Custom image" },
        { "type": "text", "id": "title", "label": "Custom title" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Collection list",
      "blocks": [
        { "type": "collection", "settings": { "title": "Serums & Elixirs" } },
        { "type": "collection", "settings": { "title": "Hydration Creams" } },
        { "type": "collection", "settings": { "title": "Camellia Cleansers" } }
      ]
    }
  ]
}
{% endschema %}`,

  // 7. Product Comparison
  'product-comparison.liquid': `{%- liquid
  assign section_id = 'm-product-comparison-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-product-comparison py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="text-center mb-12">
      {%- if section.settings.subheading != blank -%}
        <span class="text-xs uppercase tracking-widest text-[#B9784D] block mb-2 font-medium">{{ section.settings.subheading }}</span>
      {%- endif -%}
      <h2 class="text-3xl md:text-4xl font-serif text-[#18231F]">{{ section.settings.heading }}</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse border border-[#E5DFD3] bg-white rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-[#F4EFE6] text-[#18231F] font-serif text-lg border-b border-[#E5DFD3]">
            <th class="p-4 md:p-6 w-1/4">Key Metrics</th>
            {%- for block in section.blocks -%}
              <th class="p-4 md:p-6 text-center" {{ block.shopify_attributes }}>
                <span class="block font-bold">{{ block.settings.product_name }}</span>
                <span class="text-xs text-[#B9784D] font-mono">{{ block.settings.product_price }}</span>
              </th>
            {%- endfor -%}
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E5DFD3] text-sm text-[#18231F]">
          <tr>
            <td class="p-4 font-semibold text-[#5C6B61]">Primary Active</td>
            {%- for block in section.blocks -%}
              <td class="p-4 text-center">{{ block.settings.active_ingredient }}</td>
            {%- endfor -%}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-[#5C6B61]">Skin Concern</td>
            {%- for block in section.blocks -%}
              <td class="p-4 text-center">{{ block.settings.skin_concern }}</td>
            {%- endfor -%}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-[#5C6B61]">Texture Profile</td>
            {%- for block in section.blocks -%}
              <td class="p-4 text-center">{{ block.settings.texture }}</td>
            {%- endfor -%}
          </tr>
          <tr>
            <td class="p-4 font-semibold text-[#5C6B61]">Clinical Result</td>
            {%- for block in section.blocks -%}
              <td class="p-4 text-center text-[#2D5A3E] font-medium">{{ block.settings.clinical_result }}</td>
            {%- endfor -%}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Product Comparison",
  "settings": [
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Formulation Comparison" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Find Your Optimal Skincare Pairing" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#FCFBF7" }
  ],
  "blocks": [
    {
      "type": "product_spec",
      "name": "Product Column",
      "settings": [
        { "type": "text", "id": "product_name", "label": "Formulation Name", "default": "Bio-Ferment Serum" },
        { "type": "text", "id": "product_price", "label": "Price", "default": "$68.00" },
        { "type": "text", "id": "active_ingredient", "label": "Primary Active", "default": "5% Niacinamide + Ceramide NP" },
        { "type": "text", "id": "skin_concern", "label": "Target Concern", "default": "Barrier Repair & Hydration" },
        { "type": "text", "id": "texture", "label": "Texture", "default": "Silk Weightless Essence" },
        { "type": "text", "id": "clinical_result", "label": "Clinical Metric", "default": "+94% Barrier Hydration at 48h" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Product Comparison",
      "blocks": [
        { "type": "product_spec", "settings": { "product_name": "Bio-Ferment Glow Serum", "product_price": "$68.00", "active_ingredient": "Micro-Ferments & Niacinamide" } },
        { "type": "product_spec", "settings": { "product_name": "Deep Lipid Cloud Cream", "product_price": "$74.00", "active_ingredient": "Triple Ceramide Complex" } },
        { "type": "product_spec", "settings": { "product_name": "Golden Bakuchiol Nectar", "product_price": "$78.00", "active_ingredient": "2% Cold-Pressed Bakuchiol" } }
      ]
    }
  ]
}
{% endschema %}`,

  // 8. Ingredient Spotlight
  'ingredient-spotlight.liquid': `{%- liquid
  assign section_id = 'm-ingredient-spotlight-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-ingredient-spotlight py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        {%- if section.settings.subheading != blank -%}
          <span class="text-xs uppercase tracking-widest text-[#B9784D] font-medium block mb-2">{{ section.settings.subheading }}</span>
        {%- endif -%}
        <h2 class="text-3xl md:text-5xl font-serif text-[#18231F] mb-6">{{ section.settings.heading }}</h2>
        <div class="text-[#5C6B61] text-base leading-relaxed mb-8">{{ section.settings.description }}</div>
        
        <div class="space-y-4">
          {%- for block in section.blocks -%}
            <div class="p-4 bg-[#F4EFE6] rounded-lg border-l-4 border-[#B9784D]" {{ block.shopify_attributes }}>
              <h4 class="font-serif text-lg text-[#18231F] font-bold">{{ block.settings.title }}</h4>
              <p class="text-sm text-[#5C6B61] mt-1">{{ block.settings.text }}</p>
            </div>
          {%- endfor -%}
        </div>
      </div>
      <div class="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-200 shadow-xl">
        {%- if section.settings.image != blank -%}
          {{ section.settings.image | image_url: width: 1200 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover' }}
        {%- else -%}
          <div class="w-full h-full bg-[#18231F] flex items-center justify-center p-8 text-center">
            <span class="font-serif text-2xl text-[#FCFBF7]">Pure Phyto-Extraction Matrix</span>
          </div>
        {%- endif -%}
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Ingredient Spotlight",
  "settings": [
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Cellular Phyto-Chemistry" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Potent Bio-Actives Powered by Nature" },
    { "type": "richtext", "id": "description", "label": "Description", "default": "<p>Every formulation is calibrated with bio-available botanical extracts, standardized for clinical potency without synthetic silicones, sulfates, or parabens.</p>" },
    { "type": "image_picker", "id": "image", "label": "Ingredient Image" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#FCFBF7" }
  ],
  "blocks": [
    {
      "type": "active",
      "name": "Bio-Active Item",
      "settings": [
        { "type": "text", "id": "title", "label": "Compound Name", "default": "Cold-Pressed Camellia Japonica Seed Oil" },
        { "type": "text", "id": "text", "label": "Efficacy", "default": "Rich in oleic acid and vitamins A, B, D, and E to protect and nourish fragile lipid bilayers." }
      ]
    }
  ],
  "presets": [
    {
      "name": "Ingredient Spotlight",
      "blocks": [
        { "type": "active", "settings": { "title": "5% Bifida Bio-Ferment Lysate", "text": "Accelerates cutaneous repair and fortifies the natural microbiome." } },
        { "type": "active", "settings": { "title": "Plant-Derived Bakuchiol (2%)", "text": "Clinically proven gentle retinol alternative for cellular turnover." } },
        { "type": "active", "settings": { "title": "Phyto-Ceramide NP Complex", "text": "Biomimetic moisture retention with zero greasiness." } }
      ]
    }
  ]
}
{% endschema %}`,

  // 9. Ritual Steps
  'ritual-steps.liquid': `{%- liquid
  assign section_id = 'm-ritual-steps-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-ritual-steps py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="text-center mb-12">
      {%- if section.settings.subheading != blank -%}
        <span class="text-xs uppercase tracking-widest text-[#B9784D] block mb-2 font-medium">{{ section.settings.subheading }}</span>
      {%- endif -%}
      <h2 class="text-3xl md:text-4xl font-serif text-[#18231F]">{{ section.settings.heading }}</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-{{ section.blocks.size }} gap-8 relative">
      {%- for block in section.blocks -%}
        <div class="m-ritual-step p-6 bg-[#FCFBF7] rounded-xl border border-[#E5DFD3] relative" {{ block.shopify_attributes }}>
          <span class="w-10 h-10 rounded-full bg-[#18231F] text-[#FCFBF7] font-serif text-lg font-bold flex items-center justify-center mb-4">0{{ forloop.index }}</span>
          <h3 class="text-xl font-serif text-[#18231F] mb-2">{{ block.settings.title }}</h3>
          <p class="text-sm text-[#5C6B61] leading-relaxed mb-4">{{ block.settings.instructions }}</p>
          {%- if block.settings.product_tip != blank -%}
            <span class="text-xs text-[#B9784D] font-medium block border-t border-[#E5DFD3] pt-3">Recommended: {{ block.settings.product_tip }}</span>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Ritual Steps",
  "settings": [
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Daily Application Guide" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "The 3-Step Botanical Ritual" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#F4EFE6" }
  ],
  "blocks": [
    {
      "type": "step",
      "name": "Ritual Step",
      "settings": [
        { "type": "text", "id": "title", "label": "Step Name", "default": "Clarify & Melt" },
        { "type": "text", "id": "instructions", "label": "Instructions", "default": "Warm a hazelnut-sized portion between dry palms. Massage onto dry skin in circular rhythms to melt SPF and impurities." },
        { "type": "text", "id": "product_tip", "label": "Product Pairing", "default": "Gentle Camellia Cleansing Balm" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Ritual Steps",
      "blocks": [
        { "type": "step", "settings": { "title": "Step 1: Clarify", "instructions": "Dissolve impurities with botanical oils.", "product_tip": "Camellia Balm" } },
        { "type": "step", "settings": { "title": "Step 2: Infuse", "instructions": "Press bio-ferment serum into damp skin for cellular absorption.", "product_tip": "Barrier Serum" } },
        { "type": "step", "settings": { "title": "Step 3: Seal", "instructions": "Lock in hydration with lipid-rich cloud cream.", "product_tip": "Cloud Cream" } }
      ]
    }
  ]
}
{% endschema %}`,

  // 10. Before & After
  'before-after.liquid': `{%- liquid
  assign section_id = 'm-before-after-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-before-after py-16" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="text-center mb-12">
      {%- if section.settings.subheading != blank -%}
        <span class="text-xs uppercase tracking-widest text-[#B9784D] block mb-2 font-medium">{{ section.settings.subheading }}</span>
      {%- endif -%}
      <h2 class="text-3xl md:text-4xl font-serif text-[#18231F]">{{ section.settings.heading }}</h2>
      <p class="text-sm text-[#5C6B61] max-w-xl mx-auto mt-2">{{ section.settings.description }}</p>
    </div>
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl shadow-sm border border-[#E5DFD3]">
      <div class="text-center">
        <span class="text-xs uppercase tracking-widest font-bold text-[#5C6B61] block mb-2">Day 0: Baseline</span>
        <div class="aspect-square bg-neutral-200 rounded-lg overflow-hidden">
          {%- if section.settings.before_image != blank -%}
            {{ section.settings.before_image | image_url: width: 800 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover' }}
          {%- else -%}
            <div class="w-full h-full bg-[#E5DFD3] flex items-center justify-center text-sm font-serif">Before Application</div>
          {%- endif -%}
        </div>
      </div>
      <div class="text-center">
        <span class="text-xs uppercase tracking-widest font-bold text-[#B9784D] block mb-2">Day 28: Barrier Rejuvenated</span>
        <div class="aspect-square bg-neutral-200 rounded-lg overflow-hidden">
          {%- if section.settings.after_image != blank -%}
            {{ section.settings.after_image | image_url: width: 800 | image_tag: loading: 'lazy', class: 'w-full h-full object-cover' }}
          {%- else -%}
            <div class="w-full h-full bg-[#18231F] text-[#FCFBF7] flex items-center justify-center text-sm font-serif">After 28 Days</div>
          {%- endif -%}
        </div>
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Before and After",
  "settings": [
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Clinical Trial Efficacy" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Proven Barrier Restoration" },
    { "type": "text", "id": "description", "label": "Description", "default": "Independent 28-day double-blind clinical study with 42 participants." },
    { "type": "image_picker", "id": "before_image", "label": "Before Image" },
    { "type": "image_picker", "id": "after_image", "label": "After Image" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#FCFBF7" }
  ],
  "presets": [
    { "name": "Before and After" }
  ]
}
{% endschema %}`,

  // 11. Announcement Bar
  'announcement-bar.liquid': `{%- liquid
  assign section_id = 'm-announcement-bar-' | append: section.id
-%}
{%- if section.settings.enable_announcement -%}
<div id="{{ section_id }}" class="m-announcement-bar py-2 px-4 text-center text-xs tracking-wider font-medium" style="background-color: {{ section.settings.bg_color }}; color: {{ section.settings.text_color }};">
  <div class="container flex justify-between items-center mx-auto">
    <div class="flex-1 text-center">
      <span>{{ section.settings.text }}</span>
      {%- if section.settings.link_text != blank -%}
        <a href="{{ section.settings.link_url }}" class="underline ml-2 text-[#E2B293] hover:text-white">{{ section.settings.link_text }}</a>
      {%- endif -%}
    </div>
  </div>
</div>
{%- endif -%}

{% schema %}
{
  "name": "Announcement bar",
  "enabled_on": {
    "groups": ["header"]
  },
  "settings": [
    { "type": "checkbox", "id": "enable_announcement", "label": "Enable announcement", "default": true },
    { "type": "text", "id": "text", "label": "Message", "default": "Complimentary Botanical Cleanser Sample with all orders over $75 • Free Carbon-Neutral Shipping" },
    { "type": "text", "id": "link_text", "label": "Link text", "default": "Claim Ritual &rarr;" },
    { "type": "url", "id": "link_url", "label": "Link URL" },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#18231F" },
    { "type": "color", "id": "text_color", "label": "Text", "default": "#FCFBF7" }
  ],
  "presets": [
    { "name": "Announcement bar" }
  ]
}
{% endschema %}`,

  // 12. Promotional Banner
  'promotional-banner.liquid': `{%- liquid
  assign section_id = 'm-promotional-banner-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-promotional-banner py-12 px-6" style="background-color: {{ section.settings.bg_color }};">
  <div class="{{ section.settings.container }}">
    <div class="bg-[#18231F] text-[#FCFBF7] p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <span class="text-xs uppercase tracking-widest text-[#B9784D] block mb-2 font-medium">{{ section.settings.badge }}</span>
        <h2 class="text-2xl md:text-4xl font-serif mb-2">{{ section.settings.heading }}</h2>
        <p class="text-sm text-neutral-300 max-w-xl">{{ section.settings.text }}</p>
      </div>
      {%- if section.settings.btn_label != blank -%}
        <a href="{{ section.settings.btn_link }}" class="m-button m-button--secondary whitespace-nowrap">{{ section.settings.btn_label }}</a>
      {%- endif -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Promotional Banner",
  "settings": [
    { "type": "text", "id": "badge", "label": "Badge label", "default": "Exclusive Botanical Offer" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Complimentary Travel Ritual with $100+ Orders" },
    { "type": "text", "id": "text", "label": "Description", "default": "Receive our Deluxe Camellia Cleansing Balm & Barrier Recovery Serum duo automatically added at checkout." },
    { "type": "text", "id": "btn_label", "label": "Button Label", "default": "Shop All Formulations" },
    { "type": "url", "id": "btn_link", "label": "Button Link" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#FCFBF7" }
  ],
  "presets": [
    { "name": "Promotional Banner" }
  ]
}
{% endschema %}`,

  // 13. Marquee
  'marquee.liquid': `{%- liquid
  assign section_id = 'm-marquee-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-marquee py-4 overflow-hidden border-y border-[#E5DFD3]" style="background-color: {{ section.settings.bg_color }}; color: {{ section.settings.text_color }};">
  <div class="flex whitespace-nowrap animate-marquee">
    {%- for i in (1..6) -%}
      <div class="flex items-center gap-8 mx-4">
        {%- for block in section.blocks -%}
          <span class="text-xs uppercase tracking-widest font-medium flex items-center gap-4" {{ block.shopify_attributes }}>
            {{ block.settings.text }}
            <span class="text-[#B9784D]">&bull;</span>
          </span>
        {%- endfor -%}
      </div>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Marquee",
  "settings": [
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#18231F" },
    { "type": "color", "id": "text_color", "label": "Text", "default": "#FCFBF7" }
  ],
  "blocks": [
    {
      "type": "text",
      "name": "Ticker Item",
      "settings": [
        { "type": "text", "id": "text", "label": "Text", "default": "100% Cold-Pressed Phyto Actives" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Marquee",
      "blocks": [
        { "type": "text", "settings": { "text": "Microbiome Certified" } },
        { "type": "text", "settings": { "text": "Cruelty-Free & Sustainable" } },
        { "type": "text", "settings": { "text": "Zero Silicones or Sulfates" } },
        { "type": "text", "settings": { "text": "100% Recyclable Violet Miron Glass" } }
      ]
    }
  ]
}
{% endschema %}`,

  // 14. Spacer and Divider
  'spacer-divider.liquid': `{%- liquid
  assign section_id = 'm-spacer-' | append: section.id
-%}
<div id="{{ section_id }}" class="m-section m-spacer-divider" style="height: {{ section.settings.height }}px; background-color: {{ section.settings.bg_color }};">
  {%- if section.settings.show_divider -%}
    <div class="{{ section.settings.container }} h-full flex items-center">
      <hr class="w-full border-t" style="border-color: {{ section.settings.divider_color }};">
    </div>
  {%- endif -%}
</div>

{% schema %}
{
  "name": "Spacer and divider",
  "settings": [
    { "type": "range", "id": "height", "label": "Height", "min": 10, "max": 150, "step": 5, "unit": "px", "default": 40 },
    { "type": "checkbox", "id": "show_divider", "label": "Show divider line", "default": false },
    { "type": "color", "id": "divider_color", "label": "Divider color", "default": "#E5DFD3" },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "transparent" },
    {
      "type": "select",
      "id": "container",
      "label": "Container",
      "options": [
        { "value": "container-fluid", "label": "Full width" },
        { "value": "container", "label": "Container box" }
      ],
      "default": "container"
    }
  ],
  "presets": [
    { "name": "Spacer and divider" }
  ]
}
{% endschema %}`
};

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  Object.keys(sections).forEach(filename => {
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, sections[filename], 'utf8');
    console.log(`Wrote section: ${filePath}`);
  });
});

console.log('All Rule 6 modular sections written successfully!');

