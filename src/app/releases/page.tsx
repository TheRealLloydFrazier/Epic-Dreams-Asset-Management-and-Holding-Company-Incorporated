import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@lib/db/prisma';
import { displayClass } from '@lib/utils/fonts';

export const revalidate = 120;

export default async function ReleasesPage() {
  const releases = await prisma.release.findMany({
    include: { artist: true },
    orderBy: { releaseDate: 'desc' }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className={`${displayClass} text-3xl`}>Releases</h1>
      <p className="mt-3 text-sm text-white/60">Dive into the Epic Dreams catalog.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {releases.map((release) => (
          <Link
            key={release.id}
            href={`/releases/${release.slug}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative h-64 w-full">
              <Image
                src={release.coverImage || '/images/placeholder-release.jpg'}
                alt={release.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{release.artist.name}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{release.title}</h2>
              <p className="mt-2 text-sm text-white/60">
                {new Date(release.releaseDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
