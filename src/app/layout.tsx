import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Portfolio & Blog',
    template: '%s | Portfolio & Blog',
  },
  description: 'A modern portfolio and blog built with Next.js and Payload CMS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    siteName: 'Portfolio & Blog',
    title: 'Portfolio & Blog',
    description: 'A modern portfolio and blog built with Next.js and Payload CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Blog',
    description: 'A modern portfolio and blog built with Next.js and Payload CMS',
    creator: '@yourusername', // TODO: Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
