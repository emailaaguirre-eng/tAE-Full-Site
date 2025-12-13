# WordPress Color Palette Integration

## 🎨 **Color Palette**

Your WordPress site colors have been integrated into the React bundles:

### **Main Colors**
- **bg-primary** (`#FFFFFF`) - Main background, cards, content areas
- **bg-alt** (`#ECECE9`) - Strips, secondary sections, subtle panels  
- **accent-dark** (`#353535`) - Header/footer/nav background, strong accents
- **text-on-light** (`#000000`) - Body text on white / light gray
- **text-on-dark** (`#FFFFFF`) - Text on dark sections / buttons

### **Nav Colors (Reference)**
- **nav-text-primary** (`#1AAA94`) - Primary nav links, key actions
- **nav-text-secondary** (`#3E96D3`) - Secondary nav links, hover/active, subtle CTAs

---

## 📝 **Tailwind Usage**

### **In Components:**
```jsx
// Main backgrounds
className="bg-brand-primary"      // #FFFFFF
className="bg-brand-alt"          // #ECECE9

// Dark accents
className="bg-brand-accent-dark"  // #353535

// Text colors
className="text-brand-text-light" // #000000
className="text-brand-text-dark"  // #FFFFFF

// Nav colors (if needed)
className="text-brand-nav-primary"   // #1AAA94
className="text-brand-nav-secondary" // #3E96D3
```

### **Legacy Support:**
Old color names still work (mapped to new colors):
- `bg-brand-lightest` → `#FFFFFF`
- `bg-brand-light` → `#ECECE9`
- `bg-brand-medium` → `#353535`
- `bg-brand-dark` → `#353535`
- `bg-brand-darkest` → `#000000`

---

## ✅ **Updated Files**

1. **`wp-build/tailwind.config.js`** - WordPress Tailwind config with new colors
2. **`wp-build/artkey-editor/styles.css`** - CSS variables updated
3. **`wp-build/design-editor/styles.css`** - CSS variables updated
4. **`wp-build/artkey-editor/ArtKeyEditorWP.jsx`** - Component updated to use new colors

---

## 🎯 **Result**

When you build the WordPress bundles, they will use:
- ✅ White backgrounds (`#FFFFFF`) for main content
- ✅ Light gray (`#ECECE9`) for secondary sections
- ✅ Dark gray (`#353535`) for headers/accents
- ✅ Black text (`#000000`) on light backgrounds
- ✅ White text (`#FFFFFF`) on dark backgrounds

This matches your WordPress site for a seamless look! 🎨

