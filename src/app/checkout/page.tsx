'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/cart-context'
import { applyPromoCode } from '@/lib/promo-codes'
import { PRODUCTS } from '@/lib/products'

const GREEN = '#0B4D13'
const SHIPPING_THRESHOLD = 50

type FormData = {
  fullName: string; email: string; phone: string
  address1: string; address2: string; city: string; postcode: string; country: string
  cardholderName: string; cardNumber: string; expiry: string; cvv: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const EMPTY: FormData = {
  fullName: '', email: '', phone: '',
  address1: '', address2: '', city: '', postcode: '', country: 'United Kingdom',
  cardholderName: '', cardNumber: '', expiry: '', cvv: '',
}

function OrderRef() {
  return 'BM-' + Math.floor(100000 + Math.random() * 900000)
}

function Field({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const errorId = error ? `${id}-error` : undefined
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        {...props}
        id={id}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-white transition-colors ${
          error ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-gray-400'
        }`}
      />
      {error && <p id={errorId} className="text-xs text-red-500 mt-0.5" role="alert">{error}</p>}
    </div>
  )
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [confirmed, setConfirmed] = useState(false)
  const [orderRef] = useState(OrderRef)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discountPct = appliedPromo ? (applyPromoCode(appliedPromo) ?? 0) : 0
  const discount = subtotal * (discountPct / 100)
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : 4.99
  const total = subtotal - discount + shipping

  function set(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  function formatCard(v: string) {
    return v.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
  }

  function formatExpiry(v: string) {
    return v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)
  }

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

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.address1.trim()) e.address1 = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.postcode.trim()) e.postcode = 'Required'
    if (!form.country.trim()) e.country = 'Required'
    if (!form.cardholderName.trim()) e.cardholderName = 'Required'
    const digits = form.cardNumber.replace(/\s/g, '')
    if (!digits) e.cardNumber = 'Required'
    else if (digits.length !== 16) e.cardNumber = 'Card number must be 16 digits'
    if (!form.expiry.trim()) e.expiry = 'Required'
    else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY format'
    if (!form.cvv.trim()) e.cvv = 'Required'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setConfirmed(true)
    clearCart()
  }

  if (confirmed) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: GREEN }}
        >
          <span className="text-white text-3xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-1">
          {form.fullName ? `Thank you, ${form.fullName.split(' ')[0]}!` : 'Thank you for your order!'}
        </p>
        <p className="text-gray-400 text-sm mb-6">
          A confirmation will be sent to{' '}
          <span className="font-medium text-gray-600">{form.email || 'your email'}</span>
        </p>
        <div className="bg-white rounded-2xl px-8 py-5 border border-gray-100 mb-8 text-sm">
          <p className="text-gray-400 mb-1">Order reference</p>
          <p className="text-xl font-bold font-mono" style={{ color: GREEN }}>{orderRef}</p>
          <p className="text-gray-400 mt-3">Expected delivery</p>
          <p className="font-semibold text-gray-700">2–5 business days</p>
        </div>
        <Link
          href="/shop"
          className="px-8 py-3 rounded-full text-white font-semibold text-sm"
          style={{ backgroundColor: GREEN }}
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="text-5xl mb-6">🛍️</p>
        <h1 className="text-xl font-bold text-gray-900 mb-4">Nothing to check out</h1>
        <Link href="/shop" className="px-8 py-3 rounded-full text-white font-semibold text-sm" style={{ backgroundColor: GREEN }}>
          Browse the Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/cart" className="hover:text-gray-600">Basket</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Checkout</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-5">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Full name" value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Fatima Khan" error={errors.fullName} />
                </div>
                <Field label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="fatima@example.com" error={errors.email} />
                <Field label="Phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7700 900000" />
                <div className="sm:col-span-2">
                  <Field label="Address line 1" value={form.address1} onChange={e => set('address1', e.target.value)} placeholder="123 High Street" error={errors.address1} />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Address line 2 (optional)" value={form.address2} onChange={e => set('address2', e.target.value)} placeholder="Flat 2B" />
                </div>
                <Field label="City" value={form.city} onChange={e => set('city', e.target.value)} placeholder="London" error={errors.city} />
                <Field label="Postcode" value={form.postcode} onChange={e => set('postcode', e.target.value.toUpperCase())} placeholder="SW1A 1AA" error={errors.postcode} />
                <div className="sm:col-span-2">
                  <Field label="Country" value={form.country} onChange={e => set('country', e.target.value)} placeholder="United Kingdom" error={errors.country} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Payment</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">🔒 Secure checkout</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Cardholder name" value={form.cardholderName} onChange={e => set('cardholderName', e.target.value)} placeholder="Fatima Khan" error={errors.cardholderName} />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Card number"
                    value={form.cardNumber}
                    onChange={e => set('cardNumber', formatCard(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    error={errors.cardNumber}
                  />
                </div>
                <Field
                  label="Expiry (MM/YY)"
                  value={form.expiry}
                  onChange={e => set('expiry', formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  error={errors.expiry}
                />
                <Field
                  label="CVV"
                  value={form.cvv}
                  onChange={e => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  inputMode="numeric"
                  error={errors.cvv}
                />
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Promo Code</h2>
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
                  type="button"
                  onClick={applyPromo}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: GREEN }}
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-500 mt-2">{promoError}</p>}
              {appliedPromo && (
                <p className="text-xs mt-2 font-medium" style={{ color: GREEN }}>
                  ✓ {appliedPromo} applied — {discountPct}% off
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Place Order · £{total.toFixed(2)}
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {items.map(item => {
                  const product = PRODUCTS.find(p => p.id === item.productId)
                  return (
                    <div key={`${item.productId}:${item.variantWeight}`} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: (product?.bgColor ?? '#cccccc') + '33' }}
                      >
                        {product?.emoji ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.variantWeight} × {item.qty}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                        £{(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between" style={{ color: GREEN }}>
                    <span>Discount ({appliedPromo})</span>
                    <span>−£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span style={{ color: GREEN }}>Free</span>
                    : <span>£{shipping.toFixed(2)}</span>
                  }
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
