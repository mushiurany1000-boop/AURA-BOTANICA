/**
 * AURA BOTANICA — BACK IN STOCK RESTOCK NOTIFICATION MODAL
 * Manages sold-out waitlist alerts with accessible focus trapping,
 * variant synchronization, and GSAP scale reveals.
 */

(function () {
  'use strict';

  function initBackInStock() {
    const modal = document.querySelector('[data-back-in-stock-modal]');
    if (!modal) return;

    const triggers = document.querySelectorAll('[data-back-in-stock-trigger]');
    const closeButtons = modal.querySelectorAll('[data-back-in-stock-close]');
    let lastActiveElement = null;

    function openModal() {
      lastActiveElement = document.activeElement;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('m-modal-open');

      // Focus email input or close button
      const emailInput = modal.querySelector('#BackInStockEmail');
      setTimeout(() => {
        if (emailInput) emailInput.focus();
        else modal.focus();
      }, 50);

      // GSAP smooth reveal if active
      if (window.gsap && window.AuraMotion) {
        const dialog = modal.querySelector('.m-back-in-stock-modal__dialog');
        if (dialog) {
          gsap.fromTo(dialog, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
        }
      }
    }

    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.body.classList.remove('m-modal-open');
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
      });
    });

    // Dismiss on Escape key
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });

    // Focus trap inside modal
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      const focusables = modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    });

    // Listen to variant change events from PDP variant picker
    document.addEventListener('variant:change', function (e) {
      const variant = e.detail && e.detail.variant;
      if (!variant) return;

      const wrapper = document.querySelector('[data-back-in-stock-wrapper]');
      const variantTitleEl = modal.querySelector('[data-bis-variant-title]');
      const tagsInput = modal.querySelector('[data-bis-tags-input]');
      const bodyInput = modal.querySelector('[data-bis-body-input]');

      if (wrapper) {
        if (!variant.available) {
          wrapper.classList.remove('m:hidden');
        } else {
          wrapper.classList.add('m:hidden');
        }
      }

      if (variantTitleEl) {
        variantTitleEl.textContent = variant.title !== 'Default Title' ? ` — ${variant.title}` : '';
      }

      if (tagsInput) {
        const prodTitle = modal.querySelector('[data-bis-product-title]')?.textContent || '';
        tagsInput.value = `back-in-stock, ${prodTitle}, ${variant.id}`;
      }

      if (bodyInput) {
        const prodTitle = modal.querySelector('[data-bis-product-title]')?.textContent || '';
        bodyInput.value = `Customer requested restock notification for: ${prodTitle} (Variant ID: ${variant.id})`;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackInStock);
  } else {
    initBackInStock();
  }

  // Shopify Theme Editor lifecycle re-init
  document.addEventListener('shopify:section:load', initBackInStock);
})();
