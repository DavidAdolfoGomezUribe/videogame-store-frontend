"use client";

import { money } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { name, price, type, platform, brand, quantity, status } = product;
  const disabled = status !== "active" || quantity <= 0;

  return (
    <div className="card flex flex-col">
      <div className="flex-1">
        <div className="text-sm text-gray-300 mb-2">{type === "console" ? "Consola" : "Juego"}</div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2 text-gray-300 text-sm">
          {platform ? <span className="mr-2">Plataforma: {platform}</span> : null}
          {brand ? <span>Marca: {brand}</span> : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xl font-bold">{money(price)}</div>
        <button
          className="btn btn-primary"
          disabled={disabled}
          onClick={() => add(product, 1)}
          title={disabled ? "Sin stock o inactivo" : "Agregar al carrito"}
        >
          {disabled ? "No disponible" : "Agregar"}
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-400">Stock: {quantity}</div>
    </div>
  );
}
