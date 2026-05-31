import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — Bakhtar Market',
  description: 'Recipes, sourcing stories, and Afghan food culture from the Bakhtar Market team.',
  openGraph: {
    title: 'Blog — Bakhtar Market',
    description: 'Recipes, sourcing stories, and Afghan food culture from the Bakhtar Market team.',
  },
}

const GREEN = '#0B4D13'
const GOLD = '#C9A227'
const OFF_WHITE = '#FAFAF7'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="flex flex-col" style={{ backgroundColor: OFF_WHITE }}>

      {/* Header */}
      <section className="relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            The Bakhtar Market Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Stories, Recipes &amp; Culture
          </h1>
          <p className="text-white/70 text-lg">
            From saffron fields to your kitchen — we write about the food we love.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <main className="max-w-5xl mx-auto px-6 py-14 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(post => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Coloured top bar */}
              <div className="h-2 w-full" style={{ backgroundColor: GOLD }} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.author}</span>
                </div>

                <h2 className="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 text-sm font-semibold transition-colors hover:underline w-fit"
                  style={{ color: GREEN }}
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

    </div>
  )
}
