# Portfolio & Travel Guide Website

A beautiful, modern website to showcase your photography, writings, and travel recommendations. Built with HTML, CSS, and vanilla JavaScript - no frameworks required!

## Features

### 📸 Photography Gallery
- Responsive grid layout
- Category filtering (Landscapes, Urban, Portraits, Travel)
- Hover effects with image overlays
- Lazy loading for optimal performance

### ✍️ Writings Section
- Blog-style article cards
- Beautiful typography with Playfair Display and Inter fonts
- Hover animations
- Easy to add new articles

### 🌍 Travel Recommendations
- Organized by category: Hotels, Restaurants, Cafes, Attractions, Airlines
- Tab-based navigation
- Rating badges
- Location tags and descriptions

### 🎨 Design Features
- Fully responsive (mobile, tablet, desktop)
- Smooth scrolling and animations
- Modern, clean UI with elegant color scheme
- Fade-in animations on scroll
- Parallax hero section
- Fixed navigation bar

## Getting Started

### Quick Start

1. **Open the website:**
   Simply open `index.html` in your web browser. No build process or dependencies needed!

   ```bash
   open index.html
   ```

   Or if you want to run a local server:

   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js (if you have npx)
   npx http-server
   ```

   Then visit `http://localhost:8000` in your browser.

2. **Customize the content:**
   - Edit `index.html` to update text, images, and content
   - Replace placeholder images with your own photos
   - Update "Your Name" in the navigation and footer

3. **Personalize the design:**
   - Modify colors in `styles.css` (look for CSS variables in `:root`)
   - Adjust fonts, spacing, and layouts as needed

## Customization Guide

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main dark color */
    --secondary-color: #e67e22;    /* Accent orange */
    --accent-color: #3498db;       /* Blue accent */
    --text-dark: #2c3e50;          /* Dark text */
    --text-light: #7f8c8d;         /* Light text */
}
```

### Adding Your Photos

Replace the Unsplash placeholder images in `index.html`:

```html
<img src="path/to/your/photo.jpg" alt="Description">
```

**Recommended image sizes:**
- Gallery photos: 800px × 600px (or larger)
- Writing covers: 800px × 600px
- Recommendation cards: 800px × 600px
- Hero background: 1600px × 1200px (or larger)

### Adding New Content

#### Add a Photo to Gallery:

```html
<div class="gallery-item" data-category="landscape">
    <div class="gallery-image-wrapper">
        <img src="your-photo.jpg" alt="Description" loading="lazy">
        <div class="gallery-overlay">
            <h3>Photo Title</h3>
            <p>Location, Year</p>
        </div>
    </div>
</div>
```

#### Add a Writing/Blog Post:

```html
<article class="writing-card">
    <div class="writing-image">
        <img src="cover-image.jpg" alt="Article cover" loading="lazy">
    </div>
    <div class="writing-content">
        <span class="writing-date">Date</span>
        <h3 class="writing-title">Article Title</h3>
        <p class="writing-excerpt">Brief description...</p>
        <a href="#" class="read-more">Read More →</a>
    </div>
</article>
```

#### Add a Recommendation:

```html
<div class="recommendation-card">
    <div class="recommendation-image">
        <img src="place-image.jpg" alt="Place" loading="lazy">
        <span class="recommendation-badge">5/5</span>
    </div>
    <div class="recommendation-content">
        <h3>Place Name</h3>
        <p class="location">City, Country</p>
        <p class="description">Your review...</p>
        <div class="recommendation-tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
        </div>
    </div>
</div>
```

## Project Structure

```
portfolio-travel-site/
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # Interactive features and animations
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### GitHub Pages

1. Create a GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select your branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site is live instantly!

### Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

## Features Breakdown

### JavaScript Functionality
- Mobile navigation toggle
- Active navigation on scroll
- Photo gallery filtering
- Tab switching for recommendations
- Smooth scrolling
- Intersection Observer for animations
- Parallax effects
- Newsletter form handling

### CSS Features
- CSS Grid for layouts
- Flexbox for components
- CSS Variables for easy theming
- Media queries for responsiveness
- Transitions and animations
- Backdrop filter for navigation

## Customization Tips

1. **Update Your Information:**
   - Replace "Your Name" throughout the site
   - Add your social media links in the footer
   - Update the hero text to reflect your style

2. **SEO Optimization:**
   - Update the `<title>` tag
   - Add meta descriptions
   - Use descriptive alt text for images

3. **Performance:**
   - Optimize images (use WebP format when possible)
   - Images are already lazy loaded
   - Keep image file sizes under 200KB when possible

4. **Accessibility:**
   - All images have alt text
   - Semantic HTML is used throughout
   - Navigation is keyboard-friendly

## License

This project is free to use for personal or commercial projects. No attribution required.

## Support

If you encounter any issues or have questions:
1. Check that all files are in the same directory
2. Ensure images paths are correct
3. Test in a modern browser
4. Use browser developer tools to check for errors

---

Enjoy showcasing your photography and travel experiences! 🌍📸✈️

