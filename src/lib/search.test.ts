import { filterProducts } from './search'
import { PRODUCTS } from './products'

describe('filterProducts', () => {
  it('returns matching products for a partial name match', () => {
    const results = filterProducts('basmati', PRODUCTS)
    expect(results.length).toBeGreaterThan(0)
    expect(results.every(p => p.name.toLowerCase().includes('basmati'))).toBe(true)
  })

  it('returns an empty array when there is no match', () => {
    expect(filterProducts('zzznomatch', PRODUCTS)).toEqual([])
  })

  it('is case-insensitive', () => {
    const lower = filterProducts('basmati', PRODUCTS)
    const upper = filterProducts('BASMATI', PRODUCTS)
    const mixed = filterProducts('BaSmAtI', PRODUCTS)
    expect(lower).toEqual(upper)
    expect(lower).toEqual(mixed)
  })

  it('returns all products for an empty query', () => {
    expect(filterProducts('', PRODUCTS)).toEqual(PRODUCTS)
  })
})
