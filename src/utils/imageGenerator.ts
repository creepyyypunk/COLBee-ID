import { toPng } from 'html-to-image';

const CARD_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

const IMAGE_CONFIG = {
  pixelRatio: 2,
  loadDelay: 2000, // Increased delay to ensure all images load on slow connections
  imageTimeout: 10000, // 10 seconds timeout for each image
} as const;

/**
 * Attempts to reload an image with retry logic
 */
async function retryImageLoad(img: HTMLImageElement, maxRetries: number = 3): Promise<void> {
  const originalSrc = img.src;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await new Promise<void>((resolve, reject) => {
        if (img.complete && img.naturalHeight !== 0) {
          resolve();
          return;
        }

        const timeout = setTimeout(() => {
          reject(new Error('Timeout'));
        }, IMAGE_CONFIG.imageTimeout);

        img.onload = () => {
          clearTimeout(timeout);
          console.log(`[ImageGen] Image loaded on attempt ${attempt}`);
          resolve();
        };

        img.onerror = () => {
          clearTimeout(timeout);
          reject(new Error('Load failed'));
        };

        // Force reload by adding cache-busting parameter on retry
        if (attempt > 1) {
          const separator = originalSrc.includes('?') ? '&' : '?';
          img.src = `${originalSrc}${separator}_retry=${attempt}_${Date.now()}`;
        }
      });
      return; // Success - exit retry loop
    } catch (error) {
      console.warn(`[ImageGen] Image load attempt ${attempt}/${maxRetries} failed:`, originalSrc.substring(0, 100));
      if (attempt === maxRetries) {
        console.error(`[ImageGen] Image failed to load after ${maxRetries} attempts:`, originalSrc);
      }
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      }
    }
  }
}

/**
 * Waits for all images in an element to fully load
 */
async function waitForImagesToLoad(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img');
  console.log(`[ImageGen] Found ${images.length} images to load`);

  const imagePromises = Array.from(images).map(async (img, index) => {
    const src = img.src.substring(0, 100); // Truncate for logging

    if (img.complete && img.naturalHeight !== 0) {
      console.log(`[ImageGen] Image ${index + 1} already loaded:`, src);
      return;
    }

    console.log(`[ImageGen] Waiting for image ${index + 1} to load:`, src);
    await retryImageLoad(img);
  });

  await Promise.all(imagePromises);
  console.log('[ImageGen] All images processed');
}

/**
 * Generates a PNG image from a card element and triggers download
 * @param elementId - The ID of the card element to capture
 * @param filename - The desired filename for the downloaded image
 */
export async function generateCardImage(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Card element with ID "${elementId}" not found`);
  }

  try {
    // Wait for all images to load
    await waitForImagesToLoad(element);

    // Additional delay for layout stabilization
    await new Promise(resolve => setTimeout(resolve, IMAGE_CONFIG.loadDelay));

    const dataUrl = await toPng(element, {
      cacheBust: false, // Changed to false to avoid CORS issues
      pixelRatio: IMAGE_CONFIG.pixelRatio,
      ...CARD_DIMENSIONS,
      canvasWidth: CARD_DIMENSIONS.width,
      canvasHeight: CARD_DIMENSIONS.height,
      skipAutoScale: true,
    });

    downloadImage(dataUrl, filename);
  } catch (error) {
    console.error('Failed to generate card image:', error);
    throw error;
  }
}

/**
 * Triggers browser download of an image from a data URL
 */
function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

/**
 * Sanitizes a username for use in filenames by removing special characters
 * @param username - The username to sanitize
 * @returns Sanitized lowercase string with only alphanumeric, hyphen, and underscore characters
 */
export function sanitizeFilename(username: string): string {
  return username
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase();
}

/**
 * Generates a filename for a user's COLBee ID card
 * @param username - The username to include in the filename
 * @returns Formatted filename in the pattern "COLBee-ID-{username}.png"
 */
export function generateCardFilename(username: string): string {
  const sanitized = sanitizeFilename(username) || 'user';
  return `COLBee-ID-${sanitized}.png`;
}

/**
 * Generates a PNG image from a card element and returns as base64 data URL
 * @param elementId - The ID of the card element to capture
 * @returns Promise<string> - base64 data URL of the generated image
 */
export async function generateCardImageAsBase64(
  elementId: string
): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Card element with ID "${elementId}" not found`);
  }

  try {
    // Wait for all images to load
    await waitForImagesToLoad(element);

    // Additional delay for layout stabilization
    await new Promise(resolve => setTimeout(resolve, IMAGE_CONFIG.loadDelay));

    const dataUrl = await toPng(element, {
      cacheBust: false, // Changed to false to avoid CORS issues
      pixelRatio: IMAGE_CONFIG.pixelRatio,
      ...CARD_DIMENSIONS,
      canvasWidth: CARD_DIMENSIONS.width,
      canvasHeight: CARD_DIMENSIONS.height,
      skipAutoScale: true,
    });

    return dataUrl;
  } catch (error) {
    console.error('Failed to generate card image:', error);
    throw error;
  }
}
