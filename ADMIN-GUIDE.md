# Admin Panel Guide - Square Cuadrado

Your admin panel is now fully functional and works directly with your existing JSON files. **No migration needed!**

## 🚀 Quick Start

### Start the Admin Server
```bash
# Option 1: Use the start script
./start-admin.sh

# Option 2: Run directly with Node
node admin-server.js
```

The admin server runs on port **8889** and provides:
- Full CRUD operations on your recommendations
- Direct editing of `data/picks.json` and `data/picks-details.json`
- Real-time saving of all changes

### Access the Admin Panel
Once the server is running, open your browser to:
- **Dashboard**: http://localhost:8889/admin/dashboard.html
- **Editor**: http://localhost:8889/admin/editor.html

## ✨ Features

### Dashboard
- **Visual Overview**: See all your recommendations with images
- **Search & Filter**: Find content quickly by category or keyword
- **Quick Actions**:
  - ✏️ **Edit**: Open item in the editor
  - 👁️ **Preview**: See how it looks on the site
  - 📋 **Duplicate**: Create a copy for editing
  - 🗑️ **Delete**: Remove items (with confirmation)
- **Status Tracking**: See published vs draft items
- **Grid/List Views**: Switch between layouts

### Editor
- **Live Preview**: See changes as you type
- **All Fields Editable**:
  - Basic info (name, location, description)
  - Categories and tags
  - Detailed descriptions and highlights
  - Hero image and gallery images
  - Additional content sections
- **Save Options**:
  - 💾 **Save Draft**: Save as work-in-progress
  - 🚀 **Publish**: Mark as published and save

## 📝 How to Edit Content

### Edit Existing Items
1. Start the admin server: `node admin-server.js`
2. Go to Dashboard: http://localhost:8889/admin/dashboard.html
3. Click **Edit** on any item
4. Make your changes in the editor
5. Click **Save Draft** or **Publish**

### Add New Items
1. From the Dashboard, click **+ Add New**
2. Fill in all required fields
3. Add images, tags, and additional content
4. Click **Publish** when ready

### Delete Items
1. Click **Delete** on any item in the Dashboard
2. Confirm the deletion
3. The item is removed from both JSON files

## 🗂️ Data Structure

Your content is stored in two JSON files:

### `data/picks.json`
Contains basic information for all items:
```json
{
  "id": "unique-identifier",
  "name": "Item Name",
  "location": "City, Country",
  "description": "Brief description",
  "image": "path/to/image.jpg",
  "categories": ["hotels", "luxury"],
  "tags": ["Tag1", "Tag2"],
  "rating": 4.5,
  "orientation": "portrait"
}
```

### `data/picks-details.json`
Contains detailed content for each item:
```json
{
  "item-id": {
    "customContent": true,
    "headline": "Detailed headline",
    "description": "Long description",
    "highlights": ["Feature 1", "Feature 2"],
    "heroImage": "path/to/hero.jpg",
    "galleryImages": [
      { "src": "path/to/img1.jpg", "alt": "Description" }
    ],
    "additionalSections": [
      { "title": "Section Title", "content": "Section content" }
    ]
  }
}
```

## 🖼️ Image Management

### Image Paths
- Images are stored in `/images/` subdirectories
- Common folders:
  - `/images/hotels/`
  - `/images/recommendations/`
  - `/images/gallery/`
- The admin panel automatically handles path prefixes

### Adding Images
Currently, you need to:
1. Place image files in the appropriate folder
2. Enter the image path in the editor (e.g., `images/hotels/my-hotel.jpg`)
3. The preview will show the image immediately

## ⚙️ Technical Details

### Ports Used
- **8889**: Admin server (handles API and serves admin panel)
- **8888**: Optional static file server for testing main site

### API Endpoints
The admin server provides these REST endpoints:
- `GET /api/picks` - Get all picks
- `GET /api/picks-details` - Get all details
- `PUT /api/pick` - Update existing item
- `POST /api/pick` - Create new item
- `DELETE /api/pick/:id` - Delete item

### Browser Compatibility
Works best with modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 🔧 Troubleshooting

### "Cannot save changes"
**Solution**: Make sure the admin server is running:
```bash
node admin-server.js
```

### "Images not showing"
**Solution**: Check that image paths are correct and files exist in `/images/` folder

### "Changes not persisting"
**Solution**: The admin server must be running to save changes. Without it, changes are only temporary.

### "Port already in use"
**Solution**: Another process is using port 8889. Either:
1. Stop the other process
2. Or modify `admin-server.js` to use a different port

## 💡 Tips

1. **Always run the admin server** when editing content
2. **Use Save Draft** frequently to avoid losing work
3. **Check the preview** before publishing
4. **Keep image files organized** in appropriate folders
5. **Use descriptive IDs** for new items (they become part of URLs)

## 🚫 What NOT to Do

- Don't edit JSON files manually while the admin server is running
- Don't use the migration tool - it's no longer needed
- Don't delete the `default` entry in `picks-details.json`
- Don't use duplicate IDs for different items

## 📋 Workflow Example

### Adding a New Hotel Recommendation:
1. Start admin server: `node admin-server.js`
2. Open Dashboard: http://localhost:8889/admin/dashboard.html
3. Click **+ Add New**
4. Fill in:
   - Name: "Boutique Hotel Paris"
   - Location: "Paris, France"
   - Categories: Select "hotels"
   - Add tags: "Boutique", "Central", "Romantic"
   - Write descriptions and highlights
5. Add image path: `images/hotels/paris-boutique.jpg`
6. Click **Publish**
7. Done! Your new hotel is now in the system

## 🎉 That's It!

Your admin panel is ready to use. No migration needed - just start the server and begin editing your content visually!
