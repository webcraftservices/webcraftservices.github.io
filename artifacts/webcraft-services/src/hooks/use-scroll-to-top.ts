import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls the window to the top whenever the route (pathname) changes.
 *
 * Mount this once near the root of the app (e.g. in the shared Layout),
 * not per-page — it covers every route automatically, including
 * programmatic navigation and browser back/forward, since it's driven
 * by wouter's location, not by click handlers.
 *
 * Deliberately does NOT touch in-page anchor scrolling (e.g. the
 * "scroll to inquiry form" buttons use their own smooth
 * `scrollIntoView` via `scrollToId()` in lib/utils.ts) — those never
 * change the route, so this effect doesn't run for them.
 *
 * Uses an instant jump rather than smooth scrolling: this is a full
 * page/content swap, not an in-page jump, so an abrupt reset here
 * matches standard multi-page-site behavior and avoids watching a
 * slow scroll past unrelated content on every navigation.
 */
export function useScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    // If the URL itself carries a hash (e.g. a deep link like
    // /business#inquiry-form), let the browser's native anchor
    // behavior take the user to that section instead of forcing
    // them back to the top.
    if (window.location.hash) return;

    window.scrollTo(0, 0);
  }, [location]);
}
