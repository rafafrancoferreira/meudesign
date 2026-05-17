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

Generate an EXTREMELY detailed prompt to create a design for printing on physical products (t-shirt, hoodie, poster, mug).

The prompt MUST include ALL these elements:

1. MAIN MOTIF: describe the central element in great detail (e.g. not "a wolf" but "a majestic arctic wolf with silver fur and piercing amber eyes, dominant stance on a snow-covered rock")

2. ARTISTIC STYLE: specify technique and references (e.g. "detailed vector illustration style inspired by traditional Japanese tattoos with modern graphic design elements")

3. COLOR PALETTE: list specific colors with tones (e.g. "deep cobalt blue #1a3a6b, aged gold #c9a84c, absolute black #0a0a0a with pure white accents")

4. COMPOSITION: position, framing and proportions (e.g. "centered composition, main motif occupies 70% of space, bilateral symmetry, slight low-angle perspective for imposing effect")

5. LIGHTING AND ATMOSPHERE: type of light and mood (e.g. "dramatic side lighting with golden rim light, epic and mysterious atmosphere, subtle mist in background")

6. TECHNICAL DETAILS: quality and specifications (e.g. "high definition, ultra-fine details, print-ready, solid black background, no text, no watermarks, clean edges")

7. SECONDARY ELEMENTS: complementary details that enrich the composition (e.g. "cherry blossom petals falling around, subtle geometric symbols in background, scale pattern in lower corner")

Choose this theme as base: ${theme}

RULES:
- Maximum 380 words
- Reply ONLY with the prompt, no introduction, no titles, no explanation
- Write in English
- Start directly with the description of the main motif
- Use commas to separate elements, not periods
- The result should be ready to paste into an image generator`
    : `És um especialista em criar prompts para geradores de imagens AI (Flux, Stable Diffusion, Midjourney).

Gera um prompt EXTREMAMENTE detalhado para criar um design para estampar em produtos físicos (t-shirt, hoodie, poster, caneca).

O prompt DEVE incluir TODOS estes elementos:

1. MOTIVO PRINCIPAL: descreve o elemento central com grande detalhe (ex: não "um lobo" mas "um lobo ártico majestuoso com pelo prateado e olhos âmbar penetrantes, postura dominante sobre uma rocha coberta de neve")

2. ESTILO ARTÍSTICO: especifica técnica e referências (ex: "estilo ilustração vetorial detalhada inspirada em tatuagens japonesas tradicionais com elementos modernos de design gráfico")

3. PALETA DE CORES: lista cores específicas com tons (ex: "azul cobalto profundo #1a3a6b, dourado envelhecido #c9a84c, preto absoluto #0a0a0a com acentos em branco puro")

4. COMPOSIÇÃO: posição, enquadramento e proporções (ex: "composição centrada, motivo principal ocupa 70% do espaço, simetria bilateral, perspetiva ligeiramente de baixo para cima para efeito imponente")

5. ILUMINAÇÃO E ATMOSFERA: tipo de luz e mood (ex: "iluminação dramática lateral com rim light dourado, atmosfera épica e misteriosa, névoa subtil ao fundo")

6. DETALHES TÉCNICOS: qualidade e especificações (ex: "alta definição, detalhes ultra-finos, adequado para impressão, fundo preto sólido, sem texto, sem marcas d'água, bordas limpas")

7. ELEMENTOS SECUNDÁRIOS: detalhes complementares que enriquecem a composição (ex: "folhas de cerejeira a cair ao redor, símbolos geométricos subtis no fundo, padrão de escamas no canto inferior")

Escolhe este tema como base: ${theme}

REGRAS:
- Máximo 380 palavras
- Responde APENAS com o prompt, sem introdução, sem títulos, sem explicação
- Escreve em português
- Começa diretamente com a descrição do motivo principal
- Usa vírgulas para separar elementos, não pontos
- O resultado deve ser pronto a colar num gerador de imagens`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      messages: [{ role: 'user', content: messageContent }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error('[generate-prompt] Anthropic API error:', response.status, err);
    return NextResponse.json({ error: JSON.stringify(err) }, { status: response.status });
  }

  const data = await response.json() as { content: { type: string; text: string }[] };
  const text = data.content.find((c) => c.type === 'text')?.text ?? '';
  return NextResponse.json({ prompt: text.trim() });
}
