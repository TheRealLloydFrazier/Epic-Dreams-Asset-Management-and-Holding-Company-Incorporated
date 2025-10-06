import { Suspense } from 'react';
import { StoreFilters } from '@components/store/StoreFilters';
import { StoreGrid } from '@components/store/StoreGrid';
import { displayClass } from '@lib/utils/fonts';

export const revalidate = 30;

export default function StorePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className={`${displayClass} text-3xl`}>Store</h1>
      <p className="mt-3 text-sm text-white/60">
        Explore signature drops across tees, hoodies, headwear, posters, and accessories.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-[240px,1fr]">
        <StoreFilters />
        <Suspense fallback={<p className="text-white/60">Loading products…</p>}>
          <StoreGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
