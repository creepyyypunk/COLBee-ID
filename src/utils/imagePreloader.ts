import { ROLES } from '../config/roles';
import { ADDITIONAL_ROLES } from '../config/additionalRoles';

/**
 * Preloads a single image
 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();

    // Set crossOrigin for external images
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    const timeout = setTimeout(() => {
      console.warn('[Preloader] Image timeout:', src.substring(0, 50));
      resolve(); // Resolve anyway to not block
    }, 10000);

    img.onload = () => {
      clearTimeout(timeout);
      console.log('[Preloader] Loaded:', src.substring(0, 50));
      resolve();
    };

    img.onerror = () => {
      clearTimeout(timeout);
      console.error('[Preloader] Failed to load:', src.substring(0, 50));
      resolve(); // Resolve anyway to not block
    };

    img.src = src;
  });
}

/**
 * Preloads all role backgrounds and achievement icons
 */
export async function preloadAllImages(): Promise<void> {
  console.log('[Preloader] Starting preload...');

  const imagesToPreload = [
    // Default avatar
    '/images/avatar_bee.webp',

    // All role backgrounds
    ...ROLES.map(role => role.background),

    // All achievement icons
    ...ADDITIONAL_ROLES.map(achievement => achievement.icon),
  ];

  // Remove duplicates
  const uniqueImages = [...new Set(imagesToPreload)];

  console.log(`[Preloader] Preloading ${uniqueImages.length} images...`);

  // Preload in batches to avoid overwhelming the browser
  const batchSize = 5;
  for (let i = 0; i < uniqueImages.length; i += batchSize) {
    const batch = uniqueImages.slice(i, i + batchSize);
    await Promise.all(batch.map(src => preloadImage(src)));
  }

  console.log('[Preloader] All images preloaded');
}

/**
 * Preloads images for a specific role and achievements
 */
export async function preloadCardImages(
  roleId: string,
  achievementIds: string[],
  avatarUrl?: string
): Promise<void> {
  const role = ROLES.find(r => r.id === roleId);
  const achievements = ADDITIONAL_ROLES.filter(a => achievementIds.includes(a.id));

  const imagesToPreload = [
    role?.background,
    avatarUrl || '/images/avatar_bee.webp',
    ...achievements.map(a => a.icon),
  ].filter(Boolean) as string[];

  console.log(`[Preloader] Preloading ${imagesToPreload.length} card images...`);

  await Promise.all(imagesToPreload.map(src => preloadImage(src)));

  console.log('[Preloader] Card images preloaded');
}
