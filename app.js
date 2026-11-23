/**
 * DuoWatch - Application JavaScript
 * Watchlist Animé • Vision & Xyltax
 */

// Initial dataset requested by the user
const INITIAL_ANIME_LIST = [
  {
    id: "1",
    title: "Wandering Witch: The Journey of Elaina",
    shortTitle: "Wandering Witch",
    category: "Aventure / Fantaisie",
    status: "completed", // ✅
    rating: null,
    recommender: "Les deux",
    episodes: "12/12",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx112609-hBCbnYlEHluz.jpg",
    anilistUrl: "https://anilist.co/anime/112609",
    createdAt: "2026-01-10T12:00:00.000Z"
  },
  {
    id: "2",
    title: "86: Eighty Six",
    shortTitle: "86",
    category: "Action / Mecha / Drame",
    status: "completed", // ✅
    rating: null,
    recommender: "Les deux",
    episodes: "23/23",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116589-KawXHB6sApFt.jpg",
    anilistUrl: "https://anilist.co/anime/116589",
    createdAt: "2026-02-01T12:00:00.000Z"
  },
  {
    id: "3",
    title: "Re:Creators",
    shortTitle: "Re:Creator",
    category: "Action / Fantaisie",
    status: "completed", // ✅
    rating: null,
    recommender: "Les deux",
    episodes: "22/22",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97980-9NQwPW0igSMk.jpg",
    anilistUrl: "https://anilist.co/anime/97980",
    createdAt: "2026-03-05T12:00:00.000Z"
  },
  {
    id: "4",
    title: "K (K-Project)",
    shortTitle: "K",
    category: "Action / Surnaturel",
    status: "completed", // ✅
    rating: null,
    recommender: "Les deux",
    episodes: "13/13",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx14467-TQjwOvq4jkYS.png",
    anilistUrl: "https://anilist.co/anime/14467",
    createdAt: "2026-04-12T12:00:00.000Z"
  },
  {
    id: "5",
    title: "NieR:Automata Ver1.1a",
    shortTitle: "NieR",
    category: "Action / Sci-Fi",
    status: "dropped", // ❌
    rating: null,
    recommender: "Les deux",
    episodes: "4/24",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-Qs53Mta5ngqs.jpg",
    anilistUrl: "https://anilist.co/anime/145665",
    createdAt: "2026-05-18T12:00:00.000Z"
  },
  {
    id: "6",
    title: "FLCL (Fooly Cooly)",
    shortTitle: "FLCL",
    category: "Comédie / Sci-Fi",
    status: "completed", // ✅
    rating: null,
    recommender: "Les deux",
    episodes: "6/6",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx227-qOB9ZhVvNnqO.jpg",
    anilistUrl: "https://anilist.co/anime/227",
    createdAt: "2026-06-22T12:00:00.000Z"
  },
  {
    id: "7",
    title: "Haibane Renmei",
    shortTitle: "Haibane Renmei",
    category: "Mystère / Drame",
    status: "dropped", // ❌
    rating: null,
    recommender: "Les deux",
    episodes: "3/13",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx387-dS4aJivu0zPB.png",
    anilistUrl: "https://anilist.co/anime/387",
    createdAt: "2026-07-15T12:00:00.000Z"
  },
  {
    id: "8",
    title: "Silent Witch: Chinmoku no Majo no Kakushigoto",
    shortTitle: "Silent Witch",
    category: "Fantaisie / Magie",
    status: "watching", // 🕗
    rating: null,
    recommender: "Les deux",
    episodes: "1/13",
    review: "",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx179966-g0EU7rVe2Og7.jpg",
    anilistUrl: "https://anilist.co/anime/179966",
    createdAt: "2026-11-10T12:00:00.000Z"
  }
];

const INITIAL_TRIO_LIST = [
  {
    id: "1795310907194",
    title: "higurashi",
    shortTitle: "higurashi",
    category: "Horreur / Mystère / Psychologique",
    status: "watching",
    recommender: "Les trois",
    rating: null,
    episodes: "0/26",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx934-wjMlVEl4CWwg.jpg",
    review: "",
    anilistUrl: "https://anilist.co/anime/934",
    createdAt: "2026-11-22T01:28:27.194Z",
    updatedAt: "2026-11-22T01:28:32.377Z"
  }
];

const DUO_DEFAULT_IDS = new Set(["1", "2", "3", "4", "5", "6", "7", "8"]);
const PRE_PLACED_REVIEWS = ["Chef d'œuvre", "Classique", "Incroyable", "À voir absolument"];
function updateSyncIndicator(available) {}

// Determine current list mode: Trio (Vision, Xyltax & Limule) or Duo (Vision & Xyltax)
const IS_TRIO = (typeof document !== 'undefined' && document.body && document.body.dataset && document.body.dataset.page === 'trio') ||
                (typeof window !== 'undefined' && (
                  window.location.pathname.toLowerCase().includes('trio') ||
                  window.location.search.toLowerCase().includes('list=trio')
                ));

// State
const STORAGE_KEY = IS_TRIO ? 'xyltax_vision_limule_anime_tracker_v1' : 'xyltax_vision_anime_tracker_v1';
let animeList = [];
let currentFilter = 'all';
let currentCategoryFilter = 'all';

// Status definitions
const STATUS_MAP = {
  completed: {
    label: "Terminé",
    badge: "Validé",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/40",
    badgeBg: "bg-emerald-950/90",
    class: "text-emerald-400 border-emerald-500/40 bg-emerald-950/90",
    icon: "check"
  },
  watching: {
    label: "En cours",
    badge: "En cours",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/40",
    badgeBg: "bg-amber-950/90",
    class: "text-amber-400 border-amber-500/40 bg-amber-950/90",
    icon: "play"
  },
  dropped: {
    label: "A voir",
    badge: "A voir",
    textClass: "text-rose-400",
    borderClass: "border-rose-500/40",
    badgeBg: "bg-rose-950/90",
    class: "text-rose-400 border-rose-500/40 bg-rose-950/90",
    icon: "clock"
  }
};

// ==========================================
// PERSISTENCE MULTI-COUCHES (Disque + IndexedDB + LocalStorage)
// ==========================================

const IDB_NAME = IS_TRIO ? 'TrioAnimeWatchlistDB' : 'DuoAnimeWatchlistDB';
const IDB_VERSION = 1;
const IDB_STORE = IS_TRIO ? 'animes_trio' : 'animes';

function openIDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      return reject(new Error("IndexedDB non supporté par ce navigateur"));
    }
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveToIndexedDB(list) {
  try {
    const db = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const req = store.put({ key: 'watchlist', data: list, updatedAt: new Date().toISOString() });
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB non disponible pour l'écriture:", err);
    return false;
  }
}

async function loadFromIndexedDB() {
  try {
    const db = await openIDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get('watchlist');
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result.data) && (IS_TRIO ? true : req.result.data.length > 0)) {
          resolve(req.result.data);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn("IndexedDB non disponible pour la lecture:", err);
    return null;
  }
}

// ==========================================
// CONTRÔLE D'ACCÈS & LIENS MAGIQUES SÉPARÉS
// ==========================================
// - Duo (index.html) : Vision & Xyltax (et Limule si autorisée)
// - Trio (trio.html) : Vision, Xyltax & Limule
const DUO_ACCESS_KEYS = ["limule", "vision-xyltax-limule", "vision-xyltax", "xyltax-vision", "xyltax", "vision"];
const TRIO_ACCESS_KEYS = ["limule", "vision-xyltax-limule", "vision-xyltax", "xyltax-vision", "xyltax", "vision"];

const AUTH_STORAGE_KEY_DUO = "xyltax_vision_duo_auth_token";
const AUTH_STORAGE_KEY_TRIO = "xyltax_vision_trio_auth_token";

function goToDuo() {
  let token = 'vision-xyltax';
  try {
    const duoSaved = (localStorage.getItem(AUTH_STORAGE_KEY_DUO) || '').toLowerCase();
    const legacySaved = (localStorage.getItem('xyltax_vision_auth_token') || '').toLowerCase();
    const trioSaved = (localStorage.getItem(AUTH_STORAGE_KEY_TRIO) || '').toLowerCase();
    if (DUO_ACCESS_KEYS.includes(duoSaved)) {
      token = duoSaved;
    } else if (DUO_ACCESS_KEYS.includes(legacySaved)) {
      token = legacySaved;
    } else if (trioSaved && DUO_ACCESS_KEYS.includes(trioSaved)) {
      token = trioSaved;
    }
  } catch(e) {}
  window.location.href = 'index.html?access=' + encodeURIComponent(token);
}
window.goToDuo = goToDuo;

function checkAccess() {  
  if (typeof window === 'undefined') return true;

  const allowedKeys = IS_TRIO ? TRIO_ACCESS_KEYS : DUO_ACCESS_KEYS;

  // 1. Détection via l'URL (?access=... ou ?key=...)
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = (params.get('access') || params.get('key') || '').trim().toLowerCase();
  if (tokenFromUrl && allowedKeys.includes(tokenFromUrl)) {
    try {
      if (tokenFromUrl === 'limule') {
        localStorage.setItem('xyltax_is_limule', 'true');
      }
      if (DUO_ACCESS_KEYS.includes(tokenFromUrl)) {
        localStorage.setItem(AUTH_STORAGE_KEY_DUO, tokenFromUrl);
      }
      if (TRIO_ACCESS_KEYS.includes(tokenFromUrl)) {
        localStorage.setItem(AUTH_STORAGE_KEY_TRIO, tokenFromUrl);
      }
    } catch(e) {}
    // Masquer la clé de l'URL sans recharger
    params.delete('access');
    params.delete('key');
    const remaining = params.toString();
    const cleanUrl = window.location.pathname + (remaining ? `?${remaining}` : '');
    window.history.replaceState({}, document.title, cleanUrl);
    return true;
  }

  // 2. Détection via localStorage (appareil déjà déverrouillé & migration transparente)
  try {
    const duoSaved = (localStorage.getItem(AUTH_STORAGE_KEY_DUO) || '').toLowerCase();
    const trioSaved = (localStorage.getItem(AUTH_STORAGE_KEY_TRIO) || '').toLowerCase();
    const legacySaved = (localStorage.getItem('xyltax_vision_auth_token') || '').toLowerCase();

    if (IS_TRIO) {
      if (TRIO_ACCESS_KEYS.includes(trioSaved) || TRIO_ACCESS_KEYS.includes(duoSaved) || TRIO_ACCESS_KEYS.includes(legacySaved)) {
        return true;
      }
    } else {
      if (DUO_ACCESS_KEYS.includes(duoSaved)) {
        return true;
      }
      if (DUO_ACCESS_KEYS.includes(legacySaved)) {
        localStorage.setItem(AUTH_STORAGE_KEY_DUO, legacySaved);
        return true;
      }
      if (DUO_ACCESS_KEYS.includes(trioSaved)) {
        localStorage.setItem(AUTH_STORAGE_KEY_DUO, trioSaved);
        return true;
      }
    }
  } catch(e) {}

  return false;
}

function handleManualUnlock(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById('manual-access-key');
  const errorEl = document.getElementById('unlock-error');
  if (!input) return;

  const entered = input.value.trim().toLowerCase();
  const allowedKeys = IS_TRIO ? TRIO_ACCESS_KEYS : DUO_ACCESS_KEYS;

  if (allowedKeys.includes(entered)) {
    try {
      if (entered === 'limule') {
        localStorage.setItem('xyltax_is_limule', 'true');
      }
      if (DUO_ACCESS_KEYS.includes(entered)) {
        localStorage.setItem(AUTH_STORAGE_KEY_DUO, entered);
      }
      if (TRIO_ACCESS_KEYS.includes(entered)) {
        localStorage.setItem(AUTH_STORAGE_KEY_TRIO, entered);
      }
    } catch(e) {}
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) lockScreen.classList.add('hidden');
    if (errorEl) errorEl.classList.add('hidden');
    initApp();
  } else {
    if (errorEl) {
      errorEl.textContent = IS_TRIO 
        ? "Clé d'accès incorrecte pour la liste Trio (utilisez 'xyltax' ou 'limule')." 
        : "Clé incorrecte. Entrez simplement 'xyltax' ou 'vision'.";
      errorEl.classList.remove('hidden');
    }
  }
}
window.handleManualUnlock = handleManualUnlock;

// ==========================================
// PERSISTENCE MULTI-COUCHES (Firebase Cloud + Disque + IDB + LocalStorage)
// ==========================================
const FIREBASE_BASE_URLS = [
  "https://anime-watchlist-vision-default-rtdb.europe-west1.firebasedatabase.app",
  "https://anime-watchlist-vision-default-rtdb.firebaseio.com",
  "https://anime-watchlist-vision.firebaseio.com",
  "https://anime-watchlist-vision.europe-west1.firebasedatabase.app"
];
let activeFirebaseUrl = (() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const dbParam = params.get('db') || params.get('database');
    if (dbParam) {
      const cleanDb = dbParam.replace(/\/+$/, '');
      localStorage.setItem('xyltax_active_firebase_url', cleanDb);
      return cleanDb;
    }
    return localStorage.getItem('xyltax_active_firebase_url') || null;
  } catch (e) {
    return null;
  }
})();

function isOnlineHosting() {
  if (typeof window === 'undefined') return false;
  return window.location.protocol === 'https:' || 
         (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && window.location.protocol !== 'file:');
}

function getCloudUrl(baseUrl) {
  const node = IS_TRIO ? 'trio' : 'duo';
  return `${baseUrl}/${node}.json`;
}

// Server API Sync (sauvegarde Firebase Cloud ou serveur local)
function getApiUrl() {
  if (activeFirebaseUrl) {
    return getCloudUrl(activeFirebaseUrl);
  }
  if (isOnlineHosting()) {
    return getCloudUrl(FIREBASE_BASE_URLS[0]);
  }
  const query = IS_TRIO ? '?list=trio' : '?list=duo';
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return 'http://localhost:8000/api/animes' + query;
  }
  return '/api/animes' + query;
}

let isServerAvailable = false;

let broadcastChan = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    broadcastChan = new BroadcastChannel('duowatch_sync_channel');
    broadcastChan.onmessage = (e) => {
      if (e.data && e.data.type === 'DATA_UPDATED' && e.data.listType === (IS_TRIO ? 'trio' : 'duo')) {
        if (Array.isArray(e.data.data)) {
          animeList = e.data.data;
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList)); } catch(err){}
          renderAnimeList();
        }
      }
    };
  }
} catch(e) {}

async function fetchServerAnimes() {
  // 1. Toujours interroger Firebase Cloud en priorité (en ligne et en local)
  const urlsToTry = activeFirebaseUrl ? [activeFirebaseUrl] : FIREBASE_BASE_URLS;
  for (const base of urlsToTry) {
    try {
      const cloudUrl = getCloudUrl(base);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2400);
      const res = await fetch(cloudUrl, { signal: controller.signal, cache: 'no-store' });
      clearTimeout(timeoutId);
      if (res.ok) {
        activeFirebaseUrl = base;
        try { localStorage.setItem('xyltax_active_firebase_url', base); } catch(e){}
        isServerAvailable = true;
        const data = await res.json();
        if (data && typeof data === 'object') {
          const list = Array.isArray(data) ? data : Object.values(data);
          if (list.length > 0) {
            return list;
          }
        }
      }
    } catch (err) {}
  }
  // Si l'URL en cache a échoué, réinitialiser
  if (activeFirebaseUrl) {
    activeFirebaseUrl = null;
    try { localStorage.removeItem('xyltax_active_firebase_url'); } catch(e){}
  }

  // 2. Repli serveur Python local (si lancé)
  try {
    const localUrl = (typeof window !== 'undefined' && window.location.protocol === 'file:')
      ? `http://localhost:8000/api/animes?list=${IS_TRIO ? 'trio' : 'duo'}`
      : `/api/animes?list=${IS_TRIO ? 'trio' : 'duo'}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(localUrl, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        isServerAvailable = true;
        return data;
      }
    }
  } catch (e) {}

  return null;
}

let isSavingToServer = false;
let lastLocalEditTime = 0;

async function saveToServer(list) {
  isSavingToServer = true;
  lastLocalEditTime = Date.now();
  let cloudSuccess = false;
  let diskSuccess = false;

  try {
    // 1. Sauvegarde Firebase Cloud (toujours active pour synchroniser tous les appareils)
    const urlsToTry = activeFirebaseUrl ? [activeFirebaseUrl] : FIREBASE_BASE_URLS;
    for (const base of urlsToTry) {
      try {
        const cloudUrl = getCloudUrl(base);
        const res = await fetch(cloudUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(list)
        });
        if (res.ok) {
          activeFirebaseUrl = base;
          try { localStorage.setItem('xyltax_active_firebase_url', base); } catch(e){}
          cloudSuccess = true;
          break;
        }
      } catch (err) {}
    }

    // 2. Sauvegarde sur le serveur Python local (si présent)
    try {
      const localUrl = (typeof window !== 'undefined' && window.location.protocol === 'file:')
        ? `http://localhost:8000/api/animes?list=${IS_TRIO ? 'trio' : 'duo'}`
        : `/api/animes?list=${IS_TRIO ? 'trio' : 'duo'}`;
      const controller = new AbortController();
      const tid = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(localUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list),
        signal: controller.signal
      });
      clearTimeout(tid);
      if (res.ok) {
        diskSuccess = true;
      }
    } catch (e) {}

    isServerAvailable = cloudSuccess || diskSuccess;
    return isServerAvailable;
  } finally {
    isSavingToServer = false;
  }
}

// Synchronisation automatique et réactive
let liveSyncInterval = null;
async function syncFromCloud() {
  if (document.hidden || !checkAccess()) return;
  // Ne pas écraser pendant ou immédiatement après une modification locale
  if (isSavingToServer || (Date.now() - lastLocalEditTime < 3500)) return;

  try {
    const freshData = await fetchServerAnimes();
    if (freshData && Array.isArray(freshData)) {
      if (isSavingToServer || (Date.now() - lastLocalEditTime < 3500)) return;
      const freshClean = IS_TRIO 
        ? freshData.filter(item => !DUO_DEFAULT_IDS.has(String(item.id)))
        : freshData;
      const freshStr = JSON.stringify(freshClean);
      const currentStr = JSON.stringify(animeList);
      if (freshStr !== currentStr) {
        animeList = freshClean;
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList)); } catch(e){}
        saveToIndexedDB(animeList);
        renderAnimeList();
      }
    }
  } catch(e) {}
}

function startLiveSync() {
  if (liveSyncInterval) clearInterval(liveSyncInterval);
  // Synchronisation toutes les 3.5 secondes
  liveSyncInterval = setInterval(syncFromCloud, 3500);

  // Synchronisation instantanée dès que la fenêtre/onglet redevient active
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('focus', syncFromCloud);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) syncFromCloud();
    });
  }
}

// Load Data
async function init() {
  // Vérification de sécurité du lien magique
  const isAuthorized = checkAccess();
  const lockScreen = document.getElementById('lock-screen');
  if (!isAuthorized) {
    if (lockScreen) {
      lockScreen.classList.remove('hidden');
      if (window.lucide && lucide.createIcons) lucide.createIcons();
    }
    return; // Arrêt complet : aucun contenu visible pour les personnes non autorisées
  } else {
    if (lockScreen) lockScreen.classList.add('hidden');
  }

  await initApp();
}

async function initApp() {
  let localData = null;
  try {
    const rawStored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('xyltax_oscar_anime_tracker_v1');
    if (rawStored) {
      localData = JSON.parse(rawStored);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(localData)); } catch(e){}
    }
  } catch (e) {}

  // 1. Rendu immédiat avec les données disponibles (0ms de latence)
  if (!IS_TRIO) {
    if (Array.isArray(localData) && localData.length > 0) {
      animeList = localData;
    } else {
      animeList = JSON.parse(JSON.stringify(INITIAL_ANIME_LIST));
    }
    updateCategoryFilterOptions();
    renderAnimeList();
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }

  // 2. Récupérer les données du serveur / Firebase Cloud
  let serverData = null;
  try {
    serverData = await fetchServerAnimes();
  } catch (e) {
    console.warn("Serveur non disponible:", e);
  }

  // 3. Récupérer IndexedDB
  let idbData = null;
  try {
    idbData = await loadFromIndexedDB();
  } catch (e) {
    console.warn("IndexedDB lecture échouée:", e);
  }

  // 4. Initialisation sécurisée et hermétique (Duo vs Trio)
  if (IS_TRIO) {
    // Mode Trio : totalement indépendant du Duo, filtre tout résidu accidentel du Duo
    const cleanTrio = (list) => Array.isArray(list) 
      ? list.filter(item => !DUO_DEFAULT_IDS.has(String(item.id)) && item.title !== "Wandering Witch: The Journey of Elaina" && item.shortTitle !== "86") 
      : [];

    const mergedTrioMap = new Map();
    const serverTrio = cleanTrio(serverData || []);
    const localTrio = cleanTrio(idbData || localData || []);

    let hasLocalChangesTrio = false;

    if (serverTrio.length > 0) {
      serverTrio.forEach(item => mergedTrioMap.set(String(item.id), { ...item }));
      // Réconcilier les ajouts ou modifications hors-ligne strictement plus récentes
      localTrio.forEach(localItem => {
        const idStr = String(localItem.id);
        const existing = mergedTrioMap.get(idStr);
        if (!existing) {
          mergedTrioMap.set(idStr, { ...localItem });
          hasLocalChangesTrio = true;
        } else {
          const localTime = localItem.updatedAt ? new Date(localItem.updatedAt).getTime() : 0;
          const existingTime = existing.updatedAt ? new Date(existing.updatedAt).getTime() : 0;
          if (localTime > existingTime) {
            existing.episodes = localItem.episodes;
            existing.status = localItem.status;
            existing.updatedAt = localItem.updatedAt;
            if (localItem.rating !== undefined) existing.rating = localItem.rating;
            if (localItem.review !== undefined) existing.review = localItem.review;
            hasLocalChangesTrio = true;
          }
        }
      });
    } else if (localTrio.length > 0) {
      localTrio.forEach(item => mergedTrioMap.set(String(item.id), { ...item }));
      hasLocalChangesTrio = true;
    } else {
      INITIAL_TRIO_LIST.forEach(item => mergedTrioMap.set(String(item.id), { ...item }));
      hasLocalChangesTrio = true;
    }

    animeList = Array.from(mergedTrioMap.values());

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList));
    } catch (e) {}
    saveToIndexedDB(animeList);
    if (serverData === null || serverData.length === 0 || hasLocalChangesTrio) {
      saveToServer(animeList);
    }
    updateCategoryFilterOptions();
    renderAnimeList();
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  } else {
    // Mode Duo : synchronisation et réconciliation intelligente
    const hasServerData = serverData !== null && Array.isArray(serverData) && serverData.length > 0;
    const primary = hasServerData ? serverData :
                    (idbData !== null && Array.isArray(idbData) && idbData.length > 0) ? idbData :
                    (localData !== null && Array.isArray(localData) && localData.length > 0) ? localData :
                    INITIAL_ANIME_LIST;

    const browserCandidate = (idbData !== null && Array.isArray(idbData)) ? idbData : localData;

    const mergedMap = new Map();
    primary.forEach(item => mergedMap.set(String(item.id), { ...item }));

    let hasLocalChangesDuo = false;

    if (hasServerData && browserCandidate && Array.isArray(browserCandidate)) {
      browserCandidate.forEach(localItem => {
        const idStr = String(localItem.id);
        const existing = mergedMap.get(idStr);
        if (existing) {
          const localTime = localItem.updatedAt ? new Date(localItem.updatedAt).getTime() : 0;
          const existingTime = existing.updatedAt ? new Date(existing.updatedAt).getTime() : 0;

          // Si l'élément local a été modifié strictement plus récemment que le serveur (hors-ligne)
          if (localTime > existingTime) {
            existing.episodes = localItem.episodes;
            existing.status = localItem.status;
            existing.updatedAt = localItem.updatedAt;
            if (localItem.rating !== undefined) existing.rating = localItem.rating;
            if (localItem.review !== undefined) existing.review = localItem.review;
            hasLocalChangesDuo = true;
          }
        } else {
          // Conserver tout animé ajouté localement qui n'est pas encore sur le serveur
          mergedMap.set(idStr, { ...localItem });
          hasLocalChangesDuo = true;
        }
      });
    }

    let loadedData = Array.from(mergedMap.values());
    if (loadedData.length === 0) {
      loadedData = JSON.parse(JSON.stringify(INITIAL_ANIME_LIST));
    }

    // Nettoyage et synchronisation des données (spécifique Duo)
    const DEFAULT_RATINGS = { "1": 8.5, "2": 9.5, "3": 8.0, "4": 7.5, "5": 6.0, "6": 8.5, "7": 5.5 };
    const ANILIST_COVERS = {
      "1": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx112609-hBCbnYlEHluz.jpg",
      "2": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116589-KawXHB6sApFt.jpg",
      "3": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97980-9NQwPW0igSMk.jpg",
      "4": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx14467-TQjwOvq4jkYS.png",
      "5": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145665-Qs53Mta5ngqs.jpg",
      "6": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx227-qOB9ZhVvNnqO.jpg",
      "7": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx387-dS4aJivu0zPB.png",
      "8": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx179966-g0EU7rVe2Og7.jpg"
    };
    const ANILIST_URLS = {
      "1": "https://anilist.co/anime/112609",
      "2": "https://anilist.co/anime/116589",
      "3": "https://anilist.co/anime/97980",
      "4": "https://anilist.co/anime/14467",
      "5": "https://anilist.co/anime/145665",
      "6": "https://anilist.co/anime/227",
      "7": "https://anilist.co/anime/387",
      "8": "https://anilist.co/anime/179966"
    };
    const ANILIST_CATEGORIES = {
      "1": "Aventure / Fantaisie",
      "2": "Action / Mecha / Drame",
      "3": "Action / Fantaisie",
      "4": "Action / Surnaturel",
      "5": "Action / Sci-Fi",
      "6": "Comédie / Sci-Fi",
      "7": "Mystère / Drame",
      "8": "Fantaisie / Magie"
    };

    animeList = loadedData.map(item => {
      if (item.recommender === 'Oscar') {
        item.recommender = 'Vision';
      }
      if (item.review && PRE_PLACED_REVIEWS.some(snippet => item.review.includes(snippet))) {
        item.review = "";
      }
      if (DEFAULT_RATINGS[item.id] !== undefined && item.rating === DEFAULT_RATINGS[item.id]) {
        item.rating = null;
      }
      if (ANILIST_COVERS[item.id] && (!item.image || item.image.includes('myanimelist.net'))) {
        item.image = ANILIST_COVERS[item.id];
      }
      if (ANILIST_URLS[item.id] && !item.anilistUrl) {
        item.anilistUrl = ANILIST_URLS[item.id];
      }
      if (ANILIST_CATEGORIES[item.id] && !item.category) {
        item.category = ANILIST_CATEGORIES[item.id];
      }
      return item;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList));
    } catch (e) {}
    saveToIndexedDB(animeList);
    if (!hasServerData || hasLocalChangesDuo) {
      saveToServer(animeList);
    }
    updateCategoryFilterOptions();
    renderAnimeList();
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }

  updateNavLinksWithAccess();
  startLiveSync();
}

function updateNavLinksWithAccess() {
  if (typeof document === 'undefined') return;
  try {
    const duoSaved = (localStorage.getItem(AUTH_STORAGE_KEY_DUO) || '').toLowerCase();
    const trioSaved = (localStorage.getItem(AUTH_STORAGE_KEY_TRIO) || '').toLowerCase();
    const legacySaved = (localStorage.getItem('xyltax_vision_auth_token') || '').toLowerCase();
    const activeToken = duoSaved || trioSaved || legacySaved || 'xyltax';

    // Sur trio.html : bouton "Retour à la liste à 2"
    const duoNav = document.getElementById('duo-nav-container');
    const backToDuoBtn = document.getElementById('btn-back-to-duo');
    if (duoNav || backToDuoBtn) {
      if (duoNav) duoNav.classList.remove('hidden');
      if (backToDuoBtn) {
        backToDuoBtn.classList.remove('hidden');
        backToDuoBtn.href = 'index.html?access=' + encodeURIComponent(activeToken);
      }
    }

    // Sur index.html : propager le lien vers la liste Trio avec la clé active
    const trioLinks = document.querySelectorAll('a[href^="trio.html"], a[href^="./trio.html"]');
    trioLinks.forEach(a => {
      a.href = 'trio.html?access=' + encodeURIComponent(activeToken);
    });
  } catch (e) {}
}

let toastTimeout = null;
function showSaveToast(message) {
  const toast = document.getElementById('save-toast');
  const msgEl = document.getElementById('save-toast-message');
  if (!toast) return;
  if (msgEl && message) msgEl.textContent = message;
  toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
  }, 2200);
}

function saveData(actionNotice = null) {
  lastLocalEditTime = Date.now();
  // 1. Sauvegarde localStorage (sécurisée avec try/catch)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animeList));
  } catch (err) {
    console.warn("localStorage non accessible:", err);
  }

  // 2. Sauvegarde IndexedDB (persiste toujours en mode local)
  saveToIndexedDB(animeList);

  // 3. Sauvegarde Cloud (Firebase) + Disque (animes.json)
  saveToServer(animeList);

  // 4. Mettre à jour les filtres et les statistiques
  updateCategoryFilterOptions();
  updateStats();

  // 5. Diffusion instantanée (0ms) aux autres onglets ouverts
  if (broadcastChan) {
    try {
      broadcastChan.postMessage({
        type: 'DATA_UPDATED',
        listType: IS_TRIO ? 'trio' : 'duo',
        data: animeList
      });
    } catch(e) {}
  }

  // 6. Afficher une confirmation visuelle à Vision, Xyltax & Limule
  if (actionNotice) {
    showSaveToast(`✓ ${actionNotice}`);
  }
}

function resetToInitialData() {
  if (IS_TRIO) {
    if (confirm("Voulez-vous vider la liste du trio ?")) {
      animeList = [];
      saveData("Liste du trio vidée");
      renderAnimeList();
    }
    return;
  }
  if (confirm("Voulez-vous réinitialiser la liste avec les 8 animés d'origine ? Vos ajouts personnalisés seront écrasés.")) {
    animeList = JSON.parse(JSON.stringify(INITIAL_ANIME_LIST));
    saveData("Liste réinitialisée");
    renderAnimeList();
  }
}

function setCategoryFilter(cat) {
  currentCategoryFilter = cat;
  renderAnimeList();
}

function filterByTag(tag) {
  currentCategoryFilter = tag;
  const select = document.getElementById('category-filter');
  if (select) {
    let found = false;
    for (let opt of select.options) {
      if (opt.value.toLowerCase() === tag.toLowerCase()) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) select.value = 'all';
  }
  renderAnimeList();
}

function updateCategoryFilterOptions() {
  const select = document.getElementById('category-filter');
  if (!select) return;
  const currentVal = currentCategoryFilter;

  const categories = new Set();
  animeList.forEach(a => {
    if (a.category && a.category.trim()) {
      const parts = a.category.split(/[\/,]/).map(s => s.trim()).filter(Boolean);
      parts.forEach(p => categories.add(p));
    }
  });

  const sorted = Array.from(categories).sort((a, b) => a.localeCompare(b));
  let html = '<option value="all">🏷️ Toutes catégories</option>';
  sorted.forEach(cat => {
    const isSelected = cat.toLowerCase() === currentVal.toLowerCase() ? 'selected' : '';
    html += `<option value="${escapeHtml(cat)}" ${isSelected}>${escapeHtml(cat)}</option>`;
  });

  select.innerHTML = html;
}

// Render logic
function renderAnimeList() {
  const grid = document.getElementById('anime-grid');
  const emptyState = document.getElementById('empty-state');
  const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
  const sortType = document.getElementById('sort-select').value;
  const clearSearchBtn = document.getElementById('clear-search');

  clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);

  // Filtering
  let filtered = animeList.filter(item => {
    const matchesStatus = (currentFilter === 'all') || (item.status === currentFilter);
    
    let matchesCategory = true;
    if (currentCategoryFilter !== 'all') {
      matchesCategory = item.category && item.category.toLowerCase().includes(currentCategoryFilter.toLowerCase());
    }

    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery) ||
      (item.shortTitle && item.shortTitle.toLowerCase().includes(searchQuery)) ||
      (item.category && item.category.toLowerCase().includes(searchQuery)) ||
      (item.review && item.review.toLowerCase().includes(searchQuery)) ||
      (item.recommender && item.recommender.toLowerCase().includes(searchQuery));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortType === 'category-asc') {
      const catA = (a.category || 'zzz').toLowerCase();
      const catB = (b.category || 'zzz').toLowerCase();
      if (catA !== catB) return catA.localeCompare(catB);
      return (a.shortTitle || a.title).localeCompare(b.shortTitle || b.title);
    }
    if (sortType === 'recommender-asc') {
      const recA = (a.recommender || '').toLowerCase();
      const recB = (b.recommender || '').toLowerCase();
      if (recA !== recB) return recA.localeCompare(recB);
      return (a.shortTitle || a.title).localeCompare(b.shortTitle || b.title);
    }
    if (sortType === 'name-asc') return (a.shortTitle || a.title).localeCompare(b.shortTitle || b.title);
    if (sortType === 'name-desc') return (b.shortTitle || b.title).localeCompare(a.shortTitle || a.title);
    if (sortType === 'score-desc') return (b.rating || 0) - (a.rating || 0);
    if (sortType === 'date-asc') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); // default date-desc
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    grid.innerHTML = filtered.map(item => createCardHtml(item)).join('');
  }

  updateStats();
  lucide.createIcons();
}

// Helper to parse and calculate episode progress
function parseEpisodeProgress(epStr) {
  if (!epStr) return { watched: 0, total: null, percent: 0, display: "0" };
  const str = String(epStr).trim();

  // Pattern "X/Y" (ex: "4/24")
  const slashMatch = str.match(/^(\d+)\s*\/\s*(\d+|\?)$/);
  if (slashMatch) {
    const watched = parseInt(slashMatch[1], 10);
    const total = slashMatch[2] === '?' ? null : parseInt(slashMatch[2], 10);
    const percent = total && total > 0 ? Math.min(100, Math.round((watched / total) * 100)) : (watched > 0 ? 50 : 0);
    return { watched, total, percent, display: total ? `${watched}/${total}` : `${watched}/?` };
  }

  // Pattern "X eps" (ex: "12 eps")
  const epsMatch = str.match(/^(\d+)\s*eps?$/i);
  if (epsMatch) {
    const total = parseInt(epsMatch[1], 10);
    return { watched: 0, total, percent: 0, display: `0/${total}` };
  }

  // Plain number
  const numMatch = str.match(/^(\d+)$/);
  if (numMatch) {
    const watched = parseInt(numMatch[1], 10);
    return { watched, total: null, percent: 0, display: `${watched}` };
  }

  return { watched: 0, total: null, percent: 0, display: "0" };
}

function createCardHtml(anime) {
  const statusInfo = STATUS_MAP[anime.status] || STATUS_MAP.watching;
  const displayTitle = anime.shortTitle || anime.title || "Animé";
  const hasRating = anime.rating !== null && anime.rating !== undefined && anime.rating !== '';
  const progress = parseEpisodeProgress(anime.episodes);

  const imageContent = anime.image 
    ? `<img src="${escapeHtml(anime.image)}" alt="${escapeHtml(displayTitle)}" loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\\'absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-900/60 to-slate-900 text-purple-300 font-bold text-xl\\\'>${escapeHtml(displayTitle.slice(0, 3))}</div>'"/>`
    : `<div class="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950 text-purple-300 font-bold text-2xl tracking-wider select-none">${escapeHtml(displayTitle.slice(0, 3).toUpperCase())}</div>`;

  return `
    <div class="group relative rounded-2xl bg-surface-card border border-[#232738] overflow-hidden flex flex-col sm:flex-row glow-hover transition-all duration-300 hover:-translate-y-1">
      
      <!-- Affiche à gauche (Pleine hauteur sans bande noire, proportions nettes) -->
      <div class="relative w-full h-60 sm:h-auto sm:w-52 md:w-56 lg:w-60 min-h-[16rem] bg-slate-900 overflow-hidden shrink-0">
        ${imageContent}
        <div class="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-surface-card/60 via-transparent to-transparent pointer-events-none"></div>
        
        <!-- Status Badge Overlay -->
        <div class="absolute top-3 left-3 z-10">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${statusInfo.class} shadow-lg">
            ${statusInfo.badge}
          </span>
        </div>

        <!-- Rating Badge (if any) -->
        ${hasRating ? `
          <div class="absolute top-3 right-3 z-10">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-lg">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
              ${anime.rating}/10
            </span>
          </div>
        ` : ''}

        <!-- Recommended by Pill -->
        ${anime.recommender ? `
          <div class="absolute bottom-2.5 left-3 z-10">
            <span class="text-[11px] font-medium text-slate-300/90 bg-black/75 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10 shadow">
              Par ${escapeHtml(anime.recommender)}
            </span>
          </div>
        ` : ''}

        <!-- Episodes Pill -->
        ${anime.episodes ? `
          <div class="absolute bottom-2.5 right-3 z-10">
            <span class="text-[11px] font-semibold text-slate-200 bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#2a2f42] shadow">
              ${progress.total !== null && progress.watched >= progress.total ? '✅ ' : ''}${progress.display}
            </span>
          </div>
        ` : ''}
      </div>

      <!-- Card Body / Contrôles et détails à droite -->
      <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <h3 class="font-bold text-base text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors">
              ${escapeHtml(displayTitle)}
            </h3>
          </div>
          ${anime.title && anime.title !== displayTitle ? `
            <p class="text-xs text-slate-500 mb-1.5 truncate" title="${escapeHtml(anime.title)}">${escapeHtml(anime.title)}</p>
          ` : ''}

          <!-- Category / Genre Tags -->
          ${anime.category ? `
            <div class="flex flex-wrap gap-1 mb-2.5">
              ${anime.category.split(/[\/,]/).map(t => t.trim()).filter(Boolean).map(tag => `
                <button 
                  type="button" 
                  onclick="filterByTag('${escapeHtml(tag)}')" 
                  title="Filtrer par la catégorie '${escapeHtml(tag)}'" 
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 transition active:scale-95">
                  #${escapeHtml(tag)}
                </button>
              `).join('')}
            </div>
          ` : ''}

          <!-- Review / Comment Box -->
          <div class="mb-3 p-2.5 rounded-lg bg-[#0f111a]/60 border border-[#232738] min-h-[3.6rem] flex items-center">
            ${anime.review && anime.review.trim() ? `
              <p class="text-xs text-slate-300 leading-relaxed italic line-clamp-2">
                "${escapeHtml(anime.review)}"
              </p>
            ` : `
              <p class="text-xs text-slate-500/70 italic flex items-center gap-1.5">
                <i data-lucide="message-square" class="w-3.5 h-3.5 text-slate-600 shrink-0"></i>
                <span>Aucun avis rédigé...</span>
              </p>
            `}
          </div>

          <!-- Interactive Episode Counter & Progress Bar -->
          <div class="mb-3 p-2.5 rounded-xl bg-[#0f111a]/70 border border-[#232738]">
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="text-slate-400 font-medium flex items-center gap-1.5">
                <i data-lucide="tv" class="w-3.5 h-3.5 text-purple-400"></i>
                Épisodes
              </span>
              <div class="flex items-center gap-1">
                <button 
                  type="button"
                  onclick="updateEpisode('${anime.id}', -1)" 
                  title="Épisode précédent (-1)"
                  class="w-7 h-7 sm:w-6 sm:h-6 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm sm:text-xs transition active:scale-90 border border-[#2a2f42] ${progress.watched <= 0 ? 'opacity-30 cursor-not-allowed' : ''}">
                  -
                </button>
                <button
                  type="button"
                  onclick="promptSetEpisode('${anime.id}')"
                  title="Cliquer pour modifier directement le nombre d'épisodes"
                  class="px-2.5 py-1 sm:py-0.5 rounded-lg bg-[#0f111a] border border-[#2a2f42] hover:border-purple-500/60 text-xs font-bold text-white transition min-w-[3.5rem] text-center">
                  ${progress.display}
                </button>
                <button 
                  type="button"
                  onclick="updateEpisode('${anime.id}', 1)" 
                  title="Ajouter un épisode (+1)"
                  class="w-7 h-7 sm:w-6 sm:h-6 rounded-lg bg-purple-900/40 hover:bg-purple-800 text-purple-300 hover:text-white flex items-center justify-center font-bold text-sm sm:text-xs transition active:scale-90 border border-purple-500/40 shadow-sm shadow-purple-500/20">
                  +
                </button>
              </div>
            </div>
            <!-- Progress bar gauge (Toujours visible et stylée) -->
            <div class="progress-track w-full h-2 rounded-full overflow-hidden">
              <div 
                class="progress-fill h-full rounded-full transition-all duration-300" 
                style="width: ${progress.percent}%; min-width: ${progress.watched > 0 ? '6px' : '0'}; background: linear-gradient(90deg, #8b5cf6 0%, #a855f7 40%, #ec4899 100%);">
              </div>
            </div>
          </div>
        </div>

        <!-- Card Actions -->
        <div class="pt-3 border-t border-[#232738] flex items-center justify-between gap-2 mt-auto">
          <!-- Direct Intelligent Status Selector -->
          <div class="relative flex-1 sm:flex-none">
            <select 
              onchange="changeStatusIntelligent('${anime.id}', this.value)" 
              title="Choisir le statut directement" 
              class="w-full sm:w-auto appearance-none pl-2.5 pr-6 py-1.5 sm:py-1 rounded-lg text-xs font-semibold border border-[#2a2f42] transition cursor-pointer ${statusInfo.class} bg-[#181b26] hover:bg-[#202433] focus:outline-none focus:ring-1 focus:ring-brand-500 shadow-sm">
              <option value="watching" class="bg-[#181b26] text-amber-400 font-semibold py-1" ${anime.status === 'watching' ? 'selected' : ''}>🕗 En cours</option>
              <option value="completed" class="bg-[#181b26] text-emerald-400 font-semibold py-1" ${anime.status === 'completed' ? 'selected' : ''}>✅ Validé</option>
              <option value="dropped" class="bg-[#181b26] text-rose-400 font-semibold py-1" ${anime.status === 'dropped' ? 'selected' : ''}>❌ A voir</option>
            </select>
            <i data-lucide="chevron-down" class="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"></i>
          </div>

          <!-- Actions (AniList link, Edit, Delete) -->
          <div class="flex items-center gap-1 shrink-0">
            <a 
              href="${anime.anilistUrl || `https://anilist.co/search/anime?search=${encodeURIComponent(anime.shortTitle || anime.title)}`}" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Consulter la fiche sur AniList" 
              class="p-2 sm:p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition active:scale-90">
              <i data-lucide="external-link" class="w-4 h-4"></i>
            </a>
            <button 
              onclick="editAnime('${anime.id}')" 
              title="Modifier" 
              class="p-2 sm:p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition active:scale-90">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button 
              onclick="deleteAnime('${anime.id}')" 
              title="Supprimer" 
              class="p-2 sm:p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition active:scale-90">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}
// Filter controls
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-brand-600', 'text-white', 'shadow', 'border-brand-500');
    btn.classList.add('text-slate-400', 'bg-[#181b26]', 'border-[#2a2f42]');
  });

  const activeBtn = document.getElementById(`filter-${filter}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-400', 'bg-[#181b26]', 'border-[#2a2f42]');
    activeBtn.classList.add('bg-brand-600', 'text-white', 'shadow', 'border-brand-500');
  }

  renderAnimeList();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  renderAnimeList();
}

function updateStats() {
  const total = animeList.length;
  const completed = animeList.filter(a => a.status === 'completed').length;
  const watching = animeList.filter(a => a.status === 'watching').length;
  const dropped = animeList.filter(a => a.status === 'dropped').length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-watching').textContent = watching;
  document.getElementById('stat-dropped').textContent = dropped;

  document.getElementById('count-all').textContent = total;
  document.getElementById('count-completed').textContent = completed;
  document.getElementById('count-watching').textContent = watching;
  document.getElementById('count-dropped').textContent = dropped;
}

// Direct & Intelligent Status Manager
function changeStatusIntelligent(id, newStatus) {
  const anime = animeList.find(a => a.id === id);
  if (!anime || anime.status === newStatus) return;

  const oldStatus = anime.status;
  anime.status = newStatus;
  const prog = parseEpisodeProgress(anime.episodes);

  // Intelligent synchronization with episode count:
  if (newStatus === 'completed') {
    // If marked completed, auto-complete all episodes if total is known
    if (prog.total !== null && prog.watched < prog.total) {
      anime.episodes = `${prog.total}/${prog.total}`;
    }
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 }
    });
  } else if (newStatus === 'dropped') {
    // "A voir" implique 0 épisodes vus
    if (prog.total !== null) {
      anime.episodes = `0/${prog.total}`;
    } else {
      anime.episodes = '0';
    }
  } else if (newStatus === 'watching') {
    // Si passage à "En cours" depuis "A voir" (0 eps), démarrer à 1
    if (oldStatus === 'dropped' && prog.watched === 0) {
      anime.episodes = prog.total !== null ? `1/${prog.total}` : '1';
    } else if (oldStatus === 'completed' && prog.total !== null && prog.watched >= prog.total) {
      // Si retour à "En cours" depuis terminé, mettre à total - 1
      const prev = Math.max(0, prog.total - 1);
      anime.episodes = `${prev}/${prog.total}`;
    }
  }

  anime.updatedAt = new Date().toISOString();
  saveData("Statut mis à jour");
  renderAnimeList();
}

// Easy Episode Counter Logic
function updateEpisode(id, delta) {
  const anime = animeList.find(a => String(a.id) === String(id));
  if (!anime) return;

  const prog = parseEpisodeProgress(anime.episodes);
  let newWatched = Math.max(0, prog.watched + delta);

  if (prog.total !== null && newWatched > prog.total) {
    newWatched = prog.total;
  }

  // Ne rien faire si on est déjà à 0 et qu'on essaie de retirer
  if (newWatched === prog.watched && delta < 0) return;

  anime.episodes = prog.total !== null ? `${newWatched}/${prog.total}` : `${newWatched}`;
  anime.updatedAt = new Date().toISOString();

  // Smart status transition
  if (delta > 0 && anime.status === 'dropped' && newWatched > 0) {
    anime.status = 'watching';
  } else if (prog.total !== null && newWatched >= prog.total && anime.status !== 'completed') {
    anime.status = 'completed';
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else if (delta < 0 && prog.total !== null && newWatched < prog.total && anime.status === 'completed') {
    anime.status = 'watching';
  } else if (delta < 0 && newWatched === 0 && anime.status === 'watching') {
    anime.status = 'dropped';
  }

  saveData("Progression enregistrée");
  renderAnimeList();
}

function promptSetEpisode(id) {
  const anime = animeList.find(a => String(a.id) === String(id));
  if (!anime) return;

  const prog = parseEpisodeProgress(anime.episodes);
  const totalHint = prog.total !== null ? ` (sur ${prog.total})` : '';
  const input = prompt(`Nombre d'épisodes vus pour "${anime.shortTitle || anime.title}"${totalHint} :`, prog.watched);
  
  if (input === null) return;
  const num = parseInt(input.trim(), 10);
  if (isNaN(num) || num < 0) {
    alert("Veuillez entrer un nombre valide.");
    return;
  }

  let newWatched = num;
  if (prog.total !== null && newWatched > prog.total) {
    newWatched = prog.total;
  }

  anime.episodes = prog.total !== null ? `${newWatched}/${prog.total}` : `${newWatched}`;
  anime.updatedAt = new Date().toISOString();

  if (prog.total !== null && newWatched >= prog.total && anime.status !== 'completed') {
    anime.status = 'completed';
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else if (prog.total !== null && newWatched < prog.total && anime.status === 'completed') {
    anime.status = 'watching';
  } else if (newWatched === 0 && anime.status === 'watching') {
    anime.status = 'dropped';
  } else if (newWatched > 0 && anime.status === 'dropped') {
    anime.status = 'watching';
  }

  saveData("Progression enregistrée");
  renderAnimeList();
}

// Modal Add / Edit
function openModal(editId = null) {
  const modal = document.getElementById('anime-modal');
  const form = document.getElementById('anime-form');
  const modalTitle = document.getElementById('modal-title');
  const submitBtn = document.getElementById('modal-submit-btn');
  const fetchStatus = document.getElementById('fetch-status');
  
  fetchStatus.classList.add('hidden');
  form.reset();

  if (editId) {
    const item = animeList.find(a => a.id === editId);
    if (item) {
      document.getElementById('anime-id').value = item.id;
      document.getElementById('form-title').value = item.shortTitle || item.title;
      document.getElementById('form-status').value = item.status;
      document.getElementById('form-recommender').value = item.recommender || 'Les deux';
      document.getElementById('form-rating').value = item.rating || '';
      
      const prog = parseEpisodeProgress(item.episodes);
      document.getElementById('form-episodes-watched').value = prog.watched;
      document.getElementById('form-episodes-total').value = prog.total !== null ? prog.total : '';

      document.getElementById('form-category').value = item.category || '';
      document.getElementById('form-image').value = item.image || '';
      document.getElementById('form-review').value = item.review || '';
      document.getElementById('form-anilist-url').value = item.anilistUrl || '';
      
      modalTitle.textContent = "Modifier l'animé";
      submitBtn.textContent = "Mettre à jour";
    }
  } else {
    document.getElementById('anime-id').value = '';
    document.getElementById('form-anilist-url').value = '';
    document.getElementById('form-category').value = '';
    document.getElementById('form-status').value = 'dropped';
    document.getElementById('form-episodes-watched').value = '0';
    document.getElementById('form-episodes-total').value = '';
    const recSelect = document.getElementById('form-recommender');
    if (recSelect) {
      recSelect.value = IS_TRIO ? 'Les trois' : 'Les deux';
    }
    modalTitle.textContent = "Ajouter un animé";
    submitBtn.textContent = "Ajouter à la liste";
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeModal() {
  document.getElementById('anime-modal').classList.add('hidden');
}

function editAnime(id) {
  openModal(id);
}

function deleteAnime(id) {
  const item = animeList.find(a => a.id === id);
  const title = item ? (item.shortTitle || item.title) : "cet animé";
  if (confirm(`Voulez-vous vraiment supprimer "${title}" de la liste ?`)) {
    animeList = animeList.filter(a => a.id !== id);
    saveData("Animé supprimé");
    renderAnimeList();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('anime-id').value;
  const title = document.getElementById('form-title').value.trim();
  const status = document.getElementById('form-status').value;
  const recommender = document.getElementById('form-recommender').value;
  const ratingRaw = document.getElementById('form-rating').value;
  const rating = ratingRaw !== '' ? parseFloat(ratingRaw) : null;
  
  const watchedRaw = document.getElementById('form-episodes-watched').value;
  const totalRaw = document.getElementById('form-episodes-total').value;
  let episodes = '';
  if (totalRaw && !isNaN(parseInt(totalRaw, 10))) {
    const w = watchedRaw !== '' ? Math.max(0, parseInt(watchedRaw, 10)) : 0;
    episodes = `${w}/${parseInt(totalRaw, 10)}`;
  } else if (watchedRaw !== '' && !isNaN(parseInt(watchedRaw, 10))) {
    episodes = `${Math.max(0, parseInt(watchedRaw, 10))}`;
  }

  const category = document.getElementById('form-category').value.trim();
  const image = document.getElementById('form-image').value.trim();
  const review = document.getElementById('form-review').value.trim();
  const anilistUrl = document.getElementById('form-anilist-url').value.trim();

  if (!title) return;

  if (id) {
    // Edit existing
    const index = animeList.findIndex(a => a.id === id);
    if (index !== -1) {
      animeList[index] = {
        ...animeList[index],
        title: title,
        shortTitle: title,
        category: category,
        status,
        recommender,
        rating,
        episodes,
        image,
        review,
        anilistUrl: anilistUrl || animeList[index].anilistUrl || '',
        updatedAt: new Date().toISOString()
      };
    }
  } else {
    // Create new
    const newAnime = {
      id: Date.now().toString(),
      title: title,
      shortTitle: title,
      category: category,
      status,
      recommender,
      rating,
      episodes,
      image,
      review,
      anilistUrl: anilistUrl || '',
      createdAt: new Date().toISOString()
    };
    animeList.unshift(newAnime);

    // Confetti celebration if completed
    if (status === 'completed') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  saveData(id ? "Animé mis à jour" : "Animé ajouté");
  renderAnimeList();
  closeModal();
}

// Auto-fetch anime info from AniList GraphQL API
async function autoFetchAnimeInfo() {
  const titleInput = document.getElementById('form-title');
  const fetchStatus = document.getElementById('fetch-status');
  const query = titleInput.value.trim();

  if (!query) {
    alert("Entrez d'abord un titre d'animé pour effectuer la recherche.");
    return;
  }

  fetchStatus.classList.remove('hidden');
  fetchStatus.textContent = `Recherche de "${query}" sur AniList...`;
  fetchStatus.className = "text-[11px] text-purple-400 mt-1 animate-pulse";

  const gqlQuery = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        id
        siteUrl
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
          large
        }
        episodes
        genres
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        query: gqlQuery,
        variables: { search: query }
      })
    });

    const data = await response.json();
    const anime = data.data?.Media;

    if (anime) {
      // HD Cover Image from AniList CDN
      const coverUrl = anime.coverImage?.extraLarge || anime.coverImage?.large;
      if (coverUrl) {
        document.getElementById('form-image').value = coverUrl;
      }

      // Episodes count
      if (anime.episodes) {
        document.getElementById('form-episodes-total').value = anime.episodes;
        if (!document.getElementById('form-episodes-watched').value) {
          document.getElementById('form-episodes-watched').value = '0';
        }
      }

      // Category / Genres from AniList
      if (anime.genres && anime.genres.length > 0) {
        const genreTranslations = {
          "Action": "Action",
          "Adventure": "Aventure",
          "Comedy": "Comédie",
          "Drama": "Drame",
          "Ecchi": "Ecchi",
          "Fantasy": "Fantaisie",
          "Horror": "Horreur",
          "Mahou Shoujo": "Magie",
          "Mecha": "Mecha",
          "Music": "Musique",
          "Mystery": "Mystère",
          "Psychological": "Psychologique",
          "Romance": "Romance",
          "Sci-Fi": "Sci-Fi",
          "Slice of Life": "Tranche de vie",
          "Sports": "Sport",
          "Supernatural": "Surnaturel",
          "Thriller": "Thriller"
        };
        const mapped = anime.genres.slice(0, 3).map(g => genreTranslations[g] || g).join(' / ');
        document.getElementById('form-category').value = mapped;
      }

      // AniList page link
      if (anime.siteUrl) {
        document.getElementById('form-anilist-url').value = anime.siteUrl;
      }

      const foundTitle = anime.title.english || anime.title.romaji;
      fetchStatus.textContent = `Trouvé sur AniList : ${foundTitle} ! Affiche HD importée ✨`;
      fetchStatus.className = "text-[11px] text-emerald-400 mt-1";
    } else {
      fetchStatus.textContent = "Aucun résultat trouvé sur AniList. Vous pouvez renseigner l'affiche manuellement.";
      fetchStatus.className = "text-[11px] text-amber-400 mt-1";
    }
  } catch (err) {
    console.warn("Erreur auto-fetch AniList", err);
    fetchStatus.textContent = "Impossible de contacter l'API AniList. Renseignez l'affiche manuellement.";
    fetchStatus.className = "text-[11px] text-rose-400 mt-1";
  }
}

// Random Pick feature for watching/planning (with Rickroll surprise in troll mode)
function pickRandomAnime() {
  const candidates = animeList.filter(a => a.status === 'watching');
  const pool = candidates.length > 0 ? candidates : animeList;

  if (pool.length === 0) {
    alert("Votre liste est vide ! Ajoutez des animés d'abord.");
    return;
  }

  const randomItem = pool[Math.floor(Math.random() * pool.length)];
  
  document.getElementById('random-title').textContent = randomItem.shortTitle || randomItem.title;
  const defaultRec = IS_TRIO ? 'Les trois' : 'Les deux';
  document.getElementById('random-recommender').textContent = `Statut : ${STATUS_MAP[randomItem.status].label} • Recommandé par : ${randomItem.recommender || defaultRec}`;

  document.getElementById('random-modal').classList.remove('hidden');

  confetti({
    particleCount: 60,
    spread: 80,
    origin: { y: 0.5 }
  });
  lucide.createIcons();
}

function closeRandomModal() {
  document.getElementById('random-modal').classList.add('hidden');
}

// Data Backup / Restore Modal
function openDataModal() {
  const area = document.getElementById('json-data-area');
  area.value = JSON.stringify(animeList, null, 2);
  document.getElementById('data-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeDataModal() {
  document.getElementById('data-modal').classList.add('hidden');
}

function copyJsonToClipboard() {
  const area = document.getElementById('json-data-area');
  navigator.clipboard.writeText(area.value).then(() => {
    const target = IS_TRIO ? "Limule ou Xyltax" : "Xyltax";
    alert(`Données JSON copiées dans le presse-papier ! Tu peux les envoyer à ${target}.`);
  });
}

function downloadJsonFile() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(animeList, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  const prefix = IS_TRIO ? 'anime_list_trio_vision_xyltax_limule_' : 'anime_list_vision_xyltax_';
  downloadAnchor.setAttribute("download", `${prefix}${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importJsonData() {
  const area = document.getElementById('json-data-area');
  try {
    const parsed = JSON.parse(area.value);
    if (Array.isArray(parsed)) {
      if (confirm(`Importer ces ${parsed.length} animés ? Cela remplacera votre liste actuelle.`)) {
        animeList = parsed;
        saveData("Liste importée");
        renderAnimeList();
        closeDataModal();
        alert("Liste importée avec succès !");
      }
    } else {
      alert("Le format JSON doit être une liste (tableau d'animés).");
    }
  } catch (e) {
    alert("Erreur : le texte n'est pas un JSON valide.");
  }
}

// Helper for XSS safety
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Explicit window bindings for onclick handlers in dynamically generated HTML
if (typeof window !== 'undefined') {
  window.autoFetchAnimeInfo = autoFetchAnimeInfo;
  window.changeStatusIntelligent = changeStatusIntelligent;
  window.clearSearch = clearSearch;
  window.closeDataModal = closeDataModal;
  window.closeModal = closeModal;
  window.closeRandomModal = closeRandomModal;
  window.copyJsonToClipboard = copyJsonToClipboard;
  window.deleteAnime = deleteAnime;
  window.downloadJsonFile = downloadJsonFile;
  window.editAnime = editAnime;
  window.filterByTag = filterByTag;
  window.handleFormSubmit = handleFormSubmit;
  window.handleManualUnlock = handleManualUnlock;
  window.importJsonData = importJsonData;
  window.openModal = openModal;
  window.pickRandomAnime = pickRandomAnime;
  window.promptSetEpisode = promptSetEpisode;
  window.renderAnimeList = renderAnimeList;
  window.resetToInitialData = resetToInitialData;
  window.setCategoryFilter = setCategoryFilter;
  window.setFilter = setFilter;
  window.updateEpisode = updateEpisode;
  window.init = init;
}

// Run on startup reliably (whether loaded before or after DOMContentLoaded)
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
