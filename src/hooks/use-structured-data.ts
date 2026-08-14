import { useEffect } from "react";

const SCRIPT_ID = "page-structured-data";

/**
 * Injects a page-specific JSON-LD <script type="application/ld+json">
 * into <head>, replacing it on route change and removing it on
 * unmount so schema from a previous page never lingers.
 *
 * The sitewide Organization/WebSite JSON-LD lives statically in
 * index.html — this hook is only for per-route entities (WebPage,
 * Service, BreadcrumbList, FAQPage) built with the helpers in
 * src/lib/structured-data.ts.
 */
export function useStructuredData(schema: Record<string, unknown>) {
  useEffect(() => {
    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = SCRIPT_ID;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(schema)]);
}
