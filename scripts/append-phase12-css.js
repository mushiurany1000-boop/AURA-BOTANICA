const fs = require('fs');

const css = fs.readFileSync('assets/aura-base.css', 'utf8');

const phase12CSS = `

/* ==========================================================================
   AURA BOTANICA PHASE 12 — LUXURY EDITORIAL & HOMEPAGE DESIGN SYSTEM
   ========================================================================== */

/* Eyebrows & Editorial Typography */
.aura-eyebrow,
.eyebrow-smallcaps {
  font-family: var(--font-body-family, 'Montserrat', sans-serif) !important;
  font-size: 0.725rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  display: block;
  margin-bottom: 0.75rem;
}

/* Subtle 1px dividers and clean surfaces */
.aura-border-thin {
  border: 1px solid rgba(var(--color-border), 0.45);
}

.aura-border-top-thin {
  border-top: 1px solid rgba(var(--color-border), 0.45);
}

.aura-border-bottom-thin {
  border-bottom: 1px solid rgba(var(--color-border), 0.45);
}

/* Luxury 0-4px card system */
.aura-card-luxury {
  border-radius: 4px;
  background-color: rgb(var(--color-background-secondary, var(--color-background)));
  border: 1px solid rgba(var(--color-border), 0.4);
  box-shadow: 0 4px 16px -2px rgba(41, 45, 40, 0.03);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
}

@media (hover: hover) {
  .aura-card-luxury--hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -8px rgba(41, 45, 40, 0.08);
  }
}

/* Benefits Strip Grid & Dividers */
.aura-benefits-strip {
  position: relative;
  width: 100%;
}

.aura-benefits-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
}

@media (min-width: 1024px) {
  .aura-benefits-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background-color: rgba(var(--color-border, 255, 255, 255), 0.35);
  }
}

/* Category Cards Hover & Snap */
.aura-category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 2rem 1.5rem 1.5rem;
  border-radius: 4px;
  background-color: rgb(var(--color-background-secondary, 240, 236, 225));
  border: 1px solid rgba(var(--color-border, 227, 221, 209), 0.5);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
}

@media (hover: hover) {
  .aura-category-card:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--color-button, 139, 58, 47), 0.5);
    box-shadow: 0 12px 28px -6px rgba(41, 45, 40, 0.08);
  }
  .aura-category-card:hover .aura-category-arrow {
    transform: translateX(4px);
  }
}

.aura-category-arrow {
  transition: transform 0.3s ease;
}

/* Bento Row 1 & 2 Cards */
.aura-bento-hero {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.aura-circular-spotlight {
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1/1;
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.08);
}

/* FAQ 2-Column Desktop Grid */
.aura-faq-accordion-item {
  border-bottom: 1px solid rgba(var(--color-border), 0.45);
}

.aura-faq-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
  text-align: left;
  font-family: var(--font-heading-family, 'Playfair Display', serif);
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  border: none;
  color: rgb(var(--color-heading, var(--color-foreground)));
  transition: color 0.25s ease;
}

.aura-faq-accordion-header:hover {
  color: rgb(var(--color-button, var(--color-primary-accent)));
}

.aura-faq-accordion-body {
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Product Buy Box Stock Pills */
.aura-stock-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.725rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.aura-stock-pill--in-stock {
  background-color: rgba(49, 91, 69, 0.12);
  color: #244638;
}

.aura-stock-pill--low-stock {
  background-color: rgba(184, 154, 98, 0.16);
  color: #8C6218;
}

.aura-stock-pill--sold-out {
  background-color: rgba(139, 58, 47, 0.12);
  color: #8B3A2F;
}

/* Option Pill Steppers */
.aura-pill-option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 1.25rem;
  border-radius: 4px;
  border: 1px solid rgba(var(--color-border), 0.7);
  font-size: 0.875rem;
  font-weight: 500;
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-foreground));
  cursor: pointer;
  transition: all 0.25s ease;
}

.aura-pill-option.is-selected {
  background-color: rgb(var(--color-button, 49, 91, 69));
  color: rgb(var(--color-button-text, 248, 245, 239));
  border-color: rgb(var(--color-button, 49, 91, 69));
}
`;

if (!css.includes('AURA BOTANICA PHASE 12')) {
  fs.writeFileSync('assets/aura-base.css', css + phase12CSS);
  console.log('Appended Phase 12 luxury CSS to assets/aura-base.css');
} else {
  console.log('Phase 12 CSS already present');
}

