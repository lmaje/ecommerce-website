'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { filterProducts } from '@/lib/search'
import { PRODUCTS } from '@/lib/products'

export function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const results = query.trim() ? filterProducts(query, PRODUCTS) : []

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    function onMouse(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onMouse)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onMouse)
    }
  }, [open])

  function close() {
    setOpen(false)
    setQuery('')
  }

  const listboxVisible = open && query.trim().length > 0

  return (
    <div ref={containerRef} className="relative">
      {/* Toggle button */}
      <button
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? 'Close search' : 'Search products'}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        )}
      </button>

      {/* Search panel — fixed below the nav */}
      {open && (
        <div className="fixed left-0 right-0 top-[72px] z-50 px-4 sm:px-6 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                role="combobox"
                aria-expanded={listboxVisible}
                aria-controls="search-listbox"
                aria-autocomplete="list"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products…"
                className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results */}
            {listboxVisible && (
              <ul
                id="search-listbox"
                role="listbox"
                aria-label="Product search results"
                className="max-h-80 overflow-y-auto"
              >
                {results.length === 0 ? (
                  <li className="px-5 py-8 text-center text-sm text-gray-400" role="option" aria-selected={false}>
                    No products found for &ldquo;{query}&rdquo;
                  </li>
                ) : (
                  results.map(product => (
                    <li key={product.id} role="option" aria-selected={false}>
                      <Link
                        href={`/shop/${product.id}`}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ backgroundColor: product.bgColor + '33' }}
                        >
                          {product.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate">{product.description}</p>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          from £{Math.min(...product.variants.map(v => v.price)).toFixed(2)}
                        </span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
