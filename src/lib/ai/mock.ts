import { readFileSync } from 'fs';
import { join } from 'path';
import type { GenerateResult, GenerateParams } from './index';

interface MockDesign {
  file: string;
  tags: string[];
  style: string;
  palette: string[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let manifestCache: MockDesign[] | null = null;

function loadManifest(): MockDesign[] {
  if (manifestCache) return manifestCache;
  const filePath = join(process.cwd(), 'public', 'mock-designs', 'manifest.json');
  manifestCache = JSON.parse(readFileSync(filePath, 'utf-8')) as MockDesign[];
  return manifestCache;
}

function score(design: MockDesign, tokens: string[]): number {
  const lowerTags = design.tags.map((t) => t.toLowerCase());
  const lowerStyle = design.style.toLowerCase();
  return tokens.reduce((sum, token) => {
    if (lowerTags.some((t) => t.includes(token))) sum += 2;
    if (lowerStyle.includes(token)) sum += 1;
    return sum;
  }, 0);
}

export async function generateMock({ prompt, style }: GenerateParams): Promise<GenerateResult> {
  await sleep(1800 + Math.random() * 1200);

  const manifest = loadManifest();
  const tokens = [...prompt.toLowerCase().split(/\s+/), style.toLowerCase()].filter((t) => t.length > 2);

  const scored = manifest
    .map((d) => ({ design: d, score: score(d, tokens) }))
    .sort((a, b) => b.score - a.score);

  const topN = scored.slice(0, 3).filter((s) => s.score > 0);
  const stylePool = scored.filter((s) => s.design.style === style);
  const finalPool = topN.length > 0 ? topN : stylePool.length > 0 ? stylePool : scored;

  const pick = finalPool[Math.floor(Math.random() * Math.min(3, finalPool.length))];

  return {
    imageUrl: `/mock-designs/${pick.design.file}`,
    prompt,
    seed: Math.floor(Math.random() * 999999),
    generatedAt: new Date().toISOString(),
  };
}
