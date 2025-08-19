"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGet } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { normalize } from "@/lib/utils";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await apiGet("/products");
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No fue posible cargar los productos.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return products;
    return products.filter(p => {
      const haystack = normalize([p.name, p.type, p.platform, p.brand, p.sku].filter(Boolean).join(" "));
      return haystack.includes(nq);
    });
  }, [products, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Tienda</h1>
        <div className="w-full sm:w-80">
          <SearchBar value={q} onChange={setQ} placeholder="Buscar por nombre, plataforma, marca, SKU..." />
        </div>
      </div>

      {error ? <div className="text-red-400">{error}</div> : null}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p._id} product={p} />)}
          {filtered.length === 0 ? <div className="text-gray-400">No hay resultados para “{q}”.</div> : null}
        </div>
      )}
    </div>
  );
}
