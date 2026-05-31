'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const GREEN = '#0B4D13'

const LINKS = [
  { href: '/account', label: 'Account', exact: true },
  { href: '/account/orders', label: 'Orders', exact: false },
  { href: '/account/wishlist', label: 'Wishlist', exact: false },
  { href: '/account/addresses', label: 'Addresses', exact: false },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <nav className="flex gap-1 overflow-x-auto no-scrollbar" aria-label="Account navigation">
          {LINKS.map(({ href, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="flex-shrink-0 px-4 py-4 text-sm font-medium border-b-2 transition-colors"
                style={
                  active
                    ? { borderColor: GREEN, color: GREEN }
                    : { borderColor: 'transparent', color: '#6B7280' }
                }
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
