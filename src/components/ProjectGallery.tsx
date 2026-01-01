'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageLightbox } from './ImageLightbox'
import { Maximize2 } from 'lucide-react'

interface GalleryImage {
  url: string
  alt: string
}

interface ProjectGalleryProps {
  images: GalleryImage[]
  projectTitle: string
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.url}
              alt={image.alt || `${projectTitle} gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
              loading="lazy"
            />
            {/* Zoom Icon Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Maximize2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
