"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/i18n";

type NavLink = { href: string; label: string };

interface NavMobileProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  onLogin?: () => void;
  loginLabel?: string;
  langToggle?: { lang: Lang; setLang: (l: Lang) => void };
}

export function NavMobile({ open, onClose, links, onLogin, loginLabel, langToggle }: NavMobileProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black/80 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        aria-label="Navegação mobile"
        className={cn(
          "absolute top-16 left-0 right-0 border-b bg-surface px-4 py-6 transition-transform duration-300",
          open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-md px-3 py-3 text-lg font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer row: login + language */}
        {(onLogin || langToggle) && (
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            {onLogin && (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors"
              >
                <User className="w-4 h-4" />
                {loginLabel}
              </button>
            )}
            {langToggle && (
              <div className="flex items-center gap-2 text-sm font-mono tracking-wider ml-auto">
                <button
                  onClick={() => langToggle.setLang('pt')}
                  className={`transition-colors ${langToggle.lang === 'pt' ? 'text-foreground font-semibold' : 'text-muted'}`}
                >
                  PT
                </button>
                <span className="text-muted/40 select-none">|</span>
                <button
                  onClick={() => langToggle.setLang('en')}
                  className={`transition-colors ${langToggle.lang === 'en' ? 'text-foreground font-semibold' : 'text-muted'}`}
                >
                  EN
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
