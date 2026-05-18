import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-ofnac-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-ofnac-gold text-ofnac-green-900 rounded-md flex items-center justify-center font-serif font-extrabold">O</div>
            <div className="font-serif font-semibold">OFNAC</div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Office National de Lutte contre la Fraude et la Corruption — Autorité administrative indépendante.
          </p>
        </div>
        <div>
          <div className="label-sm text-ofnac-gold mb-3">L'Office</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/office" className="hover:text-ofnac-gold">Présentation</Link></li>
            <li><Link href="/missions" className="hover:text-ofnac-gold">Missions</Link></li>
            <li><Link href="/presidence" className="hover:text-ofnac-gold">Présidence</Link></li>
            <li><Link href="/textes" className="hover:text-ofnac-gold">Cadre légal</Link></li>
          </ul>
        </div>
        <div>
          <div className="label-sm text-ofnac-gold mb-3">Démarches</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/signaler" className="hover:text-ofnac-gold">Signaler un fait</Link></li>
            <li><Link href="/patrimoine/login" className="hover:text-ofnac-gold">Déclarer son patrimoine</Link></li>
            <li><Link href="/suivre" className="hover:text-ofnac-gold">Suivre un dossier</Link></li>
            <li><Link href="/transparence" className="hover:text-ofnac-gold">Données ouvertes</Link></li>
          </ul>
        </div>
        <div>
          <div className="label-sm text-ofnac-gold mb-3">Nous joindre</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Av. Lamine Gueye X Faidherbe, Dakar</li>
            <li>BP 6816 — Dakar Plateau</li>
            <li>Numéro vert : <strong className="text-white">800 000 900</strong></li>
            <li>contact@ofnac.sn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/60">
          <div>© 2026 OFNAC — République du Sénégal · Tous droits réservés</div>
          <div className="flex gap-5 flex-wrap">
            <Link href="/mentions-legales" className="hover:text-ofnac-gold">Mentions légales</Link>
            <Link href="/accessibilite" className="hover:text-ofnac-gold">Accessibilité</Link>
            <Link href="/plan-du-site" className="hover:text-ofnac-gold">Plan du site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
