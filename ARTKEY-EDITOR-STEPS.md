# ArtKey Editor - Step-by-Step Guide

## 📋 The 8 Steps to Edit an ArtKey

Based on your WordPress ArtKey plugin, here are the exact steps customers follow:

---

## **Step 1: Choose Template** 🎨
**Purpose:** Select a starting design template

**What customers do:**
- Browse through 16 templates (4 pages, 4 templates per page)
- Templates are organized in a carousel
- Click a template to select it
- Template sets default colors (can be customized later)

**Templates available:**
- Page 1: Classic, Purple Dream, Paper, Midnight
- Page 2: Fresh Mint, Cosmic, Peachy, Royal Purple
- Page 3: Sunset, Forest Night, Lavender Sky, Slate
- Page 4: Cool Breeze, Ocean, Minimal, Rose Gold

**Note:** "You can customize in step 3" - templates are just starting points

---

## **Step 2: Add Your Title** ✍️
**Purpose:** Set the main title for the ArtKey page

**What customers do:**
1. **Enter Title Text**
   - Input field for the ArtKey page title
   - Required field
   - Appears at the top of the ArtKey page

2. **Choose Title Color**
   - Color palette carousel (4 pages of colors)
   - Pages: Solid Colors, Light & Pastel Gradients, Vibrant Gradients, Dark Gradients
   - 12 colors per page
   - "More Colors" button for custom color picker

3. **Select Font**
   - Dropdown with options:
     - System
     - Serif
     - Monospace
     - Google Fonts: Inter, Poppins, Lato, Montserrat, Roboto, Playfair Display, Open Sans

---

## **Step 3: Choose a Background** 🖼️
**Purpose:** Set the background for the ArtKey page

**What customers do:**
- **Three tabs to choose from:**

  1. **Solid Color Tab**
     - Color palette carousel (3 pages)
     - Pages: Solid Colors, Gradients: Cool, Gradients: Warm
     - 12 colors per page
     - "More Colors" button for custom color picker

  2. **Stock Photos Tab**
     - Pre-selected stock background images
     - Click to select
     - Images include: Cloudy Sky, City Nightline, Ocean Waves, Forest Mist, Desert Dunes, Marble Texture

  3. **Upload Tab**
     - Upload custom background image
     - Accepts JPG, PNG up to 10MB
     - Upload button to submit

- **Clear Background Image** button to remove uploaded/stock backgrounds

---

## **Step 4: Pick Your Button Colors** 🎨
**Purpose:** Customize button appearance

**What customers do:**
- Color palette carousel (4 pages)
- Pages: Solid Colors, Gradients: Cool, Gradients: Warm, Gradients: Dark
- 12 colors per page
- "More Colors" button for custom color picker
- Supports both solid colors and gradients
- Gradient stored separately from solid color

---

## **Step 5: Enable ArtKey Buttons** 🔘
**Purpose:** Toggle and reorder feature buttons

**What customers do:**
- **Toggle buttons on/off:**
  - 📸 Image Gallery
  - 📖 Guestbook
  - ▶️ Featured Video
  - 🎥 Video Gallery

- **Drag and drop to reorder** buttons
- **Guestbook sub-options** (when enabled):
  - Allow guests to view the Guestbook (checkbox)
  
- **Featured Video sub-options** (when enabled):
  - Upload featured video file
  - Set button label (e.g., "Video Greeting")
  - Delete existing video option

**Tip shown:** "Click the pill to toggle it on (blue) or off (white). Drag any pill up or down to change the order."

---

## **Step 6: Share Your Interests** 🔗
**Purpose:** Add custom link buttons

**What customers do:**
1. **Add new button:**
   - Enter "Button Name" (label)
   - Enter "URL" (link destination)
   - Click "+ Add Button"

2. **Manage existing buttons:**
   - Drag and drop to reorder
   - Edit label and URL
   - Delete buttons (✕ button)

**Note:** Buttons appear in Step 5 where they can be toggled on/off and reordered with other features

---

## **Step 7: Share Your Playlist** 🎵
**Purpose:** Add Spotify music embed

**What customers do:**
- Paste Spotify playlist or track URL
- Format: `https://open.spotify.com/playlist/...`
- Optional: Check "Auto-play when page loads"
- Spotify player embeds on the ArtKey page

---

## **Step 8: Media Gallery** 📸🎥
**Purpose:** Upload and manage images/videos

**What customers do:**

**Images:**
- View existing approved images
- Upload new images (multiple files)
- Delete images (checkbox + submit)
- Images appear in Image Gallery (if enabled in Step 5)

**Videos:**
- View existing approved videos
- Upload new videos (multiple files)
- Delete videos (checkbox + submit)
- Videos appear in Video Gallery (if enabled in Step 5)

**Note:** Uploads appear instantly (no moderation for editor uploads)

---

## 🎯 Additional Features

### **Live Preview**
- Real-time preview on the left side
- Mobile/Desktop view toggle
- Updates automatically as you make changes
- Shows phone frame for mobile view

### **Top Bar Actions**
- 👁️ **Preview** - Open ArtKey page in new tab
- 🛍️ **Save & Continue Shopping** - Save and return to shop
- ✅ **Save & Checkout** - Save and proceed to checkout

### **Visitor Upload Settings** (Optional)
- Allow visitors to upload images
- Allow visitors to upload videos
- Visitor uploads require moderation/approval

---

## 📝 Summary Flow

```
1. Choose Template (16 options, 4 pages)
   ↓
2. Add Title + Title Color + Font
   ↓
3. Choose Background (Color/Stock/Upload)
   ↓
4. Pick Button Colors
   ↓
5. Enable/Reorder Feature Buttons
   ↓
6. Add Custom Link Buttons
   ↓
7. Add Spotify Playlist (optional)
   ↓
8. Upload Images/Videos
   ↓
✅ Save & Checkout
```

---

## 🔄 Current Implementation Status

**In Next.js ArtKey Editor:**
- ✅ Step 1: Template selection (6 templates - needs 16)
- ✅ Step 2: Title input (needs color picker + font selector)
- ⚠️ Step 3: Background (basic - needs tabs + stock photos)
- ✅ Step 4: Button colors (basic - needs carousel)
- ❌ Step 5: Enable buttons (not implemented)
- ❌ Step 6: Custom links (not implemented)
- ❌ Step 7: Spotify (not implemented)
- ✅ Step 8: Media upload (basic - needs gallery display)

---

This is the complete workflow from your WordPress plugin! 🎉

