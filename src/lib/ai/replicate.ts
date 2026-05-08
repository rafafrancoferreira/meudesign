import type { GenerateResult, GenerateParams } from './index';
import { buildPrompt } from './prompts';

export async function generateReplicate({ prompt, style }: GenerateParams): Promise<GenerateResult> {
  const fullPrompt = buildPrompt(prompt, style);

  const response = await fetch(
    'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'wait',
      },
      body: JSON.stringify({
        input: { prompt: fullPrompt, num_outputs: 1, output_format: 'png', aspect_ratio: '1:1' },
      }),
    }
  );

  if (!response.ok) throw new Error(`Replicate error: ${response.status}`);

  const prediction = await response.json();

  let result = prediction;
  let attempts = 0;
  while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < 30) {
    await new Promise((r) => setTimeout(r, 1000));
    const poll = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
      headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` },
    });
    result = await poll.json();
    attempts++;
  }

  if (result.status === 'failed' || !result.output?.[0]) throw new Error('Geração falhou');

  return {
    imageUrl: result.output[0] as string,
    prompt,
    seed: Math.floor(Math.random() * 999999),
    generatedAt: new Date().toISOString(),
  };
}
