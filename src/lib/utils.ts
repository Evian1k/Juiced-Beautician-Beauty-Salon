import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKsh(n: number): string {
  return 'KSh ' + n.toLocaleString('en-KE')
}

export function openWhatsApp(message: string, phone: string = '254759558872') {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
