/**
 * JSON-LD structured-data builders.
 *
 * Centralized here so every schema entity references SITE_URL / SITE_NAME
 * / CONTACT_EMAIL from a single source of truth (site-config.ts) instead
 * of being hand-typed on each page. Only include properties that are
 * genuinely true and visible on the page — never invent an address,
 * phone number, rating, review, or founding date.
 *
 * Entities are linked with @id so Google can resolve the
 * Organization <-> WebSite <-> WebPage relationship:
 *   Organization: `${SITE_URL}/#organization`
 *   WebSite:      `${SITE_URL}/#website`
 *   WebPage:      `${SITE_URL}${path}#webpage`
 */
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/site-config";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * The Organization entity. Sitewide and static — rendered once in
 * index.html rather than re-injected per route.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512.png`,
    email: CONTACT_EMAIL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "customer service",
      },
    ],
  };
}

/**
 * The WebSite entity. Sitewide and static — rendered once in
 * index.html rather than re-injected per route.
 */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList for a given trail, e.g. Home > Business. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** WebPage entity for the current route, linked back to the WebSite. */
export function webPageSchema(options: {
  path: string;
  name: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  const url = `${SITE_URL}${options.path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    ...(options.breadcrumb
      ? { breadcrumb: breadcrumbSchema(options.breadcrumb) }
      : {}),
  };
}

/** A Service entity offered by the Organization (e.g. business or personal web development). */
export function serviceSchema(options: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@type": "Service",
    name: options.name,
    description: options.description,
    serviceType: options.serviceType,
    provider: { "@id": ORGANIZATION_ID },
    url: `${SITE_URL}${options.path}`,
    areaServed: "Worldwide",
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage — mirrors the visible FAQ content on the page exactly (never
 * add a question/answer here that isn't rendered on the page).
 *
 * Note: Google deprecated FAQ rich results for most sites in 2023, so
 * this schema should not be expected to produce a rich snippet in
 * search results. It's still included because it helps search engines
 * (and other systems that read structured data) parse the page's
 * Q&A content as distinct entities — a semantic-understanding aid,
 * not a rich-result mechanism.
 */
export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Wraps one or more schema entities in a single @graph JSON-LD document.
 * Using one <script> with @graph (rather than several separate scripts)
 * keeps entity cross-references resolvable and is easier to validate.
 */
export function schemaGraph(entities: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": entities,
  };
}
