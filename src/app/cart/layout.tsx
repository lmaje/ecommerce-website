import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Basket — Bakhtar Market',
  description: 'Review your basket, apply a promo code, and proceed to checkout.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
