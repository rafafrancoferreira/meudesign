import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Erro 404
      </p>

      <h1 className="mt-6 font-display text-[clamp(5rem,20vw,14rem)] font-black uppercase leading-none text-foreground">
        Perdido?
      </h1>

      <p className="mt-8 max-w-md text-muted-foreground">
        Esta página não existe. Talvez tenhas escrito o endereço errado ou a
        página foi removida.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao início
      </Link>
    </main>
  );
}
