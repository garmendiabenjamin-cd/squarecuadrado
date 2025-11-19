# Content Guide

This guide will help you customize and add content to your portfolio and travel website.

## Table of Contents
1. [Updating Personal Information](#updating-personal-information)
2. [Adding Photography](#adding-photography)
3. [Adding Writings](#adding-writings)
4. [Adding Recommendations](#adding-recommendations)
5. [Customizing Design](#customizing-design)
6. [Image Optimization Tips](#image-optimization-tips)

---

## Updating Personal Information

### Your Name and Branding

**Navigation Logo** (Line ~17 in `index.html`):
```html
<a href="#home" class="nav-logo">Your Name</a>
```
Change "Your Name" to your actual name or brand.

**Hero Section** (Line ~29 in `index.html`):
```html
<h1 class="hero-title">Capturing Moments,<br>Sharing Stories</h1>
<p class="hero-subtitle">A collection of photographs, writings, and travel recommendations from around the world</p>
```
Customize these to reflect your personal style and message.

**Footer** (Line ~574 in `index.html`):
```html
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

### Social Links

In the footer (Line ~555 in `index.html`):
```html
<div class="social-links">
    <a href="https://instagram.com/yourusername" aria-label="Instagram">Instagram</a>
    <a href="https://twitter.com/yourusername" aria-label="Twitter">Twitter</a>
    <a href="mailto:your@email.com" aria-label="Email">Email</a>
</div>
```

---

## Adding Photography

### Structure of a Gallery Item

Each photo in the gallery follows this structure:

```html
<div class="gallery-item" data-category="category-name">
    <div class="gallery-image-wrapper">
        <img src="path/to/your/photo.jpg" alt="Description of photo" loading="lazy">
        <div class="gallery-overlay">
            <h3>Photo Title</h3>
            <p>Location, Year</p>
        </div>
    </div>
</div>
```

### Available Categories

- `landscape` - Nature and landscape photography
- `urban` - City and architecture photos
- `portrait` - Portrait photography
- `travel` - General travel photos

### Example: Adding a New Photo

1. Save your photo in the project folder (or use a URL)
2. Add this code inside `<div class="gallery-grid">` (around line 51):

```html
<div class="gallery-item" data-category="landscape">
    <div class="gallery-image-wrapper">
        <img src="images/my-mountain-photo.jpg" alt="Sunset over mountains" loading="lazy">
        <div class="gallery-overlay">
            <h3>Alpine Sunset</h3>
            <p>Austrian Alps, 2024</p>
        </div>
    </div>
</div>
```

### Adding a New Photo Category

1. Add a new filter button (around line 48):
```html
<button class="filter-btn" data-filter="new-category">New Category</button>
```

2. Use `data-category="new-category"` on your gallery items

---

## Adding Writings

### Structure of a Writing Card

```html
<article class="writing-card">
    <div class="writing-image">
        <img src="path/to/cover-image.jpg" alt="Article cover" loading="lazy">
    </div>
    <div class="writing-content">
        <span class="writing-date">November 11, 2024</span>
        <h3 class="writing-title">Your Article Title</h3>
        <p class="writing-excerpt">A brief excerpt or summary of your article that entices readers to click and read more...</p>
        <a href="articles/your-article.html" class="read-more">Read More →</a>
    </div>
</article>
```

### Example: Adding a New Article

Add this inside `<div class="writings-grid">` (around line 107):

```html
<article class="writing-card">
    <div class="writing-image">
        <img src="images/paris-cover.jpg" alt="Paris streets" loading="lazy">
    </div>
    <div class="writing-content">
        <span class="writing-date">November 11, 2024</span>
        <h3 class="writing-title">A Week in Paris</h3>
        <p class="writing-excerpt">Discovering the hidden gems of Paris beyond the Eiffel Tower - from cozy cafes to secret gardens...</p>
        <a href="#" class="read-more">Read More →</a>
    </div>
</article>
```

### Creating Full Articles

You can create separate HTML files for full articles:

1. Create a folder: `articles/`
2. Create a file: `articles/paris-week.html`
3. Copy the structure from `index.html` but replace the content section
4. Link to it: `<a href="articles/paris-week.html" class="read-more">Read More →</a>`

---

## Adding Recommendations

Recommendations are organized into 5 categories: Hotels, Restaurants, Cafes, Attractions, and Airlines.

### Structure of a Recommendation Card

```html
<div class="recommendation-card">
    <div class="recommendation-image">
        <img src="path/to/place-image.jpg" alt="Place name" loading="lazy">
        <span class="recommendation-badge">5/5</span>
    </div>
    <div class="recommendation-content">
        <h3>Place Name</h3>
        <p class="location">City, Country</p>
        <p class="description">Your personal review and recommendations. What makes this place special? What should visitors know?</p>
        <div class="recommendation-tags">
            <span class="tag">Tag 1</span>
            <span class="tag">Tag 2</span>
            <span class="tag">Tag 3</span>
        </div>
    </div>
</div>
```

### Example: Adding a New Hotel

Find the Hotels tab (around line 184) and add:

```html
<div class="recommendation-card">
    <div class="recommendation-image">
        <img src="images/hotel-treehouse.jpg" alt="Treehouse Hotel" loading="lazy">
        <span class="recommendation-badge">4.5/5</span>
    </div>
    <div class="recommendation-content">
        <h3>The Treehouse Hotel</h3>
        <p class="location">Portland, Oregon, USA</p>
        <p class="description">Unique eco-friendly hotel built in actual trees. Sustainable luxury with stunning forest views and organic breakfast.</p>
        <div class="recommendation-tags">
            <span class="tag">Eco-Friendly</span>
            <span class="tag">Unique</span>
            <span class="tag">Nature</span>
        </div>
    </div>
</div>
```

### Recommendation Locations

- **Hotels**: Line ~184
- **Restaurants**: Line ~235
- **Cafes**: Line ~286
- **Attractions**: Line ~337
- **Airlines**: Line ~388

### Rating Guide

Use the badge to show your rating:
- `5/5` - Exceptional
- `4.5/5` - Excellent
- `4/5` - Very Good
- `3.5/5` - Good
- `3/5` - Average

---

## Customizing Design

### Changing Colors

Edit `styles.css` (around line 8):

```css
:root {
    --primary-color: #2c3e50;      /* Navigation, headings */
    --secondary-color: #e67e22;    /* Buttons, accents */
    --accent-color: #3498db;       /* Tab buttons */
    --text-dark: #2c3e50;          /* Main text */
    --text-light: #7f8c8d;         /* Secondary text */
    --bg-light: #f8f9fa;           /* Light backgrounds */
}
```

### Popular Color Schemes

**Elegant Dark:**
```css
--primary-color: #1a1a1a;
--secondary-color: #c9a961;
--accent-color: #6c63ff;
```

**Ocean Vibes:**
```css
--primary-color: #0d3b66;
--secondary-color: #ee964b;
--accent-color: #219ebc;
```

**Nature:**
```css
--primary-color: #2d6a4f;
--secondary-color: #95b46a;
--accent-color: #8cb369;
```

### Changing Fonts

Currently using:
- **Playfair Display** - Elegant serif for headings
- **Inter** - Modern sans-serif for body text

To change fonts, update the Google Fonts link in `index.html` (line 9) and the CSS font-family declarations.

### Hero Background Image

In `styles.css` (around line 92):

```css
.hero {
    background: linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 152, 219, 0.8)),
                url('path/to/your/hero-image.jpg') center/cover no-repeat;
}
```

Replace the URL with your own image. Best size: 1920px × 1080px or larger.

---

## Image Optimization Tips

### Recommended Image Sizes

- **Gallery photos**: 800-1200px on longest side
- **Article covers**: 800px × 600px
- **Recommendation images**: 800px × 600px  
- **Hero background**: 1920px × 1080px or larger

### Optimization Tools

**Online:**
- [TinyPNG](https://tinypng.com/) - Compress PNG and JPG
- [Squoosh](https://squoosh.app/) - Advanced image compression
- [JPEG.io](https://www.jpeg.io/) - JPEG optimization

**Desktop:**
- Adobe Photoshop - Save for Web
- GIMP - Export with quality settings
- ImageOptim (Mac)

### File Size Guidelines

- Gallery photos: Under 200KB
- Cover images: Under 150KB
- Hero background: Under 500KB

### Best Formats

- **JPEG** - Photos and images with many colors
- **PNG** - Graphics with transparency
- **WebP** - Modern format (best compression, but convert to JPEG as fallback)

### Folder Organization

Create an `images` folder to organize your photos:

```
portfolio-travel-site/
├── images/
│   ├── gallery/
│   │   ├── landscape/
│   │   ├── urban/
│   │   ├── portrait/
│   │   └── travel/
│   ├── writings/
│   ├── recommendations/
│   └── hero-bg.jpg
├── index.html
├── styles.css
└── script.js
```

---

## Quick Tips

1. **Test on Mobile**: Always check your site on mobile devices after adding content
2. **Use Descriptive Alt Text**: Helps with accessibility and SEO
3. **Consistent Naming**: Use lowercase and hyphens for file names (e.g., `my-photo.jpg`)
4. **Backup**: Keep original high-resolution photos in a separate folder
5. **Performance**: Don't add too many images on one page - consider pagination for large galleries

---

## Need Help?

- Check the main `README.md` for setup instructions
- Use browser Developer Tools (F12) to debug issues
- Ensure all file paths are correct (case-sensitive!)
- Test in multiple browsers

Happy customizing! 🎨📸✨

