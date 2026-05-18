"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Shield, FileSignature, Search, BarChart3, Map, FileText, Users, Settings, LogOut, Menu, X, ArrowLeft } from "lucide-react";
import { getSession, logout } from "@/lib/auth";

const navItems = [
  { section: "Pilotage", items: [
    { href: "/agent/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { href: "/agent/dossiers", icon: Shield, label: "Signalements", badge: "23" },
    { href: "/agent/patrimoine", icon: FileSignature, label: "Déclarations patrimoine" },
    { href: "/agent/investigations", icon: Search, label: "Investigations" },
  ]},
  { section: "Analyse", items: [
    { href: "/agent/stats", icon: BarChart3, label: "Statistiques" },
    { href: "/agent/cartographie", icon: Map, label: "Cartographie" },
    { href: "/agent/rapports", icon: FileText, label: "Rapports" },
  ]},
  { section: "Administration", items: [
    { href: "/agent/utilisateurs", icon: Users, label: "Utilisateurs" },
    { href: "/agent/parametres", icon: Settings, label: "Paramètres" },
  ]},
];

export function AgentShell({ children, title, breadcrumb }: { children: React.ReactNode; title: string; breadcrumb: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [ready, setReady] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "agent") {
      router.replace("/agent/login");
      return;
    }
    setUser({ name: session.name });
    setReady(true);
  }, [router]);

  // close mobile nav on route change
  useEffect(() => { setMobileNavOpen(false); }, [pathname]);

  if (!ready) return null;

  const sidebarContent = (
    <>
      <div className="px-6 pb-5 border-b border-ofnac-line">
        <Link href="/agent/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-ofnac-green-900 text-ofnac-gold rounded-md flex items-center justify-center font-serif font-extrabold">O</div>
          <div>
            <div className="font-serif font-semibold text-sm text-ofnac-green-900">OFNAC</div>
            <div className="text-[9px] uppercase tracking-[0.15em] text-ofnac-gray">Espace agent</div>
          </div>
        </Link>
      </div>

      {navItems.map((section) => (
        <div key={section.section} className="py-4">
          <div className="px-6 pb-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-ofnac-gray">{section.section}</div>
          {section.items.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-2.5 text-sm relative ${
                  active ? "text-ofnac-green-900 font-semibold bg-ofnac-green-50" : "text-ofnac-ink-soft hover:bg-ofnac-paper"
                }`}
              >
                {active && <div className="absolute left-0 top-0 w-[3px] h-full bg-ofnac-green-900" />}
                <Icon size={15} />
                {item.label}
                {item.badge && <span className="ml-auto text-[10px] font-bold bg-ofnac-gold text-ofnac-green-900 px-2 py-0.5 rounded-full">{item.badge}</span>}
              </Link>
            );
          })}
        </div>
      ))}

      <div className="px-6 pt-4 mt-4 border-t border-ofnac-line space-y-2">
        <Link href="/" className="flex items-center gap-2 text-xs text-ofnac-ink-soft hover:text-ofnac-green-900">
          <ArrowLeft size={13} /> Retour au site public
        </Link>
        <button onClick={() => { logout(); router.push("/"); }} className="flex items-center gap-2 text-xs text-ofnac-gray hover:text-ofnac-green-900">
          <LogOut size={13} /> Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ofnac-paper lg:grid lg:grid-cols-[230px_1fr]">
      {/* Desktop sidebar */}
      <aside className="bg-white border-r border-ofnac-line py-6 hidden lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden bg-white border-b border-ofnac-line px-4 py-3 flex justify-between items-center sticky top-0 z-20">
        <Link href="/agent/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-ofnac-green-900 text-ofnac-gold rounded-md flex items-center justify-center font-serif font-extrabold text-sm">O</div>
          <div>
            <div className="font-serif font-semibold text-sm text-ofnac-green-900 leading-tight">OFNAC</div>
            <div className="text-[9px] uppercase tracking-[0.15em] text-ofnac-gray">Espace agent</div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-ofnac-paper rounded-full text-xs">
            <div className="w-5 h-5 bg-ofnac-green-900 text-ofnac-gold rounded-full flex items-center justify-center text-[9px] font-bold">
              {user?.name.split(" ").map(s => s[0]).join("")}
            </div>
          </div>
          <button onClick={() => setMobileNavOpen(true)} className="p-2 -mr-2 text-ofnac-ink" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-50 overflow-y-auto transform transition-transform py-6 ${
        mobileNavOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <button onClick={() => setMobileNavOpen(false)} className="absolute top-4 right-4 p-1.5 text-ofnac-gray hover:text-ofnac-green-900" aria-label="Fermer">
          <X size={20} />
        </button>
        {sidebarContent}
      </aside>

      <main className="p-5 lg:p-9 overflow-hidden">
        <div className="flex justify-between items-start mb-7 flex-wrap gap-3">
          <div className="min-w-0">
            <h1 className="font-serif text-2xl lg:text-3xl text-ofnac-green-900 font-bold">{title}</h1>
            <div className="text-xs text-ofnac-gray mt-1">{breadcrumb}</div>
          </div>
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-white border border-ofnac-line rounded-full text-sm">
            <div className="w-7 h-7 bg-ofnac-green-900 text-ofnac-gold rounded-full flex items-center justify-center text-xs font-semibold">
              {user?.name.split(" ").map(s => s[0]).join("")}
            </div>
            <span>{user?.name} · Président</span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
