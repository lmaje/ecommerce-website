import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — Bakhtar Market',
  description: 'Learn the story behind Bakhtar Market — authentic Afghan and international groceries delivered across the UK.',
  openGraph: {
    title: 'About Us — Bakhtar Market',
    description: 'Learn the story behind Bakhtar Market — authentic Afghan and international groceries delivered across the UK.',
  },
}

const GREEN = '#0B4D13'
const GOLD = '#C9A227'
const OFF_WHITE = '#FAFAF7'

const TEAM = [
  {
    initials: 'ZM',
    name: 'Zahra Mohammadi',
    role: 'Founder & CEO',
    bio: 'Born in Kabul and raised in Birmingham, Zahra started Bakhtar Market after years of struggling to find quality Afghan pantry staples in the UK. Her family recipes are the soul of every product we stock.',
  },
  {
    initials: 'KN',
    name: 'Khalid Noorzai',
    role: 'Head of Sourcing',
    bio: 'Khalid travels to producer communities across Afghanistan, Pakistan, and Central Asia to find the finest ingredients. He believes the best food comes from producers who grow for flavour, not yield.',
  },
  {
    initials: 'SR',
    name: 'Sana Rahimi',
    role: 'Operations & Logistics',
    bio: 'Sana keeps Bakhtar Market running smoothly — from warehouse to doorstep. She is passionate about sustainable packaging and making sure every order arrives fresh and on time.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Bringing the Taste of <span style={{ color: GOLD }}>Home</span> to Your Door
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Bakhtar Market was born from a simple idea: everyone deserves access to the authentic flavours they grew up with, no matter where they live.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section style={{ backgroundColor: OFF_WHITE }}>
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1" style={{ backgroundColor: GOLD + '55' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD }}>Who We Are</span>
            <div className="h-px flex-1" style={{ backgroundColor: GOLD + '55' }} />
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            Bakhtar Market started in a small kitchen in Birmingham in 2019. Our founder Zahra Mohammadi was tired of paying supermarket prices for inferior substitutes — pale basmati, weak saffron, green tea that tasted of cardboard. She began sourcing directly from trusted producers in Afghanistan, Pakistan, and Central Asia, and sharing the surplus with friends and neighbours. Word spread quickly.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Today we work with over thirty small-scale producer families to bring you rice, nuts, teas, spices, and pantry staples that are as close to their origin as possible. Every product is chosen because it earned a place in somebody&apos;s family recipe — not because it came with a marketing budget.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are proudly independent, UK-based, and community-driven. A portion of every sale goes back to the producer communities we work with through our <span style={{ color: GREEN, fontWeight: 600 }}>Roots Programme</span>, which funds agricultural training and women-led cooperatives in Herat and Nangarhar provinces.
          </p>
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { emoji: '🌿', title: 'Fair Prices', body: 'We cut out the middlemen and build long-term relationships with producers.' },
            { emoji: '✅', title: 'Quality First', body: 'We source only the finest products, ensuring every product meets our high standards.' },
            { emoji: '🚚', title: 'UK-Wide Delivery', body: 'Free delivery on orders over £50. Dispatched within 1–2 business days.' },
          ].map(v => (
            <div key={v.title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{v.emoji}</span>
              <h3 className="font-bold text-gray-900">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ backgroundColor: OFF_WHITE }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GOLD }}>The People Behind It</p>
            <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map(member => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4"
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: GREEN }}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-0.5" style={{ color: GOLD }}>
                    {member.role}
                  </p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: GREEN }}>
        <h2 className="text-2xl font-bold text-white mb-3">Ready to explore?</h2>
        <p className="text-white/60 mb-8 text-sm max-w-sm mx-auto">
          Browse our full range of Afghan and international groceries, delivered to your door.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
          style={{ backgroundColor: GOLD }}
        >
          Browse the Shop →
        </Link>
      </section>

    </div>
  )
}
