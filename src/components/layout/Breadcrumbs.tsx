import { Fragment } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Semantic breadcrumb trail (Home > current page). Purely additive —
 * doesn't replace the existing "Back to Studio" link. Pair with
 * structured-data.ts's breadcrumbSchema() so the visible trail and the
 * BreadcrumbList JSON-LD always match.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={item.href}>
              {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />}
              <li>
                {isLast ? (
                  <span aria-current="page" className="text-foreground/70 font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
