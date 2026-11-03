# AURA BOTANICA — SHOPIFY THEME INSTALLATION GUIDE

**Product:** Aura Botanica Luxury Skincare Theme (Online Store 2.0)  
**Version:** 5.3.0  
**Package:** `aura-skincare-theme.zip` (1.00 MB, POSIX forward slashes)  
**Compatible with:** Shopify Online Store 2.0  
**Updated:** November 3, 2026  

---

## 1. Quick Installation (Shopify Admin)

1. Open your browser and navigate to your **Shopify Admin**.
2. Go to **Online Store** > **Themes**.
3. Under the **Theme library** section, click **Add theme** > **Upload zip file**.
4. Click **Choose File** and select:
   ```text
   C:\Users\Mushiur Rahman Any\Desktop\New folder\aura-skincare-theme.zip
   ```
5. Click **Upload file**. Shopify will upload, unpack, and validate the theme package automatically.
6. Once uploaded, click **Customize** to open the Shopify Theme Editor.

---

## 2. Verification in Shopify Theme Editor

Once you click **Customize**:

1. **Theme Settings:** Click the gear icon (**Theme settings**) in the left sidebar.
   - You will see all **25 configuration categories** (General settings, Layout settings, Typography, Colors, Product card, Cart settings, etc.).
   - Verify that the color schemes error is gone and the 8 color palettes are fully functional.
2. **Announcement Bar & Header:**
   - Verify the rotating announcement messages and header navigation.
3. **Product Card Features:**
   - Hover over product images to verify the secondary image reveal.
   - Click the Quick View (eye icon) button on any card to test the Quick View modal.
4. **Cart Experience:**
   - Click "Add to Cart" or quick add on a product to trigger the AJAX Cart Drawer.
   - Observe the native **Free Shipping Progress Bar** adjusting as items are added.
5. **Publish Theme:**
   - When satisfied, click the green **Publish** button at the top right to make Aura Botanica your active live storefront theme!

---

## 3. GitHub Integration (Optional)

Since your project is now pushed to GitHub (`https://github.com/mushiurany1000-boop/AURA-BOTANICA.git`):
1. In Shopify Admin > **Themes** > **Add theme**, you can also choose **Connect from GitHub**.
2. Select your repository `AURA-BOTANICA` and branch `main`.
3. Shopify will automatically sync theme updates whenever new commits are pushed.

---

## 4. Support & Maintenance

- Authoritative source directory: `shopify-theme/` (and root mirrored files).
- Build command for fresh ZIP packages: `npm run package` or `node package-theme.js`.
- Test suite: `npm test` or `node scripts/validate-theme.js`.
