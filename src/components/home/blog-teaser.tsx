'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/content';
import { useLang } from '@/lib/i18n';

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Guia: 'text-accent border-accent/30 bg-accent/5',
  Guide: 'text-accent border-accent/30 bg-accent/5',
  Inspiração: 'text-sky-400 border-sky-400/30 bg-sky-400/5',
  Inspiration: 'text-sky-400 border-sky-400/30 bg-sky-400/5',
  Tecnologia: 'text-violet-400 border-violet-400/30 bg-violet-400/5',
  Technology: 'text-violet-400 border-violet-400/30 bg-violet-400/5',
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function BlogTeaser() {
  const { t, lang } = useLang();

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
              {t.home.blogTagline}
            </p>
            <h2
              className="font-display font-black uppercase leading-none text-foreground"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              {t.home.blogTitle}
              <br />
              <span className="text-accent">{t.home.blogTitleAccent}</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors group whitespace-nowrap"
          >
            {t.home.blogViewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-4"
        >
          {blogPosts.map((post, index) => (
            <motion.div key={post.slug} variants={item}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="h-full bg-surface border border-border rounded-xl p-6 xl:p-8 flex flex-col hover:border-border-strong transition-colors">
                  {/* Category + read time */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider border rounded-full px-2.5 py-1 ${CATEGORY_COLORS[post.category[lang]] ?? 'text-muted border-border'}`}
                    >
                      {post.category[lang]}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-muted/60 uppercase tracking-wider">
                      <Clock className="w-2.5 h-2.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Article number watermark */}
                  <div
                    className="font-display font-black text-foreground/5 leading-none select-none mb-2"
                    style={{ fontSize: '4rem', letterSpacing: '-0.04em' }}
                  >
                    0{index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black uppercase text-foreground text-xl xl:text-2xl leading-tight mb-4 group-hover:text-accent transition-colors">
                    {post.title[lang]}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt[lang]}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                    <time className="text-[11px] font-mono text-muted/60">
                      {formatDate(post.date, t.home.blogDateLocale)}
                    </time>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-muted group-hover:text-accent transition-colors">
                      {t.home.blogRead}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
