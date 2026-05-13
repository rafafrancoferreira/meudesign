"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store-cart";
import { useLang } from "@/lib/i18n";
import { NavMobile } from "./nav-mobile";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { LoginModal } from "@/components/auth/login-modal";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const qty = items.reduce((sum, i) => sum + i.quantity, 0);
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { href: "/criar", label: t.nav.criar },
    { href: "/loja", label: t.nav.loja },
    { href: "/sobre", label: t.nav.sobre },
    { href: "/contactos", label: t.nav.contactos },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language toggle — desktop only */}
            <div className="hidden md:flex items-center gap-1 text-xs font-mono tracking-wider">
              <button
                onClick={() => setLang('pt')}
                className={`transition-colors ${lang === 'pt' ? 'text-foreground font-semibold' : 'text-muted hover:text-muted-foreground'}`}
                aria-label="Mudar para Português"
              >
                PT
              </button>
              <span className="text-muted/40 select-none">|</span>
              <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-foreground font-semibold' : 'text-muted hover:text-muted-foreground'}`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/meudesign.isag/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram MeuDesign"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Sign in button */}
            <button
              onClick={() => setLoginOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5 hover:border-border-strong"
            >
              <User className="w-3.5 h-3.5" />
              {t.nav.iniciarSessao}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={t.nav.cartLabel(qty)}
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

            {/* Hamburger — mobile only */}
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
        links={navLinks}
        onLogin={() => { setMobileOpen(false); setLoginOpen(true); }}
        loginLabel={t.nav.iniciarSessao}
        langToggle={{ lang, setLang }}
      />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
