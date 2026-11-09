const fs = require('fs');

const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SilkSkin Serum | KAYRA BEAUTY — Forest & Gold Luxury</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/theme.css?v=2.2.0">
    <link rel="stylesheet" href="/assets/aura-base.css?v=2.2.0">
    <script src="/assets/theme.js?v=2.1.0" defer></script>
    <style>
      :root {
        --color-forest: #1E4123;
        --color-forest-dark: #163219;
        --color-forest-light: #234527;
        --color-gold: #BA934E;
        --color-gold-star: #E2C25D;
        --color-stock-bg: #E7F6EA;
      }
      body.template-product {
        background-color: #FFFFFF;
        font-family: 'Poppins', sans-serif;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .theme-preview-bar {
        background: #163219;
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

      /* 1. Top Green Announcement Bar (Reference 2) */
      .announcement-bar-ref2 {
        background-color: var(--color-forest);
        color: #FFFFFF;
        font-size: 12px;
        padding: 10px 24px;
      }
      .announcement-bar-ref2__inner {
        max-width: 1240px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .announcement-bar-ref2 a {
        color: #DEBC8C;
        text-decoration: underline;
        font-weight: 600;
        margin-left: 4px;
      }
      .social-icons-bar {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .social-icons-bar a {
        color: #FFFFFF;
        text-decoration: none;
        display: flex;
        align-items: center;
      }

      /* 2. White Header (Reference 2) */
      .site-header-ref2 {
        background: #FFFFFF;
        border-bottom: 1px solid #EEEEEE;
        padding: 16px 0;
      }
      .site-header-ref2__inner {
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .nav-links-ref2 {
        display: flex;
        gap: 28px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .nav-links-ref2 a {
        font-family: 'Poppins', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #333333;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .nav-links-ref2 a:hover,
      .nav-links-ref2 a.active {
        color: var(--color-forest);
        font-weight: 600;
      }
      .header-actions-ref2 {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .action-icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #333333;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* 3. Breadcrumb Hero Band (Reference 2) */
      .breadcrumb-band {
        background-color: #F5F5F5;
        padding: 36px 20px;
        text-align: center;
        border-bottom: 1px solid #EEEEEE;
      }
      .breadcrumb-band h1 {
        font-size: 32px;
        font-weight: 700;
        color: #1A1A1A;
        margin: 0 0 8px 0;
      }
      .breadcrumb-links {
        font-size: 12px;
        color: #777777;
      }
      .breadcrumb-links a {
        color: #555555;
        text-decoration: none;
      }
      .breadcrumb-links span.current {
        color: #1A1A1A;
        font-weight: 600;
      }

      /* 4. Product Container Grid (Reference 2) */
      .product-detail-container {
        max-width: 1200px;
        margin: 50px auto;
        padding: 0 24px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        align-items: start;
      }
      @media (max-width: 900px) {
        .product-detail-container {
          grid-template-columns: 1fr;
          gap: 36px;
        }
      }

      /* Gallery Left Column */
      .gallery-wrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .gallery-main-frame {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        aspect-ratio: 1 / 1;
        background: #F8F9FA;
        border: 1px solid #EEEEEE;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gallery-circle-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--color-forest-light);
        color: #FFFFFF;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10;
        transition: background-color 0.2s ease;
      }
      .gallery-circle-btn:hover {
        background-color: var(--color-forest-dark);
      }
      .gallery-circle-btn--prev { left: 16px; }
      .gallery-circle-btn--next { right: 16px; }

      .gallery-thumbnails {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      .thumb-card {
        aspect-ratio: 1 / 1;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        padding: 4px;
        background: #FDFDFD;
        transition: border-color 0.2s ease;
      }
      .thumb-card.active {
        border: 2px solid var(--color-forest-light) !important;
      }

      /* Buy Box Right Column */
      .buybox-wrapper {
        display: flex;
        flex-direction: column;
      }
      .product-category-tag {
        font-size: 13px;
        color: #777777;
        font-weight: 500;
        margin-bottom: 6px;
      }
      .product-title-row {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 10px;
      }
      .product-h1 {
        font-size: 32px;
        font-weight: 700;
        color: #1A1A1A;
        margin: 0;
      }
      .badge-in-stock {
        background-color: var(--color-stock-bg);
        color: var(--color-forest);
        padding: 4px 12px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
      }
      .product-rating-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: #666666;
        margin-bottom: 14px;
      }
      .stars-gold {
        color: var(--color-gold-star);
        display: inline-flex;
        gap: 2px;
      }
      .product-price-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 16px;
      }
      .price-gold {
        font-size: 26px;
        font-weight: 700;
        color: var(--color-gold);
      }
      .price-compare {
        font-size: 16px;
        color: #999999;
        text-decoration: line-through;
      }
      .product-short-desc {
        font-size: 13px;
        line-height: 1.6;
        color: #666666;
        margin-bottom: 24px;
      }
      .volume-label {
        font-size: 13px;
        font-weight: 600;
        color: #1A1A1A;
        margin-bottom: 8px;
      }
      .volume-pills-row {
        display: flex;
        gap: 10px;
        margin-bottom: 24px;
      }
      .volume-pill {
        padding: 8px 18px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid #E5E5E5;
        background: #FFFFFF;
        color: #333333;
        transition: all 0.2s ease;
      }
      .volume-pill.active {
        background-color: var(--color-forest-light);
        color: #FFFFFF;
        border-color: var(--color-forest-light);
        font-weight: 600;
      }
      .actions-flex-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
      }
      .qty-stepper {
        display: inline-flex;
        align-items: center;
        border: 1px solid #E5E5E5;
        border-radius: 6px;
        height: 48px;
        padding: 0 4px;
      }
      .qty-stepper button {
        width: 32px;
        height: 40px;
        border: none;
        background: transparent;
        font-size: 16px;
        cursor: pointer;
        color: #666;
      }
      .qty-stepper input {
        width: 34px;
        text-align: center;
        border: none;
        font-size: 14px;
        font-weight: 600;
        color: #1A1A1A;
      }
      .btn-atc-pill {
        flex: 1;
        height: 48px;
        background-color: var(--color-forest-light);
        color: #FFFFFF;
        border: none;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .btn-atc-pill:hover {
        background-color: var(--color-forest-dark);
      }
      .btn-buynow-pill {
        flex: 1;
        height: 48px;
        background-color: var(--color-gold);
        color: #FFFFFF;
        border: none;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .btn-buynow-pill:hover {
        background-color: #9C7838;
      }
      .btn-wishlist-round {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid #E5E5E5;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #666666;
        transition: all 0.2s ease;
      }
      .btn-wishlist-round:hover {
        border-color: var(--color-forest);
        color: var(--color-forest);
      }
      .product-meta-block {
        font-size: 13px;
        color: #555555;
        line-height: 2;
        border-top: 1px solid #EEEEEE;
        padding-top: 16px;
      }
      .product-meta-block strong {
        color: #1A1A1A;
      }

      /* 5. Product Tabs (Reference 2) */
      .tabs-nav-center {
        display: flex;
        justify-content: center;
        gap: 48px;
        border-bottom: 1px solid #EEEEEE;
        margin: 60px 0 36px;
      }
      .tab-header-btn {
        background: none;
        border: none;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #777777;
        padding: 12px 6px;
        cursor: pointer;
        position: relative;
        transition: color 0.2s ease;
      }
      .tab-header-btn:hover {
        color: var(--color-forest);
      }
      .tab-header-btn.active {
        color: var(--color-forest);
        font-weight: 600;
      }
      .tab-header-btn.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background-color: var(--color-forest);
        border-radius: 2px 2px 0 0;
      }

      /* 6. Review Summary & Breakdown (Reference 2) */
      .reviews-section-container {
        max-width: 1000px;
        margin: 0 auto 80px;
        padding: 0 24px;
      }
      .review-breakdown-card {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 40px;
        align-items: center;
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid #EEEEEE;
      }
      @media (max-width: 768px) {
        .review-breakdown-card {
          grid-template-columns: 1fr;
        }
      }
      .score-box {
        text-align: center;
      }
      .big-score {
        font-size: 52px;
        font-weight: 700;
        color: #1A1A1A;
        line-height: 1;
      }
      .out-of-five {
        font-size: 13px;
        color: #777777;
        margin-bottom: 6px;
      }
      .bars-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .rating-bar-row {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 12px;
        color: #666666;
      }
      .rating-bar-track {
        flex: 1;
        height: 8px;
        background-color: #F0F0F0;
        border-radius: 4px;
        overflow: hidden;
      }
      .rating-bar-fill {
        height: 100%;
        background-color: var(--color-gold-star);
        border-radius: 4px;
      }

      /* Review List */
      .reviews-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      .reviews-list-title {
        font-size: 18px;
        font-weight: 700;
        color: #1A1A1A;
      }
      .review-card-item {
        padding: 24px 0;
        border-bottom: 1px solid #EEEEEE;
      }
      .reviewer-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      .reviewer-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .reviewer-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #E8EFEA;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: var(--color-forest);
      }
      .reviewer-name {
        font-size: 14px;
        font-weight: 600;
        color: #1A1A1A;
      }
      .verified-badge {
        color: #2E7D32;
        font-size: 11px;
        font-weight: 600;
        margin-left: 6px;
      }
      .review-date {
        font-size: 12px;
        color: #999999;
      }
      .review-headline {
        font-size: 14px;
        font-weight: 600;
        color: #1A1A1A;
        margin: 8px 0 6px 0;
      }
      .review-body {
        font-size: 13px;
        line-height: 1.6;
        color: #666666;
        margin-bottom: 12px;
      }
      .review-photos-grid {
        display: flex;
        gap: 10px;
      }
      .review-photo-thumb {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        background: #F5F5F5;
        border: 1px solid #EEEEEE;
        overflow: hidden;
      }
    </style>
  </head>

  <body class="template-product">
    <!-- Local Developer Status Bar -->
    <div class="theme-preview-bar">
      <div>
        <span class="theme-preview-tag">SHOPIFY OS 2.0</span>
        <span>KAYRA BEAUTY — Forest & Gold Preset (Reference 2)</span>
      </div>
      <div>
        <span>Explore:</span>
        <a href="/">Home (Ref 1)</a>
        <a href="/product">Product Detail (Ref 2)</a>
        <a href="/admin" target="_blank" style="background:var(--color-gold);color:#fff;padding:3px 10px;border-radius:4px;text-decoration:none;">🔒 Admin Portal</a>
        <a href="javascript:void(0)" onclick="alert('Bag Drawer: 1 item ($48.00)')">Bag Drawer (1)</a>
      </div>
    </div>

    <!-- 1. Top Green Announcement Bar (Reference 2) -->
    <div class="announcement-bar-ref2">
      <div class="announcement-bar-ref2__inner">
        <div>Call Us: +123-456-789</div>
        <div>
          Sign up and GET 20% OFF for your first order.
          <a href="/collections/all">Sign up now</a>
        </div>
        <div class="social-icons-bar">
          <a href="#" aria-label="Facebook"><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="#" aria-label="Twitter"><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
          <a href="#" aria-label="Pinterest"><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.8-1.2 3.3-2.9 3.8-.2-.3-.3-.8-.3-1.2 0-.4.1-.7.2-1.1.2-.8.6-2.4.6-2.4s-.2-.4-.2-.9c0-.9.5-1.5 1.1-1.5.5 0 .8.4.8.9 0 .5-.3 1.3-.5 2-.1.6.3 1.1.9 1.1 1.1 0 1.9-1.2 1.9-2.9 0-1.5-1.1-2.6-2.7-2.6-2 0-3.1 1.5-3.1 3 0 .6.2 1.2.5 1.6l-.3 1.2c-.3-.2-.7-.7-.9-1.3-.3-1-.2-2.1.3-3.1z"/></svg></a>
        </div>
      </div>
    </div>

    <!-- 2. Pure White Header (Reference 2) -->
    <header class="site-header-ref2">
      <div class="site-header-ref2__inner">
        <!-- Brand Logo -->
        <a href="/" style="text-decoration:none;display:flex;align-items:center;gap:8px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-forest)" stroke-width="2">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          </svg>
          <span style="font-family:'Poppins',sans-serif;font-weight:700;font-size:20px;color:#1A1A1A;">KAYRA Beauty</span>
        </a>

        <!-- Navigation Links -->
        <nav>
          <ul class="nav-links-ref2">
            <li><a href="/">Home</a></li>
            <li><a href="/collections/all" class="active">Shop</a></li>
            <li><a href="/collections/all">Skin Care</a></li>
            <li><a href="/collections/all">Makeup</a></li>
            <li><a href="/collections/all">Hair Care</a></li>
            <li><a href="/pages/about-us">About Us</a></li>
            <li><a href="/blogs/news">Blogs</a></li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="header-actions-ref2">
          <button type="button" class="action-icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button type="button" class="action-icon-btn" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button type="button" class="action-icon-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button type="button" class="action-icon-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 3. Breadcrumb Hero Band (Reference 2) -->
    <div class="breadcrumb-band">
      <h1>Shop</h1>
      <div class="breadcrumb-links">
        <a href="/">Home</a> / <a href="/collections/all">Shop</a> / <span class="current">Product Details</span>
      </div>
    </div>

    <!-- 4. Product Detail Section (Reference 2) -->
    <main class="product-detail-container">
      <!-- Left Column: Gallery -->
      <div class="gallery-wrapper">
        <div class="gallery-main-frame">
          <!-- Circular Nav Buttons -->
          <button type="button" class="gallery-circle-btn gallery-circle-btn--prev" aria-label="Previous image">&lt;</button>
          <button type="button" class="gallery-circle-btn gallery-circle-btn--next" aria-label="Next image">&gt;</button>

          <!-- Main Serum Product Render with Botanical Leaves (Reference 2) -->
          <svg viewBox="0 0 500 500" fill="none" style="width:100%;height:100%;">
            <defs>
              <linearGradient id="podium" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stop-color="#EFE8DD"/>
                <stop offset="100%" stop-color="#DACFBE"/>
              </linearGradient>
              <linearGradient id="serum-liquid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FBF2DE"/>
                <stop offset="100%" stop-color="#F5DFB5"/>
              </linearGradient>
              <linearGradient id="gold-cap-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#E5CA92"/>
                <stop offset="100%" stop-color="#BA934E"/>
              </linearGradient>
            </defs>
            <rect width="500" height="500" fill="#F8F9FA"/>
            <!-- Botanical Cannabis/Fern Green Leaves Background -->
            <path d="M40 180 C80 120 160 140 180 220 C140 240 70 240 40 180 Z" fill="#3D7048" opacity="0.8"/>
            <path d="M80 120 C120 70 200 90 220 170 C170 190 100 180 80 120 Z" fill="#2E5C38" opacity="0.85"/>
            <path d="M340 130 C380 70 460 90 480 170 C430 190 360 180 340 130 Z" fill="#2E5C38" opacity="0.85"/>
            <path d="M370 220 C420 180 480 200 490 280 C440 300 380 290 370 220 Z" fill="#3D7048" opacity="0.8"/>

            <!-- Travertine Podium Slab -->
            <ellipse cx="250" cy="400" rx="200" ry="40" fill="url(#podium)"/>
            <ellipse cx="250" cy="410" rx="190" ry="35" fill="#C4B8A5" opacity="0.5"/>

            <!-- Serum Bottle 1 (Large 50ml) -->
            <rect x="180" y="240" width="85" height="150" rx="10" fill="url(#serum-liquid)" stroke="#D8C7A5"/>
            <!-- Dropper Pipette -->
            <rect x="207" y="200" width="30" height="40" rx="4" fill="url(#gold-cap-2)"/>
            <ellipse cx="222" cy="185" rx="14" ry="18" fill="#FFFFFF"/>

            <!-- Serum Bottle 2 (Travel 30ml) -->
            <rect x="290" y="280" width="75" height="110" rx="8" fill="url(#serum-liquid)" stroke="#D8C7A5"/>
            <rect x="315" y="250" width="26" height="30" rx="3" fill="url(#gold-cap-2)"/>
            <ellipse cx="328" cy="238" rx="11" ry="14" fill="#FFFFFF"/>
          </svg>
        </div>

        <!-- 4 Thumbnails (Reference 2) -->
        <div class="gallery-thumbnails">
          <div class="thumb-card active">
            <svg viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="#F8F9FA"/><rect x="35" y="40" width="30" height="50" rx="4" fill="#F5DFB5"/><rect x="44" y="25" width="12" height="15" fill="#BA934E"/></svg>
          </div>
          <div class="thumb-card">
            <svg viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="#F8F9FA"/><circle cx="50" cy="50" r="30" fill="#E8EFEA"/><rect x="42" y="30" width="16" height="40" rx="4" fill="#F5DFB5"/></svg>
          </div>
          <div class="thumb-card">
            <svg viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="#F8F9FA"/><path d="M20 70 C40 30 70 30 90 70 Z" fill="#2E5C38" opacity="0.6"/><rect x="38" y="45" width="24" height="45" rx="4" fill="#F5DFB5"/></svg>
          </div>
          <div class="thumb-card">
            <svg viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="#F8F9FA"/><rect x="30" y="35" width="40" height="55" rx="4" fill="#FFF" stroke="#E5E5E5"/></svg>
          </div>
        </div>
      </div>

      <!-- Right Column: Buy Box -->
      <div class="buybox-wrapper">
        <span class="product-category-tag">Skin Care</span>
        <div class="product-title-row">
          <h1 class="product-h1">SilkSkin Serum</h1>
          <span class="badge-in-stock">In Stock</span>
        </div>

        <!-- Ratings Row -->
        <div class="product-rating-row">
          <div class="stars-gold">★★★★★</div>
          <span><strong>4.8</strong> (245 Review)</span>
        </div>

        <!-- Price Row -->
        <div class="product-price-row">
          <span class="price-gold">$48.00</span>
          <span class="price-compare">$60.00</span>
        </div>

        <!-- Short Description -->
        <p class="product-short-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <!-- Size / Volume Option Pills -->
        <div class="volume-label">Size/Volume</div>
        <div class="volume-pills-row">
          <div class="volume-pill active" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">30 ml</div>
          <div class="volume-pill" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">60ml</div>
          <div class="volume-pill" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">80ml</div>
          <div class="volume-pill" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">100ml</div>
        </div>

        <!-- Actions Row: Stepper + Add To Cart + Buy Now + Wishlist -->
        <div class="actions-flex-row">
          <div class="qty-stepper">
            <button type="button" onclick="let v=document.getElementById('pQty');if(v.value>1)v.value--;">&minus;</button>
            <input type="text" id="pQty" value="1" readonly>
            <button type="button" onclick="let v=document.getElementById('pQty');v.value++;">&plus;</button>
          </div>
          <button type="button" class="btn-atc-pill" onclick="alert('SilkSkin Serum added to Cart!')">Add To Cart</button>
          <button type="button" class="btn-buynow-pill" onclick="alert('Proceeding to instant checkout...')">Buy Now</button>
          <button type="button" class="btn-wishlist-round" aria-label="Wishlist" onclick="alert('Added to wishlist ♡')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <!-- SKU / Tags / Share Meta -->
        <div class="product-meta-block">
          <div><strong>SKU :</strong> GRFR85648HGJ</div>
          <div><strong>Tags :</strong> Skincare, Serums, Vitamin C</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
            <strong>Share :</strong>
            <span class="aura-share-icon">f</span>
            <span class="aura-share-icon">P</span>
            <span class="aura-share-icon">t</span>
            <span class="aura-share-icon">in</span>
          </div>
        </div>
      </div>
    </main>

    <!-- 5. Centered Product Tabs (Reference 2) -->
    <div style="max-width:1200px;margin:0 auto;padding:0 24px;">
      <div class="tabs-nav-center">
        <button type="button" class="tab-header-btn" onclick="document.querySelectorAll('.tab-header-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');">Description</button>
        <button type="button" class="tab-header-btn" onclick="document.querySelectorAll('.tab-header-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');">Additional Information</button>
        <button type="button" class="tab-header-btn active" onclick="document.querySelectorAll('.tab-header-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');">Review</button>
      </div>
    </div>

    <!-- 6. Review Summary & Breakdown Section (Reference 2) -->
    <section class="reviews-section-container">
      <div class="review-breakdown-card">
        <!-- Big Rating Score -->
        <div class="score-box">
          <div class="big-score">4.8</div>
          <div class="out-of-five">out of 5</div>
          <div class="stars-gold" style="font-size:18px;">★★★★★</div>
          <div style="font-size:12px;color:#777;margin-top:4px;">(245 Review)</div>
        </div>

        <!-- 5-Star Breakdown Progress Bars -->
        <div class="bars-box">
          <div class="rating-bar-row">
            <span style="width:40px;">5 Star</span>
            <div class="rating-bar-track">
              <div class="rating-bar-fill" style="width: 90%;"></div>
            </div>
          </div>
          <div class="rating-bar-row">
            <span style="width:40px;">4 Star</span>
            <div class="rating-bar-track">
              <div class="rating-bar-fill" style="width: 36%;"></div>
            </div>
          </div>
          <div class="rating-bar-row">
            <span style="width:40px;">3 Star</span>
            <div class="rating-bar-track">
              <div class="rating-bar-fill" style="width: 15%;"></div>
            </div>
          </div>
          <div class="rating-bar-row">
            <span style="width:40px;">2 Star</span>
            <div class="rating-bar-track">
              <div class="rating-bar-fill" style="width: 5%;"></div>
            </div>
          </div>
          <div class="rating-bar-row">
            <span style="width:40px;">1 Star</span>
            <div class="rating-bar-track">
              <div class="rating-bar-fill" style="width: 2%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Review List -->
      <div class="reviews-list-header">
        <span class="reviews-list-title">Review List</span>
        <div style="font-size:12px;color:#777;">
          Showing 1-4 of 24 results &nbsp;&bull;&nbsp;
          <span>Sort by : <strong>Newest &#9662;</strong></span>
        </div>
      </div>

      <!-- Review 1: Kristin Watson -->
      <div class="review-card-item">
        <div class="reviewer-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">KW</div>
            <div>
              <div class="reviewer-name">Kristin Watson <span class="verified-badge">(Verified)</span></div>
              <div class="stars-gold" style="font-size:12px;">★★★★★ <span style="color:#333;font-weight:600;margin-left:4px;">5.0</span></div>
            </div>
          </div>
          <span class="review-date">1 month ago</span>
        </div>
        <div class="review-headline">Absolutely love this product!</div>
        <div class="review-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div class="review-photos-grid">
          <div class="review-photo-thumb"><svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#EAE5DB"/><circle cx="40" cy="40" r="15" fill="#BA934E" opacity="0.6"/></svg></div>
          <div class="review-photo-thumb"><svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#EAE5DB"/><rect x="25" y="25" width="30" height="30" fill="#234527" opacity="0.6"/></svg></div>
          <div class="review-photo-thumb"><svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#EAE5DB"/><circle cx="40" cy="40" r="18" fill="#D9C9B8"/></svg></div>
        </div>
      </div>

      <!-- Review 2: Jenny Wilson -->
      <div class="review-card-item">
        <div class="reviewer-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">JW</div>
            <div>
              <div class="reviewer-name">Jenny Wilson <span class="verified-badge">(Verified)</span></div>
              <div class="stars-gold" style="font-size:12px;">★★★★★ <span style="color:#333;font-weight:600;margin-left:4px;">5.0</span></div>
            </div>
          </div>
          <span class="review-date">2 month ago</span>
        </div>
        <div class="review-headline">Perfect for my skincare routine!</div>
        <div class="review-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>

      <!-- Review 3: Darlene Robertson -->
      <div class="review-card-item">
        <div class="reviewer-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">DR</div>
            <div>
              <div class="reviewer-name">Darlene Robertson <span class="verified-badge">(Verified)</span></div>
              <div class="stars-gold" style="font-size:12px;">★★★★★ <span style="color:#333;font-weight:600;margin-left:4px;">5.0</span></div>
            </div>
          </div>
          <span class="review-date">2 month ago</span>
        </div>
        <div class="review-headline">My barrier feels healed and renewed</div>
        <div class="review-body">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. High recommend to anyone with dry skin.
        </div>
      </div>
    </section>

    <!-- Luxury Footer -->
    <footer style="background:#1E4123;color:#F8F5EF;padding:50px 0 24px;border-top:1px solid #163219;">
      <div style="max-width:1200px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center;font-size:13px;">
        <div>&copy; 2026 KAYRA Beauty Inc. All rights reserved. Shopify OS 2.0 Certified.</div>
        <div style="display:flex;gap:20px;">
          <a href="/" style="color:#DEBC8C;text-decoration:none;">Homepage</a>
          <a href="/collections/all" style="color:inherit;text-decoration:none;">Shop All</a>
          <a href="/admin" style="color:#DEBC8C;text-decoration:none;font-weight:600;">Admin Hub</a>
        </div>
      </div>
    </footer>
  </body>
</html>
`;

fs.writeFileSync('preview/product.html', htmlContent);
console.log('Successfully generated preview/product.html (Reference 2 Replica)!');
