import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "webcraft_intro_seen";
const FADE_MS = 500;

/**
 * Full-screen intro animation overlay.
 *
 * Plays once per browser session (tracked via sessionStorage). Renders
 * above the router as an overlay — it does not replace or interfere
 * with routing, layout, or any other app logic.
 */
export function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // Only show once per browser session.
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — treat as not seen,
      // intro will just play every load in that case.
    }

    if (alreadySeen) {
      return;
    }

    // Respect prefers-reduced-motion: skip the animation entirely.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      markSeen();
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Safety net: if the video never fires `ended` or `error` (e.g. it
  // stalls, or autoplay is silently blocked by the browser), don't trap
  // the visitor on the intro screen indefinitely.
  useEffect(() => {
    if (!visible) return;

    const safety = window.setTimeout(() => {
      dismiss();
    }, 12000);

    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    if (!video) return;

    // Some browsers need an explicit play() call even with the autoPlay
    // attribute; if it's rejected (e.g. autoplay restrictions), don't
    // leave the visitor stuck — dismiss gracefully instead.
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        dismiss();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function markSeen() {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Ignore storage errors — non-critical.
    }
  }

  function dismiss() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    markSeen();
    setFadingOut(true);

    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, FADE_MS);
  }

  if (!visible) return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity ease-out"
      style={{
        opacity: fadingOut ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/intro/wcs-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={dismiss}
        onError={dismiss}
      />
    </div>
  );
}
