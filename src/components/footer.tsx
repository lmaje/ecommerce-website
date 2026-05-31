import Link from 'next/link'
import { CATEGORIES } from '@/lib/products'

const GREEN = '#083A0E'

export function Footer() {
  return (
    <footer style={{ backgroundColor: GREEN }} className="text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* Shop by category */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Shop</h3>
          <ul className="space-y-2">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link
                  href={`/shop?cat=${cat.id}`}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Bakhtar Market · Afghan &amp; International Groceries</p>
          <p>Delivered across the UK 🇬🇧</p>
        </div>
      </div>
    </footer>
  )
}
