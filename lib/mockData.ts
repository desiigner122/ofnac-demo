// Données partagées pour la démo - utilisées par tous les dashboards agent

export type DossierMock = {
  id: string;
  title: string;
  sector: string;
  region: string;
  status: "Reçu" | "Investigation" | "Audit" | "Au Parquet" | "Classé" | "Condamnation";
  priority: "high" | "medium" | "low";
  receivedAt: string;
  assignedTo: string;
  description: string;
  amount?: number; // FCFA si applicable
  timeline: { date: string; event: string; actor: string }[];
};

export const SECTORS = ["Marchés publics", "Foncier", "Santé", "Éducation", "Douanes / Fiscalité", "Autre"];
export const REGIONS = ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Diourbel", "Tambacounda", "Kaolack", "Fatick", "Louga", "Matam", "Kaffrine", "Kédougou", "Kolda", "Sédhiou"];

export const REGION_STATS = [
  { name: "Dakar",       count: 912, lat: 14.7, lng: -17.5 },
  { name: "Thiès",       count: 187, lat: 14.8, lng: -16.9 },
  { name: "Saint-Louis", count: 142, lat: 16.0, lng: -16.5 },
  { name: "Tambacounda", count: 156, lat: 13.8, lng: -13.7 },
  { name: "Diourbel",    count: 98,  lat: 14.7, lng: -16.2 },
  { name: "Ziguinchor",  count: 76,  lat: 12.6, lng: -16.3 },
  { name: "Kaolack",     count: 142, lat: 14.1, lng: -16.1 },
  { name: "Fatick",      count: 84,  lat: 14.3, lng: -16.4 },
  { name: "Louga",       count: 68,  lat: 15.6, lng: -16.2 },
  { name: "Matam",       count: 54,  lat: 15.7, lng: -13.3 },
  { name: "Kaffrine",    count: 73,  lat: 14.1, lng: -15.5 },
  { name: "Kédougou",    count: 42,  lat: 12.6, lng: -12.2 },
  { name: "Kolda",       count: 87,  lat: 12.9, lng: -14.9 },
  { name: "Sédhiou",     count: 51,  lat: 12.7, lng: -15.6 },
];

export const SECTOR_STATS = [
  { sector: "Marchés publics",      count: 687, color: "#0A3D2E" },
  { sector: "Foncier",                count: 432, color: "#1B7A4D" },
  { sector: "Douanes / Fiscalité",   count: 298, color: "#D4A93C" },
  { sector: "Santé",                  count: 256, color: "#C68A2E" },
  { sector: "Éducation",              count: 187, color: "#8B6F2E" },
  { sector: "Autre",                  count: 312, color: "#6B7570" },
];

export const MONTHLY_STATS = [
  { month: "Jan", recus: 142, traites: 98, transmis: 12 },
  { month: "Fév", recus: 167, traites: 112, transmis: 15 },
  { month: "Mar", recus: 198, traites: 143, transmis: 18 },
  { month: "Avr", recus: 234, traites: 187, transmis: 21 },
  { month: "Mai", recus: 276, traites: 198, transmis: 23 },
  { month: "Juin", recus: 312, traites: 234, transmis: 28 },
  { month: "Juil", recus: 287, traites: 256, transmis: 24 },
  { month: "Août", recus: 198, traites: 187, transmis: 19 },
  { month: "Sept", recus: 245, traites: 213, transmis: 26 },
  { month: "Oct", recus: 267, traites: 234, transmis: 31 },
  { month: "Nov", recus: 198, traites: 178, transmis: 22 },
  { month: "Déc", recus: 156, traites: 145, transmis: 18 },
];

export const IPC_EVOLUTION = [
  { year: "2020", score: 45 },
  { year: "2021", score: 43 },
  { year: "2022", score: 43 },
  { year: "2023", score: 43 },
  { year: "2024", score: 45 },
  { year: "2025", score: 46 },
];

export const MOCK_DOSSIERS: DossierMock[] = [
  {
    id: "SIG-4821",
    title: "Marché public — Travaux routiers RN2",
    sector: "Marchés publics",
    region: "Thiès",
    status: "Investigation",
    priority: "high",
    receivedAt: "2026-05-11",
    assignedTo: "Mme F. Sow",
    amount: 2_400_000_000,
    description: "Le signalant rapporte des soupçons de surfacturation systématique dans le cadre du marché de travaux routiers attribué pour la réhabilitation d'une section de la RN2. Les écarts mentionnés porteraient sur plus de 30 % du montant total du marché.",
    timeline: [
      { date: "2026-05-11", event: "Signalement reçu via la plateforme",         actor: "Système" },
      { date: "2026-05-12", event: "Affectation à Mme F. Sow (Investigations)", actor: "Présidence" },
      { date: "2026-05-14", event: "Demande de pièces complémentaires",          actor: "Mme F. Sow" },
      { date: "2026-05-15", event: "Pièces reçues via messagerie chiffrée",     actor: "Signalant" },
      { date: "2026-05-17", event: "Audit comptable déclenché",                   actor: "Mme F. Sow" },
    ],
  },
  {
    id: "SIG-4815",
    title: "Allocation foncière irrégulière — Almadies",
    sector: "Foncier",
    region: "Dakar",
    status: "Audit",
    priority: "high",
    receivedAt: "2026-05-09",
    assignedTo: "M. A. Diallo",
    amount: 850_000_000,
    description: "Allégations d'attribution irrégulière de plusieurs parcelles dans la zone des Almadies, en violation des procédures du Code du domaine de l'État.",
    timeline: [
      { date: "2026-05-09", event: "Signalement reçu",                                 actor: "Système" },
      { date: "2026-05-10", event: "Affectation à M. A. Diallo",                      actor: "Présidence" },
      { date: "2026-05-13", event: "Audit déclenché par décision du Président",        actor: "Présidence" },
    ],
  },
  {
    id: "SIG-4798",
    title: "Détournement de fonds — Établissement public de santé",
    sector: "Santé",
    region: "Saint-Louis",
    status: "Au Parquet",
    priority: "medium",
    receivedAt: "2026-05-02",
    assignedTo: "Mme A. Ndour",
    amount: 124_000_000,
    description: "Constat d'écarts comptables non justifiés sur le budget de fonctionnement de l'établissement, sur la période 2024-2025.",
    timeline: [
      { date: "2026-05-02", event: "Signalement reçu",                  actor: "Système" },
      { date: "2026-05-04", event: "Investigation ouverte",              actor: "Mme A. Ndour" },
      { date: "2026-05-12", event: "Rapport d'investigation finalisé",   actor: "Mme A. Ndour" },
      { date: "2026-05-15", event: "Dossier transmis au Procureur",     actor: "Présidence" },
    ],
  },
  {
    id: "SIG-4776",
    title: "Pratique anticoncurrentielle — Appel d'offres",
    sector: "Marchés publics",
    region: "Diourbel",
    status: "Investigation",
    priority: "medium",
    receivedAt: "2026-04-28",
    assignedTo: "M. O. Ba",
    amount: 380_000_000,
    description: "Entente présumée entre soumissionnaires lors d'un appel d'offres pour la fourniture de matériel scolaire.",
    timeline: [
      { date: "2026-04-28", event: "Signalement reçu", actor: "Système" },
      { date: "2026-05-02", event: "Investigation ouverte", actor: "M. O. Ba" },
    ],
  },
  {
    id: "SIG-4754",
    title: "Fraude à la TVA présumée",
    sector: "Douanes / Fiscalité",
    region: "Ziguinchor",
    status: "Classé",
    priority: "low",
    receivedAt: "2026-04-22",
    assignedTo: "M. I. Faye",
    description: "Allégations de fraude à la TVA non corroborées par les éléments du dossier.",
    timeline: [
      { date: "2026-04-22", event: "Signalement reçu",     actor: "Système" },
      { date: "2026-04-29", event: "Examen préliminaire",  actor: "M. I. Faye" },
      { date: "2026-05-08", event: "Classement sans suite — éléments insuffisants", actor: "M. I. Faye" },
    ],
  },
  {
    id: "SIG-4732",
    title: "Recrutement irrégulier dans la fonction publique",
    sector: "Autre",
    region: "Dakar",
    status: "Investigation",
    priority: "medium",
    receivedAt: "2026-04-15",
    assignedTo: "Mme F. Sow",
    description: "Signalement portant sur des recrutements supposément effectués hors des procédures de la fonction publique.",
    timeline: [
      { date: "2026-04-15", event: "Signalement reçu", actor: "Système" },
      { date: "2026-04-18", event: "Investigation ouverte", actor: "Mme F. Sow" },
    ],
  },
  {
    id: "SIG-4710",
    title: "Détournement de matériel scolaire",
    sector: "Éducation",
    region: "Kaolack",
    status: "Au Parquet",
    priority: "medium",
    receivedAt: "2026-04-08",
    assignedTo: "M. O. Ba",
    amount: 42_000_000,
    description: "Allégations de revente illégale de matériel scolaire destiné aux écoles publiques.",
    timeline: [
      { date: "2026-04-08", event: "Signalement reçu", actor: "Système" },
      { date: "2026-04-12", event: "Investigation ouverte", actor: "M. O. Ba" },
      { date: "2026-05-10", event: "Transmis au Procureur", actor: "Présidence" },
    ],
  },
  {
    id: "SIG-4688",
    title: "Conflit d'intérêts présumé",
    sector: "Marchés publics",
    region: "Thiès",
    status: "Condamnation",
    priority: "low",
    receivedAt: "2026-03-22",
    assignedTo: "Mme A. Ndour",
    description: "Affaire ayant abouti à condamnation définitive en première instance.",
    timeline: [
      { date: "2026-03-22", event: "Signalement reçu", actor: "Système" },
      { date: "2026-04-02", event: "Transmis au Parquet", actor: "Présidence" },
      { date: "2026-05-14", event: "Condamnation prononcée", actor: "Tribunal" },
    ],
  },
];

export function formatFCFA(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Mds FCFA`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)} M FCFA`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)} K FCFA`;
  return `${amount} FCFA`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export const STATUS_STYLES: Record<DossierMock["status"], { bg: string; text: string }> = {
  "Reçu":          { bg: "bg-blue-100",         text: "text-blue-800" },
  "Investigation": { bg: "bg-amber-100",        text: "text-amber-800" },
  "Audit":         { bg: "bg-ofnac-green-50",   text: "text-ofnac-green-700" },
  "Au Parquet":    { bg: "bg-purple-100",       text: "text-purple-800" },
  "Classé":        { bg: "bg-ofnac-cream",      text: "text-ofnac-gray" },
  "Condamnation":  { bg: "bg-red-100",          text: "text-red-800" },
};
