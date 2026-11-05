# AURA BOTANICA — SHOPIFY METAFIELDS & DYNAMIC SOURCES SPECIFICATION
## OS 2.0 Metafield Architecture & Data Schema
**Version:** Aura Botanica v2.0 (Phase 12)  
**Standard:** Shopify Online Store 2.0 Dynamic Sources

---

## 1. Overview

Aura Botanica v2.0 natively integrates with standard Shopify Metafields and Metaobjects to drive rich skincare data (INCI chemical ingredient lists, application rituals, dermatological suitability, reviews, and clinical claims) without hardcoding values in theme templates.

Merchants can populate these fields in **Shopify Admin $\rightarrow$ Products $\rightarrow$ [Product] $\rightarrow$ Metafields**, or connect them to dynamic sources in the Theme Editor.

---

## 2. Product Metafield Definitions & Keys

| Metafield Key / Namespace | Type | Theme Component Usage | Description / Example |
| :--- | :--- | :--- | :--- |
| **`custom.ingredients`**<br>`my_fields.ingredients` | `multi_line_text_field` or `rich_text_field` | Product Tabs $\rightarrow$ Ingredients (INCI) | Full International Nomenclature of Cosmetic Ingredients (INCI) list. E.g. *Camellia Sinensis Leaf Water, Squalane, Niacinamide, Sodium Hyaluronate.* |
| **`custom.how_to_use`**<br>`my_fields.how_to_use` | `multi_line_text_field` or `rich_text_field` | Product Tabs $\rightarrow$ How to Use / The Ritual | Step-by-step skincare application guide. E.g. *Warm 3-4 drops between palms. Press gently into clean, damp skin morning and evening.* |
| **`custom.skin_suitability`** | `single_line_text_field` or `list.single_line_text_field` | Product Buy Box & Additional Info Tab | Suitable skin types. E.g. *Sensitive, Reactive, Dehydrated, Barrier-Compromised.* |
| **`custom.volume_size`** | `single_line_text_field` | Product Details & Variant Stepper | Formula net volume. E.g. *50 ml / 1.7 fl. oz.* |
| **`custom.texture`** | `single_line_text_field` | Skin Quiz & Routine Recommendations | Formula texture. E.g. *Weightless Silk Elixir, Velvet Ceramide Cream.* |
| **`custom.key_actives`** | `list.single_line_text_field` | Ingredient Spotlight & Bento Cards | Highlighted active botanical extracts. E.g. *Bakuchiol, Sea Buckthorn, Ceramide NP.* |
| **`descriptor.short_description`** | `single_line_text_field` | Product Buy Box | Short 1-2 sentence elevator summary shown above variant options. |
| **`reviews.rating`** | `rating` | Star Rating Badges & Summary | Official Shopify Product Reviews rating object (rating score, scale max). |
| **`reviews.rating_count`** | `number_integer` | Star Rating Count & Summary Breakdown | Total verified customer reviews submitted. |

---

## 3. Dynamic Source Connection in Theme Editor

To connect a block to a metafield dynamic source in the Shopify Theme Editor:
1. Navigate to **Shopify Admin $\rightarrow$ Online Store $\rightarrow$ Themes $\rightarrow$ Customize**.
2. Select **Products $\rightarrow$ Default product** template.
3. Click on the target block (e.g., **Product Details Tabs $\rightarrow$ Tab** or **Collapsible Tab**).
4. Click the **Connect dynamic source** icon (database icon) next to the Content input.
5. Select the corresponding metafield (e.g. `Ingredients (custom.ingredients)`).
6. Click **Save**.

If a product does not have data for a specific metafield, the theme gracefully hides that tab or section without leaving empty blocks or layout shift.

