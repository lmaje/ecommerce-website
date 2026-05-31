import { getPostBySlug } from './blog-posts'

describe('getPostBySlug', () => {
  it('returns the correct post for a known slug', () => {
    const post = getPostBySlug('the-story-of-afghan-saffron')
    expect(post).toBeDefined()
    expect(post!.slug).toBe('the-story-of-afghan-saffron')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getPostBySlug('not-a-real-post')).toBeUndefined()
  })
})
