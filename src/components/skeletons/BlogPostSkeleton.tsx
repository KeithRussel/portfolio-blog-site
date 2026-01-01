export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header skeleton */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category badge skeleton */}
          <div className="h-6 w-24 bg-gray-200 rounded-full mb-6" />

          {/* Title skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
          </div>

          {/* Meta info skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Featured image skeleton */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8 mb-12">
        <div className="relative w-full h-96 bg-gray-200 rounded-2xl" />
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 max-w-4xl pb-16">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-9/12" />

          <div className="h-8" />

          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />
        </div>
      </div>
    </div>
  )
}
