"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { MONTHLY_STATS, SECTOR_STATS, REGION_STATS, IPC_EVOLUTION } from "@/lib/mockData";

const STATUS_DATA = [
  { name: "Investigation", value: 287, color: "#D4A93C" },
  { name: "Audit",         value: 142, color: "#1B7A4D" },
  { name: "Au Parquet",    value: 214, color: "#7B3FB8" },
  { name: "Classé",         value: 654, color: "#8A8F8A" },
  { name: "Condamnation",   value: 87,  color: "#0A3D2E" },
];

const RESOLUTION_DATA = [
  { range: "0-30 j",  count: 287 },
  { range: "31-60 j", count: 412 },
  { range: "61-90 j", count: 543 },
  { range: "91-180 j", count: 312 },
  { range: "> 180 j",  count: 142 },
];

export default function StatsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const topRegions = [...REGION_STATS].sort((a, b) => b.count - a.count).slice(0, 7);

  return (
    <>
      <DemoBanner />
      <AgentShell title="Statistiques" breadcrumb="Analyse · Vue d'ensemble 2025">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Kpi label="Total signalements 2025" value="2 437" delta="+18 % vs 2024" up />
          <Kpi label="Taux de traitement" value="86,4 %" delta="+9,2 pts" up />
          <Kpi label="Préjudice présumé évité" value="12,4 Mds" delta="FCFA" />
          <Kpi label="Score IPC (sur 100)" value="46" delta="+1 point" up icon={<Target size={12} />} />
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-5 mb-6">
          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Évolution mensuelle des signalements — 2025</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Reçus vs traités vs transmis au Parquet</p>
            </div>
            <div className="p-5" style={{ height: 340 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_STATS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1B7A4D" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#1B7A4D" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4A93C" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#D4A93C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={{ stroke: "#E5E2D8" }} />
                    <YAxis tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="recus" name="Reçus" stroke="#1B7A4D" strokeWidth={2} fill="url(#g1)" />
                    <Area type="monotone" dataKey="traites" name="Traités" stroke="#D4A93C" strokeWidth={2} fill="url(#g2)" />
                    <Area type="monotone" dataKey="transmis" name="Transmis Parquet" stroke="#0A3D2E" strokeWidth={2} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Répartition par statut</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Dossiers actifs et archivés</p>
            </div>
            <div className="p-5" style={{ height: 340 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={STATUS_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                      {STATUS_DATA.map((s, i) => <Cell key={i} fill={s.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Top secteurs concernés</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Volume par secteur, année 2025</p>
            </div>
            <div className="p-5" style={{ height: 320 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SECTOR_STATS} layout="vertical" margin={{ top: 5, right: 15, left: 80, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#8A8F8A", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="sector" type="category" tick={{ fill: "#1A2421", fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="count" name="Signalements" radius={[0, 4, 4, 0]}>
                      {SECTOR_STATS.map((s, i) => <Cell key={i} fill={s.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Délai de résolution des dossiers</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Distribution par tranche</p>
            </div>
            <div className="p-5" style={{ height: 320 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RESOLUTION_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" vertical={false} />
                    <XAxis dataKey="range" tick={{ fill: "#1A2421", fontSize: 11 }} axisLine={{ stroke: "#E5E2D8" }} />
                    <YAxis tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="count" name="Dossiers" radius={[6, 6, 0, 0]} fill="#1B7A4D" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Évolution du Score IPC du Sénégal</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Indice de Perception de la Corruption · Transparency International</p>
            </div>
            <div className="p-5" style={{ height: 300 }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={IPC_EVOLUTION} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={{ stroke: "#E5E2D8" }} />
                    <YAxis domain={[35, 60]} tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="score" name="Score IPC" stroke="#0A3D2E" strokeWidth={3} dot={{ fill: "#D4A93C", r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Top 7 régions par volume</h3>
              <p className="text-xs text-ofnac-gray mt-0.5">Année 2025</p>
            </div>
            <div className="p-3">
              {topRegions.map((r) => {
                const max = topRegions[0].count;
                const pct = (r.count / max) * 100;
                return (
                  <div key={r.name} className="grid grid-cols-[100px_1fr_50px] gap-3 items-center px-3 py-2.5 text-sm">
                    <span className="font-medium text-ofnac-ink truncate">{r.name}</span>
                    <div className="h-2 bg-ofnac-paper rounded-full overflow-hidden">
                      <div className="h-full bg-ofnac-green-700" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-mono text-xs text-right text-ofnac-ink-soft">{r.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AgentShell>
    </>
  );
}

function Kpi({ label, value, delta, up, icon }: { label: string; value: string; delta: string; up?: boolean; icon?: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-ofnac-ink-soft mb-2.5">{label}</div>
      <div className="font-serif text-3xl text-ofnac-green-900 font-bold leading-none">{value}</div>
      <div className={`mt-2 text-xs flex items-center gap-1 ${up ? "text-ofnac-green-700" : "text-ofnac-gray"}`}>
        {icon || (up ? <TrendingUp size={12} /> : <TrendingDown size={12} />)}
        {delta}
      </div>
    </div>
  );
}
