'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@lib/hooks/use-cart';
import { formatCurrency } from '@lib/utils/styles';
import type { StoreProduct } from '@lib/types/store';

export function AddToCartForm({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [variantId]);

  const increment = () => {
    if (!selectedVariant) return;
    const maxQty = Math.max(selectedVariant.inventory, 1);
    setQuantity((prev) => Math.min(prev + 1, maxQty));
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const selectedVariant = product.variants.find((variant) => variant.id === variantId);

  const addToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productSlug: product.slug,
      title: product.title,
      variantName: selectedVariant.name,
      priceCents: selectedVariant.priceCents,
      quantity,
      imageUrl: product.images[0]?.url,
      signed: selectedVariant.signed,
      attributes: selectedVariant.attributes as Record<string, unknown>
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Variants</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setVariantId(variant.id)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                variantId === variant.id
                  ? 'border-accent-teal bg-accent-teal/10 text-white'
                  : 'border-white/20 text-white/70 hover:border-accent-teal hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{variant.name}</span>
                <span>{formatCurrency(variant.priceCents)}</span>
              </div>
              <div className="mt-1 text-xs text-white/50">
                {variant.signed && 'Signed edition · '}
                {variant.inventory <= 0 && 'Sold Out'}
                {variant.inventory > 0 && variant.inventory <= 5 && 'Low Stock'}
                {variant.inventory > 5 && 'In Stock'}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-white/20 bg-black/40">
          <button
            className="px-4 py-2 text-lg"
            onClick={decrement}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="px-4 text-sm uppercase tracking-[0.3em]">{quantity}</span>
          <button
            className="px-4 py-2 text-lg"
            onClick={increment}
            aria-label="Increase quantity"
            disabled={!selectedVariant || quantity >= selectedVariant.inventory}
          >
            +
          </button>
        </div>
        <button
          onClick={addToCart}
          disabled={!selectedVariant || selectedVariant.inventory <= 0 || quantity > (selectedVariant?.inventory ?? 0)}
          className="flex-1 rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add to Cart
        </button>
      </div>
      <button
        onClick={addToCart}
        disabled={!selectedVariant || selectedVariant.inventory <= 0}
        className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-accent-teal hover:text-accent-teal disabled:cursor-not-allowed disabled:opacity-60"
      >
        Buy Now
      </button>
      {selectedVariant?.signed && (
        <p className="text-xs uppercase tracking-[0.3em] text-accent-violet">
          Signed variant · {selectedVariant.inventory} remaining
        </p>
      )}
    </div>
  );
}
