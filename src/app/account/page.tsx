'use client'

import { useState } from 'react'
import { useToast } from '@/components/toast'

const GREEN = '#0B4D13'
const GOLD = '#C9A227'

type Tab = 'login' | 'register'

function InputField({ label, type = 'text', value, onChange }: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 bg-white"
      />
    </div>
  )
}

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { toast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast('Demo mode — sign-in coming soon')
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">My Account</h1>

      {/* Tabs */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-8 bg-white">
        {(['login', 'register'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-semibold transition-colors capitalize"
            style={
              tab === t
                ? { backgroundColor: GREEN, color: '#fff' }
                : { color: '#6B7280' }
            }
          >
            {t === 'login' ? 'Login' : 'Register'}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        {tab === 'register' && (
          <InputField label="Full name" value={name} onChange={setName} />
        )}
        <InputField label="Email" type="email" value={email} onChange={setEmail} />
        <InputField label="Password" type="password" value={password} onChange={setPassword} />

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mt-2"
          style={{ backgroundColor: GREEN }}
        >
          {tab === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <p className="text-center text-xs text-gray-400 pt-1">
          {tab === 'login' ? (
            <>No account?{' '}
              <button type="button" onClick={() => setTab('register')} className="underline hover:text-gray-600">Register</button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button type="button" onClick={() => setTab('login')} className="underline hover:text-gray-600">Sign in</button>
            </>
          )}
        </p>
      </form>

      <div className="mt-4 text-center">
        <span
          className="inline-block text-xs px-3 py-1.5 rounded-full"
          style={{ backgroundColor: GOLD + '22', color: '#8B6B00' }}
        >
          🔒 Demo mode — authentication coming soon
        </span>
      </div>
    </div>
  )
}
