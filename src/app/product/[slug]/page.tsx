import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@lib/db/prisma';
import { AddToCartForm } from '@components/store/AddToCartForm';
import { RelatedProducts } from '@components/store/RelatedProducts';
import type { Metadata } from 'next';
import type { StoreProduct } from '@lib/types/store';
import { Prisma } from '@prisma/client';

function jsonToRecord(value: Prisma.JsonValue | null | undefined): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, variants: true }
  });
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map((image) => ({ url: image.url }))
    }
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const productFromDb = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, variants: true, collections: { include: { collection: true } } }
  });
  if (!productFromDb) return notFound();

  const product: StoreProduct = {
    ...productFromDb,
    variants: productFromDb.variants.map((v) => ({
      ...v,
      attributes: jsonToRecord(v.attributes)
    }))
  };

  const related = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      collections: {
        some: {
          collectionId: {
            in: productFromDb.collections.map((c) => c.collectionId)
          }
        }
      }
    },
    include: { images: true, variants: true },
    take: 4
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <Image
              src={product.images[0]?.url || '/images/placeholder-product.jpg'}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.slice(0, 4).map((image) => (
              <div key={image.id} className="relative h-28 overflow-hidden rounded-xl border border-white/10">
                <Image src={image.url} alt={product.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-accent-teal">Epic Dreams Merch</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{product.title}</h1>
          <p className="mt-3 text-sm text-white/70">{product.description}</p>
          <AddToCartForm product={product} />
          <div className="mt-8 space-y-4 text-sm text-white/70">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/60">Details</h2>
              <p className="mt-2">Premium materials, eco-friendly inks, and ethically sourced garments.</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/60">Size Guide</h2>
              <p className="mt-2">Regular fit. For oversized feel, size up. Refer to our full size guide in the footer.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <RelatedProducts products={related} />
      </div>
    </div>
  );
}
