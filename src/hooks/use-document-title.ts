import { useEffect } from "react";
import { SITE_URL } from "@/lib/site-config";

function normalizeCanonicalPath(pathname: string) {
  if (!pathname || pathname === "/") return "/";

  const withTrailingSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return withTrailingSlash === "//" ? "/" : withTrailingSlash;
}

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonicalLink(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets the document title, meta description, canonical URL, and the
 * matching Open Graph / Twitter card tags for the current route.
 * Call once per page component. Pass noIndex for pages that shouldn't
 * be indexed (e.g. the 404 page).
 */
export function useDocumentTitle(
  title: string,
  description: string,
  noIndex = false,
) {
  useEffect(() => {
    document.title = title;

    upsertMetaByName("description", description);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);

    upsertMetaByName(
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow",
    );

    const canonicalUrl = `${SITE_URL}${normalizeCanonicalPath(window.location.pathname)}`;
    upsertCanonicalLink(canonicalUrl);
    upsertMetaByProperty("og:url", canonicalUrl);
  }, [title, description, noIndex]);
}
