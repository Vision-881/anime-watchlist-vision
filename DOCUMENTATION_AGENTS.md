# Documentation pour les Agents Antigravity (Handoff & Architecture)

> **IMPORTANT POUR TOUT AGENT TRAVAILLANT SUR CE PROJET :**  
> Lisez attentivement ce document avant toute modification. Ce projet possède des règles et préférences utilisateur très strictes qui ont été validées après plusieurs itérations.

---

## 1. Vue d'ensemble du Projet
- **Nom du projet :** DuoWatch & TrioWatch
- **Utilisateurs :** **Vision** (créateur / utilisateur), **Xyltax** (ami duo), et **Limule** (amie trio).
- **Langue obligatoire :** Français.
- **Dépôt GitHub :** [https://github.com/Vision-881/anime-watchlist-vision](https://github.com/Vision-881/anime-watchlist-vision)
- **Hébergement actif (24/7) :** GitHub Pages
  - **Page Duo :** `https://vision-881.github.io/anime-watchlist-vision/`
  - **Page Trio :** `https://vision-881.github.io/anime-watchlist-vision/trio.html`

---

## 2. Règles Métier & Contraintes Utilisateur STRICTES

### 🚫 RÈGLE 1 : AUCUN THÈME BLEU / CYAN
- L'utilisateur a formellement rejeté toute tentative d'interface bleutée ou cyan (type AniList blue).
- **Palette obligatoire :**
  - Fond sombre : `#0b0d14` avec dégradés radiaux discrets en violet/rose.
  - Dégradés principaux : `from-purple-400 via-pink-400 to-indigo-300` (textes) et `from-brand-600 via-indigo-600 to-pink-500` (icônes / boutons).
  - Accents : Violet `#8b5cf6` et Rose `#ec4899`.
  - **Sur `trio.html` comme sur `index.html`**, il ne doit y avoir AUCUNE classe cyan (`text-cyan-*`, `bg-cyan-*`, `border-cyan-*`).

### 🚫 RÈGLE 2 : LE STATUT DOIT TOUJOURS ÊTRE « A VOIR »
- L'utilisateur a explicitement exigé qu'il soit écrit **« A voir »** et **JAMAIS** « Pas encore ».
- Valable pour : le badge sur les cartes, l'option dans le `<select>`, les boutons de filtres, et les compteurs de statistiques.

### 🚫 RÈGLE 3 : AUCUNE BORDURE BLANCHE OU TROP CLAIRE
- Toutes les bordures doivent être sombres et subtiles : `#232738` ou `#2a2f42`.
- `styles.css` applique une règle globale `*, ::before, ::after { border-color: #232738; }` pour empêcher Tailwind CDN de générer des bordures blanches `#e5e7eb`.

### 🚫 RÈGLE 4 : SÉPARATION HERMÉTIQUE DUO ⇄ TRIO
- **Page Duo (`index.html`) :** Contient la liste des animes regardés par Vision & Xyltax (sauvegardée dans `/duo.json` ou `animes.json`).
- **Page Trio (`trio.html`) :** Contient la liste regardée à 3 avec Limule (sauvegardée dans `/trio.json` ou `animes_trio.json`).
- **Règle absolue :** La liste Duo ne doit JAMAIS apparaître sur la page Trio. `app.js` filtre formellement les IDs réservés au Duo (`"1"` à `"8"`).

### 🚫 RÈGLE 5 : PAS D'OPTIONS NI WIDGETS EN SURPLUS
- Garder l'en-tête épuré : le logo, un bouton discret pour basculer d'une liste à l'autre, et le bouton `+ Ajouter un animé`.
- Ne pas ajouter de gros blocs de navigation superflus, de dés de tirage au sort envahissants ou de pills d'état non demandés.

---

## 3. Système d'Accès Sécurisé & Cloisonnement Duo / Trio (Liens Magiques)

L'utilisateur exige un **cloisonnement strict** entre la liste à 2 et la liste à 3 :
- **Watchlist Duo (`index.html`) :** Réservée **EXCLUSIVEMENT** à Vision & Xyltax. Limule ne doit en AUCUN CAS y avoir accès.
  - **Clé Duo :** `vision-xyltax` (ou `xyltax-vision`).
  - **Lien magique Duo :** `https://vision-881.github.io/anime-watchlist-vision/?access=vision-xyltax`
  - Tout utilisateur sans la clé Duo (y compris Limule) est bloqué par `#lock-screen`.

- **Watchlist Trio (`trio.html`) :** Réservée à Vision, Xyltax et Limule.
  - **Clés Trio autorisées :** `limule`, `vision-xyltax-limule`, et la clé Duo `vision-xyltax`.
  - **Lien magique pour Limule :** `https://vision-881.github.io/anime-watchlist-vision/trio.html?access=limule`
  - Pour Limule, le bouton de retour vers la liste à 2 (`#btn-back-to-duo`) est automatiquement masqué.

- **Mécanisme :**
  - Dès qu'un utilisateur clique sur son lien magique, la clé est enregistrée dans `localStorage` (`xyltax_vision_duo_auth_token` et/ou `xyltax_vision_trio_auth_token`).
  - L'URL est nettoyée automatiquement (le paramètre `?access=...` disparaît de la barre d'adresse sans rechargement).
  - L'appareil est déverrouillé définitivement pour les sections autorisées.
  - Tout visiteur sans la clé voit un écran `#lock-screen` sombre avec cadenas, et aucun contenu n'est injecté dans le DOM.

---

## 4. Architecture de Synchronisation des Données

`app.js` gère une persistance multi-niveaux intelligente et transparente :

1. **Cloud (Production en ligne sur GitHub Pages) :**
   - **Firebase Realtime Database :** Projet `anime-watchlist-vision` (Région active : Belgique `europe-west1`).
   - URL principale confirmée et active :
     `https://anime-watchlist-vision-default-rtdb.europe-west1.firebasedatabase.app`
   - Nœuds : `/duo.json` (8 animés) et `/trio.json` (animés du trio).
   - Méthodes REST : `GET` pour lire, `PUT` pour écrire (toujours actif en local comme sur GitHub Pages pour garantir une synchronisation totale entre tous les appareils).
   - Synchronisation en direct : polling toutes les 3.5 secondes + réactualisation immédiate au focus / changement d'onglet (`startLiveSync()`).
   - Synchronisation multi-onglets instantanée (0ms) via `BroadcastChannel('duowatch_sync_channel')`.

2. **Serveur Python Local (Fallback & Sauvegarde Disque Physique) :**
   - Si lancé en local via `python server.py`, synchronise avec `animes.json` (Duo) et `animes_trio.json` (Trio) via les endpoints `/api/animes?list=duo` et `/api/animes?list=trio`.

3. **Navigateur (Offline Fallback & Migration Automatique) :**
   - **IndexedDB :** `DuoAnimeWatchlistDB` (store `animes`) et `TrioAnimeWatchlistDB` (store `animes_trio`).
   - **LocalStorage :** `xyltax_vision_anime_tracker_v1` (Duo) et `xyltax_vision_limule_anime_tracker_v1` (Trio).
   - *Migration transparente : l'ancienne clé `xyltax_oscar_anime_tracker_v1` est lue et migrée automatiquement vers la nouvelle clé sans perte de données.*

4. **Règle Fondamentale de Réconciliation (Ajout ET Retrait d'épisodes) :**
   - **ATTENTION AGENTS :** Ne JAMAIS réintroduire de condition type `pLocal.watched >= pExisting.watched`. Les utilisateurs ont le droit d'incrémenter (+1) comme de décrémenter (-1) leurs épisodes.
   - La réconciliation des données repose exclusivement sur la fraîcheur temporelle (`updatedAt`). Si le serveur a une valeur plus récente, le serveur gagne (même si le nombre d'épisodes est inférieur). Si le local a été modifié hors-ligne plus récemment (`localTime > existingTime`), le local gagne.
   - Les variables `isSavingToServer` et `lastLocalEditTime` (délai de 3.5s) protègent les modifications locales contre toute interférence ou écrasement prématuré par le polling `syncFromCloud()`.

---

## 5. Statut des Services en Ligne (Vérifié & Actif)

- **GitHub Pages :** ✅ En ligne et fonctionnel (`200 OK`)
  - Duo : `https://vision-881.github.io/anime-watchlist-vision/`
  - Trio : `https://vision-881.github.io/anime-watchlist-vision/trio.html`
- **Firebase Realtime Database :** ✅ Activé en région `europe-west1` (`200 OK`)
  - URL : `https://anime-watchlist-vision-default-rtdb.europe-west1.firebasedatabase.app`
  - Données initiales amorcées avec succès (`/duo.json` et `/trio.json`).
  - La synchronisation temps réel fonctionne entre tous les téléphones et PCs sans aucune configuration supplémentaire.
- **Rendu Optimiste, Multi-onglets & Liaisons Window :**
  - `initApp()` effectue un rendu immédiat à 0ms pour éviter tout écran blanc ou clignotement.
  - `BroadcastChannel` synchronise les onglets d'un même navigateur instantanément.
  - Tous les gestionnaires d'événements inline (`onclick`, `onchange`) sont explicitement exposés sur `window` en bas de `app.js`.

---

## 6. Fichiers du Projet
- `index.html` : Interface principale de la Watchlist Duo (Vision & Xyltax).
- `trio.html` : Interface dédiée de la Watchlist Trio (Vision, Xyltax & Limule).
- `app.js` : Moteur JavaScript unifié (Auth, Cloud Sync, DOM Rendering, Audio/Confetti, AniList GraphQL API).
- `styles.css` : Styles globaux, polices Google (`Plus Jakarta Sans`, `Outfit`), jauge de progression, bordures sombres.
- `tailwind.config.js` : Configuration des palettes de couleurs Tailwind (`brand`, `surface`).
- `server.py` : Serveur Python HTTP local avec endpoints REST et écriture atomique sur disque.
- `animes.json` : Données locales Duo (8 animés avec affiches AniList HD).
- `animes_trio.json` : Données locales Trio (Higurashi, ou vide).
- `README.md` : Guide complet utilisateur avec liens d'accès et instructions.
- `DOCUMENTATION_AGENTS.md` : Ce document (documentation de passation et règles strictes).
- `remarques.md` : Notes et exigences initiales de l'utilisateur.
