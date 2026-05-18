# Plateforme Intégrité Numérique — Démo OFNAC

Démonstration interactive d'une plateforme numérique destinée à l'Office National de Lutte contre la Fraude et la Corruption (OFNAC) du Sénégal.

Ce dépôt contient une application Next.js déployable en quelques minutes sur Vercel, à envoyer comme lien de démonstration à la Direction de l'OFNAC.

## Aperçu

La démo couvre **3 espaces** et **5 parcours fonctionnels** :

- **Espace public** (accueil, missions, présidence, actualités, rapports, textes, transparence)
- **Espace assujetti** (login OTP + déclaration de patrimoine)
- **Espace agent OFNAC** (login + tableau de bord avec données en temps réel)

Le parcours **signalement → suivi** est entièrement fonctionnel : un signalement déposé génère un vrai code unique, est persisté dans le navigateur, et peut être retrouvé via la page de suivi ainsi que dans le dashboard agent.

## Identifiants de démo

| Espace | Identifiant | Mot de passe |
|---|---|---|
| Agent OFNAC | `agent@ofnac.sn` | `demo2026` |
| Assujetti DDP | `assujetti@demo.sn` | OTP : `123456` |
| Citoyen / signalement | aucun login | code généré automatiquement |

Ces identifiants sont affichés en haut de chaque page via la bannière de démo.

## Stack technique

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide icons
- Persistance via localStorage (pour la démo uniquement)

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:3000`.

## Déploiement sur Vercel

### Méthode 1 — via le site Vercel (recommandée, 5 min)

1. Créez un dépôt GitHub et poussez-y ce projet :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/ofnac-demo.git
   git push -u origin main
   ```

2. Allez sur [vercel.com](https://vercel.com), connectez-vous avec GitHub.

3. Cliquez sur **Add New… → Project**, sélectionnez votre dépôt `ofnac-demo`.

4. Laissez tous les réglages par défaut (Vercel détecte automatiquement Next.js).

5. Cliquez sur **Deploy**. Au bout de ~2 minutes, vous avez une URL du type `https://ofnac-demo.vercel.app`.

### Méthode 2 — via la CLI Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Suivez les instructions interactives. La première commande `vercel` crée un déploiement de prévisualisation. Pour la production : `vercel --prod`.

## Domaine personnalisé (optionnel)

Une fois le projet déployé, dans le dashboard Vercel :
1. Aller dans **Project → Settings → Domains**
2. Ajouter votre domaine custom (achat possible directement via Vercel, ~10-15 €/an)
3. Mettre à jour les DNS selon les instructions affichées

Suggestions de noms : `demo-ofnac.com`, `pin-senegal.com`, `plateforme-integrite.sn`.

## Personnalisation rapide

- **Couleurs** : `tailwind.config.js` (palette `ofnac`)
- **Identifiants démo** : `app/agent/login/page.tsx` et `app/patrimoine/login/page.tsx`
- **Bannière de démo** : `components/DemoBanner.tsx`
- **Contacts dans le pied de page** : `components/PublicFooter.tsx`

## Limitations connues (volontaires, démo)

- Les données (signalements déposés) ne sont stockées que dans le navigateur de l'utilisateur (localStorage). Une visite depuis un autre appareil ne verra pas les dossiers déposés ailleurs.
- L'auth est simplifiée pour la démo (cookies clients, pas de hashage). À ne pas utiliser en production.
- Les pages agent autres que `dashboard` sont des stubs montrant le périmètre.

Pour une version production, ces points seront résolus par PostgreSQL + NextAuth + chiffrement réel + hébergement souverain au Sénégal — comme détaillé dans la proposition technique.

## Structure du projet

```
ofnac-demo/
├── app/
│   ├── page.tsx                    # Accueil portail public
│   ├── office/                     # L'Office (institutionnel)
│   ├── missions/                   # Missions (institutionnel)
│   ├── presidence/                 # Présidence (institutionnel)
│   ├── actualites/                 # Actualités (institutionnel)
│   ├── rapports/                   # Rapports (institutionnel)
│   ├── textes/                     # Textes juridiques (institutionnel)
│   ├── signaler/                   # 🟢 Module signalement (fonctionnel)
│   ├── suivre/                     # 🟢 Suivi de dossier (fonctionnel)
│   ├── transparence/               # Open data avec carte du Sénégal
│   ├── patrimoine/login/           # 🟢 Login assujetti (OTP)
│   ├── patrimoine/declaration/     # Déclaration patrimoine
│   └── agent/                      # 🟢 Espace agent OFNAC
│       ├── login/
│       ├── dashboard/              # Tableau de bord (live data)
│       ├── dossiers/               # Stub
│       ├── stats/                  # Stub
│       └── ...
├── components/
│   ├── DemoBanner.tsx              # Bannière identifiants en haut
│   ├── PublicHeader.tsx            # En-tête public à 2 niveaux
│   ├── PublicFooter.tsx
│   ├── InstitutionalPage.tsx
│   ├── AgentShell.tsx
│   └── AgentStubPage.tsx
└── lib/
    └── auth.ts                     # Auth client simple
```

🟢 = parcours fonctionnel (pas un stub)
