# ⚡ Quick Start - Get Live in 15 Minutes

## Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- Your API keys ready

---

## 🔑 Step 1: Add Your API Keys (2 min)

Open `.env.local` and replace the placeholder values:

```env
# Your Gelato API key
GELATO_API_KEY=paste_your_gelato_key_here

# Get these from WordPress → WooCommerce → Settings → Advanced → REST API
WOOCOMMERCE_CONSUMER_KEY=ck_your_key
WOOCOMMERCE_CONSUMER_SECRET=cs_your_key
```

---

## 📤 Step 2: Push to GitHub (3 min)

Open PowerShell in your project folder:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tae-website.git
git push -u origin main
```

---

## 🚀 Step 3: Deploy to Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `tae-website` repo
4. **Add Environment Variables** (expand the section):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_WORDPRESS_URL` | `https://theartfulexperience.com` |
   | `NEXT_PUBLIC_WOOCOMMERCE_URL` | `https://theartfulexperience.com` |
   | `WOOCOMMERCE_CONSUMER_KEY` | Your key |
   | `WOOCOMMERCE_CONSUMER_SECRET` | Your secret |
   | `GELATO_API_KEY` | Your Gelato key |

5. Click **Deploy**

---

## 🌐 Step 4: Configure WordPress (5 min)

Add this to your WordPress theme's `functions.php`:

```php
// Allow Next.js to access WooCommerce API
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
});
```

---

## ✅ You're Live!

Your site is now at: `https://your-project.vercel.app`

### Test It:
1. Visit your Vercel URL
2. Click on a product
3. Go through the customization flow
4. Try the ArtKey Editor

---

## 🔄 Making Updates

Any time you want to update your site:

```powershell
git add .
git commit -m "Description of changes"
git push
```

Vercel automatically redeploys! 🎉

---

## 📁 Project Structure

```
tAE Full Website/
├── app/                    # Pages
│   ├── page.tsx           # Homepage
│   ├── customize/         # Product customization
│   ├── artkey/editor/     # ArtKey Editor
│   └── admin/             # Admin dashboard
├── components/            # Reusable components
├── lib/                   # API integrations
│   ├── woocommerce.ts    # WooCommerce functions
│   ├── gelato.ts         # Gelato functions
│   └── wordpress.ts      # WordPress functions
├── .env.local            # Your API keys (never commit!)
└── DEPLOYMENT-GUIDE.md   # Full deployment docs
```

---

## Need Help?

- Full guide: `DEPLOYMENT-GUIDE.md`
- WooCommerce setup: `WOOCOMMERCE-REST-API-SETUP.md`
- Gelato setup: `GELATO-API-INTEGRATION-GUIDE.md`

