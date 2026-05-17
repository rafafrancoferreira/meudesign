'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  Loader2, RefreshCw, ShoppingCart, Download, Sparkles,
  AlertCircle,
} from 'lucide-react';
import { ScrambledText } from '@/components/effects/scrambled-text';
import { useCartStore } from '@/lib/store-cart';
import { useLang } from '@/lib/i18n';
import { products, type ProductVariant } from '@/lib/products';
import { DesignCanvas, defaultDesignTransform } from '@/components/product/design-canvas';

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


const STYLE_IDS = [
  { id: 'abstrato',    key: 'abstrato' as const },
  { id: 'minimalista', key: 'minimalista' as const },
  { id: 'retro',       key: 'retro' as const },
  { id: 'futurista',   key: 'futurista' as const },
  { id: 'geométrico',  key: 'geometrico' as const },
  { id: 'organico',    key: 'organico' as const },
  { id: 'tipográfico', key: 'tipografico' as const },
  { id: 'ilustrado',   key: 'ilustrado' as const },
];

function asciiBar(progress: number, width = 12): string {
  const filled = Math.round((progress / 100) * width);
  return `[${'█'.repeat(filled)}${'░'.repeat(width - filled)}] ${Math.round(progress)}%`;
}


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
  const [customStyle, setCustomStyle] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () => products.find((p) => p.slug === 't-shirt')?.variants?.[0] ?? null
  );

  const progressRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addToCart = useCartStore((s) => s.add);
  const { t } = useLang();

  const currentProduct = products.find((p) => p.slug === selectedProduct) ?? products[0];
  const activeMockup = selectedVariant?.mockup ?? currentProduct.mockup;

  // Reset variant when product changes
  useEffect(() => {
    const p = products.find((pr) => pr.slug === selectedProduct);
    setSelectedVariant(p?.variants?.[0] ?? null);
  }, [selectedProduct]);

  // ── helpers ──────────────────────────────────────────────────────────────

  const stopIntervals = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    if (msgIntervalRef.current) clearInterval(msgIntervalRef.current);
  }, []);

  // ── generation ────────────────────────────────────────────────────────────

  const generate = useCallback(async () => {
    if (!prompt.trim() || state === 'loading') return;

    setState('loading');
    setProgress(0);
    setLoadingMsgIndex(0);
    setError(null);

    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 88 ? p : p + Math.random() * 12));
    }, 320);

    msgIntervalRef.current = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % t.generator.loadingMessages.length);
    }, 900);

    try {
      const effectiveStyle =
        selectedStyle === '__none__'   ? '' :
        selectedStyle === '__custom__' ? customStyle.trim() :
        selectedStyle;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: effectiveStyle, productSlug: selectedProduct }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(errData.error ?? 'Falha ao gerar design');
      }

      const data: GenerateResult = await res.json();
      stopIntervals();
      setProgress(100);

      setTimeout(() => {
        setResult(data);
        setState('success');
        setHistory((prev) =>
          [{ id: `${data.seed}-${Date.now()}`, imageUrl: data.imageUrl, prompt: prompt.slice(0, 60), style: effectiveStyle, productSlug: selectedProduct }, ...prev].slice(0, 8)
        );
      }, 400);
    } catch (e) {
      stopIntervals();
      setError(e instanceof Error ? e.message : 'Erro desconhecido');
      setState('error');
    }
  }, [prompt, selectedStyle, selectedProduct, state, stopIntervals, customStyle, t]);

  const handleAddToCart = useCallback(() => {
    if (!result) return;
    addToCart({
      productSlug: selectedProduct,
      designUrl: result.imageUrl,
      designPrompt: prompt,
      price: currentProduct.price,
      size: currentProduct.sizes?.[0],
      color: selectedVariant?.color,
    });
  }, [result, selectedProduct, prompt, currentProduct, addToCart]);

  const handleDownload = useCallback(async () => {
    if (!result) return;
    const filename = `meudesign-${result.seed}.png`;
    try {
      const resp = await fetch(result.imageUrl);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(result.imageUrl, '_blank');
    }
  }, [result]);

  const handleHistoryClick = useCallback((item: SessionItem) => {
    setResult({ imageUrl: item.imageUrl, prompt: item.prompt, seed: 0, generatedAt: '' });
    setSelectedProduct(item.productSlug);
    setSelectedStyle(item.style);
    setState('success');
  }, []);

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-2">
            {t.generator.subtitle}
          </p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            {t.generator.title}
            <br />
            <span className="text-accent">{t.generator.titleAccent}</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 xl:gap-12 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">
            {/* Prompt textarea */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                {t.generator.label01}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.generator.placeholder}
                rows={4}
                className="w-full bg-surface border border-border rounded-lg p-4 text-foreground placeholder:text-muted resize-none focus:outline-none focus:border-border-strong font-sans text-sm transition-colors"
                maxLength={400}
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted font-mono">
                <span>{prompt.length}/400</span>
                <span>{t.generator.beSpecific}</span>
              </div>
            </div>

            {/* Style chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                {t.generator.label02}
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLE_IDS.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      selectedStyle === style.id
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-surface border-border text-muted hover:border-border-strong hover:text-foreground'
                    }`}
                  >
                    {t.generator.styles[style.key]}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedStyle('__none__')}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                    selectedStyle === '__none__'
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-surface border-border text-muted hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  {t.generator.alreadyInPrompt}
                </button>
                <button
                  onClick={() => setSelectedStyle('__custom__')}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                    selectedStyle === '__custom__'
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-surface border-border text-muted hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  {t.generator.other}
                </button>
              </div>
              {selectedStyle === '__custom__' && (
                <input
                  type="text"
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder={t.generator.otherPlaceholder}
                  className="mt-2 w-full bg-surface border border-border rounded px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted focus:outline-none focus:border-border-strong transition-colors"
                  autoFocus
                />
              )}
            </div>

            {/* Product picker */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                {t.generator.label03}
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
                        className="object-contain w-full h-full"
                        unoptimized
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wide leading-tight ${
                        selectedProduct === product.slug ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {product.name
                        .replace(' personalizados', '')
                        .replace(' personalizada', '')
                        .replace(' personalizado', '')
                        .replace(' decorativo', '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker — only for products with multiple variants */}
            {currentProduct.variants && currentProduct.variants.length > 1 && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                  Cor
                </label>
                <div className="flex gap-2">
                  {currentProduct.variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => setSelectedVariant(v)}
                      title={v.color}
                      aria-label={v.color}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedVariant?.color === v.color
                          ? 'border-accent scale-110'
                          : 'border-border hover:border-border-strong'
                      } ${v.hex === 'transparent' ? 'border-dashed' : ''}`}
                      style={v.hex && v.hex !== 'transparent' ? { backgroundColor: v.hex } : { backgroundColor: 'rgba(255,255,255,0.08)' }}
                    />
                  ))}
                  {selectedVariant && (
                    <span className="text-xs font-mono text-muted self-center ml-1">
                      {selectedVariant.color}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={!prompt.trim() || state === 'loading'}
              className="w-full flex items-center justify-center gap-3 bg-[#dafe22] text-[#0a0a0a] font-mono font-semibold uppercase tracking-widest py-4 rounded-lg text-sm transition-all hover:opacity-90 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {state === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.generator.generating}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t.generator.generate}
                </>
              )}
            </button>

            {/* Session history */}
            {history.length > 0 && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">
                  {t.generator.sessionHistory}
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
              {t.generator.preview}
            </label>

            {/* Canvas — idle / loading / error states */}
            {state !== 'success' && (
              <div
                className="relative border border-border rounded-xl overflow-hidden aspect-square flex items-center justify-center select-none bg-surface"
                style={{ isolation: 'isolate' }}
              >
                {/* ── IDLE ── */}
                {state === 'idle' && (
                  <div className="text-center px-8">
                    <div className="w-16 h-16 mx-auto mb-6 opacity-30">
                      <Image
                        src={activeMockup}
                        alt={currentProduct.name}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full"
                        unoptimized
                      />
                    </div>
                    <p className="text-muted text-sm font-mono">
                      {t.generator.describeDesign}
                      <br />
                      {t.generator.andPress}{' '}
                      <span className="text-accent">{t.generator.generate.toUpperCase()}</span>
                    </p>
                  </div>
                )}

                {/* ── LOADING ── */}
                {state === 'loading' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
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
                          text={t.generator.loadingMessages[loadingMsgIndex]}
                          isActive={state === 'loading'}
                          className="text-accent"
                        />
                      </div>
                      <div className="font-mono text-sm text-foreground/60">{asciiBar(progress)}</div>
                      <div className="font-mono text-[10px] text-muted/50 space-y-1">
                        <div>PROMPT: {prompt.slice(0, 40)}{prompt.length > 40 ? '…' : ''}</div>
                        <div>STYLE: {selectedStyle === '__none__' ? 'SEM ESTILO' : selectedStyle === '__custom__' ? (customStyle.trim().toUpperCase() || 'PERSONALIZADO') : selectedStyle.toUpperCase()}</div>
                        <div>PRODUCT: {selectedProduct.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ERROR ── */}
                {state === 'error' && (
                  <div className="text-center px-8">
                    <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
                    <p className="text-sm text-muted font-mono mb-1">{t.generator.errorTitle}</p>
                    <p className="text-xs text-muted/60 font-mono">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── SUCCESS: shared DesignCanvas with drag/resize ── */}
            {state === 'success' && result && (
              <div className="relative">
                <DesignCanvas
                  key={result.imageUrl}
                  mockupSrc={activeMockup}
                  designSrc={result.imageUrl}
                  productSlug={selectedProduct}
                  isDarkMockup={selectedVariant?.hex === '#1a1a1a'}
                  showControls
                />
                {/* Seed badge overlaid on canvas */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded px-2 py-1">
                    <span className="font-mono text-[10px] text-white/50">seed: {result.seed}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons — success state */}
            {state === 'success' && result && (
              <div className="mt-3 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-wider py-3.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t.generator.addToCart}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={generate}
                    disabled={!prompt.trim()}
                    className="flex items-center justify-center gap-2 border border-border text-foreground font-mono uppercase tracking-wider py-2.5 rounded-lg text-xs hover:border-border-strong transition-colors disabled:opacity-40"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t.generator.regenerate}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 border border-border text-foreground font-mono uppercase tracking-wider py-2.5 rounded-lg text-xs hover:border-border-strong transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.generator.download}
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
                  {t.generator.retry}
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
                  {t.generator.production}: {currentProduct.productionTime}
                </span>
                {currentProduct.sizes && (
                  <span className="text-[10px] font-mono text-muted/50 uppercase tracking-wider">
                    {t.generator.sizes}: {currentProduct.sizes.slice(0, 3).join(' · ')}
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
