'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useWishlist } from '@/components/wishlist-context'
import { ProductCard } from '@/components/product-card'
import { PRODUCTS } from '@/lib/products'

const GREEN = '#0B4D13'

export default function WishlistPage() {
  const { wishlisted } = useWishlist()

  // wishlisted is "productId:variantWeight"[] — get unique products
  const products = [
    ...new Set(wishlisted.map(k => k.split(':')[0]))
  ]
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 w-full">
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Wishlist {products.length > 0 && <span className="text-gray-400 font-normal text-base">({products.length})</span>}
      </h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-2xl border border-gray-100">
          <p className="text-5xl mb-5">🤍</p>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            Save products you love by tapping the heart icon on any product.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: GREEN }}
          >
            Browse the Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
