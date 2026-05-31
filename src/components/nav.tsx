'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useCart } from './cart-context'
import { Search } from './search'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/account', label: 'Account' },
]

export function Nav() {
  const { count } = useCart()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!drawerOpen) return
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [drawerOpen])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* Left: logo + desktop links */}
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Bakhtar Market home">
              <Image
                src="/logo.webp"
                alt="Bakhtar Market"
                width={48}
                height={48}
                className="rounded-full"
                priority
              />
            </Link>
            <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-600" aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-gray-900 transition-colors"
                  style={pathname === href || pathname.startsWith(href + '/') ? { color: GREEN } : {}}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: search + cart + hamburger */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Search />

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ backgroundColor: GOLD }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="sm:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(o => !o)}
            >
              {drawerOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black/40"
          aria-hidden="true"
        >
          {/* Drawer panel */}
          <div
            ref={drawerRef}
            className="absolute right-0 top-0 h-full w-72 bg-white flex flex-col shadow-xl"
          >
            {/* Drawer header */}
            <div className="h-[72px] flex items-center justify-between px-6 border-b border-gray-100">
              <Link href="/" onClick={() => setDrawerOpen(false)}>
                <Image src="/logo.webp" alt="Bakhtar Market" width={44} height={44} className="rounded-full" />
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Drawer nav links */}
            <nav className="flex flex-col flex-1 px-4 py-6 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  style={pathname === href || pathname.startsWith(href + '/') ? { color: GREEN, backgroundColor: '#0B4D1310' } : {}}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-6 py-5 border-t border-gray-100">
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: GREEN }}
              >
                <span>View Cart</span>
                {count > 0 && (
                  <span
                    className="w-6 h-6 text-[11px] font-bold rounded-full flex items-center justify-center"
                    style={{ backgroundColor: GOLD }}
                  >
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
