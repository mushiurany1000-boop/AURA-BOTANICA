/**
 * AURA BOTANICA — CREATIVE FRONT-END & GSAP MOTION ENGINE
 * Version: 2.0.0
 * Architecture: Declarative, Zero-Leak, WCAG-Compliant Motion System
 */

(function (window, document) {
  "use strict";

  // Safe fallback: if GSAP is unavailable, fail silently without hiding content
  if (typeof window.gsap === "undefined") {
    console.warn("[Aura Motion] GSAP library not detected. Running in static mode.");
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitText = window.SplitText;

  // Register available GSAP plugins
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (SplitText) gsap.registerPlugin(SplitText);

  // Settings & Context Detection
  const settings = window.AuraSettings || {};
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const isDesignMode = Boolean(window.Shopify && window.Shopify.designMode);

  // Intensity multiplier & motion profile
  const intensity = settings.animation_intensity || "subtle";
  const masterEnabled = settings.animation_enable !== false && intensity !== "off";

  const durationMultiplier = intensity === "full" ? 1.2 : 0.85;
  const defaultEase = "power2.out";

  // Track root animation registries for leak-free section lifecycle
  const instanceRegistry = new WeakMap();

  const Aura = {
    version: "2.0.0",
    masterEnabled: masterEnabled,
    intensity: intensity,
    isReducedMotion: isReducedMotion,

    init: function (root) {
      root = root || document;

      // If animations disabled globally or reduced motion preferred without fade
      if (!masterEnabled) {
        document.documentElement.classList.remove("js-anim");
        return;
      }

      // Add js-anim class to reveal CSS rules only when engine is active
      document.documentElement.classList.add("js-anim");

      // Track active triggers and tweens for clean teardown
      const activeRecords = {
        triggers: [],
        tweens: [],
        splits: [],
      };
      instanceRegistry.set(root, activeRecords);

      // Initialize Declarative Animations
      this.initDeclarative(root, activeRecords);

      // Initialize Optional Features
      if (root === document) {
        if (settings.animation_custom_cursor && !isTouch && !isDesignMode) {
          this.initCustomCursor();
        }
        if (settings.animation_magnetic_buttons && !isTouch) {
          this.initMagneticButtons(root, activeRecords);
        }
        if (settings.animation_smooth_scroll && !isDesignMode && ScrollTrigger) {
          this.initSmoothScroll();
        }
      }

      // Refresh ScrollTrigger when images load
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    },

    initDeclarative: function (root, records) {
      const elements = root.querySelectorAll("[data-anim]");
      if (!elements.length) return;

      elements.forEach(function (el) {
        // Skip elements already initialized in this section
        if (el.dataset.animInitialized === "true") return;
        el.dataset.animInitialized = "true";

        const type = el.dataset.anim;
        const delay = parseFloat(el.dataset.animDelay) || 0;
        const duration = (parseFloat(el.dataset.animDuration) || 0.8) * durationMultiplier;
        const stagger = parseFloat(el.dataset.animStagger) || 0.08;

        // Reduced motion check: fade-in only with no spatial movement
        if (isReducedMotion) {
          const targets = type === "stagger-children"
            ? (el.querySelectorAll("[data-anim-child]").length ? el.querySelectorAll("[data-anim-child]") : el.children)
            : el;
          const tween = gsap.fromTo(
            targets,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              delay: delay,
              ease: "none",
              scrollTrigger: ScrollTrigger
                ? {
                    trigger: el,
                    start: "top 92%",
                    once: true,
                  }
                : null,
            }
          );
          records.tweens.push(tween);
          return;
        }

        // Standard motion execution by type
        switch (type) {
          case "fade-up": {
            const yOffset = intensity === "full" ? 48 : 28;
            const tween = gsap.fromTo(
              el,
              { y: yOffset, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: defaultEase,
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 88%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "fade-in": {
            const tween = gsap.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power1.out",
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 90%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "slide-left": {
            const xOffset = intensity === "full" ? -60 : -35;
            const tween = gsap.fromTo(
              el,
              { x: xOffset, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: defaultEase,
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 88%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "slide-right": {
            const xOffset = intensity === "full" ? 60 : 35;
            const tween = gsap.fromTo(
              el,
              { x: xOffset, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: defaultEase,
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 88%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "scale-in": {
            const tween = gsap.fromTo(
              el,
              { scale: 0.94, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 88%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "clip-reveal": {
            const tween = gsap.fromTo(
              el,
              { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.6 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: duration * 1.15,
                delay: delay,
                ease: "power3.inOut",
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 85%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "mask-lines": {
            if (SplitText && settings.animation_text_mask_reveal !== false) {
              const split = new SplitText(el, { type: "lines", linesClass: "aura-line-child" });
              records.splits.push(split);

              // Wrap each line in an overflow-hidden wrapper
              split.lines.forEach(function (line) {
                const wrapper = document.createElement("div");
                wrapper.className = "aura-line-mask";
                wrapper.style.overflow = "hidden";
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
              });

              const tween = gsap.fromTo(
                split.lines,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: duration,
                  stagger: stagger,
                  delay: delay,
                  ease: "power3.out",
                  scrollTrigger: ScrollTrigger
                    ? {
                        trigger: el,
                        start: "top 88%",
                        once: true,
                      }
                    : null,
                }
              );
              records.tweens.push(tween);
            } else {
              // Fallback to simple fade-up if SplitText unavailable
              const tween = gsap.fromTo(
                el,
                { y: 24, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: duration,
                  delay: delay,
                  ease: defaultEase,
                }
              );
              records.tweens.push(tween);
            }
            break;
          }

          case "stagger-children": {
            let targets = el.querySelectorAll("[data-anim-child]");
            if (!targets.length) targets = el.children;

            const yDist = intensity === "full" ? 36 : 22;
            const tween = gsap.fromTo(
              targets,
              { y: yDist, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                stagger: stagger,
                ease: defaultEase,
                scrollTrigger: ScrollTrigger
                  ? {
                      trigger: el,
                      start: "top 86%",
                      once: true,
                    }
                  : null,
              }
            );
            records.tweens.push(tween);
            break;
          }

          case "counter": {
            const targetVal = parseFloat(el.textContent.replace(/[^0-9.-]+/g, "")) || 0;
            const prefix = el.dataset.counterPrefix || "";
            const suffix = el.dataset.counterSuffix || "";
            const obj = { val: 0 };

            const tween = gsap.to(obj, {
              val: targetVal,
              duration: duration * 1.5,
              delay: delay,
              ease: "power2.out",
              onUpdate: function () {
                el.textContent = prefix + Math.floor(obj.val) + suffix;
              },
              scrollTrigger: ScrollTrigger
                ? {
                    trigger: el,
                    start: "top 90%",
                    once: true,
                  }
                : null,
            });
            records.tweens.push(tween);
            break;
          }

          case "parallax": {
            if (!isTouch && ScrollTrigger) {
              const speed = parseFloat(el.dataset.animSpeed) || 0.15;
              const yMove = -100 * speed;
              const trigger = ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: function (self) {
                  gsap.set(el, { y: self.progress * yMove });
                },
              });
              records.triggers.push(trigger);
            }
            break;
          }

          case "pin": {
            if (isDesktop && ScrollTrigger) {
              const pinTrigger = ScrollTrigger.create({
                trigger: el,
                start: "top top",
                end: el.dataset.pinEnd || "+=500",
                pin: true,
                pinSpacing: true,
              });
              records.triggers.push(pinTrigger);
            }
            break;
          }

          case "marquee": {
            const inner = el.querySelector("[data-marquee-track]") || el.firstElementChild;
            if (inner) {
              const speed = parseFloat(el.dataset.marqueeSpeed) || 30;
              const tween = gsap.to(inner, {
                xPercent: -50,
                duration: speed,
                repeat: -1,
                ease: "none",
              });
              records.tweens.push(tween);
            }
            break;
          }
        }
      });
    },

    initMagneticButtons: function (root, records) {
      const magneticTargets = root.querySelectorAll("[data-magnetic], .m-button--primary");
      magneticTargets.forEach(function (btn) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" });

        const handleMove = function (e) {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.28;
          const deltaY = (e.clientY - centerY) * 0.28;
          xTo(deltaX);
          yTo(deltaY);
        };

        const handleLeave = function () {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", handleLeave);

        records.tweens.push({
          kill: function () {
            btn.removeEventListener("mousemove", handleMove);
            btn.removeEventListener("mouseleave", handleLeave);
          },
        });
      });
    },

    initCustomCursor: function () {
      let cursor = document.querySelector(".aura-custom-cursor");
      if (!cursor) {
        cursor = document.createElement("div");
        cursor.className = "aura-custom-cursor";
        cursor.innerHTML = '<span class="aura-cursor-dot"></span><span class="aura-cursor-ring"></span>';
        document.body.appendChild(cursor);
      }

      const ring = cursor.querySelector(".aura-cursor-ring");
      const dot = cursor.querySelector(".aura-cursor-dot");

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
      const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
      const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

      window.addEventListener("mousemove", function (e) {
        xDot(e.clientX);
        yDot(e.clientY);
        xRing(e.clientX);
        yRing(e.clientY);
      });

      // Hover expansion on interactive elements
      const interactiveSelector = "a, button, input, select, textarea, [data-magnetic], .m-product-card";
      document.addEventListener("mouseover", function (e) {
        if (e.target.closest(interactiveSelector)) {
          cursor.classList.add("is-hovering");
        }
      });
      document.addEventListener("mouseout", function (e) {
        if (e.target.closest(interactiveSelector)) {
          cursor.classList.remove("is-hovering");
        }
      });
    },

    initSmoothScroll: function () {
      // Gentle native scroll restoration safeguard
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    },

    kill: function (root) {
      root = root || document;
      const records = instanceRegistry.get(root);
      if (records) {
        if (records.triggers && records.triggers.length) {
          records.triggers.forEach(function (trig) {
            if (trig && typeof trig.kill === "function") trig.kill();
          });
        }
        if (records.tweens && records.tweens.length) {
          records.tweens.forEach(function (tw) {
            if (tw && typeof tw.kill === "function") tw.kill();
          });
        }
        if (records.splits && records.splits.length) {
          records.splits.forEach(function (sp) {
            if (sp && typeof sp.revert === "function") sp.revert();
          });
        }
        instanceRegistry.delete(root);
      }

      // Reset initialized flags so re-init works cleanly
      const elements = root.querySelectorAll("[data-anim-initialized]");
      elements.forEach(function (el) {
        delete el.dataset.animInitialized;
      });
    },
  };

  // Expose global namespace
  window.AuraMotion = Aura;

  // DOMContentLoaded initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Aura.init(document);
    });
  } else {
    Aura.init(document);
  }

  // Shopify Theme Editor Lifecycle Listeners (Zero Leaks, Clean Re-init)
  document.addEventListener("shopify:section:load", function (e) {
    if (e.target) Aura.init(e.target);
  });

  document.addEventListener("shopify:section:unload", function (e) {
    if (e.target) Aura.kill(e.target);
  });

  document.addEventListener("shopify:section:reorder", function () {
    if (ScrollTrigger) ScrollTrigger.refresh();
  });

  // Window resize & font load refresh
  window.addEventListener("load", function () {
    if (ScrollTrigger) ScrollTrigger.refresh();
  });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (ScrollTrigger) ScrollTrigger.refresh();
    }, 200);
  });
})(window, document);
