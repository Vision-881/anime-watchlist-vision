# 🍿 DuoWatch & TrioWatch — Watchlist Animé Vision, Xyltax & Limule

Application web moderne, fluide et esthétique conçue pour répertorier et suivre les animés regardés à deux (**Vision & Xyltax**) et à trois avec **Limule**.

---

## 🔗 Accès en ligne direct (24h/24 & Multi-appareils)

L'application est déployée en ligne sur GitHub Pages avec un système de **liens magiques privés** qui déverrouillent automatiquement l'accès pour votre groupe d'amis :

- **🎬 Watchlist Duo (Vision & Xyltax)** :  
  👉 [Accéder à DuoWatch](https://vision-881.github.io/anime-watchlist-vision/?access=vision-xyltax-limule)  
  *(Lien direct avec clé : `https://vision-881.github.io/anime-watchlist-vision/?access=vision-xyltax-limule`)*

- **🍿 Watchlist Trio (Vision, Xyltax & Limule)** :  
  👉 [Accéder à TrioWatch](https://vision-881.github.io/anime-watchlist-vision/trio.html?access=vision-xyltax-limule)  
  *(Lien direct avec clé : `https://vision-881.github.io/anime-watchlist-vision/trio.html?access=vision-xyltax-limule`)*

> 🔒 **Sécurité par lien magique** : Toute personne ouvrant le site sans la clé d'accès voit un écran sombre avec cadenas et ne peut pas voir votre liste. Dès que vous ouvrez l'un des liens ci-dessus, votre appareil mémorise la clé de façon permanente et l'URL est automatiquement nettoyée.

---

## 🚀 Lancement en local (Optionnel)

Vous pouvez également lancer le projet sur votre ordinateur :

### Option A : Avec serveur Python (Sauvegarde disque physique)
- **Double-cliquez sur `start.bat`** (ou lancez `python server.py` dans le terminal).
- Le serveur démarre sur `http://localhost:8000`.
- Toute modification est immédiatement enregistrée dans les fichiers `animes.json` (Duo) et `animes_trio.json` (Trio).

### Option B : Lancement direct sans serveur
- Ouvrez simplement `index.html` ou `trio.html` dans n'importe quel navigateur.

---

## ☁️ Synchronisation en Ligne (Firebase Realtime Database)

L'application intègre une persistance cloud multi-couches transparente :
- **Cloud Firebase** : Projet `anime-watchlist-vision` synchronisant en temps réel entre tous les téléphones et ordinateurs.
- **Synchronisation en direct réactive** : Polling ultra-rapide toutes les 3.5 secondes, réactualisation immédiate au focus d'onglet et synchronisation instantanée multi-onglets (0ms) via `BroadcastChannel`.
- **Repli automatique** : Si la connexion est interrompue, IndexedDB et LocalStorage garantissent que vos données ne sont jamais perdues.

---

## 📺 Vos animés Duo pré-intégrés

| Animé | Catégorie | Statut | Note & Avis |
| :--- | :---: | :---: | :--- |
| **Wandering Witch** | Aventure / Fantaisie | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **86** | Action / Mecha / Drame | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **Re:Creator** | Action / Fantaisie | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **K** | Action / Surnaturel | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **NieR** | Action / Sci-Fi | ❌ A voir | *(À définir par Vision & Xyltax)* |
| **FLCL** | Comédie / Sci-Fi | ✅ Terminé | *(À définir par Vision & Xyltax)* |
| **Haibane Renmei** | Mystère / Drame | ❌ A voir | *(À définir par Vision & Xyltax)* |
| **Silent Witch** | Fantaisie / Magie | 🕗 En cours | *(À définir par Vision & Xyltax)* |

---

## ✨ Fonctionnalités incluses

1. **Tableau de bord & Statistiques** : Compteur en temps réel (Total, Terminés ✅, En cours 🕗, A voir ❌).
2. **Tri & Filtre par Catégorie (Genre)** :
   - Menu déroulant de filtrage par catégorie (Action, Fantaisie, Sci-Fi, Drame, etc.).
   - Tags cliquables `#Catégorie` sur chaque carte pour filtrer en 1 clic.
   - Option de **tri alphabétique par catégorie** dans le menu de tri.
3. **Ajout & Modification facile** :
   - Titre, catégorie / genre, statut, recommandation, note, compteur d'épisodes, avis.
4. **Bouton Auto-Fetch AniList (GraphQL)** : Tapez le nom d'un animé et cliquez sur *Auto-fetch AniList* pour récupérer l'affiche officielle HD, les catégories et le nombre total d'épisodes en 1 clic !
5. **Compteur d'épisodes interactif (+1 / -1)** : Boutons rapides directement sur chaque carte pour incrémenter ou décrémenter vos épisodes vus d'un simple clic (+ barre de progression visuelle intégrée). Dès que le dernier épisode est vu, l'animé passe automatiquement en « Terminé ✅ » avec confettis 🎉 !
6. **Sélecteur de statut intelligent** : Choisissez directement le statut souhaité (Validé ✅, En cours 🕗, A voir ❌) depuis chaque carte. La progression des épisodes se synchronise intelligemment.
7. **Filtres et Recherche** : Recherche instantanée (par titre, catégorie ou avis).
