import html2canvas from 'html2canvas';

export async function generateCardImage(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Card element not found');

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null,
    width: 1200,
    height: 630,
    useCORS: true,
    logging: false
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
