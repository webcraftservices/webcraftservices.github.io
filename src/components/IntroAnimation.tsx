import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "webcraft_intro_seen";
const FADE_MS = 500;
// Matches the CSS animation timeline below (last event finishes ~6.4s in),
// plus a short pause so the tagline is readable before it fades out.
const ANIMATION_DURATION_MS = 6900;
// Fallback in case an animation event doesn't fire for some reason
// (e.g. an unusual browser environment) — never leaves the intro stuck.
const SAFETY_TIMEOUT_MS = 10000;

/**
 * Full-screen intro animation overlay.
 *
 * Plays once per browser session (tracked via sessionStorage). Renders
 * above the router as an overlay — it does not replace or interfere
 * with routing, layout, or any other app logic.
 *
 * Entirely code-generated (SVG + CSS keyframes) — no video file, so
 * there's no fixed-aspect-ratio rectangle and no visible seam/border
 * where the animation meets the page background. All styles below are
 * scoped under .wcs-intro-root and all SVG def ids/keyframe names are
 * prefixed, so nothing here leaks into or collides with the rest of
 * the app's styles.
 */
export function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — treat as not seen.
    }
    if (alreadySeen) {
      return;
    }
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

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(dismiss, ANIMATION_DURATION_MS);
    const safety = window.setTimeout(dismiss, SAFETY_TIMEOUT_MS);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(safety);
    };
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
      className="wcs-intro-root fixed inset-0 z-[9999] flex items-center justify-center transition-opacity ease-out overflow-hidden"
      style={{
        opacity: fadingOut ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <style>{`
        .wcs-intro-root {
          background: radial-gradient(ellipse at center, #f5f0e6 0%, #ebe4d4 100%);
          box-sizing: border-box;
        }
        .wcs-intro-root *, .wcs-intro-root *::before, .wcs-intro-root *::after {
          box-sizing: border-box;
        }
        .wcs-intro-ambient {
          position: absolute;
          width: min(1200px, 160vw);
          height: min(1200px, 160vw);
          background: radial-gradient(circle, rgba(196, 98, 47, 0.08) 0%, transparent 65%);
          border-radius: 50%;
          animation: wcsIntroAmbientPulse 6s ease-in-out infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        @keyframes wcsIntroAmbientPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }

        .wcs-intro-logo-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          padding: 0 20px;
          max-width: 100%;
        }

        .wcs-intro-logo-svg {
          width: clamp(140px, 26vw, 300px);
          height: clamp(140px, 26vw, 300px);
          overflow: visible;
          filter: drop-shadow(0 25px 45px rgba(0,0,0,0.22));
          flex-shrink: 0;
        }

        .wcs-intro-w-letter {
          fill: url(#wcsIntroWMetallic);
          opacity: 0;
          transform-origin: 100px 118px;
          transform: scale(0.3);
          animation: wcsIntroWReveal 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.4s;
        }

        @keyframes wcsIntroWReveal {
          0% { opacity: 0; transform: scale(0.3); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        .wcs-intro-w-glow {
          fill: #c4622f;
          opacity: 0;
          filter: blur(28px);
          transform-origin: center;
          animation: wcsIntroWGlow 2s ease-out forwards;
          animation-delay: 0.4s;
        }

        @keyframes wcsIntroWGlow {
          0% { opacity: 0; transform: scale(0.4); }
          40% { opacity: 0.55; transform: scale(1.3); }
          100% { opacity: 0; transform: scale(1.6); }
        }

        .wcs-intro-spark-group {
          opacity: 0;
          transform-origin: 100px 62px;
          animation: wcsIntroSparkle 1.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.3s;
        }

        @keyframes wcsIntroSparkle {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .wcs-intro-spark-halo {
          fill: #c4622f;
          opacity: 0.35;
          filter: blur(5px);
        }

        .wcs-intro-spark-main { fill: url(#wcsIntroSparkGrad); }

        .wcs-intro-spark-highlight {
          fill: #ffe4d1;
          opacity: 0;
          animation: wcsIntroTwinkle 3s ease-in-out infinite;
          animation-delay: 3s;
        }

        @keyframes wcsIntroTwinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.7; }
        }

        .wcs-intro-hex-left {
          fill: #1a1a1a;
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          animation: wcsIntroRevealDown 1.6s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          animation-delay: 1.9s;
        }

        .wcs-intro-hex-right {
          fill: #c4622f;
          opacity: 0;
          clip-path: inset(100% 0 0 0);
          animation: wcsIntroRevealUp 1.6s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          animation-delay: 1.9s;
        }

        @keyframes wcsIntroRevealDown {
          0% { opacity: 0; clip-path: inset(0 0 100% 0); }
          5% { opacity: 1; }
          100% { opacity: 1; clip-path: inset(0 0 0% 0); }
        }

        @keyframes wcsIntroRevealUp {
          0% { opacity: 0; clip-path: inset(100% 0 0 0); }
          5% { opacity: 1; }
          100% { opacity: 1; clip-path: inset(0% 0 0 0); }
        }

        .wcs-intro-text-block {
          margin-top: clamp(16px, 3.5vw, 35px);
          text-align: center;
          max-width: 100%;
        }

        .wcs-intro-webcraft {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(30px, 8.5vw, 72px);
          font-weight: 600;
          letter-spacing: clamp(1px, 0.4vw, 3px);
          line-height: 1;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          overflow: hidden;
          padding: 5px 0;
        }

        .wcs-intro-webcraft span {
          display: inline-block;
          opacity: 0;
          transform: translateY(110%);
          animation: wcsIntroLetterUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          text-rendering: geometricPrecision;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        }

        .wcs-intro-webcraft .wcs-intro-black {
          background: linear-gradient(180deg, #333 0%, #1a1a1a 50%, #000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wcs-intro-webcraft .wcs-intro-copper {
          background: linear-gradient(180deg, #e88a5a 0%, #c4622f 50%, #8a4420 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes wcsIntroLetterUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .wcs-intro-services-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 20px);
          margin-top: 12px;
          opacity: 0;
          animation: wcsIntroFadeIn 0.6s ease-out forwards;
          animation-delay: 4.5s;
        }

        .wcs-intro-services-row .wcs-intro-line {
          height: 1.5px;
          width: 0;
          background: linear-gradient(90deg, transparent, #c4622f 30%, #c4622f 70%, transparent);
          animation: wcsIntroLineGrow 1s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          animation-delay: 4.5s;
        }

        @keyframes wcsIntroLineGrow { to { width: clamp(36px, 9vw, 120px); } }
        @keyframes wcsIntroFadeIn { to { opacity: 1; } }

        .wcs-intro-services-text {
          font-family: 'Cinzel', 'Playfair Display', serif;
          font-size: clamp(13px, 3.2vw, 22px);
          letter-spacing: clamp(4px, 1.8vw, 12px);
          font-weight: 700;
          padding-left: 4px;
          white-space: nowrap;
          background: linear-gradient(180deg, #e88a5a 0%, #c4622f 50%, #8a4420 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-rendering: geometricPrecision;
          filter: drop-shadow(0 2px 3px rgba(196, 98, 47, 0.2));
        }

        .wcs-intro-tagline {
          margin-top: clamp(14px, 3vw, 22px);
          font-family: 'Inter', Arial, sans-serif;
          font-size: clamp(10px, 2.4vw, 13px);
          letter-spacing: clamp(2px, 0.9vw, 5px);
          color: #1a1a1a;
          text-transform: uppercase;
          font-weight: 600;
          opacity: 0;
          padding: 0 8px;
          animation: wcsIntroFadeUp 1s ease-out forwards;
          animation-delay: 5.4s;
        }

        @keyframes wcsIntroFadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 380px) {
          .wcs-intro-services-text { letter-spacing: clamp(2px, 1.4vw, 6px); }
        }
      `}</style>

      <div className="wcs-intro-ambient" />

      <div className="wcs-intro-logo-wrap">
        <svg className="wcs-intro-logo-svg" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="wcsIntroWMetallic" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#2a2a2a" }} />
              <stop offset="50%" style={{ stopColor: "#1a1a1a" }} />
              <stop offset="100%" style={{ stopColor: "#000" }} />
            </linearGradient>

            <radialGradient id="wcsIntroSparkGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: "#f0a575" }} />
              <stop offset="60%" style={{ stopColor: "#c4622f" }} />
              <stop offset="100%" style={{ stopColor: "#a04d20" }} />
            </radialGradient>
          </defs>

          <ellipse className="wcs-intro-w-glow" cx="100" cy="120" rx="35" ry="38" />

          {/* LEFT HEXAGON HALF (BLACK) */}
          <path
            className="wcs-intro-hex-left"
            d="M 85 25 L 30 60 L 30 140 L 85 175 L 85 165 L 40 138 L 40 62 L 85 35 Z"
          />

          {/* RIGHT HEXAGON HALF (COPPER) */}
          <path
            className="wcs-intro-hex-right"
            d="M 115 25 L 170 60 L 170 140 L 115 175 L 115 165 L 160 138 L 160 62 L 115 35 Z"
          />

          <path
            className="wcs-intro-w-letter"
            d="M 68 88 L 82 150 L 93 150 L 100 122 L 107 150 L 118 150 L 132 88 L 120 88 L 112 138 L 105 106 L 95 106 L 88 138 L 80 88 Z"
          />

          <g className="wcs-intro-spark-group">
            <path
              className="wcs-intro-spark-halo"
              d="M 100 46 L 103.5 58 L 115 62 L 103.5 66 L 100 78 L 96.5 66 L 85 62 L 96.5 58 Z"
            />
            <path
              className="wcs-intro-spark-main"
              d="M 100 49 L 103 59 L 113 62 L 103 65 L 100 75 L 97 65 L 87 62 L 97 59 Z"
            />
            <path
              className="wcs-intro-spark-highlight"
              d="M 100 55 L 101 60.5 L 106 62 L 101 63.5 L 100 69 L 99 63.5 L 94 62 L 99 60.5 Z"
            />
          </g>
        </svg>

        <div className="wcs-intro-text-block">
          <div className="wcs-intro-webcraft">
            <span className="wcs-intro-black" style={{ animationDelay: "3.6s" }}>W</span>
            <span className="wcs-intro-black" style={{ animationDelay: "3.68s" }}>E</span>
            <span className="wcs-intro-black" style={{ animationDelay: "3.76s" }}>B</span>
            <span className="wcs-intro-copper" style={{ animationDelay: "3.90s" }}>C</span>
            <span className="wcs-intro-copper" style={{ animationDelay: "3.98s" }}>R</span>
            <span className="wcs-intro-copper" style={{ animationDelay: "4.06s" }}>A</span>
            <span className="wcs-intro-copper" style={{ animationDelay: "4.14s" }}>F</span>
            <span className="wcs-intro-copper" style={{ animationDelay: "4.22s" }}>T</span>
          </div>

          <div className="wcs-intro-services-row">
            <div className="wcs-intro-line" />
            <div className="wcs-intro-services-text">SERVICES</div>
            <div className="wcs-intro-line" />
          </div>

          <div className="wcs-intro-tagline">Digital Craftsmanship. Intentional Impact.</div>
        </div>
      </div>
    </div>
  );
}
