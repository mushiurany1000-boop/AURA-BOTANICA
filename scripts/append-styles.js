const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'shopify-theme', 'assets', 'theme.css'),
  path.join(__dirname, '..', 'assets', 'theme.css')
];

const newStyles = `
/* ==========================================================================
   AURA BOTANICA — QUICK VIEW, WISHLIST, COMPARE & OS 2.0 ADVANCED MODULES
   ========================================================================== */

/* Announcement Bar Section */
.announcement-bar-section {
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  padding: 8px 16px;
  position: relative;
  z-index: 101;
  transition: opacity 0.3s ease;
}
.announcement-badge {
  display: inline-block;
  padding: 2px 7px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  border-radius: 9999px;
  color: #FFFFFF;
  margin-right: 8px;
  vertical-align: middle;
}

/* Product Card Utility Buttons & Overlays */
.product-card__utility-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 4;
}
.product-card__utility-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(252, 251, 247, 0.92);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(31, 45, 36, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #1F2D24;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}
.product-card__utility-btn:hover {
  background: #1F2D24;
  color: #FCFBF7;
  border-color: #1F2D24;
  transform: scale(1.08);
}
.product-card__utility-btn.is-saved svg {
  fill: #B37446 !important;
  stroke: #B37446 !important;
}
.product-card__quick-actions {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 3;
}
.product-card:hover .product-card__quick-actions {
  opacity: 1;
  transform: translateY(0);
}
.button--quick-view {
  flex: 1;
  background: rgba(252, 251, 247, 0.95);
  color: #1F2D24;
  border: 1px solid rgba(31, 45, 36, 0.15);
  padding: 8px 12px;
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.button--quick-view:hover {
  background: #1F2D24;
  color: #FCFBF7;
  border-color: #1F2D24;
}

/* Quick View Modal Dialog */
.quick-view-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.quick-view-modal.is-open {
  visibility: visible;
  opacity: 1;
}
.quick-view-modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 26, 21, 0.65);
  backdrop-filter: blur(4px);
}
.quick-view-modal__dialog {
  position: relative;
  background: #FCFBF7;
  border-radius: 12px;
  border: 1px solid rgba(31, 45, 36, 0.12);
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  z-index: 2;
  transform: scale(0.96);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.quick-view-modal.is-open .quick-view-modal__dialog {
  transform: scale(1);
}
.quick-view-modal__close {
  position: absolute;
  top: 14px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.8rem;
  line-height: 1;
  color: #1F2D24;
  cursor: pointer;
  z-index: 10;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.quick-view-modal__close:hover {
  opacity: 1;
}
.quick-view-modal__content {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 32px;
  padding: 32px;
}
@media (max-width: 768px) {
  .quick-view-modal__content {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 24px;
  }
}
.quick-view-media-wrap {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #F5F2EB;
}
.quick-view-image {
  width: 100%;
  height: 100%;
  max-height: 440px;
  object-fit: cover;
  display: block;
}
.quick-view__category {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #B37446;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}
.quick-view__title {
  font-family: var(--font-heading, 'Cormorant Garamond', serif);
  font-size: 1.85rem;
  line-height: 1.2;
  margin: 0 0 10px;
  color: #1F2D24;
}
.quick-view__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #5C6E64;
  margin-bottom: 14px;
}
.quick-view__price-wrap {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 16px;
}
.quick-view__price {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1F2D24;
}
.quick-view__description {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #5C6E64;
  margin-bottom: 20px;
}
.quick-view__variants-wrapper {
  margin-bottom: 20px;
}
.quick-view__option-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
  color: #1F2D24;
}
.quick-view__variants-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.quick-view__actions {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}
.quick-view__actions .quantity-picker {
  display: inline-flex;
  border: 1px solid rgba(31, 45, 36, 0.16);
  border-radius: 9999px;
  background: #FFFFFF;
  padding: 4px 8px;
}
.quick-view__actions .qty-input {
  width: 40px;
  border: none;
  text-align: center;
  font-weight: 600;
  background: none;
}
.quick-view__actions .qty-btn {
  background: none;
  border: none;
  padding: 4px 10px;
  cursor: pointer;
}
.quick-view__footer-links {
  margin-bottom: 16px;
}
.quick-view__view-details-link {
  font-size: 0.82rem;
  color: #B37446;
  text-decoration: underline;
  font-weight: 600;
}
.quick-view__guarantee {
  display: flex;
  gap: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(31, 45, 36, 0.08);
  font-size: 0.75rem;
  color: #5C6E64;
}

/* Wishlist Drawer */
.wishlist-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background: #FCFBF7;
  border-left: 1px solid rgba(31, 45, 36, 0.12);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
}
.wishlist-drawer.is-open {
  transform: translateX(0);
}
.wishlist-drawer__header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(31, 45, 36, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wishlist-drawer__title {
  font-family: var(--font-heading, 'Cormorant Garamond', serif);
  font-size: 1.35rem;
  margin: 0;
  color: #1F2D24;
}
.wishlist-drawer__count-badge {
  background: #1F2D24;
  color: #FCFBF7;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  margin-left: 8px;
}
.wishlist-drawer__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1F2D24;
  opacity: 0.6;
}
.wishlist-drawer__close:hover {
  opacity: 1;
}
.wishlist-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}
.wishlist-drawer__empty {
  text-align: center;
  padding: 60px 20px;
}
.wishlist-drawer__empty .empty-icon {
  font-size: 2.5rem;
  color: #B37446;
  margin-bottom: 12px;
}
.wishlist-item-row {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(31, 45, 36, 0.08);
}
.wishlist-thumb {
  width: 60px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(31, 45, 36, 0.08);
}
.wishlist-info {
  flex: 1;
}
.wishlist-title {
  font-family: var(--font-heading, 'Cormorant Garamond', serif);
  font-size: 1.05rem;
  margin: 0 0 4px;
}
.wishlist-title a {
  text-decoration: none;
  color: #1F2D24;
}
.wishlist-price {
  font-size: 0.85rem;
  font-weight: 600;
  color: #B37446;
  margin-bottom: 8px;
}
.wishlist-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
.wishlist-remove {
  background: none;
  border: none;
  color: #A34848;
  font-size: 0.74rem;
  cursor: pointer;
  text-decoration: underline;
}
.wishlist-drawer__footer {
  padding: 20px 24px;
  border-top: 1px solid rgba(31, 45, 36, 0.1);
  background: #F5F2EB;
}

/* Product Comparison Floating Bar & Modal */
.compare-floating-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1F2D24;
  color: #FCFBF7;
  padding: 12px 20px;
  z-index: 9990;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);
}
.compare-floating-bar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.compare-title {
  font-weight: 600;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  display: block;
}
.compare-hint {
  font-size: 0.72rem;
  color: #A3B5AC;
  display: block;
}
.compare-floating-bar__thumbs {
  display: flex;
  gap: 10px;
}
.compare-thumb-item {
  position: relative;
  width: 44px;
  height: 52px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.compare-thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.remove-compare-thumb {
  position: absolute;
  top: 1px;
  right: 1px;
  background: rgba(0,0,0,0.7);
  color: #FFF;
  border: none;
  width: 16px;
  height: 16px;
  font-size: 11px;
  line-height: 1;
  border-radius: 50%;
  cursor: pointer;
}
.compare-floating-bar__actions {
  display: flex;
  gap: 8px;
}

/* Compare Matrix Modal */
.compare-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10002;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}
.compare-modal.is-open {
  visibility: visible;
  opacity: 1;
}
.compare-modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 26, 21, 0.7);
  backdrop-filter: blur(4px);
}
.compare-modal__dialog {
  position: relative;
  background: #FCFBF7;
  border-radius: 12px;
  width: 100%;
  max-width: 960px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  z-index: 2;
  box-shadow: 0 24px 60px rgba(0,0,0,0.3);
}
.compare-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(31, 45, 36, 0.1);
  padding-bottom: 16px;
}
.compare-modal__title {
  font-family: var(--font-heading, 'Cormorant Garamond', serif);
  font-size: 1.75rem;
  margin: 0;
  color: #1F2D24;
}
.compare-modal__close {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #1F2D24;
  cursor: pointer;
  opacity: 0.6;
}
.compare-modal__close:hover {
  opacity: 1;
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
}
.compare-table th, .compare-table td {
  padding: 16px 20px;
  border: 1px solid rgba(31, 45, 36, 0.1);
  font-size: 0.88rem;
}
.compare-table th {
  background: #F5F2EB;
}

/* Product Page Blocks */
.product-inventory-block {
  margin: 12px 0 18px;
}
.inventory-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #2E5A3C;
}
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2E7D32;
  box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.7);
  animation: pulseGreen 1.8s infinite;
}
@keyframes pulseGreen {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(46, 125, 50, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 125, 50, 0); }
}
.inventory-progress-track {
  height: 4px;
  background: rgba(31, 45, 36, 0.08);
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
  max-width: 240px;
}
.inventory-progress-bar {
  height: 100%;
  background: #B37446;
  border-radius: 2px;
}
.product-sku-block {
  font-size: 0.78rem;
  color: #7A8C82;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}
.product-popup-btn {
  background: none;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #B37446;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  padding: 4px 0;
  margin: 8px 0;
}
.product-share-block {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 14px 0;
  font-size: 0.78rem;
  color: #5C6E64;
}
.share-links {
  display: flex;
  gap: 10px;
}
.share-link {
  color: #1F2D24;
  text-decoration: underline;
}
`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let css = fs.readFileSync(file, 'utf8');
  if (!css.includes('AURA BOTANICA — QUICK VIEW, WISHLIST, COMPARE')) {
    css += '\n' + newStyles;
    fs.writeFileSync(file, css, 'utf8');
    console.log('Appended styles to:', file);
  }
});

