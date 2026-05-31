export const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  BAKHTAR5: 5,
}

export function applyPromoCode(code: string): number | null {
  const discount = PROMO_CODES[code.toUpperCase().trim()]
  return discount ?? null
}
