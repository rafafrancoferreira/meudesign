'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { type Product, formatPrice } from '@/lib/products';
import { useLang, getProductMeta } from '@/lib/i18n';
import { MOCKUP_PRINT_ZONES } from '@/lib/mockup-zones';

export function ProductCard({ product }: { product: Product }) {
  const defaultMockup = product.variants?.[0]?.mockup ?? product.mockup;
  const [activeMockup, setActiveMockup] = useState(defaultMockup);
  const { t } = useLang();
  const meta = getProductMeta(product.slug, t);
  const zone = MOCKUP_PRINT_ZONES[product.slug] ?? MOCKUP_PRINT_ZONES['t-shirt'];

  const displayName = meta?.nameShort ?? product.name
    .replace(' personalizados', '')
    .replace(' personalizada', '')
    .replace(' personalizado', '')
    .replace(' decorativo', '');

  const categoryLabel = ({
    vestuário: t.loja.clothing,
    decoração: t.loja.decoration,
    acessórios: t.loja.accessories,
  } as Record<string, string>)[product.category] ?? product.category;

  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
      {/* Image container */}
      <div
        className="relative border border-border rounded-xl overflow-hidden mb-3 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(218,254,34,0.07)]"
        style={{ background: product.mockupBg ?? '#1a1a1a', aspectRatio: zone.aspectRatio ?? '1' }}
      >
        {/* Mockup — always visible, brightens on hover */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image
            src={activeMockup}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain w-full h-full transition-opacity duration-300"
            style={{ opacity: 0.85 }}
            unoptimized
          />
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-background/80 backdrop-blur-sm border border-border text-[9px] font-mono uppercase tracking-wider text-muted px-2 py-1 rounded-full">
            {categoryLabel}
          </span>
        </div>

        {/* Hover CTA chip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5">
            {t.home.customize}
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Border hover */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/30 transition-colors pointer-events-none" />
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="text-sm font-mono uppercase tracking-wide text-foreground group-hover:text-accent transition-colors leading-tight">
            {displayName}
          </h3>
          <span className="text-sm font-mono text-muted-foreground whitespace-nowrap shrink-0">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Color swatches */}
        {product.variants && product.variants.length > 1 ? (
          <div className="flex items-center gap-1.5 mt-1.5">
            {product.variants.map((v) => (
              <button
                key={v.color}
                title={v.color}
                aria-label={v.color}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMockup(v.mockup);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeMockup === v.mockup
                    ? 'border-accent scale-125'
                    : 'border-border/60 hover:border-border-strong'
                } ${v.hex === 'transparent' ? 'border-dashed' : ''}`}
                style={v.hex && v.hex !== 'transparent' ? { backgroundColor: v.hex } : { backgroundColor: 'rgba(255,255,255,0.1)' }}
              />
            ))}
          </div>
        ) : (
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted/60">
            {categoryLabel}
          </p>
        )}
      </div>
      </motion.div>
    </Link>
  );
}
