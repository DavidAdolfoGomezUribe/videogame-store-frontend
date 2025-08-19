"use client";
import { createContext, useContext, useState, useCallback } from "react";

const NotifyContext = createContext(null);

export function NotifyProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({ title: "", message: "", actions: null });

  const notify = useCallback((data) => {
    setPayload(data);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <NotifyContext.Provider value={{ notify, close }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={close} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border p-5 shadow-xl" style={{backgroundColor: "rgb(var(--card) / 1)", borderColor: "rgb(var(--border) / 1)"}}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{payload.title || "Notificación"}</h3>
              <button className="btn" onClick={close}>Cerrar</button>
            </div>
            <div className="text-sm">{payload.message}</div>
            {payload.actions ? <div className="mt-4 flex justify-end gap-2">{payload.actions}</div> : null}
          </div>
        </div>
      ) : null}
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used within NotifyProvider");
  return ctx;
}
