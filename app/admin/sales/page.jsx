"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGet } from "@/lib/api";
import { formatDate, money, normalize } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";

export default function AdminSalesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    async function load(){
      setLoading(true);
      setError("");
      try {
        const data = await apiGet("/sales");
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setError("No se pudieron cargar las ventas.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(term);
    if (!q) return rows;
    return rows.filter(s => {
      const items = (s.items || []).map(it => `${it.name} ${it.type}`).join(" ");
      const hay = [s._id, s.paymentMethod, s.customerId, items].map(x => normalize(String(x || ""))).join(" ");
      return hay.includes(q);
    });
  }, [rows, term]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold">Ventas</h1>
        <SearchBar placeholder="Buscar por ID, producto, cliente o método..." onChange={setTerm} />
      </div>

      {error ? <div className="text-red-500">{error}</div> : null}

      <div className="card overflow-x-auto">
        {loading ? <div className="animate-pulse h-24" /> : (
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>ID</th>
                <th>Método</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td>{formatDate(s.datetime || s.createdAt)}</td>
                  <td className="font-mono text-xs">{s._id}</td>
                  <td>{s.paymentMethod}</td>
                  <td className="font-semibold">{money(s.total)}</td>
                  <td className="text-sm">
                    <ul className="list-disc pl-5">
                      {s.items?.map((it, idx) => (
                        <li key={idx}>{it.name} × {it.quantity} ({money(it.unitPrice)})</li>
                      ))}
                    </ul>
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
