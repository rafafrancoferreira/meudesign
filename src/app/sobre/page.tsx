import type { Metadata } from 'next';
import { SobrePageClient } from '@/components/sobre-page-client';

export const metadata: Metadata = {
  title: 'Sobre | MeuDesign',
  description:
    'Conhece a equipa por trás do MeuDesign — três estudantes do ISAG com uma missão: democratizar o design com inteligência artificial.',
  openGraph: {
    title: 'Sobre o MeuDesign',
    description: 'A história, a missão e a equipa do MeuDesign.',
    type: 'website',
  },
};

export default function SobrePage() {
  return <SobrePageClient />;
}
