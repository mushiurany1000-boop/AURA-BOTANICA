const fs = require('fs');

const cssToAppend = `
/* ==========================================================================
   PHASE 12 STEP B & C — LUXURY HOMEPAGE & PRODUCT PAGE REPLICA ENGINE
   ========================================================================== */

/* Bento Row 2 Classes */
.aura-bento-card--routine {
  background-color: #F8EFEA;
  border: 1px solid #E9D5CC;
}
.aura-bento-card--journal {
  background-color: #F7EEEA;
  border: 1px solid #E9D5CC;
}

/* Subscribe & Save Banner Classes */
.aura-subscribe-card {
  background-color: #C6A18F;
}
.aura-subscribe-btn {
  background-color: #843C2D;
  color: #FFFFFF;
  border: none;
  border-radius: 0px;
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 12px 28px;
  transition: all 0.3s ease;
}
.aura-subscribe-btn:hover {
  background-color: #6A2A1F;
}

/* FAQ 2-Column Accordion */
.aura-faq-row {
  border: 1px solid #E9D5CC;
  background-color: #FDFBF9;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.aura-faq-row:hover {
  border-color: #843C2D;
}
.aura-faq-accordion-header {
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ==========================================================================
   SINGLE PRODUCT PAGE (REFERENCE 2 REPLICA)
   ========================================================================== */
body.template-product {
  background-color: #FFFFFF;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333333;
}

/* Green Announcement Bar */
.announcement-bar--forest,
.aura-announcement-bar--green {
  background-color: #1E4123 !important;
  color: #FFFFFF !important;
  font-size: 13px;
  padding: 8px 0;
}
.announcement-bar--forest a,
.aura-announcement-bar--green a {
  color: #DEBC8C !important;
  text-decoration: underline;
  font-weight: 600;
}

/* Breadcrumb Hero Band */
.aura-product-breadcrumb-hero {
  background-color: #F5F5F5;
  padding: 32px 0;
  text-align: center;
  border-bottom: 1px solid #EEEEEE;
}
.aura-product-breadcrumb-hero h1 {
  font-family: 'Poppins', sans-serif !important;
  font-size: 32px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 8px 0;
}
.aura-product-breadcrumb-hero .breadcrumbs {
  font-size: 13px;
  color: #777777;
}
.aura-product-breadcrumb-hero .breadcrumbs a {
  color: #555555;
  text-decoration: none;
}
.aura-product-breadcrumb-hero .breadcrumbs span.current {
  color: #1A1A1A;
  font-weight: 500;
}

/* Product Main Gallery */
.aura-product-gallery__main {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background-color: #F8F9FA;
  aspect-ratio: 1 / 1;
}
.aura-gallery-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #234527;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.aura-gallery-nav-btn:hover {
  background-color: #163219;
  transform: translateY(-50%) scale(1.05);
}
.aura-gallery-nav-btn--prev { left: 16px; }
.aura-gallery-nav-btn--next { right: 16px; }

/* Product Thumbnails */
.aura-product-thumbnail {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E5E5E5;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.aura-product-thumbnail.is-active,
.aura-product-thumbnail--active {
  border: 2px solid #234527 !important;
}

/* Product Buy Box Components */
.aura-product-category {
  font-size: 13px;
  color: #777777;
  font-weight: 500;
  margin-bottom: 6px;
  text-transform: capitalize;
}
.aura-product-title-bold {
  font-family: 'Poppins', sans-serif !important;
  font-size: 32px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.2;
  margin: 0 0 10px 0;
}
.aura-stock-pill--in-stock {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  background-color: #E7F6EA;
  color: #234527;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
}
.aura-rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0 16px 0;
  font-size: 13px;
  color: #555555;
}
.aura-stars-gold {
  color: #E2C25D;
  display: inline-flex;
  gap: 2px;
}
.aura-price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}
.aura-price-sale {
  font-size: 26px;
  font-weight: 700;
  color: #BA934E;
}
.aura-price-compare {
  font-size: 16px;
  color: #999999;
  text-decoration: line-through;
}
.aura-product-description-short {
  font-size: 14px;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 24px;
}

/* Volume / Size Options */
.aura-volume-label {
  font-size: 13px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 8px;
}
.aura-volume-pills {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.aura-volume-pill {
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #E5E5E5;
  background-color: #FFFFFF;
  color: #333333;
  transition: all 0.2s ease;
}
.aura-volume-pill.is-active,
.aura-volume-pill--active {
  background-color: #234527 !important;
  color: #FFFFFF !important;
  border-color: #234527 !important;
  font-weight: 600;
}

/* Actions Row: Stepper + ATC + Buy Now + Wishlist */
.aura-actions-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.aura-qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  height: 48px;
  padding: 0 4px;
}
.aura-qty-stepper button {
  width: 36px;
  height: 40px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555555;
}
.aura-qty-stepper input {
  width: 40px;
  text-align: center;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #1A1A1A;
  -moz-appearance: textfield;
}
.aura-btn-atc-pill {
  flex: 1;
  min-width: 140px;
  height: 48px;
  background-color: #234527 !important;
  color: #FFFFFF !important;
  border: none;
  border-radius: 9999px !important;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.aura-btn-atc-pill:hover {
  background-color: #163219 !important;
}
.aura-btn-buynow-pill {
  flex: 1;
  min-width: 140px;
  height: 48px;
  background-color: #BA934E !important;
  color: #FFFFFF !important;
  border: none;
  border-radius: 9999px !important;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.aura-btn-buynow-pill:hover {
  background-color: #A37F3E !important;
}
.aura-btn-wishlist-round {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #E5E5E5;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555555;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.aura-btn-wishlist-round:hover {
  border-color: #234527;
  color: #234527;
}

/* Meta list: SKU, Tags, Share */
.aura-product-meta-list {
  font-size: 13px;
  color: #555555;
  line-height: 2;
  border-top: 1px solid #EEEEEE;
  padding-top: 16px;
}
.aura-product-meta-list strong {
  color: #1A1A1A;
}
.aura-share-icons {
  display: inline-flex;
  gap: 8px;
  vertical-align: middle;
  margin-left: 6px;
}
.aura-share-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #F0F0F0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #333333;
  font-size: 11px;
  text-decoration: none;
}

/* Product Tabs with Green Underline */
.aura-product-tabs__nav {
  display: flex;
  justify-content: center;
  gap: 48px;
  border-bottom: 1px solid #EEEEEE;
  margin-top: 48px;
  margin-bottom: 36px;
}
.aura-product-tab-btn {
  background: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #777777;
  padding: 12px 4px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}
.aura-product-tab-btn:hover {
  color: #234527;
}
.aura-product-tab-btn.is-active,
.aura-product-tab-btn--active {
  color: #234527;
  font-weight: 600;
}
.aura-product-tab-btn.is-active::after,
.aura-product-tab-btn--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #234527;
  border-radius: 2px 2px 0 0;
}

/* Product Reviews Breakdown */
.aura-reviews-summary-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 48px;
  padding-bottom: 36px;
  border-bottom: 1px solid #EEEEEE;
}
@media (max-width: 768px) {
  .aura-reviews-summary-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.aura-score-big {
  font-size: 48px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1;
}
.aura-rating-bar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #555555;
  margin-bottom: 6px;
}
.aura-rating-bar-track {
  flex: 1;
  height: 6px;
  background-color: #F0F0F0;
  border-radius: 3px;
  overflow: hidden;
}
.aura-rating-bar-fill {
  height: 100%;
  background-color: #E2C25D;
  border-radius: 3px;
}

/* Review Item */
.aura-review-card {
  padding: 24px 0;
  border-bottom: 1px solid #EEEEEE;
}
.aura-review-card:last-child {
  border-bottom: none;
}
.aura-review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.aura-reviewer-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: #E5E5E5;
}
.aura-verified-badge {
  color: #2E7D32;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
}
.aura-review-photos {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.aura-review-photo-thumb {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #E5E5E5;
}
`;

let currentCss = fs.readFileSync('assets/aura-base.css', 'utf8');
if (!currentCss.includes('PHASE 12 STEP B & C')) {
  fs.writeFileSync('assets/aura-base.css', currentCss + '\n' + cssToAppend);
  console.log('Appended Step B & C styles to assets/aura-base.css');
} else {
  console.log('Already contains Step B & C styles');
}
