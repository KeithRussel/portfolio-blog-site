import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tight mb-4 text-gray-900">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-gray-900">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 font-light max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Go Home
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Browse Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
