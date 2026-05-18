import { DemoBanner } from "@/components/DemoBanner";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";

export function InstitutionalPage({
  label, title, lead, children,
}: { label: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <PublicHeader />
      <main className="bg-white">
        <div className="bg-ofnac-cream border-b border-ofnac-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
            <div className="label-sm text-ofnac-gold mb-3">{label}</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ofnac-green-900 font-bold leading-tight mb-4">{title}</h1>
            {lead && <p className="text-lg text-ofnac-ink-soft leading-relaxed max-w-3xl">{lead}</p>}
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 institutional-content">
          {children}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
