'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { products, formatPrice } from '@/lib/products';

const FEATURED_SLUGS = ['t-shirt', 'hoodie', 'poster', 'caneca'];
const DESIGN_PREVIEWS: Record<string, string> = {
  'tshirt': '/mock-designs/retro-1.svg',
  't-shirt': '/mock-designs/retro-1.svg',
  hoodie: '/mock-designs/geometric-1.svg',
  poster: '/mock-designs/nature-1.svg',
  caneca: '/mock-designs/minimalista-1.svg',
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function FeaturedProducts() {
  const featured = FEATURED_SLUGS.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  return (
    <section className="px-4 py-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3">
              O catálogo
            </p>
            <h2
              className="font-display font-black uppercase leading-none text-foreground"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Produtos em
              <br />
              <span className="text-accent">destaque</span>
            </h2>
          </div>
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors group whitespace-nowrap"
          >
            Ver todos os produtos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {featured.map((product) => (
            <motion.div key={product.slug} variants={item}>
              <Link href={`/produto/${product.slug}`} className="group block">
                <div className="relative bg-surface border border-border rounded-xl overflow-hidden aspect-square mb-4">
                  {/* Mockup (always visible) */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-400 group-hover:opacity-0">
                    <Image
                      src={product.mockup}
                      alt={product.name}
                      width={160}
                      height={160}
                      className="object-contain opacity-70 w-full h-full"
                      unoptimized
                    />
                  </div>

                  {/* Design preview (visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <Image
                      src={DESIGN_PREVIEWS[product.slug] ?? '/mock-designs/abstract-1.svg'}
                      alt={`Design exemplo — ${product.name}`}
                      fill
                      className="object-contain p-6"
                    />
                    {/* Overlay mockup on top */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                      <Image
                        src={product.mockup}
                        alt=""
                        width={160}
                        height={160}
                        className="object-contain opacity-30 w-full h-full"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Hover CTA chip */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap">
                      Personalizar
                    </span>
                  </div>

                  {/* Border hover */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-border-strong transition-colors pointer-events-none" />
                </div>

                <div className="px-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-sm font-mono uppercase tracking-wide text-foreground group-hover:text-accent transition-colors leading-tight">
                      {product.name.replace(' personalizados', '').replace(' personalizada', '').replace(' personalizado', '').replace(' decorativo', '')}
                    </h3>
                    <span className="text-sm font-mono text-muted-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted/60">
                    {product.category}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
