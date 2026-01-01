'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import type { Media, BlogPost } from '@/payload-types'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { ScaleOnHover } from '@/components/animations/ScaleOnHover'

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const featuredImage = post.featuredImage as Media | null
        const categories = Array.isArray(post.categories) ? post.categories : []

        // Normalize image URL - fix double slashes that break Next.js Image optimization
        const imageUrl = featuredImage?.url?.replace(/([^:]\/)\/+/g, '$1') || null

        return (
          <StaggerItem key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <ScaleOnHover>
                <Card className="h-full group overflow-hidden border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
                  {/* Featured Image */}
                  {imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={featuredImage?.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    {/* Categories */}
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {categories.slice(0, 2).map((cat) => {
                          const category = typeof cat === 'object' ? cat : null
                          return category ? (
                            <Badge
                              key={category.id}
                              variant="secondary"
                              className="bg-gray-100 text-gray-700 border-0 font-normal text-xs"
                            >
                              {category.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    )}

                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>

                    {/* Published Date */}
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-gray-600 font-light line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </Link>
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
