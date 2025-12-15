import { prisma } from '@lib/db/prisma';
import { formatCurrency } from '@lib/utils/styles';
import Link from 'next/link';
import Image from 'next/image';
import { EmailCapture } from '@components/store/EmailCapture';
import { displayClass } from '@lib/utils/fonts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [featuredProducts, latestRelease, posts] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      include: { images: true, variants: true },
      take: 6,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.release.findFirst({
      include: { artist: true },
      orderBy: { releaseDate: 'desc' }
    }),
    prisma.post.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 2
    }).catch(() => [])
  ]);

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-black via-black to-accent-violet/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 md:flex-row md:items-center">
          <div className="max-w-2xl space-y-6">
            <p className={`${displayClass} text-xs uppercase tracking-[0.6em] text-accent-teal/80`}>Epic Dreams Entertainment</p>
            <h1 className={`${displayClass} text-4xl font-semibold tracking-tight md:text-6xl`}>
              Official Merch. Limited Drops. Signed Editions.
            </h1>
            <p className="text-lg text-white/70">
              Gear up with bold silhouettes and exclusive releases from Kelly Layton and the Epic Dreams roster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/store"
                className="rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black"
              >
                Shop Now
              </Link>
              <Link
                href="/releases/empty-chair-blues"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white hover:border-accent-teal"
              >
                View Release
              </Link>
            </div>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:h-96">
            <Image
              src={
                latestRelease?.coverImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
              }
              alt={latestRelease?.title || 'Epic Dreams release'}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">Spotlight</p>
              <p className="text-lg font-semibold text-white">{latestRelease?.title ?? 'Empty Chair Blues'}</p>
              <p className="text-sm text-white/70">{latestRelease?.artist?.name ?? 'Kelly Layton'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <h2 className={`${displayClass} text-2xl`}>Featured</h2>
          <Link href="/store" className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white">
            View All
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={product.images[0]?.url || '/images/placeholder-product.jpg'}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.variants.some((variant) => variant.signed) && (
                  <span className="absolute left-4 top-4 rounded-full bg-accent-violet px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Signed
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Merch</p>
                <p className="mt-3 text-lg font-semibold text-white">{product.title}</p>
                <p className="mt-2 text-sm text-white/70">
                  {formatCurrency(product.variants[0]?.priceCents ?? 0)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 px-4 py-16 text-center">
        <h2 className={`${displayClass} text-3xl`}>Stay in the Dream Loop</h2>
        <p className="mt-4 text-white/70">
          Join the Epic Dreams list for new drops, early access to signed variants, and behind-the-scenes stories.
        </p>
        <div className="mt-8 flex justify-center">
          <EmailCapture />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <h2 className={`${displayClass} text-2xl`}>From the Blog</h2>
          <Link href="/blog" className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white">
            View All
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-accent-teal">News</p>
              <h3 className={`${displayClass} mt-4 text-2xl group-hover:text-white`}>{post.title}</h3>
              <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.3em] text-white/50">
                Read More →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
