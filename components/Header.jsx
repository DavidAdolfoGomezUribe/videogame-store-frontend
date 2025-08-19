"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="border-b" style={{borderColor: "rgb(var(--border) / 1)"}}>
      <div className="container-max flex items-center justify-between py-4 gap-4">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          <span style={{color:"rgb(var(--primary) / 1)"}}>Game</span>Hub
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="btn">Tienda</Link>
          <Link href="/admin/products" className="btn">Admin · Productos</Link>
          <Link href="/admin/sales" className="btn">Admin · Ventas</Link>
          <Link href="/cart" className="btn relative">
            Carrito
            <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full text-white text-xs px-1" style={{backgroundColor:"rgb(var(--primary) / 1)"}}>
              {count}
            </span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
