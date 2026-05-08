import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/products';
import { ProductDetail } from '@/components/product/product-detail';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Produto não encontrado | MeuDesign' };

  return {
    title: `${product.name} | MeuDesign`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | MeuDesign`,
      description: product.description.slice(0, 160),
      type: 'website',
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}
