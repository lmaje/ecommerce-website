import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Orders — Bakhtar Market' }

const GREEN = '#0B4D13'

const MOCK_ORDERS = [
  { ref: 'BM-482910', date: '18 May 2025', items: 'Basmati Rice, Afghan Saffron, Green Tea', status: 'Delivered', total: 34.47 },
  { ref: 'BM-371204', date: '2 Apr 2025',  items: 'Pistachios (500g), Doogh × 2, Shorwa Mix', status: 'Delivered', total: 58.99 },
  { ref: 'BM-290583', date: '15 Mar 2025', items: 'Almonds (250g), Chai Masala', status: 'Delivered', total: 22.48 },
  { ref: 'BM-184762', date: '28 Feb 2025', items: 'Sella Rice (5kg), Rose Water, Chickpeas', status: 'Delivered', total: 45.96 },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Delivered:  { bg: '#D1FAE5', color: '#065F46' },
  Processing: { bg: '#FEF3C7', color: '#92400E' },
  Shipped:    { bg: '#DBEAFE', color: '#1E40AF' },
}

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 w-full">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Order History</h1>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <th className="px-6 py-4 text-left">Order</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_ORDERS.map(order => {
              const s = STATUS_STYLE[order.status] ?? STATUS_STYLE.Delivered
              return (
                <tr key={order.ref} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold" style={{ color: GREEN }}>{order.ref}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: s.bg, color: s.color }}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">£{order.total.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-4">
        {MOCK_ORDERS.map(order => {
          const s = STATUS_STYLE[order.status] ?? STATUS_STYLE.Delivered
          return (
            <div key={order.ref} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-sm" style={{ color: GREEN }}>{order.ref}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: s.bg, color: s.color }}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-gray-400">{order.date}</p>
              <p className="text-sm text-gray-600">{order.items}</p>
              <p className="text-sm font-bold text-gray-900">£{order.total.toFixed(2)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
