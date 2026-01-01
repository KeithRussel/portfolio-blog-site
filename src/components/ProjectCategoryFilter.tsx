'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import type { Category } from '@/payload-types'

interface ProjectCategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export function ProjectCategoryFilter({ categories, activeCategory }: ProjectCategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categorySlug === activeCategory) {
      // If clicking the active category, clear the filter
      params.delete('category')
      params.delete('page') // Reset to page 1
    } else {
      // Set new category filter
      params.set('category', categorySlug)
      params.delete('page') // Reset to page 1
    }

    const queryString = params.toString()
    router.push(queryString ? `/projects?${queryString}` : '/projects')
  }

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('page')
    const queryString = params.toString()
    const newUrl = queryString ? `/projects?${queryString}` : '/projects'
    router.push(newUrl)
  }

  if (categories.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700">Filter by category:</span>

        {/* All Projects Badge */}
        <button
          onClick={() => clearFilter()}
          className="transition-all"
        >
          <Badge
            variant={!activeCategory ? 'default' : 'outline'}
            className={`cursor-pointer ${
              !activeCategory
                ? 'bg-black text-white hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            All Projects
          </Badge>
        </button>

        {/* Category Badges */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug || '')}
              className="transition-all"
            >
              <Badge
                variant={isActive ? 'default' : 'outline'}
                className={`cursor-pointer ${
                  isActive
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {category.name}
                {isActive && <X className="w-3 h-3 ml-1" />}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* Active Filter Display */}
      {activeCategory && (
        <div className="mt-4 text-sm text-gray-600">
          Showing projects in{' '}
          <span className="font-medium text-gray-900">
            {categories.find((cat) => cat.slug === activeCategory)?.name}
          </span>
          {' · '}
          <button
            onClick={clearFilter}
            className="text-gray-900 hover:text-black underline font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
