"use client";

import { useState } from "react";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { useToast } from "@/components/Toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const { show } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    show("Votre message a été envoyé. L'OFNAC vous répondra sous 48 heures ouvrées.");
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
            <div className="label-sm text-ofnac-gold mb-3">Contact</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold mb-4">Nous joindre.</h1>
            <p className="text-lg text-ofnac-ink-soft max-w-3xl">
              Pour toute demande administrative ou question générale, utilisez le formulaire ci-dessous ou nos coordonnées directes. Pour un signalement, utilisez impérativement <a href="/signaler" className="text-ofnac-green-700 underline font-medium">la page dédiée et sécurisée</a>.
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="card p-6 lg:p-8">
            <h2 className="font-serif text-xl text-ofnac-green-900 font-bold mb-5">Écrire à l'OFNAC</h2>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nom et prénom *">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3.5 py-2.5 border border-ofnac-line rounded-lg text-sm" />
                </Field>
                <Field label="Adresse e-mail *">
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3.5 py-2.5 border border-ofnac-line rounded-lg text-sm" />
                </Field>
              </div>
              <Field label="Sujet *">
                <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-3.5 py-2.5 border border-ofnac-line rounded-lg text-sm bg-white">
                  <option value="">— Sélectionner —</option>
                  <option>Demande d'information</option>
                  <option>Demande de presse</option>
                  <option>Partenariat institutionnel</option>
                  <option>Demande de rendez-vous</option>
                  <option>Autre</option>
                </select>
              </Field>
              <Field label="Votre message *">
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3.5 py-2.5 border border-ofnac-line rounded-lg text-sm resize-y" />
              </Field>
              <button type="submit" className="bg-ofnac-green-900 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-ofnac-green-800 flex items-center gap-2">
                <Send size={14} /> Envoyer mon message
              </button>
              {sent && <div className="text-sm text-ofnac-green-700 font-medium">✓ Message envoyé avec succès.</div>}
            </form>
          </div>

          <aside className="space-y-4">
            <InfoCard icon={<MapPin size={18} />} title="Siège" lines={["Av. Lamine Gueye X Faidherbe", "BP 6816 — Dakar Plateau", "République du Sénégal"]} />
            <InfoCard icon={<Phone size={18} />} title="Numéro vert" lines={["800 000 900", "Appel gratuit depuis tout le Sénégal"]} />
            <InfoCard icon={<Mail size={18} />} title="Adresse e-mail" lines={["contact@ofnac.sn"]} />
            <InfoCard icon={<Clock size={18} />} title="Horaires" lines={["Lundi – Vendredi", "8h00 – 17h00", "Hors jours fériés"]} />
          </aside>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">{label}</label>
      {children}
    </div>
  );
}

function InfoCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="card p-5">
      <div className="flex gap-3">
        <div className="w-9 h-9 bg-ofnac-green-50 text-ofnac-green-700 rounded-lg flex items-center justify-center flex-shrink-0">{icon}</div>
        <div className="text-sm">
          <div className="font-semibold text-ofnac-green-900 mb-1">{title}</div>
          {lines.map((l, i) => <div key={i} className="text-ofnac-ink-soft">{l}</div>)}
        </div>
      </div>
    </div>
  );
}
