# 🌿 AURA BOTANICA — Modern Luxury Skincare Shopify Theme & Admin Hub

**Aura Botanica** is an editorial **Shopify Online Store 2.0 Theme** (Version 5.3.0) and companion development admin hub tailored specifically for botanical skincare, luxury cosmetics, and clean beauty brands.

Designed to deliver commercial feature-parity with leading premium Shopify themes such as Minimog and Ella, while preserving an original, high-end botanical visual identity characterized by warm ivory backgrounds, deep forest-green surfaces, muted copper accents, and Cormorant Garamond typography.

---

## 📦 Project Deliverables & Architecture Separation

The project maintains a strict architectural boundary between the installable Shopify theme package and the local development server:

```text
├── shopify-theme/              # [DELIVERABLE 1] Authentic Shopify OS 2.0 Theme Package
│   ├── assets/                 # CSS stylesheets (theme.css), JS engine (theme.js), and fonts
│   ├── blocks/                 # Modular Theme Blocks (custom-announcement.liquid)
│   ├── config/                 # 25-drawer settings_schema.json & settings_data.json
│   ├── layout/                 # Master theme.liquid with section group tags
│   ├── locales/                # en.default.json language definitions
│   ├── sections/               # 48 Liquid sections + 2 OS 2.0 section groups
│   ├── snippets/               # 11 Reusable Liquid snippets (cards, drawers, icons)
│   └── templates/              # 10 OS 2.0 JSON templates (index, product, collection, cart, blog, article, etc.)
│
├── aura-skincare-theme.zip     # [DELIVERABLE 2] Validated installable ZIP archive (Ready for Storefront Upload)
│
├── preview/                    # [DELIVERABLE 3] Local Development Server & Admin Portal
│   ├── index.html              # Storefront homepage simulation
│   ├── product.html            # Main product page simulation with variant switcher
│   ├── collection.html         # Collection page with filtering & drawer
│   ├── cart.html               # Dedicated full cart & ritual bag page
│   ├── checkout.html           # Real simulated checkout flow & order confirmation
│   ├── admin.html              # 5-Tab Merchant Admin Center & Exporter UI
│   └── admin-login.html        # Admin portal authentication screen
│
├── data/                       # Local preview persistence store
│   ├── products.json           # Skincare catalog formulations
│   └── orders.json             # Customer orders & fulfillment simulation
│
├── scripts/                    # Validation, responsive auditing, and packaging scripts
├── dev-server.js               # Zero-dependency Node.js HTTP server & REST API
├── package-theme.js            # POSIX-compliant automated theme packaging tool
├── THEME_FEATURE_AUDIT.md      # Comprehensive feature-parity audit & gap matrix
└── QA_REPORT.md                # 97-check automated validation & test report
```

---

## 🚀 How to Install in Shopify

1. In your Shopify store, navigate to **Online Store &rarr; Themes**.
2. Under the **Theme library** section, click **Add theme &rarr; Upload zip file**.
3. Select the file **`aura-skincare-theme.zip`** from this directory.
4. Click **Upload file**.
5. Once uploaded, click **Customize** to open the Shopify Theme Editor. You will see:
   - All **25 Theme Settings categories** in the Theme settings tab.
   - All **14 Homepage sections** loaded in order on the Home page template.
   - Fully customizable colors, fonts, layout, swatches, cart drawer, and mobile sticky navigation.

> **Note on Compatibility:** `aura-skincare-theme.zip` is packaged with strict POSIX forward slashes (`/`), ensuring seamless installation on Shopify's Linux servers without template missing errors.

---

## 🛠️ Local Development & Testing

### 1. Run the Local Development Server
To preview the theme locally with the simulated storefront, AJAX cart, and merchant admin portal:
```bash
node dev-server.js
```
Then open your browser to:
- **Storefront:** [http://localhost:3000](http://localhost:3000)
- **Product Detail:** [http://localhost:3000/products/bio-ferment-barrier-glow-serum](http://localhost:3000/products/bio-ferment-barrier-glow-serum)
- **Catalog:** [http://localhost:3000/collections/all](http://localhost:3000/collections/all)
- **Dedicated Cart:** [http://localhost:3000/cart](http://localhost:3000/cart)
- **Simulated Checkout:** [http://localhost:3000/checkout](http://localhost:3000/checkout)
- **Admin Center:** [http://localhost:3000/admin](http://localhost:3000/admin)

### 2. Validate the Shopify Theme
Run the automated 97-check theme validation test:
```bash
node scripts/validate-theme.js
```

### 3. Test Shopping & Commerce Flows
Run the complete shopping flow test suite:
```bash
node scripts/test-shopping-flows.js
```

### 4. Build the Theme ZIP Package
To re-generate `aura-skincare-theme.zip` at any time:
```bash
node package-theme.js
```

---

## 🎨 Design System

- **Primary Heading Font:** Cormorant Garamond (Editorial Serif)
- **Body Font:** Inter / Plus Jakarta Sans (Clean Modern Sans)
- **Primary Color:** Deep Forest Green (`#1f2d24`)
- **Accent Color:** Muted Botanical Copper (`#b37446`)
- **Background Color:** Warm Silk Ivory (`#fcfbf7`)
- **Surface Card Color:** Light Cream (`#f5f2eb`)
- **Border Lines:** Subtle Herb Green / Cream Border (`rgba(31, 45, 36, 0.1)`)
