import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Briefcase } from "lucide-react";

import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Home() {
  useDocumentTitle(
    "WebCraft Studio | Web Developer for Business & Personal Projects",
    "A boutique digital studio building functional powerhouses for businesses and handcrafted emotional experiences for individuals."
  );

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20 opacity-20 dark:opacity-10 pointer-events-none">
          <img src="/home-hero.svg" alt="Creative Studio" className="w-full h-full object-cover blur-sm" />
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
            <Link href="/business" className="block h-full">
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
            <Link href="/personal" className="block h-full">
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
    </div>
  );
}
