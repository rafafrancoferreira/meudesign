import type { Metadata } from 'next';
import { ContactosPageClient } from '@/components/contactos-page-client';

export const metadata: Metadata = {
  title: 'Contactos | MeuDesign',
  description:
    'Entra em contacto com a equipa MeuDesign. Estamos disponíveis por email ou redes sociais.',
  openGraph: {
    title: 'Contactos | MeuDesign',
    description: 'Entra em contacto com a equipa MeuDesign.',
    type: 'website',
  },
};

export default function ContactosPage() {
  return <ContactosPageClient />;
}
