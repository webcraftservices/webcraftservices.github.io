#!/usr/bin/env node
/**
 * Post-build step for GitHub Pages SPA routing + SEO-safe route files.
 *
 * GitHub Pages does not support rewrite rules, so the only reliable way to
 * serve a route like /about as a real page is to publish a real file for it.
 * We therefore generate dist/about/index.html, dist/business/index.html, etc.
 * They are exact copies of the app shell, but with static meta tags matching the
 * route so crawlers receive a valid, self-describing document immediately.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://webcraftservices.online';

const routeMeta = {
  '/': {
    title: 'Business & Personal Website Development | WebCraft Services',
    description:
      'WebCraft Services designs professional business websites and handcrafted personal sites — mobile-responsive, custom-designed, and delivered in days, not months.',
    canonical: `${SITE_URL}/`,
    ogTitle: 'Business & Personal Website Development | WebCraft Services',
    ogDescription:
      'WebCraft Services designs professional business websites and handcrafted personal sites — mobile-responsive, custom-designed, and delivered in days, not months.',
  },
  '/about': {
    title: 'About WebCraft Services | Custom Website Development',
    description:
      "WebCraft Services is a boutique studio building business websites and handcrafted personal sites — here's how we work and who it's for.",
    canonical: `${SITE_URL}/about/`,
    ogTitle: 'About WebCraft Services | Custom Website Development',
    ogDescription:
      "WebCraft Services is a boutique studio building business websites and handcrafted personal sites — here's how we work and who it's for.",
  },
  '/business': {
    title: 'Business Website Development Services | WebCraft Services',
    description:
      'Conversion-focused business website development for companies, startups, and entrepreneurs — custom design, mobile-responsive, transparent pricing, fast delivery.',
    canonical: `${SITE_URL}/business/`,
    ogTitle: 'Business Website Development Services | WebCraft Services',
    ogDescription:
      'Conversion-focused business website development for companies, startups, and entrepreneurs — custom design, mobile-responsive, transparent pricing, fast delivery.',
  },
  '/personal': {
    title: 'Personal Website Development | WebCraft Services',
    description:
      'Handcrafted personal websites, portfolios, and milestone pages — bespoke design meant to celebrate, remember, and connect. Transparent pricing, fast delivery.',
    canonical: `${SITE_URL}/personal/`,
    ogTitle: 'Personal Website Development | WebCraft Services',
    ogDescription:
      'Handcrafted personal websites, portfolios, and milestone pages — bespoke design meant to celebrate, remember, and connect. Transparent pricing, fast delivery.',
  },
  '/process': {
    title: 'Website Development Process | WebCraft Services',
    description:
      'How a WebCraft Services website gets built, from your first inquiry to launch — with real delivery timelines from 5 to 14 days.',
    canonical: `${SITE_URL}/process/`,
    ogTitle: 'Website Development Process | WebCraft Services',
    ogDescription:
      'How a WebCraft Services website gets built, from your first inquiry to launch — with real delivery timelines from 5 to 14 days.',
  },
  '/contact': {
    title: 'Contact WebCraft Services | Start Your Website Project',
    description:
      'Not sure whether you need a business or personal website, or just have a question first? Get in touch with WebCraft Services directly.',
    canonical: `${SITE_URL}/contact/`,
    ogTitle: 'Contact WebCraft Services | Start Your Website Project',
    ogDescription:
      'Not sure whether you need a business or personal website, or just have a question first? Get in touch with WebCraft Services directly.',
  },
};

function applyRouteMeta(html, meta) {
  return html
    .replace(/<title>.*?<\/title>/is, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content=".*?"\s*\/?>/is,
      `<meta name="description" content="${meta.description}" />`
    )
    .replace(
      /<link rel="canonical" href=".*?"\s*\/?>/is,
      `<link rel="canonical" href="${meta.canonical}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?"\s*\/?>/is,
      `<meta property="og:title" content="${meta.ogTitle}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?"\s*\/?>/is,
      `<meta property="og:description" content="${meta.ogDescription}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?"\s*\/?>/is,
      `<meta property="og:url" content="${meta.canonical}" />`
    )
    .replace(
      /<meta name="twitter:title" content=".*?"\s*\/?>/is,
      `<meta name="twitter:title" content="${meta.ogTitle}" />`
    )
    .replace(
      /<meta name="twitter:description" content=".*?"\s*\/?>/is,
      `<meta name="twitter:description" content="${meta.ogDescription}" />`
    );
}

const root = process.cwd();
const distDir = join(root, 'dist');
const appSourcePath = join(root, 'src/App.tsx');
const indexPath = join(distDir, 'index.html');

const appSource = readFileSync(appSourcePath, 'utf8');
const routeMatches = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)];
const routes = [...new Set(routeMatches.map((m) => m[1]).filter((path) => path !== '/'))];

if (routes.length === 0) {
  console.warn(
    '[postbuild] No routes found in src/App.tsx beyond "/". If routes were added, check the <Route path="..."> pattern still matches.'
  );
}

const indexHtml = readFileSync(indexPath, 'utf8');

for (const route of routes) {
  const meta = routeMeta[route] ?? routeMeta['/'];
  const routeDir = join(distDir, route.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });

  const generatedHtml = applyRouteMeta(indexHtml, meta);
  writeFileSync(join(routeDir, 'index.html'), generatedHtml);
  console.log(`[postbuild] ${route}/index.html generated with canonical ${meta.canonical}`);
}

copyFileSync(indexPath, join(distDir, '404.html'));
console.log('[postbuild] dist/404.html generated (fallback for genuinely nonexistent paths)');
