import { InstitutionalPage } from "@/components/InstitutionalPage";

export default function TextesPage() {
  return (
    <InstitutionalPage
      label="Textes juridiques"
      title="Cadre légal et réglementaire de l'OFNAC."
      lead="L'OFNAC s'appuie sur un corpus juridique précis, en constante évolution, qui définit son périmètre d'action, ses pouvoirs et ses obligations."
    >
      <h2>Loi de création</h2>
      <p><strong>Loi n° 2012-30 du 28 décembre 2012</strong> portant création de l'Office National de Lutte contre la Fraude et la Corruption.</p>

      <h2>Réforme 2024</h2>
      <p><strong>Loi n° 2024-06 du 9 février 2024</strong> portant réforme de l'OFNAC : extension du périmètre d'action, allongement de la durée des mandats, renforcement des pouvoirs d'enquête.</p>
      <p><strong>Loi n° 2024-07 du 9 février 2024</strong> relative à la déclaration de patrimoine : élargissement des assujettis, modernisation du dispositif de contrôle.</p>

      <h2>Textes connexes</h2>
      <ul>
        <li>Loi n° 2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel</li>
        <li>Loi n° 2008-11 du 25 janvier 2008 sur la cybercriminalité</li>
        <li>Loi n° 2016-29 sur les transactions électroniques</li>
        <li>Convention des Nations Unies contre la corruption (ratifiée par le Sénégal)</li>
        <li>Convention de l'Union africaine sur la prévention et la lutte contre la corruption</li>
      </ul>
    </InstitutionalPage>
  );
}
