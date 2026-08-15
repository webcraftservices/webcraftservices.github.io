import { Link, useLocation } from "wouter";
import { cn, scrollToId } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/navigation";

// Maps a route to the id of that page's inquiry form, so the nav CTA
// can jump straight to it. Routes without a form (e.g. Home) get no CTA.
const formTargetByRoute: Record<string, string> = {
  "/business": "inquiry-form",
  "/personal": "personal-form",
  "/contact": "contact-form",
};

export function Navbar() {
  const [location] = useLocation();
  const formTargetId = formTargetByRoute[location];

  const scrollToForm = () => {
    if (formTargetId) scrollToId(formTargetId);
  };

  return (
    <nav className="w-full border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 min-h-16 sm:min-h-20 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Link
          href="/"
          className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-primary flex items-center gap-2 shrink-0"
          data-testid="link-logo"
        >
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          WebCraft
        </Link>

        <div className="flex flex-wrap gap-x-0.5 sm:gap-1 md:gap-4 items-center justify-end">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
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
      </div>
    </nav>
  );
}
