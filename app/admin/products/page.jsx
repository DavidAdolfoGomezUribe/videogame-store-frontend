"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiDelete, apiGet } from "@/lib/api";
import { money, normalize } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import { useNotify } from "@/context/NotifyContext";

export default function AdminProductsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  const { notify } = useNotify();

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

  async function onDelete(id, name) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await apiDelete(`/products/${id}`);
      notify({ title: "Producto eliminado", message: `Se eliminó “${name}”.` });
      await load();
    } catch (e) {
      alert("Error al eliminar");
    }
  }

  const filtered = useMemo(() => {
    const q = normalize(term);
    if (!q) return rows;
    return rows.filter(p => [p.name, p.platform, p.brand, p.sku].map(normalize).join(" ").includes(q));
  }, [rows, term]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold">Productos</h1>
        <div className="flex items-center gap-2">
          <SearchBar placeholder="Buscar productos..." onChange={setTerm} />
          <Link href="/admin/products/new" className="btn btn-primary">Nuevo</Link>
        </div>
      </div>

      {error ? <div className="text-red-500">{error}</div> : null}

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
                    <span className={"px-2 py-1 rounded text-xs " + 
                      (p.status === "active" ? "bg-green-500/20 text-green-700 dark:text-green-300" :
                       p.status === "inactive" ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300" :
                       "bg-red-500/20 text-red-700 dark:text-red-300")}>
                      {p.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/admin/products/${p._id}/edit`} className="btn">Editar</Link>
                      <button className="btn" onClick={() => onDelete(p._id, p.name)}>Eliminar</button>
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
