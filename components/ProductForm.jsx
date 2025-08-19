"use client";

import { useState } from "react";
import { apiPatch, apiPost } from "@/lib/api";

const STATUS = ["active", "inactive", "discontinued"];
const TYPES = ["game", "console"];

export default function ProductForm({ initial, mode = "create", onSuccess }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    type: initial?.type || "game",
    price: initial?.price ?? 0,
    quantity: initial?.quantity ?? 0,
    sku: initial?.sku || "",
    platform: initial?.platform || "",
    brand: initial?.brand || "",
    status: initial?.status || "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "create") {
        await apiPost("/products", {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
      } else {
        await apiPatch(`/products/${initial._id}`, {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
      }
      onSuccess?.();
    } catch (err) {
      const msg = err?.data?.message || err?.data || "Error al guardar";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? <div className="text-red-400 text-sm">{error}</div> : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input className="input" value={form.name} onChange={e=>set("name", e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Tipo</label>
          <select className="select" value={form.type} onChange={e=>set("type", e.target.value)} required>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Precio</label>
          <input type="number" min="0" className="input" value={form.price} onChange={e=>set("price", e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Cantidad</label>
          <input type="number" min="0" className="input" value={form.quantity} onChange={e=>set("quantity", e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm mb-1">SKU</label>
          <input className="input" value={form.sku} onChange={e=>set("sku", e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Plataforma</label>
          <input className="input" value={form.platform} onChange={e=>set("platform", e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm mb-1">Marca</label>
          <input className="input" value={form.brand} onChange={e=>set("brand", e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Estado</label>
          <select className="select" value={form.status} onChange={e=>set("status", e.target.value)} required>
            {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : (mode === "create" ? "Crear producto" : "Guardar cambios")}
        </button>
      </div>
    </form>
  );
}
