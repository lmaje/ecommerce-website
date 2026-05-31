'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/cart-context'
import { useWishlist } from '@/components/wishlist-context'
import { useToast } from '@/components/toast'
import { ProductCard } from '@/components/product-card'
import { CATEGORIES, type Product } from '@/lib/products'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { toast } = useToast()

  const variant = product.variants[selectedVariant]
  const category = CATEGORIES.find(c => c.id === product.categoryId)
  const wishlisted = isWishlisted(product.id, variant.weight)

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product.id, variant.weight, variant.price, product.name)
    toast(`Added ${product.name} (${variant.weight} × ${qty}) to cart`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleWishlist() {
    toggle(product.id, variant.weight)
    toast(
      isWishlisted(product.id, variant.weight)
        ? `Removed ${product.name} from wishlist`
        : `Saved ${product.name} to wishlist`
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/shop" className="hover:text-gray-600">Shop</Link>
          <span className="mx-2">›</span>
          {category && (
            <>
              <Link href={`/shop?cat=${category.id}`} className="hover:text-gray-600">{category.name}</Link>
              <span className="mx-2">›</span>
            </>
          )}
          <span className="text-gray-700">{product.name}</span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Image */}
          <div
            className="rounded-3xl aspect-square flex items-center justify-center text-[140px]"
            style={{ backgroundColor: product.bgColor + '22' }}
          >
            <span role="img" aria-label={product.name} style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.15))' }}>
              {product.emoji}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {category && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-4 w-fit px-3 py-1 rounded-full"
                style={{ backgroundColor: GOLD + '22', color: '#8B6B00' }}
              >
                {category.emoji} {category.name}
              </span>
            )}

            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h1>
            <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

            {/* Variant selector */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Size / Weight</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.weight}
                    onClick={() => { setSelectedVariant(i); setAdded(false) }}
                    disabled={!v.inStock}
                    className={`px-5 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${
                      i === selectedVariant
                        ? 'text-white border-transparent scale-105'
                        : v.inStock
                          ? 'border-gray-200 text-gray-700 hover:border-gray-400'
                          : 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                    }`}
                    style={i === selectedVariant ? { backgroundColor: GREEN, borderColor: GREEN } : {}}
                  >
                    {v.weight}
                    {!v.inStock && <span className="ml-1 text-xs">(out of stock)</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-900">£{variant.price.toFixed(2)}</span>
              {variant.inStock
                ? <span className="ml-3 text-sm text-green-600 font-medium">✓ In stock</span>
                : <span className="ml-3 text-sm text-red-500 font-medium">Out of stock</span>
              }
            </div>

            {/* Qty + Add to Cart */}
            {variant.inStock && (
              <div className="mb-3 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-10 h-11 text-gray-500 hover:bg-gray-50 font-medium text-lg"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-900">{qty}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      aria-label="Increase quantity"
                      className="w-10 h-11 text-gray-500 hover:bg-gray-50 font-medium text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-11 rounded-xl text-white font-semibold text-sm transition-all"
                    style={{ backgroundColor: added ? GOLD : GREEN }}
                  >
                    {added ? '✓ Added to cart!' : 'Add to Cart'}
                  </button>
                </div>
                <Link
                  href="/cart"
                  className="h-11 w-full rounded-xl border-2 font-semibold text-sm flex items-center justify-center transition-colors hover:bg-gray-50"
                  style={{ borderColor: GREEN, color: GREEN }}
                >
                  View Cart
                </Link>
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="flex items-center gap-2 text-sm font-medium transition-colors w-fit"
              style={{ color: wishlisted ? GOLD : '#6B7280' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlisted ? GOLD : 'none'}
                stroke={wishlisted ? GOLD : '#9CA3AF'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlisted ? 'Saved to wishlist' : 'Save to wishlist'}
            </button>

            {/* Delivery note */}
            <p className="mt-6 text-xs text-gray-400">
              🚚 Free delivery on orders over £50 · Dispatched within 1–2 business days
            </p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">More from {category?.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
