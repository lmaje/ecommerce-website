import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Bakhtar Market',
  description: 'Browse our full range of authentic Afghan and international groceries — rice, nuts, teas, spices, dairy, and more.',
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
