'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Wand2, ChevronDown, ChevronUp, Check, ArrowLeft, Clock, Package } from 'lucide-react';
import { type Product, type ProductVariant, formatPrice } from '@/lib/products';
import { useCartStore } from '@/lib/store-cart';
import { MOCKUP_PRINT_ZONES } from '@/lib/mockup-zones';

const DESIGN_GALLERY = [
  { src: '/mock-designs/retro-1.png',       label: 'Retro',       prompt: 'sol retro estilo anos 70 com raios geométricos, paleta laranja queimado e amarelo mostarda' },
  { src: '/mock-designs/futurista-1.png',   label: 'Futurista',   prompt: 'capacete de astronauta futurista com reflexo de galáxia, linhas neon azul e ciano' },
  { src: '/mock-designs/geometrico-1.png',  label: 'Geométrico',  prompt: 'lobo feito de triângulos geométricos, tons azul-marinho e prata, olhos dourados' },
  { src: '/mock-designs/organico-1.png',    label: 'Orgânico',    prompt: 'árvore bonsai japonesa com raízes em círculo, verde esmeralda e dourado' },
  { src: '/mock-designs/abstrato-1.png',    label: 'Abstrato',    prompt: 'explosão de tinta líquida coral, magenta e dourado sobre fundo preto, textura metálica' },
  { src: '/mock-designs/minimalista-1.png', label: 'Minimalista', prompt: 'montanha minimalista com lua cheia, silhueta branca e dourado, reflexo em lago' },
  { src: '/mock-designs/tipografico-1.png', label: 'Tipográfico', prompt: 'letra M monumental 3D art déco, dourado metalizado, ornamentos geométricos' },
  { src: '/mock-designs/ilustrado-1.png',   label: 'Ilustrado',   prompt: 'dragão oriental chinês em espiral, escamas vermelho e dourado, nuvens estilizadas' },
];

type DesignEntry = (typeof DESIGN_GALLERY)[0];

function CompositedMockup({
  mockupSrc,
  designSrc,
  productSlug,
  alt,
  className = '',
}: {
  mockupSrc: string;
  designSrc?: string;
  productSlug: string;
  alt: string;
  className?: string;
}) {
  const zone = MOCKUP_PRINT_ZONES[productSlug] ?? MOCKUP_PRINT_ZONES['t-shirt'];
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Design layer — behind mockup */}
      {designSrc && (
        <div
          className="absolute overflow-hidden"
          style={{
            top: zone.top,
            left: zone.left,
            width: zone.width,
            height: zone.height,
            borderRadius: zone.shape === 'circle' ? '50%' : (zone.borderRadius ?? undefined),
            mixBlendMode: 'multiply',
          }}
        >
          <Image
            src={designSrc}
            alt="Design aplicado"
            fill
            className="object-contain"
            sizes="400px"
            unoptimized={designSrc.startsWith('/')}
          />
        </div>
      )}
      {/* Mockup layer — on top */}
      <Image
        src={mockupSrc}
        alt={alt}
        fill
        className="object-contain"
        sizes="400px"
        unoptimized
      />
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [selectedDesign, setSelectedDesign] = useState<DesignEntry | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[product.sizes.length > 3 ? 2 : 0] : ''
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] ?? null
  );
  const [showDesigns, setShowDesigns] = useState(false);
  const [added, setAdded] = useState(false);

  const activeMockup = selectedVariant?.mockup ?? product.mockup;
  const isDesignSelected = selectedDesign !== null;

  const addToCart = useCartStore((s) => s.add);

  function handleAddToCart() {
    if (!selectedDesign) return;
    addToCart({
      productSlug: product.slug,
      designUrl: selectedDesign.src,
      designPrompt: selectedDesign.prompt,
      price: product.price,
      size: selectedSize || undefined,
      color: selectedVariant?.color,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleSelectDesign(design: DesignEntry) {
    setSelectedDesign(design);
    setShowDesigns(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-10 text-[11px] font-mono uppercase tracking-wider text-muted">
        <Link
          href="/loja"
          className="hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3 h-3" />
          Loja
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 mb-16">
        {/* ── Left: Image gallery ── */}
        <div className="space-y-4">
          {/* Main preview */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-square border border-border"
            style={{ background: '#1a1a1a' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDesign?.src ?? 'mockup-only'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-10"
              >
                <CompositedMockup
                  mockupSrc={activeMockup}
                  designSrc={selectedDesign?.src}
                  productSlug={product.slug}
                  alt={product.name}
                />
              </motion.div>
            </AnimatePresence>

            {/* Design label badge */}
            {isDesignSelected && (
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {selectedDesign.label}
                </span>
              </div>
            )}

            {/* Prompt hint */}
            {isDesignSelected && (
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] font-mono text-muted/70 truncate">
                  &ldquo;{selectedDesign.prompt}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-3">
            {/* Base mockup thumb */}
            <button
              onClick={() => setSelectedDesign(null)}
              aria-label="Mostrar produto sem design"
              className={`relative aspect-square rounded-xl overflow-hidden border transition-all hover:scale-[1.02] ${
                !isDesignSelected ? 'border-accent ring-1 ring-accent' : 'border-border hover:border-border-strong'
              }`}
              style={{ background: '#1a1a1a' }}
            >
              <div className="absolute inset-0 p-3">
                <CompositedMockup
                  mockupSrc={activeMockup}
                  productSlug={product.slug}
                  alt="Produto"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-background/80 py-1 text-[8px] font-mono uppercase tracking-wider text-center text-muted">
                Produto
              </div>
            </button>

            {/* Three design thumbnails */}
            {DESIGN_GALLERY.slice(0, 3).map((d) => (
              <button
                key={d.src}
                onClick={() => setSelectedDesign(d)}
                aria-label={`Design ${d.label}`}
                className={`relative aspect-square rounded-xl overflow-hidden border transition-all hover:scale-[1.02] ${
                  selectedDesign?.src === d.src
                    ? 'border-accent ring-1 ring-accent'
                    : 'border-border hover:border-border-strong'
                }`}
                style={{ background: '#1a1a1a' }}
              >
                <div className="absolute inset-0 p-3">
                  <CompositedMockup
                    mockupSrc={activeMockup}
                    designSrc={d.src}
                    productSlug={product.slug}
                    alt={d.label}
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-background/80 py-1 text-[8px] font-mono uppercase tracking-wider text-center text-muted">
                  {d.label}
                </div>
                {selectedDesign?.src === d.src && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-accent-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Product info ── */}
        <div className="flex flex-col">
          {/* Category tag */}
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
            {product.category}
          </p>

          {/* Name */}
          <h1
            className="font-display font-black uppercase leading-none text-foreground mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-3xl font-mono font-bold text-foreground mb-6">
            {formatPrice(product.price)}
          </p>

          {/* Color picker */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted mb-3">
                Cor — {selectedVariant?.color}
              </p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.color}
                    onClick={() => setSelectedVariant(v)}
                    title={v.color}
                    aria-label={v.color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedVariant?.color === v.color
                        ? 'border-accent scale-110'
                        : 'border-border hover:border-border-strong'
                    } ${v.hex === 'transparent' ? 'border-dashed' : ''}`}
                    style={v.hex && v.hex !== 'transparent' ? { backgroundColor: v.hex } : { backgroundColor: 'rgba(255,255,255,0.08)' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-7">
            {product.description}
          </p>

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted mb-3">
                Tamanho
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs font-mono uppercase tracking-wide px-3 py-2 border rounded-lg transition-colors min-w-[44px] text-center ${
                      selectedSize === size
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Materials + production info card */}
          <div className="bg-surface border border-border rounded-xl p-4 mb-7 space-y-3 text-xs">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                Materiais
              </p>
              <p className="text-muted-foreground leading-relaxed">{product.materials}</p>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
                <Clock className="w-3 h-3" /> Produção
              </span>
              <span className="font-mono text-accent">{product.productionTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
                <Package className="w-3 h-3" /> Envio
              </span>
              <span className="font-mono text-muted-foreground">CTT · 2–4 dias úteis</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 mt-auto">
            {/* Primary: AI generator */}
            <Link
              href={`/criar?product=${product.slug}`}
              className="flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:bg-accent/90 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              Personalizar com IA
            </Link>

            {/* Secondary: choose existing design */}
            <button
              onClick={() => setShowDesigns((o) => !o)}
              className="flex items-center justify-center gap-2 w-full border border-border text-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:border-border-strong transition-colors"
            >
              Escolher design existente
              {showDesigns ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Add to cart — only when design selected */}
            <AnimatePresence>
              {isDesignSelected && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 w-full font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl transition-colors ${
                    added
                      ? 'bg-green-500/15 border border-green-500/40 text-green-400'
                      : 'bg-surface border border-accent/30 text-accent hover:bg-accent/5'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Adicionado ao carrinho
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar ao carrinho
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Expandable design gallery ── */}
      <AnimatePresence>
        {showDesigns && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border pt-12 pb-4">
              <div className="mb-8">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-2">
                  Designs disponíveis
                </p>
                <h2 className="text-2xl font-display font-black uppercase text-foreground mb-2">
                  Escolhe um design
                </h2>
                <p className="text-sm text-muted-foreground">
                  Designs criados pela nossa IA. Preferes algo único?{' '}
                  <Link
                    href={`/criar?product=${product.slug}`}
                    className="text-accent hover:underline underline-offset-4"
                  >
                    Cria o teu próprio.
                  </Link>
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {DESIGN_GALLERY.map((design, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectDesign(design)}
                    aria-label={`Selecionar design: ${design.label}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all hover:scale-[1.02] group ${
                      selectedDesign?.src === design.src
                        ? 'border-accent ring-1 ring-accent'
                        : 'border-border hover:border-border-strong'
                    }`}
                    style={{ background: '#1a1a1a' }}
                  >
                    <div className="absolute inset-0 p-2">
                      <CompositedMockup
                        mockupSrc={activeMockup}
                        designSrc={design.src}
                        productSlug={product.slug}
                        alt={design.label}
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-background/85 py-1.5 text-[9px] font-mono uppercase tracking-wider text-center text-muted">
                      {design.label}
                    </div>
                    {selectedDesign?.src === design.src && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
