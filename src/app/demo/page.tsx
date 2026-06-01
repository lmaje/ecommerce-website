'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

const backgrounds = [
  { id: 1, label: '1. Animated Gradient Mesh' },
  { id: 2, label: '2. Floating Particles' },
  { id: 3, label: '3. Islamic Geometric Pattern' },
  { id: 4, label: '4. Food Texture Overlay' },
  { id: 5, label: '5. Radial Gold Glow' },
]

function HeroContent() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10">
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
  )
}

function Background1() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
      <style>{`
        @keyframes meshMove {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .mesh-bg {
          background: linear-gradient(135deg, #0B4D13, #1a7a22, #0B4D13, #0d5c17, #0a3d0f);
          background-size: 400% 400%;
          animation: meshMove 8s ease infinite;
        }
      `}</style>
      <div className="mesh-bg absolute inset-0" />
      <HeroContent />
    </section>
  )
}

function Background2() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 10) % 100}%`,
    top: `${(i * 53 + 5) % 100}%`,
    delay: `${(i * 0.3) % 4}s`,
    duration: `${3 + (i % 4)}s`,
    size: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
  }))

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 420, backgroundColor: GREEN }}>
      <style>{`
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          33%       { transform: translateY(-12px) translateX(5px); opacity: 1; }
          66%       { transform: translateY(-6px) translateX(-4px); opacity: 0.8; }
        }
        .dot-float { animation: floatDot var(--dur) var(--delay) ease-in-out infinite; }
      `}</style>
      {dots.map(d => (
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
      <HeroContent />
    </section>
  )
}

function Background3() {
  const tileSize = 60
  const svgPattern = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${tileSize}' height='${tileSize}'>
      <polygon points='30,2 58,17 58,43 30,58 2,43 2,17' fill='none' stroke='rgba(201,162,39,0.18)' stroke-width='1'/>
      <polygon points='30,12 48,22 48,38 30,48 12,38 12,22' fill='none' stroke='rgba(201,162,39,0.10)' stroke-width='0.8'/>
      <line x1='30' y1='2' x2='30' y2='12' stroke='rgba(201,162,39,0.12)' stroke-width='0.8'/>
      <line x1='58' y1='17' x2='48' y2='22' stroke='rgba(201,162,39,0.12)' stroke-width='0.8'/>
      <line x1='58' y1='43' x2='48' y2='38' stroke='rgba(201,162,39,0.12)' stroke-width='0.8'/>
      <line x1='30' y1='58' x2='30' y2='48' stroke='rgba(201,162,39,0.12)' stroke-width='0.8'/>
      <line x1='2' y1='43' x2='12' y2='38' stroke='rgba(201,162,39,0.12)' stroke-width='0.8'/>
      <line x1='2' y1='17' x2='12' y2='22' stroke='rgba(201,162,39,0.12)' stroke-width='0.8'/>
    </svg>
  `
  const encoded = `url("data:image/svg+xml,${encodeURIComponent(svgPattern)}")`

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 420, backgroundColor: GREEN }}>
      <div className="absolute inset-0" style={{ backgroundImage: encoded, backgroundSize: `${tileSize}px ${tileSize}px` }} />
      <HeroContent />
    </section>
  )
}

function Background4() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/products/saffron.jpg')` }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: `${GREEN}d9` }} />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 0, transparent 8px)` }}
      />
      <HeroContent />
    </section>
  )
}

function Background5() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 420, backgroundColor: GREEN }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${GOLD}33 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 28px)`, backgroundSize: '28px 28px' }}
      />
      <HeroContent />
    </section>
  )
}

const bgComponents = [Background1, Background2, Background3, Background4, Background5]

export default function DemoPage() {
  const [active, setActive] = useState(0)
  const ActiveBg = bgComponents[active]

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Selector bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Background Demo — pick one</p>
          <div className="flex flex-wrap gap-2">
            {backgrounds.map((bg, i) => (
              <button
                key={bg.id}
                onClick={() => setActive(i)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={
                  active === i
                    ? { backgroundColor: GREEN, color: '#fff', borderColor: GREEN }
                    : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
                }
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live preview */}
      <ActiveBg />

      {/* Description */}
      <div className="max-w-2xl mx-auto px-6 py-8 text-center">
        {active === 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Animated Gradient Mesh</h2>
            <p className="text-gray-500 text-sm">A slowly breathing gradient between dark green tones. Feels alive and modern, zero images needed. Pure CSS animation.</p>
          </>
        )}
        {active === 1 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Floating Gold Particles</h2>
            <p className="text-gray-500 text-sm">Tiny gold dots drifting gently — like floating spice seeds. Elegant and on-brand. Each dot has a unique speed and delay.</p>
          </>
        )}
        {active === 2 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Islamic Geometric Pattern</h2>
            <p className="text-gray-500 text-sm">Subtle hexagonal tiling with gold strokes. Culturally resonant for an Afghan brand, adds texture without clutter.</p>
          </>
        )}
        {active === 3 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Food Texture Overlay</h2>
            <p className="text-gray-500 text-sm">A blurred product photo behind a deep green overlay. Premium and atmospheric. Works best when you have a great hero photo.</p>
          </>
        )}
        {active === 4 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Radial Gold Glow</h2>
            <p className="text-gray-500 text-sm">A warm gold radial glow centered behind the headline — like a sunrise or spotlight. Simple, dramatic, and on-brand.</p>
          </>
        )}
        <p className="mt-6 text-xs text-gray-400">
          Like one? Tell Claude and it will be applied to the real homepage.{' '}
          <Link href="/" className="underline" style={{ color: GREEN }}>Back to site →</Link>
        </p>
      </div>

    </div>
  )
}
