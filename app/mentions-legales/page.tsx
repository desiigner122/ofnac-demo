import { InstitutionalPage } from "@/components/InstitutionalPage";

export default function MentionsLegalesPage() {
  return (
    <InstitutionalPage
      label="Informations légales"
      title="Mentions légales."
      lead="Conformément à la loi 2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel et aux dispositions applicables à la communication électronique au Sénégal."
    >
      <h2>Éditeur du site</h2>
      <p>Office National de Lutte contre la Fraude et la Corruption (OFNAC)<br />
      Autorité administrative indépendante créée par la loi n° 2012-30 du 28 décembre 2012<br />
      Av. Lamine Gueye X Faidherbe, BP 6816 — Dakar Plateau, République du Sénégal<br />
      Téléphone : 800 000 900 · E-mail : contact@ofnac.sn</p>

      <h2>Directeur de la publication</h2>
      <p>Le Président de l'OFNAC.</p>

      <h2>Hébergement</h2>
      <p>Datacenter souverain situé sur le territoire du Sénégal, opéré dans des conditions conformes aux exigences de souveraineté numérique nationale.</p>

      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus du présent site (textes, illustrations, logos, photographies, vidéos) est protégé au titre de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, par quelque procédé que ce soit, est interdite sans autorisation préalable de l'OFNAC, hormis pour un usage strictement personnel.</p>

      <h2>Protection des données personnelles</h2>
      <p>Conformément à la loi n° 2008-12 du 25 janvier 2008, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, écrivez à <strong>dpo@ofnac.sn</strong>.</p>

      <h2>Cookies</h2>
      <p>Le site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement. Aucun cookie publicitaire ni de mesure d'audience tiers n'est déposé.</p>

      <h2>Crédits</h2>
      <p>Conception, développement et hébergement : prestataire désigné par appel d'offres public.</p>
    </InstitutionalPage>
  );
}
