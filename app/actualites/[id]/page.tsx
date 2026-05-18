import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { ACTUS } from "@/lib/actus";
import { ArrowLeft } from "lucide-react";

export default function ActuDetailPage({ params }: { params: { id: string } }) {
  const actu = ACTUS.find((a) => a.slug === params.id || a.id === params.id);
  if (!actu) notFound();

  const others = ACTUS.filter((a) => a.id !== actu.id).slice(0, 3);

  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
            <Link href="/actualites" className="inline-flex items-center gap-2 text-sm text-ofnac-green-700 hover:underline mb-5">
              <ArrowLeft size={14} /> Retour aux actualités
            </Link>
            <div className="flex gap-3 items-baseline text-xs mb-3">
              <span className="text-ofnac-gold uppercase tracking-[0.15em] font-semibold">{actu.category}</span>
              <span className="text-ofnac-gray">·</span>
              <time className="text-ofnac-gray">{actu.date}</time>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ofnac-green-900 font-bold leading-tight">{actu.title}</h1>
            <p className="text-lg text-ofnac-ink-soft leading-relaxed mt-4">{actu.excerpt}</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-5 text-ofnac-ink-soft leading-relaxed text-base sm:text-lg">
          {actu.body.map((p, i) => <p key={i}>{p}</p>)}
        </article>
        {others.length > 0 && (
          <div className="border-t border-ofnac-line">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
              <h3 className="font-serif text-xl text-ofnac-green-900 font-bold mb-5">À lire également</h3>
              <div className="grid sm:grid-cols-3 gap-5">
                {others.map((o) => (
                  <Link key={o.id} href={`/actualites/${o.slug}`} className="card p-5 hover:shadow-md transition">
                    <div className="text-[10px] text-ofnac-gold uppercase tracking-[0.15em] font-semibold mb-1">{o.category}</div>
                    <div className="font-serif text-base text-ofnac-green-900 font-semibold leading-snug">{o.title}</div>
                    <div className="text-xs text-ofnac-gray mt-2">{o.date}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
