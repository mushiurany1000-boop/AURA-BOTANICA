/**
 * scripts/generate-preview-noir.js
 * Generates the authentic Noir Velvet & Rose Champagne Homepage (Reference 3/6)
 * Brand: KAYRA BEAUTY
 * Output: preview/index.html
 */

const fs = require('fs');

const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>KAYRA BEAUTY — Design with Intent | Noir Velvet & Rose Champagne Atelier</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/theme.css?v=2.2.0">
    <link rel="stylesheet" href="/assets/aura-base.css?v=2.2.0">
    <style>
      :root {
        --color-noir-bg: #1A070B;
        --color-noir-strip: #160408;
        --color-noir-card: #24090F;
        --color-noir-blush: #E4B5A8;
        --color-noir-rose-gold: #E2B7A8;
        --color-noir-berry: #8B2838;
        --color-noir-border: rgba(226, 183, 168, 0.2);
        --color-noir-border-light: rgba(226, 183, 168, 0.35);
        --color-noir-text-main: #FFF8F5;
        --color-noir-text-muted: #C5A59E;
        --font-serif: 'Cormorant Garamond', Georgia, serif;
        --font-sans: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background-color: var(--color-noir-bg);
        color: var(--color-noir-text-main);
        font-family: var(--font-sans);
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* Container */
      .noir-container {
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 24px;
      }

      /* 1. Header */
      .noir-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: rgba(26, 7, 11, 0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--color-noir-border);
        transition: all 0.3s ease;
      }
      .noir-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 76px;
      }
      .noir-logo-seal {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: inherit;
      }
      .noir-monogram-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px dashed var(--color-noir-rose-gold);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-serif);
        font-size: 16px;
        font-weight: 600;
        color: var(--color-noir-rose-gold);
        letter-spacing: 1px;
      }
      .noir-brand-name {
        font-family: var(--font-serif);
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #FFFFFF;
      }
      .noir-brand-sub {
        font-size: 9px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--color-noir-text-muted);
        display: block;
      }
      .noir-nav-links {
        display: flex;
        align-items: center;
        gap: 28px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      @media (max-width: 992px) {
        .noir-nav-links { display: none; }
      }
      .noir-nav-links a {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--color-noir-text-muted);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
        position: relative;
        padding: 6px 0;
      }
      .noir-nav-links a:hover,
      .noir-nav-links a.active {
        color: #FFFFFF;
      }
      .noir-nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--color-noir-rose-gold);
      }
      .noir-header-actions {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .btn-pill-noir-outline {
        padding: 9px 22px;
        border-radius: 9999px;
        border: 1px solid var(--color-noir-rose-gold);
        color: var(--color-noir-rose-gold);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .btn-pill-noir-outline:hover {
        background-color: var(--color-noir-rose-gold);
        color: #1A070B;
      }
      .noir-cart-btn {
        position: relative;
        background: transparent;
        border: 1px solid var(--color-noir-border);
        width: 42px;
        height: 42px;
        border-radius: 50%;
        color: var(--color-noir-rose-gold);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .noir-cart-btn:hover {
        border-color: var(--color-noir-rose-gold);
        background-color: rgba(226, 183, 168, 0.1);
      }
      .noir-cart-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background-color: var(--color-noir-berry);
        color: #FFFFFF;
        font-size: 10px;
        font-weight: 700;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--color-noir-bg);
      }

      /* 2. Hero Section */
      .noir-hero {
        padding: 70px 0 90px;
        position: relative;
        overflow: hidden;
      }
      .noir-hero-grid {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 60px;
        align-items: center;
      }
      @media (max-width: 992px) {
        .noir-hero-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }
      .hero-eyebrow {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-noir-text-muted);
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .hero-headline-massive {
        font-family: var(--font-serif);
        font-size: clamp(52px, 7.5vw, 92px);
        font-weight: 400;
        line-height: 0.95;
        letter-spacing: -0.01em;
        color: #FFFFFF;
        margin: 0 0 28px 0;
      }
      .hero-headline-massive .script {
        font-style: italic;
        font-weight: 400;
        color: var(--color-noir-rose-gold);
        display: inline-block;
        padding-right: 6px;
      }
      .hero-headline-massive .accent {
        color: #FFFFFF;
        letter-spacing: 0.04em;
        font-weight: 500;
      }
      .hero-subtext {
        font-size: 15px;
        line-height: 1.7;
        color: var(--color-noir-text-muted);
        max-width: 480px;
        margin-bottom: 36px;
      }
      .hero-cta-group {
        display: flex;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
      }

      /* Arch Portal Hero Window */
      .hero-arch-container {
        position: relative;
        display: flex;
        justify-content: center;
      }
      .hero-arch-window {
        width: 100%;
        max-width: 420px;
        aspect-ratio: 4 / 5;
        border-radius: 210px 210px 0 0;
        border: 1px solid var(--color-noir-border-light);
        background: radial-gradient(circle at 60% 40%, #4A1521 0%, #20060B 70%, #120306 100%);
        position: relative;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      }
      .hero-arch-window svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      /* Floating circular seal */
      .hero-circular-seal {
        position: absolute;
        bottom: 24px;
        right: 10px;
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background-color: rgba(26, 7, 11, 0.92);
        backdrop-filter: blur(8px);
        border: 1px solid var(--color-noir-border-light);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        animation: floatSeal 6s ease-in-out infinite;
      }
      @keyframes floatSeal {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .seal-monogram {
        font-family: var(--font-serif);
        font-size: 24px;
        font-weight: 600;
        color: var(--color-noir-rose-gold);
        line-height: 1;
      }
      .seal-text {
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-noir-text-muted);
        margin-top: 4px;
      }

      /* 3. Credentials 4-Column Strip */
      .noir-strip {
        background-color: var(--color-noir-strip);
        border-top: 1px solid var(--color-noir-border);
        border-bottom: 1px solid var(--color-noir-border);
        padding: 30px 0;
      }
      .strip-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
      }
      @media (max-width: 900px) {
        .strip-grid {
          grid-template-columns: repeat(2, 1fr);
          row-gap: 24px;
        }
      }
      @media (max-width: 540px) {
        .strip-grid {
          grid-template-columns: 1fr;
          row-gap: 20px;
        }
      }
      .strip-col {
        padding: 0 28px;
        border-right: 1px solid var(--color-noir-border);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .strip-col:last-child {
        border-right: none;
      }
      @media (max-width: 900px) {
        .strip-col:nth-child(2) { border-right: none; }
      }
      @media (max-width: 540px) {
        .strip-col { border-right: none; padding: 0; }
      }
      .strip-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-noir-text-muted);
        margin-bottom: 4px;
      }
      .strip-val {
        font-size: 14px;
        color: #FFFFFF;
        font-weight: 500;
      }
      .strip-signature {
        font-family: var(--font-serif);
        font-style: italic;
        font-size: 28px;
        color: var(--color-noir-rose-gold);
        letter-spacing: 0.05em;
        line-height: 1;
      }
      .strip-desc {
        font-size: 12px;
        color: var(--color-noir-text-muted);
        line-height: 1.5;
      }

      /* 4. Featured Formulations (3 Wide Blush Cards) */
      .noir-featured {
        padding: 90px 0;
      }
      .section-header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--color-noir-border);
        margin-bottom: 36px;
      }
      .eyebrow-plus {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-noir-rose-gold);
      }
      .view-all-link {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--color-noir-text-muted);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: color 0.2s ease;
      }
      .view-all-link:hover {
        color: #FFFFFF;
      }
      .featured-cards-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      @media (max-width: 900px) {
        .featured-cards-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }
      .blush-card {
        background-color: var(--color-noir-blush);
        color: #2D0C14;
        border-radius: 4px;
        padding: 20px;
        position: relative;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 380px;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        overflow: hidden;
      }
      .blush-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 36px rgba(0,0,0,0.4);
      }
      .card-media-box {
        width: 100%;
        aspect-ratio: 16 / 11;
        background: #FDF6F3;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-media-box svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .card-title {
        font-family: var(--font-serif);
        font-size: 26px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 0 0 6px 0;
        color: #2D0C14;
      }
      .card-sub {
        font-size: 13px;
        color: #5C2E38;
        line-height: 1.4;
      }
      .card-plus-btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #2D0C14;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #2D0C14;
        transition: background-color 0.2s ease, color 0.2s ease;
      }
      .blush-card:hover .card-plus-btn {
        background-color: #2D0C14;
        color: #FFFFFF;
      }

      /* 5. 5-Step Approach / Ritual */
      .noir-approach {
        padding: 90px 0;
        background-color: #160408;
        border-top: 1px solid var(--color-noir-border);
        border-bottom: 1px solid var(--color-noir-border);
      }
      .approach-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-top: 1px solid var(--color-noir-border);
        border-bottom: 1px solid var(--color-noir-border);
      }
      @media (max-width: 992px) {
        .approach-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 540px) {
        .approach-grid {
          grid-template-columns: 1fr;
        }
      }
      .approach-step {
        padding: 40px 24px;
        border-right: 1px solid var(--color-noir-border);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 280px;
      }
      .approach-step:last-child {
        border-right: none;
      }
      @media (max-width: 992px) {
        .approach-step:nth-child(2),
        .approach-step:nth-child(4) {
          border-right: none;
        }
        .approach-step {
          border-bottom: 1px solid var(--color-noir-border);
        }
      }
      .step-icon-wrap {
        width: 38px;
        height: 38px;
        color: var(--color-noir-rose-gold);
        margin-bottom: 30px;
      }
      .step-num {
        font-family: var(--font-sans);
        font-size: 12px;
        font-weight: 600;
        color: var(--color-noir-rose-gold);
        letter-spacing: 0.2em;
        margin-bottom: 6px;
      }
      .step-title {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #FFFFFF;
        margin: 0 0 12px 0;
      }
      .step-desc {
        font-size: 12px;
        line-height: 1.6;
        color: var(--color-noir-text-muted);
        margin: 0;
      }

      /* 6. Clinical Proof / Case Studies */
      .noir-cases {
        padding: 90px 0;
      }
      .cases-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      @media (max-width: 900px) {
        .cases-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }
      .case-card {
        border-radius: 4px;
        padding: 24px;
        min-height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-decoration: none;
        transition: transform 0.3s ease;
      }
      .case-card:hover {
        transform: translateY(-4px);
      }
      .case-card--terracotta {
        background-color: #C58372;
        color: #2D0C14;
      }
      .case-card--blush {
        background-color: #E4B5A8;
        color: #2D0C14;
      }
      .case-card--rose {
        background-color: #DDB1A5;
        color: #2D0C14;
      }
      .case-num {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.2em;
        opacity: 0.7;
      }
      .case-title {
        font-family: var(--font-serif);
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin: 12px 0 8px 0;
      }
      .case-desc {
        font-size: 13px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .case-action {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      /* 7. What We Do (Pillars) */
      .noir-pillars {
        padding: 90px 0;
        background-color: #140306;
        border-top: 1px solid var(--color-noir-border);
      }
      .pillars-grid {
        display: grid;
        grid-template-columns: 1fr 1.3fr;
        gap: 60px;
        align-items: start;
      }
      @media (max-width: 900px) {
        .pillars-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }
      .pillars-statement {
        font-family: var(--font-serif);
        font-size: clamp(34px, 4.5vw, 52px);
        font-weight: 400;
        line-height: 1.15;
        color: #FFFFFF;
      }
      .pillars-statement .highlight {
        color: var(--color-noir-rose-gold);
      }
      .pillars-cards-box {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
      @media (max-width: 600px) {
        .pillars-cards-box {
          grid-template-columns: 1fr;
        }
      }
      .pillar-item {
        background-color: var(--color-noir-card);
        border: 1px solid var(--color-noir-border);
        border-radius: 4px;
        padding: 24px;
      }
      .pillar-icon {
        width: 32px;
        height: 32px;
        color: var(--color-noir-rose-gold);
        margin-bottom: 16px;
      }
      .pillar-title {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #FFFFFF;
        margin: 0 0 8px 0;
      }
      .pillar-desc {
        font-size: 12px;
        line-height: 1.6;
        color: var(--color-noir-text-muted);
        margin: 0;
      }

      /* 8. Grand CTA Noir Footer */
      .noir-footer-cta {
        padding: 100px 0 60px;
        background: radial-gradient(circle at 50% 30%, #29080F 0%, #120306 80%);
        border-top: 1px solid var(--color-noir-border);
        position: relative;
      }
      .footer-cta-grid {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr 1fr;
        gap: 40px;
        align-items: center;
        margin-bottom: 60px;
      }
      @media (max-width: 992px) {
        .footer-cta-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }
      .footer-headline {
        font-family: var(--font-serif);
        font-size: clamp(38px, 5.5vw, 68px);
        font-weight: 400;
        line-height: 1.05;
        color: #FFFFFF;
        margin: 0 0 32px 0;
      }
      .footer-headline .script {
        font-style: italic;
        color: var(--color-noir-rose-gold);
      }
      .footer-arch-window {
        width: 100%;
        max-width: 300px;
        aspect-ratio: 3 / 4;
        border-radius: 150px 150px 0 0;
        border: 1px solid var(--color-noir-border-light);
        margin: 0 auto;
        overflow: hidden;
        background: #25060D;
        box-shadow: 0 16px 40px rgba(0,0,0,0.6);
      }
      .footer-arch-window svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .footer-contacts-col {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .contact-row {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .contact-icon-bubble {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid var(--color-noir-border-light);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-noir-rose-gold);
        font-size: 13px;
      }
      .contact-meta-label {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--color-noir-rose-gold);
      }
      .contact-meta-val {
        font-size: 13px;
        color: #FFFFFF;
        text-decoration: none;
      }
      .footer-bottom-bar {
        border-top: 1px solid var(--color-noir-border);
        padding-top: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
        letter-spacing: 0.14em;
        color: var(--color-noir-text-muted);
        flex-wrap: wrap;
        gap: 16px;
      }

      /* 9. Interactive Cart Drawer */
      .cart-drawer-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(10, 2, 4, 0.7);
        backdrop-filter: blur(4px);
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .cart-drawer-overlay.active {
        opacity: 1;
        pointer-events: auto;
      }
      .cart-drawer-pane {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 440px;
        height: 100vh;
        background-color: #1E070D;
        color: #FFF8F5;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        box-shadow: -12px 0 40px rgba(0,0,0,0.6);
        border-left: 1px solid var(--color-noir-border);
      }
      .cart-drawer-pane.active {
        transform: translateX(0);
      }
      .cart-drawer-header {
        padding: 20px 24px;
        border-bottom: 1px solid var(--color-noir-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .cart-drawer-title {
        font-family: var(--font-serif);
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin: 0;
      }
      .cart-close-btn {
        background: transparent;
        border: none;
        color: var(--color-noir-text-muted);
        font-size: 24px;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
        transition: color 0.2s ease;
      }
      .cart-close-btn:hover {
        color: #FFFFFF;
      }
      .cart-shipping-bar {
        background-color: #140407;
        padding: 14px 24px;
        border-bottom: 1px solid var(--color-noir-border);
      }
      .shipping-text {
        font-size: 11px;
        letter-spacing: 0.05em;
        color: var(--color-noir-rose-gold);
        margin-bottom: 6px;
        text-align: center;
      }
      .shipping-track {
        height: 6px;
        background-color: #2D0C14;
        border-radius: 9999px;
        overflow: hidden;
      }
      .shipping-fill {
        height: 100%;
        width: 64%;
        background: linear-gradient(90deg, #C58372 0%, #E2B7A8 100%);
        border-radius: 9999px;
        transition: width 0.3s ease;
      }
      .cart-drawer-body {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .cart-item-row {
        display: flex;
        gap: 16px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--color-noir-border);
      }
      .cart-item-img {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        background: #2D0C14;
        border: 1px solid var(--color-noir-border);
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cart-item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .cart-item-title {
        font-family: var(--font-serif);
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 4px 0;
        color: #FFFFFF;
      }
      .cart-item-variant {
        font-size: 11px;
        color: var(--color-noir-text-muted);
        margin-bottom: 8px;
      }
      .cart-item-price {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-noir-rose-gold);
      }
      .cart-item-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }
      .stepper-mini {
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--color-noir-border);
        border-radius: 4px;
      }
      .stepper-mini button {
        background: transparent;
        border: none;
        color: var(--color-noir-rose-gold);
        width: 26px;
        height: 26px;
        cursor: pointer;
        font-size: 14px;
      }
      .stepper-mini span {
        width: 24px;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
      }
      .cart-remove-btn {
        background: transparent;
        border: none;
        color: var(--color-noir-text-muted);
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }
      .cart-drawer-footer {
        padding: 20px 24px;
        border-top: 1px solid var(--color-noir-border);
        background-color: #170509;
      }
      .cart-subtotal-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
      }
      .cart-subtotal-val {
        font-size: 18px;
        font-weight: 700;
        color: var(--color-noir-rose-gold);
      }
      .cart-tax-notice {
        font-size: 11px;
        color: var(--color-noir-text-muted);
        margin-bottom: 16px;
      }
      .btn-checkout-drawer {
        width: 100%;
        padding: 14px;
        background-color: var(--color-noir-berry);
        color: #FFFFFF;
        border: none;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
      }
      .btn-checkout-drawer:hover {
        background-color: #6D1D2B;
      }

      /* 10. Floating Theme Switcher Pill */
      .floating-theme-bar {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background-color: rgba(22, 4, 8, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid var(--color-noir-rose-gold);
        border-radius: 9999px;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.6);
        z-index: 9990;
      }
      .theme-pill-btn {
        padding: 8px 14px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        text-decoration: none;
        color: var(--color-noir-text-muted);
        background: transparent;
        border: 1px solid transparent;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .theme-pill-btn:hover {
        color: #FFFFFF;
        background-color: rgba(226, 183, 168, 0.15);
      }
      .theme-pill-btn.active {
        background-color: var(--color-noir-rose-gold);
        color: #1A070B;
        font-weight: 700;
      }
      .theme-pill-btn.zip-btn {
        background-color: var(--color-noir-berry);
        color: #FFFFFF;
        border-color: var(--color-noir-berry);
      }
      .theme-pill-btn.zip-btn:hover {
        background-color: #6D1D2B;
      }
      @media (max-width: 768px) {
        .floating-theme-bar {
          bottom: 12px;
          right: 12px;
          left: 12px;
          justify-content: center;
          padding: 4px;
        }
        .theme-pill-btn {
          font-size: 10px;
          padding: 6px 10px;
        }
      }
    </style>
  </head>
  <body>

    <!-- 1. HEADER (KAYRA BEAUTY) -->
    <header class="noir-header">
      <div class="noir-container">
        <div class="noir-header-inner">
          
          <!-- Brand Logo & Monogram -->
          <a href="/" class="noir-logo-seal">
            <div class="noir-monogram-circle">KB</div>
            <div>
              <span class="noir-brand-name">KAYRA</span>
              <span class="noir-brand-sub">BEAUTY ATELIER</span>
            </div>
          </a>

          <!-- Primary Navigation -->
          <ul class="noir-nav-links">
            <li><a href="/" class="active">HOME</a></li>
            <li><a href="/products/silkskin-botanical-serum">SILKSKIN SERUM</a></li>
            <li><a href="/collections/all">COLLECTIONS</a></li>
            <li><a href="#the-ritual">OUR RITUAL</a></li>
            <li><a href="/pages/skin-quiz">SKIN QUIZ</a></li>
            <li><a href="/pages/about-us">ABOUT ATELIER</a></li>
            <li><a href="/admin">MERCHANT ADMIN</a></li>
          </ul>

          <!-- Actions -->
          <div class="noir-header-actions">
            <a href="/pages/contact" class="btn-pill-noir-outline">
              LET'S TALK
            </a>
            
            <!-- Cart Trigger Button -->
            <button class="noir-cart-btn" onclick="openCartDrawer()" aria-label="Open Shopping Bag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span class="noir-cart-badge" id="cartBadgeCount">1</span>
            </button>
          </div>

        </div>
      </div>
    </header>

    <!-- 2. HERO SECTION -->
    <section class="noir-hero">
      <div class="noir-container">
        <div class="noir-hero-grid">
          
          <!-- Left Column: Copy & CTAs -->
          <div>
            <div class="hero-eyebrow">
              <span>✦</span> CELLULAR BOTANICAL ATELIER &bull; BORDEAUX &amp; KYOTO
            </div>
            
            <h1 class="hero-headline-massive">
              BEAUTY <br>
              <span class="script">with</span> <span class="accent">INTENT</span>
            </h1>

            <p class="hero-subtext">
              We formulate high-concentration botanical elixirs that nourish the skin barrier, restore youthful radiance, and transform daily routines into sacred self-care rituals.
            </p>

            <div class="hero-cta-group">
              <a href="/products/silkskin-botanical-serum" class="btn-pill-noir-outline" style="background-color: var(--color-noir-rose-gold); color: #1A070B; border-color: var(--color-noir-rose-gold);">
                EXPLORE RITUALS &rarr;
              </a>
              <a href="#the-ritual" class="btn-pill-noir-outline">
                OUR PHILOSOPHY &darr;
              </a>
            </div>
          </div>

          <!-- Right Column: Neo-classical Arch Portal Window with Silhouette & Seal -->
          <div class="hero-arch-container">
            <div class="hero-arch-window">
              <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hero-arch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4A1822"/>
                    <stop offset="50%" stop-color="#2D0C14"/>
                    <stop offset="100%" stop-color="#140407"/>
                  </linearGradient>
                  <radialGradient id="rose-radiance" cx="60%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="#9C2738" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#1A070B" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="400" height="500" fill="url(#hero-arch-bg)"/>
                <circle cx="250" cy="210" r="190" fill="url(#rose-radiance)"/>
                
                <!-- Portrait Silhouette of Elegant Model -->
                <path d="M200 130 C225 130 245 150 245 180 C245 205 230 225 210 235 C235 245 280 270 290 350 L110 350 C120 270 165 245 190 235 C170 225 155 205 155 180 C155 150 175 130 200 130 Z" fill="#1C0509" opacity="0.95"/>
                <!-- Subtle gold earring / luxury accent -->
                <circle cx="242" cy="195" r="3.5" fill="#E2B7A8"/>
                <line x1="242" y1="198" x2="242" y2="210" stroke="#E2B7A8" stroke-width="1.5"/>

                <!-- Velvet Flora overlay -->
                <path d="M-20 470 C80 340 220 400 270 500 Z" fill="#3D121B" opacity="0.65"/>
                <path d="M170 500 C240 380 380 400 420 500 Z" fill="#280A10" opacity="0.85"/>
              </svg>
            </div>

            <!-- Floating Monogram Seal -->
            <div class="hero-circular-seal">
              <span class="seal-monogram">KB</span>
              <span class="seal-text">CELLULAR CARE</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. CREDENTIALS STRIP -->
    <section class="noir-strip">
      <div class="noir-container">
        <div class="strip-grid">
          
          <div class="strip-col">
            <span class="strip-label">ATELIER ORIGIN</span>
            <span class="strip-val">Bordeaux &amp; Kyoto</span>
          </div>

          <div class="strip-col">
            <span class="strip-label">FORMULATION</span>
            <span class="strip-val">100% Clean &amp; Biocompatible</span>
          </div>

          <div class="strip-col">
            <span class="strip-signature">Kayra Atelier</span>
          </div>

          <div class="strip-col">
            <span class="strip-desc">Transforming daily skincare into restorative botanical rituals.</span>
          </div>

        </div>
      </div>
    </section>

    <!-- 4. FEATURED WORK / FORMULATIONS (3 Wide Blush Cards) -->
    <section class="noir-featured">
      <div class="noir-container">
        
        <div class="section-header-row">
          <div class="eyebrow-plus">+ FEATURED FORMULATIONS</div>
          <a href="/collections/all" class="view-all-link">
            VIEW ALL COLLECTIONS &rarr;
          </a>
        </div>

        <div class="featured-cards-grid">
          
          <!-- Card 1: LUMINA / SilkSkin -->
          <a href="/products/silkskin-botanical-serum" class="blush-card">
            <div class="card-media-box">
              <svg viewBox="0 0 320 200" fill="none">
                <rect width="320" height="200" fill="#FBF3EF"/>
                <ellipse cx="160" cy="155" rx="90" ry="22" fill="#E8D1C7"/>
                <!-- Glass Bottle -->
                <rect x="130" y="55" width="60" height="95" rx="8" fill="#FFFFFF" stroke="#D9BEB1" stroke-width="1.5"/>
                <rect x="148" y="30" width="24" height="25" rx="3" fill="#BA934E"/>
                <rect x="156" y="16" width="8" height="14" rx="2" fill="#FFFFFF" stroke="#BA934E"/>
                <text x="160" y="105" font-family="'Cormorant Garamond', serif" font-size="13" font-weight="700" letter-spacing="3" fill="#2D0C14" text-anchor="middle">LUMINA</text>
                <text x="160" y="122" font-family="'Jost', sans-serif" font-size="9" letter-spacing="1.5" fill="#884F5A" text-anchor="middle">SILKSKIN SERUM</text>
              </svg>
            </div>
            <div>
              <h3 class="card-title">LUMINA</h3>
              <div class="card-sub">Radiance Elixir &amp; Squalane Botanical Serum</div>
            </div>
            <div class="card-plus-btn">+</div>
          </a>

          <!-- Card 2: VIREO STUDIO -->
          <a href="/collections/all" class="blush-card">
            <div class="card-media-box">
              <svg viewBox="0 0 320 200" fill="none">
                <rect width="320" height="200" fill="#FBF3EF"/>
                <ellipse cx="160" cy="155" rx="90" ry="22" fill="#E8D1C7"/>
                <!-- Slender Essence Bottle -->
                <rect x="135" y="45" width="50" height="110" rx="6" fill="#FFFFFF" stroke="#D9BEB1" stroke-width="1.5"/>
                <rect x="147" y="22" width="26" height="23" rx="2" fill="#2D0C14"/>
                <text x="160" y="105" font-family="'Cormorant Garamond', serif" font-size="13" font-weight="700" letter-spacing="3" fill="#2D0C14" text-anchor="middle">VIREO</text>
                <text x="160" y="122" font-family="'Jost', sans-serif" font-size="9" letter-spacing="1.5" fill="#884F5A" text-anchor="middle">BOTANICAL ESSENCE</text>
              </svg>
            </div>
            <div>
              <h3 class="card-title">VIREO STUDIO</h3>
              <div class="card-sub">Balancing Bioferment Toner &amp; Micro-Mist</div>
            </div>
            <div class="card-plus-btn">+</div>
          </a>

          <!-- Card 3: AURORA LIVING -->
          <a href="/collections/all" class="blush-card">
            <div class="card-media-box">
              <svg viewBox="0 0 320 200" fill="none">
                <rect width="320" height="200" fill="#FBF3EF"/>
                <ellipse cx="160" cy="155" rx="90" ry="22" fill="#E8D1C7"/>
                <!-- Luxury Cream Jar -->
                <rect x="120" y="75" width="80" height="70" rx="8" fill="#FFFFFF" stroke="#D9BEB1" stroke-width="1.5"/>
                <rect x="115" y="60" width="90" height="18" rx="4" fill="#C58372"/>
                <text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="13" font-weight="700" letter-spacing="3" fill="#2D0C14" text-anchor="middle">AURORA</text>
                <text x="160" y="128" font-family="'Jost', sans-serif" font-size="9" letter-spacing="1.5" fill="#884F5A" text-anchor="middle">BARRIER CREME</text>
              </svg>
            </div>
            <div>
              <h3 class="card-title">AURORA LIVING</h3>
              <div class="card-sub">Deep Lipid Moisture Barrier Balm</div>
            </div>
            <div class="card-plus-btn">+</div>
          </a>

        </div>

      </div>
    </section>

    <!-- 5. 5-STEP APPROACH / RITUAL -->
    <section class="noir-approach" id="the-ritual">
      <div class="noir-container">
        
        <div class="section-header-row">
          <div class="eyebrow-plus">+ OUR 5-STEP RITUAL</div>
        </div>

        <div class="approach-grid">
          
          <div class="approach-step">
            <div class="step-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div>
              <div class="step-num">01</div>
              <h4 class="step-title">DISCOVER</h4>
              <p class="step-desc">Comprehensive diagnosis of skin barrier lipid deficit and sensitivity triggers.</p>
            </div>
          </div>

          <div class="approach-step">
            <div class="step-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div class="step-num">02</div>
              <h4 class="step-title">DEFINE</h4>
              <p class="step-desc">Curating targeted biocompatible phytonutrients tailored to your skin cycle.</p>
            </div>
          </div>

          <div class="approach-step">
            <div class="step-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            </div>
            <div>
              <div class="step-num">03</div>
              <h4 class="step-title">FORMULATE</h4>
              <p class="step-desc">Cold-pressed botanical bioferments molecularly harmonized for rapid assimilation.</p>
            </div>
          </div>

          <div class="approach-step">
            <div class="step-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <div class="step-num">04</div>
              <h4 class="step-title">INFUSE</h4>
              <p class="step-desc">Precision layering of lightweight essences, active serums, and barrier sealants.</p>
            </div>
          </div>

          <div class="approach-step">
            <div class="step-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div class="step-num">05</div>
              <h4 class="step-title">REFINE</h4>
              <p class="step-desc">Long-term barrier resilience, refined pore architecture, and lasting glow.</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 6. CLINICAL CASE STUDIES -->
    <section class="noir-cases">
      <div class="noir-container">
        
        <div class="section-header-row">
          <div class="eyebrow-plus">+ CLINICAL CASE STUDIES</div>
          <a href="/pages/about-us" class="view-all-link">SEE ALL CLINICAL TRIALS &rarr;</a>
        </div>

        <div class="cases-grid">
          
          <a href="/products/silkskin-botanical-serum" class="case-card case-card--terracotta">
            <div class="case-num">01 / PROOF</div>
            <div>
              <h3 class="case-title">LUMINA CLINICAL TRIAL</h3>
              <p class="case-desc">94% of tested participants demonstrated measured improvement in cellular epidermal hydration within 14 days of cold-pressed squalane application.</p>
            </div>
            <div class="case-action">VIEW CASE STUDY &rarr;</div>
          </a>

          <a href="/collections/all" class="case-card case-card--blush">
            <div class="case-num">02 / LAB</div>
            <div>
              <h3 class="case-title">VIREO ESSENCE AUDIT</h3>
              <p class="case-desc">Measured 82% reduction in reactive inflammation flare-ups and balanced cellular sebum production across diverse sensitive skin profiles.</p>
            </div>
            <div class="case-action">VIEW CASE STUDY &rarr;</div>
          </a>

          <a href="/collections/all" class="case-card case-card--rose">
            <div class="case-num">03 / BARRIER</div>
            <div>
              <h3 class="case-title">AURORA BARRIER REPAIR</h3>
              <p class="case-desc">Restores trans-epidermal moisture retention by 76% and naturally stimulates dermal ceramide synthesis under extreme environmental stressors.</p>
            </div>
            <div class="case-action">VIEW CASE STUDY &rarr;</div>
          </a>

        </div>

      </div>
    </section>

    <!-- 7. WHAT WE DO (PILLARS) -->
    <section class="noir-pillars">
      <div class="noir-container">
        
        <div class="section-header-row" style="margin-bottom: 40px;">
          <div class="eyebrow-plus">+ WHAT WE FORMULATE</div>
        </div>

        <div class="pillars-grid">
          
          <div class="pillars-statement">
            Strategic formulation.<br>
            Seamless rituals.<br>
            <span class="highlight">Real visible impact.</span>
          </div>

          <div class="pillars-cards-box">
            
            <div class="pillar-item">
              <div class="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <h4 class="pillar-title">BIOCOMPATIBLE ACTIVE SCIENCE</h4>
              <p class="pillar-desc">Molecularly calibrated phytonutrients absorb immediately without cellular resistance.</p>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h4 class="pillar-title">ETHICAL LUXURY HARVEST</h4>
              <p class="pillar-desc">Wild-harvested botanicals sustainably gathered from certified European micro-farms.</p>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              </div>
              <h4 class="pillar-title">ZERO HARMFUL ADDITIVES</h4>
              <p class="pillar-desc">Strictly free from synthetic fragrances, silicones, sulfates, and petrochemicals.</p>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4 class="pillar-title">HOLISTIC RITUAL CONSULTING</h4>
              <p class="pillar-desc">Bespoke skin consultation designed to align with your hormonal and seasonal cycles.</p>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- 8. GRAND CTA NOIR FOOTER -->
    <footer class="noir-footer-cta">
      <div class="noir-container">
        
        <div class="footer-cta-grid">
          
          <!-- Left Column -->
          <div>
            <h2 class="footer-headline">
              Let's create<br>
              something<br>
              <span class="script">extraordinary..</span>
            </h2>

            <a href="/products/silkskin-botanical-serum" class="btn-pill-noir-outline" style="background-color: var(--color-noir-rose-gold); color: #1A070B; border-color: var(--color-noir-rose-gold);">
              EXPLORE THE ATELIER &rarr;
            </a>
          </div>

          <!-- Center Column: Velvet Arch Floral Silhouette -->
          <div style="display:flex; justify-content:center;">
            <div class="footer-arch-window">
              <svg viewBox="0 0 300 400" fill="none">
                <defs>
                  <radialGradient id="footer-floral" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stop-color="#9C2738" stop-opacity="0.95"/>
                    <stop offset="55%" stop-color="#4A101A" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#140306" stop-opacity="1"/>
                  </radialGradient>
                </defs>
                <rect width="300" height="400" fill="url(#footer-floral)"/>
                <circle cx="150" cy="220" r="85" fill="#6A1624" opacity="0.85"/>
                <path d="M150 150 C100 180 90 250 150 270 C210 250 200 180 150 150 Z" fill="#B32B3E" opacity="0.9"/>
                <path d="M110 200 C90 230 130 280 170 260 C180 210 150 190 110 200 Z" fill="#881E2E"/>
                <circle cx="150" cy="210" r="14" fill="#F0D5CC" opacity="0.8"/>
              </svg>
            </div>
          </div>

          <!-- Right Column: Contact Details & Seal -->
          <div class="footer-contacts-col">
            
            <div class="contact-row">
              <div class="contact-icon-bubble">✉</div>
              <div>
                <div class="contact-meta-label">EMAIL</div>
                <a href="mailto:atelier@kayrabeauty.com" class="contact-meta-val">atelier@kayrabeauty.com</a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-icon-bubble">◎</div>
              <div>
                <div class="contact-meta-label">INSTAGRAM</div>
                <a href="https://instagram.com" target="_blank" class="contact-meta-val">@kayra.beauty</a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-icon-bubble">in</div>
              <div>
                <div class="contact-meta-label">LINKEDIN</div>
                <a href="https://linkedin.com" target="_blank" class="contact-meta-val">linkedin.com/company/kayra-beauty</a>
              </div>
            </div>

            <div class="contact-row">
              <div class="contact-icon-bubble">⚲</div>
              <div>
                <div class="contact-meta-label">LOCATION</div>
                <div class="contact-meta-val">Bordeaux, France &bull; Kyoto, Japan</div>
              </div>
            </div>

            <!-- Monogram Seal Stamp -->
            <div style="margin-top: 10px;">
              <div class="noir-monogram-circle" style="width: 56px; height: 56px; font-size: 20px;">
                KB
              </div>
            </div>

          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom-bar">
          <div>&copy; 2026 KAYRA BEAUTY &bull; ALL RIGHTS RESERVED</div>
          <div style="display:flex; gap: 20px; align-items:center;">
            <a href="/pages/about-us" style="color:inherit; text-decoration:none;">Privacy Policy</a>
            <a href="/pages/about-us" style="color:inherit; text-decoration:none;">Terms of Service</a>
            <a href="/admin" style="color: var(--color-noir-rose-gold); text-decoration:none; font-weight:600;">Merchant Admin</a>
            <a href="/download/kayra-beauty-shopify-theme.zip" style="color: #FFFFFF; text-decoration:none; font-weight:600;">Download Theme ZIP</a>
          </div>
        </div>

      </div>
    </footer>

    <!-- 9. INTERACTIVE CART DRAWER -->
    <div class="cart-drawer-overlay" id="cartDrawerOverlay" onclick="closeCartDrawer()"></div>

    <div class="cart-drawer-pane" id="cartDrawerPane">
      <div class="cart-drawer-header">
        <h3 class="cart-drawer-title">YOUR SHOPPING BAG (<span id="cartDrawerCount">1</span>)</h3>
        <button class="cart-close-btn" onclick="closeCartDrawer()" aria-label="Close cart">&times;</button>
      </div>

      <!-- Free Shipping Goal -->
      <div class="cart-shipping-bar">
        <div class="shipping-text" id="shippingNoticeText">✦ Only $27.00 away from Free Worldwide Express Shipping!</div>
        <div class="shipping-track">
          <div class="shipping-fill" id="shippingProgressBar" style="width: 64%;"></div>
        </div>
      </div>

      <div class="cart-drawer-body" id="cartItemsContainer">
        <!-- Line Item 1 -->
        <div class="cart-item-row" id="cartItem1">
          <div class="cart-item-img">
            <svg viewBox="0 0 100 100" width="60" height="60" fill="none">
              <rect width="100" height="100" fill="#24090F"/>
              <rect x="35" y="30" width="30" height="48" rx="4" fill="#FFFFFF"/>
              <rect x="44" y="16" width="12" height="14" rx="2" fill="#BA934E"/>
              <text x="50" y="58" font-family="'Cormorant Garamond', serif" font-size="9" font-weight="700" fill="#1A070B" text-anchor="middle">SILK</text>
            </svg>
          </div>
          <div class="cart-item-details">
            <div>
              <h4 class="cart-item-title">SilkSkin Botanical Serum</h4>
              <div class="cart-item-variant">Volume: <span id="cartItemVolume">30 ml</span> &bull; Biocompatible</div>
              <div class="cart-item-price" id="cartItemPrice">$48.00</div>
            </div>
            <div class="cart-item-actions">
              <div class="stepper-mini">
                <button type="button" onclick="updateCartQty(-1)">-</button>
                <span id="cartItemQty">1</span>
                <button type="button" onclick="updateCartQty(1)">+</button>
              </div>
              <button type="button" class="cart-remove-btn" onclick="removeCartItem()">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <div class="cart-drawer-footer">
        <div class="cart-subtotal-row">
          <span>Subtotal</span>
          <span class="cart-subtotal-val" id="cartSubtotalText">$48.00</span>
        </div>
        <div class="cart-tax-notice">Taxes and shipping calculated at checkout.</div>
        
        <a href="/checkout" class="btn-checkout-drawer">
          PROCEED TO CHECKOUT &rarr;
        </a>
      </div>
    </div>

    <!-- 10. FLOATING THEME SWITCHER PILL -->
    <div class="floating-theme-bar">
      <a href="/" class="theme-pill-btn active" title="Noir Velvet & Rose Champagne">🌹 Noir Velvet</a>
      <a href="/terracotta" class="theme-pill-btn" title="Terracotta Atelier (Mira Vale Concept)">🏺 Terracotta</a>
      <a href="/products/silkskin-botanical-serum" class="theme-pill-btn" title="SilkSkin Serum Product Page">🌿 SilkSkin Product</a>
      <a href="/admin" class="theme-pill-btn" title="Shopify Theme Admin Settings">⚙️ Admin</a>
      <a href="/download/kayra-beauty-shopify-theme.zip" class="theme-pill-btn zip-btn" title="Download Installable Theme ZIP">📦 Download ZIP</a>
    </div>

    <!-- Cart Drawer Interactive Controller -->
    <script>
      let currentQty = 1;
      const unitPrice = 48.00;
      const freeShippingThreshold = 75.00;

      function openCartDrawer() {
        document.getElementById('cartDrawerOverlay').classList.add('active');
        document.getElementById('cartDrawerPane').classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeCartDrawer() {
        document.getElementById('cartDrawerOverlay').classList.remove('active');
        document.getElementById('cartDrawerPane').classList.remove('active');
        document.body.style.overflow = '';
      }

      function updateCartQty(delta) {
        currentQty += delta;
        if (currentQty <= 0) {
          removeCartItem();
          return;
        }
        renderCart();
      }

      function removeCartItem() {
        currentQty = 0;
        document.getElementById('cartItemsContainer').innerHTML = \`
          <div style="text-align:center; padding: 40px 20px; color: var(--color-noir-text-muted);">
            <div style="font-size: 36px; margin-bottom: 12px;">🛍</div>
            <h4 style="font-family: var(--font-serif); font-size: 20px; color: #FFF; margin: 0 0 8px 0;">Your Bag is Empty</h4>
            <p style="font-size: 13px; margin-bottom: 20px;">Discover our botanical rituals to restore cellular radiance.</p>
            <a href="/products/silkskin-botanical-serum" class="btn-pill-noir-outline" style="background-color: var(--color-noir-rose-gold); color: #1A070B; border-color: var(--color-noir-rose-gold);" onclick="closeCartDrawer()">Shop SilkSkin Serum</a>
          </div>
        \`;
        renderCart();
      }

      function renderCart() {
        const subtotal = currentQty * unitPrice;
        document.getElementById('cartBadgeCount').textContent = currentQty;
        document.getElementById('cartDrawerCount').textContent = currentQty;
        document.getElementById('cartSubtotalText').textContent = '$' + subtotal.toFixed(2);
        
        const qtySpan = document.getElementById('cartItemQty');
        if (qtySpan) qtySpan.textContent = currentQty;

        const fillBar = document.getElementById('shippingProgressBar');
        const notice = document.getElementById('shippingNoticeText');

        if (subtotal >= freeShippingThreshold) {
          fillBar.style.width = '100%';
          notice.textContent = '🎉 Congratulations! You have unlocked Free Express Worldwide Delivery!';
          notice.style.color = '#74D99F';
        } else {
          const diff = freeShippingThreshold - subtotal;
          const pct = Math.max(0, Math.min(100, (subtotal / freeShippingThreshold) * 100));
          fillBar.style.width = pct + '%';
          notice.textContent = '✦ Only $' + diff.toFixed(2) + ' away from Free Worldwide Express Shipping!';
          notice.style.color = 'var(--color-noir-rose-gold)';
        }
      }
    </script>

  </body>
</html>
`;

fs.writeFileSync('preview/index.html', htmlContent);
console.log('Successfully generated preview/index.html with pristine KAYRA BEAUTY Noir Velvet Suite!');
