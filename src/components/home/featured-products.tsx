'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { products, formatPrice } from '@/lib/products';
import { useLang } from '@/lib/i18n';

const FEATURED_SLUGS = ['t-shirt', 'hoodie', 'poster', 'caneca'];

const DESIGN_PREVIEWS: Record<string, string> = {
  'tshirt':        '/mock-designs/retro-1.png',
  't-shirt':       '/mock-designs/retro-1.png',
  hoodie:          '/mock-designs/geometrico-1.png',
  poster:          '/mock-designs/minimalista-1.png',
  caneca:          '/mock-designs/abstrato-1.png',
  'tote-bag':      '/mock-designs/futurista-1.png',
  'capa-telemovel':'/mock-designs/tipografico-1.png',
  autocolantes:    '/mock-designs/organico-1.png',
  quadro:          '/mock-designs/ilustrado-1.png',
};

// Print-zone overlay: top edge position + square size, both relative to the card
const PRINT_ZONES: Record<string, { top: string; size: string; borderRadius?: string }> = {
  't-shirt':        { top: '28%', size: '37%' },
  hoodie:           { top: '35%', size: '35%' },
  poster:           { top: '17%', size: '66%' },
  caneca:           { top: '32%', size: '42%' },
  'tote-bag':       { top: '28%', size: '45%' },
  'capa-telemovel': { top: '15%', size: '60%', borderRadius: '8%' },
  autocolantes:     { top: '13%', size: '74%' },
  quadro:           { top: '12%', size: '75%' },
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
  const { t } = useLang();
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
              {t.home.catalog}
            </p>
            <h2
              className="font-display font-black uppercase leading-none text-foreground"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              {t.home.featured}
              <br />
              <span className="text-accent">{t.home.featuredAccent}</span>
            </h2>
          </div>
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors group whitespace-nowrap"
          >
            {t.home.viewAll}
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
          {featured.map((product) => {
            const zone = PRINT_ZONES[product.slug] ?? { top: '31%', size: '44%' };
            return (
            <motion.div key={product.slug} variants={item}>
              <Link href={`/produto/${product.slug}`} className="group block">
                <div
                  className="relative border border-border rounded-xl overflow-hidden aspect-square mb-4 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(218,254,34,0.06)]"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {/* Mockup — always visible */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src={product.mockup}
                      alt={product.name}
                      width={160}
                      height={160}
                      className="object-contain w-full h-full"
                      style={{ opacity: 0.85 }}
                      unoptimized
                    />
                  </div>

                  {/* Design preview — fades in over the print zone only */}
                  <div
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none overflow-hidden"
                    style={{
                      left: '50%',
                      top: zone.top,
                      width: zone.size,
                      aspectRatio: '1 / 1',
                      transform: 'translateX(-50%)',
                      borderRadius: zone.borderRadius,
                    }}
                  >
                    <Image
                      src={DESIGN_PREVIEWS[product.slug] ?? '/mock-designs/abstrato-1.png'}
                      alt={`Design — ${product.name}`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Hover CTA chip */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap">
                      {t.home.customize}
                    </span>
                  </div>

                  {/* Border hover */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/30 transition-colors pointer-events-none" />
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
          );
          })}
        </motion.div>
      </div>
    </section>
  );
}
