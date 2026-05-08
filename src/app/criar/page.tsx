import type { Metadata } from 'next';
import { GeneratorLayout } from '@/components/generator/generator-layout';

export const metadata: Metadata = {
  title: 'Criar design | MeuDesign',
  description:
    'Descreve a tua ideia e a IA gera um design único em segundos. Aplica em t-shirts, hoodies, posters, canecas e muito mais.',
};

export default function CriarPage() {
  return <GeneratorLayout />;
}
