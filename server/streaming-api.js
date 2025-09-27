/*
  Simple Express server demonstrating streaming large JSON in chunks.
  Provides two endpoints:
    - /stream-array: streams a JSON array by writing elements incrementally
    - /stream-ndjson: streams newline-delimited JSON (NDJSON)

  Usage:
    PORT=4001 node server/streaming-api.js
    curl -N "http://localhost:4001/stream-array?items=1000&delay=1"
    curl -N "http://localhost:4001/stream-ndjson?items=1000&delay=1"
*/

const express = require('express');
const cors = require('cors');
const { once } = require('events');

const app = express();
app.use(cors());

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Helper: wait for a number of milliseconds
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Helper: write to res with backpressure awareness
async function writeChunk(res, chunk) {
  if (!res.write(chunk)) {
    await once(res, 'drain');
  }
}

// Streams a large JSON array incrementally: [ {..}, {..}, ... ]
app.get('/stream-array', async (req, res) => {
  const total = Math.max(1, Math.min(10_000_000, Number(req.query.items) || 1000));
  const delay = Math.max(0, Math.min(10_000, Number(req.query.delay) || 0)); // ms between items

  // Hint proxies not to buffer; use chunked transfer
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Detect client disconnect to stop work early
  let aborted = false;
  req.on('close', () => {
    aborted = true;
  });

  try {
    await writeChunk(res, '[');
    for (let i = 0; i < total; i++) {
      if (aborted) break;

      const item = {
        id: i + 1,
        timestamp: new Date().toISOString(),
        value: Math.random(),
      };
      const payload = (i === 0 ? '' : ',') + JSON.stringify(item);
      await writeChunk(res, payload);
      if (delay) await sleep(delay);
    }
    await writeChunk(res, ']');
  } catch (err) {
    // If headers not sent, send a 500; otherwise, best effort end
    if (!res.headersSent) {
      res.status(500).json({ error: 'stream failed', detail: String(err && err.message || err) });
      return;
    }
  } finally {
    res.end();
  }
});

// Streams newline-delimited JSON (NDJSON). Each line is a JSON object.
app.get('/stream-ndjson', async (req, res) => {
  const total = Math.max(1, Math.min(10_000_000, Number(req.query.items) || 1000));
  const delay = Math.max(0, Math.min(10_000, Number(req.query.delay) || 0)); // ms between items

  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  let aborted = false;
  req.on('close', () => {
    aborted = true;
  });

  try {
    for (let i = 0; i < total; i++) {
      if (aborted) break;
      const item = {
        id: i + 1,
        timestamp: new Date().toISOString(),
        value: Math.random(),
      };
      await writeChunk(res, JSON.stringify(item) + '\n');
      if (delay) await sleep(delay);
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'stream failed', detail: String(err && err.message || err) });
      return;
    }
  } finally {
    res.end();
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Streaming API listening on http://localhost:${PORT}`);
});

