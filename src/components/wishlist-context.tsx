'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type WishlistContextValue = {
  toggle: (productId: string, variantWeight: string) => void
  isWishlisted: (productId: string, variantWeight: string) => boolean
  wishlisted: string[]
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

function key(productId: string, variantWeight: string) {
  return `${productId}:${variantWeight}`
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<Set<string>>(new Set())

  const toggle = (productId: string, variantWeight: string) => {
    const k = key(productId, variantWeight)
    setKeys(prev => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })
  }

  const isWishlisted = (productId: string, variantWeight: string) =>
    keys.has(key(productId, variantWeight))

  return (
    <WishlistContext.Provider value={{ toggle, isWishlisted, wishlisted: Array.from(keys) }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
