"use client";

import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { MOCK_DOSSIERS, formatFCFA } from "@/lib/mockData";
import Link from "next/link";
import { Calendar, Coins, User } from "lucide-react";

const COLUMNS = [
  { status: "Reçu",          color: "border-blue-400",         bg: "bg-blue-50",         label: "Nouveaux" },
  { status: "Investigation", color: "border-amber-400",        bg: "bg-amber-50",        label: "En investigation" },
  { status: "Audit",         color: "border-ofnac-green-700",  bg: "bg-ofnac-green-50",  label: "En audit" },
  { status: "Au Parquet",    color: "border-purple-400",       bg: "bg-purple-50",       label: "Transmis Parquet" },
];

export default function InvestigationsPage() {
  return (
    <>
      <DemoBanner />
      <AgentShell title="Investigations" breadcrumb="Espace équipe d'enquête · Vue Kanban">
        <div className="grid sm:grid-cols-4 gap-4 mb-6">
          <Kpi label="En cours" value="42" />
          <Kpi label="Audits actifs" value="14" />
          <Kpi label="Délai moyen instruction" value="38 j" />
          <Kpi label="Préjudice présumé suivi" value="8,2 Mds" sub="FCFA" />
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const dossiers = MOCK_DOSSIERS.filter((d) => d.status === col.status);
            return (
              <div key={col.status} className="space-y-3">
                <div className={`px-4 py-3 ${col.bg} border-t-2 ${col.color} rounded-t-lg`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-sm font-semibold text-ofnac-green-900">{col.label}</h3>
                    <span className="text-xs font-mono text-ofnac-ink-soft bg-white px-2 py-0.5 rounded-full">{dossiers.length}</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {dossiers.map((d) => (
                    <Link key={d.id} href={`/agent/dossiers/${d.id}`} className="block card p-3.5 hover:shadow-md transition cursor-pointer">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-mono text-[10px] text-ofnac-gray">#{d.id}</span>
                        <span className={`w-2 h-2 rounded-full ${d.priority === "high" ? "bg-red-500" : d.priority === "medium" ? "bg-amber-500" : "bg-ofnac-green-700"}`} />
                      </div>
                      <h4 className="text-sm font-medium text-ofnac-ink mb-1.5 leading-snug line-clamp-2">{d.title}</h4>
                      <div className="text-[11px] text-ofnac-gray space-y-1">
                        <div className="flex items-center gap-1.5"><User size={10} />{d.assignedTo}</div>
                        <div className="flex items-center gap-1.5"><Calendar size={10} />Reçu {new Date(d.receivedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</div>
                        {d.amount && <div className="flex items-center gap-1.5 text-ofnac-green-800 font-semibold"><Coins size={10} />{formatFCFA(d.amount)}</div>}
                      </div>
                    </Link>
                  ))}
                  {dossiers.length === 0 && (
                    <div className="card p-4 text-center text-xs text-ofnac-gray italic">Aucun dossier</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AgentShell>
    </>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-ofnac-ink-soft mb-2.5">{label}</div>
      <div className="font-serif text-3xl text-ofnac-green-900 font-bold leading-none">{value}</div>
      {sub && <div className="mt-2 text-xs text-ofnac-gray">{sub}</div>}
    </div>
  );
}
