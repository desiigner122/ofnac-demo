"use client";

import { useState } from "react";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { useToast } from "@/components/Toast";
import { Search, AlertCircle, CheckCircle2, Clock, FileSignature } from "lucide-react";

type Decl = {
  id: string;
  name: string;
  position: string;
  millesime: string;
  status: "Validée" | "À contrôler" | "Hors délai" | "Anomalie détectée";
  receivedAt: string;
  variation?: string;
};

const DECLARATIONS: Decl[] = [
  { id: "DDP-2026-0341", name: "M. Abdou Diallo",     position: "Directeur Général — Société nationale", millesime: "2026", status: "À contrôler",         receivedAt: "2026-05-15" },
  { id: "DDP-2026-0340", name: "Mme Fatou Sow",        position: "Directrice de cabinet",                   millesime: "2026", status: "Validée",             receivedAt: "2026-05-14" },
  { id: "DDP-2026-0339", name: "M. Mamadou Ba",        position: "Inspecteur général d'État",               millesime: "2026", status: "Anomalie détectée",   receivedAt: "2026-05-12", variation: "+182 % en 1 an" },
  { id: "DDP-2026-0338", name: "Mme Aïssatou Ndiaye",  position: "Magistrate",                              millesime: "2026", status: "Validée",             receivedAt: "2026-05-11" },
  { id: "DDP-2026-0337", name: "M. Ousmane Faye",      position: "Préfet de département",                   millesime: "2026", status: "Hors délai",         receivedAt: "2026-04-28" },
  { id: "DDP-2026-0336", name: "Mme Bineta Sarr",      position: "Directrice administration centrale",      millesime: "2026", status: "À contrôler",         receivedAt: "2026-05-10" },
  { id: "DDP-2026-0335", name: "M. Cheikh Diop",       position: "Directeur d'agence publique",             millesime: "2026", status: "Anomalie détectée",   receivedAt: "2026-05-09", variation: "+74 % en 1 an" },
  { id: "DDP-2026-0334", name: "M. Modou Kane",        position: "Conseiller technique",                    millesime: "2026", status: "Validée",             receivedAt: "2026-05-08" },
];

const STATUS_STYLES_DECL = {
  "Validée":             { bg: "bg-ofnac-green-50", text: "text-ofnac-green-700", icon: <CheckCircle2 size={12} /> },
  "À contrôler":         { bg: "bg-blue-100",       text: "text-blue-800",        icon: <Clock size={12} /> },
  "Hors délai":         { bg: "bg-amber-100",       text: "text-amber-800",       icon: <AlertCircle size={12} /> },
  "Anomalie détectée":  { bg: "bg-red-100",         text: "text-red-800",         icon: <AlertCircle size={12} /> },
};

export default function AgentPatrimoinePage() {
  const { show } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("Tous");

  const filtered = DECLARATIONS.filter((d) => {
    if (filter !== "Tous" && d.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return d.id.toLowerCase().includes(s) || d.name.toLowerCase().includes(s) || d.position.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <>
      <DemoBanner />
      <AgentShell title="Déclarations de patrimoine" breadcrumb={`Contrôle DDP · Millésime 2026 · ${filtered.length} résultat(s)`}>
        <div className="grid sm:grid-cols-4 gap-4 mb-6">
          <Kpi label="Total assujettis" value="2 184" sub="Millésime 2026" />
          <Kpi label="Déclarations reçues" value="1 826" sub="83,6 % de couverture" color="green" />
          <Kpi label="À contrôler" value="412" sub="dont 23 hors délai" color="amber" />
          <Kpi label="Anomalies détectées" value="38" sub="enquête approfondie" color="red" />
        </div>

        <div className="card p-5 mb-5">
          <div className="grid lg:grid-cols-[1fr_auto] gap-3 items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ofnac-gray" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par nom, fonction, ID..."
                className="w-full pl-10 pr-3.5 py-2.5 border border-ofnac-line rounded-lg text-sm"
              />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 border border-ofnac-line rounded-lg text-sm bg-white">
              <option value="Tous">Tous statuts</option>
              <option value="Validée">Validée</option>
              <option value="À contrôler">À contrôler</option>
              <option value="Hors délai">Hors délai</option>
              <option value="Anomalie détectée">Anomalie détectée</option>
            </select>
          </div>
        </div>

        <div className="card overflow-hidden">
          {filtered.map((d) => {
            const style = STATUS_STYLES_DECL[d.status];
            return (
              <div key={d.id} className="grid grid-cols-[140px_1fr_auto_auto] gap-4 items-center px-5 py-4 border-b border-ofnac-line last:border-0 text-sm hover:bg-ofnac-paper transition cursor-pointer">
                <span className="font-mono text-[11px] text-ofnac-gray">{d.id}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-ofnac-ink">{d.name}</span>
                    {d.variation && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full font-semibold">
                        ⚠ {d.variation}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-ofnac-gray mt-0.5">{d.position} · Reçue {new Date(d.receivedAt).toLocaleDateString("fr-FR")}</div>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-[10.5px] px-2.5 py-1 rounded-full font-semibold ${style.bg} ${style.text}`}>
                  {style.icon} {d.status}
                </span>
                <button onClick={() => show(`Examen de la déclaration ${d.id} (${d.name}) — démo`)} className="text-ofnac-green-700 hover:underline text-xs font-medium">Examiner →</button>
              </div>
            );
          })}
        </div>
      </AgentShell>
    </>
  );
}

function Kpi({ label, value, sub, color }: { label: string; value: string; sub: string; color?: "green" | "amber" | "red" }) {
  const colorClass = color === "green" ? "text-ofnac-green-700" : color === "amber" ? "text-amber-700" : color === "red" ? "text-red-700" : "text-ofnac-ink-soft";
  return (
    <div className="card p-5">
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-ofnac-ink-soft mb-2.5">{label}</div>
      <div className="font-serif text-3xl text-ofnac-green-900 font-bold leading-none">{value}</div>
      <div className={`mt-2 text-xs ${colorClass}`}>{sub}</div>
    </div>
  );
}
