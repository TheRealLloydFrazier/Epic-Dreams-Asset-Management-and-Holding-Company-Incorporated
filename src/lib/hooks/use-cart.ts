'use client';

import { useEffect, useMemo, useState } from 'react';
import { CartItem } from '@lib/types';
import { cartStorage } from '@lib/utils/cart-storage';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | undefined>();

  useEffect(() => {
    const initial = cartStorage.load();
    setItems(initial.items);
    setDiscountCode(initial.discountCode);
    const unsubscribe = cartStorage.subscribe((cart) => {
      setItems(cart.items);
      setDiscountCode(cart.discountCode);
    });
    return unsubscribe;
  }, []);

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0),
    [items]
  );

  return {
    items,
    cartCount,
    subtotalCents,
    discountCode,
    addItem: cartStorage.add,
    updateItem: cartStorage.update,
    removeItem: cartStorage.remove,
    clear: cartStorage.clear,
    setDiscount: cartStorage.setDiscount
  };
}
