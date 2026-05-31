import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostBySlug, BLOG_POSTS } from '@/lib/blog-posts'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'
const OFF_WHITE = '#FAFAF7'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Bakhtar Market`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://bakhtarmarket.co.uk/blog/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const paragraphs = post.body.split('\n\n').filter(Boolean)

  return (
    <div style={{ backgroundColor: OFF_WHITE }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-16">
          <nav className="text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-white/70">{post.title}</span>
          </nav>
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: GOLD }}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-white/30">·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Excerpt */}
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="border-l-4 my-10 pl-5 py-1"
          style={{ borderColor: GOLD }}
        >
          <p className="text-lg text-gray-600 italic leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Body */}
        <div className="pb-16 space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed text-base">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="border-t border-gray-200 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
            style={{ color: GREEN }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
