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
        <LojaClient />
      </div>
    </main>
  );
}
