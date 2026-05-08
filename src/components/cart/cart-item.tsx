'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { type CartItem, useCartStore } from '@/lib/store-cart';
import { getProductBySlug, formatPrice } from '@/lib/products';

export function CartItemRow({ item }: { item: CartItem }) {
  const remove = useCartStore((s) => s.remove);
  const updateQty = useCartStore((s) => s.updateQty);
  const product = getProductBySlug(item.productSlug);

  const displayName = (product?.name ?? item.productSlug)
    .replace(' personalizada', '')
    .replace(' personalizado', '')
    .replace(' personalizados', '')
    .replace(' decorativo', '');

  function decrement() {
    if (item.quantity > 1) updateQty(item.id, item.quantity - 1);
    else remove(item.id);
  }

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Mockup + design thumbnails */}
      <div className="flex gap-2 shrink-0">
        <div className="w-16 h-16 bg-surface border border-border rounded-xl overflow-hidden flex items-center justify-center p-2">
          {product && (
            <Image
              src={product.mockup}
              alt={displayName}
              width={48}
              height={48}
              className="object-contain invert opacity-60 w-full h-full"
            />
          )}
        </div>
        <div className="w-16 h-16 bg-surface border border-border rounded-xl overflow-hidden flex items-center justify-center p-2">
          <Image
            src={item.designUrl}
            alt="Design aplicado"
            width={48}
            height={48}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-mono uppercase tracking-wide text-foreground">
              {displayName}
            </p>
            {item.size && (
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted mt-0.5">
                Tamanho: {item.size}
              </p>
            )}
            <p className="text-[11px] font-mono text-muted/50 mt-1 truncate">
              &ldquo;{item.designPrompt}&rdquo;
            </p>
          </div>
          <button
            onClick={() => remove(item.id)}
            aria-label="Remover item do carrinho"
            className="text-muted/40 hover:text-destructive transition-colors shrink-0 mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Qty + line price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              aria-label="Reduzir quantidade"
              className="w-7 h-7 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-mono w-6 text-center tabular-nums">{item.quantity}</span>
            <button
              onClick={() => updateQty(item.id, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="w-7 h-7 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm font-mono font-bold text-foreground tabular-nums">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
