'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function ImageZoom({ src, alt, width, height, className = '', priority = false }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setIsOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      {/* Clickable Image */}
      <div
        className={`relative w-full h-full group cursor-zoom-in ${className}`}
        onClick={handleOpen}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 768px"
          unoptimized
        />

        {/* Zoom indicator overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
            <ZoomIn className="w-6 h-6 text-gray-900" />
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-[101] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Zoomed Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width || 1200}
              height={height || 800}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Click anywhere to close hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            Click anywhere to close
          </div>
        </div>
      )}
    </>
  )
}
