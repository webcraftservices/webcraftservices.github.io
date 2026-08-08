import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
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
import { submitInquiry, InquirySubmissionError } from "@/lib/submit-inquiry";
import { businessPlans } from "@/data/pricing";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(2, "Industry is required"),
  url: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+\..+/i.test(val),
      "Please enter a valid URL starting with http:// or https://"
    ),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  package: z.string().min(1, "Please select a package"),
  description: z.string().min(10, "Please provide a brief description (at least 10 characters)"),
});

export default function Business() {
  useDocumentTitle(
    "Business Web Development | WebCraft Studio",
    "Professional, conversion-focused websites for companies, startups, and entrepreneurs who demand results."
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      url: "",
      email: "",
      phone: "",
      package: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitInquiry({
        form_type: "Business Inquiry",
        _subject: `New business inquiry from ${values.businessName}`,
        _replyto: values.email,
        businessName: values.businessName,
        industry: values.industry,
        url: values.url || "Not provided",
        email: values.email,
        phone: values.phone || "Not provided",
        package: values.package,
        description: values.description,
      });
      toast.success("Inquiry sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      const message =
        error instanceof InquirySubmissionError
          ? error.message
          : "Something went wrong sending your message. Please try again.";
      toast.error("Couldn't send your inquiry", {
        description: message,
      });
    }
  }

  const scrollToForm = () => {
    document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:py-32">
        <div className="flex-1 space-y-6 sm:space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium mb-6">
              Professional Services
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
              Precision-crafted for <span className="text-secondary-foreground italic">results.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
              Your business deserves more than a generic template. We build digital flagships that communicate authority, build trust, and drive meaningful conversions.
            </p>
            <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto rounded-full text-base h-12 px-8">
              Start your project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex-1 mt-10 sm:mt-12 lg:mt-0 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] max-w-xl mx-auto border border-border/50">
            <img 
              src="/business-hero.svg" 
              alt="Professional Workspace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Investment Plans</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Transparent pricing for professional quality. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {businessPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col p-6 sm:p-8 rounded-3xl border ${
                  plan.popular 
                    ? "bg-background border-primary/50 shadow-xl scale-100 lg:scale-105 z-10" 
                    : "bg-background/50 border-border shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-serif font-bold">{plan.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 h-10">
                  {plan.description}
                </p>
                
                <div className="inline-block bg-secondary/10 text-secondary-foreground text-xs font-medium px-3 py-1 rounded-md mb-8 w-fit">
                  Delivered in {plan.delivery}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full rounded-xl"
                  onClick={() => {
                    form.setValue("package", plan.name);
                    scrollToForm();
                  }}
                >
                  Select {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Tell Us About Your Business</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Fill out the form below to start the conversation. We'll be in touch to schedule a discovery call.
            </p>
          </div>

          <div className="bg-card p-5 sm:p-8 md:p-12 rounded-3xl border border-border shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corp" className="rounded-xl" autoComplete="organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry / Type *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Architecture, Retail" className="rounded-xl" {...field} />
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
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="hello@acme.com" className="rounded-xl" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 000-0000" className="rounded-xl" autoComplete="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Website URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://acme.com" className="rounded-xl" autoComplete="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selected Package *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Select a package" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessPlans.map((p) => (
                              <SelectItem key={p.id} value={p.name}>
                                {p.name} - {p.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us a bit about your goals, target audience, and any specific features you need..."
                          className="min-h-[120px] rounded-xl"
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
                    "Submit Inquiry"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
