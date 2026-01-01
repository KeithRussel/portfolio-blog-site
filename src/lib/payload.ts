import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Get the Payload CMS instance for server-side data fetching
 * This uses Payload's Local API - no GraphQL, direct database access
 */
export const getPayloadClient = async () => {
  return await getPayload({ config })
}
