import { NextRequest, NextResponse } from 'next/server';

function getRandomTheme(): string {
  const themes = [
    'animais selvagens majestuosos (lobo, águia, leão, urso, tigre, corvo, raposa)',
    'criaturas mitológicas (dragão oriental, fénix, grifo, Medusa, Anubis, valquíria nórdica)',
    'paisagens épicas (floresta encantada ao luar, vulcão em erupção, aurora boreal, deserto alienígena)',
    'símbolos e geometria sagrada (mandala detalhada, olho de Hórus, símbolo yin yang evoluído, pentagrama cósmico)',
    'cultura japonesa (samurai em armadura completa, gueixa com detalhes tradicionais, carpa koi em água, Monte Fuji ao amanhecer)',
    'arte cyberpunk e futurista (robô com alma humana, cidade neon à chuva, cyborg com elementos orgânicos, nave espacial)',
    'natureza botânica (flor de lótus detalhada, bonsai centenário, cogumelo mágico bioluminescente, serpente entre flores tropicais)',
    'arte retro e vintage (sol estilo anos 70, cassete com elementos musicais, motocicleta americana clássica, astronauta retro)',
    'elementos cósmicos (buraco negro com galáxia, sistema solar estilizado, lua cheia com fases, cometa entre estrelas)',
    'animais marinhos (polvo gigante estilizado, baleia azul em mergulho, medusa bioluminescente, tubarão branco em silhueta)',
  ];
  return themes[Math.floor(Math.random() * themes.length)];
}

export async function POST(req: NextRequest) {
  console.log('[generate-prompt] endpoint called');

  const { lang = 'pt' } = await req.json().catch(() => ({})) as { lang?: string };
  console.log('[generate-prompt] lang:', lang);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[generate-prompt] ANTHROPIC_API_KEY is not set in environment');
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  const isEnglish = lang === 'en';
  const theme = getRandomTheme();

  const messageContent = isEnglish
    ? `You are a specialist in creating prompts for AI image generators (Flux, Stable Diffusion, Midjourney).

Generate a detailed prompt to create a design for printing on physical products (t-shirt, hoodie, poster, mug).

Include these elements concisely: main motif with visual detail, artistic style, color palette (2-3 colors), composition, lighting/mood, technical specs (print-ready, black background, no text).

Choose this theme as base: ${theme}

ABSOLUTE RULES:
- MAXIMUM 380 CHARACTERS total (not words — count individual characters). This is a hard limit.
- Reply ONLY with the prompt, no introduction, no titles, no explanation
- Write in English
- Start directly with the description of the main motif
- Use commas to separate elements, not periods
- Count characters before responding. If over 380 characters, cut and summarize until under limit`
    : `És um especialista em criar prompts para geradores de imagens AI (Flux, Stable Diffusion, Midjourney).

Gera um prompt detalhado para criar um design para estampar em produtos físicos (t-shirt, hoodie, poster, caneca).

Inclui estes elementos de forma concisa: motivo principal com detalhe visual, estilo artístico, paleta de cores (2-3 cores), composição, iluminação/mood, specs técnicas (adequado para impressão, fundo preto, sem texto).

Escolhe este tema como base: ${theme}

REGRAS ABSOLUTAS:
- MÁXIMO 380 CARACTERES no total (não palavras — conta caracteres individuais). Este é um limite rígido.
- Responde APENAS com o prompt, sem introdução, sem títulos, sem explicação
- Escreve em português
- Começa diretamente com a descrição do motivo principal
- Usa vírgulas para separar elementos, não pontos
- Conta os caracteres antes de responder. Se ultrapassar 380 caracteres, corta e resume até ficar abaixo do limite`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 180,
      messages: [{ role: 'user', content: messageContent }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error('[generate-prompt] Anthropic API error:', response.status, err);
    return NextResponse.json({ error: JSON.stringify(err) }, { status: response.status });
  }

  const data = await response.json() as { content: { type: string; text: string }[] };
  let text = data.content.find((c) => c.type === 'text')?.text?.trim() ?? '';
  console.log('[generate-prompt] raw length:', text.length);

  // Hard truncation at 400 chars — cut at last comma before the limit
  if (text.length > 400) {
    const cut = text.slice(0, 400);
    const lastComma = cut.lastIndexOf(',');
    text = lastComma > 300 ? cut.slice(0, lastComma) : cut;
    console.log('[generate-prompt] truncated to:', text.length);
  }

  return NextResponse.json({ prompt: text });
}
