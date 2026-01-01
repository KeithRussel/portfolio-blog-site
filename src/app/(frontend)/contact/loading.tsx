export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section Skeleton */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center animate-pulse">
            <div className="inline-block bg-gray-200 h-8 w-32 rounded-br-2xl mb-4" />
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto" />
            <div className="h-6 bg-gray-200 rounded-lg w-5/6 max-w-2xl mx-auto mt-2" />
          </div>
        </div>
      </section>

      {/* Contact Info Cards Skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-5 bg-gray-200 rounded w-24 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm animate-pulse">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-12 bg-gray-200 rounded-lg w-full" />
              </div>

              {/* Email Field */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-12 bg-gray-200 rounded-lg w-full" />
              </div>

              {/* Subject Field */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                <div className="h-12 bg-gray-200 rounded-lg w-full" />
              </div>

              {/* Message Field */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
                <div className="h-40 bg-gray-200 rounded-lg w-full" />
              </div>

              {/* Submit Button */}
              <div className="h-12 bg-gray-200 rounded-full w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
