import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import type { Media } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { RelatedProjects } from '@/components/RelatedProjects'
import { FadeIn } from '@/components/animations/FadeIn'
import { ScaleOnHover } from '@/components/animations/ScaleOnHover'
import { ProjectGallery } from '@/components/ProjectGallery'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

// Generate static params for all projects (for build-time generation)
export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const thumbnail = project.thumbnail as { url?: string; alt?: string } | null
  const imageUrl = thumbnail?.url
  const absoluteImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
      ? `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${imageUrl}`
      : undefined

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/projects/${slug}`,
      images: absoluteImageUrl ? [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: thumbnail?.alt || project.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.shortDescription,
      images: absoluteImageUrl ? [absoluteImageUrl] : undefined,
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  // Fetch single project by slug
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  const project = docs[0]

  if (!project) {
    notFound()
  }

  const thumbnail = project.thumbnail as Media | null
  const gallery = Array.isArray(project.gallery) ? project.gallery : []
  const techStack = Array.isArray(project.techStack) ? project.techStack : []
  const categories = Array.isArray(project.categories) ? project.categories : []

  // Normalize thumbnail URL - fix double slashes
  const thumbnailUrl = thumbnail?.url?.replace(/([^:]\/)\/+/g, '$1') || null

  // Check if project has "wordpress" category
  const hasWordPressCategory = categories.some((cat) => {
    const category = typeof cat === 'object' && 'slug' in cat ? cat : null
    return category?.slug?.toLowerCase() === 'wordpress'
  })

  // Fetch related projects based on shared tech stack
  const techNames = techStack
    .filter((tech): tech is { technology: string } => typeof tech === 'object' && 'technology' in tech)
    .map((tech) => tech.technology)

  const { docs: relatedProjects } = await payload.find({
    collection: 'projects',
    where: {
      and: [
        {
          id: {
            not_equals: project.id,
          },
        },
        ...(techNames.length > 0
          ? [
              {
                'techStack.technology': {
                  in: techNames,
                },
              },
            ]
          : []),
      ],
    },
    limit: 3,
    sort: '-publishedAt',
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <FadeIn delay={0}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </FadeIn>

        {/* Project Detail */}
        <div className="max-w-4xl mx-auto">
          {/* Thumbnail */}
          {thumbnailUrl && (
            <FadeIn delay={0.1}>
              <div className="relative w-full h-125 rounded-lg overflow-hidden mb-8 bg-gray-100">
                <Image
                  src={thumbnailUrl}
                  alt={thumbnail?.alt || project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </FadeIn>
          )}

          {/* Project Header */}
          <FadeIn delay={0.2}>
            <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-gray-900">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-light">
              {project.shortDescription}
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap gap-4 mb-6">
              {project.liveUrl && (
                <ScaleOnHover scale={1.05}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Site
                  </a>
                </ScaleOnHover>
              )}
              {project.githubUrl && !hasWordPressCategory && (
                <ScaleOnHover scale={1.05}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </a>
                </ScaleOnHover>
              )}
            </div>

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {techStack.map((tech, index) => {
                    const techName = typeof tech === 'object' && 'technology' in tech
                      ? tech.technology
                      : null
                    return techName ? (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 border-0 font-normal">
                        {techName}
                      </Badge>
                    ) : null
                  })}
                </div>
              </div>
            )}
            </header>
          </FadeIn>

          {/* Case Study Content */}
          {project.caseStudy && (
            <FadeIn delay={0.3}>
              <div className="prose prose-lg max-w-none mb-12 text-gray-900">
                <RichText content={project.caseStudy as any} />
              </div>
            </FadeIn>
          )}

          {/* Project Gallery */}
          {gallery.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Gallery</h2>
                <ProjectGallery
                  images={gallery
                    .map((item) => {
                      const image = typeof item === 'object' && 'image' in item
                        ? (item.image as Media | null)
                        : null
                      // Normalize gallery image URL - fix double slashes
                      const imageUrl = image?.url?.replace(/([^:]\/)\/+/g, '$1')
                      return imageUrl
                        ? {
                            url: imageUrl,
                            alt: image?.alt || `${project.title} gallery image`,
                          }
                        : null
                    })
                    .filter((img): img is { url: string; alt: string } => img !== null)}
                  projectTitle={project.title}
                />
              </div>
            </FadeIn>
          )}
        </div>

        {/* Related Projects */}
        <FadeIn delay={0.5}>
          <div className="max-w-6xl mx-auto">
            <RelatedProjects projects={relatedProjects} />
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
