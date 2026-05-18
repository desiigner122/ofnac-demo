"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Shield, Menu, X, ChevronDown, LogIn, FileSignature, Search, User, LogOut, LayoutDashboard } from "lucide-react";
import { getSession, logout } from "@/lib/auth";

const institutionalLinks = [
  { href: "/", label: "Accueil" },
  { href: "/office", label: "L'Office" },
  { href: "/missions", label: "Missions" },
  { href: "/presidence", label: "Présidence" },
  { href: "/actualites", label: "Actualités" },
  { href: "/rapports", label: "Rapports" },
  { href: "/textes", label: "Textes" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const [session, setSession] = useState<{ role: string | null; name: string } | null>(null);
  const proRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSession(getSession());
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (proRef.current && !proRef.current.contains(e.target as Node)) setProOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function handleLogout() {
    logout();
    setSession(null);
    setProOpen(false);
    router.push("/");
  }

  return (
    <div className="bg-ofnac-green-900 relative">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center text-white border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-ofnac-gold text-ofnac-green-900 rounded-md flex items-center justify-center font-serif font-extrabold text-lg sm:text-xl flex-shrink-0">O</div>
          <div className="min-w-0">
            <div className="font-serif text-sm sm:text-base font-semibold leading-tight">OFNAC</div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-ofnac-gold-soft mt-0.5 truncate">
              <span className="hidden sm:inline">République du Sénégal — </span>Office National de Lutte contre la Fraude et la Corruption
            </div>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-4 text-xs text-white/70 flex-shrink-0">
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/newsletter" className="hover:text-white">Newsletter</Link>
          <span className="px-2.5 py-1 border border-white/25 rounded-full text-[10px]">FR · WO · EN</span>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop nav */}
      <nav className="bg-ofnac-green-800 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-wrap">
            {institutionalLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium py-3.5 px-4 border-b-2 transition ${
                    active ? "text-ofnac-gold border-ofnac-gold" : "text-white/85 border-transparent hover:text-ofnac-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2 py-2">
            <Link href="/suivre" className="text-xs text-white/90 px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white/5">
              Suivre un dossier
            </Link>

            {/* Espace pro dropdown */}
            <div className="relative" ref={proRef}>
              {session?.role ? (
                <button
                  onClick={() => setProOpen(!proOpen)}
                  className="flex items-center gap-2 text-xs text-white px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/5"
                >
                  <div className="w-5 h-5 bg-ofnac-gold text-ofnac-green-900 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {session.name.split(" ").map(s => s[0]).join("")}
                  </div>
                  <span>{session.name}</span>
                  <ChevronDown size={12} className={proOpen ? "rotate-180 transition" : "transition"} />
                </button>
              ) : (
                <button
                  onClick={() => setProOpen(!proOpen)}
                  className="flex items-center gap-1.5 text-xs text-white px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/5"
                >
                  <LogIn size={12} />
                  Espace pro
                  <ChevronDown size={11} className={proOpen ? "rotate-180 transition" : "transition"} />
                </button>
              )}

              {proOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-ofnac-line z-50 overflow-hidden">
                  {session?.role === "agent" ? (
                    <>
                      <Link href="/agent/dashboard" onClick={() => setProOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper border-b border-ofnac-line">
                        <LayoutDashboard size={15} className="text-ofnac-green-700" />
                        <div>
                          <div className="text-sm font-medium text-ofnac-ink">Tableau de bord</div>
                          <div className="text-[11px] text-ofnac-gray">Espace agent OFNAC</div>
                        </div>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper text-left">
                        <LogOut size={15} className="text-ofnac-gray" />
                        <span className="text-sm text-ofnac-ink-soft">Se déconnecter</span>
                      </button>
                    </>
                  ) : session?.role === "assujetti" ? (
                    <>
                      <Link href="/patrimoine/declaration" onClick={() => setProOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper border-b border-ofnac-line">
                        <FileSignature size={15} className="text-ofnac-green-700" />
                        <div>
                          <div className="text-sm font-medium text-ofnac-ink">Ma déclaration</div>
                          <div className="text-[11px] text-ofnac-gray">Espace assujetti DDP</div>
                        </div>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper text-left">
                        <LogOut size={15} className="text-ofnac-gray" />
                        <span className="text-sm text-ofnac-ink-soft">Se déconnecter</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-ofnac-line bg-ofnac-cream">
                        <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-ofnac-gray">Espace professionnel</div>
                        <div className="text-xs text-ofnac-ink-soft mt-0.5">Accès réservé aux comptes habilités</div>
                      </div>
                      <Link href="/agent/login" onClick={() => setProOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper border-b border-ofnac-line">
                        <Shield size={15} className="text-ofnac-green-700" />
                        <div>
                          <div className="text-sm font-medium text-ofnac-ink">Espace agent OFNAC</div>
                          <div className="text-[11px] text-ofnac-gray">Investigations, dashboard</div>
                        </div>
                      </Link>
                      <Link href="/patrimoine/login" onClick={() => setProOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper border-b border-ofnac-line">
                        <FileSignature size={15} className="text-ofnac-gold" />
                        <div>
                          <div className="text-sm font-medium text-ofnac-ink">Espace assujetti DDP</div>
                          <div className="text-[11px] text-ofnac-gray">Déclaration de patrimoine</div>
                        </div>
                      </Link>
                      <Link href="/suivre" onClick={() => setProOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-ofnac-paper">
                        <Search size={15} className="text-ofnac-ink-soft" />
                        <div>
                          <div className="text-sm font-medium text-ofnac-ink">Suivi anonyme</div>
                          <div className="text-[11px] text-ofnac-gray">Avec un code de suivi</div>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link href="/signaler" className="text-xs font-semibold bg-ofnac-gold text-ofnac-green-900 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 hover:brightness-95">
              <Shield size={12} />
              Signaler
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-ofnac-green-800 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {institutionalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm ${
                  pathname === link.href ? "bg-ofnac-green-900 text-ofnac-gold font-semibold" : "text-white/85"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 px-4 py-3 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.15em] text-ofnac-gold font-semibold mb-2 px-3">Démarches</div>
            <Link href="/signaler" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 bg-ofnac-gold text-ofnac-green-900 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Shield size={14} /> Signaler un fait
            </Link>
            <Link href="/suivre" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 bg-white/5 text-white rounded-lg text-sm flex items-center gap-2">
              <Search size={14} /> Suivre un dossier
            </Link>
          </div>
          <div className="border-t border-white/10 px-4 py-3 space-y-2 pb-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-ofnac-gold font-semibold mb-2 px-3">Espace professionnel</div>
            {session?.role === "agent" ? (
              <>
                <Link href="/agent/dashboard" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 bg-white/5 text-white rounded-lg text-sm flex items-center gap-2">
                  <LayoutDashboard size={14} /> Tableau de bord ({session.name})
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left py-2.5 px-3 text-white/70 rounded-lg text-sm flex items-center gap-2">
                  <LogOut size={14} /> Se déconnecter
                </button>
              </>
            ) : session?.role === "assujetti" ? (
              <>
                <Link href="/patrimoine/declaration" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 bg-white/5 text-white rounded-lg text-sm flex items-center gap-2">
                  <FileSignature size={14} /> Ma déclaration ({session.name})
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left py-2.5 px-3 text-white/70 rounded-lg text-sm flex items-center gap-2">
                  <LogOut size={14} /> Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link href="/agent/login" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 bg-white/5 text-white rounded-lg text-sm flex items-center gap-2">
                  <Shield size={14} /> Connexion agent OFNAC
                </Link>
                <Link href="/patrimoine/login" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 bg-white/5 text-white rounded-lg text-sm flex items-center gap-2">
                  <FileSignature size={14} /> Connexion assujetti DDP
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
