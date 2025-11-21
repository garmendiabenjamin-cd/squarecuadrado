# Managing Picks - Quick Guide

Your picks (recommendations) are now managed through a simple JSON file instead of editing HTML directly. This makes it much easier to add, edit, or remove picks.

## 📍 File Location

All picks data is stored in: `/data/picks.json`

## 🔧 How to Add a New Pick

1. Open `/data/picks.json` in any text editor
2. Find the appropriate category (hotels, restaurants, cafes, attractions, airlines)
3. Add a new item to the `items` array:

```json
{
  "id": "unique-id-here",
  "name": "Name of the Place",
  "location": "City, Country",
  "description": "Brief description of why you recommend it",
  "image": "images/picks/category/filename.jpg",
  "categories": ["hotels", "wellness-fitness"],
  "rating": 5,
  "tags": ["Tag1", "Tag2", "Tag3"],
  "orientation": "landscape",
  "detailPage": "optional-detail-page.html"
}
```

### Field Explanations:

- **id**: Unique identifier (use lowercase, hyphens instead of spaces)
- **name**: Display name of the pick
- **location**: City and country
- **description**: 1-2 sentences about the place
- **image**: Path to the image file (see Image Guidelines below)
- **categories**: Array of categories (e.g., ["hotels", "wellness-fitness"])
  - Available categories: "hotels", "restaurants", "cafes", "tech", "apparel", "wellness-fitness", "accessories"
- **rating**: Number from 1-5
- **tags**: Array of descriptive tags
- **orientation**: "portrait" or "landscape" (for masonry layout)
- **detailPage**: Optional - link to a detailed page

## 📸 Image Guidelines

### Folder Structure
Store images in organized folders:
```
images/
├── picks/
│   ├── hotels/
│   ├── restaurants/
│   ├── cafes/
│   └── attractions/
```

### Image Best Practices
- **Size**: 800x600px minimum (landscape), 600x800px (portrait)
- **Format**: JPEG for photos, PNG for graphics
- **File size**: Keep under 200KB for fast loading
- **Naming**: Use descriptive names like `hotel-totem-exterior.jpg`

## ✏️ How to Edit a Pick

1. Find the pick by its `id` in the JSON file
2. Update any fields you need
3. Save the file
4. Refresh your browser to see changes

## 🗑️ How to Remove a Pick

1. Find the pick in the JSON file
2. Delete the entire object (from `{` to `}`)
3. Make sure to remove any trailing comma if it was the last item
4. Save the file

## 🎨 Customizing Display

### Adding a New Category
To add a new category (e.g., "Museums"):

1. Add a new section in the JSON:
```json
"museums": {
  "title": "Museums",
  "items": []
}
```

2. Update the filter buttons in `recommendations.html` if needed

### Changing the Order
Items appear in the order they're listed in the JSON file. Simply rearrange them to change the display order.

## 🚀 Advanced Features

### Using External Images
You can use images from external sources:
```json
"image": "https://example.com/image.jpg"
```

### Adding Custom Fields
You can add any custom fields to picks:
```json
{
  "id": "special-place",
  "name": "Special Place",
  "customField": "Any value you want",
  "priceRange": "$$$",
  "bestTime": "Spring",
  ...
}
```

Then update the JavaScript rendering functions to display these fields.

## ❓ Troubleshooting

### Changes Not Showing?
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for errors (F12)
3. Verify JSON syntax is valid (no missing commas, quotes, etc.)

### Images Not Loading?
1. Check the file path is correct
2. Ensure image file exists in the specified location
3. Verify image file isn't corrupted

### JSON Syntax Errors?
Use a JSON validator: https://jsonlint.com/

## 💡 Tips

1. **Keep a Backup**: Before making major changes, copy the JSON file
2. **Use a Good Editor**: VS Code, Sublime Text, or any editor with JSON syntax highlighting
3. **Test Locally**: Always test changes on your local server before deploying
4. **Commit Often**: If using Git, commit after each set of changes

## Example: Adding a New Restaurant

1. Take/prepare an image: `images/picks/restaurants/osteria-francescana.jpg`
2. Add to picks array in JSON:
```json
{
  "id": "osteria-francescana",
  "name": "Osteria Francescana",
  "location": "Modena, Italy",
  "description": "Three Michelin stars, innovative Italian cuisine by Massimo Bottura",
  "image": "images/picks/restaurants/osteria-francescana.jpg",
  "categories": ["restaurants"],
  "rating": 5,
  "tags": ["Fine Dining", "Italian", "Michelin"],
  "orientation": "landscape"
}
```
3. Save and refresh!

That's it! Managing your picks is now as simple as editing a single JSON file. No HTML knowledge required! 🎉
