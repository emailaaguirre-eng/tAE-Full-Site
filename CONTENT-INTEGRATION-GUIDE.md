# Content Integration Guide
## The Artful Experience Website

This guide will help you integrate your existing content, videos, images, and WordPress plugin into the new website.

---

## 📹 Video Integration

### Location: `components/VideoSection.tsx`

**Current Setup:**
- Two video placeholders ready under the Hero section
- Videos will auto-play when selected

**To Add Your Videos:**

1. **Place video files in:** `public/videos/`
   - Recommended format: MP4 (H.264 codec)
   - Alternative: WebM for better compression
   
2. **Expected filenames:**
   - `product-overview.mp4` - First video explaining your products
   - `artkey-demo.mp4` - Second video about ArtKey technology
   
3. **Update video info in `components/VideoSection.tsx`:**
   ```typescript
   const videos = [
     {
       id: 1,
       title: "YOUR VIDEO TITLE",
       description: "YOUR VIDEO DESCRIPTION",
       thumbnail: "🎬", // Can use emoji or image path
       videoUrl: "/videos/your-video-file.mp4",
     },
     // Add more videos as needed
   ];
   ```

**For YouTube/Vimeo embeds instead:**
Replace the video player section with an iframe embed.

---

## 🖼️ Images & Gallery

### Hero Video (from current site)
- **Location:** Can be added to `components/Hero.tsx`
- **Path:** Place in `public/images/hero-video.mp4`

### Product Images
- **Location:** `public/images/products/`
- Create folders: `/cards`, `/prints`, `/frames`, etc.

### Gallery Images (from current site)
- **Location:** `public/images/gallery/`
- Used in Product showcase and examples

### Logo
- **Location:** `public/images/logo.png`
- Update in `components/Navbar.tsx` to replace text logo

---

## 📝 Content Updates

### About Us Section
**File:** `components/AboutUs.tsx`

Replace placeholder text with your actual content:
- Company story
- Mission statement
- Vision
- Values

### CoCreators Section
**File:** `components/CoCreators.tsx`

Add your featured artists/creators:
- Profile photos
- Bios
- Specialties
- Portfolio links

### Contact Information
**File:** `components/Footer.tsx` and `components/Contact.tsx`

Update with:
- Actual email address
- Phone number (if applicable)
- Business address
- Social media links

---

## 🔌 WordPress Plugin Integration

### For Order Process

**Plugin Name:** _(You'll provide this)_

**Integration Options:**

#### Option 1: REST API Integration
If your WordPress plugin has a REST API:
1. Create an API endpoint configuration
2. Use Next.js API routes in `/app/api/`
3. Connect forms to WordPress backend

#### Option 2: JavaScript/Widget Embed
If plugin provides JavaScript widget:
1. Add plugin script to `app/layout.tsx`
2. Initialize in relevant components
3. Use provided hooks/functions

#### Option 3: iFrame Embed
If plugin provides embeddable forms:
1. Create wrapper component
2. Embed in checkout/order flow

**Note:** Once you provide the plugin details, I'll implement the specific integration.

---

## 🎨 ArtKey Designer Integration

**Placeholder buttons are at:**
- `components/CardsSection.tsx` - Line with "Open ArtKey Designer"
- `components/PrintsSection.tsx` - Line with "Open ArtKey Designer"

**When ready to integrate:**
- Create separate designer page/modal
- Add image editing functionality
- Connect to product customization flow

---

## 🎨 Color Scheme

**Already Configured:**
```css
#ebf4f6 - brand-lightest (backgrounds)
#bdeaeb - brand-light (accents)
#76b4bd - brand-medium (primary actions)
#58668b - brand-dark (headers, buttons)
#5e5656 - brand-darkest (text, footer)
```

To modify: Edit `tailwind.config.ts`

---

## 📦 File Structure

```
tAE Full Website/
├── app/
│   ├── layout.tsx          # Site metadata, global layout
│   ├── page.tsx            # Home page (main structure)
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation (UPDATE: Add logo)
│   ├── Hero.tsx            # Hero section (ADD: Hero video)
│   ├── VideoSection.tsx    # Product videos (ADD: 2 videos)
│   ├── AboutUs.tsx         # About section (UPDATE: Content)
│   ├── CoCreators.tsx      # CoCreators (UPDATE: Profiles)
│   ├── CardsSection.tsx    # Card customization
│   ├── PrintsSection.tsx   # Print customization with frames
│   ├── Contact.tsx         # Contact form (UPDATE: Email)
│   └── Footer.tsx          # Footer (UPDATE: Contact info)
├── public/
│   ├── videos/             # ADD YOUR VIDEOS HERE
│   └── images/             # ADD YOUR IMAGES HERE
│       ├── logo.png
│       ├── hero-video.mp4
│       ├── products/
│       └── gallery/
└── tailwind.config.ts      # Color configuration

```

---

## ✅ Quick Checklist

When you have your files ready:

- [ ] Add 2 product explanation videos to `public/videos/`
- [ ] Add hero video (optional)
- [ ] Add logo image
- [ ] Update About Us content
- [ ] Add CoCreator profiles and images
- [ ] Update contact information
- [ ] Provide WordPress plugin details
- [ ] Add product showcase images
- [ ] Add gallery images
- [ ] Test all video playback
- [ ] Verify all links work

---

## 🚀 Current Status

**✅ Completed:**
- Professional Next.js + TypeScript setup
- Tailwind CSS with your color scheme
- Responsive mobile-first design
- Navigation with separate About/CoCreators tabs
- Hero with ArtKey messaging
- Video section structure (ready for content)
- Cards customization flow
- Prints with frame options (Black/White/Silver pricing)
- Product categories
- Contact form
- Footer

**⏳ Pending Your Content:**
- Video files
- Images and gallery
- About Us detailed content
- CoCreator information
- WordPress plugin integration
- Logo

---

## 💡 Need Help?

When you're ready to add content:
1. Provide the files/content
2. I'll integrate them properly
3. Test everything works
4. Make any adjustments needed

The site is live at **http://localhost:3000** - check it out anytime!

