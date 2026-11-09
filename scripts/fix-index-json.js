const fs = require('fs');

const idx = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));

// 1. hero_noir_arch
if (idx.sections.hero_noir_arch) {
  const s = idx.sections.hero_noir_arch.settings;
  s.heading_line_1 = s.heading_serif || 'BEAUTY';
  s.heading_italic = s.heading_italic || 'with';
  s.heading_line_2 = s.heading_accent || 'INTENT';
  s.text = s.subtext || 'We formulate high-concentration botanical elixirs that nourish the skin barrier, restore youthful radiance, and transform daily routines into sacred self-care rituals.';
  delete s.heading_serif;
  delete s.heading_accent;
  delete s.subtext;
}

// 2. what_we_do_pillars
if (idx.sections.what_we_do_pillars) {
  const s = idx.sections.what_we_do_pillars.settings;
  s.heading = 'Strategic formulations.<br>Cellular bio-synergy.<br>Lasting radiance.';
  delete s.heading_prefix;
  delete s.heading_accent;
}

// 3. cta_noir_footer
if (idx.sections.cta_noir_footer) {
  const s = idx.sections.cta_noir_footer.settings;
  s.stamp_monogram = s.monogram || 'KB';
  s.stamp_text = s.stamp_top ? `${s.stamp_top} • ${s.stamp_bottom || ''}`.trim() : 'DESIGNING DIGITAL EXPERIENCES THAT LEAVE A LASTING IMPACT';
  delete s.monogram;
  delete s.stamp_top;
  delete s.stamp_bottom;
}

// 4. bento_row_1
if (idx.sections.bento_row_1) {
  const s = idx.sections.bento_row_1.settings;
  delete s.ritual_color_scheme;
  delete s.ingredient_color_scheme;
}

// 5. bento_row_2
if (idx.sections.bento_row_2) {
  const s = idx.sections.bento_row_2.settings;
  delete s.quiz_color_scheme;
  delete s.journal_color_scheme;
}

// 6. subscribe_save
if (idx.sections.subscribe_save) {
  const s = idx.sections.subscribe_save.settings;
  delete s.color_scheme;
}

// 7. faq
if (idx.sections.faq) {
  const s = idx.sections.faq.settings;
  delete s.color_scheme;
  if (s.heading && !s.subheading) {
    s.subheading = s.heading;
  }
  delete s.heading;
}

fs.writeFileSync('templates/index.json', JSON.stringify(idx, null, 2), 'utf8');
console.log('Successfully cleaned up templates/index.json');

