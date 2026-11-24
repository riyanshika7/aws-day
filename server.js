/**
 * server.js
 * Lightweight, production-grade zero-dependency static server for Render Web Service deployment.
 * Automatically serves Vite's `dist/` folder, sets correct MIME types for GLB/3D assets,
 * handles client-side SPA routing fallback to index.html, and binds to process.env.PORT.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.geojson': 'application/geo+json; charset=utf-8',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  // Parse URL safely
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  // Security: prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  // Check if requested path exists and is a file
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (!readErr) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Cache control: immutable for hashed assets, standard for others
        const isHashed = filePath.includes(`${path.sep}assets${path.sep}`);
        const cacheControl = isHashed
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=3600';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': data.length,
          'Cache-Control': cacheControl,
          'X-Content-Type-Options': 'nosniff',
        });
        return res.end(data);
      }

      // SPA Fallback: if not found, serve dist/index.html (for client-side routing)
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, indexData) => {
        if (indexErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('404 Not Found - Build the project first using npm run build');
        }

        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Length': indexData.length,
          'Cache-Control': 'no-cache',
        });
        res.end(indexData);
      });
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 NITJ Campus Navigator running on http://${HOST}:${PORT}`);
  console.log(`📁 Serving static assets from: ${DIST_DIR}`);
});
