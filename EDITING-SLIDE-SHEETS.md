# Editing Slide Sheet Content

This guide explains how to customize the content that appears in the slide sheets (side panels) when clicking on picks.

## Quick Start

To edit slide sheet content, modify the `/data/picks-details.json` file. Each pick can have custom content by adding an entry with its ID.

## File Structure

The `picks-details.json` file contains custom content for each pick:

```json
{
  "pick-id": {
    "customContent": true,
    "heroImage": "path/to/image.png",
    "headline": "Main headline text",
    "subheadline": "Smaller headline above main",
    "description": "Detailed description paragraph",
    "highlights": [
      "Bullet point 1",
      "Bullet point 2"
    ],
    "galleryImages": [
      {
        "src": "path/to/gallery1.png",
        "alt": "Image description"
      }
    ],
    "additionalSections": [
      {
        "title": "Section Title",
        "content": "Section content text"
      }
    ]
  }
}
```

## Field Descriptions

### Required Fields
- `customContent`: Set to `true` to use custom content, `false` to use default

### Optional Fields (when customContent is true)
- `heroImage`: Path to the main image (defaults to pick's image if not specified)
- `headline`: Large headline text
- `subheadline`: Smaller text above the headline
- `description`: Main description paragraph
- `highlights`: Array of bullet points
- `galleryImages`: Array of image objects with `src` and `alt`
- `additionalSections`: Array of custom sections with `title` and `content`

## Examples

### Basic Custom Content
```json
"hotel-xyz": {
  "customContent": true,
  "headline": "A perfect urban retreat",
  "description": "Experience luxury in the heart of the city..."
}
```

### Full Custom Content
```json
"restaurant-abc": {
  "customContent": true,
  "heroImage": "images/custom/restaurant-hero.jpg",
  "subheadline": "Michelin-starred dining",
  "headline": "Where tradition meets innovation",
  "description": "Chef Maria's award-winning cuisine...",
  "highlights": [
    "Seasonal tasting menus",
    "Extensive wine selection",
    "Private dining available"
  ],
  "galleryImages": [
    {
      "src": "images/custom/dining-room.jpg",
      "alt": "Main dining room"
    },
    {
      "src": "images/custom/signature-dish.jpg",
      "alt": "Signature dish"
    }
  ],
  "additionalSections": [
    {
      "title": "Reservations",
      "content": "Book 2-3 weeks in advance. Walk-ins accepted at the bar."
    }
  ]
}
```

### Default Content
For picks without custom content, set `customContent` to `false` or omit the entry entirely:
```json
"simple-pick": {
  "customContent": false
}
```

## How to Add Content for a New Pick

1. Find the pick's ID in `/data/picks.json`
2. Add an entry in `/data/picks-details.json` with that ID
3. Set `customContent: true`
4. Add the fields you want to customize
5. Save the file and refresh the page

## Tips

- Images should be placed in the `/images/` directory
- Use relative paths for images (e.g., `images/hotels/hotel-name.jpg`)
- Keep descriptions concise for better mobile viewing
- Test on both desktop and mobile views
- The gallery works best with square or near-square images

## Default Behavior

If a pick doesn't have an entry in `picks-details.json`, it will display:
- The pick's main image
- Location
- Description from `picks.json`
- Rating
- Tags
- "View Full Details" button (if detailPage exists)

## Troubleshooting

- If content doesn't appear, check the browser console for errors
- Ensure the pick ID matches exactly between `picks.json` and `picks-details.json`
- Verify image paths are correct
- Make sure JSON syntax is valid (no trailing commas, proper quotes)
