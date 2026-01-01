export function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header skeleton */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-10 bg-gray-200 rounded w-2/3" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
          </div>

          {/* Short description skeleton */}
          <div className="space-y-2 mb-8">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-4/5" />
          </div>

          {/* Meta info skeleton */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="h-10 w-24 bg-gray-200 rounded-full" />
            <div className="h-10 w-24 bg-gray-200 rounded-full" />
          </div>

          {/* Tech stack skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-7 w-20 bg-gray-200 rounded" />
            <div className="h-7 w-24 bg-gray-200 rounded" />
            <div className="h-7 w-16 bg-gray-200 rounded" />
            <div className="h-7 w-28 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Thumbnail skeleton */}
      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="relative w-full h-96 bg-gray-200 rounded-2xl mb-12" />

        {/* Description content skeleton */}
        <div className="space-y-4 mb-12">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />

          <div className="h-8" />

          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-9/12" />
        </div>

        {/* Gallery skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full h-64 bg-gray-200 rounded-lg" />
          <div className="relative w-full h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
