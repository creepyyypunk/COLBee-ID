import html2canvas from 'html2canvas';

// Load image and convert to base64
async function loadImageAsBase64(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = reject;
    img.src = src;
  });
}

export async function generateCardImage(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Card element not found');

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  document.body.appendChild(clone);

  try {
    // Find all images in the clone and convert to base64
    const images = clone.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(async (img) => {
        const originalSrc = img.src;
        if (!originalSrc) return;

        try {
          const base64 = await loadImageAsBase64(originalSrc);
          img.src = base64;
        } catch (e) {
          console.warn('Failed to convert image:', originalSrc, e);
        }
      })
    );

    // Small delay to ensure all images are applied
    await new Promise(resolve => setTimeout(resolve, 200));

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: null,
      width: 1200,
      height: 630,
      logging: false,
      imageTimeout: 0,
      useCORS: false,
      allowTaint: false
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
  } finally {
    // Clean up the clone
    document.body.removeChild(clone);
  }
}

export function sanitizeFilename(username: string): string {
  return username
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase();
}

export function generateCardFilename(username: string): string {
  const sanitized = sanitizeFilename(username) || 'user';
  return `COLBee-ID-${sanitized}.png`;
}
