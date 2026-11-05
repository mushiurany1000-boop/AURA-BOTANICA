const fs = require('fs');

let css = fs.readFileSync('assets/aura-base.css', 'utf8');

// Update eyebrow styling
css = css.replace(/\.aura-eyebrow,\s*\.eyebrow-smallcaps\s*\{[^}]+\}/, `
.aura-eyebrow,
.eyebrow-smallcaps,
.m-eyebrow,
.section__eyebrow {
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: clamp(0.6875rem, 0.2vw + 0.625rem, 0.75rem) !important;
  font-weight: 500 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  display: block;
  margin-bottom: 0.75rem;
  line-height: 1.2 !important;
}
`);

// Add / refine Step A Button, Card & Section Rules
const stepARefinements = `
/* ==========================================================================
   PHASE 12 STEP A REFINEMENTS — BUTTONS, CARDS, WHITESPACE
   ========================================================================== */
.m-button,
.sf__btn,
button.m-add-to-cart,
.button,
.btn,
.aura-btn-primary,
.aura-button {
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-weight: 500 !important;
  border-radius: var(--btn-border-radius, 0px) !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  padding: 16px 32px !important;
  min-height: 48px !important;
  box-shadow: none !important;
  line-height: 1 !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.m-button--primary,
.sf__btn-primary,
button.m-add-to-cart,
.button--primary,
.btn--primary,
.aura-btn-solid {
  background-color: var(--color-aura-button, #843C2D) !important;
  color: var(--color-aura-text-on-rust, #FCE8E7) !important;
  border: 1px solid var(--color-aura-button, #843C2D) !important;
}

@media (hover: hover) {
  .m-button--primary:hover,
  .sf__btn-primary:hover,
  button.m-add-to-cart:hover,
  .button--primary:hover,
  .btn--primary:hover,
  .aura-btn-solid:hover {
    background-color: var(--color-aura-button-hover, #6A2A1F) !important;
    border-color: var(--color-aura-button-hover, #6A2A1F) !important;
    color: var(--color-aura-text-on-rust, #FCE8E7) !important;
    transform: translateY(-1px) !important;
    box-shadow: none !important;
  }
}

.aura-btn-outline {
  background-color: transparent !important;
  color: var(--color-aura-text-on-rust, #FCE8E7) !important;
  border: 1px solid var(--color-aura-text-on-rust, #FCE8E7) !important;
}

@media (hover: hover) {
  .aura-btn-outline:hover {
    background-color: rgba(252, 232, 231, 0.12) !important;
    color: #FFFFFF !important;
  }
}

/* Step A Cards: No shadows, flat blush backgrounds, 1px lines */
.aura-card-luxury,
.aura-category-card,
.aura-bento-card {
  border-radius: var(--card-border-radius, 0px) !important;
  box-shadow: none !important;
  background-color: var(--color-aura-blush-card, #F6E8E2) !important;
  border: 1px solid var(--color-aura-line, #E9D5CC) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;
}

@media (hover: hover) {
  .aura-card-luxury--hover:hover,
  .aura-category-card:hover {
    transform: translateY(-2px) !important;
    border-color: var(--color-aura-copper, #B87350) !important;
    box-shadow: none !important;
  }
}

/* Step A Whitespace Tokens (96-140px desktop / 56-72px mobile) */
.aura-section-spacing {
  padding-top: var(--spacing-sections-desktop, 112px);
  padding-bottom: var(--spacing-sections-desktop, 112px);
}

@media (max-width: 1024px) {
  .aura-section-spacing {
    padding-top: var(--spacing-sections-tablet, 72px);
    padding-bottom: var(--spacing-sections-tablet, 72px);
  }
}

@media (max-width: 767px) {
  .aura-section-spacing {
    padding-top: var(--spacing-sections-mobile, 64px);
    padding-bottom: var(--spacing-sections-mobile, 64px);
  }
}
`;

if (!css.includes('PHASE 12 STEP A REFINEMENTS')) {
  css += '\n' + stepARefinements;
}

fs.writeFileSync('assets/aura-base.css', css);
console.log('✓ Successfully injected Step A refinements into assets/aura-base.css');
