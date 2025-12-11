# Step-by-Step: Set Up WordPress API for Netlify
## Complete Guide to Connect Your WordPress Content

---

## 🎯 Goal

Connect your WordPress site to your Netlify site so content pulls automatically.

---

## Step 1: Find Your WordPress URL

**What you need:**
- Your WordPress site URL
- Example: `https://theartfulexperience.com` or `https://dredev.theartfulexperience.com`

**Where to find it:**
- Check your WordPress admin URL (usually the same)
- Or check your hosting provider

---

## Step 2: Test WordPress API Access

### Option A: Test in Browser (Easiest)

1. **Open a new browser tab**
2. **Visit:** `https://your-wordpress-site.com/wp-json`
3. **What you should see:**
   - ✅ JSON data = API is working!
   - ❌ Error page = API might be disabled

### Option B: Test Using Our Test Page

1. **Start your Next.js dev server:**
   ```bash
   npm run dev
   ```

2. **Visit:** `http://localhost:3000/api/test-wordpress?url=https://your-wordpress-site.com`

3. **You'll see:** Test results showing what's accessible

### Option C: Test Using Node Script

1. **Run the test script:**
   ```bash
   WORDPRESS_URL=https://your-wordpress-site.com node test-wordpress-api.js
   ```

2. **You'll see:** Detailed test results

---

## Step 3: Fix Issues (If Any)

### Issue: "REST API not accessible"

**Solution:**

1. **In WordPress Admin:**
   - Go to **Settings → Permalinks**
   - Select **"Post name"** (not "Plain")
   - Click **"Save Changes"**

2. **Check WordPress Version:**
   - WordPress 4.7+ required
   - Check in **Dashboard → Updates**

3. **Disable Security Plugins Temporarily:**
   - Some security plugins block REST API
   - Disable temporarily to test
   - Then whitelist your Netlify domain

4. **Check .htaccess:**
   - Make sure `/wp-json` isn't blocked
   - Contact hosting support if needed

---

## Step 4: Add WordPress URL to Netlify

### Method 1: Via Netlify Dashboard (Recommended)

1. **Go to Netlify Dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site

2. **Navigate to Environment Variables:**
   - Click **Site Settings** (left sidebar)
   - Click **Environment Variables** (under "Build & deploy")

3. **Add Variables:**
   Click **"Add variable"** and add:

   ```
   Key: NEXT_PUBLIC_WORDPRESS_URL
   Value: https://your-wordpress-site.com
   ```

   Click **"Add variable"** again:

   ```
   Key: NEXT_PUBLIC_WOOCOMMERCE_URL
   Value: https://your-wordpress-site.com
   ```

4. **Save:**
   - Click **"Save"** button

### Method 2: Via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Set Environment Variables:**
   ```bash
   netlify env:set NEXT_PUBLIC_WORDPRESS_URL "https://your-wordpress-site.com"
   netlify env:set NEXT_PUBLIC_WOOCOMMERCE_URL "https://your-wordpress-site.com"
   ```

---

## Step 5: Redeploy Your Site

### Option A: Trigger Manual Deploy

1. **In Netlify Dashboard:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

2. **Wait 2-3 minutes** for deployment

### Option B: Push to Git (Auto-Deploy)

If you have auto-deploy enabled:

```bash
git commit --allow-empty -m "Trigger deploy with WordPress API"
git push
```

---

## Step 6: Verify It's Working

### Check Your Live Site

1. **Visit your Netlify site:**
   - Example: `https://your-site.netlify.app`

2. **Check Hero Section:**
   - If WordPress has content, it should appear
   - If not, fallback content shows (this is fine!)

3. **Check Products:**
   - Visit products section
   - Should show WooCommerce products (if configured)
   - Or fallback products (if not configured)

### Check Browser Console

1. **Open Developer Tools** (F12)
2. **Go to Console tab**
3. **Look for:**
   - ✅ No errors = Good!
   - ❌ CORS errors = Need to fix (see troubleshooting)

---

## Step 7: Create Content in WordPress

### For Hero Content

1. **In WordPress Admin:**
   - Go to **Pages → Add New**
   - Title: "Home Settings" (or any title)
   - Slug: `home-settings` (important!)
   - Add your content
   - Click **"Publish"**

2. **Your Next.js site will automatically pull this content!**

### For About Us Content

1. **Create a page with slug:** `about-us`
2. **Add your About Us content**
3. **Update `components/AboutUs.tsx`** to fetch from WordPress:

```typescript
import { getPage } from '@/lib/wordpress';

export default async function AboutUs() {
  const aboutPage = await getPage('about-us');
  const content = aboutPage?.content?.rendered || 'Default content';
  
  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
```

### For Products

1. **In WooCommerce:**
   - Add products normally
   - They'll automatically appear on your Netlify site
   - No extra configuration needed!

---

## 🐛 Troubleshooting

### Problem: "CORS Error"

**Solution:**
- Install CORS plugin on WordPress
- Or use Next.js API routes (already set up!)
- Or add to WordPress `.htaccess`:
  ```
  Header set Access-Control-Allow-Origin "*"
  ```

### Problem: "Content Not Updating"

**Solution:**
1. **Clear Netlify Cache:**
   - Trigger deploy with "Clear cache" option

2. **Check Cache Settings:**
   - Next.js caches for 1 hour by default
   - Content updates within 1 hour

3. **Force Refresh:**
   - Hard refresh browser (Ctrl+F5)

### Problem: "API Returns Empty Array"

**Possible Causes:**
1. **No content published** - Create some posts/pages
2. **Wrong URL** - Verify WordPress URL is correct
3. **API blocked** - Check security plugins

---

## ✅ Checklist

Before deploying:

- [ ] WordPress REST API is accessible (`/wp-json` works)
- [ ] WordPress URL is correct
- [ ] Environment variables added to Netlify
- [ ] Site redeployed
- [ ] Content appears on live site

---

## 🎉 You're Done!

Your WordPress content will now:
- ✅ Automatically pull to Netlify
- ✅ Update when you edit in WordPress
- ✅ Work with fallbacks if WordPress is down

---

## 📞 Quick Reference

**Test WordPress API:**
```
https://your-site.com/wp-json
```

**Test from Next.js:**
```
http://localhost:3000/api/test-wordpress?url=https://your-site.com
```

**Netlify Environment Variables:**
```
NEXT_PUBLIC_WORDPRESS_URL = https://your-site.com
NEXT_PUBLIC_WOOCOMMERCE_URL = https://your-site.com
```

---

**Need more help?** Check the other guides:
- `WORDPRESS-API-ACCESS-GUIDE.md` - What you can access
- `NETLIFY-DEPLOYMENT-GUIDE.md` - Full deployment guide

