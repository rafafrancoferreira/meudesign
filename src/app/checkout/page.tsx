import type { Metadata } from 'next';
import { CheckoutPageClient } from '@/components/checkout/checkout-page-client';

export const metadata: Metadata = {
  title: 'Checkout | MeuDesign',
  description:
    'Finaliza a tua encomenda MeuDesign. Versão de demonstração — nenhum pagamento será processado.',
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
