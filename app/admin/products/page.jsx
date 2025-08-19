"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiDelete, apiGet } from "@/lib/api";
import { money, normalize } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";

export default function AdminProductsPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
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

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return rows;
    return rows.filter(p => {
      const haystack = normalize([p.name, p.type, p.platform, p.brand, p.sku, p.status].filter(Boolean).join(" "));
      return haystack.includes(nq);
    });
  }, [rows, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Productos</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-80">
            <SearchBar value={q} onChange={setQ} placeholder="Buscar por nombre, SKU, plataforma, marca..." />
          </div>
          <Link href="/admin/products/new" className="btn btn-primary shrink-0">Nuevo producto</Link>
        </div>
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
              {filtered.map(p => (
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
                      "badge " + 
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
              {filtered.length === 0 ? (
                <tr><td colSpan="9" className="text-center text-gray-400 py-6">Sin resultados para “{q}”.</td></tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
