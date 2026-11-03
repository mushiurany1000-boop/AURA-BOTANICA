const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '..', 'shopify-theme', 'config', 'settings_data.json'),
  path.join(__dirname, '..', 'config', 'settings_data.json')
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.current = data.current || {};

  // 1. General settings
  data.current.use_favicon = true;
  data.current.use_ajax_atc = true;
  data.current.show_scroll_top_button = true;
  data.current.enable_rtl = false;
  data.current.language_support_rtl = 'he,ar';

  // 2. Layout settings
  data.current.container_width = 1280;
  data.current.container_fluid_width = 1620;
  data.current.container_fluid_offset = 95;

  // 3. Typography
  data.current.type_base_size = 16;
  data.current.type_base_line_height = 28;
  data.current.h1_font_size = 56;
  data.current.h2_font_size = 40;
  data.current.type_header_base_size = 32;
  data.current.h4_font_size = 24;
  data.current.type_header_spacing = 1;
  data.current.btn_uppercase_text = false;
  data.current.btn_base_size = 15;
  data.current.btn_letter_spacing = 1;
  data.current.btn_border_width = 1;
  data.current.btn_border_radius = 4;
  data.current.btn_line_height = 23;
  data.current.btn_weight = '500';
  data.current.inputs_border_thickness = 1;
  data.current.inputs_border_radius = 4;

  // 4. Colors
  data.current.default_color_scheme = 'default';
  data.current.bg_cart_wishlist_count = '#B9784D';
  data.current.color_cart_wishlist_count = '#FFFFFF';
  data.current.color_success = '#2D5A3E';
  data.current.color_warning = '#B9784D';
  data.current.color_error = '#9E342B';
  data.current.img_overlay_bg = '#18231F';
  data.current.img_overlay_opacity = 35;

  // Color schemes
  data.current.color_schemes = data.current.color_schemes || {};

  // Default Scheme (Luxury Botanical Ivory)
  data.current.color_schemes.default = {
    settings: {
      background: '#FCFBF7',
      background_secondary: '#F4EFE6',
      background_gradient: '',
      text: '#18231F',
      subtext: '#5C6B61',
      heading_text: '#18231F',
      button: '#18231F',
      button_label: '#FCFBF7',
      outline_button_label: '#18231F',
      button_hover: '#B9784D',
      button_text_hover: '#FFFFFF',
      price_sale: '#B9784D',
      price_regular: '#18231F',
      form_field: '#FFFFFF',
      form_field_label: '#18231F',
      tooltip: '#18231F',
      tooltip_label: '#FCFBF7',
      border: '#E5DFD3'
    }
  };

  // Dark Scheme (Deep Forest Night)
  data.current.color_schemes.dark = {
    settings: {
      background: '#18231F',
      background_secondary: '#1F2D24',
      background_gradient: '',
      text: '#FCFBF7',
      subtext: '#A3B2A7',
      heading_text: '#FCFBF7',
      button: '#B9784D',
      button_label: '#FFFFFF',
      outline_button_label: '#FCFBF7',
      button_hover: '#D4956C',
      button_text_hover: '#18231F',
      price_sale: '#B9784D',
      price_regular: '#FCFBF7',
      form_field: '#1F2D24',
      form_field_label: '#FCFBF7',
      tooltip: '#FCFBF7',
      tooltip_label: '#18231F',
      border: '#2C3C32'
    }
  };

  // Footer Scheme
  data.current.color_schemes.footer = {
    settings: {
      background: '#18231F',
      background_secondary: '#1F2D24',
      background_gradient: '',
      text: '#FCFBF7',
      subtext: '#A3B2A7',
      heading_text: '#FCFBF7',
      button: '#B9784D',
      button_label: '#FFFFFF',
      outline_button_label: '#FCFBF7',
      button_hover: '#D4956C',
      button_text_hover: '#18231F',
      price_sale: '#B9784D',
      price_regular: '#FCFBF7',
      form_field: '#1F2D24',
      form_field_label: '#FCFBF7',
      tooltip: '#FCFBF7',
      tooltip_label: '#18231F',
      border: '#2C3C32'
    }
  };

  // Badges
  data.current.color_schemes['badge-sale'] = {
    settings: {
      background: '#B9784D',
      background_secondary: '#F4EFE6',
      background_gradient: '',
      text: '#FFFFFF',
      subtext: '#FFFFFF',
      heading_text: '#FFFFFF',
      button: '#FFFFFF',
      button_label: '#18231F',
      outline_button_label: '#FFFFFF',
      button_hover: '#FFFFFF',
      button_text_hover: '#18231F',
      price_sale: '#FFFFFF',
      price_regular: '#FFFFFF',
      form_field: '#FFFFFF',
      form_field_label: '#18231F',
      tooltip: '#FFFFFF',
      tooltip_label: '#18231F',
      border: '#B9784D'
    }
  };

  data.current.color_schemes['badge-new'] = {
    settings: {
      background: '#2D4B3E',
      background_secondary: '#F4EFE6',
      background_gradient: '',
      text: '#FCFBF7',
      subtext: '#FCFBF7',
      heading_text: '#FCFBF7',
      button: '#FCFBF7',
      button_label: '#18231F',
      outline_button_label: '#FCFBF7',
      button_hover: '#FCFBF7',
      button_text_hover: '#18231F',
      price_sale: '#FCFBF7',
      price_regular: '#FCFBF7',
      form_field: '#FFFFFF',
      form_field_label: '#18231F',
      tooltip: '#FFFFFF',
      tooltip_label: '#18231F',
      border: '#2D4B3E'
    }
  };

  data.current.color_schemes['badge-hot'] = {
    settings: {
      background: '#8C4A2F',
      background_secondary: '#F4EFE6',
      background_gradient: '',
      text: '#FFFFFF',
      subtext: '#FFFFFF',
      heading_text: '#FFFFFF',
      button: '#FFFFFF',
      button_label: '#18231F',
      outline_button_label: '#FFFFFF',
      button_hover: '#FFFFFF',
      button_text_hover: '#18231F',
      price_sale: '#FFFFFF',
      price_regular: '#FFFFFF',
      form_field: '#FFFFFF',
      form_field_label: '#18231F',
      tooltip: '#FFFFFF',
      tooltip_label: '#18231F',
      border: '#8C4A2F'
    }
  };

  // 5. Section spacing
  data.current.spacing_sections = 80;
  data.current.spacing_sections_mobile = 48;

  // 6. Animations
  data.current.page_transition = true;
  data.current.loading_size = 60;
  data.current.loading_color = '#B9784D';
  data.current.animations = 'fade-in';
  data.current.animation_duration = 0.5;

  // 7. Product card
  data.current.pcard_layout = '1';
  data.current.pcard_alignment = 'left';
  data.current.pcard_image_ratio = 'original';
  data.current.show_second_img = true;
  data.current.show_swatch_option = true;
  data.current.pcard_option_name = 'Size';
  data.current.show_compare_button = true;
  data.current.show_badge_sale = true;
  data.current.show_vendor = false;

  // 8. Article card
  data.current.article_show_date = true;
  data.current.article_show_excerpt = true;
  data.current.article_show_button = true;

  // 9. Product options design & swatches
  data.current.variant_option_design1 = 'button';
  data.current.variant_option_design2 = 'color';
  data.current.variant_option_display_name2 = 'Color';
  data.current.variant_option_design3 = 'dropdown';
  data.current.show_variant_swatch_image = true;

  // 10. Social sharing
  data.current.share_facebook = true;
  data.current.share_pinterest = true;
  data.current.social_instagram_link = 'https://instagram.com/aurabotanica';
  data.current.social_instagram_label = 'Instagram';

  // 11. Cart settings
  data.current.enable_cart_drawer = true;
  data.current.cart_notes_enable = true;
  data.current.discount_code_enable = true;
  data.current.cart_estimate_shipping = true;
  data.current.show_delivery_days = false;
  data.current.default_country_estimate_shipping = 'United States';

  // 12. Search
  data.current.enable_predictive_search = true;
  data.current.search_by_tag = true;
  data.current.search_by_body = true;
  data.current.popular_search_queries = 'Bio-Ferment Serum, Moisture Cream, Camellia Balm, Bakuchiol Nectar';
  data.current.search_unavailable_products = 'last';

  // 13. GDPR settings
  data.current.show_cookie_consent = false;
  data.current.cookie_design_mode = false;
  data.current.cookie_consent_placement = 'bottom';
  data.current.cookie_consent_theme = 'black';

  // 14. Integrated apps
  data.current.review_app = 'shopify';
  data.current.wishlist_app = 'theme';

  // 15. Currency format
  data.current.currency_code_enabled = true;
  data.current.use_theme_currencies = false;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated theme settings in: ${file}`);
});

console.log('All theme settings updated and populated successfully!');

