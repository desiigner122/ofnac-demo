import { InstitutionalPage } from "@/components/InstitutionalPage";

export default function MissionsPage() {
  return (
    <InstitutionalPage
      label="Missions"
      title="Prévenir, détecter, enquêter."
      lead="Selon l'article 2 de la loi de création, l'OFNAC a pour mission la prévention et la lutte contre la fraude, la corruption, les pratiques assimilées et les infractions connexes, en vue de promouvoir l'intégrité et la probité dans la gestion des affaires publiques."
    >
      <h2>Mission 1 — Prévention</h2>
      <p>Sensibilisation, formation et information sur la fraude et la corruption. Proposition de réformes législatives, réglementaires ou administratives. Promotion des études et recherches sur la bonne gouvernance.</p>

      <h2>Mission 2 — Détection et enquêtes</h2>
      <p>Réception et traitement des plaintes et dénonciations. Conduite de missions d'enquêtes, d'investigations, d'audit et de vérification. Collecte et analyse des informations relatives à la corruption.</p>

      <h2>Mission 3 — Contrôle des déclarations de patrimoine</h2>
      <p>Réception, contrôle et conservation des déclarations de patrimoine des personnes assujetties par la loi n° 2014-17 du 2 avril 2014, modifiée par la loi 2024-07.</p>

      <h2>Mission 4 — Saisine de la justice</h2>
      <p>Lorsque les investigations révèlent des faits constitutifs d'infraction, l'OFNAC saisit les autorités judiciaires compétentes.</p>
    </InstitutionalPage>
  );
}
