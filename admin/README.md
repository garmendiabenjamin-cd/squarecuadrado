# Admin Panel - Square Cuadrado

This admin panel provides a visual interface for managing your recommendations content.

## Access the Admin Panel

1. Start a local web server from the project root:
   ```bash
   cd /Users/benjamingarmendia/squarecuadrado
   python3 -m http.server 8888
   ```

2. Open your browser and navigate to:
   - **Dashboard**: http://localhost:8888/admin/dashboard.html
   - **Editor**: http://localhost:8888/admin/editor.html
   - **Migration Tool**: http://localhost:8888/admin/migrate-content.html

## Features

### Dashboard (`dashboard.html`)
- Visual overview of all recommendations
- Filter by category (Hotels, Restaurants, Apparel, etc.)
- Search functionality
- Grid and List view modes
- Quick actions: Edit, Preview, Duplicate
- Status indicators (Published/Draft)

### Editor (`editor.html`)
- Live preview of content as you edit
- Organized tabs:
  - **Basic Information**: Name, location, categories, tags
  - **Content**: Detailed descriptions, highlights
  - **Images**: Hero image and gallery management
  - **SEO & Meta**: URLs, notes, display settings
- Visual tag management
- Save as draft or publish directly

### Migration Tool (`migrate-content.html`)
- Convert existing JSON data to new YAML format
- Preview changes before migration
- Backup functionality
- Progress tracking

## Image Path Configuration

Images are stored in the main `/images/` directory and subdirectories:
- `/images/hotels/`
- `/images/recommendations/`
- `/images/gallery/`

The admin pages automatically prefix image paths with `../` since they're located in the `/admin/` subdirectory.

## Data Files

The admin panel reads from and writes to:
- `/data/picks.json` - Main recommendation data
- `/data/picks-details.json` - Detailed content for each recommendation

## Troubleshooting

### Images Not Loading
- Ensure the web server is running from the project root directory
- Check that image files exist in the specified paths
- Verify image paths in JSON files don't have duplicate `../` prefixes

### Cannot Access Admin Panel
- Make sure you're using `http://localhost:8888` (not `file://`)
- Check that no other process is using port 8888
- Try a different port if needed: `python3 -m http.server 9000`

### Changes Not Saving
- This demo version doesn't persist changes to files
- To implement saving, you'll need a backend server that can write to the JSON files

## Future Enhancements

- [ ] Backend API for persisting changes
- [ ] Image upload functionality
- [ ] User authentication
- [ ] Version control for content changes
- [ ] Bulk operations (delete multiple, bulk edit)
- [ ] Export/Import functionality
- [ ] Content preview before publishing
