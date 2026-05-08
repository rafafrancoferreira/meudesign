import type { Metadata } from 'next';
import { SucessoPageClient } from '@/components/checkout/sucesso-page-client';

export const metadata: Metadata = {
  title: 'Encomenda confirmada | MeuDesign',
  description: 'A tua encomenda MeuDesign foi confirmada. Obrigado pela tua compra!',
  robots: { index: false },
};

export default function SucessoPage() {
  return <SucessoPageClient />;
}
