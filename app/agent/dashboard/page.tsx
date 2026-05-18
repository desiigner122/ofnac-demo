"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { TrendingUp, TrendingDown, AlertTriangle, FileText, Users } from "lucide-react";
import { MOCK_DOSSIERS, MONTHLY_STATS, SECTOR_STATS, STATUS_STYLES, formatDate } from "@/lib/mockData";

export default function AgentDashboard() {
  const [userDossiers, setUserDossiers] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const all = JSON.parse(localStorage.getItem("ofnac_dossiers") || "[]");
      setUserDossiers(all);
    } catch { setUserDossiers([]); }
  }, []);

  const totalActive = 147 + userDossiers.length;

  return (
    <>
      <DemoBanner />
      <AgentShell title="Tableau de bord" breadcrumb={`Vue d'ensemble · ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Kpi label="Signalements actifs" value={String(totalActive)} delta={`↑ ${12 + userDossiers.length} cette semaine`} up />
          <Kpi label="Délai moyen traitement" value="38 j" delta="↓ -23 % vs 2024" up />
          <Kpi label="Déclarations à contrôler" value="412" delta="23 hors délai" warning />
          <Kpi label="Transmis au Parquet" value="28" delta="↑ 6 ce mois" up />
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-5 mb-6">
          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line flex justify-between items-center">
              <div>
                <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Évolution des signalements 2025</h3>
                <p className="text-xs text-ofnac-gray mt-0.5">Volume mensuel · reçus, traités, transmis au Parquet</p>
              </div>
              <Link href="/agent/stats" className="text-xs text-ofnac-green-700 hover:underline font-medium">Détails →</Link>
            </div>
            <div className="p-5" style={{ height: 320 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_STATS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradRecus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1B7A4D" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#1B7A4D" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradTraites" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4A93C" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#D4A93C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={{ stroke: "#E5E2D8" }} />
                    <YAxis tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="recus" name="Reçus" stroke="#1B7A4D" strokeWidth={2} fill="url(#gradRecus)" />
                    <Area type="monotone" dataKey="traites" name="Traités" stroke="#D4A93C" strokeWidth={2} fill="url(#gradTraites)" />
                    <Area type="monotone" dataKey="transmis" name="Transmis" stroke="#0A3D2E" strokeWidth={2} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Top secteurs concernés</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Année 2025</p>
            </div>
            <div className="p-5" style={{ height: 320 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SECTOR_STATS} layout="vertical" margin={{ top: 5, right: 15, left: 60, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#8A8F8A", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="sector" type="category" tick={{ fill: "#1A2421", fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="count" name="Signalements" radius={[0, 4, 4, 0]} fill="#0A3D2E" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-5">
          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Dossiers prioritaires</h3>
              <Link href="/agent/dossiers" className="text-xs text-ofnac-green-700 hover:underline font-medium">Voir tous →</Link>
            </div>

            {userDossiers.length > 0 && (
              <div className="bg-ofnac-gold/10 border-l-4 border-ofnac-gold px-5 py-3 text-xs text-ofnac-green-800">
                <strong>{userDossiers.length} signalement(s) reçu(s) via la démo</strong> — déposé(s) depuis la page publique.
              </div>
            )}

            {userDossiers.slice().reverse().slice(0, 3).map((d: any) => (
              <CaseRow key={d.code} dossier={{ id: d.code, title: `${d.sector} — ${d.description.slice(0, 55)}${d.description.length > 55 ? "..." : ""}`, region: d.region, receivedAt: d.submittedAt.slice(0, 10), status: "Investigation", priority: "high" }} isDemo />
            ))}

            {MOCK_DOSSIERS.slice(0, 5).map((d) => <CaseRow key={d.id} dossier={d} />)}
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Activité récente</h3>
            </div>
            <Activity icon={<FileText size={12} />} color="green" body={<><strong>SIG-4821</strong> · Pièce reçue via messagerie chiffrée</>} time="il y a 12 min" />
            <Activity icon={<AlertTriangle size={12} />} color="purple" body={<><strong>SIG-4798</strong> · Dossier transmis au Procureur</>} time="il y a 1 h" />
            <Activity icon={<FileText size={12} />} color="green" body={<><strong>DDP-2026-0341</strong> · Déclaration signée électroniquement</>} time="il y a 2 h" />
            <Activity icon={<AlertTriangle size={12} />} color="amber" body={<><strong>SIG-4815</strong> · Audit déclenché par décision du Président</>} time="il y a 3 h" />
            <Activity icon={<Users size={12} />} color="green" body={<><strong>11 nouveaux signalements</strong> reçus ce matin</>} time="il y a 5 h" />
            <Activity icon={<FileText size={12} />} color="purple" body={<><strong>Rapport 2025</strong> publié sur le portail Open Data</>} time="hier" />
            <div className="px-5 py-3 border-t border-ofnac-line">
              <Link href="/agent/stats" className="text-xs font-medium text-ofnac-green-700 hover:underline">Voir l'historique complet →</Link>
            </div>
          </div>
        </div>
      </AgentShell>
    </>
  );
}

function Kpi({ label, value, delta, up, warning }: { label: string; value: string; delta: string; up?: boolean; warning?: boolean }) {
  const color = warning ? "text-amber-600" : up ? "text-ofnac-green-700" : "text-ofnac-gray";
  return (
    <div className="card p-5">
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-ofnac-ink-soft mb-2.5">{label}</div>
      <div className="font-serif text-3xl text-ofnac-green-900 font-bold leading-none">{value}</div>
      <div className={`mt-2 text-xs flex items-center gap-1 ${color}`}>
        {warning ? <AlertTriangle size={12} /> : up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {delta}
      </div>
    </div>
  );
}

function CaseRow({ dossier, isDemo }: { dossier: any; isDemo?: boolean }) {
  const priorityColors: Record<string, string> = { high: "bg-red-500", medium: "bg-amber-500", low: "bg-ofnac-green-700" };
  const status = dossier.status as keyof typeof STATUS_STYLES;
  const styles = STATUS_STYLES[status] || STATUS_STYLES["Investigation"];

  return (
    <Link href={`/agent/dossiers/${dossier.id}`} className="grid grid-cols-[80px_1fr_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-ofnac-line last:border-0 text-sm hover:bg-ofnac-paper transition">
      <span className="font-mono text-[11px] text-ofnac-gray">#{dossier.id}</span>
      <div className="min-w-0">
        <div className="font-medium text-ofnac-ink truncate">{dossier.title}</div>
        <div className="text-[11px] text-ofnac-gray mt-0.5">{dossier.region} · Reçu le {formatDate(dossier.receivedAt)}{isDemo ? " · 🆕 Démo" : ""}</div>
      </div>
      <span className={`text-[10.5px] px-2.5 py-1 rounded-full font-semibold ${styles.bg} ${styles.text}`}>{dossier.status}</span>
      <span className={`w-2 h-2 rounded-full ${priorityColors[dossier.priority] || "bg-ofnac-gray"}`} />
    </Link>
  );
}

function Activity({ icon, color, body, time }: { icon: React.ReactNode; color: "green" | "amber" | "purple"; body: React.ReactNode; time: string }) {
  const colors = { green: "bg-ofnac-green-50 text-ofnac-green-700", amber: "bg-amber-50 text-amber-700", purple: "bg-purple-50 text-purple-700" };
  return (
    <div className="flex gap-3 px-5 py-3 border-b border-ofnac-paper last:border-0">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${colors[color]}`}>{icon}</div>
      <div>
        <div className="text-sm text-ofnac-ink-soft leading-snug">{body}</div>
        <div className="text-[11px] text-ofnac-gray mt-0.5">{time}</div>
      </div>
    </div>
  );
}
