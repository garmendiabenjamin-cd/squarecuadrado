# Quick Start Guide

Get your portfolio and travel website running in minutes!

## 🚀 Launch the Website

### Option 1: Direct Browser Open
Simply double-click `index.html` or drag it into your browser.

### Option 2: Local Server (Recommended)

**Using the included script:**
```bash
./start.sh
```

**Using Python 3:**
```bash
python3 -m http.server 8000
```
Then visit: http://localhost:8000

**Using Node.js:**
```bash
npx http-server -p 8000
```

---

## ✏️ Customize in 5 Minutes

### 1. Update Your Name (2 mins)
Open `index.html` and search for "Your Name":
- Line 17: Navigation logo
- Line 574: Footer copyright

### 2. Change Hero Text (1 min)
Edit the hero section (around line 29):
- Change the title
- Update the subtitle

### 3. Update Colors (2 mins)
Open `styles.css` and edit the colors (around line 8):
```css
:root {
    --primary-color: #2c3e50;      /* Your color here */
    --secondary-color: #e67e22;    /* Your accent color */
}
```

---

## 📸 Add Your First Photo

1. Save your photo in `images/gallery/landscape/`
2. Open `index.html`
3. Find the gallery section (around line 51)
4. Copy an existing gallery item and update:

```html
<div class="gallery-item" data-category="landscape">
    <div class="gallery-image-wrapper">
        <img src="images/gallery/landscape/your-photo.jpg" alt="Description">
        <div class="gallery-overlay">
            <h3>Photo Title</h3>
            <p>Location, 2024</p>
        </div>
    </div>
</div>
```

---

## ✍️ Add Your First Article

1. Find the writings section (around line 107)
2. Copy an existing writing card
3. Update the content:

```html
<article class="writing-card">
    <div class="writing-image">
        <img src="images/writings/cover.jpg" alt="Cover">
    </div>
    <div class="writing-content">
        <span class="writing-date">November 11, 2024</span>
        <h3 class="writing-title">My Title</h3>
        <p class="writing-excerpt">My excerpt...</p>
        <a href="#" class="read-more">Read More →</a>
    </div>
</article>
```

---

## 🌍 Add a Recommendation

1. Decide the category (Hotels, Restaurants, Cafes, Attractions, Airlines)
2. Find that tab's content section
3. Add a new card:

```html
<div class="recommendation-card">
    <div class="recommendation-image">
        <img src="images/recommendations/place.jpg" alt="Place">
        <span class="recommendation-badge">5/5</span>
    </div>
    <div class="recommendation-content">
        <h3>Place Name</h3>
        <p class="location">City, Country</p>
        <p class="description">Your review...</p>
        <div class="recommendation-tags">
            <span class="tag">Tag</span>
        </div>
    </div>
</div>
```

---

## 📁 File Structure

```
portfolio-travel-site/
├── index.html              ← Main website file
├── styles.css              ← All styling
├── script.js               ← Interactive features
├── README.md               ← Full documentation
├── CONTENT-GUIDE.md        ← Detailed content guide
├── QUICK-START.md          ← This file
├── start.sh                ← Launch script
├── package.json            ← Project info
└── images/                 ← Your photos
    ├── gallery/
    │   ├── landscape/
    │   ├── urban/
    │   ├── portrait/
    │   └── travel/
    ├── writings/
    ├── recommendations/
    └── hero/
```

---

## 🎨 Common Customizations

### Change the Hero Background
Edit `styles.css` line 92:
```css
url('images/hero/your-background.jpg')
```

### Add Social Media Links
Edit `index.html` around line 555:
```html
<a href="https://instagram.com/yourusername">Instagram</a>
```

### Change Fonts
Currently using Playfair Display (headings) and Inter (body).
Update the Google Fonts link in `index.html` line 9.

---

## 🚢 Deploy Your Site

### GitHub Pages (Free)
1. Create a GitHub repo
2. Push your code
3. Go to Settings → Pages
4. Select branch and save
5. Your site is live!

### Netlify (Free)
1. Visit [netlify.com](https://netlify.com)
2. Drag your folder
3. Done! Site is live

### Vercel (Free)
1. Visit [vercel.com](https://vercel.com)  
2. Import from GitHub
3. One-click deploy

---

## 💡 Pro Tips

1. **Test on Mobile**: Check responsive design on your phone
2. **Optimize Images**: Keep files under 200KB for fast loading
3. **Backup Originals**: Save high-res photos separately
4. **Use Alt Text**: Describe images for accessibility
5. **Keep It Simple**: Start small, add more content over time

---

## 🐛 Troubleshooting

**Images not showing?**
- Check file paths are correct (case-sensitive!)
- Make sure images are in the right folder
- Verify image file names match HTML

**Styling looks broken?**
- Ensure `styles.css` is in the same folder as `index.html`
- Check browser console (F12) for errors

**JavaScript not working?**
- Ensure `script.js` is in the same folder
- Check for typos in element IDs
- Look for errors in browser console (F12)

---

## 📚 More Help

- **CONTENT-GUIDE.md** - Detailed content editing guide
- **README.md** - Full documentation and features
- Browser DevTools (F12) - Debug issues

---

## 🎉 You're Ready!

Your portfolio and travel site is ready to share with the world.

1. Add your photos
2. Write your stories
3. Share your recommendations
4. Deploy online

**Happy creating!** 📸✈️✨

