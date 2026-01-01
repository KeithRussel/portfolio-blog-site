import { Metadata } from 'next';
import { getPayloadClient } from '@/lib/payload';
import { Pagination } from '@/components/Pagination';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ProjectSearchBar } from '@/components/ProjectSearchBar';
import { ProjectCategoryFilter } from '@/components/ProjectCategoryFilter';
import type { Category } from '@/payload-types';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

const PROJECTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web development projects and case studies',
  openGraph: {
    title: 'Projects',
    description:
      'Explore my portfolio of web development projects and case studies',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/projects`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects',
    description:
      'Explore my portfolio of web development projects and case studies',
  },
};

export default async function ProjectsListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search;
  const categorySlug = params.category;
  const payload = await getPayloadClient();

  // Fetch project categories for the filter
  const { docs: allCategories } = await payload.find({
    collection: 'categories',
    where: {
      type: {
        equals: 'project',
      },
    },
    limit: 100,
    sort: 'name',
  });

  // Build where clause for searching and filtering
  const whereClause: any = {};
  const andConditions: any[] = [];

  // If category filter is active, add it to where clause
  if (categorySlug) {
    const category = allCategories.find((cat) => cat.slug === categorySlug);
    if (category) {
      andConditions.push({
        'categories.id': {
          equals: category.id,
        },
      });
    }
  }

  // If search query exists, add search conditions
  if (searchQuery && searchQuery.trim()) {
    andConditions.push({
      or: [
        {
          title: {
            contains: searchQuery,
          },
        },
        {
          shortDescription: {
            contains: searchQuery,
          },
        },
      ],
    });
  }

  // Combine conditions with AND
  if (andConditions.length > 0) {
    whereClause.and = andConditions;
  }

  // Fetch projects using Payload Local API
  // Featured projects first, then sort by publishedAt
  const { docs: projects, totalDocs } = await payload.find({
    collection: 'projects',
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    sort: '-featured,-publishedAt', // Featured first, then newest
    limit: PROJECTS_PER_PAGE,
    page: currentPage,
    depth: 2, // Include relationships (thumbnail, gallery)
  });

  const totalPages = Math.ceil(totalDocs / PROJECTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl font-semibold tracking-tight mb-4 text-gray-900">
            Projects
          </h1>
          <p className="text-lg text-gray-600 font-light">
            A collection of projects showcasing my work in web development &
            full-stack applications
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ProjectSearchBar />
        </div>

        {/* Category Filter */}
        <ProjectCategoryFilter
          categories={allCategories as Category[]}
          activeCategory={categorySlug}
        />

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchQuery
                ? `No projects found for "${searchQuery}". Try a different search term.`
                : 'No projects available yet.'}
            </p>
          </div>
        ) : (
          <>
            {/* Search Results Count */}
            {searchQuery && (
              <p className="text-sm text-gray-600 mb-4">
                Found {totalDocs} {totalDocs === 1 ? 'project' : 'projects'} for
                "{searchQuery}"
              </p>
            )}

            <ProjectsGrid
              key={`${categorySlug || 'all'}-${searchQuery || 'none'}-${currentPage}`}
              projects={projects}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/projects"
              queryParams={{
                ...(categorySlug ? { category: categorySlug } : {}),
                ...(searchQuery ? { search: searchQuery } : {}),
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
