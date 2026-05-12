'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { t } = useLang();
  const [toast, setToast] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!open) {
      setToast(false);
      setEmail('');
      setPassword('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      setToast(false);
      onClose();
    }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={t.auth.title}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal box */}
      <div className="relative w-full max-w-sm bg-surface border border-border rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="font-display font-black uppercase text-foreground text-2xl mb-6 leading-none">
          {t.auth.title}
        </h2>

        {/* Social buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2.5 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t.auth.continueGoogle}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2.5 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.5 0 663 0 541.8c0-207.6 127.4-317.5 252.5-317.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
            {t.auth.continueApple}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">{t.auth.or}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
              {t.auth.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@exemplo.com"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-border-strong transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
              {t.auth.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-border-strong transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-widest py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            {t.auth.enter}
          </button>
        </form>

        {/* Footer links */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            {t.auth.createAccount}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            {t.auth.forgotPassword}
          </button>
        </div>

        {/* Demo toast */}
        {toast && (
          <div className="absolute bottom-5 left-4 right-4 bg-surface-2 border border-accent/30 rounded-xl px-4 py-3 shadow-lg">
            <p className="text-xs font-mono text-foreground/80 leading-relaxed">
              {t.auth.demoToast}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
