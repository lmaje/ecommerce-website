import Link from 'next/link'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
      <p className="text-8xl md:text-9xl font-bold leading-none mb-4" style={{ color: GREEN }}>
        404
      </p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        We couldn&apos;t find that page.
      </h1>
      <p className="text-gray-500 text-sm mb-10 max-w-xs">
        The link may be broken, or the page may have been moved. Head back to the shop to find what you&apos;re looking for.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
        style={{ backgroundColor: GOLD }}
      >
        Browse the Shop →
      </Link>
    </div>
  )
}
