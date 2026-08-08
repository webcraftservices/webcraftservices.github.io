export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            WebCraft
          </span>
          <p className="text-muted-foreground text-sm">
            Crafting digital experiences with care, creativity, and love.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebCraft Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
