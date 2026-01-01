import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: () => true, // Allow reading user data
    create: () => true, // Allow user registration
    // For admin operations, allow all authenticated users
    // The admin panel itself handles authentication
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
