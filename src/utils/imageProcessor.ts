export async function cropImageToCircle(
  imageFile: File,
  cropRadius: number = 120
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        const diameter = cropRadius * 2;
        canvas.width = diameter;
        canvas.height = diameter;

        // Create circular clip path
        ctx.beginPath();
        ctx.arc(cropRadius, cropRadius, cropRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Calculate scaling to cover the circle
        const scale = Math.max(diameter / img.width, diameter / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (diameter - scaledWidth) / 2;
        const y = (diameter - scaledHeight) / 2;

        // Draw image
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(imageFile);
  });
}
