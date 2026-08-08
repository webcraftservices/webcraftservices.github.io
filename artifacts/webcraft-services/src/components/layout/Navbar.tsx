import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Studio" },
  { href: "/business", label: "Business" },
  { href: "/personal", label: "Personal" },
];

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

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

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1 md:gap-4 items-center">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
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
        </div>

        {/* Mobile nav trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 rounded-md text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open menu"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 sm:max-w-xs flex flex-col">
            <SheetHeader>
              <SheetTitle className="font-serif text-xl text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                WebCraft
              </SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation menu
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-1 mt-6">
              {links.map((link) => {
                const isActive = location === link.href;
                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "px-4 py-3 text-base font-medium rounded-md transition-colors min-h-11 flex items-center",
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      )}
                      data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
