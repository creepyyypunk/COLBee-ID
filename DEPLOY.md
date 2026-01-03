# Deployment Guide for Render

## Overview
This guide explains how to deploy COLBee ID Generator to Render with proper image loading configuration.

## Files Added for Deployment

1. **render.yaml** - Render service configuration with CORS headers
2. **public/_headers** - HTTP headers for static assets
3. **Image preloading system** - Ensures all images load before rendering

## Deployment Steps

### 1. Push to GitHub
Make sure all changes are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Add Render deployment configuration with image loading fixes"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `colbee-id` (or your preferred name)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 3. Environment Configuration

The `render.yaml` file will automatically configure:
- CORS headers for cross-origin image loading
- Cache headers for optimal performance
- Static asset serving

### 4. Deploy

Click "Create Static Site" and Render will automatically:
1. Install dependencies
2. Build the project
3. Deploy to production
4. Apply the headers from `render.yaml`

## Troubleshooting

### Images Not Loading

If images still don't load after deployment:

1. **Check Browser Console**
   ```
   F12 → Console tab
   Look for CORS errors or failed image requests
   ```

2. **Verify Headers**
   ```
   F12 → Network tab → Select an image → Headers tab
   Check for: Access-Control-Allow-Origin: *
   ```

3. **Check Build Output**
   - In Render dashboard, go to "Logs"
   - Verify build completed successfully
   - Check that all files in `public/` were copied to `dist/`

4. **Force Refresh**
   - Clear browser cache: Ctrl+Shift+Delete
   - Hard reload: Ctrl+Shift+R
   - Try in incognito mode

### Slow Loading

If images load slowly:

1. The app now preloads all images on startup
2. Users see "Loading images..." status
3. Retry logic automatically handles temporary failures
4. Each image has 10-second timeout with 3 retry attempts

## How the Image Loading Works

### 1. Initial Preload
- All role backgrounds and achievement icons are preloaded when app starts
- Default avatar is preloaded
- Loading happens in batches to avoid overwhelming the browser

### 2. Card-Specific Preload
- When user changes role/achievements, those specific images are preloaded
- Ensures images are ready before generation

### 3. Generation Time Preload
- Before generating card, images are preloaded one more time
- 500ms delay ensures DOM is ready
- 2-second stabilization delay before capture

### 4. Retry Logic
- Each image gets 3 attempts to load
- Exponential backoff: 500ms, 1000ms, 1500ms between retries
- 10-second timeout per attempt
- Cache-busting on retries to avoid browser cache issues

## Performance Optimizations

1. **Image Caching**: Images cached for 1 year (immutable)
2. **Eager Loading**: Critical images use `loading="eager"`
3. **Error Fallbacks**: Failed images show defaults or hide gracefully
4. **Asset Inlining Disabled**: Prevents CORS issues with data URLs

## Files Overview

```
├── public/
│   └── _headers              # Static file CORS headers
├── src/
│   ├── utils/
│   │   ├── imagePreloader.ts # Preloads images before rendering
│   │   ├── imageGenerator.ts # Updated with retry logic
│   │   └── canvasRenderer.ts # Canvas rendering with retries
│   ├── components/
│   │   └── Card/
│   │       └── CardPreview.tsx # Updated with error handlers
│   └── App.tsx               # Added preloading hooks
├── render.yaml               # Render deployment config
└── vite.config.ts           # Updated build settings
```

## Support

If you continue to experience issues:
1. Check the browser console for specific error messages
2. Verify all files in `public/` are properly committed
3. Ensure Render build logs show successful deployment
4. Test with different browsers to isolate browser-specific issues
