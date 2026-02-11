// ==================== ARIA Dashboard Server ====================
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { loadSessions, getPageInfo } from './browser.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DASHBOARD_DIR = join(__dirname, '..', 'dashboard');

const log = (...args: unknown[]) => console.error('[dashboard]', ...args);

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

export function startDashboardServer(port: number): void {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://localhost:${port}`);
    const pathname = url.pathname;

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

    // API endpoints
    if (pathname === '/api/status') {
      const sessions = loadSessions();
      let browserInfo = { url: 'about:blank', title: '' };
      try { browserInfo = await getPageInfo(); } catch {}

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        browser: { running: true, ...browserInfo },
        facebook: sessions.facebook || { logged_in: false },
        google: sessions.google || { logged_in: false },
        uptime: process.uptime(),
      }));
      return;
    }

    if (pathname === '/api/sessions') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(loadSessions()));
      return;
    }

    // Static files
    let filePath = join(DASHBOARD_DIR, pathname === '/' ? 'index.html' : pathname);
    if (!existsSync(filePath)) {
      res.writeHead(404); res.end('Not Found'); return;
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(500); res.end('Server Error');
    }
  });

  server.listen(port, () => {
    log(`ARIA Dashboard running on http://localhost:${port}`);
  });
}
