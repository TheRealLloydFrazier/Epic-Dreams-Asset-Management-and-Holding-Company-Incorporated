import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@lib/db/prisma';

export const revalidate = 120;

export default async function ReleasePage({ params }: { params: { slug: string } }) {
  const release = await prisma.release.findUnique({
    where: { slug: params.slug },
    include: {
      artist: true
    }
  });
  if (!release) return notFound();

  const merch = await prisma.product.findMany({
    where: {
      artists: {
        some: {
          artistId: release.artistId
        }
      }
    },
    include: { images: true, variants: true }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-[320px,1fr]">
        <div>
          <div className="relative h-96 overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={release.coverImage || '/images/placeholder-release.jpg'}
              alt={release.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <p>Artist: {release.artist.name}</p>
            <p>Release Date: {new Date(release.releaseDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-white">{release.title}</h1>
            <p className="mt-3 text-sm text-white/70">
              Listen to the latest from {release.artist.name}. Stream on your favorite platform and cop the merch drop.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {Object.entries((release.links as Record<string, string>) || {}).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-accent-teal hover:text-white"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Tracklist</h2>
            <ol className="mt-4 space-y-2 text-sm text-white/70">
              {((release.tracks as Array<{ title: string; duration: string }>) || []).map((track, index) => (
                <li key={track.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
                  <span>
                    {index + 1}. {track.title}
                  </span>
                  <span>{track.duration}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Merch</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {merch.map((product) => (
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
