import { renderHook, act } from '@testing-library/react'
import { WishlistProvider, useWishlist } from './wishlist-context'
import type { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <WishlistProvider>{children}</WishlistProvider>
)

describe('useWishlist', () => {
  it('toggle adds a key', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper })
    act(() => result.current.toggle('product-1', '500g'))
    expect(result.current.isWishlisted('product-1', '500g')).toBe(true)
  })

  it('toggle again removes the key', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper })
    act(() => result.current.toggle('product-1', '500g'))
    act(() => result.current.toggle('product-1', '500g'))
    expect(result.current.isWishlisted('product-1', '500g')).toBe(false)
  })

  it('isWishlisted reflects state correctly', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper })
    expect(result.current.isWishlisted('product-1', '500g')).toBe(false)
    act(() => result.current.toggle('product-1', '500g'))
    expect(result.current.isWishlisted('product-1', '500g')).toBe(true)
  })
})
