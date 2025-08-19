const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5500/api";

async function handle(res) {
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw Object.assign(new Error("HttpError"), { status: res.status, data });
    return data;
  } catch (e) {
    if (!res.ok) throw Object.assign(new Error("HttpError"), { status: res.status, data: text });
    return null;
  }
}

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  return handle(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handle(res);
}

export async function apiPatch(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handle(res);
}

export async function apiDelete(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE"
  });
  return handle(res);
}
