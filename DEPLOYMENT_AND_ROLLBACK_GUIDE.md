# AURA BOTANICA: DEPLOYMENT & ROLLBACK GUIDE

**Theme:** Aura Botanica — Modern Luxury Skincare  
**Version:** 1.0.0 Production Release  
**Package:** `aura-skincare-theme.zip` (1.00 MB / 486 verified files)  
**Repository:** `https://github.com/mushiurany1000-boop/AURA-BOTANICA.git`  
**Date:** November 3, 2026  

---

## 1. Branching Strategy & Release Architecture

To maintain zero downtime and prevent accidental overwrites, Aura Botanica utilizes a structured 3-tier Git workflow:

```
feature/*  ──(PR)──>  development  ──(PR & Audit)──>  main (Production)
                            │                               │
                            ▼                               ▼
                   Staging Preview Theme           Shopify Live Storefront
```

* **`main` (Production Branch):**
  * Contains solely stable, verified, production-ready theme code.
  * Connected directly to the Shopify Live Theme in Shopify Admin.
  * Force-pushes to `main` are strictly forbidden.
* **`development` (Staging / Integration Branch):**
  * Connected to an unpublished **Staging Theme** in Shopify Admin for internal testing.
  * Developers merge completed feature branches here first to verify interactions.
* **`feature/<name>` (Isolated Feature Branches):**
  * Created for specific enhancements (e.g., `feature/holiday-banner`, `feature/klaviyo-form`).
  * Never connected directly to the production storefront.

---

## 2. Pre-Deployment Verification Checklist

Before publishing the theme live to real customers, verify:

- [ ] **Local Validation:** Run `node scripts/validate-theme.js` (Must report `175 PASSED, 0 FAILED`).
- [ ] **Editor Compatibility:** Run `node scripts/test-theme-editor-deep.js` (Must report `24/24 PASSED`).
- [ ] **Commerce & Cart Check:** Run `node scripts/test-shopping-flows.js` (Must report `100% PASSED`).
- [ ] **ZIP Archive Integrity:** Run `node scripts/verify-zip-archive.js` (Must report `20/20 PASSED`).
- [ ] **Credentials Check:** Zero private API tokens, passwords, or test credentials committed in code.
- [ ] **Catalog Settings:** Confirm store policies (Refund, Privacy, Terms) and navigation menus are assigned in Shopify Admin.
- [ ] **Active Theme Backup:** Take an immediate duplicate backup of the currently published live theme before initiating deployment.

---

## 3. Recommended Deployment Methods

### Method 1: Instant Production ZIP Upload (Recommended & 100% Reliable)
*This method bypasses all GitHub webhook latency, API rate limits, and partial-sync hazards.*

1. Open **Shopify Admin** and navigate to **Online Store > Themes**.
2. In the **Theme library** section, click **Add theme > Upload zip file**.
3. Select `aura-skincare-theme.zip` from your local project root (`c:\Users\Mushiur Rahman Any\Desktop\New folder\aura-skincare-theme.zip`).
4. Click **Upload file**. Shopify will unpack all 486 theme assets in approximately 10 seconds.
5. Once uploaded, click the **Actions (...)** button next to the newly added Aura Botanica theme and select **Preview** to inspect the storefront.
6. When satisfied, click **Publish** to make Aura Botanica the live customer-facing storefront.

### Method 2: GitHub Branch Deployment
*Use this method when continuous Git version tracking is preferred.*

1. In Shopify Admin, navigate to **Online Store > Themes**.
2. Click **Add theme > Connect from GitHub**.
3. Select your GitHub account and the repository `mushiurany1000-boop/AURA-BOTANICA`.
4. Select the branch `main`.
5. Shopify will clone the repository and continuously sync changes.
6. **Important:** Allow 1–2 minutes for the initial sync of all assets before clicking **Customize** or **Publish**.
7. Preview the connected theme and click **Publish** when ready.

---

## 4. Rollback & Disaster Recovery Procedures

If an unexpected storefront issue arises during or after deployment, execute one of the following immediate rollback procedures:

### Procedure A: 1-Click Instant Shopify Admin Rollback (< 30 Seconds)
1. Go to **Online Store > Themes**.
2. Locate the previously published theme in your **Theme library** (which was duplicated during pre-deployment).
3. Click the **Publish** button next to that theme.
4. Confirm publication in the dialog. The previous working theme is immediately restored for all customers.

### Procedure B: Git Commit Reversion
If an error was introduced in a recent commit pushed to GitHub:
1. Identify the problematic commit hash via `git log -n 5 --oneline`.
2. Create a clean revert commit locally:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```
3. Shopify's GitHub integration will receive the push event and automatically restore the previous codebase.

### Procedure C: Emergency Offline Archive Restoration
If the GitHub repository becomes inaccessible:
1. Take the local verified package `aura-skincare-theme.zip`.
2. In Shopify Admin, navigate to **Online Store > Themes > Add theme > Upload zip file**.
3. Upload and publish the ZIP package immediately.

