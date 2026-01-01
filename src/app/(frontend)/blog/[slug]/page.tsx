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
import { Calendar, ArrowLeft, Clock } from 'lucide-react'
import type { Media, Category } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import { RelatedPosts } from '@/components/RelatedPosts'
import { FadeIn } from '@/components/animations/FadeIn'
import { ReadingProgress } from '@/components/ReadingProgress'
import { ImageZoom } from '@/components/ImageZoom'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

// Generate static params for all published posts (for build-time generation)
export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100,
  })

  return posts.map((post) => ({
    slug: post.slug,
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
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const featuredImage = post.featuredImage as { url?: string; alt?: string } | null
  const imageUrl = featuredImage?.url
  const absoluteImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
      ? `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${imageUrl}`
      : undefined

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: ['Your Name'], // TODO: Replace with your name
      url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/blog/${slug}`,
      images: absoluteImageUrl ? [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: featuredImage?.alt || post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: absoluteImageUrl ? [absoluteImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  // Fetch single blog post by slug
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
    depth: 2,
  })

  const post = docs[0]

  if (!post) {
    notFound()
  }

  const featuredImage = post.featuredImage as Media | null
  const categories = Array.isArray(post.categories) ? post.categories : []
  const tags = Array.isArray(post.tags) ? post.tags : []
  const readingTime = calculateReadingTime(post.content as any)

  // Normalize featured image URL - fix double slashes
  const featuredImageUrl = featuredImage?.url?.replace(/([^:]\/)\/+/g, '$1') || null

  // Prepare JSON-LD structured data
  const imageUrl = featuredImageUrl
  const absoluteImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
      ? `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${imageUrl}`
      : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Your Name', // TODO: Replace with your name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Name', // TODO: Replace with your name
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/logo.png`, // TODO: Add your logo
      },
    },
    keywords: tags
      .map((tagItem) => (typeof tagItem === 'object' && 'tag' in tagItem ? tagItem.tag : null))
      .filter(Boolean)
      .join(', '),
  }

  // Fetch related posts based on shared categories
  const categoryIds = categories
    .filter((cat): cat is Category => typeof cat === 'object' && cat !== null && 'id' in cat)
    .map((cat) => cat.id)

  const { docs: relatedPosts } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          id: {
            not_equals: post.id,
          },
        },
        ...(categoryIds.length > 0
          ? [
              {
                'categories.id': {
                  in: categoryIds,
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
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <FadeIn delay={0}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </FadeIn>

        {/* Article */}
        <article className="max-w-3xl mx-auto">
          {/* Featured Image with Zoom */}
          {featuredImageUrl && (
            <FadeIn delay={0.1}>
              <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-gray-100">
                <ImageZoom
                  src={featuredImageUrl}
                  alt={featuredImage?.alt || post.title}
                  width={1200}
                  height={800}
                  priority
                />
              </div>
            </FadeIn>
          )}

          {/* Post Header */}
          <FadeIn delay={0.2}>
            <header className="mb-8">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => {
                  const category = typeof cat === 'object' ? cat : null
                  return category ? (
                    <Badge key={category.id} variant="secondary" className="bg-gray-100 text-gray-700 border-0 font-normal">
                      {category.name}
                    </Badge>
                  ) : null
                })}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-gray-900">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-4 font-light">{post.excerpt}</p>

            {/* Published Date */}
            {post.publishedAt && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadingTime(readingTime)}</span>
                </div>
              </div>
            )}
            </header>
          </FadeIn>

          {/* Post Content - Lexical Rich Text */}
          <FadeIn delay={0.3}>
            <div className="prose prose-lg max-w-none mb-8 text-gray-900">
              {post.content && <RichText content={post.content as any} />}
            </div>
          </FadeIn>

          {/* Tags */}
          {tags.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tagItem, index) => {
                  const tagText = typeof tagItem === 'object' && 'tag' in tagItem ? tagItem.tag : null
                  return tagText ? (
                    <Badge key={index} variant="outline" className="border-gray-300 text-gray-700 font-normal">
                      {tagText}
                    </Badge>
                  ) : null
                })}
              </div>
              </div>
            </FadeIn>
          )}
        </article>

        {/* Related Posts */}
        <FadeIn delay={0.5}>
          <div className="max-w-6xl mx-auto">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </FadeIn>
        </div>
      </div>
    </>
  )
}
