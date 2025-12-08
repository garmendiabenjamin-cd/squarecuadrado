# Image Upload Guide - Square Cuadrado Admin Panel

## ✅ Image Upload is Now Functional!

Your admin panel now supports direct image uploads for both hero images and gallery images.

## How to Upload Images

### Prerequisites
Make sure the admin server is running:
```bash
node admin-server.js
```

### Uploading Hero Images
1. Open the editor for any recommendation
2. Click on the **Images** tab
3. In the **Hero Image** section, click **"📷 Click to upload hero image"**
4. Select an image file from your computer
5. The image will be uploaded and immediately displayed

### Uploading Gallery Images
1. Open the editor for any recommendation
2. Click on the **Images** tab
3. In the **Gallery Images** section, click **"📷 Click to upload gallery images"**
4. Select one or multiple images
5. All selected images will be uploaded and added to the gallery

## Features

### Supported Formats
- JPEG/JPG
- PNG
- GIF
- WebP

### File Size Limit
- Maximum 5MB per image

### Automatic Features
- **Unique Filenames**: Images are automatically renamed with timestamps to avoid conflicts
- **Proper Folder Organization**: 
  - Hero images → `images/hotels/`
  - Gallery images → `images/recommendations/`
- **Instant Preview**: Images appear immediately after upload
- **Path Management**: Paths are automatically set correctly

## How It Works

1. **Select Image**: Click the upload area and choose image(s)
2. **Automatic Upload**: Images are sent to the admin server
3. **Server Processing**: 
   - Validates the image
   - Generates unique filename
   - Saves to appropriate folder
4. **Update Interface**: Image appears in editor with remove button
5. **Save to JSON**: When you click Save/Publish, paths are saved to JSON files

## Image Management

### To Remove Images
- **Hero Image**: Click the × button on the image
- **Gallery Images**: Click the × button on any gallery image

### Image Paths in JSON
Images are saved with relative paths:
```json
{
  "heroImage": "images/hotels/1234567890-abc123.jpg",
  "galleryImages": [
    {
      "src": "images/recommendations/1234567891-def456.png",
      "alt": "Gallery image"
    }
  ]
}
```

## Troubleshooting

### Images Not Uploading?

1. **Check Server is Running**
   ```bash
   node admin-server.js
   ```

2. **Check Console for Errors**
   - Open browser developer tools (F12)
   - Look for errors in Console tab

3. **Manual Fallback**
   If upload fails, you'll see instructions to:
   - Place image in appropriate folder manually
   - Enter the path in the editor

### Common Issues

**"Upload failed" Error**
- Solution: Ensure admin server is running on port 8889

**Image Not Showing After Upload**
- Solution: Check if image file exists in the folder
- Try refreshing the page

**File Too Large Error**
- Solution: Resize image to under 5MB
- Use image compression tools

## File Organization

```
squarecuadrado/
├── images/
│   ├── hotels/           # Hero images for hotels
│   ├── recommendations/  # Gallery and product images
│   └── gallery/          # Other gallery images
```

## Advanced Tips

### Bulk Upload
- Select multiple images at once for gallery
- All selected files will be uploaded sequentially

### Image Optimization
Before uploading, optimize images:
- Resize to reasonable dimensions (1200px max width recommended)
- Compress JPEGs to 80-90% quality
- Use WebP for better compression

### Naming Convention
Uploaded files are automatically renamed:
```
[timestamp]-[random].extension
Example: 1701234567890-a3f2.jpg
```

## Server Requirements

The upload feature requires:
- Node.js admin server running (`admin-server.js`)
- Write permissions to images folders
- Port 8889 available

## Security Notes

- Images are only uploadable when admin server is running locally
- No public upload endpoint when deployed to GitHub Pages
- All uploads require local machine access

## Future Enhancements

Potential improvements:
- [ ] Drag-and-drop upload
- [ ] Image cropping/resizing in browser
- [ ] Upload progress indicator
- [ ] Bulk delete for gallery images
- [ ] Image compression before upload

---

Your image upload feature is now fully functional! Just make sure the admin server is running and you can upload images directly through the interface.
