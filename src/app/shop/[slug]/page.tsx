import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, PRODUCTS } from '@/lib/products'
import { ProductDetail } from './_product-detail'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — Bakhtar Market`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://bakhtarmarket.co.uk/shop/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  const related = PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)
  return <ProductDetail product={product} related={related} />
}
