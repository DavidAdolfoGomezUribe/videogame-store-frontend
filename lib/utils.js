export const money = (v) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);

export const formatDateTime = (iso) => {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(d);
  } catch {
    return iso;
  }
};

export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const normalize = (s) => (s ?? "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
