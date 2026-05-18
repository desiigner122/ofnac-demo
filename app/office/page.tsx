import { InstitutionalPage } from "@/components/InstitutionalPage";

export default function OfficePage() {
  return (
    <InstitutionalPage
      label="L'Office"
      title="Une autorité indépendante au service de l'intégrité publique."
      lead="L'Office National de Lutte contre la Fraude et la Corruption (OFNAC) est une autorité administrative indépendante créée par la loi n° 2012-30 du 28 décembre 2012, dotée d'autonomie financière et rattachée à la Présidence de la République."
    >
      <h2>Statut et organisation</h2>
      <p>L'OFNAC dispose d'une assemblée composée de douze membres nommés par décret du Président de la République, pour un mandat de cinq ans renouvelable une fois. Son siège est à Dakar et il rayonne sur l'ensemble du territoire national.</p>

      <h2>Cadre légal</h2>
      <p>Le cadre juridique de l'Office a été profondément modernisé par <strong>les lois n° 2024-06 et n° 2024-07 adoptées le 9 février 2024</strong>, qui ont étendu son champ d'action, ses pouvoirs d'enquête, et harmonisé le régime de déclaration de patrimoine.</p>

      <h2>Une institution proche des citoyens</h2>
      <p>L'OFNAC reçoit des plaintes, dénonciations et signalements émanant de citoyens, d'organisations de la société civile, d'agents publics, ou de toute personne morale. La confidentialité du signalant est rigoureusement protégée.</p>
    </InstitutionalPage>
  );
}
