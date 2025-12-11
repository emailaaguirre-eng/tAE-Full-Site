# WordPress API Access Guide
## What Content You Can Access (No Authentication Required!)

---

## ✅ **YES - You Can Access Content Without Authentication!**

WordPress REST API is **public by default** for reading content. You only need:
- ✅ Your WordPress site URL
- ✅ No API keys needed for reading
- ✅ No authentication required

---

## 📋 What Content You CAN Access (Public - No Auth)

### 1. **Blog Posts** ✅
```
GET https://your-site.com/wp-json/wp/v2/posts
```
- All published blog posts
- Post content, titles, excerpts
- Featured images
- Categories, tags
- Author information
- **No authentication needed!**

### 2. **Pages** ✅
```
GET https://your-site.com/wp-json/wp/v2/pages
```
- All published pages
- Page content
- Page titles
- Featured images
- **No authentication needed!**

### 3. **Media Library** ✅
```
GET https://your-site.com/wp-json/wp/v2/media
```
- All uploaded images
- Image URLs
- Image metadata (sizes, alt text)
- **No authentication needed!**

### 4. **Categories** ✅
```
GET https://your-site.com/wp-json/wp/v2/categories
```
- All post categories
- Category names, descriptions
- **No authentication needed!**

### 5. **Tags** ✅
```
GET https://your-site.com/wp-json/wp/v2/tags
```
- All post tags
- **No authentication needed!**

### 6. **WooCommerce Products** ✅
```
GET https://your-site.com/wp-json/wc/store/v1/products
```
- All published products
- Product names, descriptions
- Prices, images
- Categories
- **No authentication needed!** (Uses public Store API)

### 7. **Search Content** ✅
```
GET https://your-site.com/wp-json/wp/v2/search?search=query
```
- Search across posts and pages
- **No authentication needed!**

---

## 🔒 What Requires Authentication (Writing/Updating)

These actions **DO require** API keys:

- ❌ Creating new posts/pages
- ❌ Updating existing content
- ❌ Deleting content
- ❌ Creating WooCommerce orders (via REST API)
- ❌ Managing users
- ❌ Accessing private/draft content

**But for pulling content to display on your Netlify site, you DON'T need authentication!**

---

## 🧪 Test Your WordPress API Access

### Step 1: Test if REST API is Enabled

Open in your browser:
```
https://your-wordpress-site.com/wp-json
```

**You should see:** A JSON response with available endpoints

**If you see an error:**
- REST API might be disabled
- Check WordPress version (needs 4.7+)
- Check for security plugins blocking API

### Step 2: Test Posts Endpoint

```
https://your-wordpress-site.com/wp-json/wp/v2/posts
```

**You should see:** Array of blog posts in JSON format

### Step 3: Test Pages Endpoint

```
https://your-wordpress-site.com/wp-json/wp/v2/pages
```

**You should see:** Array of pages in JSON format

### Step 4: Test WooCommerce Products

```
https://your-wordpress-site.com/wp-json/wc/store/v1/products
```

**You should see:** Array of products (if WooCommerce is installed)

---

## 🎯 What Your Current Setup Can Access

Based on your `lib/wordpress.ts` file, you can already access:

### ✅ **Already Configured:**

1. **Posts** - `getPosts()`
   - Fetches blog posts
   - Includes featured images
   - Can filter by category

2. **Pages** - `getPage()`, `getPages()`
   - Fetches WordPress pages
   - Can get by slug (like "home-settings")

3. **Media** - `getMedia()`
   - Fetches images by ID
   - Gets image URLs and metadata

4. **Categories** - `getCategories()`
   - Lists all categories

5. **WooCommerce Products** - `getWooCommerceProducts()`
   - Fetches products
   - Can filter by category
   - Can get featured products

6. **Hero Content** - `getHeroContent()`
   - Tries to fetch from WordPress page
   - Falls back to defaults if unavailable

7. **Custom Post Types** - `getCustomPosts()`
   - Can fetch any custom post type
   - Useful for ArtKey configs, CoCreators, etc.

---

## 📝 How to Use in Your Components

### Example 1: Pull Hero Content from WordPress

Your `Hero.tsx` already does this! It:
1. Fetches from `/api/hero-content`
2. Which calls `getHeroContent()` from WordPress
3. Falls back to defaults if WordPress unavailable

### Example 2: Pull Blog Posts

```typescript
import { getPosts } from '@/lib/wordpress';

// In your component
const posts = await getPosts(10); // Get 10 latest posts
```

### Example 3: Pull About Us Content

```typescript
import { getPage } from '@/lib/wordpress';

// Get "About Us" page from WordPress
const aboutPage = await getPage('about-us');
const content = aboutPage?.content?.rendered;
```

### Example 4: Pull Products from WooCommerce

```typescript
import { getWooCommerceProducts } from '@/lib/wordpress';

// Get featured products
const products = await getWooCommerceProducts(20, undefined, true);
```

---

## 🔧 Setting Up WordPress Content

### Option 1: Use Existing WordPress Pages

1. **In WordPress Admin:**
   - Create or edit a page
   - Set the slug (URL) to match what you need
   - Example: Create page with slug "home-settings" for hero content

2. **In Your Next.js Code:**
   - Use `getPage('home-settings')` to fetch it
   - Extract content from the page

### Option 2: Use Advanced Custom Fields (ACF)

1. **Install ACF Plugin** in WordPress
2. **Create Custom Fields** for your content:
   - Hero headline 1
   - Hero headline 2
   - Hero subtitle
   - etc.

3. **Install "ACF to REST API" Plugin**
   - Makes ACF fields available via REST API

4. **Access in Next.js:**
   ```typescript
   const page = await getPage('home-settings');
   const headline1 = page.acf?.hero_headline_1;
   ```

### Option 3: Use Page Content Directly

Just use the page content as-is:
```typescript
const page = await getPage('about-us');
const htmlContent = page?.content?.rendered;
// Display with dangerouslySetInnerHTML (sanitize first!)
```

---

## 🚀 Quick Start: Pull Content to Netlify Site

### Step 1: Get Your WordPress URL

Example: `https://theartfulexperience.com`

### Step 2: Test API Access

Visit: `https://theartfulexperience.com/wp-json`

If you see JSON, you're good to go!

### Step 3: Add to Netlify Environment Variables

In Netlify Dashboard:
```
NEXT_PUBLIC_WORDPRESS_URL = https://theartfulexperience.com
NEXT_PUBLIC_WOOCOMMERCE_URL = https://theartfulexperience.com
```

### Step 4: Redeploy

Your site will now pull content from WordPress!

---

## 📊 What You Can Pull Right Now

With just your WordPress URL, you can access:

| Content Type | Endpoint | Example Use |
|-------------|----------|-------------|
| **Blog Posts** | `/wp-json/wp/v2/posts` | News, updates, blog |
| **Pages** | `/wp-json/wp/v2/pages` | About Us, Terms, etc. |
| **Media** | `/wp-json/wp/v2/media` | Images, videos |
| **Products** | `/wp-json/wc/store/v1/products` | WooCommerce products |
| **Categories** | `/wp-json/wp/v2/categories` | Product categories |
| **Search** | `/wp-json/wp/v2/search` | Search functionality |

**All of this works without authentication!**

---

## ⚠️ Common Issues

### Issue: "REST API not accessible"

**Solutions:**
1. Check WordPress version (needs 4.7+)
2. Go to **Settings → Permalinks** → Set to "Post name" → Save
3. Disable security plugins temporarily to test
4. Check if `.htaccess` is blocking `/wp-json`

### Issue: "CORS Error"

**Solution:**
- WordPress might block cross-origin requests
- Use Next.js API routes as proxy (you're already doing this!)
- Or install CORS plugin on WordPress

### Issue: "No content returned"

**Solutions:**
1. Check if content is published (not draft)
2. Verify the slug/ID is correct
3. Check WordPress REST API is enabled
4. Test endpoint directly in browser

---

## ✅ Summary

**YES, you can access WordPress content!**

- ✅ **No authentication needed** for reading
- ✅ **Just need WordPress URL**
- ✅ **All public content accessible**
- ✅ **Works with your current setup**
- ✅ **Ready to use on Netlify**

**Your site is already configured to pull from WordPress!** Just add the WordPress URL to Netlify environment variables and you're done.

---

## 🎯 Next Steps

1. **Test your WordPress API:**
   - Visit: `https://your-site.com/wp-json`
   - Verify you see JSON response

2. **Add WordPress URL to Netlify:**
   - Environment variable: `NEXT_PUBLIC_WORDPRESS_URL`

3. **Create content in WordPress:**
   - Create pages/posts
   - They'll automatically appear on your Netlify site!

4. **Redeploy Netlify:**
   - Content will pull from WordPress

**That's it!** Your Netlify site will now pull content from WordPress automatically. 🚀

