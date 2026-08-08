import { motion } from "framer-motion";
import { Heart, Sparkles, Gift, ArrowRight, Loader2 } from "lucide-react";
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

const services = [
  {
    id: "custom",
    title: "Personal Customized Website",
    price: "$199",
    icon: <Sparkles className="w-6 h-6" />,
    description: "For anyone wanting their own corner of the internet. Portfolio, personal brand, creative blog, or passion project. Your story, beautifully told.",
    delivery: "7 days"
  },
  {
    id: "occasion",
    title: "Special Occasion Website",
    price: "$149",
    icon: <Gift className="w-6 h-6" />,
    description: "Birthdays, anniversaries, graduations, milestones. A bespoke webpage dedicated to celebrating someone's special moment—with photos, messages, and memories.",
    delivery: "3 days"
  },
  {
    id: "love",
    title: "For Loved Ones",
    price: "$179",
    icon: <Heart className="w-6 h-6" />,
    description: "The most heartfelt option. A custom digital love letter—for a partner, parent, best friend, or anyone who deserves to feel truly seen. Personalized in every detail.",
    delivery: "5 days"
  }
];

const formSchema = z.object({
  name: z.string().min(2, "Your name is required"),
  theirName: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  occasion: z.string().min(10, "Please tell us about the occasion or story (at least 10 characters)"),
  package: z.string().min(1, "Please select a package"),
  budget: z.string().optional(),
  requests: z.string().optional(),
});

export default function Personal() {
  useDocumentTitle(
    "Personal Web Projects | WebCraft Studio",
    "Handcrafted digital spaces meant to celebrate, remember, and connect."
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      theirName: "",
      email: "",
      occasion: "",
      package: "",
      budget: "",
      requests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitInquiry({
        form_type: "Personal Inquiry",
        _subject: `New personal project inquiry from ${values.name}`,
        _replyto: values.email,
        name: values.name,
        theirName: values.theirName || "Not applicable",
        email: values.email,
        occasion: values.occasion,
        package: values.package,
        budget: values.budget || "Not specified",
        requests: values.requests || "None",
      });
      toast.success("Message received!", {
        description: "We're so excited to help you create this.",
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

  const scrollToForm = () => {
    document.getElementById("personal-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:flex lg:items-center lg:flex-row-reverse lg:gap-16 lg:py-32">
        <div className="flex-1 space-y-6 sm:space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Personal Projects
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
              Handcrafted with <span className="text-primary italic">heart.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
              Digital spaces don't have to be cold. We build warm, intimate, and bespoke digital experiences meant to celebrate, remember, and connect.
            </p>
            <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto rounded-full text-base h-12 px-8">
              Start something special
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
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto border border-border/50">
            <img 
              src="/personal-hero.svg" 
              alt="Intimate workspace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -z-10" />
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Meaningful Digital Spaces</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Choose the perfect canvas for your story or celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative flex flex-col p-6 sm:p-10 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-serif font-bold mb-2">{service.title}</h3>
                <div className="text-3xl font-serif font-medium text-primary mb-6">{service.price}</div>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Delivered in {service.delivery}</span>
                  <button 
                    onClick={() => {
                      form.setValue("package", service.title);
                      scrollToForm();
                    }}
                    className="text-primary hover:text-primary/80 transition-colors rounded-full p-1 -m-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Select ${service.title}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="personal-form" className="py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Start Your Personal Project</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Let's craft something beautiful together. Tell us what you have in mind.
            </p>
          </div>

          <div className="bg-card p-5 sm:p-8 md:p-12 rounded-[2rem] border border-border shadow-sm">
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
                          <Input placeholder="Jane Doe" className="rounded-xl" autoComplete="name" {...field} />
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
                        <FormLabel>Your Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@example.com" className="rounded-xl" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="theirName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Their Name (if for someone else)</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-xl" {...field} />
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
                            {services.map((s) => (
                              <SelectItem key={s.id} value={s.title}>
                                {s.title}
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
                  name="occasion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion or Story *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us what you want to create and why it's special..."
                          className="min-h-[120px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Range (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under-100">Under $100</SelectItem>
                            <SelectItem value="100-200">$100 - $200</SelectItem>
                            <SelectItem value="200-300">$200 - $300</SelectItem>
                            <SelectItem value="no-limit">No limit</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="requests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests / Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific colors, feelings, or elements you want included?"
                          className="min-h-[100px] rounded-xl"
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
                    "Send with Love"
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
