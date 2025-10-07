'use client';

import { Cart, CartItem } from '@lib/types';

const STORAGE_KEY = 'epic-dreams-cart';

type Listener = (cart: Cart) => void;

class CartStorage {
  private listeners = new Set<Listener>();

  load(): Cart {
    if (typeof window === 'undefined') return { items: [] };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { items: [] };
      return JSON.parse(raw) as Cart;
    } catch (error) {
      console.warn('Failed to load cart from storage', error);
      return { items: [] };
    }
  }

  async save(cart: Cart) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    try {
      await fetch('/api/cart/persist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
      });
    } catch (error) {
      console.warn('Failed to persist cart', error);
    }
    this.listeners.forEach((listener) => listener(cart));
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  add = (item: CartItem) => {
    const cart = this.load();
    const existing = cart.items.find((i) => i.variantId === item.variantId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    void this.save(cart);
  };

  update = (variantId: number, quantity: number) => {
    const cart = this.load();
    cart.items = cart.items.map((item) =>
      item.variantId === variantId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    void this.save(cart);
  };

  remove = (variantId: number) => {
    const cart = this.load();
    cart.items = cart.items.filter((item) => item.variantId !== variantId);
    void this.save(cart);
  };

  setDiscount = (code: string | undefined) => {
    const cart = this.load();
    cart.discountCode = code || undefined;
    void this.save(cart);
  };

  clear = () => {
    void this.save({ items: [] });
  };
}

export const cartStorage = new CartStorage();
