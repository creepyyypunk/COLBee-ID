# COLBee ID Generator

A web application for generating personalized COLBee community member ID cards.

## Features

- Custom avatar upload with automatic circular cropping
- 5 main role selections with unique card designs
- Optional achievement badges
- Dynamic border glow based on role and achievements
- High-quality PNG export (1200x630px)
- Real-time preview
- Bee/honey themed design

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- html2canvas
- react-dropzone

## Development

### Install dependencies
```bash
npm install
```

### Run dev server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Design Integration

### Replacing Placeholder Card Backgrounds

The application currently uses placeholder gradient backgrounds. To add your custom designs:

1. Create 5 card background images (1200x630px PNG)
2. Save them in `public/card-designs/` with these filenames:
   - `newbee.png`
   - `worker-bee.png`
   - `honeycomber.png`
   - `manuka.png`
   - `bee-younder.png`
3. Update [src/config/roles.ts](src/config/roles.ts) to use file paths instead of placeholder generator:
   ```typescript
   background: '/card-designs/newbee.png'
   ```

### Replacing Achievement Icons

1. Create achievement icon images (60x60px PNG)
2. Save them in `public/icons/` with these filenames:
   - `colmeia-collective.png`
   - `colmeia-guider.png`
   - `colb-1k.png`
3. Update [src/config/achievements.ts](src/config/achievements.ts) to use file paths:
   ```typescript
   icon: '/icons/colmeia-collective.png'
   ```

### Adjusting Layout

If you need to adjust the position of elements on the card:

1. Edit [src/config/cardLayout.ts](src/config/cardLayout.ts)
2. Modify the `x`, `y`, and size values for:
   - Avatar position and radius
   - Username position and font size
   - Role text position
   - Social handles positions
   - Achievement icons position and spacing

### Customizing Border Glow Colors

1. Edit [src/config/roles.ts](src/config/roles.ts) to change role glow colors
2. Edit [src/config/achievements.ts](src/config/achievements.ts) to change achievement glow colors
3. Adjust `glowIntensity` values (0.0 to 1.0) to control brightness

## Adding New Content

### Adding a New Achievement

1. Add achievement icon to `public/icons/new-achievement.png`
2. Add entry to [src/config/achievements.ts](src/config/achievements.ts):
   ```typescript
   {
     id: 'new-achievement',
     name: 'New Achievement Name',
     icon: '/icons/new-achievement.png',
     glowColor: '#COLOR',
     glowIntensity: 0.5
   }
   ```

### Adding a New Role

1. Add background image to `public/card-designs/new-role.png`
2. Add entry to [src/config/roles.ts](src/config/roles.ts)
3. Update `RoleId` type in [src/types/role.types.ts](src/types/role.types.ts)

## Deployment

The application is configured for deployment on Render:

- Build command: `npm run build`
- Publish directory: `dist`
- Auto-deploy from GitHub main branch

## License

© 2025 COLBee Community. All rights reserved.
