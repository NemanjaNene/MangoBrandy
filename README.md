# 🥭 Mango Spirit - Premium Rakia Website

> Ultra-premium Caribbean rakia website with modular architecture

## 📁 Project Structure

```
Mango Spirit/
├── 📄 index.html              # Main file - loads all sections
├── 📄 BACKUP-ORIGINAL.html    # Original backup (DO NOT DELETE)
│
├── 📁 sections/               # HTML Sections (modular)
│   ├── header.html           # Navigation & mobile menu
│   ├── hero.html             # Hero section with main image
│   ├── process.html          # From Grove to Glass
│   ├── voyage.html           # Caribbean to Europe
│   ├── product.html          # Tasting notes
│   ├── gallery.html          # Video gallery - Behind the Scenes
│   ├── testimonials.html     # Customer reviews
│   ├── cta.html              # Call to action
│   └── footer.html           # Footer & contact
│
├── 📁 css/                    # CSS Files (modular)
│   ├── global.css            # Global styles & backgrounds
│   ├── header.css            # Header, nav, buttons
│   ├── hero.css              # Hero section & main image
│   ├── components.css        # Cards, timeline, slider
│   └── media-optimization.css # Video & image optimization
│
├── 📁 js/                     # JavaScript Files
│   ├── loader.js             # Loads all HTML sections
│   └── app.js                # All app functionality
│
└── 📁 assets/                 # Images & media
    ├── logo/
    │   ├── mango-spirit-logo-compact.svg    # Header/Footer logo ⭐
    │   ├── mango-spirit-logo-horizontal.svg # Marketing materials
    │   ├── mango-spirit-icon.svg            # Social media icon
    │   ├── favicon.svg                      # Browser favicon
    │   ├── mango-spirit-logo.svg            # Original version
    │   └── joyFruits-logo.pdf               # Original PDF logo
    ├── images/
    │   ├── PHOTO-2025-12-26-14-15-59.jpg  # Hero image
    │   ├── PHOTO-2025-12-26-14-16-23.jpg  # Gallery image
    │   └── PHOTO-2025-12-26-14-20-02.jpg  # Gallery image
    ├── videos/
    │   ├── VIDEO-2025-12-26-14-15-40.mp4  # Production video
    │   ├── VIDEO-2025-12-26-14-16-49.mp4  # Process video
    │   └── ... (8 video files total)
    └── bottles/
        └── Mango.png              # Product bottle (backup)
```

## 🚀 How to Run

### **Option 1: Python Server** (Recommended)

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

### **Option 2: Live Server (VS Code)**

1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

### **Option 3: Node.js**

```bash
npx live-server
```

## 🔧 How It Works

1. **index.html** - Main file with basic structure
2. **js/loader.js** - Loads all sections from `sections/` folder
3. **js/app.js** - Initializes all functionality after sections load
4. **CSS files** - Each section has its own CSS for easy maintenance

## 📝 Adding New Sections

### 1. Create HTML Section

```bash
touch sections/new-section.html
```

### 2. Create CSS File

```bash
touch css/new-section.css
```

### 3. Add to index.html

```html
<!-- Add container -->
<div id="new-section"></div>

<!-- Add CSS link -->
<link rel="stylesheet" href="css/new-section.css" />
```

### 4. Add to js/loader.js

```javascript
await Promise.all([
  // ... existing sections ...
  loadSection("new-section", "new-section.html"),
]);
```

## 🎨 Modifying Sections

Each section is **independent**:

- **To edit navigation:** `sections/header.html` + `css/header.css`
- **To edit hero:** `sections/hero.html` + `css/hero.css`
- **To edit process:** `sections/process.html` + `css/components.css`
- **To edit gallery:** `sections/gallery.html` + `css/media-optimization.css`
- **To edit footer:** `sections/footer.html` + `css/global.css`

## ⚠️ Important Notes

1. **Always run a local server** - sections won't load with `file://`
2. **BACKUP-ORIGINAL.html** - Keep this file as backup!
3. **Testing** - After changes, refresh browser (Cmd/Ctrl + Shift + R)

## 🐛 Troubleshooting

### Sections not loading?

- Check browser console (F12) for errors
- Make sure server is running
- Check file paths in `js/loader.js`

### Styles not applying?

- Check if CSS file is linked in `index.html`
- Clear browser cache
- Inspect element (F12) to see which styles are applied

### JavaScript not working?

- Check browser console for errors
- Make sure `js/loader.js` and `js/app.js` are loaded
- Verify sections are loaded before JS runs

## 📦 For Production

When ready to deploy:

1. **Option A:** Keep current structure (works with any host)
2. **Option B:** Combine all sections into one HTML file:
   ```bash
   # Create combined version
   python3 combine-sections.py
   ```

## 🎯 Next Steps

- [ ] Add more images to `assets/`
- [ ] Create additional sections
- [ ] Optimize for SEO
- [ ] Add analytics
- [ ] Deploy to hosting

---

Made with ❤️ for Mango Spirit
