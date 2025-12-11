# WordPress Installation Troubleshooting Guide

## 🔴 SoftWP/Softaculous License Error

**Error Message:**
```
Your SoftWP plugin license is not authorized to be used on https://dredev.theartfulexperience.com
```

### What This Means:
This error is **NOT related to the ArtKey plugins**. It's a hosting control panel (Softaculous) license issue that affects your WordPress installation in general.

### Solutions:

#### Option 1: Fix SoftWP License (Recommended)
1. **Log into your Softaculous/SoftWP control panel**
2. **Go to License Management**
3. **Generate a new license for your domain:** `dredev.theartfulexperience.com`
4. **Apply the license** to your WordPress installation

#### Option 2: Use Different Hosting/Control Panel
- If you can't resolve the SoftWP license, you may need to:
  - Use a different hosting provider
  - Use cPanel instead of Softaculous
  - Install WordPress manually (not through Softaculous)

#### Option 3: Contact Your Hosting Provider
- Ask them to:
  - Authorize your domain in SoftWP
  - Generate a new license key
  - Or switch you to standard cPanel

---

## 🔴 ArtKey Plugin Activation Issues

### Issue 1: PHP Version Too Low

**Error:** "The plugin requires PHP 8.4"

**Solution:**
- The plugin has been updated to require PHP 7.4+ (more compatible)
- Check your PHP version in WordPress:
  - Go to **Tools → Site Health → Info → Server**
  - Look for "PHP version"
- If below PHP 7.4, contact your host to upgrade PHP

### Issue 2: Plugin Files Not Uploaded Correctly

**Symptoms:**
- Plugin doesn't appear in WordPress
- "Plugin file does not exist" error

**Solution:**
1. **Verify file structure:**
   ```
   /wp-content/plugins/artkey-editor/artkey-editor.php (must exist)
   /wp-content/plugins/artkey-hover/artkey-hover.php (must exist)
   /wp-content/plugins/artkey-cors/artkey-cors.php (must exist)
   ```

2. **Check file permissions:**
   - Files: 644
   - Folders: 755
   - Use FTP/File Manager to set permissions

3. **Re-upload files:**
   - Delete plugin folders
   - Re-extract from zip
   - Upload again

### Issue 3: Plugin Activation Fails Silently

**Symptoms:**
- Click "Activate" but nothing happens
- No error message shown

**Solution:**
1. **Check WordPress error logs:**
   - Location: `/wp-content/debug.log`
   - Enable debugging in `wp-config.php`:
     ```php
     define('WP_DEBUG', true);
     define('WP_DEBUG_LOG', true);
     ```

2. **Check PHP error logs:**
   - Contact your host for PHP error log location
   - Look for PHP syntax errors

3. **Test plugin manually:**
   - Try activating one plugin at a time
   - See which one fails

### Issue 4: "Plugin header missing" Error

**Solution:**
- Verify `artkey-editor.php` has the plugin header:
  ```php
  /**
   * Plugin Name: ArtKey Editor
   * ...
   */
  ```
- Make sure file encoding is UTF-8 (not UTF-8 BOM)

---

## ✅ Step-by-Step Plugin Installation

### Method 1: Manual Upload (Recommended)

1. **Extract the zip file** to your computer
2. **Connect via FTP** or use File Manager
3. **Navigate to:** `/wp-content/plugins/`
4. **Upload folders:**
   - `artkey-editor/`
   - `artkey-hover/`
   - `artkey-cors/`
5. **Go to WordPress Admin → Plugins**
6. **Activate each plugin**

### Method 2: WordPress Admin Upload

1. **Zip each plugin folder separately:**
   - `artkey-editor.zip`
   - `artkey-hover.zip`
   - `artkey-cors.zip`
2. **Go to Plugins → Add New → Upload Plugin**
3. **Upload each zip file**
4. **Activate each plugin**

---

## 🔍 Debugging Steps

### 1. Enable WordPress Debugging

Add to `wp-config.php` (before "That's all, stop editing!"):
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

### 2. Check Error Logs

**WordPress Debug Log:**
- Location: `/wp-content/debug.log`
- Check for plugin errors

**PHP Error Log:**
- Ask your host for location
- Usually in: `/var/log/php-errors.log` or similar

**Server Error Log:**
- Check cPanel/Softaculous error logs
- Look for 500 errors or PHP fatal errors

### 3. Test Plugin Files

**Check if files are readable:**
```bash
# Via SSH (if available)
ls -la /wp-content/plugins/artkey-editor/
cat /wp-content/plugins/artkey-editor/artkey-editor.php | head -20
```

**Check PHP syntax:**
```bash
php -l /wp-content/plugins/artkey-editor/artkey-editor.php
```

### 4. Test REST API

After activating plugins, test:
```
https://dredev.theartfulexperience.com/wp-json
https://dredev.theartfulexperience.com/wp-json/artkey/v1/get/1
```

---

## 🛠️ Common Fixes

### Fix 1: Clear All Caches
- Clear WordPress cache (if using caching plugin)
- Clear browser cache
- Clear server cache (if available)

### Fix 2: Increase PHP Limits

Add to `wp-config.php` or `.htaccess`:
```php
@ini_set('upload_max_size', '64M');
@ini_set('post_max_size', '64M');
@ini_set('max_execution_time', '300');
@ini_set('max_input_time', '300');
```

### Fix 3: Check File Ownership

Files should be owned by web server user:
```bash
# Via SSH
chown -R www-data:www-data /wp-content/plugins/artkey-*
```

### Fix 4: Disable Conflicting Plugins

Temporarily disable other plugins to test:
- Security plugins (may block REST API)
- Caching plugins
- Other custom plugins

---

## 📞 Getting Help

### Information to Provide:

1. **WordPress version:**
   - Dashboard → Updates

2. **PHP version:**
   - Tools → Site Health → Info → Server

3. **Error messages:**
   - Copy exact error text
   - Screenshot if possible

4. **Plugin status:**
   - Which plugins activate successfully?
   - Which ones fail?

5. **Server info:**
   - Hosting provider
   - Control panel (cPanel, Softaculous, etc.)
   - PHP version
   - WordPress version

---

## ✅ Verification Checklist

After installation, verify:

- [ ] All 3 plugins appear in Plugins list
- [ ] All 3 plugins can be activated
- [ ] No errors in WordPress admin
- [ ] REST API works: `/wp-json`
- [ ] ArtKey API works: `/wp-json/artkey/v1/get/1`
- [ ] Theme is activated
- [ ] Permalinks set to "Post name"
- [ ] CORS plugin configured with your Next.js domain

---

## 🎯 Quick Fix Summary

**If SoftWP license error:**
1. Fix license in Softaculous panel
2. Or contact hosting provider
3. Or use different hosting/control panel

**If plugin won't activate:**
1. Check PHP version (need 7.4+)
2. Verify files uploaded correctly
3. Check file permissions (644/755)
4. Enable debugging and check logs
5. Test one plugin at a time

**If REST API not working:**
1. Set permalinks to "Post name"
2. Activate CORS plugin
3. Check security plugins aren't blocking
4. Test API endpoints directly

---

**Need more help?** Check the main installation guide: `WORDPRESS-INSTALLATION-GUIDE.md`


