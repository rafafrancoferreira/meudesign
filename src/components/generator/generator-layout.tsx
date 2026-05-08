'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Loader2, RefreshCw, ShoppingCart, Download, Sparkles, AlertCircle } from 'lucide-react';
import { ScrambledText } from '@/components/effects/scrambled-text';
import { useCartStore } from '@/lib/store-cart';
import { products } from '@/lib/products';
import { MOCKUP_PRINT_ZONES } from '@/lib/mockup-zones';

type GenerationState = 'idle' | 'loading' | 'success' | 'error';

interface GenerateResult {
  imageUrl: string;
  prompt: string;
  seed: number;
  generatedAt: string;
}

interface SessionItem {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  productSlug: string;
}

const STYLES = [
  { id: 'abstrato', label: 'Abstrato' },
  { id: 'minimalista', label: 'Minimalista' },
  { id: 'retro', label: 'Retro' },
  { id: 'futurista', label: 'Futurista' },
  { id: 'geométrico', label: 'Geométrico' },
  { id: 'organico', label: 'Orgânico' },
  { id: 'tipográfico', label: 'Tipográfico' },
  { id: 'ilustrado', label: 'Ilustrado' },
] as const;

function asciiBar(progress: number, width = 12): string {
  const filled = Math.round((progress / 100) * width);
  return `[${'█'.repeat(filled)}${'░'.repeat(width - filled)}] ${Math.round(progress)}%`;
}

const LOADING_MESSAGES = [
  'A interpretar o teu prompt...',
  'A gerar o conceito visual...',
  'A aplicar o estilo selecionado...',
  'A finalizar o design...',
];

export function GeneratorLayout() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('abstrato');
  const [selectedProduct, setSelectedProduct] = useState<string>('t-shirt');
  const [state, setState] = useState<GenerationState>('idle');
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [history, setHistory] = useState<SessionItem[]>([]);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addToCart = useCartStore((s) => s.add);

  const currentProduct = products.find((p) => p.slug === selectedProduct) ?? products[0];
  const printZone = MOCKUP_PRINT_ZONES[selectedProduct] ?? MOCKUP_PRINT_ZONES['t-shirt'];

  const stopIntervals = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    if (msgIntervalRef.current) clearInterval(msgIntervalRef.current);
  }, []);

  const generate = useCallback(async () => {
    if (!prompt.trim() || state === 'loading') return;

    setState('loading');
    setProgress(0);
    setLoadingMsgIndex(0);
    setError(null);

    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p;
        return p + Math.random() * 12;
      });
    }, 320);

    msgIntervalRef.current = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 900);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: selectedStyle, productSlug: selectedProduct }),
      });

      if (!res.ok) throw new Error('Falha ao gerar design');

      const data: GenerateResult = await res.json();
      stopIntervals();
      setProgress(100);

      setTimeout(() => {
        setResult(data);
        setState('success');
        setHistory((prev) =>
          [
            {
              id: `${data.seed}-${Date.now()}`,
              imageUrl: data.imageUrl,
              prompt: prompt.slice(0, 60),
              style: selectedStyle,
              productSlug: selectedProduct,
            },
            ...prev,
          ].slice(0, 8)
        );
      }, 400);
    } catch (e) {
      stopIntervals();
      setError(e instanceof Error ? e.message : 'Erro desconhecido');
      setState('error');
    }
  }, [prompt, selectedStyle, selectedProduct, state, stopIntervals]);

  const handleAddToCart = useCallback(() => {
    if (!result) return;
    addToCart({
      productSlug: selectedProduct,
      designUrl: result.imageUrl,
      designPrompt: prompt,
      price: currentProduct.price,
      size: currentProduct.sizes?.[0],
    });
  }, [result, selectedProduct, prompt, currentProduct, addToCart]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.imageUrl;
    a.download = `meudesign-preview-${result.seed}.png`;
    a.click();
  }, [result]);

  const handleHistoryClick = useCallback((item: SessionItem) => {
    setResult({ imageUrl: item.imageUrl, prompt: item.prompt, seed: 0, generatedAt: '' });
    setSelectedProduct(item.productSlug);
    setSelectedStyle(item.style);
    setState('success');
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-2">
            Criador de designs
          </p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            O teu design,
            <br />
            <span className="text-accent">em segundos.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 xl:gap-12 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">
            {/* Prompt textarea */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                01. Descreve o teu design
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="ex: um leão geométrico estilo art déco, tons dourados e azul-marinho"
                rows={4}
                className="w-full bg-surface border border-border rounded-lg p-4 text-foreground placeholder:text-muted resize-none focus:outline-none focus:border-border-strong font-sans text-sm transition-colors"
                maxLength={400}
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted font-mono">
                <span>{prompt.length}/400</span>
                <span>Sê específico para melhores resultados</span>
              </div>
            </div>

            {/* Style chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                02. Escolhe o estilo
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      selectedStyle === style.id
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-surface border-border text-muted hover:border-border-strong hover:text-foreground'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product picker */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                03. Seleciona o produto
              </label>
              <div className="grid grid-cols-4 gap-2">
                {products.map((product) => (
                  <button
                    key={product.slug}
                    onClick={() => setSelectedProduct(product.slug)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all group ${
                      selectedProduct === product.slug
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-surface hover:border-border-strong'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <Image
                        src={product.mockup}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wide leading-tight ${
                        selectedProduct === product.slug ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {product.name.replace(' personalizada', '').replace(' personalizado', '').replace(' personalizados', '').replace(' decorativo', '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={!prompt.trim() || state === 'loading'}
              className="w-full flex items-center justify-center gap-3 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-widest py-4 rounded-lg text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {state === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  A gerar...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gerar design
                </>
              )}
            </button>

            {/* Session history */}
            {history.length > 0 && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                  Histórico da sessão
                </label>
                <div className="flex gap-2 flex-wrap">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleHistoryClick(item)}
                      className="w-14 h-14 rounded border border-border overflow-hidden hover:border-border-strong transition-colors group"
                      title={item.prompt}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.prompt}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN — CANVAS ── */}
          <div className="lg:sticky lg:top-24">
            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
              Pré-visualização
            </label>

            {/* Canvas container */}
            <div className={`relative border border-border rounded-xl overflow-hidden aspect-square flex items-center justify-center transition-colors duration-500 ${state === 'success' ? 'bg-[#f2f2f2]' : 'bg-surface'}`} style={{ isolation: 'isolate' }}>
              {/* ── IDLE ── */}
              {state === 'idle' && (
                <div className="text-center px-8">
                  <div className="w-16 h-16 mx-auto mb-6 opacity-30">
                    <Image
                      src={currentProduct.mockup}
                      alt={currentProduct.name}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <p className="text-muted text-sm font-mono">
                    Descreve o teu design
                    <br />e carrega em{' '}
                    <span className="text-accent">GERAR</span>
                  </p>
                </div>
              )}

              {/* ── LOADING ── */}
              {state === 'loading' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
                  {/* Scanlines overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)',
                    }}
                  />
                  <div className="relative z-10 text-center space-y-6">
                    <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                      <ScrambledText
                        text={LOADING_MESSAGES[loadingMsgIndex]}
                        isActive={state === 'loading'}
                        className="text-accent"
                      />
                    </div>

                    <div className="font-mono text-sm text-foreground/60">
                      {asciiBar(progress)}
                    </div>

                    <div className="font-mono text-[10px] text-muted/50 space-y-1">
                      <div>PROMPT: {prompt.slice(0, 40)}{prompt.length > 40 ? '...' : ''}</div>
                      <div>STYLE: {selectedStyle.toUpperCase()}</div>
                      <div>PRODUCT: {selectedProduct.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SUCCESS ── */}
              {state === 'success' && result && (
                <div className="absolute inset-0">
                  {/* Layer 1: Design positioned at the product print zone */}
                  <div
                    className="absolute overflow-hidden"
                    style={{
                      top: printZone.top,
                      left: printZone.left,
                      width: printZone.width,
                      height: printZone.height,
                      borderRadius: printZone.shape === 'circle' ? '50%' : undefined,
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={result.imageUrl}
                      alt="Design gerado"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized={result.imageUrl.startsWith('/')}
                    />
                  </div>

                  {/* Layer 2: Product mockup on top — SVG has transparent hole at print zone */}
                  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
                    <Image
                      src={currentProduct.mockup}
                      alt={currentProduct.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>

                  {/* Seed badge */}
                  <div className="absolute top-3 right-3" style={{ zIndex: 3 }}>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded px-2 py-1">
                      <span className="font-mono text-[10px] text-white/50">seed: {result.seed}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ERROR ── */}
              {state === 'error' && (
                <div className="text-center px-8">
                  <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
                  <p className="text-sm text-muted font-mono mb-1">Algo correu mal</p>
                  <p className="text-xs text-muted/60 font-mono">{error}</p>
                </div>
              )}
            </div>

            {/* Action buttons — success state */}
            {state === 'success' && result && (
              <div className="mt-4 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-wider py-3.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar ao carrinho
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={generate}
                    disabled={!prompt.trim()}
                    className="flex items-center justify-center gap-2 border border-border text-foreground font-mono uppercase tracking-wider py-2.5 rounded-lg text-xs hover:border-border-strong transition-colors disabled:opacity-40"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Regenerar
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 border border-border text-foreground font-mono uppercase tracking-wider py-2.5 rounded-lg text-xs hover:border-border-strong transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Error retry */}
            {state === 'error' && (
              <div className="mt-4">
                <button
                  onClick={generate}
                  disabled={!prompt.trim()}
                  className="w-full flex items-center justify-center gap-2 border border-destructive text-destructive font-mono uppercase tracking-wider py-3 rounded-lg text-sm hover:bg-destructive/5 transition-colors disabled:opacity-40"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Product info */}
            <div className="mt-4 p-4 bg-surface-2 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  {currentProduct.name}
                </span>
                <span className="font-mono font-semibold text-foreground text-sm">
                  {currentProduct.price.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              <p className="text-xs text-muted/70 leading-relaxed">{currentProduct.description.split('.')[0]}.</p>
              <div className="flex gap-3 mt-2">
                <span className="text-[10px] font-mono text-muted/50 uppercase tracking-wider">
                  Produção: {currentProduct.productionTime}
                </span>
                {currentProduct.sizes && (
                  <span className="text-[10px] font-mono text-muted/50 uppercase tracking-wider">
                    Tamanhos: {currentProduct.sizes.slice(0, 3).join(' · ')}
                    {currentProduct.sizes.length > 3 ? ' +' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
