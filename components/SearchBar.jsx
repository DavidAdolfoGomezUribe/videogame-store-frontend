"use client";
import { useEffect, useState } from "react";

export default function SearchBar({ placeholder = "Buscar...", onChange, initial = "" }) {
  const [q, setQ] = useState(initial);
  useEffect(() => { onChange?.(q); }, [q]); // call on mount and updates
  return (
    <div className="flex items-center gap-2">
      <input
        className="input"
        placeholder={placeholder}
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      {q ? <button className="btn" onClick={()=>setQ("")}>Limpiar</button> : null}
    </div>
  );
}
