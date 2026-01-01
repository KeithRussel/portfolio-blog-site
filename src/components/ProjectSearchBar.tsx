'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'

export function ProjectSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // Update URL with search query
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedQuery) {
      params.set('search', debouncedQuery)
      params.delete('page') // Reset to page 1 on new search
    } else {
      params.delete('search')
      params.delete('page') // Reset to page 1 when clearing search
    }

    const queryString = params.toString()
    router.push(queryString ? `/projects?${queryString}` : '/projects')
  }, [debouncedQuery, router, searchParams])

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClear = useCallback(() => {
    setQuery('')
    inputRef.current?.focus()
  }, [])

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search projects... (⌘K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            pl-10 pr-10 py-6 text-base
            border-gray-200 rounded-full
            focus:border-gray-300 focus:ring-2 focus:ring-gray-100
            transition-all
            ${isFocused ? 'shadow-md' : 'shadow-sm'}
          `}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Search hint */}
      {query && (
        <p className="text-xs text-gray-500 mt-2 ml-4">
          Searching for "{query}"...
        </p>
      )}
    </div>
  )
}
