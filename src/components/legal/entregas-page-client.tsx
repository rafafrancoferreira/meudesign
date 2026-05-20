'use client';

import Link from 'next/link';
import { Clock, Package, Truck, RefreshCw, AlertTriangle } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export function EntregasPageClient() {
  const { t } = useLang();
  const e = t.entregas;

  return (
    <main className="px-4 py-16 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          {e.breadcrumb}
        </Link>

        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">{e.legalTag}</p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            {e.title1}
            <br />
            {e.title2}
          </h1>
        </div>

        {/* Demo banner */}
        <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-5 py-3.5 mb-12">
          <AlertTriangle className="w-4 h-4 text-accent shrink-0" />
          <p className="text-sm font-mono text-muted-foreground">{e.demoBanner}</p>
        </div>

        <div className="space-y-12">
          {/* Production times */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                {e.productionTitle}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{e.productionIntro}</p>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              {e.productionItems.map((row, i) => (
                <div
                  key={row.product}
                  className={`flex items-center justify-between px-5 py-3.5 text-sm font-mono ${
                    i < e.productionItems.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-muted-foreground">{row.product}</span>
                  <span className="text-accent font-bold">{row.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                {e.shippingTitle}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">{e.carrierLabel}</p>
                    <p className="text-sm font-mono text-foreground">{e.carrierValue}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">{e.deliveryTimeLabel}</p>
                    <p className="text-sm font-mono text-foreground">{e.deliveryTimeValue}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">{e.shippingCostLabel}</p>
                    <p className="text-sm font-mono text-foreground">
                      <span className="text-accent font-bold">{e.shippingCostAmount}</span>
                      <span className="text-muted-foreground ml-2 text-[11px]">{e.shippingFreeNote}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>{e.shippingPara1}</p>
                <p>
                  {e.shippingPara2Pre}
                  <strong className="text-foreground">{e.shippingPara2Bold}</strong>
                  {e.shippingPara2Post}
                </p>
              </div>
            </div>
          </section>

          {/* Total estimated time */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                {e.totalTitle}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {e.totalPre}
              <span className="text-foreground font-bold">{e.totalBold}</span>
              {e.totalPost}
            </p>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 text-sm font-mono">
                <span className="text-muted-foreground">{e.totalProduction}</span>
                <span className="text-muted/40">+</span>
                <span className="text-muted-foreground">{e.totalShipping}</span>
                <span className="text-muted/40">=</span>
                <span className="text-accent font-bold">{e.totalResult}</span>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                {e.returnsTitle}
              </h2>
            </div>

            <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
              <div className="bg-surface border border-border rounded-xl p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground mb-3">
                  {e.returnsGeneralLabel}
                </p>
                <p>{e.returnsGeneralText}</p>
              </div>

              <div className="bg-surface border border-accent/20 rounded-xl p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-3">
                  {e.returnsExceptionLabel}
                </p>
                <p className="mb-3">{e.returnsExceptionIntro}</p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">—</span>
                    <span>
                      {e.returnsStep1Pre}
                      <strong className="text-foreground">{e.returnsStep1Bold}</strong>
                      {e.returnsStep1Post}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">—</span>
                    <span>
                      {e.returnsStep2Pre}
                      <strong className="text-foreground">{e.returnsStep2Email}</strong>
                      {e.returnsStep2Post}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">—</span>
                    <span>{e.returnsStep3}</span>
                  </li>
                </ul>
              </div>

              <p className="text-[12px]">{e.returnsFootnote}</p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {e.contactPre}
              <a href="mailto:info@meudesign.pt" className="text-accent hover:underline underline-offset-4">
                {e.contactEmail}
              </a>
              {e.contactMid}
              <Link href="/contactos" className="text-accent hover:underline underline-offset-4">
                {e.contactLink}
              </Link>
              {e.contactPost}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
