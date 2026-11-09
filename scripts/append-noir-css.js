const fs = require('fs');

const cssNoir = `
/* ==========================================================================
   NOIR VELVET & ROSE GOLD (LUXURY ARCH & EDITORIAL SUITE)
   ========================================================================== */

:root {
  --color-noir-bg: #1A070B;
  --color-noir-surface: #24090F;
  --color-noir-card: #2D0C14;
  --color-noir-card-hover: #38101A;
  --color-noir-rose-gold: #E2B7A8;
  --color-noir-blush: #F0D5CC;
  --color-noir-velvet-berry: #8B2838;
  --color-noir-berry-hover: #6D1D2B;
  --color-noir-border: rgba(226, 183, 168, 0.2);
  --color-noir-text-ivory: #FFF8F5;
  --color-noir-text-muted: #C5A59E;
}

/* Scoped Noir Section Styles */
.m-color-scheme-noir-velvet,
.aura-noir-theme {
  background-color: var(--color-noir-bg) !important;
  color: var(--color-noir-text-ivory) !important;
}

/* Arch Frame Windows */
.aura-arch-frame {
  border-radius: 180px 180px 0 0;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--color-noir-border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.aura-arch-frame-sm {
  border-radius: 90px 90px 0 0;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--color-noir-border);
}

/* Circular Seal / Stamp */
.aura-circular-seal {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1px dashed var(--color-noir-rose-gold);
  background: rgba(26, 7, 11, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--color-noir-rose-gold);
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.aura-circular-seal:hover {
  transform: rotate(15deg) scale(1.05);
}
.aura-seal-monogram {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.1em;
}
.aura-seal-text {
  font-family: 'Jost', sans-serif;
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-top: 4px;
  opacity: 0.85;
}

/* Noir Buttons */
.aura-btn-pill-rose {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 9999px !important;
  border: 1px solid var(--color-noir-rose-gold) !important;
  background: transparent;
  color: var(--color-noir-text-ivory) !important;
  padding: 12px 28px;
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.aura-btn-pill-rose:hover {
  background: var(--color-noir-rose-gold);
  color: var(--color-noir-bg) !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(226, 183, 168, 0.2);
}

.aura-btn-pill-solid {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 9999px !important;
  background: var(--color-noir-velvet-berry);
  color: #FFFFFF !important;
  border: 1px solid rgba(226, 183, 168, 0.3);
  padding: 14px 34px;
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.aura-btn-pill-solid:hover {
  background: var(--color-noir-berry-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(139, 40, 56, 0.4);
}

/* Hairline Column Dividers */
.aura-hairline-col {
  border-right: 1px solid var(--color-noir-border);
}
.aura-hairline-col:last-child {
  border-right: none;
}
@media (max-width: 768px) {
  .aura-hairline-col {
    border-right: none;
    border-bottom: 1px solid var(--color-noir-border);
  }
}

/* Plus Tracked Eyebrows */
.aura-eyebrow-plus {
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-noir-rose-gold);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Display Serif & Script */
.aura-headline-noir {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 4.8vw, 5rem);
  font-weight: 500;
  line-height: 1.05;
  color: #FFFFFF;
  letter-spacing: -0.01em;
}
.aura-headline-noir em,
.aura-headline-noir .script {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-weight: 400;
  color: var(--color-noir-rose-gold);
}

/* 3 Wide Featured Work Cards */
.aura-card-work {
  background-color: var(--color-noir-card);
  border: 1px solid var(--color-noir-border);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  position: relative;
}
.aura-card-work:hover {
  transform: translateY(-4px);
  border-color: var(--color-noir-rose-gold);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
}
.aura-card-work-plus {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--color-noir-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--color-noir-rose-gold);
  transition: all 0.2s ease;
}
.aura-card-work:hover .aura-card-work-plus {
  background: var(--color-noir-rose-gold);
  color: var(--color-noir-bg);
}

/* Approach 5-Step Columns */
.aura-approach-step {
  padding: 32px 24px;
  border-right: 1px solid var(--color-noir-border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  transition: background-color 0.25s ease;
}
.aura-approach-step:hover {
  background-color: rgba(226, 183, 168, 0.03);
}
.aura-approach-step:last-child {
  border-right: none;
}
@media (max-width: 900px) {
  .aura-approach-step {
    border-right: none;
    border-bottom: 1px solid var(--color-noir-border);
  }
}
`;

let currentCss = fs.readFileSync('assets/aura-base.css', 'utf8');
if (!currentCss.includes('NOIR VELVET & ROSE GOLD')) {
  fs.writeFileSync('assets/aura-base.css', currentCss + '\n' + cssNoir);
  console.log('Appended Noir Velvet & Rose Gold styles to assets/aura-base.css');
} else {
  console.log('Already contains Noir Velvet styles');
}

