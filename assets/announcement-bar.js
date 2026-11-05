/**
 * AURA BOTANICA — LUXURY BOTANICAL ANNOUNCEMENT BAR COMPONENT
 * Phase 2: Global Layout & Navigation
 */
if (!customElements.get("m-announcement-bar")) {
  class MAnnouncementBar extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const enableSlider = this.dataset.enableSlider === "true";
      if (enableSlider) {
        this.initSlider();
      }
      this.initCloseHandler();
    }

    initSlider() {
      const autoplay = this.dataset.enableAutoplay === "true";
      const autoplaySpeed = this.dataset.autoplaySpeed || "3";
      const slideContainer = this.querySelector(".swiper-container");
      if (slideContainer && window.MinimogLibs && window.MinimogLibs.Swiper) {
        this.slider = new MinimogLibs.Swiper(slideContainer, {
          slidesPerView: 1,
          slidesPerGroup: 1,
          autoplay: autoplay
            ? {
                delay: parseInt(autoplaySpeed, 10) * 1000,
                disableOnInteraction: false,
              }
            : false,
          loop: true,
          navigation: {
            nextEl: this.querySelector(".swiper-button-next"),
            prevEl: this.querySelector(".swiper-button-prev"),
          },
        });
      }
    }

    initCloseHandler() {
      const section = this.closest(".m-announcement-bar");
      if (!section) return;
      const closeBtn = section.querySelector("[data-announcement-close]");
      if (!closeBtn) return;

      const handleClose = () => {
        section.classList.add("is-closing");
        setTimeout(() => {
          section.style.display = "none";
          document.documentElement.style.setProperty("--m-announcement-height", "0px");
        }, 350);
      };

      closeBtn.addEventListener("click", handleClose);
      section.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      });
    }
  }

  customElements.define("m-announcement-bar", MAnnouncementBar);
}
