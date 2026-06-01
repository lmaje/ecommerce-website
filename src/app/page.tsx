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
          @keyframes floatLogo {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50%       { opacity: 0.9; transform: scale(1.15); }
          }
          .float-logo { animation: floatLogo 3.5s ease-in-out infinite; }
          .glow-blob  { animation: glowPulse 3.5s ease-in-out infinite; }
          @keyframes arrowBounce {
            0%, 100% { transform: translateX(0); }
            50%       { transform: translateX(6px); }
          }
          .arrow-bounce { display: inline-block; animation: arrowBounce 1s ease-in-out infinite; }
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
          <div className="relative inline-block mb-6">
            <span
              className="glow-blob absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: GOLD, opacity: 0.5 }}
            />
            <Image
              src="/logo.webp"
              alt="Bakhtar Market"
              width={100}
              height={100}
              className="float-logo rounded-full relative z-10 ring-2 ring-yellow-400/40"
            />
          </div>
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
            Browse the Shop <span className="arrow-bounce">→</span>
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

      {/* Visit our store + Contact us */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Visit our store */}
          <div className="bg-white rounded-2xl border border-gray-200 p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Visit Our Store</h2>
            <p className="text-gray-900 text-sm mb-8">Come experience our quality in person — we would love to meet you.</p>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `#0B4D1312` }}>
                  <svg className="w-4 h-4" fill="none" stroke={GREEN} strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Address</p>
                  <p className="text-sm text-gray-900 leading-relaxed">Unit 1B Global Trading Centre, Amberley Way<br />Hounslow, TW4 6BH</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `#0B4D1312` }}>
                  <svg className="w-4 h-4" fill="none" stroke={GREEN} strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Opening Hours</p>
                  <p className="text-sm text-gray-900">Monday – Sunday<br />7:00 am – 7:00 pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact us */}
          <div className="bg-white rounded-2xl border border-gray-200 p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Us</h2>
            <p className="text-gray-900 text-sm mb-8">We're here to help — reach out any time.</p>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `#0B4D1312` }}>
                  <svg className="w-4 h-4" fill="none" stroke={GREEN} strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Phone</p>
                  <a href="tel:02080894050" className="text-sm text-gray-900 hover:text-gray-600 transition-colors">020 8089 4050</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `#0B4D1312` }}>
                  <svg className="w-4 h-4" fill="none" stroke={GREEN} strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Email</p>
                  <a href="mailto:info@bakhtarmarket.co.uk" className="text-sm text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap">info@bakhtarmarket.co.uk</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

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
