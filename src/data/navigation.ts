export interface NavLink {
  href: string;
  label: string;
}

/** The site's primary routes, used in both the navbar and footer. */
export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/personal", label: "Personal" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
