'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Package, Truck } from 'lucide-react';
import { useLang } from '@/lib/i18n';

function SucessoContent() {
  const searchParams = useSearchParams();
  const order = searchParams.get('order') ?? `MD-${Math.floor(100000 + Math.random() * 900000)}`;
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const infoItems = [
    { icon: Check,   text: t.sucesso.confirmationEmail },
    { icon: Package, text: t.sucesso.production },
    { icon: Truck,   text: t.sucesso.shipping },
  ];

  return (
    <main className="px-4 py-20 min-h-[80vh] flex items-center justify-center">
      <div
        className={`text-center max-w-md w-full transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Check circle */}
        <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-accent" strokeWidth={2.5} />
        </div>

        <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-accent mb-3">
          {t.sucesso.orderConfirmed}
        </p>
        <h1
          className="font-display font-black uppercase text-foreground mb-3"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          {t.sucesso.thankYou}
        </h1>
        <p className="text-sm font-mono text-muted-foreground mb-10">
          {t.sucesso.preparing}
        </p>

        {/* Order number card */}
        <div className="bg-surface border border-border rounded-2xl px-8 py-5 mb-8 inline-block w-full">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-2">
            {t.sucesso.orderNumber}
          </p>
          <p className="text-3xl font-mono font-bold text-foreground tracking-widest">{order}</p>
        </div>

        {/* Info list */}
        <div className="bg-surface border border-border rounded-2xl p-5 mb-10 text-left space-y-4">
          {infoItems.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 text-sm font-mono text-muted-foreground">
              <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/loja"
            className="flex-1 bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:bg-accent/90 transition-colors"
          >
            {t.sucesso.continueShopping}
          </Link>
          <Link
            href="/criar"
            className="flex-1 border border-border text-muted-foreground font-mono text-sm uppercase tracking-wide px-6 py-4 rounded-xl hover:border-border-strong hover:text-foreground transition-colors"
          >
            {t.sucesso.createAnother}
          </Link>
        </div>
      </div>
    </main>
  );
}

export function SucessoPageClient() {
  return (
    <Suspense>
      <SucessoContent />
    </Suspense>
  );
}
