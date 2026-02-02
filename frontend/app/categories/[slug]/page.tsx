import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronRight, 
  Crown,
  Sparkles,
  Search,
  X,
  ArrowRight,
  Package,
  Filter
} from 'lucide-react';
import { categoryApi } from '../../lib/api/categories';
import { productApi } from '../../lib/api/products';
import CategoryCard from '../../components/shared/CategoryCard';
import ProductCard from '../../components/shared/ProductCard';
import SortSelect from '../../components/shared/SortSelect';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    search?: string;
  }>;
}

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await categoryApi.getBySlug(slug);
  
  return {
    title: `${category?.name || 'Premium Categories'} | Silver Shringar `,
    description: category?.description || `Explore premium ${category?.name || 'jewelry'} Categories`,
  };
}

function MobileFilterButton() {
  return (
    <button className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg text-yellow-900 font-medium text-sm w-full hover:from-yellow-100 hover:to-amber-100 transition-all duration-300">
      <Filter className="w-4 h-4" />
      Filters
    </button>
  );
}

async function ProductsContent({ 
  categoryId,
  categoryName,
  page,
  sortBy,
  searchQuery,
  slug
}: { 
  categoryId: string;
  categoryName: string;
  page: number;
  sortBy: string;
  searchQuery: string;
  slug: string;
}) {
  // Fix sorting logic
  let apiSortBy = 'createdAt';
  let apiSortOrder: 'asc' | 'desc' = 'desc';
  
  switch (sortBy) {
    case 'createdAt':
      apiSortBy = 'createdAt';
      apiSortOrder = 'desc'; // Newest first = descending
      break;
    case 'price':
      apiSortBy = 'price';
      apiSortOrder = 'asc';
      break;
    case 'price-desc':
      apiSortBy = 'price';
      apiSortOrder = 'desc';
      break;
    case 'name':
      apiSortBy = 'name';
      apiSortOrder = 'asc';
      break;
    case 'name-desc':
      apiSortBy = 'name';
      apiSortOrder = 'desc';
      break;
    default:
      apiSortBy = 'createdAt';
      apiSortOrder = 'desc';
  }

  const productsData = await productApi.getProducts({
    page,
    limit: 12,
    categoryId,
    isActive: true,
    sortBy: apiSortBy,
    sortOrder: apiSortOrder,
    search: searchQuery,
  }).catch(() => ({ products: [], total: 0, totalPages: 0 }));

  if (!productsData || (productsData.products || []).length === 0) {
    return (
      <div className="text-center py-12 md:py-16">
        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 md:w-10 md:h-10 text-yellow-300" />
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 font-playfair">
          {searchQuery ? 'No Products Found' : 'No Products Available'}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {searchQuery 
            ? `No products matching "${searchQuery}" in ${categoryName}`
            : `No products available in ${categoryName} yet.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {searchQuery && (
            <Link
              href={`/categories/${slug}`}
              className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-900 rounded-lg hover:from-yellow-100 hover:to-amber-100 transition-colors font-medium text-sm border border-yellow-200"
            >
              Clear Search
            </Link>
          )}
          <Link
            href="/products"
            className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-colors font-medium text-sm shadow-lg hover:shadow-xl"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  // ensure array existence
  const products = productsData.products ?? [];

  return (
    <>
      {/* Products Grid - Using ProductCard for both mobile and desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product._id} className="transform hover:-translate-y-1 transition-transform duration-300">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {productsData.totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap items-center gap-2">
            {page > 1 && (
              <Link
                href={`/categories/${slug}?${new URLSearchParams({
                  page: (page - 1).toString(),
                  ...(sortBy !== 'createdAt' && { sort: sortBy }),
                  ...(searchQuery && { search: searchQuery }),
                }).toString()}`}
                className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-900 rounded-lg hover:from-yellow-100 hover:to-amber-100 transition-colors flex items-center text-sm border border-yellow-200 shadow-sm"
              >
                ← Previous
              </Link>
            )}
            
            {Array.from({ length: Math.min(5, productsData.totalPages) }, (_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === page;
              
              return (
                <Link
                  key={pageNum}
                  href={`/categories/${slug}?${new URLSearchParams({
                    ...(pageNum > 1 && { page: pageNum.toString() }),
                    ...(sortBy !== 'createdAt' && { sort: sortBy }),
                    ...(searchQuery && { search: searchQuery }),
                  }).toString()}`}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-md'
                      : 'bg-white border border-yellow-200 text-yellow-900 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
            
            {page < productsData.totalPages && (
              <Link
                href={`/categories/${slug}?${new URLSearchParams({
                  page: (page + 1).toString(),
                  ...(sortBy !== 'createdAt' && { sort: sortBy }),
                  ...(searchQuery && { search: searchQuery }),
                }).toString()}`}
                className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-900 rounded-lg hover:from-yellow-100 hover:to-amber-100 transition-colors flex items-center text-sm border border-yellow-200 shadow-sm"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  const category = await categoryApi.getBySlug(slug);
  
  if (!category || !category.isActive) {
    notFound();
  }

  const page = parseInt(resolvedSearchParams.page || '1');
  const sortBy = resolvedSearchParams.sort || 'createdAt';
  const searchQuery = resolvedSearchParams.search || '';

  const categories = await categoryApi.getAll();
  
  const parentCategory = category.parentId 
    ? categories.find(cat => cat._id === category.parentId)
    : null;

  const subcategories = categories.filter(cat => 
    cat.isActive && cat.parentId === category._id
  );

  const relatedCategories = category.parentId 
    ? categories.filter(cat => 
        cat.isActive && cat.parentId === category.parentId && cat._id !== category._id
      )
    : [];

  // Get at least one product to show product count / heading
  const productsData = await productApi.getProducts({
    page: 1,
    limit: 1,
    categoryId: category._id,
    isActive: true,
  }).catch(() => ({ total: 0 }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50/30">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8 md:pb-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center shadow-xl">
                <Crown className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-playfair">
                {category.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">Categories</span>
              </h1>
              {category.description && (
                <p className="text-gray-600 text-sm md:text-base mt-1 max-w-2xl">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="bg-gradient-to-r from-yellow-50/50 to-yellow-50/30 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <nav className="flex items-center text-sm text-gray-600 overflow-x-auto">
            <Link href="/" className="hover:text-yellow-700 transition-colors flex items-center whitespace-nowrap">
              <Crown className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
            <Link href="/categories" className="hover:text-yellow-700 transition-colors whitespace-nowrap">
              Categories
            </Link>
            {parentCategory && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
                <Link 
                  href={`/categories/${parentCategory.slug}`}
                  className="hover:text-yellow-700 transition-colors whitespace-nowrap"
                >
                  {parentCategory.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate">
              {category.name}
            </span>
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Subcategories */}
        {subcategories.length > 0 && (
          <section className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 font-playfair">
                  Subcategories
                </h2>
                <p className="text-gray-600 text-sm">
                  Explore related Categories
                </p>
              </div>
              <div className="text-sm text-yellow-600 font-medium">
                {subcategories.length} subcategories
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {subcategories.map((subcategory, index) => (
                <CategoryCard 
                  key={subcategory._id ?? subcategory.slug} 
                  category={subcategory} 
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* PRODUCTS SECTION */}
        <section className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 font-playfair">
                Products in {category.name}
              </h2>
              <p className="text-gray-600 text-sm">
                Showing {productsData.total ?? 0} premium products
              </p>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-4">
              <form action={`/categories/${slug}`} method="GET" className="relative">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-48 md:w-64 text-sm bg-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400" />
                {searchQuery && (
                  <Link 
                    href={`/categories/${slug}`}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-yellow-400 hover:text-yellow-600" />
                  </Link>
                )}
              </form>

              <SortSelect 
                currentSort={sortBy}
                categorySlug={slug}
              />
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden w-full">
              <div className="flex flex-col gap-3">
                {/* Search and Sort Container for Mobile */}
                <div className="flex flex-col xs:flex-row gap-3 w-full">
                  {/* Search for Mobile */}
                  <div className="relative flex-1">
                    <form action={`/categories/${slug}`} method="GET" className="w-full">
                      <input
                        type="text"
                        name="search"
                        defaultValue={searchQuery}
                        placeholder="Search products..."
                        className="pl-10 pr-8 py-2.5 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full text-sm bg-white"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400" />
                      {searchQuery && (
                        <Link 
                          href={`/categories/${slug}`}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <X className="w-4 h-4 text-yellow-400 hover:text-yellow-600" />
                        </Link>
                      )}
                    </form>
                  </div>

                  {/* Sort for Mobile */}
                  <div className="w-full xs:w-auto">
                    <SortSelect 
                      currentSort={sortBy}
                      categorySlug={slug}
                    />
                  </div>
                </div>

                {/* Mobile Filter Button */}
                <MobileFilterButton />
              </div>
            </div>
          </div>

          {/* PRODUCTS DISPLAY */}
          <ProductsContent 
            categoryId={category._id}
            categoryName={category.name}
            page={page}
            sortBy={sortBy}
            searchQuery={searchQuery}
            slug={slug}
          />
        </section>

        {/* RELATED CATEGORIES */}
        {relatedCategories.length > 0 && (
          <section className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 font-playfair">
                  Related Collections
                </h2>
                <p className="text-gray-600 text-sm">
                  Explore other collections in the same category
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedCategories.map((sibling, index) => (
                <CategoryCard 
                  key={sibling._id ?? sibling.slug} 
                  category={sibling} 
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* PREMIUM CTA */}
        <section>
          <div className="bg-gradient-to-r from-yellow-900 to-amber-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 font-playfair">
              Need More Options?
            </h2>
            <p className="text-yellow-100 text-sm md:text-base mb-6 max-w-2xl mx-auto">
              Explore our complete collection of premium jewelry and diamonds
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                Shop All Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-medium rounded-lg hover:bg-yellow-400/10 transition-all duration-300"
              >
                All Categories
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}