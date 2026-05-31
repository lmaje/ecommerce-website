import type { Product } from './products'

export function filterProducts(query: string, products: Product[]): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  )
}
