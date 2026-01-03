import { CardData } from '../types/card.types';
import { ROLES } from '../config/roles';
import { ADDITIONAL_ROLES } from '../config/additionalRoles';
import { CARD_LAYOUT } from '../config/cardLayout';

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

/**
 * Loads an image from a URL or data URL
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    // Remove crossOrigin for data URLs
    if (src.startsWith('data:')) {
      img.removeAttribute('crossOrigin');
    }

    img.onload = () => resolve(img);
    img.onerror = (e) => {
      console.error('Failed to load image:', src, e);
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
}

/**
 * Draws text with glow effect
 */
function drawGlowText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  glowConfig?: { color: string; intensity: number }
) {
  if (glowConfig) {
    // Draw glow
    ctx.shadowColor = glowConfig.color;
    ctx.shadowBlur = glowConfig.intensity * 8;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);

    // Reset shadow for crisp text on top
    ctx.shadowBlur = 0;
    ctx.fillText(text, x, y);
  } else {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }
}

/**
 * Ensures fonts are loaded before rendering
 */
async function ensureFontsLoaded(): Promise<void> {
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
      console.log('[Canvas] Fonts loaded');
    } catch (error) {
      console.warn('[Canvas] Font loading check failed:', error);
    }
  }
}

/**
 * Generates a card image using native Canvas API
 */
export async function generateCardImageCanvas(
  cardData: CardData
): Promise<string> {
  // Wait for fonts to load
  await ensureFontsLoaded();

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Enable better text rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  try {
    const role = ROLES.find(r => r.id === cardData.role) || ROLES[0];
    const additionalRoles = ADDITIONAL_ROLES.filter(a =>
      cardData.achievements.includes(a.id)
    );

    console.log('[Canvas] Starting render for role:', role.name);

    // 1. Draw background
    console.log('[Canvas] Loading background:', role.background);
    const bgImage = await loadImage(role.background);
    ctx.drawImage(bgImage, 0, 0, CARD_WIDTH, CARD_HEIGHT);
    console.log('[Canvas] Background drawn');

    // 2. Draw avatar
    const avatarSrc = cardData.avatar || '/images/avatar_bee.webp';
    console.log('[Canvas] Loading avatar:', avatarSrc.substring(0, 50));

    const avatarImage = await loadImage(avatarSrc);

    const avatarX = CARD_WIDTH / 2 - CARD_LAYOUT.avatar.radius;
    const avatarY = CARD_LAYOUT.avatar.y;
    const avatarSize = CARD_LAYOUT.avatar.radius * 2;

    // Create circular clip for avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      CARD_WIDTH / 2,
      avatarY + CARD_LAYOUT.avatar.radius,
      CARD_LAYOUT.avatar.radius,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();
    console.log('[Canvas] Avatar drawn');

    // 3. Draw username
    const username = cardData.username || 'Your Name';
    ctx.font = `${CARD_LAYOUT.username.fontWeight} ${CARD_LAYOUT.username.fontSize}px 'Instrument Serif', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    drawGlowText(
      ctx,
      username,
      CARD_WIDTH / 2,
      CARD_LAYOUT.username.y,
      role.usernameColor,
      role.textGlow
    );
    console.log('[Canvas] Username drawn');

    // 4. Draw social handles
    const socialY = {
      twitter: CARD_LAYOUT.social.twitter.y,
      discord: CARD_LAYOUT.social.discord.y
    };

    ctx.font = `${CARD_LAYOUT.social.twitter.fontSize}px 'Instrument Serif', serif`;

    if (cardData.twitter) {
      const displayHandle = cardData.twitter.startsWith('@')
        ? cardData.twitter
        : `@${cardData.twitter}`;
      const text = `X: ${displayHandle}`;

      drawGlowText(
        ctx,
        text,
        CARD_WIDTH / 2,
        socialY.twitter,
        role.socialColor,
        role.socialTextGlow || role.textGlow
      );
    }

    if (cardData.discord) {
      const text = `Discord: ${cardData.discord}`;

      drawGlowText(
        ctx,
        text,
        CARD_WIDTH / 2,
        socialY.discord,
        role.socialColor,
        role.socialTextGlow || role.textGlow
      );
    }
    console.log('[Canvas] Social handles drawn');

    // 5. Draw achievement icons
    if (additionalRoles.length > 0) {
      console.log('[Canvas] Loading achievement icons:', additionalRoles.length);

      const iconSize = CARD_LAYOUT.achievements.iconSize;
      const spacing = CARD_LAYOUT.achievements.spacing;
      const totalWidth = (iconSize * additionalRoles.length) +
        (spacing * (additionalRoles.length - 1));
      const startX = (CARD_WIDTH - totalWidth) / 2;

      for (let i = 0; i < additionalRoles.length; i++) {
        const achievement = additionalRoles[i];
        console.log('[Canvas] Loading icon:', achievement.icon);

        const iconImage = await loadImage(achievement.icon);
        const x = startX + (i * (iconSize + spacing));
        const y = CARD_LAYOUT.achievements.startY;

        ctx.drawImage(iconImage, x, y, iconSize, iconSize);
      }
      console.log('[Canvas] Achievement icons drawn');
    }

    console.log('[Canvas] Render complete');

    // Convert to data URL
    return canvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('[Canvas] Render failed:', error);
    throw error;
  }
}
