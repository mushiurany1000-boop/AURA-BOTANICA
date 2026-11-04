/**
 * Aura Botanica — Hero & Video Hero Custom Element (m-hero)
 */
if (!customElements.get('m-hero')) {
  class MHero extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.initVideo();
      this.initParallax();
    }

    initVideo() {
      const video = this.querySelector('video');
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented, wait for interaction
            const onInteract = () => {
              video.play().catch(() => {});
              window.removeEventListener('click', onInteract);
              window.removeEventListener('touchstart', onInteract);
            };
            window.addEventListener('click', onInteract, { once: true, passive: true });
            window.addEventListener('touchstart', onInteract, { once: true, passive: true });
          });
        }
      }
    }

    initParallax() {
      if (this.dataset.parallax === 'true') {
        const image = this.querySelector('.m-parallax__image img');
        if (image && window.simpleParallax) {
          new window.simpleParallax(image, {
            scale: 1.2,
            orientation: 'up',
            overflow: true
          });
        }
      }
    }
  }

  customElements.define('m-hero', MHero);
}
