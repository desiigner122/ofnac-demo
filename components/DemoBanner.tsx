"use client";
import { useState } from "react";
import { X, Info } from "lucide-react";

export function DemoBanner() {
  const [open, setOpen] = useState(true);
  const [showCreds, setShowCreds] = useState(false);
  if (!open) return null;
  return (
    <div className="bg-ofnac-green-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Info size={16} className="text-ofnac-gold flex-shrink-0" />
          <span>
            <strong className="font-semibold">Démo de la Plateforme Intégrité Numérique</strong>
            <span className="hidden sm:inline text-white/70"> — Maquette interactive à destination de la Direction de l'OFNAC.</span>
          </span>
          <button
            onClick={() => setShowCreds(!showCreds)}
            className="text-ofnac-gold hover:underline text-xs font-medium whitespace-nowrap"
          >
            {showCreds ? "Masquer" : "Voir les identifiants de démo"}
          </button>
        </div>
        <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white" aria-label="Fermer">
          <X size={16} />
        </button>
      </div>
      {showCreds && (
        <div className="bg-ofnac-green-800 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 rounded p-3">
              <div className="text-ofnac-gold font-semibold mb-1">Espace agent OFNAC</div>
              <div className="font-mono">agent@ofnac.sn</div>
              <div className="font-mono text-white/70">demo2026</div>
            </div>
            <div className="bg-white/5 rounded p-3">
              <div className="text-ofnac-gold font-semibold mb-1">Espace assujetti DDP</div>
              <div className="font-mono">assujetti@demo.sn</div>
              <div className="font-mono text-white/70">OTP : 123456</div>
            </div>
            <div className="bg-white/5 rounded p-3">
              <div className="text-ofnac-gold font-semibold mb-1">Citoyen / signalement</div>
              <div>Anonyme — aucun login</div>
              <div className="text-white/70">Suivi via code généré</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
