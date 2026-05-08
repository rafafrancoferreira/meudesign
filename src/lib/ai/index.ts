export type GenerateResult = {
  imageUrl: string;
  prompt: string;
  seed: number;
  generatedAt: string;
};

export type GenerateParams = {
  prompt: string;
  style: string;
  productSlug?: string;
};
