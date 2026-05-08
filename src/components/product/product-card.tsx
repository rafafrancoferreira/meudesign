'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { type Product, formatPrice } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  const displayName = product.name
    .replace(' personalizada', '')
    .replace(' personalizado', '')
    .replace(' personalizados', '')
    .replace(' decorativo', '');

  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
      {/* Image container */}
      <div className="relative bg-surface border border-border rounded-xl overflow-hidden aspect-square mb-3 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(218,254,34,0.07)]">
        {/* Mockup */}
        <div className="absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-400 group-hover:opacity-0">
          <Image
            src={product.mockup}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain invert opacity-60 w-full h-full"
          />
        </div>

        {/* Hover: category tint + scale */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center p-8">
          <Image
            src={product.mockup}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain invert opacity-80 w-full h-full scale-105 transition-transform duration-500"
          />
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-background/80 backdrop-blur-sm border border-border text-[9px] font-mono uppercase tracking-wider text-muted px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Hover CTA chip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5">
            Personalizar
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
        <p className="text-[11px] font-mono uppercase tracking-wider text-muted/60">
          {product.category}
        </p>
      </div>
      </motion.div>
    </Link>
  );
}
