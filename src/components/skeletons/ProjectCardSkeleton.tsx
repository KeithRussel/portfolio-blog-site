export function ProjectCardSkeleton() {
  return (
    <div className="h-full group overflow-hidden border border-gray-200 bg-white shadow-sm rounded-lg animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="relative w-full h-48 bg-gray-200" />

      <div className="p-6">
        {/* Title skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </div>

        {/* Tech stack badges skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-14 bg-gray-200 rounded" />
        </div>

        {/* Links skeleton */}
        <div className="flex gap-3">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
