export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-10 sm:py-12 mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-3">
        <span className="font-serif text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          WebCraft
        </span>
        <p className="text-muted-foreground text-sm max-w-sm">
          Crafting digital experiences with care, creativity, and love.
        </p>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebCraft Studio. All rights reserved.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-8 border-t border-border/40 text-center">
        <p className="text-sm font-semibold text-foreground mb-1">Need help?</p>
        <a
          href="mailto:contact.webcraftservices@gmail.com"
          className="text-sm text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Contact us at contact.webcraftservices@gmail.com
        </a>
      </div>
    </footer>
  );
}
