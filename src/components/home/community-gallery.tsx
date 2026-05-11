'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

interface GalleryItem {
  src: string;
  prompt: string;
  style: string;
  user: string;
  tall?: boolean;
}

const GALLERY: GalleryItem[] = [
  {
    src: '/mock-designs/retro-1.png',
    prompt: 'sol retro com cara sorridente, estilo anos 70, fundo escuro',
    style: 'retro',
    user: 'ana_m',
    tall: true,
  },
  {
    src: '/mock-designs/abstrato-1.png',
    prompt: 'composição abstrata dinâmica com formas sobrepostas e cor intensa',
    style: 'abstrato',
    user: 'joao_k',
  },
  {
    src: '/mock-designs/futurista-1.png',
    prompt: 'máscara geométrica cyberpunk, cyan e violeta',
    style: 'futurista',
    user: 'rita_design',
    tall: true,
  },
  {
    src: '/mock-designs/organico-2.png',
    prompt: 'composição orgânica fluida, tons quentes e naturais',
    style: 'orgânico',
    user: 'miguel_s',
  },
  {
    src: '/mock-designs/geometrico-1.png',
    prompt: 'mandala geométrica tons violeta e dourado',
    style: 'geométrico',
    user: 'carla_v',
  },
  {
    src: '/mock-designs/retro-2.png',
    prompt: 'pôr do sol sobre o oceano, vibe surfista 80s',
    style: 'retro',
    user: 'tiago_b',
    tall: true,
  },
  {
    src: '/mock-designs/futurista-2.png',
    prompt: 'rede de nodos em grelha futurista verde-néon',
    style: 'futurista',
    user: 'sofia_r',
  },
  {
    src: '/mock-designs/organico-1.png',
    prompt: 'formas orgânicas fluidas, laranja quente e cyan frio',
    style: 'orgânico',
    user: 'pedro_n',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function CommunityGallery() {
  return (
    <section className="px-4 py-24 border-t border-border bg-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3">
            Feitos pela comunidade
          </p>
          <h2
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
          >
            Designs reais,
            <br />
            <span className="text-accent">prompts reais.</span>
          </h2>
        </motion.div>

        {/* Masonry grid — CSS columns */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="columns-2 md:columns-3 lg:columns-4 gap-4"
        >
          {GALLERY.map((entry, i) => (
            <motion.div
              key={`${entry.src}-${i}`}
              variants={item}
              className="break-inside-avoid mb-4 group"
            >
              <div
                className="relative bg-surface border border-border rounded-xl overflow-hidden"
                style={{ aspectRatio: entry.tall ? '3/4' : '1/1' }}
              >
                <Image
                  src={entry.src}
                  alt={entry.prompt}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover caption overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-accent mb-1">
                    {entry.style}
                  </p>
                  <p className="text-xs text-foreground leading-snug line-clamp-3 font-sans">
                    &ldquo;{entry.prompt}&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-muted mt-2">@{entry.user}</p>
                </div>

                {/* Always-visible style tag */}
                <div className="absolute top-2.5 left-2.5 bg-background/70 backdrop-blur-sm border border-border rounded-full px-2 py-0.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted">
                    {entry.style}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs font-mono text-muted/50 mt-8 uppercase tracking-wider"
        >
          Designs gerados pela nossa IA · os prompts são dos utilizadores
        </motion.p>
      </div>
    </section>
  );
}
