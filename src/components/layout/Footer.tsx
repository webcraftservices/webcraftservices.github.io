import { Link } from "wouter";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { navLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-10 sm:py-12 mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-3">
        <span className="font-serif text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="WebCraft Services"
            className="h-5 w-auto shrink-0"
          />
          WebCraft
        </span>
        <p className="text-muted-foreground text-sm max-w-sm">
          Crafting digital experiences with care, creativity, and love.
        </p>

        {/* Mobile: exactly two rows of three links (Home/Business/Personal,
            then Process/About/Contact) via a 3-column grid, matching the
            order navLinks is already defined in. Desktop/tablet (md+):
            the original single-row layout, unchanged. */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-1 w-full max-w-xs sm:max-w-sm md:max-w-none md:w-auto md:flex md:items-center md:gap-4 text-sm"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-center min-h-9 px-1 text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebCraft Services. All rights reserved.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-8 border-t border-border/40 text-center">
        <p className="text-sm font-semibold text-foreground mb-1">Need help?</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Contact us at {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
