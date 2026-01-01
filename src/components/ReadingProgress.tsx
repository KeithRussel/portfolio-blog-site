'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Get the total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

      // Get current scroll position
      const scrolled = window.scrollY

      // Calculate progress percentage
      const progressPercentage = (scrolled / scrollHeight) * 100

      setProgress(progressPercentage)
    }

    // Update on scroll
    window.addEventListener('scroll', updateProgress)

    // Update on resize (content height might change)
    window.addEventListener('resize', updateProgress)

    // Initial update
    updateProgress()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
