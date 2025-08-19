export const money = (v) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);

export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
