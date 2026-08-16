import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn, scrollToId } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/navigation";
import { Menu, X } from "lucide-react";

// Maps a route to the id of that page's inquiry form, so the nav CTA
// can jump straight to it. Routes without a form (e.g. Home) get no CTA.
const formTargetByRoute: Record<string, string> = {
  "/business": "inquiry-form",
  "/personal": "personal-form",
  "/contact": "contact-form",
};

// Routes shown directly (outside the hamburger menu) in the mobile header.
// Derived from navLinks below, so mobile and desktop always share one
// source of truth and can never drift out of sync.
const PRIMARY_MOBILE_ROUTES = ["/", "/business", "/personal"];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formTargetId = formTargetByRoute[location];

  const primaryMobileLinks = navLinks.filter((link) =>
    PRIMARY_MOBILE_ROUTES.includes(link.href)
  );

  const scrollToForm = () => {
    if (formTargetId) scrollToId(formTargetId);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Keep the mobile menu from lingering open across a route change
  // (e.g. browser back/forward) and close it on Escape for keyboard users.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav className="w-full border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-2 min-h-20 flex flex-col md:flex-row md:items-center gap-3 md:gap-x-3">
        {/* Logo — centered on its own row on mobile, left-aligned on desktop */}
        <div className="flex justify-center md:justify-start">
          <Link
            href="/"
            className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-primary flex items-center gap-2 shrink-0"
            data-testid="link-logo"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="WebCraft Services"
              className="h-10 sm:h-11 md:h-6 w-auto shrink-0"
            />
            WebCraft
          </Link>
        </div>

        {/* Desktop navigation — unchanged from the original, just scoped to md+ */}
        <div className="hidden md:flex flex-wrap gap-x-0.5 sm:gap-1 md:gap-4 items-center ml-auto">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors hover:text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-accent rounded-md -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
          {formTargetId && (
            <Button
              size="sm"
              onClick={scrollToForm}
              className="ml-1 sm:ml-2 rounded-full px-3 sm:px-5 whitespace-nowrap"
              data-testid="button-nav-cta"
            >
              Start a Project
            </Button>
          )}
        </div>

        {/* Mobile navigation — second row. The hamburger comes first,
            followed by Home/Business/Personal, and the whole group is
            centered as a single controlled flex row (not each item
            individually centered) so the hamburger's position stays
            predictable across phone widths. Gaps shrink at the narrowest
            widths via responsive classes only — no JS viewport checks —
            while touch targets stay comfortable. */}
        <div className="flex md:hidden items-center justify-center gap-1 min-[400px]:gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileMenuOpen((open) => !open)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
          {primaryMobileLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative min-h-11 flex items-center px-2 min-[400px]:px-3 py-2 text-base font-medium rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
                data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator-mobile"
                    className="absolute inset-0 bg-accent rounded-md -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile menu — a small dashboard-style panel with every page,
          anchored directly under the navbar (never a full-screen overlay). */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="navigation"
            aria-label="All pages"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-popover"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center justify-center min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-accent text-foreground border-accent-border"
                        : "text-muted-foreground border-border/40 hover:bg-accent/60 hover:text-primary"
                    )}
                    data-testid={`link-mobile-menu-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {formTargetId && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
                <Button
                  onClick={() => {
                    scrollToForm();
                    closeMobileMenu();
                  }}
                  className="w-full rounded-full"
                  data-testid="button-mobile-menu-cta"
                >
                  Start a Project
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
