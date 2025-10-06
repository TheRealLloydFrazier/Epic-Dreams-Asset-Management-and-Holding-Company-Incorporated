import { notFound } from 'next/navigation';
import { prisma } from '@lib/db/prisma';
import { displayClass } from '@lib/utils/fonts';
import type { Metadata } from 'next';
import { marked } from 'marked';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.heroImage ? [{ url: post.heroImage }] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return notFound();

  const html = marked.parse(post.content ?? '');

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unpublished'}
      </p>
      <h1 className={`${displayClass} mt-3 text-4xl`}>{post.title}</h1>
      <div className="prose prose-invert mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
