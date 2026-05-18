import { InstitutionalPage } from "@/components/InstitutionalPage";

export default function AccessibilitePage() {
  return (
    <InstitutionalPage
      label="Accessibilité"
      title="Engagement d'accessibilité."
      lead="L'OFNAC s'engage à rendre son site et ses services numériques accessibles à toutes et tous, y compris aux personnes en situation de handicap, conformément aux normes internationales en vigueur."
    >
      <h2>Niveau de conformité</h2>
      <p>Ce site vise une conformité <strong>WCAG 2.1 niveau AA</strong> (Web Content Accessibility Guidelines). Un audit technique externe est réalisé chaque année par un cabinet indépendant.</p>

      <h2>Principes appliqués</h2>
      <ul>
        <li>Contrastes de couleurs renforcés (ratio supérieur à 4.5:1 pour les textes)</li>
        <li>Navigation entièrement utilisable au clavier</li>
        <li>Compatibilité avec les principaux lecteurs d'écran (JAWS, NVDA, VoiceOver)</li>
        <li>Textes alternatifs sur l'ensemble des images informatives</li>
        <li>Hiérarchie sémantique des contenus (titres correctement structurés)</li>
        <li>Formulaires labellisés et messages d'erreur explicites</li>
      </ul>

      <h2>Améliorations en cours</h2>
      <p>Le site fait l'objet d'améliorations continues. Les anomalies identifiées sont consignées dans un plan d'action public et corrigées dans un délai maximum de 90 jours.</p>

      <h2>Signaler un défaut d'accessibilité</h2>
      <p>Si vous rencontrez une difficulté d'accès à un contenu ou un service, contactez-nous à <strong>accessibilite@ofnac.sn</strong>. Nous nous engageons à vous répondre sous 15 jours et à proposer une alternative ou un correctif.</p>

      <h2>Multilingue</h2>
      <p>Le site est disponible en français, en wolof et en anglais. Les traductions sont assurées par des traducteurs assermentés.</p>
    </InstitutionalPage>
  );
}
