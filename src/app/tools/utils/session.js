// Centralized session management utility
// Usage: import session from './session.js'

const SESSION_KEY = 'app_session';

const session = {
  get(key) {
    try {
      const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
      return key ? sessionData[key] : sessionData;
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
      sessionData[key] = value;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {}
  },
  remove(key) {
    try {
      const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
      delete sessionData[key];
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {}
  },
  clear() {
    localStorage.removeItem(SESSION_KEY);
  },
  // Optional: cache invalidation by timestamp
  isExpired(key, maxAgeMs) {
    const item = this.get(key);
    if (!item || !item._ts) return true;
    return Date.now() - item._ts > maxAgeMs;
  },
  setWithExpiry(key, value, maxAgeMs) {
    this.set(key, { ...value, _ts: Date.now(), _maxAge: maxAgeMs });
  }
};

export default session;
