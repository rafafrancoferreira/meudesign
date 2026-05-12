'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useLang } from '@/lib/i18n';

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
    prompt: 'sol retro estilo anos 70 com raios geométricos, paleta laranja queimado e amarelo mostarda, fundo preto',
    style: 'retro',
    user: 'ana_m',
    tall: true,
  },
  {
    src: '/mock-designs/abstrato-1.png',
    prompt: 'explosão de tinta líquida coral, magenta e dourado sobre fundo preto, textura metálica',
    style: 'abstrato',
    user: 'joao_k',
  },
  {
    src: '/mock-designs/futurista-1.png',
    prompt: 'capacete de astronauta futurista com reflexo de galáxia, linhas neon azul e ciano, fundo preto',
    style: 'futurista',
    user: 'rita_design',
    tall: true,
  },
  {
    src: '/mock-designs/ilustrado-1.png',
    prompt: 'dragão oriental chinês em espiral, escamas vermelho e dourado, nuvens estilizadas, fundo preto',
    style: 'ilustrado',
    user: 'miguel_s',
  },
  {
    src: '/mock-designs/geometrico-1.png',
    prompt: 'lobo feito de triângulos geométricos, tons azul-marinho e prata, olhos dourados, fundo preto',
    style: 'geométrico',
    user: 'carla_v',
  },
  {
    src: '/mock-designs/minimalista-1.png',
    prompt: 'montanha minimalista com lua cheia, silhueta branca e dourado, reflexo em lago, fundo preto',
    style: 'minimalista',
    user: 'tiago_b',
    tall: true,
  },
  {
    src: '/mock-designs/tipografico-1.png',
    prompt: 'letra M monumental 3D art déco, dourado metalizado, ornamentos geométricos, fundo preto',
    style: 'tipográfico',
    user: 'sofia_r',
  },
  {
    src: '/mock-designs/organico-1.png',
    prompt: 'árvore bonsai japonesa com raízes em círculo, verde esmeralda e dourado, fundo preto',
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
  const { t } = useLang();

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
            {t.home.galleryTagline}
          </p>
          <h2
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
          >
            {t.home.galleryTitle}
            <br />
            <span className="text-accent">{t.home.galleryTitleAccent}</span>
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
              className="break-inside-avoid mb-4"
            >
              <div className="bg-[#141414] border border-white/10 rounded-xl overflow-hidden">
                {/* Image section — white bg so designs render naturally */}
                <div
                  className="relative bg-black"
                  style={{ aspectRatio: entry.tall ? '3/4' : '1/1' }}
                >
                  <Image
                    src={entry.src}
                    alt={entry.prompt}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Style tag — always visible */}
                  <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full px-2 py-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/90">
                      {entry.style}
                    </span>
                  </div>
                </div>

                {/* Text section — dark */}
                <div className="px-3 py-2.5 border-t border-white/[0.06]">
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                    &ldquo;{entry.prompt}&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-muted/60 mt-1.5">@{entry.user}</p>
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
          {t.home.galleryFootnote}
        </motion.p>
      </div>
    </section>
  );
}
