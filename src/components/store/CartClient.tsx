'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@lib/hooks/use-cart';
import { formatCurrency } from '@lib/utils/styles';
import { useEffect, useState } from 'react';

export function CartClient({
  success,
  cancel,
  discountCode: initialDiscount
}: {
  success?: boolean;
  cancel?: boolean;
  discountCode?: string;
}) {
  const { items, subtotalCents, updateItem, removeItem, clear, discountCode: storedDiscount, setDiscount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState(initialDiscount || storedDiscount || '');

  // Clear cart on successful checkout
  useEffect(() => {
    if (success) {
      clear();
    }
  }, [success, clear]);

  useEffect(() => {
    if (initialDiscount && initialDiscount !== discountCode) {
      setDiscountCode(initialDiscount);
    }
  }, [initialDiscount, discountCode]);

  useEffect(() => {
    if (!initialDiscount && storedDiscount && !discountCode) {
      setDiscountCode(storedDiscount);
    }
  }, [storedDiscount, discountCode, initialDiscount]);

  useEffect(() => {
    setDiscount(discountCode ? discountCode : undefined);
  }, [discountCode, setDiscount]);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
          discount: discountCode || undefined
        })
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.outOfStockItems) {
          setError(`Out of stock: ${data.outOfStockItems.join(', ')}`);
        } else {
          setError(data.error || 'Checkout failed. Please try again.');
        }
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {success && (
        <div className="rounded-3xl border border-accent-teal/60 bg-accent-teal/10 p-4 text-sm text-accent-teal">
          Payment complete! Check your email for order confirmation.
        </div>
      )}
      {cancel && (
        <div className="rounded-3xl border border-red-400/60 bg-red-500/10 p-4 text-sm text-red-300">
          Checkout canceled. Your cart is ready when you are.
        </div>
      )}
      {error && (
        <div className="rounded-3xl border border-red-400/60 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Your Cart</h1>
        <button onClick={clear} className="text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white">
          Clear Cart
        </button>
      </div>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4"
      >
        <input
          value={discountCode}
          onChange={(event) => setDiscountCode(event.target.value.toUpperCase())}
          placeholder="Discount code"
          className="min-w-[160px] flex-1 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white focus:border-accent-teal focus:outline-none"
        />
        <p className="text-xs text-white/50">Discounts apply automatically at checkout.</p>
      </form>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-white/60">Your cart is empty.</p>}
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:flex-row"
          >
            {item.imageUrl && (
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-white/10">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/product/${item.productSlug}`} className="text-lg font-semibold text-white">
                    {item.title}
                  </Link>
                  <p className="text-sm text-white/60">{item.variantName}</p>
                  {item.signed && (
                    <p className="text-xs uppercase tracking-[0.3em] text-accent-violet">Signed Variant</p>
                  )}
                </div>
                <p className="text-sm text-white/70">{formatCurrency(item.priceCents)}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center rounded-full border border-white/20 bg-black/40">
                  <button
                    className="px-4 py-2 text-lg"
                    onClick={() => updateItem(item.variantId, Math.max(1, item.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="px-4 text-sm uppercase tracking-[0.3em]">{item.quantity}</span>
                  <button className="px-4 py-2 text-lg" onClick={() => updateItem(item.variantId, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between text-sm text-white/70">
            <p>Subtotal</p>
            <p>{formatCurrency(subtotalCents)}</p>
          </div>
          <p className="mt-2 text-xs text-white/50">Shipping and taxes calculated at checkout.</p>
          <button
            onClick={checkout}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Processing…' : 'Checkout'}
          </button>
          <p className="mt-6 text-xs text-white/50">
            Test Cards (Stripe): 4242 4242 4242 4242 · Any future date · Any CVC
          </p>
        </div>
      )}
    </div>
  );
}
