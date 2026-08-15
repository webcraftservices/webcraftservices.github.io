import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Sparkles, ShieldCheck, Smartphone, Layers } from "lucide-react";

import { useDocumentTitle } from "@/hooks/use-document-title";
import { useStructuredData } from "@/hooks/use-structured-data";
import { schemaGraph, webPageSchema } from "@/lib/structured-data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: Layers,
    title: "Two focused paths, not one generic template",
    description:
      "Business and Personal projects have different goals, so they're built as separate service tracks with their own plans, pricing, and features rather than a one-size-fits-all package.",
  },
  {
    icon: Smartphone,
    title: "Mobile-responsive by default",
    description:
      "Every plan, on both the Business and Personal side, includes a mobile-responsive design as a standard feature — not an upgrade.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    description:
      "Prices, delivery windows, and what's included in each plan are listed openly on the Business and Personal pages before you fill out an inquiry form.",
  },
];

export default function About() {
  useDocumentTitle(
    "About WebCraft Services | Custom Website Development",
    "WebCraft Services is a boutique studio building business websites and handcrafted personal sites — here's how we work and who it's for."
  );

  useStructuredData(
    schemaGraph([
      webPageSchema({
        path: "/about",
        name: "About WebCraft Services | Custom Website Development",
        description:
          "WebCraft Services is a boutique studio building business websites and handcrafted personal sites — here's how we work and who it's for.",
        breadcrumb: [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ],
      }),
    ])
  );

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 space-y-3">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="link-back-to-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>About the studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            A boutique studio, <span className="text-primary italic">built around two paths.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            WebCraft Services builds{" "}
            <Link href="/business" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              conversion-focused business websites
            </Link>{" "}
            for companies, startups, and entrepreneurs, and{" "}
            <Link href="/personal" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              handcrafted personal websites
            </Link>{" "}
            — portfolios, milestone pages, and digital love letters — for individuals. Every project starts from one of those two paths, priced and scoped on its own page.
          </p>
        </motion.div>
      </section>

      {/* Principles */}
      <section className="w-full px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              A few things that stay consistent across every project, business or personal.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="w-full px-4 sm:px-6 pb-16 sm:pb-24 bg-card border-t border-b border-border/40 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Who It's For</h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            If you're running a business, launching a startup, or building a professional presence, the{" "}
            <Link href="/business" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              Business
            </Link>{" "}
            path is built for that — from a single-page site to a fully custom, e-commerce-ready build.
            If you want something more personal — a portfolio, a milestone page, or a website made for someone
            you care about — the{" "}
            <Link href="/personal" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              Personal
            </Link>{" "}
            path is designed around that instead. Not sure which fits?{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              Get in touch
            </Link>{" "}
            and we can help you figure it out before you commit to a plan.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Curious what actually happens after you reach out?{" "}
            <Link href="/process" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              See our website development process
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">Ready to start?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/business">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-12 px-8">
                <Briefcase className="w-4 h-4 mr-2" />
                Explore Business services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/personal">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-12 px-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Personal services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
