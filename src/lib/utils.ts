import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Tailwind can't build class names from variables, so map the ratios by hand. */
export const pomerTridy = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
} as const;
