'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export function FinalCta() {
  const { t } = useLang();

  return (
    <section className="px-4 py-28 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Accent glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(218,254,34,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-6"
          >
            {t.home.ctaTagline}
          </motion.p>

          {/* Big text with blur ghost */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative select-none mb-10"
          >
            {/* Ghost layer */}
            <span
              aria-hidden
              className="absolute inset-0 font-display font-black uppercase text-accent pointer-events-none flex items-center justify-center"
              style={{
                fontSize: 'clamp(3rem, 11vw, 9rem)',
                letterSpacing: '-0.025em',
                filter: 'blur(28px)',
                opacity: 0.12,
                lineHeight: 0.9,
              }}
            >
              {t.home.ctaGhost}
            </span>
            <h2
              className="relative font-display font-black uppercase text-foreground leading-none"
              style={{
                fontSize: 'clamp(3rem, 11vw, 9rem)',
                letterSpacing: '-0.025em',
              }}
            >
              {t.home.ctaTitle1}
              <br />
              {t.home.ctaTitle2}
              <span className="text-accent">{t.home.ctaTitle2Accent}</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-10 font-sans leading-relaxed"
          >
            {t.home.ctaDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/criar"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-wider px-8 py-4 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              {t.home.ctaBtn1}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/loja"
              className="inline-flex items-center border border-border-strong text-foreground font-mono uppercase tracking-wider px-8 py-4 rounded-md hover:border-foreground/40 transition-colors text-sm"
            >
              {t.home.ctaBtn2}
            </Link>
          </motion.div>

          {/* Subtle divider marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 border-t border-border pt-8 overflow-hidden"
          >
            <div className="flex gap-8 whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.2em] text-muted/30 justify-center flex-wrap">
              {t.home.marqueeItems.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
