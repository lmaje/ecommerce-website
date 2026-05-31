'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'
import { PRODUCTS, CATEGORIES } from '@/lib/products'

const GREEN = '#0B4D13'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

function sortProducts(products: typeof PRODUCTS, sort: SortKey) {
  const copy = [...products]
  if (sort === 'price-asc') return copy.sort((a, b) => a.variants[0].price - b.variants[0].price)
  if (sort === 'price-desc') return copy.sort((a, b) => b.variants[0].price - a.variants[0].price)
  if (sort === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name))
  return copy
}

function ShopContent() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams.get('cat'))
  const [sort, setSort] = useState<SortKey>('featured')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setActiveCategory(searchParams.get('cat'))
  }, [searchParams])

  const filtered = sortProducts(
    PRODUCTS.filter(p => !activeCategory || p.categoryId === activeCategory),
    sort
  )

  const activeLabel = CATEGORIES.find(c => c.id === activeCategory)?.name ?? 'All Products'

  return (
    <div className="flex flex-col flex-1">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <nav className="text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Shop</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">{activeLabel}</h1>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Category pills */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                !activeCategory ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
              style={!activeCategory ? { backgroundColor: GREEN } : {}}
            >
              All <span className="opacity-60">({PRODUCTS.length})</span>
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.id ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
                style={activeCategory === cat.id ? { backgroundColor: GREEN } : {}}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className="opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-gray-500">Sort:</label>
            <select
              id="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-400 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {!mounted ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-medium text-gray-600 mb-2">Nothing here yet</p>
            <button onClick={() => setActiveCategory(null)} className="text-sm font-medium hover:underline" style={{ color: GREEN }}>
              Clear filter
            </button>
          </div>
        ) : (

          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              {activeCategory ? (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-gray-400">Showing {filtered.length} products in this category</p>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="px-8 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: GREEN }}
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Showing all {filtered.length} products ·{' '}
                  <Link href="/" className="hover:underline" style={{ color: GREEN }}>Back to home</Link>
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  )
}
