import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Briefcase, Award, Scale, Users } from "lucide-react";

const MEMBERS = [
  { initials: "MK", name: "Moustapha Kâ",        role: "Président",                 since: "2024", expertise: "Magistrature · Droit pénal financier", bio: "Magistrat de carrière, ancien Procureur de la République, expert reconnu en lutte contre la criminalité économique et financière." },
  { initials: "FM", name: "Fatou Mbengue",       role: "Vice-Présidente",          since: "2024", expertise: "Droit public · Gouvernance",                  bio: "Professeure de droit public à l'UCAD, spécialiste de la gouvernance des institutions et du contrôle de l'action administrative." },
  { initials: "AS", name: "Amadou Sarr",         role: "Membre de l'Assemblée",    since: "2024", expertise: "Audit · Inspection des finances",            bio: "Inspecteur général d'État honoraire, 30 ans d'expérience en contrôle des finances publiques et audit des établissements publics." },
  { initials: "AN", name: "Aïssatou Ndiaye",     role: "Membre de l'Assemblée",    since: "2024", expertise: "Société civile · ONG",                        bio: "Ancienne directrice du Forum Civil, militante de longue date pour la transparence et la redevabilité au Sénégal." },
  { initials: "IF", name: "Ibrahima Fall",       role: "Membre de l'Assemblée",    since: "2024", expertise: "Magistrature · Cour suprême",                 bio: "Conseiller à la Cour suprême, expert en droit administratif et contentieux des marchés publics." },
  { initials: "MD", name: "Marième Diop",        role: "Membre de l'Assemblée",    since: "2024", expertise: "Économie · Lutte anti-blanchiment",          bio: "Économiste de formation, ancienne cadre de la CENTIF, spécialiste du blanchiment de capitaux et du financement du terrorisme." },
  { initials: "OB", name: "Ousmane Ba",          role: "Membre de l'Assemblée",    since: "2024", expertise: "Forces de sécurité · Investigation",         bio: "Ancien officier supérieur de gendarmerie, expert en investigation criminelle et coopération internationale." },
  { initials: "CD", name: "Cheikh Diop",         role: "Membre de l'Assemblée",    since: "2024", expertise: "Université · Sciences politiques",            bio: "Professeur de sciences politiques, chercheur sur la corruption en Afrique de l'Ouest et la sociologie des élites." },
];

export default function PresidencePage() {
  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
            <div className="label-sm text-ofnac-gold mb-3">Présidence</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold leading-tight mb-4">L'équipe dirigeante de l'OFNAC.</h1>
            <p className="text-lg text-ofnac-ink-soft leading-relaxed max-w-3xl">
              L'OFNAC est dirigé par un Président, une Vice-Présidente et une Assemblée de 8 membres, nommés par décret du Président de la République pour un mandat de cinq ans renouvelable.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MEMBERS.map((m, i) => (
              <div key={i} className="card p-5 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-ofnac-green-900 text-ofnac-gold rounded-xl flex items-center justify-center font-serif text-2xl font-bold mb-4">
                  {m.initials}
                </div>
                <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-ofnac-gold mb-1">{m.role}</div>
                <h3 className="font-serif text-lg text-ofnac-green-900 font-bold mb-2">{m.name}</h3>
                <p className="text-xs text-ofnac-ink-soft mb-3 leading-relaxed">{m.bio}</p>
                <div className="text-[11px] text-ofnac-gray border-t border-ofnac-paper pt-3 space-y-1">
                  <div className="flex items-center gap-1.5"><Briefcase size={11} />{m.expertise}</div>
                  <div className="flex items-center gap-1.5"><Award size={11} />En poste depuis {m.since}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            <div className="card p-6">
              <Users className="text-ofnac-green-700 mb-3" size={20} />
              <h3 className="font-serif text-lg text-ofnac-green-900 font-bold mb-2">10 membres</h3>
              <p className="text-sm text-ofnac-ink-soft">Composition de l'Assemblée, garantissant la diversité et la complémentarité des expertises.</p>
            </div>
            <div className="card p-6">
              <Scale className="text-ofnac-green-700 mb-3" size={20} />
              <h3 className="font-serif text-lg text-ofnac-green-900 font-bold mb-2">5 ans renouvelables</h3>
              <p className="text-sm text-ofnac-ink-soft">Durée des mandats, allongée par la loi 2024-06 pour garantir la stabilité institutionnelle.</p>
            </div>
            <div className="card p-6">
              <Award className="text-ofnac-green-700 mb-3" size={20} />
              <h3 className="font-serif text-lg text-ofnac-green-900 font-bold mb-2">Indépendance totale</h3>
              <p className="text-sm text-ofnac-ink-soft">Autonomie financière et de décision, garantie par le statut d'autorité administrative indépendante.</p>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
