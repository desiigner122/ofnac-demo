"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { useToast } from "@/components/Toast";
import { ArrowLeft, Send, Lock, Paperclip, MapPin, Calendar, Coins, UserCircle, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { MOCK_DOSSIERS, STATUS_STYLES, formatDate, formatFCFA, type DossierMock } from "@/lib/mockData";

type Message = { from: "agent" | "signalant"; text: string; date: string };

export default function DossierDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { show } = useToast();
  const id = params?.id as string;

  const [dossier, setDossier] = useState<DossierMock | null>(null);
  const [currentStatus, setCurrentStatus] = useState<DossierMock["status"] | null>(null);
  const [extraTimeline, setExtraTimeline] = useState<{ date: string; event: string; actor: string }[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { from: "agent",      text: "Bonjour. Pour avancer sur votre signalement, pourriez-vous nous transmettre tout document complémentaire (factures, contrats, correspondances) qui étayerait les faits relatés ?", date: "2026-05-12 14:23" },
    { from: "signalant", text: "Bonjour. Je joins à ce message deux factures de sous-traitance qui montrent les écarts de prix.", date: "2026-05-15 09:47" },
    { from: "agent",      text: "Merci, j'accuse réception des pièces. Je reviens vers vous sous quelques jours après examen.", date: "2026-05-15 11:02" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    let found = MOCK_DOSSIERS.find((d) => d.id === id);
    if (!found) {
      try {
        const all = JSON.parse(localStorage.getItem("ofnac_dossiers") || "[]");
        const u = all.find((x: any) => x.code === id);
        if (u) {
          found = {
            id: u.code,
            title: `${u.sector} — ${u.description.slice(0, 60)}${u.description.length > 60 ? "..." : ""}`,
            sector: u.sector,
            region: u.region,
            status: "Investigation",
            priority: "high",
            receivedAt: u.submittedAt.slice(0, 10),
            assignedTo: "Non affecté",
            description: u.description,
            timeline: u.timeline.map((t: any) => ({ ...t, date: t.date.slice(0, 10) })),
          };
        }
      } catch {}
    }
    setDossier(found || null);
    if (found) setCurrentStatus(found.status);
  }, [id]);

  function changeStatus(newStatus: DossierMock["status"], message: string) {
    setCurrentStatus(newStatus);
    const today = new Date().toISOString().slice(0, 10);
    setExtraTimeline(prev => [...prev, { date: today, event: message, actor: "M. Kâ · Président" }]);
    show(message + " — Statut mis à jour : " + newStatus);
  }

  function sendMessage() {
    if (!newMessage.trim()) return;
    const now = new Date();
    const dateStr = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;
    setMessages([...messages, { from: "agent", text: newMessage, date: dateStr }]);
    setNewMessage("");
    show("Message envoyé · chiffré bout-en-bout", "success");
  }

  if (!dossier) {
    return (
      <>
        <DemoBanner />
        <AgentShell title="Dossier introuvable" breadcrumb="Signalements">
          <div className="card p-12 text-center">
            <AlertCircle className="mx-auto text-ofnac-gray mb-3" size={32} />
            <h2 className="font-serif text-lg text-ofnac-green-900 mb-2">Aucun dossier trouvé pour #{id}</h2>
            <p className="text-sm text-ofnac-ink-soft mb-5">Le dossier demandé n'existe pas ou a été archivé.</p>
            <Link href="/agent/dossiers" className="inline-flex items-center gap-2 text-sm font-medium text-ofnac-green-700 hover:underline">
              <ArrowLeft size={14} /> Retour à la liste
            </Link>
          </div>
        </AgentShell>
      </>
    );
  }

  const styles = STATUS_STYLES[currentStatus || dossier.status];
  const fullTimeline = [...dossier.timeline, ...extraTimeline];

  return (
    <>
      <DemoBanner />
      <AgentShell title={`Dossier #${dossier.id}`} breadcrumb={`Signalements › ${dossier.id}`}>
        <Link href="/agent/dossiers" className="inline-flex items-center gap-2 text-sm text-ofnac-green-700 hover:underline mb-5">
          <ArrowLeft size={14} /> Retour à la liste des dossiers
        </Link>

        {/* Header card */}
        <div className="card mb-5 overflow-hidden">
          <div className="bg-ofnac-green-900 text-white p-6">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ofnac-gold font-semibold mb-1.5">Dossier</div>
                <h2 className="font-serif text-2xl font-bold">{dossier.title}</h2>
              </div>
              <span className={`text-[11px] px-3 py-1.5 rounded-full font-semibold ${styles.bg} ${styles.text}`}>{currentStatus || dossier.status}</span>
            </div>
            <div className="grid sm:grid-cols-4 gap-5 pt-4 border-t border-white/10 text-sm">
              <Info icon={<MapPin size={13} />} label="Région" value={dossier.region} />
              <Info icon={<Calendar size={13} />} label="Reçu le" value={formatDate(dossier.receivedAt)} />
              <Info icon={<UserCircle size={13} />} label="Affecté à" value={dossier.assignedTo} />
              {dossier.amount && <Info icon={<Coins size={13} />} label="Montant présumé" value={formatFCFA(dossier.amount)} />}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-5">
          {/* Left: details + messaging */}
          <div className="space-y-5">
            <div className="card p-6">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold mb-3">Description du signalement</h3>
              <p className="text-sm text-ofnac-ink-soft leading-relaxed">{dossier.description}</p>
              <div className="mt-4 pt-4 border-t border-ofnac-line text-xs text-ofnac-gray italic">
                Signalant : anonyme · Communication possible uniquement via la messagerie chiffrée ci-dessous.
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-ofnac-line flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Messagerie sécurisée</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ofnac-green-50 text-ofnac-green-700 text-[10px] rounded-full font-medium">
                    <Lock size={10} /> Chiffré E2E
                  </span>
                </div>
                <span className="text-xs text-ofnac-gray">{messages.length} messages</span>
              </div>

              <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto bg-ofnac-paper">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === "agent" ? "bg-ofnac-green-900 text-white" : "bg-white border border-ofnac-line text-ofnac-ink"
                    }`}>
                      <div className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${m.from === "agent" ? "text-ofnac-gold" : "text-ofnac-gray"}`}>
                        {m.from === "agent" ? "Vous · Enquêteur" : "Signalant (anonyme)"}
                      </div>
                      <div className="leading-relaxed">{m.text}</div>
                      <div className={`text-[10px] mt-1.5 ${m.from === "agent" ? "text-white/60" : "text-ofnac-gray"}`}>{m.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-ofnac-line bg-white">
                <div className="flex gap-2 items-end">
                  <button onClick={() => show("Sélection de fichier — démo")} className="p-2.5 text-ofnac-gray hover:text-ofnac-green-700 hover:bg-ofnac-paper rounded-lg" title="Joindre un fichier">
                    <Paperclip size={16} />
                  </button>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    rows={2}
                    placeholder="Écrire un message au signalant... (chiffré E2E)"
                    className="flex-1 resize-none px-3 py-2 border border-ofnac-line rounded-lg text-sm"
                  />
                  <button onClick={sendMessage} disabled={!newMessage.trim()} className="bg-ofnac-green-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-ofnac-green-800 disabled:opacity-40 flex items-center gap-2">
                    <Send size={14} /> Envoyer
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold mb-4">Pièces du dossier</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <PieceCard name="Facture sous-traitance n°2024-1742.pdf" size="1.2 Mo" date="2026-05-15" />
                <PieceCard name="Facture sous-traitance n°2024-1893.pdf" size="0.8 Mo" date="2026-05-15" />
                <PieceCard name="Rapport d'audit préliminaire.docx" size="2.4 Mo" date="2026-05-17" interne />
                <PieceCard name="Procès-verbal d'audition.pdf" size="0.4 Mo" date="2026-05-17" interne />
              </div>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="card sticky top-5 self-start">
            <div className="px-5 py-4 border-b border-ofnac-line">
              <h3 className="font-serif text-base text-ofnac-green-900 font-semibold">Chronologie du dossier</h3>
            </div>
            <div className="p-5">
              <div className="relative space-y-5">
                {fullTimeline.slice().reverse().map((t, i, arr) => (
                  <div key={i} className="flex gap-3 relative">
                    {i < arr.length - 1 && <div className="absolute left-[11px] top-7 w-0.5 h-full bg-ofnac-line" />}
                    <div className="w-6 h-6 bg-ofnac-green-50 text-ofnac-green-700 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2 border-white">
                      <CheckCircle2 size={12} />
                    </div>
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="text-sm font-medium text-ofnac-ink leading-snug">{t.event}</div>
                      <div className="text-[11px] text-ofnac-gray mt-1 flex items-center gap-1.5">
                        <Clock size={10} /> {formatDate(t.date)} · {t.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-ofnac-line space-y-2">
                <button
                  onClick={() => changeStatus("Au Parquet", "Dossier transmis au Procureur de la République")}
                  disabled={currentStatus === "Au Parquet"}
                  className="w-full bg-ofnac-green-900 text-white py-2.5 rounded-lg text-xs font-semibold hover:bg-ofnac-green-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Transmettre au Parquet
                </button>
                <button
                  onClick={() => changeStatus("Audit", "Audit comptable et financier déclenché")}
                  disabled={currentStatus === "Audit"}
                  className="w-full border border-ofnac-line text-ofnac-ink py-2.5 rounded-lg text-xs font-semibold hover:bg-ofnac-paper disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Déclencher un audit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Confirmer le classement sans suite de ce dossier ?")) {
                      changeStatus("Classé", "Classement sans suite — éléments insuffisants");
                    }
                  }}
                  disabled={currentStatus === "Classé"}
                  className="w-full text-ofnac-gray text-xs hover:text-ofnac-ink py-1.5 disabled:opacity-40"
                >
                  Classer sans suite
                </button>
              </div>
            </div>
          </div>
        </div>
      </AgentShell>
    </>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-white/60 font-semibold mb-1">{icon} {label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function PieceCard({ name, size, date, interne }: { name: string; size: string; date: string; interne?: boolean }) {
  return (
    <div className="flex gap-3 p-3 border border-ofnac-line rounded-lg hover:bg-ofnac-paper cursor-pointer">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${interne ? "bg-amber-50 text-amber-700" : "bg-ofnac-green-50 text-ofnac-green-700"}`}>
        <FileText size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-ofnac-ink truncate">{name}</div>
        <div className="text-[10px] text-ofnac-gray">{size} · {formatDate(date)}{interne ? " · Document interne" : ""}</div>
      </div>
    </div>
  );
}
