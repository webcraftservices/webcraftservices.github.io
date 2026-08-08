import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function NotFound() {
  useDocumentTitle("Page Not Found | WebCraft Studio", "The page you are looking for does not exist.");

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl sm:text-8xl font-serif font-bold text-primary mb-6">404</h1>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-8 text-base sm:text-lg">
          The space you're looking for doesn't exist. Let's get you back to familiar ground.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Studio
        </Link>
      </motion.div>
    </div>
  );
}