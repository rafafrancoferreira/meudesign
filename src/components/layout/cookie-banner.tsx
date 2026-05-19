'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function respond(value: 'accepted' | 'rejected') {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Consentimento de cookies"
          className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-2xl"
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border px-5 py-4"
            style={{
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(218,254,34,0.25)',
            }}
          >
            <p className="flex-1 text-xs font-mono text-muted-foreground leading-relaxed">
              This site uses cookies to improve your experience. By continuing,
              you consent to the use of cookies.{' '}
              <a
                href="/legal/privacidade"
                className="text-muted underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Learn more
              </a>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => respond('rejected')}
                className="px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-widest rounded-lg border border-border text-muted hover:border-border-strong hover:text-foreground transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => respond('accepted')}
                className="px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-widest rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
