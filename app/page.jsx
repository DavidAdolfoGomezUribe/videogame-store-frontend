"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGet } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { normalize } from "@/lib/utils";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");

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
    const q = normalize(term);
    if (!q) return products;
    return products.filter(p => {
      const hay = [p.name, p.platform, p.brand, p.sku].map(normalize).join(" ");
      return hay.includes(q);
    });
  }, [products, term]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold">Tienda</h1>
        <SearchBar placeholder="Buscar por nombre, plataforma, marca o SKU..." onChange={setTerm} />
      </div>
      {error ? <div className="text-red-500">{error}</div> : null}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p._id} product={p} />)}
          {filtered.length === 0 ? <div className="text-sm" style={{color:"rgb(var(--muted) / 1)"}}>Sin resultados</div> : null}
        </div>
      )}
    </div>
  );
}
