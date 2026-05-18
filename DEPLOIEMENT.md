# Guide de déploiement — Démo OFNAC sur Vercel

**Durée totale estimée : 15 minutes**, sans rien installer sur votre ordinateur.

## Pré-requis

- Un compte **GitHub** (gratuit) — [github.com/signup](https://github.com/signup)
- Un compte **Vercel** (gratuit) — [vercel.com/signup](https://vercel.com/signup)
  - Lors de l'inscription, choisissez **"Continue with GitHub"** : ça lie automatiquement les deux comptes

---

## Étape 1 — Mettre le projet sur GitHub (5 min)

### Option A — Via le site GitHub (sans ligne de commande)

1. Allez sur [github.com/new](https://github.com/new)
2. **Repository name** : `ofnac-demo`
3. Laissez **Public** (ou Private si vous préférez)
4. **Ne cochez rien** dans "Initialize this repository"
5. Cliquez **Create repository**

Sur la page suivante, GitHub vous donne un lien du type `https://github.com/votrecompte/ofnac-demo.git`. Gardez cette page ouverte.

6. Sur votre ordinateur, dézippez `ofnac-demo.zip` quelque part (Bureau par exemple)

7. Ouvrez la page GitHub que vous venez de créer. Cliquez sur **"uploading an existing file"** (lien bleu dans le texte d'instructions)

8. **Glissez-déposez tout le contenu** du dossier `ofnac-demo` dézippé (pas le dossier lui-même, son contenu) dans la zone d'upload

9. En bas, écrivez un message de commit (ex: `Initial commit`) et cliquez **Commit changes**

✅ Votre code est sur GitHub.

### Option B — Via la ligne de commande (si vous êtes à l'aise)

```bash
cd ofnac-demo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRECOMPTE/ofnac-demo.git
git push -u origin main
```

---

## Étape 2 — Déployer sur Vercel (5 min)

1. Allez sur [vercel.com/new](https://vercel.com/new)

2. Vous voyez la liste de vos dépôts GitHub. Cherchez `ofnac-demo` et cliquez **Import**

   *(Si le dépôt n'apparaît pas : cliquez "Adjust GitHub App Permissions" et autorisez Vercel à accéder au dépôt)*

3. Sur la page de configuration :
   - **Project Name** : laissez `ofnac-demo` (ce sera votre URL : `ofnac-demo.vercel.app`)
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - Ne touchez à rien d'autre

4. Cliquez **Deploy**

5. Attendez ~90 secondes. Vous verrez des confettis 🎉 quand c'est terminé.

6. Cliquez sur la capture d'écran qui apparaît, ou sur **Visit**. **Votre démo est en ligne.**

L'URL est du type `https://ofnac-demo-xxxx.vercel.app`. Vous pouvez la simplifier dans **Settings → Domains** si besoin.

✅ La démo est accessible publiquement.

---

## Étape 3 — Tester la démo (3 min)

Ouvrez votre URL Vercel dans un navigateur. Vérifiez ces parcours :

### Parcours citoyen (entièrement fonctionnel)
1. Cliquez **Signaler** (en haut à droite) ou **Déposer un signalement**
2. Remplissez les 3 étapes (au moins : secteur, région, description ≥ 20 caractères)
3. Cliquez **Soumettre mon signalement**
4. **Un code unique du type `OFNAC-AB12-CD34` est généré**. Copiez-le.
5. Cliquez **Suivre mon dossier**, collez le code, recherchez → vous voyez votre dossier
6. Bonus : déposez 2-3 signalements pour bien remplir le dashboard ensuite

### Parcours agent OFNAC
1. Retournez sur l'accueil, allez sur `/agent/login` (ou tapez-le dans l'URL)
2. Identifiants : `agent@ofnac.sn` / `demo2026` (bouton **"Remplir automatiquement"** disponible)
3. Vous arrivez sur le tableau de bord
4. **Vos signalements de la démo apparaissent en haut de la liste des dossiers prioritaires**, avec un encart doré indiquant qu'ils viennent de la démo

### Parcours assujetti
1. Cliquez **Déclarer mon patrimoine** depuis l'accueil
2. Identifiants : `assujetti@demo.sn` puis OTP `123456`
3. Vous voyez le formulaire multi-étapes de déclaration

✅ Tout marche.

---

## Étape 4 — Envoyer à la Direction de l'OFNAC

Préparez un mail du type :

> Madame, Monsieur,
>
> Comme convenu, vous trouverez ci-après le lien vers la démonstration interactive de la Plateforme Intégrité Numérique que nous proposons à l'OFNAC :
>
> **https://ofnac-demo.vercel.app**
>
> Les identifiants de test sont indiqués en haut de la page d'accueil. Je vous invite tout particulièrement à tester :
> - le parcours de signalement (anonyme, génération d'un code de suivi)
> - le tableau de bord agent, qui s'enrichit en temps réel des signalements déposés
>
> La proposition technique détaillée et le pitch deck sont joints à ce mail.
>
> Je reste à votre disposition pour un atelier de présentation de 90 minutes à votre convenance.
>
> Cordialement,

Joignez : `Pitch_Plateforme_OFNAC.pptx`, `Proposition_Technique_OFNAC.docx`.

---

## Modifications après envoi

Vous pouvez modifier n'importe quel fichier directement depuis GitHub :

1. Allez sur votre dépôt GitHub
2. Cliquez sur le fichier à modifier
3. Cliquez sur l'icône crayon ✏️
4. Modifiez, cliquez **Commit changes**

**Vercel redéploie automatiquement** en 60 secondes. L'URL ne change pas.

Modifications typiques après envoi à la Direction :
- Adapter la bannière de démo : `components/DemoBanner.tsx`
- Mettre vos coordonnées dans le pied de page : `components/PublicFooter.tsx`
- Modifier les textes institutionnels : `app/office/page.tsx`, `app/missions/page.tsx`, etc.

---

## Domaine personnalisé (optionnel)

Si vous voulez une URL plus professionnelle du type `plateforme-integrite.com` :

1. Dans Vercel : **Project → Settings → Domains → Add**
2. Tapez le domaine voulu
3. Si vous ne l'avez pas encore, Vercel propose de l'acheter directement (~10-15 €/an, paiement immédiat)
4. Sinon, mettez à jour les DNS de votre registrar (instructions affichées par Vercel)
5. Au bout de quelques minutes, votre domaine est actif

Suggestions de noms pertinents :
- `pin-ofnac-demo.com`
- `plateforme-integrite.com`
- `demo-anticorruption.sn` (si le `.sn` est disponible)

---

## Problèmes fréquents

**"Le déploiement a échoué"** : ouvrez l'onglet **Logs** dans Vercel. La plupart du temps c'est un nom de variable manquant — peu probable ici car il n'y a aucune variable d'environnement requise.

**"Les signalements déposés ne s'affichent pas"** : c'est normal si vous changez de navigateur ou d'appareil. La démo utilise le `localStorage` local pour ne pas nécessiter de base de données. Mentionnez-le à la Direction si pertinent, ou demandez-leur de rester dans le même onglet pour leur test.

**"Je veux ajouter une vraie base de données"** : Vercel propose Vercel Postgres gratuit. Ça permet de partager les données entre utilisateurs. C'est un upgrade simple pour la phase suivante du projet — pas nécessaire pour le démarchage.
