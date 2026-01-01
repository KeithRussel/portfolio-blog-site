import { BlogCardSkeleton } from '@/components/skeletons/BlogCardSkeleton'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-[500px] mx-auto" />
          </div>
        </div>
      </section>

      {/* Search Bar Skeleton */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center mb-6">
            <div className="h-14 bg-gray-200 rounded-full w-full max-w-2xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 flex-wrap animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
            <div className="h-8 w-28 bg-gray-200 rounded-full" />
            <div className="h-8 w-20 bg-gray-200 rounded-full" />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
