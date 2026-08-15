import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { useDocumentTitle } from "@/hooks/use-document-title";
import { useStructuredData } from "@/hooks/use-structured-data";
import { schemaGraph, webPageSchema } from "@/lib/structured-data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { submitInquiry, InquirySubmissionError } from "@/lib/submit-inquiry";
import { CONTACT_EMAIL } from "@/lib/site-config";

const interestOptions = [
  { value: "business", label: "A business website" },
  { value: "personal", label: "A personal website" },
  { value: "not-sure", label: "Not sure yet" },
  { value: "general", label: "General question" },
];

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  interest: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Please provide a brief message (at least 10 characters)"),
});

export default function Contact() {
  useDocumentTitle(
    "Contact WebCraft Services | Start Your Website Project",
    "Not sure whether you need a business or personal website, or just have a question first? Get in touch with WebCraft Services directly."
  );

  useStructuredData(
    schemaGraph([
      webPageSchema({
        path: "/contact",
        name: "Contact WebCraft Services | Start Your Website Project",
        description:
          "Not sure whether you need a business or personal website, or just have a question first? Get in touch with WebCraft Services directly.",
        breadcrumb: [
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ],
        type: "ContactPage",
      }),
    ])
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", interest: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitInquiry({
        form_type: "General Inquiry",
        _subject: `New contact form message from ${values.name}`,
        _replyto: values.email,
        name: values.name,
        email: values.email,
        interest: interestOptions.find((o) => o.value === values.interest)?.label ?? values.interest,
        message: values.message,
      });
      toast.success("Message sent!", {
        description: "We've got it and will be in touch soon.",
      });
      form.reset();
    } catch (error) {
      const message =
        error instanceof InquirySubmissionError
          ? error.message
          : "Something went wrong sending your message. Please try again.";
      toast.error("Couldn't send your message", {
        description: message,
      });
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 space-y-3">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />
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
      <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Tell us about <span className="text-primary italic">your project.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Already know you want a{" "}
            <Link href="/business" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              business website
            </Link>{" "}
            or a{" "}
            <Link href="/personal" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              personal one
            </Link>
            ? Their pages have plan-specific inquiry forms. Otherwise, use the form below or email us directly.
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section id="contact-form" className="pb-16 sm:pb-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card p-5 sm:p-8 md:p-12 rounded-3xl border border-border shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" className="rounded-xl" autoComplete="name" required aria-required="true" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@example.com" className="rounded-xl" autoComplete="email" required aria-required="true" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you interested in? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl" aria-required="true">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interestOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about what you're looking for..."
                          className="min-h-[120px] rounded-xl"
                          required
                          aria-required="true"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="w-full md:w-auto rounded-full px-10 h-12 text-base"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-2">Prefer email?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
