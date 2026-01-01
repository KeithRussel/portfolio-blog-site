export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="space-y-6 animate-pulse">
                {/* Profile Image Skeleton */}
                <div className="relative w-32 h-32 rounded-full bg-gray-200" />

                {/* Text Skeletons */}
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-12 bg-gray-200 rounded-lg w-2/3" />
                  <div className="h-6 bg-gray-200 rounded-lg w-full max-w-2xl" />
                  <div className="h-6 bg-gray-200 rounded-lg w-5/6 max-w-2xl" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex flex-wrap gap-4">
                  <div className="h-12 bg-gray-200 rounded-full w-40" />
                  <div className="h-12 bg-gray-200 rounded-full w-32" />
                </div>
              </div>
            </div>

            {/* Right Column - Social Links Skeleton */}
            <div className="lg:col-span-5 order-1 lg:order-2 animate-pulse">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i}>
                      <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-24" />
                          <div className="h-3 bg-gray-200 rounded w-32" />
                        </div>
                        <div className="w-5 h-5 bg-gray-200 rounded" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section Skeleton */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-3" />
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm animate-pulse"
              >
                <div className="relative w-full h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                    <div className="h-6 bg-gray-200 rounded-full w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center animate-pulse">
            <div className="h-12 bg-gray-200 rounded-full w-48 mx-auto" />
          </div>
        </div>
      </section>

      {/* Tech Stack Section Skeleton */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-pulse">
            <div className="mb-4">
              <div className="inline-block bg-gray-200 h-8 w-20 rounded-br-2xl" />
            </div>
            <div className="mb-12">
              <div className="h-10 bg-gray-200 rounded-lg w-96 mb-4" />
              <div className="h-10 bg-gray-200 rounded-lg w-80 mb-4" />
              <div className="h-5 bg-gray-200 rounded-lg w-full max-w-2xl" />
              <div className="h-5 bg-gray-200 rounded-lg w-5/6 max-w-2xl mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 aspect-square border border-gray-100 animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section Skeleton */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-pulse">
            <div className="inline-block bg-gray-200 h-8 w-24 rounded-br-2xl mb-4" />
            <div className="h-10 bg-gray-200 rounded-lg w-48 mx-auto mb-4" />
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 animate-pulse">
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded w-full" />
              <div className="h-5 bg-gray-200 rounded w-full" />
              <div className="h-5 bg-gray-200 rounded w-5/6" />
              <div className="h-5 bg-gray-200 rounded w-full mt-6" />
              <div className="h-5 bg-gray-200 rounded w-full" />
              <div className="h-5 bg-gray-200 rounded w-4/5" />
              <div className="h-5 bg-gray-200 rounded w-full mt-6" />
              <div className="h-5 bg-gray-200 rounded w-full" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-pulse">
            <div className="inline-block bg-gray-200 h-8 w-24 rounded-br-2xl mb-4 mx-auto" />
            <div className="h-10 bg-gray-200 rounded-lg w-48 mx-auto mb-4" />
            <div className="h-5 bg-gray-200 rounded-lg w-96 mx-auto" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 animate-pulse"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-200 mb-6" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section Skeleton */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-3" />
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm animate-pulse"
              >
                <div className="relative w-full h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center animate-pulse">
            <div className="h-12 bg-gray-200 rounded-full w-48 mx-auto" />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center animate-pulse">
          <div className="inline-block bg-gray-200 h-8 w-32 rounded-br-2xl mb-4" />
          <div className="h-10 bg-gray-200 rounded-lg w-80 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto mb-8" />
          <div className="h-12 bg-gray-200 rounded-full w-48 mx-auto" />
        </div>
      </section>
    </div>
  )
}
