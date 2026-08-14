/**
 * Site-wide configuration used for SEO metadata (canonical URLs, Open
 * Graph og:url, sitemap.xml).
 *
 * IMPORTANT: SITE_URL defaults to an obvious placeholder because the
 * real production domain isn't known. Before deploying, set
 * VITE_SITE_URL in your .env (see .env.example) to your actual domain,
 * e.g. https://webcraftservices.com — and also update
 * public/sitemap.xml and public/robots.txt, which are static files
 * and can't read environment variables at request time.
 */
export const SITE_URL: string = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ||
  "https://webcraftservices.online"
).replace(/\/$/, "");

export const SITE_NAME = "WebCraft Services";

/** Public contact address, shown in the footer and used in structured data. */
export const CONTACT_EMAIL = "contact.webcraftservices@gmail.com";
