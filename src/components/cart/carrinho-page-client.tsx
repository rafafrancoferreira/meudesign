'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store-cart';
import { CartItemRow } from '@/components/cart/cart-item';
import { formatPrice } from '@/lib/products';
import { useLang } from '@/lib/i18n';

export function CarrinhoPageClient() {
  const { t } = useLang();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const shipping = useCartStore((s) => s.shipping);
  const total = useCartStore((s) => s.total);

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="px-4 py-16 min-h-[80vh]">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/loja"
          className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          {t.carrinho.continueShopping}
        </Link>

        {/* Title */}
        <div className="mb-10 border-b border-border pb-8">
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            {t.carrinho.title}
            {totalQty > 0 && (
              <span className="text-muted/30 ml-4" style={{ fontSize: '0.5em' }}>
                {totalQty} {totalQty === 1 ? t.carrinho.item : t.carrinho.items}
              </span>
            )}
          </h1>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <ShoppingBag className="w-16 h-16 text-muted/20" />
            <div>
              <p className="text-lg font-mono uppercase tracking-wider text-muted mb-2">
                {t.carrinho.emptyTitle}
              </p>
              <p className="text-sm text-muted-foreground">{t.carrinho.emptyDesc}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/loja"
                className="bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-3.5 rounded-xl hover:bg-accent/90 transition-colors"
              >
                {t.carrinho.viewProducts}
              </Link>
              <Link
                href="/criar"
                className="border border-border text-muted-foreground font-mono text-sm uppercase tracking-wide px-6 py-3.5 rounded-xl hover:border-border-strong hover:text-foreground transition-colors"
              >
                {t.carrinho.createDesign}
              </Link>
            </div>
          </div>
        )}

        {/* Items + summary */}
        {items.length > 0 && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Items list */}
            <div>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Order summary */}
            <div>
              <div className="sticky top-24 bg-surface border border-border rounded-2xl p-6 space-y-5">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">
                  {t.carrinho.orderSummary}
                </h2>

                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.carrinho.subtotal}</span>
                    <span className="tabular-nums">{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.carrinho.shipping}</span>
                    <span className={shipping() === 0 ? 'text-accent' : 'tabular-nums'}>
                      {shipping() === 0 ? t.carrinho.free : formatPrice(shipping())}
                    </span>
                  </div>
                  {subtotal() > 0 && subtotal() < 30 && (
                    <p className="text-[10px] font-mono text-muted/50">
                      {t.carrinho.freeShippingRemaining(formatPrice(30 - subtotal()))}
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 space-y-1">
                  <div className="flex justify-between text-foreground">
                    <span className="font-mono uppercase tracking-wide text-sm font-bold">
                      {t.carrinho.total}
                    </span>
                    <span className="font-mono text-xl font-bold tabular-nums">
                      {formatPrice(total())}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-muted/40">{t.carrinho.vatIncluded}</p>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center w-full bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:bg-accent/90 transition-colors"
                >
                  {t.carrinho.checkout}
                </Link>

                {/* Trust signals */}
                <div className="space-y-1.5 pt-1">
                  {t.carrinho.trustLines.map((line) => (
                    <p key={line} className="text-[10px] font-mono text-muted/40 flex items-center gap-1.5">
                      <span className="text-accent">—</span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
