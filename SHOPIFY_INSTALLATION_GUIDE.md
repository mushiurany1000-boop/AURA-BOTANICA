# 🌿 AURA BOTANICA — SHOPIFY THEME INSTALLATION GUIDE (SHOPIFY_INSTALLATION_GUIDE.md)

**Theme Name:** Aura Botanica Luxury Skincare Theme  
**Version:** 5.3.0 (Online Store 2.0)  
**Package File:** `aura-skincare-theme.zip`  
**Package Size:** 1.00 MB (1,046,542 bytes)  
**Compatibility:** Shopify Online Store 2.0, Desktop & Mobile  

---

## 1. Package Location

The authoritative, production-ready ZIP archive is located at:
```text
C:\Users\Mushiur Rahman Any\Desktop\New folder\aura-skincare-theme.zip
```
*(Verified: Generated directly from `shopify-theme/` using POSIX `/` forward slashes, zero backslashes, no wrapper directory, zero development files).*

---

## 2. Step-by-Step Installation Instructions

### Step 1: Open Your Shopify Admin
1. Open your web browser and navigate to your store's admin URL:
   `https://admin.shopify.com/store/YOUR-STORE-NAME`
2. In the left navigation menu, click **Online Store**, then select **Themes**.

### Step 2: Upload the Theme Package
1. In the **Theme library** section, click the **Add theme** dropdown button.
2. Select **Upload zip file**.
3. In the upload popup, click **Add file**.
4. Browse to your computer folder and select:
   `C:\Users\Mushiur Rahman Any\Desktop\New folder\aura-skincare-theme.zip`
5. Click **Upload file**.
6. Wait 15–30 seconds while Shopify uploads and extracts the theme package.

### Step 3: Verify the Theme Customizer
1. Once uploaded, the theme will appear in your **Theme library** as **Aura Botanica** (Version 5.3.0).
2. Click the **Customize** button next to Aura Botanica.
3. Verify that:
   - **No red error banners** appear at the top of the editor.
   - The Announcement bar color scheme displays properly without the *"Unable to display color schemes"* error.
   - Click the **Theme settings** tab (gear icon on the left panel): all **25 categories** (General settings, Layout, Typography, Colors, etc.) are available and functional.
   - The live preview displays full botanical styling with warm silk ivory backgrounds, forest green surfaces, and Cormorant Garamond typography.

### Step 4: Test Storefront Interactions
1. In the Theme Customizer top bar, click the three dots (`...`) next to the theme name and click **Preview**.
2. **Product Page:** Navigate to any product and test variant switching (e.g., size or volume). Notice the price and variant SKU update in real time.
3. **Cart Drawer:** Click **Add to Cart**. The AJAX cart drawer will slide out smoothly from the right with the free shipping progress bar showing your threshold status.
4. **Checkout:** Click the **Check out** button in the cart drawer. You will be routed safely to Shopify's real, secure checkout.

### Step 5: Publish the Theme (When Ready)
1. In **Online Store** → **Themes**, find **Aura Botanica** in your Theme library.
2. Click **Publish** to make Aura Botanica the live theme for your store.

---

## 3. Frequently Asked Questions & Troubleshooting

### Q: Why did the previous theme show *"color schemes must be defined"*?
**A:** In the older upload (`aura-skincare-theme-2`), `settings_data.json` had 4 deprecated schema keys and lacked the full 8 color palettes required by Shopify OS 2.0. This caused Shopify's parser to drop the color scheme registry. The new `aura-skincare-theme.zip` has all 8 color palettes and 18 tokens fully declared and validated.

### Q: Why did the preview look unstyled in previous tests?
**A:** When Shopify's theme customizer encounters a schema syntax error, it halts CSS compilation in the preview iframe. In this updated package, all schemas are 100% valid, and the stylesheet includes all mobile, tablet, and desktop media queries.

### Q: How do I customize colors or fonts?
**A:** In the Theme Editor, click the gear icon (**Theme settings**):
- Under **Colors**, you can customize any of the 8 color palettes.
- Under **Typography**, you can adjust font families, base sizes, and heading scales.
- Under **Custom CSS**, you can add custom CSS overrides that persist through updates.

