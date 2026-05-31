import { getProductBySlug, PRODUCTS } from './products'

describe('getProductBySlug', () => {
  it('returns the matching product for a known slug', () => {
    const product = getProductBySlug('basmati-extra-long')
    expect(product).toBeDefined()
    expect(product!.id).toBe('basmati-extra-long')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProductBySlug('not-a-real-slug')).toBeUndefined()
  })
})

describe('PRODUCTS', () => {
  it('every product has at least one in-stock variant', () => {
    for (const product of PRODUCTS) {
      const hasInStock = product.variants.some(v => v.inStock)
      expect(hasInStock).toBe(true)
    }
  })
})
