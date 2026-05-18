"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { login } from "@/lib/auth";
import { FileSignature, ArrowLeft, AlertCircle, Smartphone } from "lucide-react";

export default function PatrimoineLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"id" | "otp">("id");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (email === "assujetti@demo.sn") {
      setError("");
      setStep("otp");
    } else {
      setError("Adresse non reconnue. Utilisez assujetti@demo.sn");
    }
  }

  function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp === "123456") {
      login("assujetti", "Mme Diop");
      router.push("/patrimoine/declaration");
    } else {
      setError("Code OTP invalide. Pour la démo, utilisez 123456");
    }
  }

  return (
    <>
      <DemoBanner />
      <main className="min-h-screen bg-ofnac-cream flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-ofnac-green-700 text-sm mb-6 hover:underline">
            <ArrowLeft size={14} /> Retour au site public
          </Link>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-ofnac-line">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-ofnac-gold text-ofnac-green-900 rounded-lg flex items-center justify-center">
                <FileSignature size={22} />
              </div>
              <div>
                <h1 className="font-serif text-xl text-ofnac-green-900 font-bold">Déclaration de patrimoine</h1>
                <p className="text-xs text-ofnac-gray">Espace assujetti — Loi 2024-07</p>
              </div>
            </div>

            {step === "id" && (
              <form onSubmit={next} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">Adresse e-mail professionnelle</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-sm"
                    placeholder="assujetti@demo.sn"
                  />
                </div>
                {error && (
                  <div className="flex gap-2 p-3 bg-red-50 text-red-800 rounded-lg text-xs">
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <button type="submit" className="w-full bg-ofnac-green-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-ofnac-green-800">
                  Recevoir un code OTP
                </button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={submitOtp} className="space-y-4">
                <div className="bg-ofnac-green-50 rounded-lg p-4 flex gap-3">
                  <Smartphone className="text-ofnac-green-700 flex-shrink-0" size={18} />
                  <div className="text-xs text-ofnac-green-800">
                    Un code à 6 chiffres a été envoyé au numéro associé à votre compte. <strong>Pour la démo : 123456</strong>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ofnac-green-900 uppercase tracking-[0.12em] mb-2">Code OTP</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3.5 py-3 border border-ofnac-line rounded-lg text-lg font-mono text-center tracking-[0.5em]"
                    placeholder="••••••"
                    maxLength={6}
                  />
                </div>
                {error && (
                  <div className="flex gap-2 p-3 bg-red-50 text-red-800 rounded-lg text-xs">
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <button type="submit" className="w-full bg-ofnac-green-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-ofnac-green-800">
                  Vérifier et accéder
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-ofnac-line text-xs">
              <div className="bg-ofnac-cream rounded-lg p-3">
                <div className="font-semibold text-ofnac-green-900 mb-1">Identifiants de démo</div>
                <div className="font-mono text-ofnac-ink-soft">assujetti@demo.sn → OTP : 123456</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
