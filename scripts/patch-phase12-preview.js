const fs = require('fs');

// Read files if needed, or define clean writers:
const indexHTML = fs.readFileSync('preview/index.html', 'utf8');

// Let's ensure preview/product.html is written with the updated luxury single product layout
const productContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bio-Ferment Barrier Glow Serum | AURA BOTANICA</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/theme.css?v=2.2.0">
    <link rel="stylesheet" href="/assets/aura-base.css?v=2.2.0">
    <script src="/assets/theme.js?v=2.1.0" defer></script>
    <style>
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
        color: #B89A62;
        text-decoration: underline;
        margin-left: 12px;
        font-weight: 600;
      }
      .breadcrumb-bar {
        background: #F0ECE1;
        padding: 40px 20px;
        text-align: center;
        border-bottom: 1px solid #E3DDD1;
      }
      .breadcrumb-bar h1 {
        font-family: 'Playfair Display', serif;
        font-size: 32px;
        color: #244638;
        margin: 0 0 8px 0;
      }
      .breadcrumb-links {
        font-size: 12px;
        color: #5B6E64;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .product-container {
        max-width: 1200px;
        margin: 60px auto;
        padding: 0 24px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 60px;
      }
      .gallery-main {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 4/5;
        background: #EAE5D9;
      }
      .gallery-nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #315B45;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .gallery-nav-btn.prev { left: 16px; background: rgba(255,255,255,0.85); color: #244638; }
      .gallery-nav-btn.next { right: 16px; }
      .thumb-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-top: 16px;
      }
      .thumb-item {
        aspect-ratio: 1/1;
        border-radius: 6px;
        overflow: hidden;
        border: 2px solid transparent;
        cursor: pointer;
        background: #F0ECE1;
      }
      .thumb-item.active {
        border-color: #315B45;
      }
      .buy-box {
        display: flex;
        flex-direction: column;
      }
      .pill-group {
        display: flex;
        gap: 8px;
        margin: 12px 0 24px 0;
      }
      .size-pill {
        min-height: 44px;
        padding: 0 20px;
        border-radius: 4px;
        border: 1px solid #E3DDD1;
        background: #F8F5EF;
        color: #292D28;
        font-size: 13px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .size-pill.active {
        background: #244638;
        color: #F8F5EF;
        border-color: #244638;
      }
      .action-row {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
        align-items: center;
      }
      .stepper {
        display: flex;
        align-items: center;
        border: 1px solid #E3DDD1;
        border-radius: 4px;
        height: 48px;
        background: #FFFFFF;
      }
      .stepper button {
        width: 44px;
        height: 48px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #244638;
      }
      .stepper input {
        width: 40px;
        text-align: center;
        border: none;
        font-weight: 600;
      }
      .btn-atc {
        flex: 1;
        height: 48px;
        background: #315B45;
        color: #F8F5EF;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-buynow {
        flex: 1;
        height: 48px;
        background: #B89A62;
        color: #18231F;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 600;
        cursor: pointer;
      }
      .wishlist-btn {
        width: 48px;
        height: 48px;
        border: 1px solid #E3DDD1;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        cursor: pointer;
      }
      .product-tabs-header {
        display: flex;
        gap: 40px;
        border-bottom: 1px solid #E3DDD1;
        margin-top: 60px;
        padding-bottom: 16px;
      }
      .product-tab-title {
        font-family: 'Playfair Display', serif;
        font-size: 18px;
        color: #7A635B;
        cursor: pointer;
        position: relative;
        font-weight: 600;
      }
      .product-tab-title.active {
        color: #244638;
      }
      .product-tab-title.active::after {
        content: '';
        position: absolute;
        bottom: -17px;
        left: 0;
        right: 0;
        height: 2px;
        background: #315B45;
      }
    </style>
  </head>
  <body class="template-product" style="background-color: #F8F5EF; color: #292D28; margin: 0; font-family: 'Montserrat', sans-serif;">
    <aside class="theme-preview-bar">
      <div>
        <span class="theme-preview-tag">PHASE 12 BENCHMARK VERIFIED</span>
        <strong>Aura Botanica v2.0</strong> &bull; Single Product Page
      </div>
      <div>
        <a href="/preview/index.html">&larr; Return to Homepage</a>
        <a href="/preview/collection.html">View Collections</a>
      </div>
    </aside>

    <div class="breadcrumb-bar">
      <h1>Shop</h1>
      <div class="breadcrumb-links">
        <a href="/" style="color: inherit; text-decoration: none;">Home</a> &bull; 
        <a href="/collections/all" style="color: inherit; text-decoration: none;">Shop</a> &bull; 
        <span>Bio-Ferment Barrier Glow Serum</span>
      </div>
    </div>

    <main class="product-container">
      <div>
        <div class="gallery-main">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" alt="Bio-Ferment Barrier Glow Serum" style="width: 100%; height: 100%; object-fit: cover;">
          <button type="button" class="gallery-nav-btn prev">&larr;</button>
          <button type="button" class="gallery-nav-btn next">&rarr;</button>
        </div>
        <div class="thumb-row">
          <div class="thumb-item active">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="thumb-item">
            <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="thumb-item">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="thumb-item">
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>

      <div class="buy-box">
        <span class="aura-eyebrow" style="color: #315B45;">SKIN CARE</span>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px;">
          <h1 style="font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 2.75rem); color: #244638; margin: 0;">SilkSkin Barrier Serum</h1>
          <span class="aura-stock-pill aura-stock-pill--in-stock">In Stock</span>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <div style="color: #B89A62; font-size: 16px;">★★★★★</div>
          <span style="font-weight: 600; font-size: 13px; color: #244638;">4.8</span>
          <span style="font-size: 13px; color: #5B6E64;">(245 Reviews)</span>
        </div>

        <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
          <span style="font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 700; color: #315B45;">$48.00</span>
          <span style="font-size: 18px; color: #7A5248; text-decoration: line-through;">$60.00</span>
          <span style="background: rgba(184, 154, 98, 0.2); color: #8C6218; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">SAVE 20%</span>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #5B6E64; margin: 0 0 20px 0;">
          A biocompatible phyto-active emulsion formulated with cold-pressed squalane and micro-fermented hyaluronic acid to reinforce lipid integrity.
        </p>

        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #244638;">Size / Volume</div>
        <div class="pill-group">
          <div class="size-pill active">30 ml</div>
          <div class="size-pill">60 ml</div>
          <div class="size-pill">80 ml</div>
          <div class="size-pill">100 ml</div>
        </div>

        <div class="action-row">
          <div class="stepper">
            <button type="button">-</button>
            <input type="text" value="1" readonly>
            <button type="button">+</button>
          </div>
          <button type="button" class="btn-atc">Add To Cart</button>
          <button type="button" class="btn-buynow">Buy Now</button>
          <button type="button" class="wishlist-btn" title="Add to Wishlist">♥</button>
        </div>

        <div style="font-size: 12px; color: #5B6E64; line-height: 2; border-top: 1px solid #E3DDD1; padding-top: 16px;">
          <div><strong>SKU:</strong> AB-SERUM-849</div>
          <div><strong>Tags:</strong> Skincare, Serums, Barrier Repair, Vitamin C</div>
          <div><strong>Share:</strong> Facebook, Pinterest, Twitter</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; padding: 16px; background: #F0ECE1; border-radius: 4px; text-align: center; font-size: 11px; font-weight: 600; color: #244638;">
          <div>🌿 100% Vegan</div>
          <div>🐰 Cruelty-Free</div>
          <div>📦 Carbon Neutral</div>
        </div>
      </div>
    </main>

    <section style="max-width: 1200px; margin: 0 auto 80px auto; padding: 0 24px;">
      <div class="product-tabs-header">
        <div class="product-tab-title active">Description</div>
        <div class="product-tab-title">Additional Information</div>
        <div class="product-tab-title">Reviews (245)</div>
      </div>
      <div style="padding: 32px 0; font-size: 14px; line-height: 1.8; color: #5B6E64;">
        <p>Our SilkSkin Barrier Serum is compounded with active botanical lipid extracts to deeply soothe and fortify sensitive facial membranes.</p>
        <p><strong>Ingredients: </strong>Camellia Sinensis Leaf Water, Squalane, Niacinamide, Sodium Hyaluronate, Bakuchiol, Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil, Ceramide NP, Tocopherol (Vitamin E).</p>
      </div>

      <div style="border-top: 1px solid #E3DDD1; padding-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; align-items: center;">
        <div>
          <div style="font-size: 48px; font-family: 'Playfair Display', serif; font-weight: 700; color: #244638;">4.8 <span style="font-size: 16px; font-family: 'Montserrat', sans-serif; color: #5B6E64;">out of 5</span></div>
          <div style="color: #B89A62; font-size: 20px; margin: 4px 0 8px 0;">★★★★★</div>
          <div style="font-size: 13px; color: #5B6E64;">245 Verified Customer Reviews</div>
        </div>
        <div style="font-size: 12px; line-height: 2;">
          <div style="display: flex; gap: 8px; align-items: center;"><span>5 Star</span> <div style="flex: 1; height: 6px; background: #EAE5D9; border-radius: 3px;"><div style="width: 82%; height: 100%; background: #B89A62; border-radius: 3px;"></div></div> <span>82%</span></div>
          <div style="display: flex; gap: 8px; align-items: center;"><span>4 Star</span> <div style="flex: 1; height: 6px; background: #EAE5D9; border-radius: 3px;"><div style="width: 14%; height: 100%; background: #B89A62; border-radius: 3px;"></div></div> <span>14%</span></div>
          <div style="display: flex; gap: 8px; align-items: center;"><span>3 Star</span> <div style="flex: 1; height: 6px; background: #EAE5D9; border-radius: 3px;"><div style="width: 4%; height: 100%; background: #B89A62; border-radius: 3px;"></div></div> <span>4%</span></div>
        </div>
      </div>
    </section>

  </body>
</html>
`;

fs.writeFileSync('preview/product.html', productContent);
console.log('Successfully wrote preview/product.html');
