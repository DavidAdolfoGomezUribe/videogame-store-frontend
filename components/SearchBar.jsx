"use client";

export default function SearchBar({ value, onChange, placeholder="Buscar..." }) {
  return (
    <div className="relative">
      <input
        className="input pl-9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
}
