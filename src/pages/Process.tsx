import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageSquare, Mail, Wrench, RefreshCcw, Rocket, Briefcase, Sparkles } from "lucide-react";

import { useDocumentTitle } from "@/hooks/use-document-title";
import { useStructuredData } from "@/hooks/use-structured-data";
import { schemaGraph, webPageSchema, faqSchema, type FaqItem } from "@/lib/structured-data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { businessPlans, personalServices } from "@/data/pricing";
import { parseDeliveryDays } from "@/lib/utils";

const allDeliveryDays = [
  ...businessPlans.map((p) => parseDeliveryDays(p.delivery)),
  ...personalServices.map((s) => parseDeliveryDays(s.delivery)),
];
const minDeliveryDays = Math.min(...allDeliveryDays);
const maxDeliveryDays = Math.max(...allDeliveryDays);

const steps = [
  {
    icon: MessageSquare,
    title: "1. Tell us about your project",
    description:
      "Choose the Business or Personal path and fill out the inquiry form for the plan that fits. The form asks for your contact details, the plan you're interested in, and a short description of what you're looking for.",
  },
  {
    icon: Mail,
    title: "2. We confirm the details",
    description:
      "We review your inquiry and reply by email. For Business inquiries, we get back to you within 24 hours to confirm scope, package, and timeline before any work starts.",
  },
  {
    icon: Wrench,
    title: "3. Design & development",
    description: `Your site is designed and built within the delivery window shown on your chosen plan — currently ranging from ${minDeliveryDays} to ${maxDeliveryDays} days across all plans, depending on scope. Mobile-responsive design is included as standard on every plan, not an add-on.`,
  },
  {
    icon: RefreshCcw,
    title: "4. Revisions",
    description:
      "Each plan includes a set number of revision rounds — from a single round on entry-level plans up to unlimited revisions during the build on the top Business tier. Exact numbers are listed on each plan's feature list on the Business and Personal pages.",
  },
  {
    icon: Rocket,
    title: "5. Launch",
    description: "Once your revisions are wrapped up, your finished website goes live.",
  },
];

const processFaqs: FaqItem[] = [
  {
    question: "What happens after I contact you?",
    answer:
      "We review your inquiry and reply by email to confirm the project details. Business inquiries get a reply within 24 hours.",
  },
  {
    question: "How long does website development take?",
    answer: `Across both Business and Personal plans, delivery currently ranges from ${minDeliveryDays} to ${maxDeliveryDays} days, depending on the plan and scope you choose.`,
  },
  {
    question: "What information do I need to provide?",
    answer:
      "Just what the inquiry form asks for: your contact details, the plan you're interested in, and a description of your project. For Personal projects, this can include the occasion and any special requests.",
  },
  {
    question: "How does mobile responsiveness get handled?",
    answer: "It's included as a standard feature on every plan — Business and Personal alike — not an optional add-on.",
  },
  {
    question: "Can I request changes before launch?",
    answer:
      "Yes. Every plan includes at least one round of revisions, and higher tiers include more (up to unlimited on the top Business plan) — see the exact number for your plan on the Business or Personal page.",
  },
];

export default function Process() {
  useDocumentTitle(
    "Website Development Process | WebCraft Services",
    `How a WebCraft Services website gets built, from your first inquiry to launch — with real delivery timelines from ${minDeliveryDays} to ${maxDeliveryDays} days.`
  );

  useStructuredData(
    schemaGraph([
      webPageSchema({
        path: "/process",
        name: "Website Development Process | WebCraft Services",
        description: `How a WebCraft Services website gets built, from your first inquiry to launch — with real delivery timelines from ${minDeliveryDays} to ${maxDeliveryDays} days.`,
        breadcrumb: [
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ],
      }),
      faqSchema(processFaqs),
    ])
  );

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 space-y-3">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Process", href: "/process" }]} />
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
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            From first message to <span className="text-primary italic">launch.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every project — whether it's a{" "}
            <Link href="/business" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              business website
            </Link>{" "}
            or a{" "}
            <Link href="/personal" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              personal one
            </Link>
            , follows the same five steps.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="w-full px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto space-y-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 sm:gap-6 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <step.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg mb-2">{step.title}</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Process FAQ</h2>
          </div>
          <div className="space-y-6">
            {processFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">Ready to start your project?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/business">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-12 px-8">
                <Briefcase className="w-4 h-4 mr-2" />
                Start a Business project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/personal">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-12 px-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Start a Personal project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Not ready to pick a plan?{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              Contact us
            </Link>{" "}
            with any questions first.
          </p>
        </div>
      </section>
    </div>
  );
}
