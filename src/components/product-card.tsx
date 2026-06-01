'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from './cart-context'
import { useWishlist } from './wishlist-context'
import { useToast } from './toast'
import type { Product } from '@/lib/products'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

export function ProductCard({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0)
  const { addItem, getQty } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { toast } = useToast()

  const variant = product.variants[selected]
  const inCart = getQty(product.id, variant.weight)
  const wishlisted = isWishlisted(product.id, variant.weight)

  function handleAddToCart() {
    if (!variant.inStock) return
    addItem(product.id, variant.weight, variant.price, product.name)
    toast(`Added ${product.name} (${variant.weight}) to cart`)
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative">
        <Link
          href={`/shop/${product.id}`}
          className="h-44 block relative overflow-hidden"
          style={{ backgroundColor: product.bgColor + '33' }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={wishlisted ? GOLD : 'none'}
            stroke={wishlisted ? GOLD : '#9CA3AF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 hover:underline">{product.name}</h3>
        </Link>

        {/* Weight pills */}
        <div className="flex gap-1 flex-wrap">
          {product.variants.map((v, i) => (
            <button
              key={v.weight}
              onClick={() => setSelected(i)}
              aria-pressed={i === selected}
              className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                i === selected ? 'text-white border-transparent' : 'border-gray-200 text-gray-500 hover:border-gray-400'
              }`}
              style={i === selected ? { backgroundColor: GREEN } : {}}
            >
              {v.weight}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">£{variant.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!variant.inStock}
            className="text-xs px-3 py-1.5 rounded-lg text-white font-medium transition-all disabled:opacity-40 whitespace-nowrap"
            style={{ backgroundColor: inCart ? GOLD : GREEN }}
          >
            {!variant.inStock ? 'Out of stock' : inCart ? `In cart (${inCart})` : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
