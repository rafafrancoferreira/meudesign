import { NextRequest, NextResponse } from 'next/server';
import { generateMock } from '@/lib/ai/mock';
import { generateReplicate } from '@/lib/ai/replicate';

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, productSlug } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt inválido' }, { status: 400 });
    }

    if (process.env.AI_API_KEY && process.env.AI_PROVIDER === 'replicate') {
      try {
        return NextResponse.json(await generateReplicate({ prompt, style, productSlug }));
      } catch {
        return NextResponse.json(await generateMock({ prompt, style, productSlug }));
      }
    }

    return NextResponse.json(await generateMock({ prompt, style, productSlug }));
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
