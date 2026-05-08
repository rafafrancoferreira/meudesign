import type { Metadata } from 'next';
import { LojaClient } from '@/components/product/loja-client';

export const metadata: Metadata = {
  title: 'Loja | MeuDesign',
  description:
    'Explora o catálogo completo de produtos personalizáveis — t-shirts, hoodies, posters, canecas e muito mais. Design único, feito por ti.',
  openGraph: {
    title: 'Loja | MeuDesign',
    description: 'Produtos personalizáveis com design gerado por IA.',
    type: 'website',
  },
};

export default function LojaPage() {
  return (
    <main className="px-4 py-16 min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3">
            O catálogo
          </p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.025em' }}
          >
            Todos os
            <br />
            <span className="text-accent">produtos</span>
          </h1>
        </div>

        <LojaClient />
      </div>
    </main>
  );
}
