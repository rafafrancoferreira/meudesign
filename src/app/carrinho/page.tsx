import type { Metadata } from 'next';
import { CarrinhoPageClient } from '@/components/cart/carrinho-page-client';

export const metadata: Metadata = {
  title: 'Carrinho | MeuDesign',
  description:
    'Revê os produtos no teu carrinho, ajusta quantidades e finaliza a tua encomenda personalizada.',
  robots: { index: false },
};

export default function CarrinhoPage() {
  return <CarrinhoPageClient />;
}
