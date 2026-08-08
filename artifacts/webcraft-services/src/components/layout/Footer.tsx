import { Link } from "wouter";

const links = [
  { href: "/", label: "Studio" },
  { href: "/business", label: "Business" },
  { href: "/personal", label: "Personal" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-10 sm:py-12 mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            WebCraft
          </span>
          <p className="text-muted-foreground text-sm">
            Crafting digital experiences with care, creativity, and love.
          </p>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebCraft Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
