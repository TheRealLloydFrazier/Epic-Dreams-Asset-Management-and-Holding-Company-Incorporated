import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@lib/db/prisma';
import Link from 'next/link';

export const revalidate = 120;

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await prisma.artist.findUnique({
    where: { slug: params.slug },
    include: {
      releases: true,
      products: {
        include: {
          product: { include: { images: true, variants: true } }
        }
      }
    }
  });
  if (!artist) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[320px,1fr]">
        <div className="space-y-6">
          <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={artist.heroImage || '/images/placeholder-artist.jpg'}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">{artist.name}</h1>
            <p className="mt-3 text-sm text-white/70 whitespace-pre-line">{artist.bio}</p>
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-white">Releases</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {artist.releases.map((release) => (
                <Link
                  key={release.id}
                  href={`/releases/${release.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={release.coverImage || '/images/placeholder-release.jpg'}
                      alt={release.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">{release.releaseDate.toDateString()}</p>
                    <p className="mt-2 text-base font-semibold text-white">{release.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Merch</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {artist.products.map(({ product }) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.images[0]?.url || '/images/placeholder-product.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">Merch</p>
                    <p className="mt-2 text-base font-semibold text-white">{product.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
