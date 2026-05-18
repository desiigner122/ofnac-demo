"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { ArrowLeft, Lock, Fingerprint, Shield, CheckCircle2, Upload, Copy } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function SignalerPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    sector: "",
    region: "",
    description: "",
    attachment: "",
  });
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  function generateCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "OFNAC-";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    code += "-";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  function submit() {
    const code = generateCode();
    setGeneratedCode(code);
    const dossier = {
      code,
      sector: form.sector,
      region: form.region,
      description: form.description,
      submittedAt: new Date().toISOString(),
      status: "Reçu",
      timeline: [
        { date: new Date().toISOString(), event: "Signalement déposé", actor: "Système" },
      ],
    };
    try {
      const existing = JSON.parse(localStorage.getItem("ofnac_dossiers") || "[]");
      existing.push(dossier);
      localStorage.setItem("ofnac_dossiers", JSON.stringify(existing));
    } catch {}
    setStep(4);
  }

  return (
    <>
      <DemoBanner />
      <main className="min-h-screen bg-ofnac-paper">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[360px_1fr] min-h-screen">
          <aside className="bg-ofnac-green-900 text-white p-6 sm:p-10 lg:p-12">
            <Link href="/" className="inline-flex items-center gap-2 text-ofnac-gold text-sm mb-8 hover:underline">
              <ArrowLeft size={14} /> Retour à l'accueil
            </Link>
            <div className="inline-block px-2.5 py-1 bg-ofnac-gold/20 text-ofnac-gold text-[10px] uppercase tracking-[0.18em] font-semibold rounded mb-4">
              Étape {step} / 4
            </div>
            <h2 className="font-serif text-3xl font-bold leading-tight mb-4">
              Signaler en toute sécurité.
            </h2>
            <p className="text-sm text-white/75 leading-relaxed mb-8">
              Aucune donnée d'identification n'est collectée. Les pièces jointes sont chiffrées avant même de quitter votre appareil.
            </p>
            <ul className="space-y-4 border-t border-white/10 pt-6">
              <Guarantee icon={<Lock size={14} />} title="Chiffrement AES-256" sub="Bout-en-bout, clés gérées par HSM" />
              <Guarantee icon={<Fingerprint size={14} />} title="Pas de tracking" sub="IP non journalisée, accès Tor possible" />
              <Guarantee icon={<Shield size={14} />} title="Hébergement souverain" sub="Datacenter au Sénégal" />
              <Guarantee icon={<CheckCircle2 size={14} />} title="Traçabilité immuable" sub="Journal hash-chain" />
            </ul>
          </aside>

          <div className="p-6 sm:p-10 lg:p-14">
            <div className="flex gap-1 mb-9">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`flex-1 pb-2.5 border-b-2 text-xs uppercase tracking-[0.1em] ${
                    n < step ? "border-ofnac-green-700 text-ofnac-green-700 font-semibold" :
                    n === step ? "border-ofnac-green-900 text-ofnac-green-900 font-semibold" :
                    "border-ofnac-line text-ofnac-gray"
                  }`}
                >
                  <span className="font-serif text-base mr-1.5">{String(n).padStart(2, "0")}</span>
                  {["Type", "Faits", "Pièces", "Code"][n-1]}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h1 className="font-serif text-3xl text-ofnac-green-900 font-bold mb-2">De quoi s'agit-il ?</h1>
                <p className="text-sm text-ofnac-ink-soft mb-7">Sélectionnez le secteur et la région concernés par les faits.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <Field label="Secteur concerné">
                    <select
                      value={form.sector}
                      onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-sm bg-white"
                    >
                      <option value="">— Sélectionner —</option>
                      <option>Marchés publics</option>
                      <option>Foncier</option>
                      <option>Santé</option>
                      <option>Éducation</option>
                      <option>Douanes / Fiscalité</option>
                      <option>Autre</option>
                    </select>
                  </Field>
                  <Field label="Région">
                    <select
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                      className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-sm bg-white"
                    >
                      <option value="">— Sélectionner —</option>
                      <option>Dakar</option>
                      <option>Thiès</option>
                      <option>Saint-Louis</option>
                      <option>Ziguinchor</option>
                      <option>Diourbel</option>
                      <option>Tambacounda</option>
                      <option>Autre</option>
                    </select>
                  </Field>
                </div>
                <FormFooter
                  onBack={null}
                  onNext={() => setStep(2)}
                  nextDisabled={!form.sector || !form.region}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="font-serif text-3xl text-ofnac-green-900 font-bold mb-2">Que s'est-il passé ?</h1>
                <p className="text-sm text-ofnac-ink-soft mb-7">Soyez aussi précis que possible. Évitez d'inclure des éléments qui pourraient vous identifier.</p>
                <Field label="Description des faits">
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={6}
                    placeholder="Décrivez ce qui s'est passé, quand, où, qui était impliqué (sans vous nommer)..."
                    className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-sm bg-white resize-y"
                  />
                </Field>
                <FormFooter
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                  nextDisabled={form.description.length < 20}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="font-serif text-3xl text-ofnac-green-900 font-bold mb-2">Pièces justificatives</h1>
                <p className="text-sm text-ofnac-ink-soft mb-7">Optionnel. Les fichiers sont chiffrés côté client avant envoi.</p>
                <div className="border-2 border-dashed border-ofnac-line rounded-xl p-10 text-center bg-white mb-2">
                  <Upload className="mx-auto text-ofnac-green-700 mb-3" size={32} />
                  <div className="font-semibold mb-1">Glissez vos pièces justificatives ici</div>
                  <div className="text-xs text-ofnac-gray">PDF, JPG, PNG, MP4 — jusqu'à 50 Mo par fichier</div>
                  <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 bg-ofnac-green-50 text-ofnac-green-800 text-[11px] rounded-full font-medium">
                    <Lock size={10} /> Chiffrement appliqué côté client
                  </div>
                </div>
                <p className="text-xs text-ofnac-gray italic mb-7">
                  Démo : aucun fichier n'est réellement envoyé. Cliquez sur « Continuer » pour générer votre code de suivi.
                </p>
                <FormFooter
                  onBack={() => setStep(2)}
                  onNext={submit}
                  nextLabel="Soumettre mon signalement"
                />
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-ofnac-green-50 text-ofnac-green-700 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <h1 className="font-serif text-3xl text-ofnac-green-900 font-bold mb-3">Signalement enregistré.</h1>
                <p className="text-sm text-ofnac-ink-soft mb-8 max-w-md mx-auto">
                  Conservez précieusement ce code unique. Il vous permettra de suivre l'avancement de votre dossier sans révéler votre identité.
                </p>
                <div className="inline-block bg-ofnac-green-900 text-white rounded-xl p-6 mb-6">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ofnac-gold font-semibold mb-2">Votre code de suivi</div>
                  <div className="font-mono text-2xl font-bold tracking-wider mb-4">{generatedCode}</div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex items-center gap-2 text-xs text-ofnac-gold hover:underline"
                  >
                    <Copy size={12} />
                    {copied ? "Copié !" : "Copier le code"}
                  </button>
                </div>
                <div className="flex justify-center gap-3 flex-wrap">
                  <Link href="/suivre" className="btn-dark">Suivre mon dossier</Link>
                  <Link href="/" className="text-sm text-ofnac-ink-soft hover:underline px-5 py-3">Retour à l'accueil</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function Guarantee({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <li className="flex gap-3.5 pb-4 border-b border-white/10 last:border-0">
      <div className="w-8 h-8 bg-ofnac-gold/15 text-ofnac-gold rounded-md flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="text-sm">
        <strong className="block font-semibold mb-0.5">{title}</strong>
        <span className="text-xs text-white/65 leading-snug">{sub}</span>
      </div>
    </li>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">{label}</label>
      {children}
    </div>
  );
}

function FormFooter({
  onBack, onNext, nextDisabled, nextLabel,
}: { onBack: (() => void) | null; onNext: () => void; nextDisabled?: boolean; nextLabel?: string }) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-ofnac-line">
      {onBack ? (
        <button onClick={onBack} className="text-sm text-ofnac-ink-soft hover:underline">← Étape précédente</button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="bg-ofnac-green-900 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-ofnac-green-800 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel || "Continuer →"}
      </button>
    </div>
  );
}
