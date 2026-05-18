"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { REGION_STATS } from "@/lib/mockData";

// Coordonnées simplifiées des régions du Sénégal pour bulles sur une carte schématique
const REGION_BUBBLES: Record<string, { x: number; y: number; r: number }> = {
  "Dakar":       { x: 60,  y: 110, r: 28 },
  "Thiès":       { x: 110, y: 105, r: 14 },
  "Saint-Louis": { x: 130, y: 50,  r: 12 },
  "Louga":       { x: 145, y: 90,  r: 10 },
  "Matam":       { x: 230, y: 80,  r: 8 },
  "Diourbel":    { x: 145, y: 130, r: 11 },
  "Fatick":      { x: 130, y: 160, r: 10 },
  "Kaolack":     { x: 165, y: 165, r: 13 },
  "Kaffrine":    { x: 200, y: 160, r: 10 },
  "Tambacounda": { x: 280, y: 160, r: 13 },
  "Kédougou":    { x: 320, y: 220, r: 8 },
  "Kolda":       { x: 230, y: 230, r: 10 },
  "Sédhiou":     { x: 170, y: 235, r: 9 },
  "Ziguinchor":  { x: 110, y: 245, r: 10 },
};

export default function CartographiePage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>("Dakar");

  const region = selectedRegion ? REGION_STATS.find((r) => r.name === selectedRegion) : null;
  const maxCount = Math.max(...REGION_STATS.map((r) => r.count));

  return (
    <>
      <DemoBanner />
      <AgentShell title="Cartographie" breadcrumb="Analyse · Cartographie des risques">
        <div className="grid lg:grid-cols-[1fr_360px] gap-5">
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-ofnac-line flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Carte des signalements par région</h3>
                <p className="text-xs text-ofnac-gray mt-0.5">Cliquez sur une région pour voir les détails</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-ofnac-ink-soft">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-ofnac-green-50 border border-ofnac-green-700" />
                  Faible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-ofnac-gold opacity-70" />
                  Moyen
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-ofnac-green-900" />
                  Élevé
                </span>
              </div>
            </div>

            <div className="bg-ofnac-green-50 p-6 min-h-[450px] flex items-center justify-center">
              <svg viewBox="0 0 400 320" className="w-full max-w-[600px]">
                <defs>
                  <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(10,61,46,0.06)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="320" fill="url(#grid2)" />

                {/* Silhouette stylisée du Sénégal */}
                <path
                  d="M 30,90 Q 50,40 100,40 L 200,38 Q 260,42 320,55 Q 360,70 370,110 Q 375,150 360,190 Q 340,230 280,240 L 240,255 Q 200,265 150,260 L 100,250 Q 60,235 40,200 Q 25,160 30,120 Q 28,100 30,90 Z"
                  fill="rgba(27,122,77,0.12)" stroke="#1B7A4D" strokeWidth="1.5"
                />

                {/* Gambia (enclave) */}
                <path
                  d="M 100,205 L 200,205 L 200,225 L 100,225 Z"
                  fill="rgba(0,0,0,0.05)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" strokeDasharray="3,3"
                />
                <text x="150" y="219" textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="8" fontStyle="italic">Gambie</text>

                {/* Bulles régions */}
                {REGION_STATS.map((r) => {
                  const bubble = REGION_BUBBLES[r.name];
                  if (!bubble) return null;
                  const intensity = r.count / maxCount;
                  const isSelected = selectedRegion === r.name;
                  const fillColor = intensity > 0.5 ? "#0A3D2E" : intensity > 0.2 ? "#D4A93C" : "#1B7A4D";
                  const opacity = intensity > 0.5 ? 0.9 : intensity > 0.2 ? 0.8 : 0.6;

                  return (
                    <g key={r.name} onClick={() => setSelectedRegion(r.name)} style={{ cursor: "pointer" }}>
                      {isSelected && (
                        <circle cx={bubble.x} cy={bubble.y} r={bubble.r + 6} fill="none" stroke="#D4A93C" strokeWidth="2" strokeDasharray="3,2">
                          <animate attributeName="r" values={`${bubble.r + 4};${bubble.r + 8};${bubble.r + 4}`} dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle cx={bubble.x} cy={bubble.y} r={bubble.r} fill={fillColor} opacity={opacity}>
                        <title>{r.name} : {r.count} signalements</title>
                      </circle>
                      <text x={bubble.x} y={bubble.y + 3} textAnchor="middle" fill={intensity > 0.2 ? "#D4A93C" : "white"} fontSize={bubble.r > 12 ? 10 : 8} fontWeight="700" pointerEvents="none">
                        {r.count}
                      </text>
                      <text x={bubble.x} y={bubble.y + bubble.r + 11} textAnchor="middle" fill="#1A2421" fontSize="8" fontWeight="600" pointerEvents="none">
                        {r.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="space-y-5">
            {region && (
              <div className="card p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-ofnac-green-900 text-ofnac-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-ofnac-gold font-semibold mb-1">Région sélectionnée</div>
                    <h3 className="font-serif text-xl text-ofnac-green-900 font-bold">{region.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Stat label="Signalements 2025" value={String(region.count)} />
                  <Stat label="Part du total" value={`${((region.count / REGION_STATS.reduce((a, b) => a + b.count, 0)) * 100).toFixed(1)}%`} />
                </div>

                <div className="bg-ofnac-paper rounded-lg p-3 text-xs space-y-2">
                  <Detail label="Secteur dominant"            value="Marchés publics (43 %)" />
                  <Detail label="Délai moyen traitement"       value="42 jours" />
                  <Detail label="Taux de transmission Parquet" value="9,8 %" />
                  <Detail label="Préjudice présumé évité"      value="2,1 Mds FCFA" />
                </div>

                <Link
                  href={`/agent/dossiers?region=${encodeURIComponent(region.name)}`}
                  className="block w-full mt-4 bg-ofnac-green-900 text-white py-2.5 rounded-lg text-xs font-semibold hover:bg-ofnac-green-800 text-center"
                >
                  Voir tous les dossiers de {region.name}
                </Link>
              </div>
            )}

            <div className="card overflow-hidden">
              <div className="px-5 py-3 border-b border-ofnac-line bg-amber-50 flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-700" />
                <h3 className="font-serif text-sm text-amber-900 font-semibold">Points chauds détectés</h3>
              </div>
              <div className="divide-y divide-ofnac-line text-xs">
                {[
                  { region: "Dakar — Almadies", reason: "Pic foncier inhabituel", level: "high" },
                  { region: "Thiès — Mbour",    reason: "Concentration marchés publics", level: "high" },
                  { region: "Saint-Louis",      reason: "Hausse signalements +34%", level: "medium" },
                  { region: "Tambacounda",      reason: "Secteur minier — vigilance", level: "medium" },
                ].map((h, i) => (
                  <div key={i} className="px-5 py-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-medium text-ofnac-ink">{h.region}</span>
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${h.level === "high" ? "text-red-700" : "text-amber-700"}`}>
                        {h.level === "high" ? "Critique" : "Vigilance"}
                      </span>
                    </div>
                    <div className="text-ofnac-gray mt-1">{h.reason}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4 bg-ofnac-green-50 border-ofnac-green-700">
              <div className="flex items-start gap-2.5">
                <TrendingUp size={16} className="text-ofnac-green-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-ofnac-green-900 mb-1">Tendance nationale</div>
                  <div className="text-ofnac-green-800 leading-relaxed">
                    +18 % de signalements vs 2024 — révélateur d'une confiance accrue des citoyens dans le dispositif de dénonciation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AgentShell>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-ofnac-ink-soft font-medium mb-1">{label}</div>
      <div className="font-serif text-2xl text-ofnac-green-900 font-bold">{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ofnac-ink-soft">{label}</span>
      <span className="font-semibold text-ofnac-ink">{value}</span>
    </div>
  );
}
