"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiDelete, apiGet } from "@/lib/api";
import { money } from "@/lib/utils";

export default function AdminProductsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet("/products");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudo cargar el listado.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await apiDelete(`/products/${id}`);
      await load();
    } catch (e) {
      alert("Error al eliminar");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Productos</h1>
        <Link href="/admin/products/new" className="btn btn-primary">Nuevo producto</Link>
      </div>

      {error ? <div className="text-red-400">{error}</div> : null}

      <div className="card overflow-x-auto">
        {loading ? (
          <div className="animate-pulse h-24" />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>SKU</th>
                <th>Plataforma</th>
                <th>Marca</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p._id}>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.type}</td>
                  <td>{money(p.price)}</td>
                  <td>{p.quantity}</td>
                  <td className="font-mono text-xs">{p.sku}</td>
                  <td>{p.platform}</td>
                  <td>{p.brand}</td>
                  <td>
                    <span className={
                      "px-2 py-1 rounded text-xs " + 
                      (p.status === "active" ? "bg-green-500/20 text-green-300" :
                       p.status === "inactive" ? "bg-yellow-500/20 text-yellow-300" :
                       "bg-red-500/20 text-red-300")
                    }>
                      {p.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/admin/products/${p._id}/edit`} className="btn">Editar</Link>
                      <button className="btn" onClick={() => onDelete(p._id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
