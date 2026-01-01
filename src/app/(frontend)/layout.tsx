import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { BackToTop } from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Portfolio & Blog',
    template: '%s | Portfolio & Blog',
  },
  description: 'A modern portfolio and blog built with Next.js and Payload CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation - iOS Minimal Style */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <Image
                  src="/media/K.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                  priority
                />
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/blog"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/projects"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <BackToTop />

        {/* Footer - iOS Minimal Style */}
        <footer className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-8 mb-6">
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
                <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Projects
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </div>
              <p className="text-xs text-gray-400 font-light">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
