export type Actu = {
  id: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const ACTUS: Actu[] = [
  {
    id: "1",
    slug: "convention-ige",
    date: "12 mai 2026",
    category: "Communiqué",
    title: "Signature d'une convention de coopération avec l'Inspection Générale d'État",
    excerpt: "L'OFNAC et l'IGE renforcent leur partenariat institutionnel pour mutualiser leurs ressources d'investigation et de prévention.",
    body: [
      "L'Office National de Lutte contre la Fraude et la Corruption et l'Inspection Générale d'État ont signé ce jour une convention de coopération renforcée. Cette signature s'est déroulée au Palais de la République en présence du Président de la République.",
      "La convention organise la mutualisation des moyens d'investigation des deux institutions, dans le respect de leurs domaines de compétence respectifs. Elle prévoit notamment la mise en place de cellules mixtes pour les dossiers de grande ampleur, l'échange systématique d'informations sur les enquêtes en cours, et l'élaboration de méthodologies communes d'audit.",
      "Le Président de l'OFNAC a souligné « l'importance d'une coopération inter-institutionnelle renforcée pour briser le cloisonnement administratif qui constitue l'un des principaux freins à l'efficacité de la lutte anti-corruption au Sénégal ».",
      "Cette convention s'inscrit dans la mise en œuvre des lois 2024-06 et 2024-07 qui ont profondément modernisé le dispositif national de prévention et de lutte contre la corruption.",
    ],
  },
  {
    id: "2",
    slug: "rapport-activite-2025",
    date: "28 avril 2026",
    category: "Rapport",
    title: "Publication du Rapport d'activité 2025",
    excerpt: "L'OFNAC a traité 2 437 signalements et transmis 214 dossiers aux juridictions compétentes durant l'année 2025.",
    body: [
      "L'OFNAC publie ce jour son rapport d'activité au titre de l'année 2025, conformément aux dispositions de la loi 2012-30.",
      "Le rapport fait état d'une activité en hausse marquée, avec 2 437 signalements reçus contre 2 065 en 2024, soit une progression de 18 %. Cette hausse traduit, selon l'analyse de l'Office, une confiance accrue des citoyens dans le dispositif national de dénonciation.",
      "Sur l'année, 1 893 dossiers ont été pleinement instruits et 214 ont été transmis aux autorités judiciaires. Ces transmissions ont d'ores et déjà abouti à 87 condamnations définitives.",
      "Le rapport identifie les marchés publics et le secteur foncier comme les domaines les plus exposés aux pratiques de fraude et de corruption. Il formule 14 recommandations de réforme à l'attention du Gouvernement et du Parlement.",
      "Le rapport est librement téléchargeable depuis le portail Open Data.",
    ],
  },
  {
    id: "3",
    slug: "journee-integrite-2026",
    date: "15 avril 2026",
    category: "Événement",
    title: "Journée nationale de l'intégrité publique au CICAD",
    excerpt: "Plus de 600 acteurs ont participé à la 5e édition consacrée à la transformation numérique de la lutte anti-corruption.",
    body: [
      "Le Centre International de Conférences Abdou Diouf a accueilli les 14 et 15 avril 2026 la 5e édition de la Journée nationale de l'intégrité publique, organisée par l'OFNAC.",
      "Plus de 600 participants — magistrats, fonctionnaires, élus, représentants de la société civile, journalistes, partenaires techniques et financiers — ont pris part aux travaux. La rencontre était articulée autour de la transformation numérique des dispositifs de lutte contre la corruption.",
      "Trois tables rondes ont rythmé l'événement : les apports de l'intelligence artificielle à l'analyse des risques, la protection des lanceurs d'alerte à l'ère du numérique, et l'ouverture des données publiques comme outil de transparence.",
      "L'Office a profité de l'occasion pour annoncer le lancement prochain de sa nouvelle plateforme numérique intégrée.",
    ],
  },
  {
    id: "4",
    slug: "decret-loi-2024-07",
    date: "3 avril 2026",
    category: "Communiqué",
    title: "Adoption du décret d'application de la loi 2024-07",
    excerpt: "Le nouveau régime de déclaration de patrimoine entre en vigueur, élargissant le périmètre des personnes assujetties.",
    body: [
      "Le Conseil des Ministres a adopté ce mercredi le décret d'application de la loi n° 2024-07 du 9 février 2024 relative à la déclaration de patrimoine.",
      "Ce décret, attendu depuis plusieurs mois, précise les modalités opérationnelles du nouveau régime : périmètre exact des assujettis, format de la déclaration, calendrier des dépôts, modalités de contrôle et sanctions en cas de manquement.",
      "Au total, plus de 2 100 personnes sont désormais soumises à l'obligation de déclaration patrimoniale auprès de l'OFNAC, contre environ 1 400 sous l'ancien régime. Cet élargissement concerne notamment certaines catégories de directeurs d'agences publiques et de hauts magistrats.",
      "L'OFNAC met à disposition des assujettis une plateforme numérique sécurisée pour la transmission dématérialisée des déclarations, avec signature électronique qualifiée.",
    ],
  },
];
