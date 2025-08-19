"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="border-b border-white/10">
      <div className="container-max flex items-center justify-between py-4 gap-4">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          <span className="text-indigo-400">Game</span>Hub
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="btn">Tienda</Link>
          <Link href="/admin/products" className="btn">Admin</Link>
          <Link href="/cart" className="btn relative">
            Carrito
            <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs px-1">
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
