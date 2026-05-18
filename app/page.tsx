import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Building2, Users, FileText, Shield, FileSignature, Search, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <DemoBanner />
      <PublicHeader />

      <section className="relative bg-gradient-to-br from-ofnac-green-900 via-ofnac-green-800 to-ofnac-green-700 text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-ofnac-gold/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[380px] h-[380px] rounded-full bg-ofnac-green-700/40 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ofnac-gold/15 border border-ofnac-gold/30 rounded-full text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ofnac-gold font-semibold mb-5">
              <span className="w-1.5 h-1.5 bg-ofnac-gold rounded-full animate-pulse" />
              Portail officiel · sécurisé · accessible 24/7
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
              L'OFNAC,<br />
              <em className="text-ofnac-gold-soft font-medium">à votre service.</em>
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-7 max-w-xl">
              S'informer sur les missions de l'Office, signaler en toute confidentialité un fait de corruption, déclarer son patrimoine, suivre l'évolution d'un dossier — tout en un seul endroit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signaler" className="btn-primary">
                Déposer un signalement
                <ArrowRight size={16} />
              </Link>
              <Link href="/office" className="btn-secondary">Découvrir l'OFNAC</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ofnac-cream border-y border-ofnac-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-ofnac-line">
          <Stat val="2 437" label="Signalements 2025" />
          <Stat val="86%" label="Traités sous 90 j" />
          <Stat val="12 480" label="Déclarations patrimoine" />
          <Stat val="46/100" label="Score IPC Sénégal" />
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex justify-between items-baseline mb-8 flex-wrap gap-4">
            <div>
              <div className="label-sm text-ofnac-gold mb-1">Connaître l'OFNAC</div>
              <h2 className="font-serif text-3xl text-ofnac-green-900 font-bold">L'Office et ses missions</h2>
            </div>
            <Link href="/office" className="text-sm font-medium text-ofnac-green-700 hover:underline">
              Tout savoir sur l'OFNAC →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <ServiceCard
              icon={<Building2 size={20} />}
              title="Notre mandat"
              text="Autorité administrative indépendante, l'OFNAC prévient, détecte et enquête sur la fraude et la corruption. Cadre légal : lois 2012-30, 2024-06 et 2024-07."
              cta="En savoir plus"
              href="/missions"
              variant="institutional"
            />
            <ServiceCard
              icon={<Users size={20} />}
              title="Présidence & Assemblée"
              text="Découvrez les membres de l'Assemblée et la Présidence de l'Office, leurs biographies et leurs domaines d'expertise."
              cta="Voir les membres"
              href="/presidence"
              variant="institutional"
            />
            <ServiceCard
              icon={<FileText size={20} />}
              title="Rapports & publications"
              text="Rapports d'activité annuels, communiqués, études et recommandations publiés par l'Office depuis 2014."
              cta="Consulter"
              href="/rapports"
              variant="institutional"
            />
          </div>
        </div>
      </section>

      <section className="bg-ofnac-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex justify-between items-baseline mb-8 flex-wrap gap-4">
            <div>
              <div className="label-sm text-ofnac-gold mb-1">Agir avec l'OFNAC</div>
              <h2 className="font-serif text-3xl text-ofnac-green-900 font-bold">Vos démarches en ligne</h2>
            </div>
            <Link href="/transparence" className="text-sm font-medium text-ofnac-green-700 hover:underline">
              Voir toutes les démarches →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <ServiceCard
              icon={<Shield size={20} />}
              title="Signaler un fait"
              text="Dépôt 100 % anonyme. Code de suivi unique. Messagerie chiffrée avec l'enquêteur. Aucune information d'identité demandée."
              cta="Commencer un signalement"
              href="/signaler"
              variant="operational"
            />
            <ServiceCard
              icon={<FileSignature size={20} />}
              title="Déclarer mon patrimoine"
              text="Formulaire en ligne pour les personnes assujetties par la loi 2024-07. Signature électronique qualifiée, conservation sécurisée."
              cta="Accéder à mon espace"
              href="/patrimoine/login"
              variant="operational"
            />
            <ServiceCard
              icon={<Search size={20} />}
              title="Suivre un dossier"
              text="Avec votre code de suivi, consultez en temps réel l'état d'avancement de votre signalement, sans révéler votre identité."
              cta="Entrer mon code"
              href="/suivre"
              variant="operational"
            />
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}

function Stat({ val, label }: { val: string; label: string }) {
  return (
    <div className="text-center px-4">
      <div className="font-serif text-3xl lg:text-4xl text-ofnac-green-900 font-bold">{val}</div>
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-ofnac-ink-soft mt-2">{label}</div>
    </div>
  );
}

function ServiceCard({
  icon, title, text, cta, href, variant,
}: {
  icon: React.ReactNode; title: string; text: string; cta: string; href: string; variant: "institutional" | "operational";
}) {
  const isOp = variant === "operational";
  return (
    <Link
      href={href}
      className={`block p-6 rounded-xl border border-ofnac-line transition hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden ${
        isOp ? "bg-white" : "bg-ofnac-paper"
      }`}
    >
      <div className={`absolute left-0 top-0 w-[3px] h-full ${isOp ? "bg-ofnac-green-900" : "bg-ofnac-gold"}`} />
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3.5 ${
        isOp ? "bg-ofnac-gold text-ofnac-green-900" : "bg-ofnac-green-900 text-ofnac-gold"
      }`}>{icon}</div>
      <h3 className="font-serif text-lg text-ofnac-green-900 font-semibold mb-1.5">{title}</h3>
      <p className="text-sm text-ofnac-ink-soft leading-relaxed">{text}</p>
      <div className="mt-3 text-sm font-medium text-ofnac-green-700 flex items-center gap-1.5">
        {cta} <ArrowRight size={14} />
      </div>
    </Link>
  );
}
