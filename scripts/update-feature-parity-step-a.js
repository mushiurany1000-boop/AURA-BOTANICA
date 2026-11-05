const fs = require('fs');
let content = fs.readFileSync('FEATURE_PARITY.md', 'utf8');

const oldLines = `| **Typography** | Luxury Typography Engine (Playfair Display Bold 700 + Montserrat 400/500/600) | \`snippets/font-face.liquid\`, \`assets/aura-base.css\` | Native Shopify font picker loading with font_display: 'swap' | **IMPROVED** |
| **Color Palette** | Botanical Color System & Accents | \`config/settings_schema.json\`, \`snippets/style-tags.liquid\` | Full Theme Editor accent controls (Forest, Sage, Terracotta) with 15.6:1 AAA contrast | **IMPROVED** |
| **Buttons & Interactions** | Button System & Accessible Focus States | \`assets/aura-base.css\` | Montserrat 600, 44px min-height touch targets, 2px accessible focus rings | **IMPROVED** |`;

const newLines = `| **Typography** | Phase 12 High-Contrast Typography (Cormorant Garamond + Jost) | \`snippets/preload.liquid\`, \`assets/aura-base.css\` | Light weight, tight leading, fluid clamp() sizes, uppercase Jost eyebrows (0.2em) | **IMPROVED** |
| **Color Palette** | Phase 12 Dual Reference Palettes ("Terracotta Atelier" & "Forest & Gold") | \`config/settings_data.json\`, \`snippets/style-tags.liquid\`, \`assets/aura-base.css\` | Cream #FDF5F2, blush #F6E8E2, deep brown #3B1E18, rust #7E3023, button #843C2D | **IMPROVED** |
| **Buttons & Interactions** | Phase 12 Rectangular Button System & 1px Flat Cards | \`assets/aura-base.css\` | Rectangular (radius 0-2px), 16x32 padding, 0.14em tracking, zero shadow flat cards | **IMPROVED** |`;

// Normalize CRLF to LF for replacement, then write back
const normalized = content.replace(/\r\n/g, '\n');
const replaced = normalized.replace(oldLines.replace(/\r\n/g, '\n'), newLines);
fs.writeFileSync('FEATURE_PARITY.md', replaced.replace(/\n/g, '\r\n'));
console.log('✓ Updated FEATURE_PARITY.md with Step A capabilities');
