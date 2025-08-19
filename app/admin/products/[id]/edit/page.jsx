"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiGet } from "@/lib/api";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        // No hay GET /products/:id, traemos todos y filtramos
        const data = await apiGet("/products");
        const found = Array.isArray(data) ? data.find(p => p._id === id) : null;
        if (!found) setError("Producto no encontrado.");
        setProduct(found || null);
      } catch (e) {
        setError("No fue posible cargar el producto.");
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading) return <div className="animate-pulse h-24 card" />;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!product) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold">Editar producto</h1>
      <div className="card">
        <ProductForm
          initial={product}
          mode="edit"
          onSuccess={() => router.push("/admin/products")}
        />
      </div>
    </div>
  );
}
