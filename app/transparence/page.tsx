"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useToast } from "@/components/Toast";
import { MONTHLY_STATS, SECTOR_STATS, IPC_EVOLUTION, REGION_STATS } from "@/lib/mockData";
import { downloadCSV, downloadJSON, downloadMockPDF } from "@/lib/download";
import { Download, FileText, Database } from "lucide-react";

export default function TransparencePage() {
  const [mounted, setMounted] = useState(false);
  const { show } = useToast();
  useEffect(() => { setMounted(true); }, []);

  function handleDownload(dataset: string) {
    if (dataset === "signalements") {
      const rows = MONTHLY_STATS.map(m => ({ Mois: m.month, Annee: 2025, Recus: m.recus, Traites: m.traites, Transmis_Parquet: m.transmis }));
      const sectors = SECTOR_STATS.map(s => ({ Mois: "Total 2025", Annee: 2025, Secteur: s.sector, Volume: s.count }));
      downloadCSV("ofnac-signalements-2025", [...rows, ...sectors]);
      show("Téléchargement démarré : ofnac-signalements-2025.csv");
    } else if (dataset === "patrimoine") {
      const rows = [
        { Annee: 2026, Categorie: "Ministres et assimilés", Assujettis: 38, Recues: 36, Validees: 34, Anomalies: 2 },
        { Annee: 2026, Categorie: "DG établissements publics", Assujettis: 124, Recues: 109, Validees: 98, Anomalies: 11 },
        { Annee: 2026, Categorie: "Magistrats", Assujettis: 587, Recues: 521, Validees: 498, Anomalies: 8 },
        { Annee: 2026, Categorie: "Préfets et sous-préfets", Assujettis: 144, Recues: 121, Validees: 117, Anomalies: 4 },
        { Annee: 2026, Categorie: "Directeurs admin. centrale", Assujettis: 412, Recues: 348, Validees: 326, Anomalies: 9 },
        { Annee: 2026, Categorie: "Autres assujettis", Assujettis: 879, Recues: 691, Validees: 612, Anomalies: 4 },
      ];
      downloadCSV("ofnac-patrimoine-agregats-2026", rows);
      show("Téléchargement démarré : ofnac-patrimoine-agregats-2026.csv");
    } else if (dataset === "decisions") {
      downloadJSON("ofnac-decisions-judiciaires-2025", {
        annee: 2025,
        total_transmissions_parquet: 214,
        condamnations_definitives: 87,
        relaxes: 28,
        en_cours: 99,
        repartition_par_secteur: SECTOR_STATS,
        source: "OFNAC — Open Data",
        licence: "Licence Ouverte Sénégal v1.0",
      });
      show("Téléchargement démarré : ofnac-decisions-judiciaires-2025.json");
    } else if (dataset === "ipc") {
      downloadCSV("ipc-senegal-historique", IPC_EVOLUTION.map(i => ({ Annee: i.year, Score_IPC: i.score, Source: "Transparency International" })));
      show("Téléchargement démarré : ipc-senegal-historique.csv");
    }
  }

  function handleDocsAPI() {
    downloadMockPDF("ofnac-documentation-api", "Documentation API OFNAC Open Data v1", [
      "Document de référence — API publique OFNAC",
      "",
      "1. Présentation",
      "L'API OFNAC permet l'acces aux donnees ouvertes de l'Office.",
      "Toutes les donnees sont anonymisees et conformes a la loi 2008-12.",
      "",
      "2. Authentification",
      "Aucune clef necessaire pour les datasets publics.",
      "Limitation: 1000 requetes par heure par adresse IP.",
      "",
      "3. Endpoints",
      "GET /api/v1/signalements/aggregats",
      "GET /api/v1/patrimoine/statistiques",
      "GET /api/v1/decisions",
      "",
      "4. Format de reponse",
      "JSON ou CSV selon le parametre ?format=",
      "",
      "5. Licence",
      "Licence Ouverte Senegal v1.0",
    ]);
    show("Documentation API téléchargée");
  }

  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-ofnac-paper">
        <div className="bg-gradient-to-br from-ofnac-green-900 via-ofnac-green-800 to-ofnac-green-700 text-white relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-ofnac-gold/15 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ofnac-gold/15 border border-ofnac-gold/30 rounded-full text-[11px] tracking-[0.18em] uppercase text-ofnac-gold font-semibold mb-5">
              <Database size={12} />
              Open Data · Transparence publique
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              L'action de l'OFNAC, <em className="text-ofnac-gold-soft font-medium">en données ouvertes.</em>
            </h1>
            <p className="text-white/85 leading-relaxed max-w-2xl mx-auto">
              Consultez en temps réel les indicateurs de la lutte contre la corruption au Sénégal. Toutes les données sont anonymisées et conformes au principe de présomption d'innocence.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            <Indicator val="2 437" label="Signalements reçus en 2025" />
            <Indicator val="1 893" label="Dossiers instruits" />
            <Indicator val="214"   label="Transmis à la justice" />
            <Indicator val="87"    label="Condamnations définitives" />
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-6">
            <div className="card">
              <div className="px-5 py-4 border-b border-ofnac-line">
                <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Évolution mensuelle 2025</h3>
                <p className="text-xs text-ofnac-gray mt-0.5">Volume de signalements reçus et traités</p>
              </div>
              <div className="p-5" style={{ height: 300 }}>
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_STATS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="opg1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1B7A4D" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#1B7A4D" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={{ stroke: "#E5E2D8" }} />
                      <YAxis tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="recus" name="Reçus" stroke="#1B7A4D" strokeWidth={2} fill="url(#opg1)" />
                      <Area type="monotone" dataKey="traites" name="Traités" stroke="#D4A93C" strokeWidth={2} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="card">
              <div className="px-5 py-4 border-b border-ofnac-line">
                <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Score IPC du Sénégal — 6 ans</h3>
                <p className="text-xs text-ofnac-gray mt-0.5">Source : Transparency International</p>
              </div>
              <div className="p-5" style={{ height: 300 }}>
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={IPC_EVOLUTION} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" vertical={false} />
                      <XAxis dataKey="year" tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={{ stroke: "#E5E2D8" }} />
                      <YAxis domain={[35, 55]} tick={{ fill: "#8A8F8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "white", border: "1px solid #E5E2D8", borderRadius: 8, fontSize: 12 }} />
                      <Line type="monotone" dataKey="score" name="Score (sur 100)" stroke="#0A3D2E" strokeWidth={3} dot={{ fill: "#D4A93C", r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-10">
            <div className="card">
              <div className="px-5 py-4 border-b border-ofnac-line">
                <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Répartition par secteur</h3>
              </div>
              <div className="p-5" style={{ height: 300 }}>
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
                <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Top régions 2025</h3>
              </div>
              <div className="p-3">
                {[...REGION_STATS].sort((a,b) => b.count - a.count).slice(0, 8).map((r) => {
                  const max = Math.max(...REGION_STATS.map(x => x.count));
                  return (
                    <div key={r.name} className="grid grid-cols-[110px_1fr_60px] gap-3 items-center px-3 py-2.5 text-sm">
                      <span className="font-medium text-ofnac-ink">{r.name}</span>
                      <div className="h-2 bg-ofnac-paper rounded-full overflow-hidden">
                        <div className="h-full bg-ofnac-green-700" style={{ width: `${(r.count / max) * 100}%` }} />
                      </div>
                      <span className="font-mono text-xs text-right">{r.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="px-6 py-5 border-b border-ofnac-line bg-ofnac-green-900 text-white flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Database size={20} className="text-ofnac-gold" />
                <div>
                  <h3 className="font-serif text-lg font-semibold">Jeux de données disponibles</h3>
                  <p className="text-xs text-white/70 mt-0.5">Téléchargement libre · formats ouverts · Licence Ouverte Sénégal v1.0</p>
                </div>
              </div>
              <button onClick={handleDocsAPI} className="text-xs text-ofnac-gold hover:underline font-medium">Documentation API →</button>
            </div>
            <div className="divide-y divide-ofnac-line">
              {[
                { key: "signalements", title: "Signalements 2025 — données complètes", desc: "Volumétrie mensuelle, par secteur et par région.", size: "CSV · ~5 Ko", date: "Mai 2026" },
                { key: "patrimoine",   title: "Déclarations de patrimoine — agrégats", desc: "Statistiques anonymisées par catégorie d'assujettis.", size: "CSV · ~2 Ko", date: "Avr 2026" },
                { key: "decisions",    title: "Décisions judiciaires — issue d'enquêtes", desc: "Résultats des dossiers transmis au Parquet.", size: "JSON · ~3 Ko", date: "Avr 2026" },
                { key: "ipc",          title: "Indicateurs IPC — série historique", desc: "Score IPC du Sénégal de 2020 à 2025.", size: "CSV · ~1 Ko", date: "Fév 2026" },
              ].map((d) => (
                <div key={d.key} className="flex items-start gap-4 px-6 py-5 flex-wrap sm:flex-nowrap">
                  <div className="w-11 h-11 bg-ofnac-green-50 text-ofnac-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-ofnac-ink">{d.title}</h4>
                    <p className="text-sm text-ofnac-ink-soft mt-1">{d.desc}</p>
                    <div className="text-[11px] text-ofnac-gray mt-1.5 font-mono">{d.size} · {d.date}</div>
                  </div>
                  <button onClick={() => handleDownload(d.key)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-ofnac-green-700 px-3 py-2 hover:bg-ofnac-green-50 rounded-lg">
                    <Download size={13} /> Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

function Indicator({ val, label }: { val: string; label: string }) {
  return (
    <div className="card p-5 text-center">
      <div className="font-serif text-2xl sm:text-3xl text-ofnac-green-900 font-bold leading-none">{val}</div>
      <div className="text-[11px] text-ofnac-ink-soft mt-2 leading-snug">{label}</div>
    </div>
  );
}
