# How to Edit Hero Text in WordPress

## 🎯 Quick Setup Guide

You can now edit the "Art just Got Personal" hero text directly from WordPress!

---

## 📝 Method 1: Using WordPress Page (Easiest - No Plugins Required)

### Step 1: Create a Page in WordPress

1. **Go to WordPress Admin:** `https://theartfulexperience.com/wp-admin`
2. **Navigate to:** Pages → Add New
3. **Page Title:** `Home Settings` (exact name)
4. **Page Slug:** Make sure it's `home-settings` (WordPress will auto-generate this)
5. **Publish the page** (it doesn't need to be visible to visitors)

### Step 2: Add Content Using Page Content

The Hero component will check for this page. For now, it uses default values, but you can extend it to read from the page content.

**Current Setup:** The hero text is hardcoded but ready to pull from WordPress.

---

## 🔧 Method 2: Using Advanced Custom Fields (ACF) - Recommended

This is the best method for managing hero content.

### Step 1: Install ACF Plugin

1. **In WordPress Admin:**
   - Go to **Plugins → Add New**
   - Search for **"Advanced Custom Fields"**
   - Install and activate

### Step 2: Create Field Group

1. **Go to:** Custom Fields → Add New
2. **Field Group Title:** `Home Page Hero Settings`
3. **Add Fields:**

   **Field 1:**
   - Label: `Hero Headline 1`
   - Name: `hero_headline_1`
   - Type: Text
   - Default Value: `Art just Got`

   **Field 2:**
   - Label: `Hero Headline 2`
   - Name: `hero_headline_2`
   - Type: Text
   - Default Value: `Personal`

   **Field 3:**
   - Label: `Hero Subtitle`
   - Name: `hero_subtitle`
   - Type: Textarea
   - Default Value: `Where fine art, prints & images\nmeet your personal expression.`

   **Field 4:**
   - Label: `Hero Description`
   - Name: `hero_description`
   - Type: Textarea
   - Default Value: `Upload an image or browse our gallery.\nArtKey brings your vision to life.`

4. **Location Rules:**
   - Show this field group if: Page is equal to `Home Settings`

5. **Save Field Group**

### Step 3: Edit Content

1. **Go to:** Pages → Home Settings
2. **You'll see the custom fields** at the bottom
3. **Edit the text** in each field
4. **Update** the page

### Step 4: Enable ACF in REST API

1. **Install:** "ACF to REST API" plugin (optional, but recommended)
   - Or use the built-in ACF REST API support (ACF 5.11+)

2. **The fields will automatically be available** at:
   ```
   /wp-json/wp/v2/pages?slug=home-settings
   ```

---

## 🚀 Method 3: Using WordPress Options (For Developers)

If you want to use WordPress site options instead of a page:

### In WordPress (functions.php or plugin):

```php
// Register options
add_action('admin_init', function() {
    register_setting('tae_hero_settings', 'tae_hero_headline_1');
    register_setting('tae_hero_settings', 'tae_hero_headline_2');
    register_setting('tae_hero_settings', 'tae_hero_subtitle');
    register_setting('tae_hero_settings', 'tae_hero_description');
});

// Add admin menu
add_action('admin_menu', function() {
    add_options_page(
        'Hero Settings',
        'Hero Settings',
        'manage_options',
        'tae-hero-settings',
        'tae_hero_settings_page'
    );
});

function tae_hero_settings_page() {
    ?>
    <div class="wrap">
        <h1>Hero Section Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('tae_hero_settings'); ?>
            <table class="form-table">
                <tr>
                    <th>Headline 1</th>
                    <td><input type="text" name="tae_hero_headline_1" value="<?php echo esc_attr(get_option('tae_hero_headline_1', 'Art just Got')); ?>" /></td>
                </tr>
                <tr>
                    <th>Headline 2</th>
                    <td><input type="text" name="tae_hero_headline_2" value="<?php echo esc_attr(get_option('tae_hero_headline_2', 'Personal')); ?>" /></td>
                </tr>
                <tr>
                    <th>Subtitle</th>
                    <td><textarea name="tae_hero_subtitle"><?php echo esc_textarea(get_option('tae_hero_subtitle', 'Where fine art, prints & images\nmeet your personal expression.')); ?></textarea></td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td><textarea name="tae_hero_description"><?php echo esc_textarea(get_option('tae_hero_description', 'Upload an image or browse our gallery.\nArtKey brings your vision to life.')); ?></textarea></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}
```

Then fetch via REST API (requires authentication).

---

## ✅ Recommended: Use Method 2 (ACF)

**Why?**
- ✅ Easy to use (no coding)
- ✅ Visual interface in WordPress
- ✅ Works with REST API
- ✅ Can add more fields later (images, buttons, etc.)

---

## 🔄 How It Works

1. **You edit content in WordPress** (using ACF fields)
2. **Next.js fetches the content** via REST API
3. **Hero component displays** the WordPress content
4. **Changes appear** after Next.js rebuilds or cache refreshes

---

## 📋 Quick Checklist

- [ ] Install Advanced Custom Fields plugin
- [ ] Create "Home Settings" page in WordPress
- [ ] Create ACF field group with hero fields
- [ ] Assign field group to "Home Settings" page
- [ ] Edit content in WordPress
- [ ] Verify content appears on Next.js site

---

## 🎨 Editing the Text

Once set up, simply:

1. **Go to WordPress Admin**
2. **Navigate to:** Pages → Home Settings
3. **Edit the custom fields:**
   - Hero Headline 1: Change "Art just Got" to whatever you want
   - Hero Headline 2: Change "Personal" to whatever you want
   - Hero Subtitle: Edit the subtitle text
   - Hero Description: Edit the description text
4. **Click "Update"**
5. **Wait a few minutes** (or clear Next.js cache) for changes to appear

---

## 🔍 Testing

After setting up, test by:

1. **Changing text in WordPress**
2. **Check the API endpoint:**
   ```
   https://theartfulexperience.com/wp-json/wp/v2/pages?slug=home-settings
   ```
3. **Verify the `acf` object** contains your fields
4. **Check your Next.js site** - changes should appear

---

## 💡 Pro Tips

1. **Cache:** Next.js caches WordPress content for 1 hour. To see changes immediately:
   - Clear Next.js cache
   - Or reduce cache time in `lib/wordpress.ts`

2. **Fallbacks:** The code has default values, so if WordPress is down, the site still works

3. **Multiple Languages:** You can create different pages for different languages:
   - `home-settings-en`
   - `home-settings-es`
   - etc.

4. **Rich Content:** ACF supports rich text, images, and more - you can extend this later!

---

## 🆘 Troubleshooting

**Changes not showing?**
- Clear Next.js cache
- Check WordPress page is published
- Verify ACF fields are saved
- Check REST API endpoint returns data

**ACF fields not in REST API?**
- Install "ACF to REST API" plugin
- Or ensure ACF version is 5.11+

**Page not found?**
- Make sure page slug is exactly `home-settings`
- Check page is published (not draft)

---

That's it! Once set up, you can edit all hero content from WordPress without touching code! 🎉

