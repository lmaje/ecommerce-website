import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout — Bakhtar Market',
  description: 'Enter your delivery and payment details to complete your order.',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
