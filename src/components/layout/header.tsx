"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store-cart";
import { NavMobile } from "./nav-mobile";
import { CartDrawer } from "@/components/cart/cart-drawer";

const NAV_LINKS = [
  { href: "/criar", label: "Criar" },
  { href: "/loja", label: "Loja" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contactos", label: "Contactos" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const qty = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-black uppercase tracking-tight transition-colors hover:text-accent"
          >
            MEUDESIGN
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Ações direita */}
          <div className="flex items-center gap-3">
            {/* Carrinho */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Carrinho — ${qty} ${qty === 1 ? "item" : "itens"}`}
              className="relative text-muted-foreground transition-colors hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              {qty > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold leading-none text-accent-foreground"
                >
                  {qty > 9 ? "9+" : qty}
                </span>
              )}
            </button>

            {/* Hamburger — só mobile */}
            <button
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              className="text-muted-foreground transition-colors hover:text-foreground md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <NavMobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
