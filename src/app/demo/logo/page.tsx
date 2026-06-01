'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

const demos = [
  { id: 1, label: '1. Spinning gold ring' },
  { id: 2, label: '2. Ripple pulse' },
  { id: 3, label: '3. Floating glow' },
  { id: 4, label: '4. Gold border reveal' },
]

function TextBlock() {
  return (
    <>
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
    </>
  )
}

/* ── Demo 1: spinning gold ring around logo ── */
function Demo1() {
  return (
    <section className="relative overflow-hidden py-20 text-center" style={{ backgroundColor: GREEN }}>
      <style>{`
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .spin-ring { animation: spinRing 8s linear infinite; }
      `}</style>
      <div className="relative inline-block mb-6">
        <svg
          className="spin-ring absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]"
          viewBox="0 0 124 124"
          fill="none"
        >
          <circle cx="62" cy="62" r="58" stroke={GOLD} strokeWidth="2" strokeDasharray="12 8" strokeLinecap="round" />
        </svg>
        <Image
          src="/logo.webp"
          alt="Bakhtar Market"
          width={100}
          height={100}
          className="rounded-full ring-4"
          style={{ '--tw-ring-color': `${GOLD}55` } as React.CSSProperties}
        />
      </div>
      <TextBlock />
    </section>
  )
}

/* ── Demo 2: ripple pulse rings ── */
function Demo2() {
  return (
    <section className="relative overflow-hidden py-20 text-center" style={{ backgroundColor: GREEN }}>
      <style>{`
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .ripple-1 { animation: ripple 2.4s ease-out infinite; }
        .ripple-2 { animation: ripple 2.4s ease-out 0.8s infinite; }
        .ripple-3 { animation: ripple 2.4s ease-out 1.6s infinite; }
      `}</style>
      <div className="relative inline-block mb-6">
        <span className="ripple-1 absolute inset-0 rounded-full border-2" style={{ borderColor: `${GOLD}88` }} />
        <span className="ripple-2 absolute inset-0 rounded-full border-2" style={{ borderColor: `${GOLD}55` }} />
        <span className="ripple-3 absolute inset-0 rounded-full border-2" style={{ borderColor: `${GOLD}33` }} />
        <Image
          src="/logo.webp"
          alt="Bakhtar Market"
          width={100}
          height={100}
          className="rounded-full relative z-10"
        />
      </div>
      <TextBlock />
    </section>
  )
}

/* ── Demo 3: floating glow ── */
function Demo3() {
  return (
    <section className="relative overflow-hidden py-20 text-center" style={{ backgroundColor: GREEN }}>
      <style>{`
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
      `}</style>
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
          className="float-logo rounded-full relative z-10 ring-2"
          style={{ '--tw-ring-color': `${GOLD}66` } as React.CSSProperties}
        />
      </div>
      <TextBlock />
    </section>
  )
}

/* ── Demo 4: gold border reveal (conic gradient spinning border) ── */
function Demo4() {
  return (
    <section className="relative overflow-hidden py-20 text-center" style={{ backgroundColor: GREEN }}>
      <style>{`
        @keyframes conicSpin { to { --angle: 360deg; } }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .conic-border {
          animation: conicSpin 3s linear infinite;
          background: conic-gradient(from var(--angle), ${GOLD}, transparent 40%, ${GOLD} 60%, transparent);
          padding: 3px;
          border-radius: 9999px;
        }
        .conic-inner {
          border-radius: 9999px;
          overflow: hidden;
          background: ${GREEN};
          padding: 3px;
        }
      `}</style>
      <div className="relative inline-block mb-6">
        <div className="conic-border">
          <div className="conic-inner">
            <Image
              src="/logo.webp"
              alt="Bakhtar Market"
              width={100}
              height={100}
              className="rounded-full block"
            />
          </div>
        </div>
      </div>
      <TextBlock />
    </section>
  )
}

const demoComponents = [Demo1, Demo2, Demo3, Demo4]

export default function LogoDemoPage() {
  const [active, setActive] = useState(0)
  const ActiveDemo = demoComponents[active]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Logo Style Demo — pick one</p>
          <div className="flex flex-wrap gap-2">
            {demos.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActive(i)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={
                  active === i
                    ? { backgroundColor: GREEN, color: '#fff', borderColor: GREEN }
                    : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
                }
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ActiveDemo />

      <div className="max-w-2xl mx-auto px-6 py-8 text-center">
        {active === 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Spinning Gold Ring</h2>
            <p className="text-gray-500 text-sm">A dashed gold circle slowly rotates around the logo. Elegant and subtle — draws the eye without being distracting.</p>
          </>
        )}
        {active === 1 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ripple Pulse</h2>
            <p className="text-gray-500 text-sm">Three rings expand outward from the logo like a heartbeat. Energetic and modern — makes the logo feel alive.</p>
          </>
        )}
        {active === 2 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Floating Glow</h2>
            <p className="text-gray-500 text-sm">The logo gently bobs up and down with a warm gold glow pulsing beneath it. Soft and premium.</p>
          </>
        )}
        {active === 3 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Gold Border Reveal</h2>
            <p className="text-gray-500 text-sm">A conic gradient border sweeps continuously around the logo like a loading arc — striking and dynamic.</p>
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
