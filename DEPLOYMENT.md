# GitHub Pages Deployment Guide

This guide will help you deploy your wedding invitation to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Node.js or Bun installed

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then select "New repository"
3. Name your repository (e.g., `wedding-invitation` or `my-wedding`)
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Update Configuration

### Option A: Custom Repository Name (e.g., `wedding-invitation`)

If your repository is named `wedding-invitation`, your site will be at:
`https://yourusername.github.io/wedding-invitation/`

1. Update `vite.config.js`:
   ```js
   base: '/wedding-invitation/',
   ```

2. Update `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/wedding-invitation",
   ```

### Option B: Username Repository (e.g., `yourusername.github.io`)

If your repository is named `yourusername.github.io`, your site will be at:
`https://yourusername.github.io/`

1. Update `vite.config.js`:
   ```js
   base: '/',
   ```

2. Update `package.json`:
   ```json
   "homepage": "https://yourusername.github.io",
   ```

## Step 3: Connect to GitHub

Run these commands in your terminal (replace with your repository URL):

```bash
# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/wedding-invitation.git

# Or if you already have a remote, update it:
git remote set-url origin https://github.com/yourusername/wedding-invitation.git

# Commit your changes
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
git push -u origin main
```

## Step 4: Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
# or
bun install
```

## Step 5: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
# or
bun run deploy
```

This will:
1. Build your app (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Your site will be live at the URL specified in `package.json`

## Step 6: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: **gh-pages**
5. Select folder: **/ (root)**
6. Click **Save**

Your site should be live in a few minutes!

## Troubleshooting

### Assets not loading correctly
- Make sure the `base` path in `vite.config.js` matches your repository name
- The base path should start and end with `/` (e.g., `/wedding-invitation/`)

### 404 errors
- Clear your browser cache
- Wait a few minutes for GitHub Pages to update
- Check that the `gh-pages` branch exists and has files

### Build errors
- Make sure all dependencies are installed: `npm install` or `bun install`
- Check for any syntax errors in your code
- Try deleting `node_modules` and reinstalling

## Updating Your Site

After making changes:

```bash
# Make your changes
git add .
git commit -m "Update wedding details"
git push origin main

# Deploy the changes
npm run deploy
# or
bun run deploy
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

