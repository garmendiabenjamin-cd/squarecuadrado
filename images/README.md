# Images Folder

This folder is organized to help you manage all your website images.

## 📁 Folder Structure

```
images/
├── gallery/          ← Photography gallery images
│   ├── landscape/    ← Nature & landscape photos
│   ├── urban/        ← City & architecture photos
│   ├── portrait/     ← Portrait photography
│   └── travel/       ← General travel photos
├── writings/         ← Cover images for blog posts
├── recommendations/  ← Images for travel recommendations
└── hero/            ← Hero section background images
```

## 📸 Image Guidelines

### Recommended Sizes

- **Gallery Photos**: 800-1200px (longest side)
- **Writing Covers**: 800px × 600px
- **Recommendations**: 800px × 600px
- **Hero Background**: 1920px × 1080px or larger

### File Size

Keep images under these limits for fast loading:
- Gallery: < 200KB
- Covers: < 150KB
- Hero: < 500KB

### File Formats

- **JPG/JPEG**: Best for photos
- **PNG**: For images with transparency
- **WebP**: Modern format (best compression)

### Naming Convention

Use lowercase with hyphens:
- ✅ Good: `sunset-mountains.jpg`
- ❌ Avoid: `Sunset Mountains.JPG`

## 🎨 Optimization Tools

**Free Online Tools:**
- [TinyPNG](https://tinypng.com/) - Easy compression
- [Squoosh](https://squoosh.app/) - Advanced options
- [Compressor.io](https://compressor.io/) - Simple & effective

## 🚀 Using Your Images

### Gallery Photos

Place in the appropriate subfolder, then update `index.html`:

```html
<img src="images/gallery/landscape/my-photo.jpg" alt="Description">
```

### Writing Covers

Place in `images/writings/`:

```html
<img src="images/writings/article-cover.jpg" alt="Article cover">
```

### Recommendations

Place in `images/recommendations/`:

```html
<img src="images/recommendations/hotel.jpg" alt="Hotel name">
```

### Hero Background

Place in `images/hero/` and update `styles.css`:

```css
url('images/hero/background.jpg')
```

## 💡 Tips

1. **Keep Originals**: Store high-res originals elsewhere
2. **Consistent Style**: Use similar editing for cohesive look
3. **Alt Text**: Always add descriptive alt text
4. **Test Loading**: Check page speed after adding images
5. **Backup**: Keep copies of your images

## 📝 Current Setup

The website currently uses placeholder images from Unsplash. Replace them with your own photos by:

1. Adding your images to the appropriate folders
2. Updating the `src` paths in `index.html`
3. Testing the site locally

---

Ready to add your photos? Start with 3-5 images to test, then add more! 📸✨

