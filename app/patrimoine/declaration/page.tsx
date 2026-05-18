"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { useToast } from "@/components/Toast";
import { getSession, logout } from "@/lib/auth";
import { Home, Building, Plus, CheckCircle2, Smartphone, Key, LogOut } from "lucide-react";

const steps = [
  { label: "Identité & fonction", done: true },
  { label: "Composition familiale", done: true },
  { label: "Patrimoine immobilier", active: true },
  { label: "Patrimoine mobilier" },
  { label: "Revenus & dettes" },
  { label: "Activités annexes" },
  { label: "Signature électronique" },
];

export default function DeclarationPage() {
  const router = useRouter();
  const { show } = useToast();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "assujetti") {
      router.replace("/patrimoine/login");
      return;
    }
    setUser({ name: s.name });
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <>
      <DemoBanner />
      <main className="min-h-screen bg-ofnac-paper">
        <div className="bg-white border-b border-ofnac-line">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center flex-wrap gap-3">
            <div className="text-xs text-ofnac-gray">
              <Link href="/" className="text-ofnac-green-700 hover:underline">Accueil</Link> ›{" "}
              <Link href="/patrimoine/login" className="text-ofnac-green-700 hover:underline">Espace assujetti</Link> ›{" "}
              <span className="text-ofnac-ink font-medium">Millésime 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-ofnac-green-50 rounded-full text-xs text-ofnac-green-800 font-semibold">
                <span className="w-2 h-2 bg-ofnac-green-700 rounded-full" />
                Brouillon enregistré · {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </div>
              <span className="text-xs text-ofnac-ink-soft">{user?.name}</span>
              <button onClick={() => { logout(); router.push("/"); }} className="text-ofnac-gray hover:text-ofnac-green-900" title="Déconnexion">
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[280px_1fr] gap-10">
          <nav className="lg:sticky lg:top-6 lg:self-start">
            <h4 className="font-serif text-base text-ofnac-green-900 font-semibold mb-4">Étapes de la déclaration</h4>
            <ol className="space-y-0">
              {steps.map((s, i) => (
                <li key={i} className={`relative pl-9 py-3 border-l-2 ml-3 text-sm ${
                  s.active ? "border-ofnac-line text-ofnac-green-900 font-semibold" :
                  s.done ? "border-ofnac-green-700 text-ofnac-green-700" :
                  "border-ofnac-line text-ofnac-ink-soft"
                }`}>
                  <span className={`absolute -left-[15px] top-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-semibold ${
                    s.active ? "bg-ofnac-green-900 text-ofnac-gold border border-ofnac-green-900" :
                    s.done ? "bg-ofnac-green-700 text-white border border-ofnac-green-700" :
                    "bg-white text-ofnac-gray border border-ofnac-line"
                  }`}>
                    {s.done ? "✓" : String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </li>
              ))}
            </ol>
          </nav>

          <div className="card p-9">
            <h2 className="font-serif text-3xl text-ofnac-green-900 font-bold mb-2">Patrimoine immobilier</h2>
            <p className="text-sm text-ofnac-ink-soft mb-6">Déclarez l'ensemble des biens immobiliers détenus directement ou indirectement par vous, votre conjoint(e) ou vos enfants mineurs.</p>

            <div className="bg-ofnac-cream border-l-4 border-ofnac-gold rounded p-4 mb-7 text-sm text-ofnac-ink-soft leading-relaxed">
              <strong className="text-ofnac-ink">Article 4 de la loi 2024-07</strong> — Toute omission ou déclaration incomplète est passible des sanctions prévues. Les données sont conservées de manière chiffrée et ne peuvent être consultées que par les agents habilités de l'OFNAC.
            </div>

            <AssetSection
              icon={<Home size={16} />}
              title="Résidence principale"
              subtitle="Dakar · Sicap Liberté 6"
              amount="85 000 000 FCFA"
              rows={[
                { lbl1: "Type de bien", val1: "Appartement F4", lbl2: "Mode d'acquisition", val2: "Achat — 2018", amt: "85 000 000" },
                { lbl1: "Quote-part détenue", val1: "100 %", lbl2: "Titre foncier", val2: "TF n° 12 845/DG", amt: "Vérifié" },
              ]}
            />
            <AssetSection
              icon={<Building size={16} />}
              title="Résidence secondaire"
              subtitle="Saly · Mbour"
              amount="42 000 000 FCFA"
            />
            <AssetSection
              icon={<Plus size={16} />}
              title="Ajouter un bien immobilier"
              subtitle="Terrain, parts de SCI, bien à l'étranger..."
              amount="+ Ajouter"
              addButton
              onClick={() => show("Formulaire d'ajout de bien — disponible dans la version complète")}
            />

            <div className="bg-gradient-to-br from-ofnac-green-50 to-ofnac-cream rounded-xl p-6 mt-7">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-ofnac-green-800 mb-2">Étape finale</div>
              <h4 className="font-serif text-lg text-ofnac-green-900 font-bold mb-1.5">Signature électronique qualifiée</h4>
              <p className="text-sm text-ofnac-ink-soft leading-relaxed mb-4">
                Une fois toutes les sections complétées, signez votre déclaration avec votre certificat eIDAS-compatible ou par OTP SMS sécurisé. L'horodatage qualifié garantit la non-répudiation.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <button
                  onClick={() => {
                    setSigning(true);
                    setTimeout(() => {
                      setSigning(false);
                      setSigned(true);
                      show("Déclaration signée avec votre certificat eIDAS. Horodatage qualifié appliqué.");
                    }, 1500);
                  }}
                  disabled={signing || signed}
                  className="bg-ofnac-green-900 text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-ofnac-green-800 disabled:opacity-50"
                >
                  <Key size={13} /> {signing ? "Signature en cours…" : signed ? "✓ Signée" : "Signer avec mon certificat"}
                </button>
                <button
                  onClick={() => {
                    const code = prompt("Code OTP reçu par SMS (pour la démo : 123456) :");
                    if (code === "123456") {
                      setSigned(true);
                      show("Déclaration signée par OTP. Récépissé envoyé par e-mail.");
                    } else if (code !== null) {
                      show("Code OTP invalide.", "error");
                    }
                  }}
                  disabled={signed}
                  className="bg-white border border-ofnac-line px-4 py-2.5 rounded-lg text-xs font-semibold text-ofnac-ink flex items-center gap-2 hover:bg-ofnac-paper disabled:opacity-50"
                >
                  <Smartphone size={13} /> Signer par OTP SMS
                </button>
                {signed && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-ofnac-green-700 font-semibold">
                    <CheckCircle2 size={14} /> Déclaration validée
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function AssetSection({
  icon, title, subtitle, amount, rows, addButton, onClick,
}: {
  icon: React.ReactNode; title: string; subtitle: string; amount: string;
  rows?: { lbl1: string; val1: string; lbl2: string; val2: string; amt: string }[];
  addButton?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className={`border border-ofnac-line rounded-xl mb-3.5 overflow-hidden ${addButton ? "cursor-pointer hover:shadow-md transition" : ""}`} onClick={addButton ? onClick : undefined}>
      <div className="px-5 py-4 bg-ofnac-paper flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${addButton ? "bg-ofnac-gold text-ofnac-green-900" : "bg-ofnac-green-900 text-ofnac-gold"}`}>
            {icon}
          </div>
          <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-[11px] text-ofnac-gray">{subtitle}</div>
          </div>
        </div>
        <div className={`font-mono text-sm font-semibold ${addButton ? "text-ofnac-green-700" : "text-ofnac-green-800"}`}>{amount}</div>
      </div>
      {rows && (
        <div className="px-5 py-4 border-t border-ofnac-line">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_140px] gap-3 py-2.5 border-b border-ofnac-paper last:border-0 text-sm">
              <div><div className="text-[11px] text-ofnac-ink-soft">{r.lbl1}</div><div className="font-medium">{r.val1}</div></div>
              <div><div className="text-[11px] text-ofnac-ink-soft">{r.lbl2}</div><div className="font-medium">{r.val2}</div></div>
              <div className="font-mono text-sm text-right font-semibold text-ofnac-green-800">{r.amt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
