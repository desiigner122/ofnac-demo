"use client";

import { useState } from "react";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useToast } from "@/components/Toast";
import { Mail, CheckCircle2 } from "lucide-react";

export default function NewsletterPage() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [topics, setTopics] = useState<string[]>(["actualites", "rapports"]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    show("Inscription confirmée. Un e-mail de bienvenue vous a été envoyé.");
    setSubscribed(true);
  }

  function toggle(t: string) {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
            <div className="label-sm text-ofnac-gold mb-3">Newsletter</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold mb-4">Restez informé de l'actualité de l'OFNAC.</h1>
            <p className="text-lg text-ofnac-ink-soft max-w-3xl">Recevez par e-mail les communiqués officiels, les publications de rapports et les invitations aux événements de l'Office.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          {subscribed ? (
            <div className="card p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 bg-ofnac-green-50 text-ofnac-green-700 rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-serif text-2xl text-ofnac-green-900 font-bold mb-2">Inscription confirmée.</h2>
              <p className="text-ofnac-ink-soft">Un e-mail de bienvenue a été envoyé à <strong>{email}</strong>. Vous pouvez à tout moment vous désinscrire via le lien présent en bas de chaque message.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="card p-6 lg:p-8 space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">Votre adresse e-mail *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ofnac-gray" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@adresse.sn"
                    className="w-full pl-10 pr-3.5 py-3 border border-ofnac-line rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">Vos centres d'intérêt</label>
                <div className="space-y-2">
                  {[
                    { k: "actualites", l: "Actualités & communiqués officiels" },
                    { k: "rapports",   l: "Publications de rapports et études" },
                    { k: "evenements", l: "Invitations aux événements de l'Office" },
                    { k: "transparence", l: "Mises à jour Open Data" },
                  ].map((t) => (
                    <label key={t.k} className="flex items-center gap-3 px-4 py-3 bg-ofnac-paper rounded-lg cursor-pointer hover:bg-ofnac-cream">
                      <input type="checkbox" checked={topics.includes(t.k)} onChange={() => toggle(t.k)} className="rounded" />
                      <span className="text-sm">{t.l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-ofnac-gray italic leading-relaxed">
                En vous inscrivant, vous acceptez de recevoir des e-mails de l'OFNAC. Vos données ne seront jamais cédées à des tiers et sont conservées conformément à la loi 2008-12.
              </div>

              <button type="submit" className="w-full bg-ofnac-green-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-ofnac-green-800">
                M'inscrire à la newsletter
              </button>
            </form>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
