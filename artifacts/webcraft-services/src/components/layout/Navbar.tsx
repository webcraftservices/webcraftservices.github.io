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
};

export function Navbar() {
  const [location] = useLocation();
  const formTargetId = formTargetByRoute[location];

  const scrollToForm = () => {
    if (formTargetId) scrollToId(formTargetId);
  };

  return (
    <nav className="w-full border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary flex items-center gap-2 shrink-0"
          data-testid="link-logo"
        >
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          WebCraft
        </Link>

        <div className="flex gap-1 md:gap-4 items-center">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
              className="ml-2 rounded-full px-5"
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
