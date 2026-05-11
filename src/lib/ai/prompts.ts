export const buildPrompt = (userPrompt: string, style: string) => {
  const stylePart = style ? `, ${style} style` : '';
  return `${userPrompt}${stylePart}, isolated design on transparent background, high contrast, print-ready, vector illustration aesthetic, no text, no watermark`;
};
