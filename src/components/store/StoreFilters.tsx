'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const categories = ['tees', 'hoodies', 'hats', 'posters', 'stickers', 'signed'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Teal', 'Violet'];
const sorts = [
  { value: 'newest', label: 'Newest' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' }
];

export function StoreFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const updateParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`);
    });
  };

  return (
    <aside className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Category</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                updateParam('category', params.get('category') === category ? undefined : category)
              }
              className={`rounded-full border px-4 py-2 uppercase tracking-[0.2em] transition ${
                params.get('category') === category
                  ? 'border-accent-teal text-accent-teal'
                  : 'border-white/20 hover:border-accent-teal hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Size</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => updateParam('size', params.get('size') === size ? undefined : size)}
              className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.3em] transition ${
                params.get('size') === size
                  ? 'border-accent-teal text-accent-teal'
                  : 'border-white/20 hover:border-accent-teal hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Color</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => updateParam('color', params.get('color') === color ? undefined : color)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                params.get('color') === color
                  ? 'border-accent-teal text-accent-teal'
                  : 'border-white/20 hover:border-accent-teal hover:text-white'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Sort</p>
        <div className="mt-4 flex flex-col gap-2">
          {sorts.map((option) => (
            <button
              key={option.value}
              onClick={() => updateParam('sort', option.value)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                params.get('sort') === option.value
                  ? 'border-accent-teal text-accent-teal'
                  : 'border-white/20 hover:border-accent-teal hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={() => router.replace(pathname)}
          className="w-full rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-accent-teal hover:text-white"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
