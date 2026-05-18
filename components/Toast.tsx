"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, X, AlertCircle, Info } from "lucide-react";

type Toast = { id: number; type: "success" | "error" | "info"; message: string };
const ToastCtx = createContext<{ show: (msg: string, type?: Toast["type"]) => void }>({ show: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter(t => t.id !== id)), 4000);
  }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-start gap-3 p-4 rounded-lg shadow-2xl border animate-in slide-in-from-right ${
            t.type === "success" ? "bg-white border-ofnac-green-700" :
            t.type === "error" ? "bg-white border-red-500" :
            "bg-white border-ofnac-line"
          }`}>
            <div className={`flex-shrink-0 ${
              t.type === "success" ? "text-ofnac-green-700" :
              t.type === "error" ? "text-red-600" :
              "text-ofnac-ink-soft"
            }`}>
              {t.type === "success" ? <CheckCircle2 size={18} /> : t.type === "error" ? <AlertCircle size={18} /> : <Info size={18} />}
            </div>
            <div className="flex-1 text-sm text-ofnac-ink leading-snug">{t.message}</div>
            <button
              onClick={() => setToasts((prev) => prev.filter(x => x.id !== t.id))}
              className="text-ofnac-gray hover:text-ofnac-ink flex-shrink-0"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
