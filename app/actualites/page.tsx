import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { ACTUS } from "@/lib/actus";

export default function ActusPage() {
  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
            <div className="label-sm text-ofnac-gold mb-3">Actualités</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold mb-4">Communiqués et activités de l'Office.</h1>
            <p className="text-lg text-ofnac-ink-soft max-w-3xl">Suivez l'actualité institutionnelle de l'OFNAC : communiqués, rapports, événements, partenariats.</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-6">
          {ACTUS.map((a) => (
            <article key={a.id} className="border-b border-ofnac-line pb-6">
              <div className="flex gap-3 items-baseline text-xs mb-2">
                <span className="text-ofnac-gold uppercase tracking-[0.15em] font-semibold">{a.category}</span>
                <span className="text-ofnac-gray">·</span>
                <time className="text-ofnac-gray">{a.date}</time>
              </div>
              <Link href={`/actualites/${a.slug}`} className="block">
                <h2 className="font-serif text-2xl text-ofnac-green-900 font-bold mb-2 hover:text-ofnac-green-700">{a.title}</h2>
              </Link>
              <p className="text-ofnac-ink-soft leading-relaxed mb-2">{a.excerpt}</p>
              <Link href={`/actualites/${a.slug}`} className="text-sm font-medium text-ofnac-green-700 hover:underline">
                Lire la suite →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
