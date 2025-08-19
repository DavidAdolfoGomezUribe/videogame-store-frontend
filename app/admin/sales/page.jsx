"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGet } from "@/lib/api";
import { formatDateTime, money, normalize } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";

function itemsSummary(items) {
  if (!Array.isArray(items) || items.length === 0) return "-";
  const names = items.map(i => `${i.name} ×${i.quantity}`);
  if (names.length <= 3) return names.join(", ");
  return names.slice(0, 3).join(", ") + ` +${names.length - 3} más`;
}

export default function AdminSalesPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet("/sales");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudo cargar el listado de ventas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return rows;
    return rows.filter(s => {
      const itemNames = (s.items || []).map(i => i.name).join(" ");
      const haystack = normalize([
        s._id, s.paymentMethod, s.status, s.customerId, itemNames
      ].filter(Boolean).join(" "));
      return haystack.includes(nq);
    });
  }, [rows, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Ventas</h1>
        <div className="w-full sm:w-96">
          <SearchBar value={q} onChange={setQ} placeholder="Buscar por ID, producto, cliente, método..." />
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
                <th>Fecha</th>
                <th>Método</th>
                <th className="text-right">Total</th>
                <th>Items</th>
                <th>ID Venta</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td>{formatDateTime(s.datetime || s.createdAt)}</td>
                  <td><span className="badge bg-white/10">{s.paymentMethod}</span></td>
                  <td className="text-right font-semibold">{money(s.total)}</td>
                  <td className="max-w-[420px] truncate">{itemsSummary(s.items)}</td>
                  <td className="font-mono text-xs">{s._id}</td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-gray-400 py-6">Sin resultados para “{q}”.</td></tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
