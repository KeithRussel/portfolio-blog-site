import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  queryParams?: Record<string, string>
}

export function Pagination({ currentPage, totalPages, basePath, queryParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null

  // Helper function to build URL with query params
  const buildUrl = (page: number) => {
    const params = new URLSearchParams(queryParams)
    if (page > 1) {
      params.set('page', page.toString())
    }
    const queryString = params.toString()
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  const pages = []
  const showEllipsisStart = currentPage > 3
  const showEllipsisEnd = currentPage < totalPages - 2

  // Always show first page
  pages.push(1)

  // Show ellipsis or pages before current
  if (showEllipsisStart) {
    pages.push(-1) // -1 represents ellipsis
    if (currentPage > 2) {
      pages.push(currentPage - 1)
    }
  } else {
    for (let i = 2; i < currentPage; i++) {
      pages.push(i)
    }
  }

  // Current page (if not first or last)
  if (currentPage !== 1 && currentPage !== totalPages) {
    pages.push(currentPage)
  }

  // Show pages after current or ellipsis
  if (showEllipsisEnd) {
    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 1)
    }
    pages.push(-2) // -2 represents ellipsis
  } else {
    for (let i = currentPage + 1; i < totalPages; i++) {
      pages.push(i)
    }
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-full cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          const isActive = page === currentPage
          const href = buildUrl(page)

          return (
            <Link
              key={page}
              href={href}
              className={`
                inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full transition-colors
                ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-full cursor-not-allowed">
          Next
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  )
}
