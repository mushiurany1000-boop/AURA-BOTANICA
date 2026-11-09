const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'templates', 'index.json');
let currentIndex = {};
try {
  currentIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
} catch (e) {
  currentIndex = { sections: {}, order: [] };
}

// Noir Velvet section definitions with high-fidelity defaults matching reference
const noirSections = {
  "hero_noir_arch": {
    "type": "hero-noir-arch",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "eyebrow": "CELLULAR BOTANICAL ATELIER — BORDEAUX & KYOTO",
      "heading_serif": "BEAUTY",
      "heading_italic": "with",
      "heading_accent": "INTENT",
      "subtext": "We formulate high-concentration botanical elixirs that nourish the skin barrier, restore youthful radiance, and transform daily routines into sacred self-care rituals.",
      "button_label": "EXPLORE RITUALS",
      "button_link": "/collections/all",
      "secondary_label": "DISCOVER PHILOSOPHY",
      "secondary_link": "/pages/about-us",
      "stamp_monogram": "KB",
      "stamp_text": "KAYRA ATELIER",
      "padding_top": 60,
      "padding_bottom": 60
    }
  },
  "credentials_strip": {
    "type": "credentials-strip",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "col_1_label": "ATELIER ORIGIN",
      "col_1_text": "Bordeaux & Kyoto",
      "col_2_label": "FORMULATION",
      "col_2_text": "100% Biocompatible & Active",
      "col_3_signature": "Kayra Atelier",
      "col_4_text": "Transforming daily routines into restorative botanical rituals."
    }
  },
  "featured_collections_cards": {
    "type": "featured-collections-cards",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "heading": "FEATURED FORMULATIONS",
      "link_label": "VIEW ALL COLLECTIONS",
      "link_url": "/collections/all"
    },
    "blocks": {
      "card_1": {
        "type": "card",
        "settings": {
          "title": "LUMINA",
          "subtitle": "Radiance Elixir & Squalane Serum",
          "card_bg": "#E4B5A8",
          "link": "/products/silkskin-botanical-serum"
        }
      },
      "card_2": {
        "type": "card",
        "settings": {
          "title": "VIREO STUDIO",
          "subtitle": "Balancing Botanical Essence & Toner",
          "card_bg": "#E4B5A8",
          "link": "/collections/all"
        }
      },
      "card_3": {
        "type": "card",
        "settings": {
          "title": "AURORA LIVING",
          "subtitle": "Deep Moisture Barrier Balm & Creme",
          "card_bg": "#E4B5A8",
          "link": "/collections/all"
        }
      }
    },
    "block_order": ["card_1", "card_2", "card_3"]
  },
  "ritual_approach": {
    "type": "ritual-approach",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "heading": "OUR 5-STEP RITUAL"
    },
    "blocks": {
      "step_1": {
        "type": "step",
        "settings": {
          "title": "DISCOVER",
          "text": "Deep cellular analysis of skin barrier health, hydration deficits, and sensitivity triggers."
        }
      },
      "step_2": {
        "type": "step",
        "settings": {
          "title": "DEFINE",
          "text": "Curating targeted biocompatible phytonutrients tailored to your seasonal skin cycle."
        }
      },
      "step_3": {
        "type": "step",
        "settings": {
          "title": "FORMULATE",
          "text": "Cold-pressed bioferments and active botanical lipids harmonized for peak cellular uptake."
        }
      },
      "step_4": {
        "type": "step",
        "settings": {
          "title": "INFUSE",
          "text": "Layering lightweight essences, active serums, and lipid barrier sealants in harmony."
        }
      },
      "step_5": {
        "type": "step",
        "settings": {
          "title": "REFINE",
          "text": "Sustained barrier resilience, refined pore architecture, and radiant enduring glow."
        }
      }
    },
    "block_order": ["step_1", "step_2", "step_3", "step_4", "step_5"]
  },
  "clinical_case_studies": {
    "type": "clinical-case-studies",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "heading": "CLINICAL PROOF & CASE STUDIES",
      "link_label": "SEE ALL CLINICAL TRIALS",
      "link_url": "/pages/about-us"
    },
    "blocks": {
      "case_1": {
        "type": "case_study",
        "settings": {
          "case_number": "01",
          "title": "LUMINA ACTIVE PROOF",
          "card_bg": "#C58372",
          "description": "94% measured increase in barrier hydration within 14 days of cold-pressed squalane application.",
          "link": "/products/silkskin-botanical-serum"
        }
      },
      "case_2": {
        "type": "case_study",
        "settings": {
          "case_number": "02",
          "title": "VIREO BOTANICAL LAB",
          "card_bg": "#E4B5A8",
          "description": "Reduces inflammatory flare-ups by 82% while balancing sebum production.",
          "link": "/collections/all"
        }
      },
      "case_3": {
        "type": "case_study",
        "settings": {
          "case_number": "03",
          "title": "AURORA CELLULAR REPAIR",
          "card_bg": "#DDB1A5",
          "description": "Restores epidermal elasticity and promotes natural ceramides synthesis.",
          "link": "/collections/all"
        }
      }
    },
    "block_order": ["case_1", "case_2", "case_3"]
  },
  "what_we_do_pillars": {
    "type": "what-we-do-pillars",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "heading_prefix": "Strategic formulation.<br>Seamless rituals.<br>",
      "heading_accent": "Real visible impact."
    },
    "blocks": {
      "pillar_1": {
        "type": "pillar",
        "settings": {
          "title": "BIOCOMPATIBLE ACTIVE SCIENCE",
          "text": "Every botanical active is molecularly calibrated to assimilate without cellular resistance."
        }
      },
      "pillar_2": {
        "type": "pillar",
        "settings": {
          "title": "ETHICAL LUXURY HARVEST",
          "text": "Wild-crafted ingredients sustainably hand-harvested from regenerative European micro-farms."
        }
      },
      "pillar_3": {
        "type": "pillar",
        "settings": {
          "title": "ZERO HARMFUL ADDITIVES",
          "text": "Free from synthetic fragrances, parabens, sulfates, silicones, and microplastics."
        }
      },
      "pillar_4": {
        "type": "pillar",
        "settings": {
          "title": "HOLISTIC RITUAL CONSULTING",
          "text": "Personalized routine guidance for discerning clients seeking transformative skin longevity."
        }
      }
    },
    "block_order": ["pillar_1", "pillar_2", "pillar_3", "pillar_4"]
  },
  "cta_noir_footer": {
    "type": "cta-noir-footer",
    "settings": {
      "color_scheme": "scheme-noir-velvet",
      "heading": "Let's create<br>something<br><span class='script'>extraordinary..</span>",
      "button_label": "EXPLORE THE ATELIER",
      "button_link": "/collections/all",
      "contact_email": "atelier@kayrabeauty.com",
      "instagram_handle": "@kayra.beauty",
      "instagram_link": "https://instagram.com",
      "linkedin_handle": "linkedin.com/company/kayra-beauty",
      "linkedin_link": "https://linkedin.com",
      "location": "Bordeaux, France & Kyoto, Japan",
      "monogram": "KB",
      "stamp_top": "KAYRA BEAUTY",
      "stamp_bottom": "LUXURY BOTANICALS"
    }
  }
};

// Merge all existing sections and mark older sections as available (disabled: true)
const mergedSections = {
  ...noirSections,
  ...currentIndex.sections
};

// Make sure existing terracotta sections are disabled so default render is 100% Noir Velvet reference
const olderSectionKeys = [
  'hero_split', 'benefits_strip', 'shop_by_category', 'bento_row_1', 'bento_row_2',
  'subscribe_save', 'faq', 'best_sellers', 'testimonials', 'newsletter', 'instagram'
];

olderSectionKeys.forEach(k => {
  if (mergedSections[k]) {
    mergedSections[k].disabled = true;
  }
});

const defaultOrder = [
  "hero_noir_arch",
  "credentials_strip",
  "featured_collections_cards",
  "ritual_approach",
  "clinical_case_studies",
  "what_we_do_pillars",
  "cta_noir_footer",
  ...olderSectionKeys.filter(k => mergedSections[k])
];

const newIndexJson = {
  sections: mergedSections,
  order: defaultOrder
};

fs.writeFileSync(indexPath, JSON.stringify(newIndexJson, null, 2), 'utf8');
console.log('Successfully wired Noir Velvet suite into templates/index.json with 18 section options!');

