'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center px-4 overflow-hidden">
      {/* Accent glow behind title */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(218,254,34,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full py-24">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-16 items-center">
          {/* ── Left: text + CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted border border-border rounded-full px-3 py-1.5 mb-8"
            >
              <Sparkles className="w-3 h-3 text-accent" />
              IA generativa · produtos únicos
            </motion.p>

            {/* Oversized title with motion-blur ghost */}
            <div className="relative select-none mb-6 overflow-visible">
              {/* Ghost blur layer */}
              <span
                aria-hidden
                className="absolute font-display font-black uppercase text-white pointer-events-none"
                style={{
                  fontSize: 'clamp(4.5rem, 15vw, 11.5rem)',
                  lineHeight: 0.88,
                  filter: 'blur(22px)',
                  opacity: 0.07,
                  transform: 'translateX(-14px) translateY(10px)',
                  letterSpacing: '-0.025em',
                  whiteSpace: 'nowrap',
                }}
              >
                MEUDESIGN
              </span>
              {/* Second ghost — lighter, further offset */}
              <span
                aria-hidden
                className="absolute font-display font-black uppercase text-accent pointer-events-none"
                style={{
                  fontSize: 'clamp(4.5rem, 15vw, 11.5rem)',
                  lineHeight: 0.88,
                  filter: 'blur(40px)',
                  opacity: 0.04,
                  transform: 'translateX(20px) translateY(-6px)',
                  letterSpacing: '-0.025em',
                  whiteSpace: 'nowrap',
                }}
              >
                MEUDESIGN
              </span>
              {/* Main text */}
              <h1
                className="relative font-display font-black uppercase leading-none text-foreground"
                style={{
                  fontSize: 'clamp(4.5rem, 15vw, 11.5rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                MEU
                <br />
                <span className="text-accent">DESIGN</span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed mb-10 font-sans"
            >
              Design inteligente, feito por si.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/criar"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-wider px-7 py-3.5 rounded-md hover:opacity-90 transition-opacity text-sm"
              >
                Criar agora
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/loja"
                className="inline-flex items-center border border-border-strong text-foreground font-mono uppercase tracking-wider px-7 py-3.5 rounded-md hover:border-foreground/40 transition-colors text-sm"
              >
                Ver produtos
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: animated mockup card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto w-64 xl:w-72">
              {/* Main card */}
              <div className="relative bg-surface border border-border rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                <Image
                  src="/mock-designs/geometrico-1.png"
                  alt="Exemplo de design gerado por IA"
                  width={240}
                  height={240}
                  className="object-contain p-6"
                />
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.012) 4px, rgba(255,255,255,0.012) 5px)',
                  }}
                />
              </div>

              {/* Floating prompt bubble */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -bottom-5 -left-8 bg-surface-2 border border-border rounded-xl px-4 py-3 max-w-[180px] shadow-xl"
              >
                <p className="text-[9px] font-mono text-muted uppercase tracking-widest mb-1">
                  Prompt
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  mandala geométrica tons violeta e dourado
                </p>
              </motion.div>

              {/* Success badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -top-3 -right-5 bg-accent text-accent-foreground rounded-full px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider"
              >
                IA gerou ✓
              </motion.div>

              {/* Small floating time badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="absolute top-1/2 -right-10 bg-surface border border-border rounded-lg px-2.5 py-1.5"
              >
                <p className="text-[9px] font-mono text-muted">2.3s</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-border" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted/50">
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
