import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

//   return `$${price.toFixed(2)}`;
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}