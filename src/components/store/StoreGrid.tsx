import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@lib/db/prisma';
import { formatCurrency } from '@lib/utils/styles';

function parseSearchParams(params: Record<string, string | string[] | undefined>) {
  const get = (key: string) => {
    const value = params[key];
    if (Array.isArray(value)) return value[0];
    return value;
  };
  return {
    category: get('category'),
    size: get('size'),
    color: get('color'),
    sort: get('sort'),
    page: Number(get('page') ?? '1')
  };
}

export async function StoreGrid({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { category, size, color, sort, page } = parseSearchParams(searchParams);
  const take = 12;
  const skip = (page - 1) * take;

  const where: any = {};
  if (category) {
    where.collections = {
      some: {
        collection: {
 
          slug: category
        }
      }
    };
  }
  if (size || color) {
    where.variants = {
      some: {
        AND: [
          ...(size
            ? [
                {
                  attributes: {
                    path: ['size'],
                    equals: size
                  }
                }
              ]
            : []),
          ...(color
            ? [
                {
                  attributes: {
                    path: ['color'],
                    equals: color
                  }
                }
              ]
            : [])
        ]
      }
    };
  }

  const orderBy = (() => {
    switch (sort) {
      case 'price-asc':
        return { variants: { _min: { priceCents: 'asc' } } };
      case 'price-desc':
        return { variants: { _max: { priceCents: 'desc' } } };
      case 'best-selling':
        return { featured: 'desc' as const };
      default:
        return { createdAt: 'desc' as const };
    }
  })();

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      include: { variants: true, images: true },
      orderBy
    }),
    prisma.product.count({ where })
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
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
      {products.length === 0 && <p className="text-sm text-white/60">No products found.</p>}
      {count > take && (
        <div className="flex justify-center gap-4">
          {Array.from({ length: Math.ceil(count / take) }, (_, index) => index + 1).map((p) => (
            <Link
              key={p}
              href={{ pathname: '/store', query: { ...searchParams, page: p } }}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] ${
                p === page ? 'border-accent-teal text-accent-teal' : 'border-white/20 text-white/60 hover:border-accent-teal hover:text-white'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}



