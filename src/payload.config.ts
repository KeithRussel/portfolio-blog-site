import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  HTMLConverterFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineCodeFeature,
  BlockquoteFeature,
} from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import collections
import { Users } from './payload/collections/Users'
import { BlogPosts } from './payload/collections/BlogPosts'
import { Projects } from './payload/collections/Projects'
import { Media } from './payload/collections/Media'
import { Categories } from './payload/collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const importMap = {
  baseDir: path.resolve(dirname),
}

export default buildConfig({
  admin: {
    user: 'users',
    importMap,
    disable: false, // Keep admin enabled
  },
  csrf: [
    // Allow requests from your production domain
    'https://keithrussel.vercel.app',
    // Allow localhost for development
    'http://localhost:3000',
  ],
  collections: [Users, BlogPosts, Projects, Media, Categories],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HTMLConverterFeature({}),
      BlocksFeature({
        blocks: [
          {
            slug: 'codeBlock',
            fields: [
              {
                name: 'code',
                type: 'code',
                label: 'Code',
                admin: {
                  language: 'javascript',
                },
                required: true,
              },
              {
                name: 'language',
                type: 'select',
                label: 'Language',
                defaultValue: 'javascript',
                options: [
                  { label: 'JavaScript', value: 'javascript' },
                  { label: 'TypeScript', value: 'typescript' },
                  { label: 'CSS', value: 'css' },
                  { label: 'HTML', value: 'html' },
                  { label: 'Python', value: 'python' },
                  { label: 'JSON', value: 'json' },
                ],
              },
            ],
          },
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN, // Only enable if token exists
      collections: {
        media: true, // Enable for media collection
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
