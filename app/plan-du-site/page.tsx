import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";

const sitemap = [
  {
    title: "L'institution",
    links: [
      { href: "/office", label: "Présentation de l'Office" },
      { href: "/missions", label: "Missions" },
      { href: "/presidence", label: "Présidence et Assemblée" },
      { href: "/textes", label: "Textes juridiques" },
    ],
  },
  {
    title: "Communication",
    links: [
      { href: "/actualites", label: "Actualités et communiqués" },
      { href: "/rapports", label: "Rapports et publications" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/contact", label: "Nous contacter" },
    ],
  },
  {
    title: "Démarches en ligne",
    links: [
      { href: "/signaler", label: "Signaler un fait de corruption" },
      { href: "/suivre", label: "Suivre un dossier" },
      { href: "/patrimoine/login", label: "Déclarer son patrimoine (espace assujetti)" },
    ],
  },
  {
    title: "Transparence et données",
    links: [
      { href: "/transparence", label: "Portail Open Data" },
    ],
  },
  {
    title: "Espace professionnel",
    links: [
      { href: "/agent/login", label: "Connexion agent OFNAC" },
      { href: "/patrimoine/login", label: "Connexion assujetti DDP" },
    ],
  },
  {
    title: "Informations légales",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/accessibilite", label: "Accessibilité" },
      { href: "/plan-du-site", label: "Plan du site" },
    ],
  },
];

export default function PlanDuSitePage() {
  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
            <div className="label-sm text-ofnac-gold mb-3">Navigation</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold mb-4">Plan du site.</h1>
            <p className="text-lg text-ofnac-ink-soft max-w-3xl">L'ensemble des pages et services accessibles sur le portail ofnac.sn.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {sitemap.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-lg text-ofnac-green-900 font-bold mb-3 pb-2 border-b border-ofnac-line">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ofnac-ink-soft hover:text-ofnac-green-700 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
