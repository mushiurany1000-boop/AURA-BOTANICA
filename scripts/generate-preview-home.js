const fs = require('fs');

const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>KAYRA BEAUTY — Pure Botanical Alchemy | Terracotta Atelier</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/theme.css?v=2.2.0">
    <link rel="stylesheet" href="/assets/aura-base.css?v=2.2.0">
    <script src="/assets/theme.js?v=2.1.0" defer></script>
    <style>
      :root {
        --color-bg-home: #FDF5F2;
        --color-rust-band: #7C2E21;
        --color-rust-btn: #8B3224;
        --color-rust-card: #873223;
        --color-blush-card: #F3E8E2;
        --color-blush-card-2: #F8EFEA;
        --color-terracotta-banner: #C6A18F;
        --color-dark-brown: #3B1E18;
      }
      body.template-index {
        background-color: var(--color-bg-home);
        color: var(--color-dark-brown);
        font-family: 'Jost', sans-serif;
        margin: 0;
        padding: 0;
      }
      .theme-preview-bar {
        background: #244638;
        color: #F8F5EF;
        font-size: 11px;
        padding: 6px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 9999;
        letter-spacing: 0.06em;
      }
      .theme-preview-bar a {
        color: #DEBC8C;
        text-decoration: underline;
        margin-left: 12px;
        font-weight: 600;
      }
      .theme-preview-tag {
        background: rgba(222, 188, 140, 0.25);
        color: #DEBC8C;
        padding: 2px 8px;
        border-radius: 4px;
        font-weight: 700;
        font-size: 10px;
        margin-right: 8px;
      }

      /* Kayra Brand Logo */
      .kayra-brand-logo {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        line-height: 1;
        vertical-align: middle;
        text-decoration: none;
        color: inherit;
      }
      .kayra-brand-logo__wordmark {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 2.1rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        line-height: 1;
        text-transform: uppercase;
        color: #3B1E18;
      }
      .kayra-brand-logo__subtitle {
        font-family: 'Jost', sans-serif;
        font-size: 0.65rem;
        font-weight: 500;
        letter-spacing: 0.38em;
        line-height: 1;
        text-transform: uppercase;
        margin-top: 4px;
        padding-left: 0.38em;
        color: #6D514E;
      }

      /* Header */
      .site-header-home {
        background: #FDF5F2;
        border-bottom: 1px solid #E9D5CC;
        padding: 18px 0;
      }
      .site-header-home__inner {
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .nav-links-home {
        display: flex;
        gap: 32px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .nav-links-home a {
        font-family: 'Jost', sans-serif;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #3B1E18;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .nav-links-home a:hover {
        color: var(--color-rust-btn);
      }
      .header-actions-home {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .header-icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #3B1E18;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cart-badge {
        position: absolute;
        top: -6px;
        right: -8px;
        background: var(--color-rust-btn);
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Section 1: Hero Editorial Split */
      .hero-split-section {
        max-width: 1240px;
        margin: 0 auto;
        padding: 30px 24px 40px;
      }
      .hero-split-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 520px;
        background: #FCF5EF;
        border: 1px solid #E9D5CC;
      }
      @media (max-width: 900px) {
        .hero-split-grid {
          grid-template-columns: 1fr;
        }
      }
      .hero-split-left {
        padding: 60px 48px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      .hero-eyebrow {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        color: #6D514E;
        margin-bottom: 16px;
      }
      .hero-h1 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: clamp(2.5rem, 4.2vw, 4.5rem);
        font-weight: 500;
        line-height: 1.04;
        color: #3B1E18;
        margin: 0 0 12px 0;
        letter-spacing: -0.02em;
      }
      .hero-concept {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 1.6rem;
        font-weight: 400;
        font-style: italic;
        color: #6D514E;
        margin: 0 0 20px 0;
      }
      .hero-desc {
        font-size: 14px;
        line-height: 1.6;
        color: #6A625F;
        max-width: 380px;
        margin-bottom: 32px;
      }
      .btn-rust {
        background-color: var(--color-rust-btn);
        color: #FFFFFF;
        border: none;
        padding: 14px 34px;
        font-family: 'Jost', sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        text-decoration: none;
        display: inline-block;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .btn-rust:hover {
        background-color: #6A2318;
        transform: translateY(-1px);
      }
      .hero-split-right {
        position: relative;
        background: #F4E2D8;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hero-split-right svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Section 2: Benefits Strip */
      .benefits-strip-home {
        background-color: var(--color-rust-band);
        color: #FCE8E7;
      }
      .benefits-strip-grid {
        max-width: 1240px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
      @media (max-width: 800px) {
        .benefits-strip-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .benefit-item {
        padding: 24px 20px;
        border-right: 1px solid rgba(252, 232, 231, 0.2);
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .benefit-item:last-child {
        border-right: none;
      }
      .benefit-icon {
        width: 32px;
        height: 32px;
        stroke: #FCE8E7;
        stroke-width: 1.25;
        flex-shrink: 0;
      }
      .benefit-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin-bottom: 2px;
        color: #FFFFFF;
      }
      .benefit-desc {
        font-size: 11px;
        color: rgba(252, 232, 231, 0.85);
        line-height: 1.3;
      }

      /* Section 3: Shop by Category */
      .category-section {
        max-width: 1240px;
        margin: 50px auto 30px;
        padding: 0 24px;
      }
      .section-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      .section-eyebrow-title {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        color: #3B1E18;
      }
      .section-header-link {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #3B1E18;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: color 0.2s ease;
      }
      .section-header-link:hover {
        color: var(--color-rust-btn);
      }
      .category-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
      @media (max-width: 900px) {
        .category-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .category-card {
        background-color: var(--color-blush-card);
        border: 1px solid #E9D5CC;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-decoration: none;
        color: #3B1E18;
        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        min-height: 160px;
      }
      .category-card:hover {
        transform: translateY(-3px);
        border-color: var(--color-rust-btn);
        box-shadow: 0 8px 24px rgba(124, 46, 33, 0.08);
      }
      .category-media {
        width: 48%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .category-info {
        width: 48%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .category-name {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 4px;
        color: #3B1E18;
      }
      .category-sub {
        font-size: 11px;
        color: #6A625F;
        line-height: 1.3;
        margin-bottom: 12px;
      }
      .category-arrow {
        font-size: 14px;
        color: #3B1E18;
        transition: transform 0.2s ease;
      }
      .category-card:hover .category-arrow {
        transform: translateX(4px);
        color: var(--color-rust-btn);
      }

      /* Bento Row 1 */
      .bento-row {
        max-width: 1240px;
        margin: 20px auto;
        padding: 0 24px;
        display: grid;
        grid-template-columns: 53.5% 1fr;
        gap: 16px;
      }
      @media (max-width: 900px) {
        .bento-row {
          grid-template-columns: 1fr;
        }
      }
      .bento-card-ritual {
        background-color: var(--color-rust-card);
        color: #FFF7F5;
        border: 1px solid #732A1D;
        padding: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 340px;
        position: relative;
        overflow: hidden;
      }
      .bento-text-area {
        width: 52%;
        z-index: 2;
      }
      .bento-eyebrow-light {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        color: #F8D5CE;
        margin-bottom: 12px;
      }
      .bento-h3-light {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 2.2rem;
        font-weight: 500;
        line-height: 1.1;
        margin: 0 0 14px 0;
        color: #FFFFFF;
      }
      .bento-p-light {
        font-size: 13px;
        line-height: 1.5;
        color: #FCE8E7;
        margin-bottom: 24px;
      }
      .btn-outline-white {
        border: 1px solid #FFFFFF;
        color: #FFFFFF;
        padding: 10px 24px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        text-decoration: none;
        display: inline-block;
        transition: all 0.2s ease;
      }
      .btn-outline-white:hover {
        background: #FFFFFF;
        color: var(--color-rust-card);
      }
      .bento-media-ritual {
        width: 44%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }

      .bento-card-ingredient {
        background-color: var(--color-blush-card);
        border: 1px solid #E9D5CC;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 340px;
      }
      .ingredient-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .ingredient-dish {
        width: 140px;
        height: 140px;
      }
      .ingredient-h3 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 2.4rem;
        font-weight: 500;
        color: #3B1E18;
        margin: 0 0 10px 0;
      }
      .ingredient-bullets {
        list-style: none;
        padding: 0;
        margin: 0 0 20px 0;
        font-size: 13px;
        line-height: 1.6;
        color: #6A625F;
      }
      .ingredient-link {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #3B1E18;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .ingredient-link:hover {
        color: var(--color-rust-btn);
      }

      /* Bento Row 2 */
      .bento-card-routine {
        background-color: var(--color-blush-card-2);
        border: 1px solid #E9D5CC;
        padding: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 320px;
      }
      .routine-media {
        width: 42%;
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .bento-card-journal {
        background-color: var(--color-blush-card-2);
        border: 1px solid #E9D5CC;
        padding: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 320px;
      }
      .journal-media {
        width: 40%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .journal-content {
        width: 55%;
      }

      /* Subscribe & Save Banner */
      .subscribe-section {
        max-width: 1240px;
        margin: 24px auto;
        padding: 0 24px;
      }
      .subscribe-banner-card {
        background-color: var(--color-terracotta-banner);
        border: 1px solid #B89280;
        padding: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      @media (max-width: 900px) {
        .subscribe-banner-card {
          flex-direction: column;
          gap: 32px;
        }
      }
      .subscribe-media {
        width: 44%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .subscribe-content {
        width: 52%;
      }
      .subscribe-h3 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 2.3rem;
        font-weight: 500;
        line-height: 1.15;
        color: #3B1E18;
        margin: 0 0 12px 0;
      }
      .subscribe-desc {
        font-size: 13px;
        color: #4A3029;
        margin-bottom: 24px;
      }

      /* FAQ 2-Column Accordion */
      .faq-section-home {
        max-width: 1240px;
        margin: 40px auto 60px;
        padding: 0 24px;
      }
      .faq-grid-2col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      @media (max-width: 800px) {
        .faq-grid-2col {
          grid-template-columns: 1fr;
        }
      }
      .faq-item-outline {
        border: 1px solid #E9D5CC;
        background: #FDFBF9;
        padding: 16px 20px;
        transition: border-color 0.2s ease;
      }
      .faq-item-outline:hover {
        border-color: var(--color-rust-btn);
      }
      .faq-question-btn {
        width: 100%;
        background: none;
        border: none;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-family: 'Jost', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #3B1E18;
        padding: 0;
      }
      .faq-icon-toggle {
        font-size: 18px;
        color: #6A625F;
        transition: transform 0.2s ease;
      }
      .faq-answer {
        margin-top: 10px;
        font-size: 12px;
        line-height: 1.6;
        color: #6A625F;
        display: none;
      }
      .faq-item-outline.is-open .faq-answer {
        display: block;
      }
      .faq-item-outline.is-open .faq-icon-toggle {
        transform: rotate(45deg);
        color: var(--color-rust-btn);
      }

      /* Luxury Footer */
      .site-footer-home {
        background: #3B1E18;
        color: #F8E8E3;
        padding: 60px 0 30px;
        margin-top: 60px;
      }
      .site-footer-inner {
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 24px;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: 40px;
      }
      @media (max-width: 900px) {
        .site-footer-inner {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (max-width: 600px) {
        .site-footer-inner {
          grid-template-columns: 1fr;
        }
      }
      .footer-col h4 {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        margin-bottom: 20px;
        color: #FFFFFF;
      }
      .footer-col ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .footer-col ul li {
        margin-bottom: 10px;
      }
      .footer-col ul li a {
        color: #F8E8E3;
        text-decoration: none;
        font-size: 13px;
        transition: color 0.2s ease;
      }
      .footer-col ul li a:hover {
        color: #DEBC8C;
      }
      .footer-bottom {
        max-width: 1240px;
        margin: 40px auto 0;
        padding: 20px 24px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: rgba(248, 232, 227, 0.7);
      }
    </style>
  </head>

  <body class="template-index">
    <!-- Local Developer Status Bar -->
    <div class="theme-preview-bar">
      <div>
        <span class="theme-preview-tag">SHOPIFY OS 2.0</span>
        <span>KAYRA BEAUTY — Terracotta Atelier Preset (Reference 1)</span>
      </div>
      <div>
        <span>Explore:</span>
        <a href="/">Home (Ref 1)</a>
        <a href="/product">Product Detail (Ref 2)</a>
        <a href="/admin" target="_blank" style="background:var(--color-rust-btn);color:#fff;padding:3px 10px;border-radius:4px;text-decoration:none;">🔒 Admin Portal</a>
        <a href="javascript:void(0)" onclick="alert('Cart Drawer: 1 item ($48.00)')">Bag Drawer (1)</a>
      </div>
    </div>

    <!-- Header (Reference 1 Warm Cream) -->
    <header class="site-header-home">
      <div class="site-header-home__inner">
        <!-- Logo -->
        <a href="/" class="kayra-brand-logo">
          <span class="kayra-brand-logo__wordmark">KAYRA</span>
          <span class="kayra-brand-logo__subtitle">BEAUTY</span>
        </a>

        <!-- Desktop Navigation -->
        <nav>
          <ul class="nav-links-home">
            <li><a href="/collections/all">Formulations</a></li>
            <li><a href="#rituals">The Rituals</a></li>
            <li><a href="#ingredients">Clean Actives</a></li>
            <li><a href="/product">SilkSkin Serum</a></li>
            <li><a href="#journal">Journal</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="header-actions-home">
          <button type="button" class="header-icon-btn" aria-label="Search" onclick="alert('Quick Search active')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <a href="/product" class="header-icon-btn" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </a>
          <button type="button" class="header-icon-btn" aria-label="Cart" onclick="alert('Cart Drawer: 1 item ($48.00)')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-badge">1</span>
          </button>
        </div>
      </div>
    </header>

    <main id="MainContent">
      <!-- 1. Hero Editorial Split (Reference 1) -->
      <section class="hero-split-section">
        <div class="hero-split-grid">
          <!-- Left Text Panel -->
          <div class="hero-split-left">
            <span class="hero-eyebrow">PREMIUM SKINCARE BRAND</span>
            <h1 class="hero-h1">KAYRA Beauty<br>Skincare</h1>
            <p class="hero-concept">Website Design Concept</p>
            <p class="hero-desc">Thoughtful rituals. Pure ingredients.<br>Visible care for your skin and your day.</p>
            <a href="/collections/all" class="btn-rust">EXPLORE COLLECTION</a>
          </div>

          <!-- Right Travertine Render Panel -->
          <div class="hero-split-right">
            <svg viewBox="0 0 600 520" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wall-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#EED7CC"/>
                  <stop offset="100%" stop-color="#D6B4A4"/>
                </linearGradient>
                <linearGradient id="stone-grad" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stop-color="#CBB19F"/>
                  <stop offset="100%" stop-color="#A88B79"/>
                </linearGradient>
                <linearGradient id="gold-cap" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#DFBA9D"/>
                  <stop offset="100%" stop-color="#B38264"/>
                </linearGradient>
                <linearGradient id="serum-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FDE8DE"/>
                  <stop offset="100%" stop-color="#F7C4B2"/>
                </linearGradient>
              </defs>
              <!-- Textured Clay Wall -->
              <rect width="600" height="520" fill="url(#wall-grad)"/>
              <!-- Travertine Stone Slab -->
              <path d="M0 380 L600 360 L600 520 L0 520 Z" fill="url(#stone-grad)"/>
              <!-- Soft Cast Shadows -->
              <ellipse cx="200" cy="410" rx="80" ry="20" fill="#7D6254" opacity="0.35"/>
              <ellipse cx="370" cy="420" rx="70" ry="18" fill="#7D6254" opacity="0.35"/>
              <ellipse cx="490" cy="425" rx="50" ry="14" fill="#7D6254" opacity="0.35"/>

              <!-- Bottle 1: Tall Gentle Cleanser -->
              <rect x="150" y="120" width="100" height="280" rx="8" fill="#FFFFFF"/>
              <!-- Cleanser Pump -->
              <rect x="180" y="80" width="40" height="40" fill="url(#gold-cap)"/>
              <path d="M195 80 L195 50 L160 55" stroke="#B38264" stroke-width="8" stroke-linecap="round"/>
              <text x="200" y="220" font-family="'Jost', sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="#5A473E" text-anchor="middle">GENTLE CLEANSER</text>
              <text x="200" y="240" font-family="'Jost', sans-serif" font-size="8" fill="#998175" text-anchor="middle">ALOE + OAT</text>

              <!-- Bottle 2: Rich Moisturizer Jar -->
              <rect x="310" y="240" width="120" height="150" rx="6" fill="#FFFFFF"/>
              <!-- Copper Jar Lid -->
              <rect x="310" y="240" width="120" height="42" rx="4" fill="url(#gold-cap)"/>
              <text x="370" y="325" font-family="'Jost', sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="#5A473E" text-anchor="middle">RICH MOISTURIZER</text>
              <text x="370" y="342" font-family="'Jost', sans-serif" font-size="8" fill="#998175" text-anchor="middle">BAKUCHIOL + SQUALANE</text>

              <!-- Bottle 3: Radiance Serum Dropper -->
              <rect x="455" y="230" width="70" height="170" rx="10" fill="url(#serum-glow)"/>
              <!-- Dropper Cap -->
              <rect x="473" y="195" width="34" height="35" rx="3" fill="url(#gold-cap)"/>
              <ellipse cx="490" cy="185" rx="12" ry="16" fill="#FFFFFF"/>
              <text x="490" y="300" font-family="'Jost', sans-serif" font-size="8" font-weight="600" letter-spacing="2" fill="#5A473E" text-anchor="middle">RADIANCE SERUM</text>
            </svg>
          </div>
        </div>
      </section>

      <!-- 2. Benefits Strip (Reference 1) -->
      <section class="benefits-strip-home">
        <div class="benefits-strip-grid">
          <div class="benefit-item">
            <svg class="benefit-icon" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <div>
              <div class="benefit-label">SHOP</div>
              <div class="benefit-desc">Curated essentials for every skin</div>
            </div>
          </div>
          <div class="benefit-item">
            <svg class="benefit-icon" viewBox="0 0 24 24" fill="none"><path d="M12 3v5m-8 6h16a8 8 0 0 1-16 0z"/><path d="M7 14c0 3 2 6 5 6s5-3 5-6"/></svg>
            <div>
              <div class="benefit-label">RITUAL</div>
              <div class="benefit-desc">Simple steps. Lasting results.</div>
            </div>
          </div>
          <div class="benefit-item">
            <svg class="benefit-icon" viewBox="0 0 24 24" fill="none"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            <div>
              <div class="benefit-label">INGREDIENTS</div>
              <div class="benefit-desc">Transparent. Purposeful. Clean.</div>
            </div>
          </div>
          <div class="benefit-item">
            <svg class="benefit-icon" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div>
              <div class="benefit-label">SKIN QUIZ</div>
              <div class="benefit-desc">Find your routine in minutes</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Shop by Category (Reference 1) -->
      <section class="category-section">
        <div class="section-header-row">
          <span class="section-eyebrow-title">SHOP BY CATEGORY</span>
          <a href="/collections/all" class="section-header-link">View all products &rarr;</a>
        </div>

        <div class="category-grid">
          <!-- Card 1: Cleansers -->
          <a href="/collections/all" class="category-card">
            <div class="category-media">
              <svg viewBox="0 0 100 130" fill="none" style="width:100%;height:100%;">
                <ellipse cx="60" cy="50" rx="35" ry="35" fill="#F8E5DB"/>
                <rect x="25" y="40" width="36" height="80" rx="4" fill="#FFFFFF" stroke="#E0CBC0"/>
                <rect x="36" y="24" width="14" height="16" fill="#B38264"/>
                <path d="M43 24 L43 14 L28 17" stroke="#B38264" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="category-info">
              <span class="category-name">CLEANSERS</span>
              <span class="category-sub">Purify & refresh</span>
              <span class="category-arrow">&rarr;</span>
            </div>
          </a>

          <!-- Card 2: Serums -->
          <a href="/collections/all" class="category-card">
            <div class="category-media">
              <svg viewBox="0 0 100 130" fill="none" style="width:100%;height:100%;">
                <ellipse cx="60" cy="60" rx="30" ry="30" fill="#FADFD4"/>
                <rect x="32" y="45" width="28" height="75" rx="6" fill="#FDE7DD" stroke="#E0CBC0"/>
                <rect x="40" y="30" width="12" height="15" fill="#B38264"/>
                <ellipse cx="46" cy="25" rx="6" ry="8" fill="#FFFFFF" stroke="#E0CBC0"/>
              </svg>
            </div>
            <div class="category-info">
              <span class="category-name">SERUMS</span>
              <span class="category-sub">Treat & transform</span>
              <span class="category-arrow">&rarr;</span>
            </div>
          </a>

          <!-- Card 3: Moisturizers -->
          <a href="/collections/all" class="category-card">
            <div class="category-media">
              <svg viewBox="0 0 100 130" fill="none" style="width:100%;height:100%;">
                <ellipse cx="50" cy="50" rx="38" ry="38" fill="#F5E4DA"/>
                <rect x="20" y="60" width="60" height="55" rx="4" fill="#FFFFFF" stroke="#E0CBC0"/>
                <rect x="20" y="55" width="60" height="16" rx="2" fill="#B38264"/>
              </svg>
            </div>
            <div class="category-info">
              <span class="category-name">MOISTURIZERS</span>
              <span class="category-sub">Nourish & protect</span>
              <span class="category-arrow">&rarr;</span>
            </div>
          </a>

          <!-- Card 4: Sun Care -->
          <a href="/collections/all" class="category-card">
            <div class="category-media">
              <svg viewBox="0 0 100 130" fill="none" style="width:100%;height:100%;">
                <ellipse cx="65" cy="55" rx="28" ry="40" fill="#FCE9E0"/>
                <path d="M30 25 L65 25 L55 105 L40 105 Z" fill="#FFFFFF" stroke="#E0CBC0"/>
                <rect x="38" y="105" width="19" height="12" fill="#B38264"/>
              </svg>
            </div>
            <div class="category-info">
              <span class="category-name">SUN CARE</span>
              <span class="category-sub">Shield & care</span>
              <span class="category-arrow">&rarr;</span>
            </div>
          </a>
        </div>
      </section>

      <!-- 4. Bento Row 1 (Reference 1) -->
      <section class="bento-row" id="rituals">
        <!-- Card A: Featured Ritual (Rust 53.5%) -->
        <div class="bento-card-ritual">
          <div class="bento-text-area">
            <div class="bento-eyebrow-light">FEATURED RITUAL</div>
            <h3 class="bento-h3-light">The Hydration<br>Reset Ritual</h3>
            <p class="bento-p-light">A calming routine to cleanse, hydrate, and restore your natural glow.</p>
            <a href="/product" class="btn-outline-white">DISCOVER RITUAL</a>
          </div>
          <div class="bento-media-ritual">
            <svg viewBox="0 0 260 260" fill="none" style="width:100%;height:100%;">
              <ellipse cx="140" cy="220" rx="90" ry="25" fill="#581F16"/>
              <!-- Travertine Platform -->
              <path d="M40 180 L230 170 L240 230 L30 235 Z" fill="#AE7A68"/>
              <!-- Bottles -->
              <rect x="60" y="90" width="36" height="90" rx="4" fill="#FFFFFF"/>
              <rect x="72" y="75" width="12" height="15" fill="#DFBA9D"/>
              <rect x="110" y="115" width="30" height="65" rx="5" fill="#F8E3D8"/>
              <rect x="155" y="130" width="45" height="50" rx="3" fill="#FFFFFF"/>
              <!-- Flower Petal -->
              <path d="M35 195 C25 185 20 205 35 215 C45 220 50 205 35 195 Z" fill="#E28C84"/>
            </svg>
          </div>
        </div>

        <!-- Card B: Ingredient Spotlight (Squalane 45.4%) -->
        <div class="bento-card-ingredient" id="ingredients">
          <div class="ingredient-top">
            <div>
              <span class="hero-eyebrow" style="color:var(--color-rust-btn);">INGREDIENT SPOTLIGHT</span>
              <h3 class="ingredient-h3">Squalane</h3>
            </div>
            <!-- Glass Petri Dish with Pink Flower Petal -->
            <div class="ingredient-dish">
              <svg viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="60" stroke="#DAC1B5" stroke-width="2" fill="#FDFBF9" opacity="0.9"/>
                <circle cx="70" cy="70" r="54" stroke="#EAD5CB" stroke-width="1.5" fill="#FFF5F0"/>
                <!-- Petal in water -->
                <path d="M70 45 C50 55 55 90 70 95 C85 90 90 55 70 45 Z" fill="#D98280" opacity="0.85"/>
                <circle cx="70" cy="70" r="3" fill="#F8E5DB"/>
              </svg>
            </div>
          </div>
          <div>
            <ul class="ingredient-bullets">
              <li>&bull; Deep moisture barrier protection.</li>
              <li>&bull; Silky, weightless biocompatible feel.</li>
              <li>&bull; Sustained moisture locking.</li>
            </ul>
            <a href="/collections/all" class="ingredient-link">EXPLORE INGREDIENTS &rarr;</a>
          </div>
        </div>
      </section>

      <!-- 5. Bento Row 2 (Reference 1) -->
      <section class="bento-row">
        <!-- Card A: Routine Finder (53.5%) -->
        <div class="bento-card-routine">
          <div class="bento-text-area" style="width:55%;">
            <div class="hero-eyebrow">ROUTINE FINDER</div>
            <h3 class="hero-h1" style="font-size:2.2rem;margin-bottom:12px;">Your skin.<br>Your ritual.</h3>
            <p class="hero-desc" style="margin-bottom:24px;">Answer a few quick questions and get a routine made specifically for you.</p>
            <a href="/pages/skin-quiz" class="btn-rust">TAKE THE QUIZ</a>
          </div>
          <!-- Cream Swatch Swirl Media -->
          <div class="routine-media">
            <svg viewBox="0 0 200 200" fill="none">
              <defs>
                <filter id="swatch-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="6" stdDeviation="5" flood-color="#8C5C4E" flood-opacity="0.15"/>
                </filter>
              </defs>
              <path d="M40 150 C70 140 110 160 140 120 C165 85 140 40 110 50 C90 60 100 90 120 100 C145 110 160 90 170 70" stroke="#FFFFFF" stroke-width="26" stroke-linecap="round" filter="url(#swatch-blur)"/>
              <circle cx="45" cy="115" r="5" fill="#FFFFFF"/>
              <circle cx="65" cy="95" r="4" fill="#FFFFFF"/>
            </svg>
          </div>
        </div>

        <!-- Card B: Journal (45.4%) -->
        <div class="bento-card-journal" id="journal">
          <div class="journal-media">
            <svg viewBox="0 0 160 180" fill="none">
              <ellipse cx="80" cy="160" rx="60" ry="12" fill="#D2B9AC"/>
              <!-- Apothecary Dropper Bottles in soft shadow -->
              <rect x="40" y="85" width="30" height="70" rx="4" fill="#E8D5CA"/>
              <rect x="48" y="70" width="14" height="15" fill="#B38264"/>
              <rect x="85" y="65" width="35" height="90" rx="5" fill="#FDFBF9" stroke="#E3CFC4"/>
              <rect x="96" y="50" width="13" height="15" fill="#B38264"/>
              <!-- Botanical branch shadow -->
              <path d="M120 40 Q135 70 145 120" stroke="#BCA396" stroke-width="1.5" stroke-dasharray="2 3"/>
            </svg>
          </div>
          <div class="journal-content">
            <div class="hero-eyebrow">JOURNAL</div>
            <h3 class="hero-h1" style="font-size:2rem;margin-bottom:10px;">Slow care,<br>lasting glow</h3>
            <p class="hero-desc" style="font-size:12px;margin-bottom:20px;">Mindful routines and ingredient insights to support your skin every day.</p>
            <a href="/blogs/news" class="ingredient-link">READ THE JOURNAL &rarr;</a>
          </div>
        </div>
      </section>

      <!-- 6. Subscribe & Save Banner (Reference 1) -->
      <section class="subscribe-section">
        <div class="subscribe-banner-card">
          <!-- Unboxing Packaging Box with Tissue & Bottles -->
          <div class="subscribe-media">
            <svg viewBox="0 0 340 220" fill="none" style="width:100%;height:100%;">
              <defs>
                <linearGradient id="box-outer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#D9C4B7"/>
                  <stop offset="100%" stop-color="#B89B8B"/>
                </linearGradient>
              </defs>
              <ellipse cx="170" cy="195" rx="140" ry="20" fill="#8C6E60" opacity="0.3"/>
              <!-- Mailer Box -->
              <path d="M50 70 L280 60 L260 185 L70 195 Z" fill="url(#box-outer)"/>
              <path d="M50 70 L20 110 L70 195 Z" fill="#A88B7B" opacity="0.9"/>
              <path d="M280 60 L310 100 L260 185 Z" fill="#B39585" opacity="0.9"/>
              <!-- Blush Tissue Paper Fold -->
              <path d="M80 90 C100 65 240 60 250 85 C255 125 240 155 90 160 Z" fill="#F4DCD3"/>
              <!-- Wrapped Skincare Bottles inside -->
              <rect x="105" y="100" width="30" height="55" rx="3" fill="#FFFFFF" transform="rotate(-15 105 100)"/>
              <rect x="145" y="95" width="28" height="52" rx="3" fill="#FFFFFF" transform="rotate(5 145 95)"/>
              <rect x="185" y="102" width="32" height="36" rx="4" fill="#FFFFFF" transform="rotate(12 185 102)"/>
              <!-- Wordmark on front -->
              <text x="165" y="185" font-family="'Cormorant Garamond', Georgia, serif" font-size="10" font-weight="600" letter-spacing="3" fill="#583A2E" text-anchor="middle">KAYRA BEAUTY</text>
            </svg>
          </div>

          <!-- Text & Button -->
          <div class="subscribe-content">
            <span class="hero-eyebrow" style="color:#583A2E;">NEVER RUN LOW</span>
            <h3 class="subscribe-h3">Subscribe & stay<br>effortlessly consistent</h3>
            <p class="subscribe-desc">Flexible delivery. Pause, adjust, or cancel anytime with zero commitments.</p>
            <a href="/collections/all" class="btn-rust">LEARN MORE</a>
          </div>
        </div>
      </section>

      <!-- 7. Frequently Asked Questions (Reference 1) -->
      <section class="faq-section-home" id="faqs">
        <div class="section-header-row">
          <span class="section-eyebrow-title">FREQUENTLY ASKED</span>
          <a href="/pages/faqs" class="section-header-link">View all FAQs &rarr;</a>
        </div>

        <div class="faq-grid-2col">
          <!-- FAQ 1 -->
          <div class="faq-item-outline" onclick="this.classList.toggle('is-open')">
            <button type="button" class="faq-question-btn">
              <span>Are your products suitable for sensitive skin?</span>
              <span class="faq-icon-toggle">+</span>
            </button>
            <div class="faq-answer">
              Yes, all KAYRA Beauty formulations undergo rigorous clinical dermatological testing on reactive skin barriers without synthetic fragrance or common sensitizers.
            </div>
          </div>

          <!-- FAQ 2 -->
          <div class="faq-item-outline" onclick="this.classList.toggle('is-open')">
            <button type="button" class="faq-question-btn">
              <span>How do I build a personalized routine?</span>
              <span class="faq-icon-toggle">+</span>
            </button>
            <div class="faq-answer">
              Start with our 3-step core ritual (Cleanser, Barrier Serum, and Lipid Cream), or take our 2-minute diagnostic Skin Quiz for customized active matching.
            </div>
          </div>

          <!-- FAQ 3 -->
          <div class="faq-item-outline" onclick="this.classList.toggle('is-open')">
            <button type="button" class="faq-question-btn">
              <span>What makes your ingredients biocompatible?</span>
              <span class="faq-icon-toggle">+</span>
            </button>
            <div class="faq-answer">
              We calibrate molecular lipid sizes and pH levels to match the skin's natural hydrolipidic film, ensuring rapid cellular absorption without surface buildup.
            </div>
          </div>

          <!-- FAQ 4 -->
          <div class="faq-item-outline" onclick="this.classList.toggle('is-open')">
            <button type="button" class="faq-question-btn">
              <span>Where do you ship?</span>
              <span class="faq-icon-toggle">+</span>
            </button>
            <div class="faq-answer">
              We offer carbon-neutral cold-chain shipping across North America, Europe, Australia, and selected worldwide regions with complimentary delivery over $75.
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Luxury Footer -->
    <footer class="site-footer-home">
      <div class="site-footer-inner">
        <div class="footer-col">
          <span class="kayra-brand-logo__wordmark" style="color:#FFF;font-size:1.8rem;display:block;margin-bottom:6px;">KAYRA</span>
          <span class="kayra-brand-logo__subtitle" style="color:#DEBC8C;margin-bottom:16px;display:block;">BEAUTY &bull; BOTANICAL ALCHEMY</span>
          <p style="font-size:13px;line-height:1.6;color:rgba(248,232,227,0.75);max-width:300px;">
            Thoughtful botanical skincare engineered with biocompatible cold-pressed actives and clinically proven peptides.
          </p>
        </div>
        <div class="footer-col">
          <h4>COLLECTIONS</h4>
          <ul>
            <li><a href="/collections/all">All Formulations</a></li>
            <li><a href="/collections/all">Clean Actives</a></li>
            <li><a href="/collections/all">Barrier Care</a></li>
            <li><a href="/collections/all">Gift Sets</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>ATELIER</h4>
          <ul>
            <li><a href="#rituals">The 4-Step Ritual</a></li>
            <li><a href="#ingredients">Clean Standards</a></li>
            <li><a href="/pages/skin-quiz">Skin Quiz</a></li>
            <li><a href="/pages/faqs">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>NEWSLETTER</h4>
          <p style="font-size:12px;color:rgba(248,232,227,0.7);margin-bottom:12px;">Receive early access to seasonal batches and private masterclasses.</p>
          <div style="display:flex;gap:6px;">
            <input type="email" placeholder="Your email address" style="padding:10px 14px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:#fff;font-size:12px;flex:1;outline:none;">
            <button type="button" class="btn-rust" style="padding:10px 16px;font-size:11px;" onclick="alert('Thank you for subscribing!')">JOIN</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>&copy; 2026 KAYRA Beauty Inc. All rights reserved. Shopify OS 2.0 Certified.</div>
        <div style="display:flex;gap:18px;">
          <a href="#" style="color:inherit;text-decoration:none;">Privacy Policy</a>
          <a href="#" style="color:inherit;text-decoration:none;">Terms of Service</a>
          <a href="/admin" style="color:#DEBC8C;text-decoration:none;font-weight:600;">Merchant Admin</a>
        </div>
      </div>
    </footer>
  </body>
</html>
`;

fs.writeFileSync('preview/index.html', htmlContent);
console.log('Successfully generated preview/index.html (Reference 1 Replica)!');
