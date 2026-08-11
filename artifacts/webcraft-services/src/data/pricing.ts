/**
 * Single source of truth for all service/pricing data on the site.
 *
 * Edit prices, features, or delivery times here — Business.tsx and
 * Personal.tsx both read from this file, so nothing needs to be updated
 * in more than one place.
 */
import type { LucideIcon } from "lucide-react";
import { Sparkles, Gift, Heart } from "lucide-react";

export interface BusinessPlan {
  id: string;
  name: string;
  price: string;
  delivery: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export const businessPlans: BusinessPlan[] = [
  {
    id: "starter-business",
    name: "Starter Business",
    price: "₹499",
    delivery: "5 days",
    description:
      "Perfect for establishing a professional online presence quickly.",
    features: [
      "Single-page website",
      "Mobile responsive design",
      "Contact form integration",
      "Basic SEO setup",
      "1 revision round",
    ],
  },
  {
    id: "professional-business",
    name: "Professional Business",
    price: "₹999",
    delivery: "7 days",
    popular: true,
    description:
      "For growing businesses that need more depth and capability.",
    features: [
      "Multi-page site (up to 5 pages)",
      "Custom design & branding",
      "CMS integration (manage your content)",
      "Analytics setup",
      "Advanced contact forms",
      "2 revision rounds",
    ],
  },
  {
    id: "enterprise-business",
    name: "Enterprise Business",
    price: "₹1999",
    delivery: "14 days",
    description: "A comprehensive digital flagship for established brands.",
    features: [
      "Fully custom multi-page architecture",
      "E-commerce ready capability",
      "Advanced technical SEO",
      "Custom features & animations",
      "Priority VIP support",
      "Unlimited revisions during build",
    ],
  },
];

export interface PersonalService {
  id: string;
  title: string;
  price: string;
  icon: LucideIcon;
  description: string;
  delivery: string;
}

export const personalServices: PersonalService[] = [
  {
    id: "custom",
    title: "Personal Customized Website",
    price: "from ₹199",
    icon: Sparkles,
    description:
      "For anyone wanting their own corner of the internet. Portfolio, personal brand, creative blog, or passion project. Your story, beautifully told.",
    delivery: "5 days",
  },
  {
    id: "occasion",
    title: "Special Occasion Website",
    price: "₹299",
    icon: Gift,
    description:
      "Birthdays, anniversaries, graduations, milestones. A bespoke webpage dedicated to celebrating someone's special moment—with photos, messages, and memories.",
    delivery: "7 days",
  },
  {
    id: "love",
    title: "For Loved Ones",
    price: "₹499",
    icon: Heart,
    description:
      "The most heartfelt option. A custom digital love letter—for a partner, parent, best friend, or anyone who deserves to feel truly seen. Personalized in every detail.",
    delivery: "7 days",
  },
];

/** Budget ranges offered in the Personal inquiry form. */
export const personalBudgetRanges: { value: string; label: string }[] = [
  { value: "under-199", label: "Under ₹199" },
  { value: "199-399", label: "₹199 - ₹399" },
  { value: "399-599", label: "₹399 -₹599" },
  { value: "599-999", label: "₹599 - ₹999" },
  { value: "above 999", label: "Above ₹999" },
  { value: "no-limit", label: "No limit" },
];
