# How to Change Fonts and Add Images

## 🎨 Changing Fonts

### Method 1: Using Google Fonts (Recommended)

1. **Import the font in `app/layout.tsx`**:
```typescript
import { Font_Name } from "next/font/google";

const fontName = Font_Name({
  subsets: ["latin"],
  variable: "--font-fontname",
  display: "swap",
});
```

2. **Add it to the HTML element**:
```typescript
<html lang="en" className={fontName.variable}>
```

3. **Add to Tailwind config** (`tailwind.config.ts`):
```typescript
fontFamily: {
  'fontname': ['var(--font-fontname)', 'fallback-font'],
},
```

4. **Use in components**:
```tsx
<h1 className="font-fontname">Your Text</h1>
```

### Example: Adding a New Font

Let's say you want to add "Inter" for body text:

**Step 1:** Edit `app/layout.tsx`:
```typescript
import { Playfair_Display, Inter } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Then in the return:
<html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
```

**Step 2:** Edit `tailwind.config.ts`:
```typescript
fontFamily: {
  'playfair': ['var(--font-playfair)', 'serif'],
  'inter': ['var(--font-inter)', 'sans-serif'],
},
```

**Step 3:** Use it in components:
```tsx
<p className="font-inter">This text uses Inter font</p>
```

### Method 2: Using Custom Fonts (Local Files)

1. **Add font files** to `public/fonts/` folder:
   - `myfont-regular.woff2`
   - `myfont-bold.woff2`

2. **Define in `app/globals.css`**:
```css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

3. **Add to Tailwind config**:
```typescript
fontFamily: {
  'myfont': ['MyFont', 'serif'],
},
```

---

## 🖼️ Adding Images

### Method 1: Using Next.js Image Component (Recommended)

**Step 1:** Add images to the `public` folder:
```
public/
  images/
    logo.png
    hero-image.jpg
    product-1.jpg
```

**Step 2:** Import and use in components:
```tsx
import Image from "next/image";

export default function MyComponent() {
  return (
    <div>
      {/* Basic usage */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={200}
        height={50}
      />

      {/* With styling */}
      <Image
        src="/images/hero-image.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        className="rounded-lg"
      />

      {/* Responsive image */}
      <Image
        src="/images/product-1.jpg"
        alt="Product"
        width={500}
        height={500}
        className="w-full h-auto"
      />
    </div>
  );
}
```

### Method 2: Using Regular img Tag (For Simple Cases)

```tsx
<img 
  src="/images/logo.png" 
  alt="Logo" 
  className="w-32 h-auto"
/>
```

### Method 3: Background Images

**In CSS (`app/globals.css` or component styles):**
```css
.hero-background {
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

**Or inline in Tailwind:**
```tsx
<div 
  className="bg-cover bg-center"
  style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
>
  Content here
</div>
```

---

## 📝 Quick Examples

### Example 1: Adding a Logo to Navbar

**File:** `components/Navbar.tsx`

```tsx
import Image from "next/image";

// In the component:
<div className="flex-shrink-0">
  <a href="#home" className="flex items-center gap-2">
    <Image
      src="/images/logo.png"
      alt="The Artful Experience"
      width={40}
      height={40}
      className="w-10 h-10"
    />
    <span className="text-xl md:text-2xl font-bold text-brand-dark font-playfair">
      The Artful Experience
    </span>
  </a>
</div>
```

### Example 2: Adding Hero Image

**File:** `components/Hero.tsx`

```tsx
import Image from "next/image";

// Add to the right side section:
<div className="relative">
  <Image
    src="/images/hero-artwork.jpg"
    alt="Artwork showcase"
    width={600}
    height={600}
    className="rounded-lg shadow-2xl"
    priority // Loads immediately for above-the-fold images
  />
</div>
```

### Example 3: Product Gallery

```tsx
import Image from "next/image";

const products = [
  { id: 1, name: "Product 1", image: "/images/product-1.jpg" },
  { id: 2, name: "Product 2", image: "/images/product-2.jpg" },
];

export default function ProductGallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 Best Practices

### For Fonts:
- ✅ Use Next.js font optimization (automatic optimization)
- ✅ Limit to 2-3 fonts max (performance)
- ✅ Use `display: "swap"` for better loading
- ✅ Define fallback fonts in Tailwind config

### For Images:
- ✅ Use Next.js `Image` component (automatic optimization)
- ✅ Add images to `public/images/` folder
- ✅ Always include `alt` text for accessibility
- ✅ Use appropriate sizes (width/height)
- ✅ Use `priority` prop for above-the-fold images
- ✅ Optimize images before adding (compress JPGs, use WebP when possible)

---

## 📂 Recommended Folder Structure

```
public/
  images/
    logo.png
    hero/
      hero-main.jpg
      hero-bg.jpg
    products/
      product-1.jpg
      product-2.jpg
    gallery/
      image-1.jpg
      image-2.jpg
  fonts/ (if using custom fonts)
    myfont-regular.woff2
    myfont-bold.woff2
```

---

## 🔧 Common Issues & Solutions

### Font not showing?
- Check browser console for errors
- Verify font name matches exactly
- Make sure Tailwind config is updated
- Restart dev server after changes

### Image not showing?
- Check file path starts with `/` (not `./`)
- Verify file exists in `public` folder
- Check file name matches exactly (case-sensitive)
- Clear browser cache

### Image too large/slow?
- Use Next.js Image component (auto-optimizes)
- Compress images before adding
- Use appropriate width/height
- Consider using WebP format

---

## 💡 Quick Reference

**Current Font Setup:**
- Playfair Display: `font-playfair` (for brand name)
- Default: System fonts (sans-serif)

**To change default body font:**
1. Add font to `layout.tsx`
2. Update `globals.css`:
```css
body {
  font-family: var(--font-yourfont), sans-serif;
}
```

**Image Paths:**
- Files in `public/images/logo.png` → Use `/images/logo.png`
- Always start with `/` (root of public folder)

