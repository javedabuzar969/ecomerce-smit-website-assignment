import { useState, useEffect } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

let _items: CartItem[] = [];
let _listeners: (() => void)[] = [];

const notify = () => _listeners.forEach((fn) => fn());

export const cartStore = {
  getItems: () => _items,
  getCount: () => _items.reduce((s, i) => s + i.qty, 0),
  getTotal: () => _items.reduce((s, i) => s + i.product.price * i.qty, 0),
  add: (product: Product, qty = 1) => {
    const existing = _items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.qty += qty;
      _items = [..._items];
    } else {
      _items = [..._items, { product, qty }];
    }
    notify();
  },
  remove: (id: number) => {
    _items = _items.filter((i) => i.product.id !== id);
    notify();
  },
  updateQty: (id: number, qty: number) => {
    if (qty <= 0) { cartStore.remove(id); return; }
    _items = _items.map((i) => (i.product.id === id ? { ...i, qty } : i));
    notify();
  },
  subscribe: (fn: () => void) => {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },
};

export function useCart() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return cartStore.subscribe(() => forceUpdate((n) => n + 1));
  }, []);

  return {
    items: cartStore.getItems(),
    count: cartStore.getCount(),
    total: cartStore.getTotal(),
    add: cartStore.add,
    remove: cartStore.remove,
    updateQty: cartStore.updateQty,
  };
}
