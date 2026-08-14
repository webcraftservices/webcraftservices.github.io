#!/usr/bin/env node
/**
 * Post-build step for GitHub Pages SPA routing.
 *
 * GitHub Pages has no server-side rewrites, so it can only return
 * HTTP 200 for a URL that corresponds to a real file. Direct requests
 * to a client-side route like /business therefore hit GitHub Pages'
 * catch-all 404.html — which is a *real* HTTP 404 response, even
 * though 404.html happens to contain a full copy of the app that
 * would render the right page once JavaScript runs. Googlebot (and
 * Search Console) trusts the HTTP status code, not what the page
 * renders into — so it correctly reports /business and /personal as
 * 404s. A client-side JS redirect through 404.html doesn't fix this:
 * the first response Googlebot sees is still a 404.
 *
 * The reliable fix is to make /business and /personal real files.
 * This script copies the built index.html into a genuine
 * dist/<route>/index.html for every route the app actually serves.
 * GitHub Pages then resolves https://webcraftservices.online/business
 * directly to that file (the same implicit-index behavior every
 * static host uses for pretty URLs) and returns a real HTTP 200 —
 * no redirect, no extra request, nothing for a crawler to execute.
 *
 * This is safe because vite.config.ts sets `base: '/'`, so every
 * asset reference in the built index.html is root-absolute (e.g.
 * /assets/main-abc123.js). The copied file works identically however
 * deep it's served from — no path rewriting needed, and once
 * JavaScript loads, wouter reads the real window.location.pathname
 * and renders the matching route exactly as it already does today —
 * routing, canonical URLs, and structured data are untouched.
 *
 * Routes are read directly from src/App.tsx's <Route path="..."> list
 * (the catch-all `<Route component={NotFound} />` has no path
 * attribute and is deliberately excluded), so this can't drift out of
 * sync with the app: add a route in App.tsx and it's automatically
 * pre-rendered here too, with no second list to maintain.
 *
 * dist/404.html is still generated from the same index.html, for
 * paths that aren't real routes — those should keep returning a
 * genuine 404, and they still do.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const appSourcePath = join(root, 'src/App.tsx');
const indexPath = join(distDir, 'index.html');

const appSource = readFileSync(appSourcePath, 'utf8');
const routeMatches = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)];
const routes = routeMatches.map((m) => m[1]).filter((path) => path !== '/');

if (routes.length === 0) {
  console.warn(
    '[postbuild] No routes found in src/App.tsx beyond "/". If routes were added, check the <Route path="..."> pattern still matches.'
  );
}

const indexHtml = readFileSync(indexPath, 'utf8');

for (const route of routes) {
  const routeDir = join(distDir, route.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, 'index.html'), indexHtml);
  console.log(`[postbuild] ${route}/index.html generated (serves HTTP 200 on GitHub Pages)`);
}

copyFileSync(indexPath, join(distDir, '404.html'));
console.log('[postbuild] dist/404.html generated (fallback for genuinely nonexistent paths)');
