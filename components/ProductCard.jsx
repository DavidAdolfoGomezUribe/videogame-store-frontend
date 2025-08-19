"use client";

import { money } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotify } from "@/context/NotifyContext";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { notify, close } = useNotify();
  const { name, price, type, platform, brand, quantity, status } = product;
  const disabled = status !== "active" || quantity <= 0;

  function onAdd(){
    add(product, 1);
    notify({
      title: "Artículo añadido",
      message: `Se agregó “${name}” al carrito.`,
      actions: (
        <>
          <button className="btn" onClick={close}>Seguir comprando</button>
          <Link href="/cart" className="btn btn-primary" onClick={close}>Ver carrito</Link>
        </>
      )
    });
  }

  return (
    <div className="card flex flex-col">
      <div className="flex-1">
        <div className="text-sm" style={{color:"rgb(var(--muted) / 1)"}}>{type === "console" ? "Consola" : "Juego"}</div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2 text-sm" style={{color:"rgb(var(--muted) / 1)"}}>
          {platform ? <span className="mr-2">Plataforma: {platform}</span> : null}
          {brand ? <span>Marca: {brand}</span> : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xl font-bold">{money(price)}</div>
        <button
          className="btn btn-primary"
          disabled={disabled}
          onClick={onAdd}
          title={disabled ? "Sin stock o inactivo" : "Agregar al carrito"}
        >
          {disabled ? "No disponible" : "Agregar"}
        </button>
      </div>
      <div className="mt-2 text-xs" style={{color:"rgb(var(--muted) / 1)"}}>Stock: {quantity}</div>
    </div>
  );
}
