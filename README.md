# 🍿 DuoWatch — Watchlist Animé Vision & Xyltax

Application web moderne, esthétique et réactive conçue pour répertorier et suivre les animés regardés à deux avec **Xyltax**.

---

## 🚀 Comment lancer le site ?

Deux manières simples de lancer l'application :

### 🌟 Option 1 : Lancement avec Sauvegarde Permanente sur Disque (Recommandé)
- **Double-cliquez sur `start.bat`** (ou lancez `python server.py` dans le terminal).
- Le serveur démarre et ouvre automatiquement votre navigateur sur `http://localhost:8000`.
- **Avantage clé** : Chaque modification (ajout d'animé, clic sur `+` ou `-` du compteur d'épisodes, changement de statut, avis, etc.) est **immédiatement enregistrée dans le fichier `animes.json` sur votre disque dur**, en plus de votre navigateur. Vos données ne peuvent jamais être perdues !

### 🌐 Option 2 : Lancement Direct (Sans Python)
- **Double-cliquez directement sur `index.html`** dans l'explorateur de fichiers.
- L'application fonctionne instantanément dans n'importe quel navigateur (Chrome, Edge, Firefox, Brave...).
- **Sauvegarde locale** : Vos données sont conservées de manière persistante dans votre navigateur grâce à la base de données **IndexedDB** et `localStorage`. Si vous lancez le serveur Python plus tard, vos ajouts se synchronisent automatiquement avec le disque !

---

## 📂 Structure du projet (Code modulaire & propre)

Les différents codes sont parfaitement séparés :

- 📄 [`index.html`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/index.html) : Structure HTML épurée et sémantique.
- 🎨 [`styles.css`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/styles.css) : Styles CSS, polices (Plus Jakarta Sans, Outfit) et effets visuels (glassmorphism, gradients violets/roses).
- ⚙️ [`app.js`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/app.js) : Logique JavaScript complète (IndexedDB, synchronisation disque, auto-fetch AniList, compteurs, filtres).
- 🧩 [`tailwind.config.js`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/tailwind.config.js) : Configuration du thème de couleurs (brand violet, surfaces sombres) et polices Tailwind.
- 💾 [`animes.json`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/animes.json) : Base de données locale des animés (stockage physique permanent).
- 🐍 [`server.py`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/server.py) : Serveur Python autonome pour la sauvegarde directe sur disque.
- ⚡ [`start.bat`](file:///c:/Users/Oscar/.gemini/antigravity/scratch/anime-tracker-xyltax/start.bat) : Raccourci pour lancer le projet en 1 clic sur Windows.

---

## 💾 Comment fonctionne la sauvegarde ?

Toutes vos actions sont enregistrées **en temps réel et automatiquement** sans avoir besoin d'appuyer sur un bouton « Enregistrer » :
- **Ajout d'un nouvel animé** : Enregistré immédiatement sur le disque (`animes.json`) et dans le navigateur.
- **Progression des épisodes (`+` / `-`)** : Chaque clic met à jour instantanément la progression et la sauvegarde.
- **Changement de statut** : Enregistré instantanément avec synchronisation du nombre d'épisodes.
- **Indicateur visuel** : Une notification toast discrète apparaît en bas à droite à chaque mise à jour (`✓ Progression enregistrée`, `✓ Animé ajouté`), et le voyant vert en haut vous confirme la synchronisation.
- **Bouton Export / Import JSON** : Cliquez sur l'icône de disque en haut pour exporter votre liste en 1 clic ou l'importer sur un autre PC.

---

## 📺 Vos animés pré-intégrés

| Animé | Catégorie | Statut | Note & Avis |
| :--- | :---: | :---: | :--- |
| **Wandering Witch** | Aventure / Fantaisie | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **86** | Action / Mecha / Drame | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **Re:Creator** | Action / Fantaisie | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **K** | Action / Surnaturel | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **NieR** | Action / Sci-Fi | ❌ Pas encore | *(À définir par Vision & Xyltax)* |
| **FLCL** | Comédie / Sci-Fi | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **Haibane Renmei** | Mystère / Drame | ❌ Pas encore | *(À définir par Vision & Xyltax)* |
| **Silent Witch** | Fantaisie / Magie | 🕗 En cours | *(À définir par Vision & Xyltax)* |

---

## ✨ Fonctionnalités incluses

1. **Tableau de bord & Statistiques** : Compteur en temps réel (Total, Terminés ✅, En cours 🕗, Pas encore ❌).
2. **Tri & Filtre par Catégorie (Genre)** :
   - Menu déroulant de filtrage par catégorie (Action, Fantaisie, Sci-Fi, Drame, etc.).
   - Tags cliquables `#Catégorie` sur chaque carte pour filtrer en 1 clic.
   - Option de **tri alphabétique par catégorie** dans le menu de tri.
3. **Ajout & Modification facile** :
   - Titre, catégorie / genre, statut, recommandation, note, compteur d'épisodes, avis.
4. **Bouton Auto-Fetch AniList (GraphQL)** : Tapez le nom d'un animé et cliquez sur *Auto-fetch AniList* pour récupérer l'affiche officielle HD, les catégories et le nombre total d'épisodes en 1 clic ! Chaque carte dispose également d'un bouton pour ouvrir directement la fiche de l'animé sur AniList.
5. **Compteur d'épisodes interactif (+1 / -1)** : Boutons rapides directement sur chaque carte pour incrémenter ou décrémenter vos épisodes vus d'un simple clic (+ barre de progression visuelle intégrée). Dès que le dernier épisode est vu, l'animé passe automatiquement en « Terminé ✅ » avec confettis 🎉 !
6. **Sélecteur de statut intelligent** : Choisissez directement le statut souhaité (Validé ✅, En cours 🕗, Pas encore ❌) depuis chaque carte. La progression des épisodes se synchronise intelligemment.
7. **Filtres et Recherche** : Recherche instantanée (par titre, catégorie ou avis).
