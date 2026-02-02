// app/products/[slug]/page.tsx - UPDATED WITH GOLD/YELLOW THEME
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Tag, 
  Check, 
  Package,
  ChevronRight,
  Crown,
  Sparkles,
  Award,
  MessageCircle,
  Users,
  ThumbsUp,
  TrendingUp,
  Filter,
  ChevronDown,
  Gem,
  Diamond,
  Zap
} from 'lucide-react';
import { productApi } from '../../lib/api/products';
import { Product } from '../../../types/product';
import ProductCard from '../../components/shared/ProductCard';
import ProductImageGallery from '../../components/shared/ProductImageGallery';
import ProductActions from '../../components/shared/ProductActions';
import RatingStars from '../../components/shared/RatingStars';

// NEW: client-side share component (create this file at components/shared/ShareButtons.tsx)
import ShareButtons from '../../components/shared/ShareButtons';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productApi.getBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Silver Shringar',
      description: 'Premium jewelry and  collection',
    };
  }
  
  return {
    title: `${product.name} | Premium Jewelry | Silver Shringar`,
    description: product.shortDescription || product.description?.substring(0, 160) || '',
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description?.substring(0, 160) || '',
      images: product.images?.slice(0, 1).map(img => ({ url: img.url })) || [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // Fetch product data
  const product = await productApi.getBySlug(slug);
  
  if (!product || !product.isActive) {
    notFound();
  }

  // Fetch product rating and reviews from backend
  let productRating = null;
  let recentReviews: any[] = [];
  
  try {
    // Fetch rating summary
    const ratingResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/products/${product._id}/rating`,
      { next: { revalidate: 60 } }
    );
    
    if (ratingResponse.ok) {
      const ratingData = await ratingResponse.json();
      if (ratingData.success) {
        productRating = ratingData.data;
      }
    }

    // Fetch recent reviews (limit to 3)
    const reviewsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/products/${product._id}/reviews?page=1&limit=3&sort=recent`,
      { next: { revalidate: 60 } }
    );
    
    if (reviewsResponse.ok) {
      const reviewsData = await reviewsResponse.json();
      if (reviewsData.success) {
        recentReviews = reviewsData.data?.reviews || [];
      }
    }
  } catch (error) {
    console.error('Error fetching rating data:', error);
  }

  // Fetch related products in background
  const relatedProductsPromise = productApi.getProducts({
    categoryId: product.categoryId,
    limit: 4,
    isActive: true,
  }).catch(() => ({ products: [] }));

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price 
    ? true 
    : false;
  const discountPercent = hasDiscount && product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  // Fetch related products
  const relatedProductsData = await relatedProductsPromise;
  const relatedProducts = relatedProductsData.products.filter(p => p._id !== product._id);

  // Get rating data
  const rating = productRating?.average || product.rating?.average || 0;
  const reviewCount = productRating?.count || product.rating?.count || 0;
  
  // Calculate rating percentages
  const getRatingPercentage = (star: number) => {
    if (!productRating?.breakdown || !productRating.count) return 0;
    const count = productRating.breakdown[star] || 0;
    return Math.round((count / productRating.count) * 100);
  };

  // Get rating breakdown data
  const ratingBreakdown = productRating?.breakdown || {
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 to-yellow-50/10">
      {/* Premium Breadcrumb */}
      <div className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-yellow-900/70 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link 
              href="/" 
              className="hover:text-yellow-700 transition-colors flex items-center animate-fadeIn flex-shrink-0"
            >
              <Crown className="w-3 h-3 mr-2 text-yellow-600" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-yellow-500 flex-shrink-0" />
            <Link 
              href="/products" 
              className="hover:text-yellow-700 transition-colors animate-fadeIn delay-100 flex-shrink-0"
            >
              Products
            </Link>
            {product.category && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-yellow-500 flex-shrink-0" />
                <Link 
                  href={`/categories/${product.category.slug}`}
                  className="hover:text-yellow-700 transition-colors animate-fadeIn delay-200 flex-shrink-0"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 mx-2 text-yellow-500 flex-shrink-0" />
            <span className="text-yellow-900 font-medium truncate animate-fadeIn delay-300 flex-shrink-0">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* Image Gallery Component */}
          <ProductImageGallery 
            images={product.images || []}
            productName={product.name}
            discountPercent={discountPercent}
            isBestSeller={product.isBestSeller}
            isFeatured={product.isFeatured}
            hasDiscount={hasDiscount}
          />

          {/* Product Info */}
          <div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 p-4 sm:p-6 lg:p-8 shadow-lg shine-effect">
              {/* Category */}
              {product.category && (
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="inline-flex items-center text-yellow-700 hover:text-yellow-800 mb-3 md:mb-4 group animate-fadeIn"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-100 to-amber-100 mr-2 sm:mr-3 group-hover:from-yellow-200 group-hover:to-amber-200 transition-all duration-300 group-hover:scale-110">
                    <Tag className="w-4 h-4 text-yellow-700" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{product.category.name}</span>
                </Link>
              )}

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fadeIn delay-100 font-playfair">
                {product.name}
              </h1>

              {/* Ratings & Stock */}
              <div className="flex items-center flex-wrap gap-3 md:gap-4 mb-4 md:mb-6 animate-fadeIn delay-200">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <RatingStars rating={rating} size="md" />
                    <span className="ml-2 text-sm sm:text-base font-medium text-yellow-900">
                      {rating > 0 ? rating.toFixed(1) : 'No ratings'}
                    </span>
                  </div>
                  <Link 
                    href={`/products/${product.slug}/reviews`}
                    className="ml-3 flex items-center text-yellow-700/80 hover:text-yellow-800 transition-colors text-sm sm:text-base"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                  </Link>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs sm:text-sm ${product.stock > 0 ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'}`}>
                  <span className="font-medium">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.stock > 0 && product.stock <= 10 && (
                    <span className="ml-2">
                      (Only {product.stock} left)
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 md:mb-8 animate-fadeIn delay-300">
                <div className="flex items-center gap-3 md:gap-4 mb-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {hasDiscount && product.compareAtPrice && (
                    <>
                      <span className="text-lg sm:text-xl text-amber-700 line-through">
                        ₹{product.compareAtPrice.toLocaleString()}
                      </span>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-red-100 to-amber-100 text-red-800 font-bold rounded-full text-sm">
                        Save ₹{(product.compareAtPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-amber-700/70 text-xs sm:text-sm">Inclusive of all taxes</p>
              </div>

              {/* Key Features */}
              {product.shortDescription && (
                <div className="mb-6 md:mb-8 animate-fadeIn delay-400">
                  <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.shortDescription.split('.').filter(f => f.trim()).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">{feature.trim()}.</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="mb-6 md:mb-8 animate-fadeIn delay-500">
                <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                  <Diamond className="w-4 h-4 mr-2 text-amber-600" />
                  Description
                </h3>
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="font-semibold text-yellow-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 rounded-full text-xs sm:text-sm border border-yellow-200 animate-fadeIn hover:from-yellow-100 hover:to-amber-100 hover:text-yellow-900 hover:border-yellow-300 transition-all duration-300 cursor-pointer"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart & Actions */}
              <ProductActions product={product} />

              {/* Premium Features */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-start text-yellow-900/80 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 group hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 border border-yellow-200">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 mr-3 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Free Shipping</p>
                    <p className="text-xs sm:text-sm text-amber-700/70">Orders over ₹1999 • Delivered in 5-7 days</p>
                  </div>
                </div>
                <div className="flex items-start text-yellow-900/80 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 group hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 border border-yellow-200">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 mr-3 group-hover:scale-110 transition-transform flex-shrink-0">
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">7-Day Returns</p>
                    <p className="text-xs sm:text-sm text-amber-700/70">Easy returns & exchanges</p>
                  </div>
                </div>
              </div>

              
              {/* Share - REPLACED with real ShareButtons component */}
              {/* <div className="pt-6 md:pt-8 border-t border-gray-200"> */}
                <ShareButtons product={product as Product} />
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE RATING SUMMARY SECTION - Above Related Products */}
        <div className="mt-8 md:mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 overflow-hidden shadow-lg">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-900 flex items-center font-playfair">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center mr-3">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    Customer Ratings & Reviews
                  </h2>
                  <p className="text-amber-700/80 mt-1">
                    See what customers are saying about this jewelry piece
                  </p>
                </div>
                <Link
                  href={`/products/${product.slug}/reviews`}
                  className="text-yellow-700 hover:text-yellow-800 font-medium flex items-center group"
                >
                  View All Details
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Rating Content */}
            <div className="p-6">
              {reviewCount > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Overall Rating Box */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 text-center border border-yellow-300">
                      <div className="text-5xl font-bold text-yellow-900 mb-2">
                        {rating.toFixed(1)}
                        <span className="text-2xl text-yellow-700/70">/5</span>
                      </div>
                      <div className="flex justify-center mb-3">
                        <RatingStars rating={rating} size="lg" />
                      </div>
                      <div className="flex items-center justify-center text-yellow-800 mb-4">
                        <Users className="w-4 h-4 mr-2 text-yellow-700" />
                        <span className="font-medium">{reviewCount}</span>
                        <span className="ml-1">customer review{reviewCount !== 1 ? 's' : ''}</span>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-medium inline-block ${
                        rating >= 4.5 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300' 
                          : rating >= 4 
                          ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-300'
                          : rating >= 3
                          ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-300'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                      }`}>
                        {rating >= 4.5 ? 'Excellent' : 
                         rating >= 4 ? 'Very Good' : 
                         rating >= 3 ? 'Good' : 
                         'Average'}
                      </div>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-yellow-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
                      Rating Distribution
                    </h3>
                    <div className="space-y-4">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percentage = getRatingPercentage(star);
                        const count = ratingBreakdown[star as keyof typeof ratingBreakdown] || 0;
                        
                        return (
                          <div key={star} className="flex items-center">
                            <div className="flex items-center w-24">
                              <div className="flex items-center justify-center w-8">
                                <span className="font-medium text-yellow-900">{star}</span>
                                <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" />
                              </div>
                              <div className="ml-3 text-sm text-yellow-700/70">({count})</div>
                            </div>
                            <div className="flex-1 h-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full overflow-hidden mx-4 border border-yellow-200">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-12 text-right">
                              <span className="font-medium text-yellow-900">{percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Reviews Preview */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-yellow-900 mb-4 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-amber-600" />
                      Recent Reviews
                    </h3>
                    <div className="space-y-4">
                      {recentReviews.length > 0 ? (
                        recentReviews.slice(0, 2).map((review: any) => (
                          <div key={review._id} className="border border-yellow-200 rounded-lg p-4 bg-gradient-to-r from-yellow-50/50 to-amber-50/50 hover:border-yellow-300 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <RatingStars rating={review.rating} size="sm" />
                                <span className="ml-2 text-sm font-medium text-yellow-900">
                                  {review.rating.toFixed(1)}
                                </span>
                              </div>
                              {review.verifiedPurchase && (
                                <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-xs border border-green-300">
                                  <Package className="w-3 h-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            {review.title && (
                              <h4 className="font-medium text-yellow-900 mb-1 line-clamp-1">
                                {review.title}
                              </h4>
                            )}
                            <p className="text-yellow-800/80 text-sm mb-2 line-clamp-2">
                              {review.comment}
                            </p>
                            <div className="flex items-center justify-between text-xs text-yellow-700/70">
                              <span className="font-medium">{review.userName || 'Anonymous'}</span>
                              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-yellow-700/70">
                          <MessageCircle className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                          <p>No reviews yet</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Helpful Stats */}
                    {recentReviews.length > 0 && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center text-yellow-800">
                          <ThumbsUp className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-sm">
                            <span className="font-medium">{(recentReviews as any[]).reduce((sum, r) => sum + (r.helpfulCount || 0), 0)}</span> helpful votes
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-300">
                    <Star className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900 mb-2 font-playfair">No Reviews Yet</h3>
                  <p className="text-amber-700/80 mb-6 max-w-md mx-auto">
                    Be the first to share your thoughts about this jewelry piece!
                  </p>
                  <Link
                    href={`/products/${product.slug}/reviews`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-lg hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Write the First Review
                  </Link>
                </div>
              )}

              {/* Quick Stats */}
              {reviewCount > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-amber-700/80">Average Rating</p>
                        <p className="text-2xl font-bold text-yellow-900">{rating.toFixed(1)}/5</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-amber-700/80">Total Reviews</p>
                        <p className="text-2xl font-bold text-yellow-900">{reviewCount}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-amber-700/80">5-Star Reviews</p>
                        <p className="text-2xl font-bold text-yellow-900">{ratingBreakdown[5] || 0}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center ml-[-2px]">
                            <Star className="w-2 h-2 text-white fill-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-amber-700/80">Verified Purchases</p>
                        <p className="text-2xl font-bold text-yellow-900">
                          {recentReviews.filter((r: any) => r.verifiedPurchase).length}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <Link
                  href={`/products/${product.slug}/reviews`}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {reviewCount > 0 ? 'Read All Reviews' : 'Write Your Review'}
                  <ChevronDown className="w-5 h-5 ml-2 transform group-hover:rotate-180 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 md:mt-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-900 font-playfair">
                  Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Products</span>
                </h2>
                <p className="text-amber-700/80 mt-1 text-sm sm:text-base">You might also like</p>
              </div>
              <Link 
                href={`/categories/${product.category?.slug || 'all'}`}
                className="text-yellow-700 hover:text-yellow-800 font-medium flex items-center group text-sm sm:text-base"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
                <div key={relatedProduct._id}>
                  <ProductCard
                    product={relatedProduct}
                    priority={index < 4}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}