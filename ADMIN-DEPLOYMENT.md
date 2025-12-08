# Admin Panel Deployment Guide

## Important: The Admin Panel Runs LOCALLY Only

The admin panel is designed to run on your local machine, not on GitHub Pages or any static hosting. This is because it needs a Node.js server to save changes to your JSON files.

## How It Works

```
┌─────────────────┐           ┌──────────────────┐
│  LOCAL MACHINE  │           │  GITHUB PAGES    │
│                 │           │                  │
│  Admin Panel    │  Push     │  Public Website  │
│  (Edit Content) │ ────────> │  (View Only)     │
│  Port 8889      │           │                  │
└─────────────────┘           └──────────────────┘
```

## Workflow After Deploying to GitHub

### 1. Initial Setup (One Time)
```bash
# Clone your repository locally
git clone https://github.com/YOUR-USERNAME/squarecuadrado.git
cd squarecuadrado

# Make the start script executable
chmod +x start-admin.sh
```

### 2. Regular Editing Workflow

#### Step 1: Pull Latest Changes
```bash
# Always start by getting the latest version
git pull origin main
```

#### Step 2: Start Admin Panel
```bash
# Start the admin server locally
node admin-server.js
# OR
./start-admin.sh
```

#### Step 3: Edit Content
- Open browser to http://localhost:8889/admin/dashboard.html
- Edit your recommendations
- Save changes (they're saved to local JSON files)

#### Step 4: Push Changes to GitHub
```bash
# Check what changed
git status

# Add your changes
git add data/picks.json data/picks-details.json
git add images/*  # if you added new images

# Commit with a descriptive message
git commit -m "Updated hotel recommendations"

# Push to GitHub
git push origin main
```

#### Step 5: Changes Go Live
- GitHub Pages automatically updates (usually within 1-2 minutes)
- Your edited content is now live on your website

## Complete Example Workflow

```bash
# 1. Morning: Want to add a new restaurant
cd ~/squarecuadrado
git pull origin main

# 2. Start admin panel
node admin-server.js

# 3. Open browser, add new restaurant via admin panel
# http://localhost:8889/admin/dashboard.html
# Click "+ Add New", fill in details, click "Publish"

# 4. Push changes to GitHub
git add -A
git commit -m "Added new restaurant: La Cabrera"
git push origin main

# 5. Done! Changes are live in ~2 minutes
```

## Alternative Deployment Options

### Option 1: Local-Only Admin (Current Setup) ✅
**Pros:**
- Simple, secure
- No hosting costs
- Full control over your data
- Works offline

**Cons:**
- Must use your computer to edit
- Can't edit from other devices

### Option 2: Private Cloud Admin (Future Enhancement)
If you want to edit from anywhere, you could deploy the admin server to:

**Vercel/Netlify Functions:**
- Deploy admin API as serverless functions
- Add authentication
- Cost: Free tier usually sufficient

**Small VPS (DigitalOcean, Linode):**
- Run Node.js server 24/7
- Add password protection
- Cost: ~$5/month

**Heroku:**
- Deploy admin server
- Add basic auth
- Cost: ~$7/month

### Option 3: Use a CMS Service
Replace JSON files with a headless CMS:
- **Contentful** (free tier available)
- **Strapi** (self-hosted or cloud)
- **Sanity** (generous free tier)

## Security Considerations

### Current Setup (Local Admin)
✅ **Most Secure** - No public access to edit functions

### If You Deploy Admin Publicly
⚠️ **Must Add:**
- Authentication (username/password minimum)
- HTTPS only
- Environment variables for sensitive data
- Rate limiting
- Input validation

## Quick Setup Script

Save this as `setup-local-admin.sh`:

```bash
#!/bin/bash

echo "Setting up local admin for Square Cuadrado..."

# Check if in repo
if [ ! -f "admin-server.js" ]; then
    echo "Error: Not in squarecuadrado directory!"
    exit 1
fi

# Pull latest
echo "Getting latest version..."
git pull origin main

# Start admin
echo "Starting admin panel..."
node admin-server.js &

# Open browser
sleep 2
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8889/admin/dashboard.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:8889/admin/dashboard.html
fi

echo "Admin panel is running!"
echo "Edit your content, then run: git add -A && git commit -m 'Updated content' && git push"
```

## FAQ

### Q: Can I edit content directly on GitHub?
**A:** Yes, you can edit the JSON files directly on GitHub.com, but it's not recommended as it's easy to break JSON syntax. The admin panel is much safer.

### Q: Can other people edit my content?
**A:** Only if they have:
1. Access to your GitHub repository (collaborator access)
2. The ability to run the admin panel locally
3. Permission to push changes

### Q: How do I let someone else edit content?
**A:** 
1. Add them as a collaborator on GitHub
2. Have them clone the repo
3. They run `node admin-server.js` locally
4. They make edits and push changes

### Q: Can I edit from my phone/tablet?
**A:** Not with the current setup. You'd need to deploy the admin server to a cloud service with authentication.

### Q: What if I'm not near my computer?
**A:** Emergency options:
1. Edit JSON files directly on GitHub.com (careful with syntax!)
2. Use GitHub's web editor
3. Use GitHub mobile app (for small changes)

## Summary

1. **Admin panel = LOCAL tool** for editing
2. **GitHub Pages = PUBLIC display** of content
3. **Workflow**: Pull → Edit Locally → Push → Goes Live

This separation keeps your editing secure while making your content publicly accessible. The admin panel is your "backstage" tool that only runs on your computer.
