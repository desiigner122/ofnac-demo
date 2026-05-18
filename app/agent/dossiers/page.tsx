"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { useToast } from "@/components/Toast";
import { downloadCSV } from "@/lib/download";
import { Search, Download, ChevronRight } from "lucide-react";
import { MOCK_DOSSIERS, STATUS_STYLES, formatDate, formatFCFA, type DossierMock } from "@/lib/mockData";

export default function DossiersPage() {
  const { show } = useToast();
  const [userDossiers, setUserDossiers] = useState<DossierMock[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");
  const [priorityFilter, setPriorityFilter] = useState<string>("Toutes");

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("ofnac_dossiers") || "[]");
      const mapped: DossierMock[] = all.map((d: any) => ({
        id: d.code,
        title: `${d.sector} — ${d.description.slice(0, 60)}${d.description.length > 60 ? "..." : ""}`,
        sector: d.sector,
        region: d.region,
        status: "Investigation" as const,
        priority: "high" as const,
        receivedAt: d.submittedAt.slice(0, 10),
        assignedTo: "Non affecté",
        description: d.description,
        timeline: d.timeline.map((t: any) => ({ ...t, date: t.date.slice(0, 10) })),
      }));
      setUserDossiers(mapped);
    } catch {}
  }, []);

  const allDossiers = useMemo(() => [...userDossiers, ...MOCK_DOSSIERS], [userDossiers]);

  const filtered = useMemo(() => {
    return allDossiers.filter((d) => {
      if (statusFilter !== "Tous" && d.status !== statusFilter) return false;
      if (priorityFilter !== "Toutes" && d.priority !== priorityFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          d.id.toLowerCase().includes(s) ||
          d.title.toLowerCase().includes(s) ||
          d.sector.toLowerCase().includes(s) ||
          d.region.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [allDossiers, statusFilter, priorityFilter, search]);

  const statuses = ["Tous", "Reçu", "Investigation", "Audit", "Au Parquet", "Classé", "Condamnation"];
  const priorities = [{ k: "Toutes", l: "Toutes" }, { k: "high", l: "Élevée" }, { k: "medium", l: "Moyenne" }, { k: "low", l: "Basse" }];

  return (
    <>
      <DemoBanner />
      <AgentShell title="Signalements" breadcrumb={`Gestion des dossiers · ${filtered.length} résultat(s)`}>
        <div className="card p-5 mb-5">
          <div className="grid lg:grid-cols-[1fr_auto_auto_auto] gap-3 items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ofnac-gray" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par ID, titre, secteur, région..."
                className="w-full pl-10 pr-3.5 py-2.5 border border-ofnac-line rounded-lg text-sm"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-ofnac-line rounded-lg text-sm bg-white">
              {statuses.map((s) => <option key={s} value={s}>Statut : {s}</option>)}
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="px-3 py-2.5 border border-ofnac-line rounded-lg text-sm bg-white">
              {priorities.map((p) => <option key={p.k} value={p.k}>Priorité : {p.l}</option>)}
            </select>
            <button
              onClick={() => {
                const rows = filtered.map(d => ({
                  ID: d.id, Titre: d.title, Secteur: d.sector, Region: d.region,
                  Statut: d.status, Priorite: d.priority, Recu_le: d.receivedAt,
                  Affecte_a: d.assignedTo, Montant_FCFA: d.amount || ""
                }));
                downloadCSV(`ofnac-dossiers-${new Date().toISOString().slice(0,10)}`, rows);
                show(`${rows.length} dossier(s) exporté(s) en CSV`);
              }}
              className="px-4 py-2.5 border border-ofnac-line rounded-lg text-sm font-medium text-ofnac-ink-soft hover:bg-ofnac-paper flex items-center gap-2"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="hidden lg:grid grid-cols-[100px_1fr_140px_120px_120px_140px_30px] gap-4 px-5 py-3 border-b border-ofnac-line bg-ofnac-paper text-[10px] font-semibold uppercase tracking-[0.12em] text-ofnac-ink-soft">
            <span>ID</span>
            <span>Dossier</span>
            <span>Secteur</span>
            <span>Statut</span>
            <span>Priorité</span>
            <span>Affecté à</span>
            <span></span>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-ofnac-gray text-sm">
              Aucun dossier ne correspond aux critères.
            </div>
          )}

          {filtered.map((d) => {
            const isUserDemo = userDossiers.some((ud) => ud.id === d.id);
            const styles = STATUS_STYLES[d.status];
            const priorityColors = { high: "bg-red-500", medium: "bg-amber-500", low: "bg-ofnac-green-700" };
            const priorityLabels = { high: "Élevée", medium: "Moyenne", low: "Basse" };

            return (
              <Link key={d.id} href={`/agent/dossiers/${d.id}`} className="grid lg:grid-cols-[100px_1fr_140px_120px_120px_140px_30px] grid-cols-[1fr_auto] gap-4 items-center px-5 py-4 border-b border-ofnac-line last:border-0 text-sm hover:bg-ofnac-paper transition">
                <span className="font-mono text-[11px] text-ofnac-gray hidden lg:block">#{d.id}</span>
                <div className="min-w-0">
                  <div className="lg:hidden text-[10px] text-ofnac-gray font-mono mb-0.5">#{d.id}</div>
                  <div className="font-medium text-ofnac-ink truncate">{d.title}</div>
                  <div className="text-[11px] text-ofnac-gray mt-0.5">
                    {d.region} · Reçu le {formatDate(d.receivedAt)}
                    {d.amount && ` · ${formatFCFA(d.amount)}`}
                    {isUserDemo && <span className="ml-2 text-ofnac-gold font-medium">🆕 Démo</span>}
                  </div>
                </div>
                <span className="hidden lg:block text-xs text-ofnac-ink-soft truncate">{d.sector}</span>
                <span className={`hidden lg:inline-block text-[10.5px] px-2.5 py-1 rounded-full font-semibold w-fit ${styles.bg} ${styles.text}`}>{d.status}</span>
                <div className="hidden lg:flex items-center gap-1.5 text-xs">
                  <span className={`w-2 h-2 rounded-full ${priorityColors[d.priority]}`} />
                  {priorityLabels[d.priority]}
                </div>
                <span className="hidden lg:block text-[11px] text-ofnac-gray truncate">{d.assignedTo}</span>
                <ChevronRight size={16} className="text-ofnac-gray justify-self-end" />
              </Link>
            );
          })}
        </div>

        <div className="mt-5 text-center text-xs text-ofnac-gray">
          Affichage de {filtered.length} dossier(s) sur {allDossiers.length} au total.
        </div>
      </AgentShell>
    </>
  );
}
