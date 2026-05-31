'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/cart-context'
import { applyPromoCode } from '@/lib/promo-codes'
import { PRODUCTS } from '@/lib/products'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'
const SHIPPING_THRESHOLD = 50

export default function CartPage() {
  const { items, removeItem, updateQty } = useCart()
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discountPct = appliedPromo ? (applyPromoCode(appliedPromo) ?? 0) : 0
  const discount = subtotal * (discountPct / 100)
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : 4.99
  const total = subtotal - discount + shipping

  function applyPromo() {
    const code = promoInput.trim().toUpperCase()
    const pct = applyPromoCode(code)
    if (pct !== null) {
      setAppliedPromo(code)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="text-6xl mb-6">🛍️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your basket is empty</h1>
        <p className="text-gray-500 mb-8">Add some products to get started.</p>
        <Link
          href="/shop"
          className="px-8 py-3 rounded-full text-white font-semibold text-sm"
          style={{ backgroundColor: GREEN }}
        >
          Browse the Shop
        </Link>
      </div>
    )
  }

  const totalQty = items.reduce((n, i) => n + i.qty, 0)

  return (
    <div className="flex flex-col flex-1">
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Basket</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Your Basket ({totalQty} item{totalQty !== 1 ? 's' : ''})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const product = PRODUCTS.find(p => p.id === item.productId)
              return (
                <div key={`${item.productId}:${item.variantWeight}`} className="bg-white rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 border border-gray-100">
                  <div
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: (product?.bgColor ?? '#cccccc') + '33' }}
                    aria-hidden="true"
                  >
                    {product?.emoji ?? '📦'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.productId, item.variantWeight)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name} from basket`}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">{item.variantWeight} · £{item.price.toFixed(2)} each</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-gray-900">£{(item.price * item.qty).toFixed(2)}</p>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.productId, item.variantWeight, item.qty - 1)}
                          className="w-8 h-8 text-gray-500 hover:bg-gray-50 font-medium"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.variantWeight, item.qty + 1)}
                          className="w-8 h-8 text-gray-500 hover:bg-gray-50 font-medium"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Promo code */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-3">Have a promo code?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  aria-label="Promo code"
                  value={promoInput}
                  onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                  placeholder="e.g. WELCOME10"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 font-mono"
                />
                <button
                  onClick={applyPromo}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: GREEN }}
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-500 mt-2">{promoError}</p>}
              {appliedPromo && discountPct !== null && (
                <p className="text-xs mt-2 font-medium" style={{ color: GREEN }}>
                  ✓ {appliedPromo} applied — {discountPct}% off
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between" style={{ color: GREEN }}>
                    <span>Discount ({appliedPromo})</span>
                    <span>−£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span style={{ color: GREEN }}>Free</span>
                    : <span>£{shipping.toFixed(2)}</span>
                  }
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Add £{(SHIPPING_THRESHOLD - (subtotal - discount)).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block text-center py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: GREEN }}
              >
                Proceed to Checkout →
              </Link>
              <Link
                href="/shop"
                className="mt-3 block text-center py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
