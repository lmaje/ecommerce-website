import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'
import { FEATURED_PRODUCTS, CATEGORIES } from '@/lib/products'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

const DOTS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 10) % 100}%`,
  top: `${(i * 53 + 5) % 100}%`,
  delay: `${(i * 0.3) % 4}s`,
  duration: `${3 + (i % 4)}s`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
}))

async function FeaturedProductGrid() {
  const products = FEATURED_PRODUCTS
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function FeaturedProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <style>{`
          @keyframes floatDot {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
            33%       { transform: translateY(-12px) translateX(5px); opacity: 1; }
            66%       { transform: translateY(-6px) translateX(-4px); opacity: 0.8; }
          }
          .dot-float { animation: floatDot var(--dur) var(--delay) ease-in-out infinite; }
        `}</style>
        {DOTS.map(d => (
          <span
            key={d.id}
            className="dot-float absolute rounded-full pointer-events-none"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              backgroundColor: GOLD,
              '--dur': d.duration,
              '--delay': d.delay,
            } as React.CSSProperties}
          />
        ))}
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <Image
            src="/logo.webp"
            alt="Bakhtar Market"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-6 ring-4 ring-white/20"
          />
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Afghan &amp; International Groceries · Delivered UK-Wide
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Taste the <span style={{ color: GOLD }}>Tradition</span>
          </h1>
          <p className="text-white/70 text-lg max-w-md mx-auto mb-8">
            Authentic Afghan and international groceries, spices, and pantry staples — sourced directly and delivered to your door.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
            style={{ backgroundColor: GOLD }}
          >
            Browse the Shop →
          </Link>
        </div>
      </section>

      {/* Category scroll */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/shop?cat=${cat.id}`}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-400 text-sm font-medium text-gray-700 transition-colors whitespace-nowrap"
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className="text-gray-400 text-xs">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <Suspense fallback={<FeaturedProductGridSkeleton />}>
          <FeaturedProductGrid />
        </Suspense>
        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
            style={{ backgroundColor: GREEN }}
          >
            View All Products →
          </Link>
        </div>
      </main>

      {/* Newsletter */}
      <section className="py-16 px-6" style={{ backgroundColor: GREEN }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Stay in the loop</h2>
          <p className="text-white/60 mb-6 text-sm">New arrivals, seasonal specials, and exclusive offers.</p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              aria-label="Email address for newsletter"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: GOLD, color: GREEN }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}
