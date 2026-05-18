"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

type Dossier = {
  code: string;
  sector: string;
  region: string;
  description: string;
  submittedAt: string;
  status: string;
  timeline: { date: string; event: string; actor: string }[];
};

export default function SuivrePage() {
  const [code, setCode] = useState("");
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [searched, setSearched] = useState(false);

  function search() {
    setSearched(true);
    try {
      const all: Dossier[] = JSON.parse(localStorage.getItem("ofnac_dossiers") || "[]");
      const found = all.find((d) => d.code.toUpperCase() === code.trim().toUpperCase());
      setDossier(found || null);
    } catch {
      setDossier(null);
    }
  }

  return (
    <>
      <DemoBanner />
      <PublicHeader />

      <main className="bg-ofnac-paper min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-ofnac-green-50 text-ofnac-green-800 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full mb-4">
              Transparence
            </div>
            <h1 className="font-serif text-4xl text-ofnac-green-900 font-bold mb-3">Suivre votre dossier</h1>
            <p className="text-ofnac-ink-soft max-w-xl mx-auto">
              Saisissez le code de suivi qui vous a été remis lors du dépôt de votre signalement pour consulter son statut en temps réel.
            </p>
          </div>

          <div className="bg-white border border-ofnac-line rounded-xl p-6 mb-8">
            <div className="flex gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="OFNAC-XXXX-XXXX"
                className="flex-1 px-4 py-3 border border-ofnac-line rounded-lg text-sm font-mono"
              />
              <button onClick={search} className="btn-dark">
                <Search size={16} />
                Rechercher
              </button>
            </div>
            <p className="text-xs text-ofnac-gray mt-3">
              💡 Pour la démo : déposez d'abord un signalement via <Link href="/signaler" className="text-ofnac-green-700 underline">la page de signalement</Link>, conservez le code généré, et collez-le ici.
            </p>
          </div>

          {searched && !dossier && (
            <div className="bg-white border border-ofnac-line rounded-xl p-8 text-center">
              <AlertCircle className="mx-auto text-ofnac-gray mb-3" size={32} />
              <h3 className="font-serif text-lg text-ofnac-green-900 mb-2">Aucun dossier trouvé</h3>
              <p className="text-sm text-ofnac-ink-soft">
                Vérifiez le format du code (OFNAC-XXXX-XXXX). Les dossiers de démo ne sont conservés que dans votre navigateur.
              </p>
            </div>
          )}

          {dossier && (
            <div className="bg-white border border-ofnac-line rounded-xl overflow-hidden">
              <div className="bg-ofnac-green-900 text-white p-6">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-ofnac-gold font-semibold mb-1">Dossier</div>
                    <div className="font-mono text-xl font-bold">{dossier.code}</div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-ofnac-gold/15 border border-ofnac-gold/30 rounded-full">
                    <Clock size={12} className="text-ofnac-gold" />
                    <span className="text-xs font-semibold text-ofnac-gold">{dossier.status}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-sm">
                  <Info label="Secteur" value={dossier.sector} />
                  <Info label="Région" value={dossier.region} />
                  <Info label="Déposé le" value={new Date(dossier.submittedAt).toLocaleDateString("fr-FR")} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-lg text-ofnac-green-900 mb-4">Évolution du dossier</h3>
                <div className="space-y-1">
                  {dossier.timeline.map((t, i) => (
                    <div key={i} className="flex gap-4 py-3 border-b border-ofnac-paper last:border-0">
                      <div className="w-8 h-8 bg-ofnac-green-50 text-ofnac-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{t.event}</div>
                        <div className="text-xs text-ofnac-gray mt-0.5">{new Date(t.date).toLocaleString("fr-FR")} · {t.actor}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-ofnac-green-50 rounded-lg text-sm text-ofnac-green-800">
                  <strong className="font-semibold">Description initiale du signalement :</strong>
                  <p className="mt-1 text-ofnac-ink-soft leading-relaxed">{dossier.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/60 font-semibold mb-1">{label}</div>
      <div className="font-medium">{value || "—"}</div>
    </div>
  );
}
