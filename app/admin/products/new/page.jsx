"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold">Nuevo producto</h1>
      <div className="card">
        <ProductForm
          mode="create"
          onSuccess={() => router.push("/admin/products")}
        />
      </div>
    </div>
  );
}
