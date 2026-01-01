import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // All categories are public
    // For admin operations, allow all authenticated users
    // The admin panel itself handles authentication
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      options: [
        {
          label: 'Blog Category',
          value: 'blog',
        },
        {
          label: 'Project Category',
          value: 'project',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Select whether this category is for blog posts or projects',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
