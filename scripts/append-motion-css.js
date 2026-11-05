const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

const cssRule = `
/* ==========================================================================
   AURA MOTION ENGINE — INITIAL HIDDEN STATES (JS-ANIM ONLY)
   Protects SEO, No-JS users, and eliminates Cumulative Layout Shift (CLS)
   ========================================================================== */
.js-anim [data-anim="fade-up"],
.js-anim [data-anim="fade-in"],
.js-anim [data-anim="slide-left"],
.js-anim [data-anim="slide-right"],
.js-anim [data-anim="scale-in"],
.js-anim [data-anim="clip-reveal"],
.js-anim [data-anim="mask-lines"] {
  opacity: 0;
  will-change: transform, opacity;
}

.js-anim [data-anim="stagger-children"] > * {
  opacity: 0;
  will-change: transform, opacity;
}

/* Custom Interactive Cursor */
.aura-custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 999999;
}

.aura-cursor-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: var(--color-aura-copper, #B9784D);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.aura-cursor-ring {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(185, 120, 77, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.25s ease, height 0.25s ease, background-color 0.25s ease;
}

.aura-custom-cursor.is-hovering .aura-cursor-ring {
  width: 52px;
  height: 52px;
  background-color: rgba(185, 120, 77, 0.08);
  border-color: var(--color-aura-copper, #B9784D);
}

@media (hover: none) or (prefers-reduced-motion: reduce) {
  .aura-custom-cursor {
    display: none !important;
  }
}
`;

[rootDir, shopifyThemeDir].forEach(dir => {
  const f = path.join(dir, 'assets', 'aura-base.css');
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('AURA MOTION ENGINE')) {
    fs.writeFileSync(f, c + cssRule, 'utf8');
    console.log('Appended motion CSS to', f);
  }
});
