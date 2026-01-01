'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Star } from 'lucide-react'
import type { Media, Project } from '@/payload-types'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { ScaleOnHover } from '@/components/animations/ScaleOnHover'

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const thumbnail = project.thumbnail as Media | null
        const techStack = Array.isArray(project.techStack) ? project.techStack : []
        const categories = Array.isArray(project.categories) ? project.categories : []

        // Check if project has "wordpress" category
        const hasWordPressCategory = categories.some((cat) => {
          const category = typeof cat === 'object' && 'slug' in cat ? cat : null
          return category?.slug?.toLowerCase() === 'wordpress'
        })

        return (
          <StaggerItem key={project.id}>
            <Link href={`/projects/${project.slug}`}>
              <ScaleOnHover>
                <Card className="h-full group overflow-hidden border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
                  {/* Thumbnail */}
                  {thumbnail?.url && (
                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                      <Image
                        src={thumbnail.url}
                        alt={thumbnail.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      />
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-yellow-500 text-yellow-950 border-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-light line-clamp-2">
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Tech Stack */}
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {techStack.slice(0, 4).map((tech, index) => {
                          const techName = typeof tech === 'object' && 'technology' in tech
                            ? tech.technology
                            : null
                          return techName ? (
                            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 border-0 font-normal text-xs">
                              {techName}
                            </Badge>
                          ) : null
                        })}
                        {techStack.length > 4 && (
                          <Badge variant="outline" className="border-gray-300 font-normal text-xs">
                            +{techStack.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Quick Links */}
                    <div className="flex gap-3 text-xs">
                      {project.liveUrl && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live</span>
                        </div>
                      )}
                      {project.githubUrl && !hasWordPressCategory && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </div>
                      )}
                    </div>
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
