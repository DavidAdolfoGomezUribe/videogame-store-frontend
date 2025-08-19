export const money = (v) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);

export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export function normalize(s){
  return (s ?? "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
}

export function formatDate(iso){
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("es-CO", { dateStyle:"medium", timeStyle:"short"}).format(d);
  } catch { return iso; }
}
