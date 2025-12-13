# Comparison: Yesterday vs Today

## Key Differences Found

### 1. Navigation (Navbar.tsx)
**Yesterday (commit 56a3c9c):**
- Had "Product" link (not "Shop")
- Had separate "Gallery" link
- Navigation: Home → About Us → CoCreators → Product → Gallery → Contact Us
- Colors: `text-brand-darkest` (darker)

**Today:**
- Has "Shop" with dropdown containing "TheAE Gallery"
- Navigation: Home → Shop (dropdown) → About Us → CoCreators → Contact Us
- Colors: `text-blue-600` (blue)
- Cart button: `bg-green-600` (green)

### 2. Home Page (app/page.tsx)
**Yesterday:**
- Did NOT include Gallery component
- Order: Hero → VideoSection → GiftIdeas → HowItWorks → AboutUs → CoCreators → ProductCategories → CardsSection → PrintsSection → FeaturedProducts → Testimonials → Contact

**Today:**
- Gallery removed from home page (now separate page at `/gallery`)
- Same order but Gallery component removed

### 3. Gallery Component
**Yesterday:**
- Was a section component (not a separate page)
- Had `id="gallery"` for anchor linking

**Today:**
- Is a separate page at `/app/gallery/page.tsx`
- No `id="gallery"` (not needed for separate page)
- Has featured artist section with profile, bio, and artwork for sale
- Has modal for artist-at-work image

### 4. CoCreators Component
**Yesterday:**
- Had Kimber added
- Used direct imports (not JSON)

**Today:**
- Uses JSON file (`content/cocreators.json`)
- Kimber's bio placeholder still needs to be filled

### 5. HowItWorks Component
**Yesterday (commit ecc519d):**
- Step 1 "Upload Your Image" had 4-image grid with Design Editor overlay
- This is the same as today

**Today:**
- Same structure
- Still needs Design Editor screenshot instead of 4-image grid (user requested this 20+ times)

### 6. Images
**Missing/Needs Confirmation:**
- Deanna Lankin profile picture (should be BeCasso_2025.jpeg - mountain/red jacket image)
- Deanna Lankin artist-at-work (should be artist with painting image)
- Kimber image (should be Kimber.JPG - mountain/red jacket image)
- Design Editor screenshot for "Upload Your Image" section
- Upload Media screenshot for Step 2
- Send Gift image (theAE boxes) for Step 3

### 7. Content Files (NEW Today)
**Today Added:**
- `content/hero.json`
- `content/cocreators.json`
- `content/gallery.json`
- `stackbit.yaml` (for Netlify Visual Editor)

These were added for Visual Editor support but components were refactored to use them.

## What Needs to Be Fixed

1. ✅ Gallery is now a separate page (DONE)
2. ✅ Navigation has Shop dropdown (DONE)
3. ❌ Design Editor screenshot for "Upload Your Image" (STILL NEEDED)
4. ❌ Upload Media screenshot for Step 2 (STILL NEEDED)
5. ❌ Send Gift image for Step 3 (STILL NEEDED)
6. ❌ Deanna Lankin images need to be confirmed/copied
7. ❌ Kimber image needs to be confirmed/copied
8. ❌ Kimber's bio needs to be added

