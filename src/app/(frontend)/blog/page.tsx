import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Pagination } from '@/components/Pagination'
import { BlogGrid } from '@/components/BlogGrid'
import { CategoryFilter } from '@/components/CategoryFilter'
import { SearchBar } from '@/components/SearchBar'
import type { Category } from '@/payload-types'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

const POSTS_PER_PAGE = 9

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest articles on web development, programming, and technology',
  openGraph: {
    title: 'Blog',
    description: 'Read my latest articles on web development, programming, and technology',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Read my latest articles on web development, programming, and technology',
  },
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const categorySlug = params.category
  const searchQuery = params.search
  const payload = await getPayloadClient()

  // Fetch blog categories for the filter (including categories without type set)
  const { docs: allCategories } = await payload.find({
    collection: 'categories',
    where: {
      or: [
        {
          type: {
            equals: 'blog',
          },
        },
        {
          type: {
            exists: false,
          },
        },
      ],
    },
    limit: 100,
    sort: 'name',
  })

  // Build where clause for filtering and searching
  const whereClause: any = {
    status: {
      equals: 'published',
    },
  }

  // If category filter is active, add it to where clause
  if (categorySlug) {
    const category = allCategories.find((cat) => cat.slug === categorySlug)
    if (category) {
      whereClause['categories.id'] = {
        equals: category.id,
      }
    }
  }

  // If search query exists, add search conditions
  if (searchQuery && searchQuery.trim()) {
    whereClause.or = [
      {
        title: {
          contains: searchQuery,
        },
      },
      {
        excerpt: {
          contains: searchQuery,
        },
      },
    ]
  }

  // Fetch published blog posts using Payload Local API
  const { docs: posts, totalDocs } = await payload.find({
    collection: 'blog-posts',
    where: whereClause,
    sort: '-publishedAt', // Sort by newest first
    limit: POSTS_PER_PAGE,
    page: currentPage,
    depth: 2, // Include relationships (featuredImage, categories)
  })

  const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl font-semibold tracking-tight mb-4 text-gray-900">Blog</h1>
          <p className="text-lg text-gray-600 font-light">
            Thoughts on web development, programming patterns, and modern JavaScript frameworks
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Category Filter */}
        <CategoryFilter categories={allCategories as Category[]} activeCategory={categorySlug} />

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchQuery
                ? `No posts found for "${searchQuery}". Try a different search term.`
                : 'No blog posts published yet.'}
            </p>
          </div>
        ) : (
          <>
            {/* Search Results Count */}
            {searchQuery && (
              <p className="text-sm text-gray-600 mb-4">
                Found {totalDocs} {totalDocs === 1 ? 'post' : 'posts'} for "{searchQuery}"
              </p>
            )}

            <BlogGrid posts={posts} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog"
              queryParams={{
                ...(categorySlug ? { category: categorySlug } : {}),
                ...(searchQuery ? { search: searchQuery } : {}),
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
