// Generic JSON fetch with retry + exponential backoff and timeout.
export async function fetchWithRetry(url, { method = 'GET', headers = {}, body, signal, retries = 3, timeoutMs = 15000, backoffBase = 500 } = {}) {
  let attempt = 0;
  let lastErr;
  while (attempt <= retries) {
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { method, headers, body, signal: signal || controller.signal });
      clearTimeout(to);
      if (!res.ok) {
        // Retry only on 429 / 5xx
        if ([429,500,502,503,504].includes(res.status) && attempt < retries) {
          attempt++; await wait(backoffBase * Math.pow(2, attempt-1)); continue;
        }
        const text = await res.text().catch(()=> '');
        throw new Error(`HTTP ${res.status} ${text}`);
      }
      // Attempt JSON parse; fallback to text
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) return await res.json();
      const txt = await res.text();
      try { return JSON.parse(txt); } catch { return txt; }
    } catch (e) {
      clearTimeout(to);
      lastErr = e;
      if (e.name === 'AbortError' && signal) throw e; // external abort
      if (attempt >= retries) break;
      attempt++;
      await wait(backoffBase * Math.pow(2, attempt-1));
    }
  }
  throw lastErr || new Error('fetchWithRetry failed');
}

function wait(ms){ return new Promise(r=> setTimeout(r, ms)); }
