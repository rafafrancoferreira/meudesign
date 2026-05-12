'use client';

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-auto border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">

        {/* Grid principal */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-7">

          {/* Marca */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-black uppercase tracking-tight transition-colors hover:text-accent"
            >
              MEUDESIGN
            </Link>
            <p className="mt-3 max-w-[200px] text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          {/* Colunas */}
          {t.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé inferior */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-xs text-muted">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacidade"
              className="text-xs text-muted transition-colors hover:text-muted-foreground"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/legal/entregas-devolucoes"
              className="text-xs text-muted transition-colors hover:text-muted-foreground"
            >
              {t.footer.deliveries}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
