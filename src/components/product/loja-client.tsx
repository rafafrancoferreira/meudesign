'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, type ProductCategory } from '@/lib/products';
import { ProductCard } from './product-card';
import { useLang } from '@/lib/i18n';

type SortOption = 'relevance' | 'price-asc' | 'price-desc';
type FilterCategory = 'todos' | ProductCategory;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function LojaClient() {
  const { t } = useLang();
  const [category, setCategory] = useState<FilterCategory>('todos');
  const [sort, setSort] = useState<SortOption>('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const CATEGORIES: { value: FilterCategory; label: string }[] = [
    { value: 'todos', label: t.loja.allCategories },
    { value: 'vestuário', label: t.loja.clothing },
    { value: 'decoração', label: t.loja.decoration },
    { value: 'acessórios', label: t.loja.accessories },
  ];

  const SORTS: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: t.loja.sortRelevance },
    { value: 'price-asc', label: t.loja.sortPriceAsc },
    { value: 'price-desc', label: t.loja.sortPriceDesc },
  ];

  const filtered = useMemo(() => {
    let result = category === 'todos' ? products : products.filter((p) => p.category === category);
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, sort]);

  const hasActiveFilter = category !== 'todos' || sort !== 'relevance';

  return (
    <>
      {/* Page header */}
      <div className="mb-14 border-b border-border pb-10">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3">
          {t.loja.tagline}
        </p>
        <h1
          className="font-display font-black uppercase leading-none text-foreground"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.025em' }}
        >
          {t.loja.title}
          <br />
          <span className="text-accent">{t.loja.titleAccent}</span>
        </h1>
      </div>

      <div className="flex gap-10">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Category */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted mb-3">
                {t.loja.categoryLabel}
              </p>
              <div className="space-y-0.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`w-full text-left text-sm font-mono uppercase tracking-wide px-3 py-2 rounded-lg transition-colors ${
                      category === cat.value
                        ? 'bg-accent/10 text-accent border border-accent/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted mb-3">
                {t.loja.sortLabel}
              </p>
              <div className="space-y-0.5">
                {SORTS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSort(s.value)}
                    className={`w-full text-left text-sm font-mono uppercase tracking-wide px-3 py-2 rounded-lg transition-colors ${
                      sort === s.value
                        ? 'bg-accent/10 text-accent border border-accent/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface border border-transparent'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <p className="text-[11px] font-mono text-muted/50 uppercase tracking-wider">
              {t.loja.count(filtered.length)}
            </p>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter bar */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-mono uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t.loja.filtersLabel}
              {hasActiveFilter && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
            </button>
            <span className="text-[11px] font-mono text-muted/50 uppercase tracking-wider">
              {t.loja.count(filtered.length)}
            </span>
          </div>

          {/* Mobile filter panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mb-6 bg-surface border border-border rounded-xl p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted">
                      {t.loja.filtersLabel}
                    </p>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2">
                      {t.loja.categoryLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setCategory(cat.value)}
                          className={`text-xs font-mono uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                            category === cat.value
                              ? 'bg-accent text-accent-foreground border-accent'
                              : 'border-border text-muted-foreground hover:border-border-strong'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2">
                      {t.loja.sortLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SORTS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setSort(s.value)}
                          className={`text-xs font-mono uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                            sort === s.value
                              ? 'bg-accent text-accent-foreground border-accent'
                              : 'border-border text-muted-foreground hover:border-border-strong'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <motion.div
            key={`${category}-${sort}`}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((product) => (
              <motion.div key={product.slug} variants={cardVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted py-20 font-mono uppercase tracking-wider text-sm">
              {t.loja.noProducts}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
