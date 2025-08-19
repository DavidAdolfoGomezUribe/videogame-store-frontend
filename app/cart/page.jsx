"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { money } from "@/lib/utils";
import { apiPost } from "@/lib/api";
import Modal from "@/components/Modal";
import { useNotify } from "@/context/NotifyContext";

export default function CartPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const [customerId, setCustomerId] = useState("000000000000000000000000"); // válido como invitado
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const { notify } = useNotify();

  async function checkout(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        customerId,
        paymentMethod,
        items: items.map(i => ({ productId: i.product._id, quantity: i.quantity })),
      };
      const sale = await apiPost("/sales", payload);
      setSuccess(sale);
      clear();
    } catch (err) {
      const msg = err?.data?.message || err?.data || "No se pudo completar la compra.";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  function onChangeQty(p, q){
    setQty(p._id, Math.max(1, Number(q || 1)));
    notify({ title: "Cantidad actualizada", message: `Nueva cantidad de “${p.name}”.` });
  }

  function onRemove(p){
    remove(p._id);
    notify({ title: "Artículo removido", message: `Se quitó “${p.name}” del carrito.` });
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold">Carrito</h1>

      {items.length === 0 ? (
        <div className="card">Tu carrito está vacío.</div>
      ) : (
        <div className="space-y-4">
          <div className="card overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="w-28">Cantidad</th>
                  <th className="text-right">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ product, quantity }) => (
                  <tr key={product._id}>
                    <td className="align-top">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs" style={{color:"rgb(var(--muted) / 1)"}}>{product.type} • {product.platform || product.brand}</div>
                      <div className="text-xs" style={{color:"rgb(var(--muted) / 1)"}}>Precio: {money(product.price)}</div>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={e => onChangeQty(product, e.target.value)}
                        className="input w-24"
                      />
                    </td>
                    <td className="text-right font-semibold">{money(product.price * quantity)}</td>
                    <td className="text-right">
                      <button className="btn" onClick={() => onRemove(product)}>Quitar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form onSubmit={checkout} className="card space-y-4">
            {error ? <div className="text-red-500 text-sm">{error}</div> : null}
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Total</div>
              <div className="text-2xl font-bold">{money(total)}</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Customer ID (Mongo ObjectId)</label>
                <input className="input" value={customerId} onChange={e=>setCustomerId(e.target.value)} required />
                <p className="text-xs" style={{color:"rgb(var(--muted) / 1)"}}>
                  Puedes usar el valor por defecto si no manejas clientes.
                </p>
              </div>

              <div>
                <label className="block text-sm mb-1">Método de pago</label>
                <select className="select" value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}>
                  <option value="cash">Efectivo</option>
                  <option value="card">Tarjeta</option>
                  <option value="transfer">Transferencia</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Procesando..." : "Finalizar compra"}
              </button>
            </div>
          </form>
        </div>
      )}

      <Modal
        open={!!success}
        onClose={() => setSuccess(null)}
        title="¡Compra exitosa!"
        actions={<button className="btn btn-primary" onClick={() => setSuccess(null)}>Aceptar</button>}
      >
        <p>Tu compra se ha procesado correctamente.</p>
        {success?._id ? <p className="text-sm" style={{color:"rgb(var(--muted) / 1)"}}>ID de venta: <span className="font-mono">{String(success._id)}</span></p> : null}
      </Modal>
    </div>
  );
}
