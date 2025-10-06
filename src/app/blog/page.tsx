import Link from 'next/link';
import { prisma } from '@lib/db/prisma';
import { displayClass } from '@lib/utils/fonts';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' }
  });
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className={`${displayClass} text-3xl`}>News</h1>
      <p className="mt-3 text-sm text-white/60">Insights from the Epic Dreams collective.</p>
      <div className="mt-10 space-y-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-accent-teal"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unpublished'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
