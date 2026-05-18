"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { login } from "@/lib/auth";
import { Shield, ArrowLeft, AlertCircle } from "lucide-react";

export default function AgentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "agent@ofnac.sn" && password === "demo2026") {
      login("agent", "M. Kâ");
      router.push("/agent/dashboard");
    } else {
      setError("Identifiants invalides. Utilisez agent@ofnac.sn / demo2026");
    }
  }

  function fillDemo() {
    setEmail("agent@ofnac.sn");
    setPassword("demo2026");
  }

  return (
    <>
      <DemoBanner />
      <main className="min-h-screen bg-ofnac-green-900 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-ofnac-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-ofnac-green-700/30 blur-3xl" />

        <div className="relative w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-ofnac-gold text-sm mb-6 hover:underline">
            <ArrowLeft size={14} /> Retour au site public
          </Link>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-ofnac-green-900 text-ofnac-gold rounded-lg flex items-center justify-center">
                <Shield size={22} />
              </div>
              <div>
                <h1 className="font-serif text-xl text-ofnac-green-900 font-bold">Espace agent</h1>
                <p className="text-xs text-ofnac-gray">Accès réservé aux agents OFNAC</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">Adresse e-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-sm"
                  placeholder="agent@ofnac.sn"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="flex gap-2 p-3 bg-red-50 text-red-800 rounded-lg text-xs">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="w-full bg-ofnac-green-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-ofnac-green-800">
                Se connecter
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-ofnac-line">
              <div className="bg-ofnac-cream rounded-lg p-3 text-xs">
                <div className="font-semibold text-ofnac-green-900 mb-1">Identifiants de démo</div>
                <div className="font-mono text-ofnac-ink-soft">agent@ofnac.sn / demo2026</div>
                <button onClick={fillDemo} className="mt-2 text-ofnac-green-700 underline text-[11px]">Remplir automatiquement</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
