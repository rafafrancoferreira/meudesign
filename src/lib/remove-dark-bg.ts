/**
 * Removes the dark/black background from an image using the Canvas API.
 * Pixels where max(R,G,B) < 30 become fully transparent.
 * Pixels where 30 ≤ max(R,G,B) < 60 are feathered (semi-transparent).
 * Returns a data URL (PNG with alpha) or falls back to the original src on error.
 */
export async function removeDarkBackground(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) { resolve(src); return; }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(src); return; }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);
        const { data } = imageData;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);

          if (max < 30) {
            // Hard threshold — fully transparent
            data[i + 3] = 0;
          } else if (max < 60) {
            // Feathering zone — linearly interpolate existing alpha
            data[i + 3] = Math.round(((max - 30) / 30) * data[i + 3]);
          }
          // else: keep original alpha unchanged
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        // CORS taint or other error — fall back to original
        resolve(src);
      }
    };

    img.onerror = () => resolve(src);
    img.src = src;
  });
}
