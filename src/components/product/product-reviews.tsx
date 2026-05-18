'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '@/lib/i18n';

const DISTRIBUTION = [
  { stars: 5, pct: 89 },
  { stars: 4, pct: 8 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

const OVERALL_RATING = 4.8;
const TOTAL_REVIEWS = 127;

type ReviewItem = { name: string; stars: number; date: string; text: string; verified: boolean };

function StarDisplay({ count, size = 'sm' }: { count: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${i <= count ? 'text-accent fill-accent' : 'text-white/20 fill-none'}`}
        />
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="p-0.5"
          aria-label={`${i} star${i !== 1 ? 's' : ''}`}
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              i <= (hover || value) ? 'text-accent fill-accent' : 'text-white/20 fill-none'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewerAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold text-foreground shrink-0"
      style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {initials}
    </div>
  );
}

export function ProductReviews() {
  const { t } = useLang();
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formText, setFormText] = useState('');

  const reviews = (t as unknown as { reviews: { list: ReviewItem[] } }).reviews.list;

  function openModal() {
    setFormRating(0);
    setFormName('');
    setFormText('');
    setModalOpen(true);
  }

  function handleSubmit() {
    setModalOpen(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  }

  return (
    <>
      <section
        className="mt-16 rounded-2xl px-6 py-12"
        style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Header: overall rating + distribution */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-10">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
              {t.reviews.title}
            </p>
            <div className="flex items-end gap-4">
              <span className="text-6xl font-display font-black text-foreground leading-none">
                {OVERALL_RATING}
              </span>
              <div className="pb-1">
                <StarDisplay count={Math.round(OVERALL_RATING)} size="lg" />
                <p className="text-xs font-mono text-muted mt-1.5">
                  {t.reviews.totalReviews(TOTAL_REVIEWS)}
                </p>
              </div>
            </div>
          </div>

          {/* Star distribution bars */}
          <div className="space-y-2.5 sm:w-60">
            {DISTRIBUTION.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-muted w-4 text-right shrink-0 tabular-nums">{stars}</span>
                <Star className="w-3 h-3 text-accent fill-accent shrink-0" />
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-muted w-8 shrink-0 tabular-nums">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div className="space-y-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {reviews.map((review, i) => (
            <div key={i} className="py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-start gap-3 mb-3">
                <ReviewerAvatar name={review.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono font-bold text-foreground">{review.name}</p>
                    <p className="text-[11px] font-mono text-muted shrink-0">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StarDisplay count={review.stars} size="sm" />
                    {review.verified && (
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(34,197,94,0.1)',
                          color: 'rgb(134,239,172)',
                          border: '1px solid rgba(34,197,94,0.2)',
                        }}
                      >
                        {t.reviews.verifiedBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-12">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={openModal}
            className="flex-1 bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:bg-accent/90 transition-colors"
          >
            {t.reviews.writeReview}
          </button>
          <button
            disabled
            className="flex-1 border border-border text-muted/30 font-mono text-sm uppercase tracking-widest px-6 py-4 rounded-xl cursor-not-allowed"
          >
            {t.reviews.viewAll}
          </button>
        </div>
      </section>

      {/* Write review modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-surface border border-border rounded-2xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-foreground">
                  {t.reviews.modalTitle}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-muted hover:text-foreground transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    {t.reviews.modalNameLabel}
                  </label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t.reviews.modalNamePlaceholder}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted/40 outline-none focus:border-accent/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2">
                    {t.reviews.modalRatingLabel}
                  </label>
                  <StarPicker value={formRating} onChange={setFormRating} />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    {t.reviews.modalTextLabel}
                  </label>
                  <textarea
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder={t.reviews.modalTextPlaceholder}
                    rows={4}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted/40 outline-none focus:border-accent/60 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border border-border text-muted-foreground font-mono text-sm uppercase tracking-widest px-4 py-3 rounded-xl hover:border-border-strong hover:text-foreground transition-colors"
                >
                  {t.reviews.modalCancel}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-4 py-3 rounded-xl hover:bg-accent/90 transition-colors"
                >
                  {t.reviews.modalSubmit}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 bg-surface border border-border rounded-xl px-5 py-4 shadow-2xl max-w-sm"
          >
            <p className="text-sm font-mono text-foreground">{t.reviews.toastSuccess}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
