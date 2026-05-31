import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Addresses — Bakhtar Market' }

const GREEN = '#0B4D13'

const MOCK_ADDRESSES = [
  {
    id: 1,
    name: 'Fatima Khan',
    line1: '42 Ladypool Road',
    line2: '',
    city: 'Birmingham',
    postcode: 'B12 8JP',
    country: 'United Kingdom',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Fatima Khan',
    line1: '7 Melrose Avenue',
    line2: 'Flat 3',
    city: 'London',
    postcode: 'SW16 4EP',
    country: 'United Kingdom',
    isDefault: false,
  },
]

export default function AddressesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Saved Addresses</h1>
        <button
          className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: GREEN }}
        >
          + Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {MOCK_ADDRESSES.map(addr => (
          <div
            key={addr.id}
            className="bg-white rounded-2xl border p-6 flex flex-col gap-3"
            style={{ borderColor: addr.isDefault ? GREEN + '55' : '#F3F4F6' }}
          >
            {addr.isDefault && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                style={{ backgroundColor: GREEN + '15', color: GREEN }}
              >
                Default
              </span>
            )}
            <div className="text-sm text-gray-800 leading-relaxed">
              <p className="font-semibold">{addr.name}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>{addr.city}, {addr.postcode}</p>
              <p>{addr.country}</p>
            </div>
            <div className="flex gap-3 mt-1">
              <button aria-label={`Edit address at ${addr.line1}, ${addr.city}`} className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">Edit</button>
              {!addr.isDefault && (
                <button aria-label={`Set ${addr.line1} as default address`} className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">Set as default</button>
              )}
              <button aria-label={`Remove address at ${addr.line1}, ${addr.city}`} className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors ml-auto">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
