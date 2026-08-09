export interface NavLink {
  href: string;
  label: string;
}

/** The site's primary routes, used in both the navbar and footer. */
export const navLinks: NavLink[] = [
  { href: "/", label: "Studio" },
  { href: "/business", label: "Business" },
  { href: "/personal", label: "Personal" },
];
