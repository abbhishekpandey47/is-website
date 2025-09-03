// Simple TTL cache layer over localStorage / sessionStorage
// getCache(key): returns value or null
// setCache(key, value, ttlMs): stores JSON with expires timestamp
// clearExpired(prefix?): remove expired entries optionally filtered by prefix

export function setCache(key, value, ttlMs = 5 * 60 * 1000, storage = 'local') {
  try {
    const store = storage === 'session' ? window.sessionStorage : window.localStorage;
    const expires = Date.now() + ttlMs;
    store.setItem(key, JSON.stringify({ v: value, e: expires }));
  } catch {}
}

export function getCache(key, storage = 'local') {
  try {
    const store = storage === 'session' ? window.sessionStorage : window.localStorage;
    const raw = store.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.e && Date.now() > parsed.e) {
      store.removeItem(key);
      return null;
    }
    return parsed.v;
  } catch {
    return null;
  }
}

export function clearExpired(prefix = '', storage = 'local') {
  try {
    const store = storage === 'session' ? window.sessionStorage : window.localStorage;
    const now = Date.now();
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (!k) continue;
      if (prefix && !k.startsWith(prefix)) continue;
      try {
        const parsed = JSON.parse(store.getItem(k));
        if (parsed?.e && now > parsed.e) store.removeItem(k);
      } catch {}
    }
  } catch {}
}
