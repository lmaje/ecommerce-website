'use client'

import type { ReactNode } from 'react'
import { CartProvider } from './cart-context'
import { WishlistProvider } from './wishlist-context'
import { ToastProvider } from './toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  )
}
