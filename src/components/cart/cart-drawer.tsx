'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/lib/store-cart';
import { getProductBySlug, formatPrice } from '@/lib/products';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const shipping = useCartStore((s) => s.shipping);
  const total = useCartStore((s) => s.total);

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-border flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground">
                Carrinho
                {totalQty > 0 && (
                  <span className="ml-2 text-muted/50">({totalQty})</span>
                )}
              </h2>
              <button
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <ShoppingBag className="w-10 h-10 text-muted/20" />
                  <div>
                    <p className="text-sm font-mono uppercase tracking-wider text-muted mb-1">
                      O teu carrinho está vazio
                    </p>
                    <p className="text-xs text-muted/50 font-mono">
                      Cria o teu primeiro design único.
                    </p>
                  </div>
                  <Link
                    href="/loja"
                    onClick={onClose}
                    className="text-xs font-mono uppercase tracking-wide text-accent hover:underline underline-offset-4"
                  >
                    Ver produtos →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = getProductBySlug(item.productSlug);
                    const displayName = (product?.name ?? item.productSlug)
                      .replace(' personalizada', '')
                      .replace(' personalizado', '')
                      .replace(' personalizados', '')
                      .replace(' decorativo', '');

                    return (
                      <div key={item.id} className="flex gap-3 py-3 border-b border-border last:border-0">
                        {/* Thumbs */}
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-12 h-12 bg-background border border-border rounded-lg overflow-hidden flex items-center justify-center p-1.5">
                            {product && (
                              <Image
                                src={product.mockup}
                                alt={displayName}
                                width={36}
                                height={36}
                                className="object-contain invert opacity-60 w-full h-full"
                              />
                            )}
                          </div>
                          <div className="w-12 h-12 bg-background border border-border rounded-lg overflow-hidden flex items-center justify-center p-1.5">
                            <Image
                              src={item.designUrl}
                              alt="Design"
                              width={36}
                              height={36}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-mono uppercase tracking-wide text-foreground truncate">
                            {displayName}
                          </p>
                          {item.size && (
                            <p className="text-[10px] font-mono text-muted mt-0.5">{item.size}</p>
                          )}
                          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                            {item.quantity}× {formatPrice(item.price)}
                          </p>
                        </div>

                        <p className="text-xs font-mono font-bold text-foreground shrink-0 tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer — only when items exist */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-5 space-y-4 shrink-0">
                {/* Price breakdown */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envio</span>
                    <span className={shipping() === 0 ? 'text-accent' : 'tabular-nums'}>
                      {shipping() === 0 ? 'Grátis' : formatPrice(shipping())}
                    </span>
                  </div>
                  {subtotal() < 30 && (
                    <p className="text-[10px] text-muted/50">
                      Faltam {formatPrice(30 - subtotal())} para envio grátis
                    </p>
                  )}
                  <div className="flex justify-between text-foreground font-bold text-sm pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="tabular-nums">{formatPrice(total())}</span>
                  </div>
                </div>

                {/* CTAs */}
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center w-full bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-3.5 rounded-xl hover:bg-accent/90 transition-colors"
                >
                  Finalizar compra
                </Link>
                <Link
                  href="/carrinho"
                  onClick={onClose}
                  className="flex items-center justify-center w-full border border-border text-muted-foreground font-mono text-xs uppercase tracking-wide px-6 py-2.5 rounded-xl hover:border-border-strong hover:text-foreground transition-colors"
                >
                  Ver carrinho completo
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
