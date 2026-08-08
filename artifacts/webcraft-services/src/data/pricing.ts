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
    price: "$299",
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
    price: "$599",
    delivery: "10 days",
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
    price: "$999",
    delivery: "15 days",
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
    price: "$199",
    icon: Sparkles,
    description:
      "For anyone wanting their own corner of the internet. Portfolio, personal brand, creative blog, or passion project. Your story, beautifully told.",
    delivery: "7 days",
  },
  {
    id: "occasion",
    title: "Special Occasion Website",
    price: "$149",
    icon: Gift,
    description:
      "Birthdays, anniversaries, graduations, milestones. A bespoke webpage dedicated to celebrating someone's special moment—with photos, messages, and memories.",
    delivery: "3 days",
  },
  {
    id: "love",
    title: "For Loved Ones",
    price: "$179",
    icon: Heart,
    description:
      "The most heartfelt option. A custom digital love letter—for a partner, parent, best friend, or anyone who deserves to feel truly seen. Personalized in every detail.",
    delivery: "5 days",
  },
];

/** Budget ranges offered in the Personal inquiry form. */
export const personalBudgetRanges: { value: string; label: string }[] = [
  { value: "under-100", label: "Under $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200-300", label: "$200 - $300" },
  { value: "no-limit", label: "No limit" },
];
