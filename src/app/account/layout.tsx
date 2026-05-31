import type { Metadata } from 'next'
import { AccountNav } from './_nav'

export const metadata: Metadata = {
  title: 'Account — Bakhtar Market',
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 bg-[#FAFAF7]">
      <AccountNav />
      {children}
    </div>
  )
}
