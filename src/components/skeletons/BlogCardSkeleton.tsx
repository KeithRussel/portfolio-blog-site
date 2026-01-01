export function BlogCardSkeleton() {
  return (
    <div className="group overflow-hidden border border-gray-200 bg-white shadow-sm rounded-lg animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="relative w-full h-48 bg-gray-200" />

      <div className="p-6">
        {/* Category badge skeleton */}
        <div className="h-5 w-20 bg-gray-200 rounded-full mb-3" />

        {/* Title skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Meta info skeleton */}
        <div className="flex items-center gap-4 text-sm">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
