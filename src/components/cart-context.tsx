'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type CartItem = {
  productId: string
  variantWeight: string
  qty: number
  price: number
  name: string
}

type CartContextValue = {
  items: CartItem[]
  addItem: (productId: string, variantWeight: string, price: number, name: string) => void
  removeItem: (productId: string, variantWeight: string) => void
  updateQty: (productId: string, variantWeight: string, qty: number) => void
  clearCart: () => void
  count: number
  getQty: (productId: string, variantWeight: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

function key(productId: string, variantWeight: string) {
  return `${productId}:${variantWeight}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (productId: string, variantWeight: string, price: number, name: string) =>
    setItems(prev => {
      const k = key(productId, variantWeight)
      const existing = prev.find(i => key(i.productId, i.variantWeight) === k)
      return existing
        ? prev.map(i => (key(i.productId, i.variantWeight) === k ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { productId, variantWeight, qty: 1, price, name }]
    })

  const removeItem = (productId: string, variantWeight: string) =>
    setItems(prev => prev.filter(i => key(i.productId, i.variantWeight) !== key(productId, variantWeight)))

  const updateQty = (productId: string, variantWeight: string, qty: number) => {
    if (qty <= 0) { removeItem(productId, variantWeight); return }
    setItems(prev =>
      prev.map(i =>
        key(i.productId, i.variantWeight) === key(productId, variantWeight) ? { ...i, qty } : i
      )
    )
  }

  const clearCart = () => setItems([])

  const getQty = (productId: string, variantWeight: string) =>
    items.find(i => key(i.productId, i.variantWeight) === key(productId, variantWeight))?.qty ?? 0

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        count: items.reduce((n, i) => n + i.qty, 0),
        getQty,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
