import type { Metadata } from 'next';
import { EntregasPageClient } from '@/components/legal/entregas-page-client';

export const metadata: Metadata = {
  title: 'Shipping & Returns | MeuDesign',
  description:
    'Information about production times, shipping costs and the returns and exchanges policy at MeuDesign.',
  openGraph: {
    title: 'Shipping & Returns | MeuDesign',
    type: 'website',
  },
};

export default function EntregasDevolucoesPage() {
  return <EntregasPageClient />;
}
