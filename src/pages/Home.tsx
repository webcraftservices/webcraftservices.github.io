import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Briefcase, Mail, MessageSquare, Wrench, Rocket } from "lucide-react";

import { useDocumentTitle } from "@/hooks/use-document-title";
import { useStructuredData } from "@/hooks/use-structured-data";
import { schemaGraph, webPageSchema, faqSchema, type FaqItem } from "@/lib/structured-data";
import { CONTACT_EMAIL } from "@/lib/site-config";

const homeFaqs: FaqItem[] = [
  {
    question: "What does WebCraft Services build?",
    answer:
      "Two kinds of websites: conversion-focused sites for businesses, startups, and entrepreneurs, and handcrafted personal sites — portfolios, milestone pages, and digital love letters — for individuals.",
  },
  {
    question: "How does the process work?",
    answer:
      "Pick the Business or Personal path, fill out the short inquiry form for the plan that fits, and we'll follow up by email to confirm the details before starting work.",
  },
  {
    question: "How long does a website take to build?",
    answer:
      "It depends on scope. Delivery timelines are listed on each plan on the Business and Personal pages, ranging from a few days for a single-page site up to two weeks for a fully custom build.",
  },
  {
    question: "Are the websites mobile-friendly?",
    answer:
      "Yes — every plan includes a mobile-responsive design as standard, not an add-on.",
  },
  {
    question: "Can I customize the design?",
    answer:
      "Yes. Higher-tier plans include custom design and branding, and every plan includes at least one round of revisions — see the specific plan details on the Business and Personal pages.",
  },
  {
    question: "How do I get in touch?",
    answer: `The fastest way is the inquiry form on the Business or Personal page. You can also reach out directly at ${CONTACT_EMAIL}.`,
  },
];

export default function Home() {
  useDocumentTitle(
    "Business & Personal Website Development | WebCraft Services",
    "WebCraft Services designs professional business websites and handcrafted personal sites — mobile-responsive, custom-designed, and delivered in days, not months."
  );

  useStructuredData(
    schemaGraph([
      webPageSchema({
        path: "/",
        name: "Business & Personal Website Development | WebCraft Services",
        description:
          "WebCraft Services designs professional business websites and handcrafted personal sites — mobile-responsive, custom-designed, and delivered in days, not months.",
      }),
      faqSchema(homeFaqs),
    ])
  );

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20 opacity-20 dark:opacity-10 pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}home-hero.svg`}
            alt=""
            aria-hidden="true"
            width={1200}
            height={900}
            loading="eager"
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Digital Craftsmanship</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight">
            Websites made with <span className="text-primary italic">intention.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A boutique digital studio building functional powerhouses for businesses 
            and handcrafted emotional experiences for individuals. Choose your path.
          </p>
        </motion.div>
      </section>

      {/* Two Paths Section */}
      <section className="w-full px-4 sm:px-6 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          
          {/* Business Path */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            <Link href="/business" className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <div className="relative h-full flex flex-col p-6 sm:p-10 md:p-12 rounded-3xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110" />
                
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-foreground mb-6 sm:mb-8">
                  <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                  For Business
                </h2>
                
                <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12 flex-1">
                  Precision-crafted, conversion-focused websites for companies, startups, and entrepreneurs who demand results and professionalism.
                </p>
                
                <div className="flex items-center font-medium text-foreground group-hover:text-primary transition-colors">
                  Explore business services
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Personal Path */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <Link href="/personal" className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <div className="relative h-full flex flex-col p-6 sm:p-10 md:p-12 rounded-3xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110" />
                
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 sm:mb-8">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                  For Personal
                </h2>
                
                <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12 flex-1">
                  Handcrafted with heart. Digital love letters, milestone celebrations, and bespoke personal spaces that make someone feel truly seen.
                </p>
                
                <div className="flex items-center font-medium text-foreground group-hover:text-primary transition-colors">
                  Start a personal project
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-4 sm:px-6 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              A simple, transparent path from first message to a finished website.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Tell us about it",
                description: "Choose the Business or Personal path and fill out a short inquiry form describing your project.",
              },
              {
                icon: Mail,
                title: "We follow up",
                description: "We review your inquiry and reply by email to confirm scope, package, and timeline.",
              },
              {
                icon: Wrench,
                title: "We build",
                description: "Your site is designed and developed within the delivery window shown on your chosen plan.",
              },
              {
                icon: Rocket,
                title: "You launch",
                description: "After your revision rounds, your finished website goes live.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-4 sm:px-6 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
