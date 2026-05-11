import { NextRequest, NextResponse } from 'next/server';
import { generateMock } from '@/lib/ai/mock';
import { generateReplicate } from '@/lib/ai/replicate';

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  const delays = [1000, 2000];
  let lastError: unknown;
  for (let i = 0; i <= delays.length; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i < delays.length) await new Promise((r) => setTimeout(r, delays[i]));
    }
  }
  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, productSlug } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt inválido' }, { status: 400 });
    }

    if (process.env.AI_API_KEY && process.env.AI_PROVIDER === 'replicate') {
      try {
        const result = await withRetry(() => generateReplicate({ prompt, style, productSlug }));
        return NextResponse.json(result);
      } catch {
        return NextResponse.json(
          { error: 'A geração demorou demasiado, tenta novamente.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(await generateMock({ prompt, style, productSlug }));
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
