import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wishlist — Bakhtar Market',
  description: 'Your saved products at Bakhtar Market.',
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
