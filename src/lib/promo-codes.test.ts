import { applyPromoCode } from './promo-codes'

describe('applyPromoCode', () => {
  it('returns the correct percentage for a valid code', () => {
    expect(applyPromoCode('WELCOME10')).toBe(10)
    expect(applyPromoCode('BAKHTAR5')).toBe(5)
  })

  it('returns null for an invalid code', () => {
    expect(applyPromoCode('NOTACODE')).toBeNull()
  })

  it('is case-insensitive', () => {
    expect(applyPromoCode('welcome10')).toBe(10)
    expect(applyPromoCode('Bakhtar5')).toBe(5)
  })
})
