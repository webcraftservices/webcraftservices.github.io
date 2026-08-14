import { twMerge } from 'tailwind-merge';

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smooth-scrolls to the element with the given id, if it exists on the current page. */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Extracts the leading number of days from a delivery string like
 * "5 days" or "14 days". Used to compute an accurate min/max delivery
 * range (e.g. for FAQ copy) directly from src/data/pricing.ts instead
 * of hand-typing a range that could drift out of sync.
 */
export function parseDeliveryDays(delivery: string): number {
  const match = delivery.match(/\d+/);
  return match ? Number(match[0]) : 0;
}
