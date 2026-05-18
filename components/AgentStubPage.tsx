"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { AgentShell } from "@/components/AgentShell";
import { Construction, ArrowLeft } from "lucide-react";

export function AgentStubPage({ title, breadcrumb, description }: { title: string; breadcrumb: string; description: string }) {
  return (
    <>
      <DemoBanner />
      <AgentShell title={title} breadcrumb={breadcrumb}>
        <div className="card p-12 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-5 bg-ofnac-green-50 text-ofnac-green-700 rounded-full flex items-center justify-center">
            <Construction size={26} />
          </div>
          <h2 className="font-serif text-2xl text-ofnac-green-900 font-bold mb-3">Module à venir</h2>
          <p className="text-sm text-ofnac-ink-soft leading-relaxed mb-6">{description}</p>
          <Link href="/agent/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-ofnac-green-700 hover:underline">
            <ArrowLeft size={14} /> Retour au tableau de bord
          </Link>
        </div>
      </AgentShell>
    </>
  );
}
