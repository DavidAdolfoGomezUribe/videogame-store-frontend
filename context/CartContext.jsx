"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload || state;
    case "ADD": {
      const { product, qty } = action.payload;
      const existing = state.items.find(i => i.product._id === product._id);
      let items;
      if (existing) {
        items = state.items.map(i => i.product._id === product._id ? { ...i, quantity: i.quantity + qty } : i);
      } else {
        items = [...state.items, { product, quantity: qty }];
      }
      return { ...state, items };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.product._id !== action.payload) };
    case "SET_QTY": {
      const { productId, qty } = action.payload;
      return { ...state, items: state.items.map(i => i.product._id === productId ? { ...i, quantity: qty } : i) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => {
    const count = state.items.reduce((a, b) => a + b.quantity, 0);
    const total = state.items.reduce((a, b) => a + b.quantity * b.product.price, 0);
    return {
      items: state.items,
      count,
      total,
      add: (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } }),
      remove: (productId) => dispatch({ type: "REMOVE", payload: productId }),
      setQty: (productId, qty) => dispatch({ type: "SET_QTY", payload: { productId, qty } }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
