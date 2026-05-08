import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { LiveDemo } from '@/components/home/live-demo';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CommunityGallery } from '@/components/home/community-gallery';
import { BlogTeaser } from '@/components/home/blog-teaser';
import { FinalCta } from '@/components/home/final-cta';

export const metadata: Metadata = {
  title: 'MeuDesign — Design inteligente, feito por si.',
  description:
    'Descreve a tua ideia e a IA gera um design único em segundos. Personaliza t-shirts, hoodies, posters, canecas e muito mais.',
  openGraph: {
    title: 'MeuDesign — Design inteligente, feito por si.',
    description:
      'Descreve a tua ideia e a IA gera um design único em segundos.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <LiveDemo />
      <FeaturedProducts />
      <CommunityGallery />
      <BlogTeaser />
      <FinalCta />
    </main>
  );
}
