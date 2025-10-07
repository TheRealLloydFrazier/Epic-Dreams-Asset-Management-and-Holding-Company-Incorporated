import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@lib/db/prisma';
import { displayClass } from '@lib/utils/fonts';

export const revalidate = 120;

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    orderBy: { name: 'asc' }
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className={`${displayClass} text-3xl`}>Artists</h1>
      <p className="mt-3 text-sm text-white/60">Meet the Epic Dreams roster and explore their drops.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {artists.map((artist) => (
          <Link key={artist.id} href={`/artist/${artist.slug}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative h-72 w-full overflow-hidden">
              <Image
                src={artist.heroImage || '/images/placeholder-artist.jpg'}
                alt={artist.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white">{artist.name}</h2>
              <p className="mt-2 text-sm text-white/70">{artist.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
