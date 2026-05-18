"use client";

import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useToast } from "@/components/Toast";
import { downloadMockPDF } from "@/lib/download";
import { FileDown, FileText } from "lucide-react";

const rapports = [
  { id: "rapport-2025", year: "2025", title: "Rapport d'activité 2025", desc: "Bilan exhaustif de l'année écoulée — signalements, enquêtes, dossiers transmis, recommandations.", pages: 124,
    content: [
      "Rapport d'activite 2025 — Synthese",
      "",
      "Volume global: 2437 signalements recus (+18% vs 2024)",
      "Dossiers instruits: 1893",
      "Transmis a la justice: 214",
      "Condamnations definitives: 87",
      "",
      "Repartition par secteur:",
      "- Marches publics: 687 signalements (28%)",
      "- Foncier: 432 (18%)",
      "- Douanes/Fiscalite: 298 (12%)",
      "- Sante: 256 (11%)",
      "- Education: 187 (8%)",
      "",
      "Repartition geographique:",
      "Dakar concentre 37% des signalements.",
      "",
      "Score IPC du Senegal: 46/100 (+1 point vs 2024).",
      "",
      "Recommandations principales:",
      "1. Renforcement des controles ex ante sur marches > 1 Md FCFA",
      "2. Digitalisation acceleree des procedures domaniales",
      "3. Formation continue des agents publics sur la prevention",
    ]
  },
  { id: "rapport-2024", year: "2024", title: "Rapport d'activité 2024", desc: "Première année de mise en œuvre des nouvelles dispositions des lois 2024-06 et 2024-07.", pages: 98,
    content: ["Rapport d'activite 2024", "", "Annee de transition apres les reformes de fevrier 2024.", "2 065 signalements recus.", "Score IPC: 45/100."]
  },
  { id: "rapport-2023", year: "2023", title: "Rapport d'activité 2023", desc: "Bilan des actions de prévention et de répression.", pages: 86,
    content: ["Rapport d'activite 2023", "", "1 832 signalements recus.", "Score IPC: 43/100."]
  },
  { id: "etude-marches-2025", year: "2025", title: "Étude sectorielle — Marchés publics", desc: "Cartographie des risques de corruption dans le secteur des marchés publics au Sénégal.", pages: 64,
    content: [
      "Etude sectorielle — Marches publics 2025",
      "",
      "Cartographie des risques sur les marches publics au Senegal.",
      "",
      "Zones a risque eleve identifiees:",
      "- Travaux d'infrastructure routiere",
      "- Equipements sanitaires",
      "- Fournitures scolaires",
      "",
      "Pratiques observees:",
      "- Surfacturation systematique (32% des cas)",
      "- Fractionnement de marches (18%)",
      "- Entente entre soumissionnaires (15%)",
      "",
      "Recommandations:",
      "1. Plateforme nationale de transparence des marches",
      "2. Veille citoyenne sur les attributions > 500 M FCFA",
      "3. Audit systematique post-execution",
    ]
  },
];

export default function RapportsPage() {
  const { show } = useToast();

  function handleDownload(r: typeof rapports[0]) {
    downloadMockPDF(`OFNAC-${r.id}.pdf`, r.title, r.content);
    show(`Téléchargement démarré : OFNAC-${r.id}.pdf`);
  }

  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
            <div className="label-sm text-ofnac-gold mb-3">Rapports & publications</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold mb-4">Toutes les publications de l'OFNAC.</h1>
            <p className="text-lg text-ofnac-ink-soft max-w-3xl">Rapports annuels d'activité, études sectorielles, recommandations de réforme. Téléchargement gratuit.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-5">
          {rapports.map((r) => (
            <div key={r.id} className="card p-6 hover:shadow-lg transition">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-ofnac-green-900 text-ofnac-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.12em] text-ofnac-gold font-semibold mb-1">{r.year} · {r.pages} pages</div>
                  <h3 className="font-serif text-lg text-ofnac-green-900 font-bold mb-2">{r.title}</h3>
                  <p className="text-sm text-ofnac-ink-soft mb-3">{r.desc}</p>
                  <button onClick={() => handleDownload(r)} className="inline-flex items-center gap-1.5 text-sm font-medium text-ofnac-green-700 hover:underline">
                    <FileDown size={14} /> Télécharger le PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
