// app/page.tsx - UPDATED VERSION WITH LARGER CIRCULAR CATEGORIES FOR DESKTOP
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Crown,
  Sparkles,
  Trophy,
  Shield,
  Truck,
  ShoppingBag,
  Package,
  Zap,
  Award,
  Star,
  TrendingUp,
  BadgeCheck,
  Gem,
  Diamond,
  Heart,
  StarIcon
} from 'lucide-react';
import { categoryApi } from './lib/api/categories';
import { productApi } from './lib/api/products';
import { sliderAPI, SliderImage } from './lib/api/slider';
import { ratingApi } from './lib/api/ratings';
import { Category } from '../types/category';
import { Product } from '../types/product';
import ProductCard from './components/shared/ProductCard';
import CustomerReviewsSlider from './components/shared/CustomerReviewsSlider';

// Skeleton Components (keep same)
const SliderSkeleton = () => (
  <div className="relative w-full aspect-[16/6] md:aspect-[21/8] lg:aspect-[24/8] bg-gradient-to-br from-yellow-50 to-amber-50 animate-pulse rounded-xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
  </div>
);

const CategoryCardSkeleton = () => (
  <div className="flex flex-col items-center group">
    <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-64 xl:w-72 xl:h-72 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-50 animate-pulse border-4 border-yellow-200 shadow-lg"></div>
    <div className="mt-6 h-6 w-32 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-lg animate-pulse"></div>
  </div>
);

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-yellow-100 p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-48 bg-gradient-to-br from-yellow-50 to-amber-50 animate-pulse rounded-xl mb-4"></div>
    <div className="h-4 bg-yellow-100 rounded-lg animate-pulse mb-2"></div>
    <div className="h-4 bg-yellow-100 rounded-lg animate-pulse w-3/4 mb-3"></div>
    <div className="h-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg animate-pulse w-1/2"></div>
  </div>
);

// Premium Slider Component (keep same)
const PremiumSlider = ({
  images,
  current,
  onNext,
  onPrev,
  onGoTo,
  isLoading
}: {
  images: SliderImage[];
  current: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <SliderSkeleton />;
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/6] md:aspect-[21/8] lg:aspect-[24/8] bg-gradient-to-br from-yellow-900 to-amber-900">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl mx-auto">
                <Diamond className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-playfair">
              Silver Shringar
            </h2>
            <p className="text-yellow-100 text-lg md:text-xl mb-8">
              Luxury Jewelry & Premium Diamonds Collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl group"
              >
                <Gem className="w-5 h-5 mr-3" />
                Explore Collections
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-[16/6] md:aspect-[21/8] lg:aspect-[24/8]">
        {images.map((image, index) => (
          <div
            key={image._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.imageUrl}
                alt={image.altText}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={75}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-transparent"></div>
            </div>

            {/* Premium Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
                <div className="max-w-xl md:max-w-2xl">
                  {image.title && (
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl animate-fadeIn font-playfair">
                      {image.title}
                    </h1>
                  )}

                  {image.subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl text-yellow-100 mb-6 md:mb-8 max-w-lg leading-relaxed drop-shadow-lg animate-fadeIn delay-100">
                      {image.subtitle}
                    </p>
                  )}

                  {image.link && (
                    <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn delay-200">
                      <Link
                        href={image.link || '#'}
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl group min-w-[180px]"
                      >
                        <Gem className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        Shop Now
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
                      </Link>
                      <Link
                        href="/categories"
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-xl hover:bg-yellow-400/10 transition-all duration-300 font-bold text-base md:text-lg min-w-[180px]"
                      >
                        <Crown className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        Collections
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Premium Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full p-3 md:p-4 hover:bg-white transition-all duration-300 z-20 group shadow-xl"
              aria-label="Previous slide"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-yellow-800 group-hover:scale-110 transition-transform rotate-180" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full p-3 md:p-4 hover:bg-white transition-all duration-300 z-20 group shadow-xl"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-yellow-800 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Premium Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 ${
                  index === current ? 'bg-yellow-400 scale-125 shadow-lg' : 'bg-yellow-300/70 hover:bg-yellow-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default function HomePage() {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);

  // Track loading states separately
  const [isSliderLoaded, setIsSliderLoaded] = useState(false);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [isProductsLoaded, setIsProductsLoaded] = useState(false);

  // Fetch data progressively
  const fetchInitialData = useCallback(async () => {
    try {
      // Step 1: Fetch slider images first
      try {
        const sliderResult = await sliderAPI.getSliderImages();
        if (sliderResult.success && sliderResult.data) {
          setSliderImages(sliderResult.data);
        }
      } catch (error) {
        console.error('Failed to load slider:', error);
      }
      setIsSliderLoaded(true);

      // Step 2: Fetch categories
      try {
        const categoriesData = await categoryApi.getAll();
        setCategories(categoriesData.filter(cat => cat.isActive));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
      setIsCategoriesLoaded(true);

      // Step 3: Fetch products in parallel
      try {
        const [featured, bestSeller, newArrival] = await Promise.all([
          productApi.getProducts({ limit: 8, isFeatured: true, isActive: true }),
          productApi.getProducts({ limit: 8, isBestSeller: true, isActive: true }),
          productApi.getProducts({ limit: 8, isActive: true, sortBy: 'createdAt', sortOrder: 'desc' })
        ]);

        // Set products directly from the API response
        setFeaturedProducts(featured.products || []);
        setBestSellerProducts(bestSeller.products || []);
        setNewArrivalProducts(newArrival.products || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
      setIsProductsLoaded(true);

    } catch (error) {
      console.error('Unexpected error:', error);
      // Still mark as loaded to show content
      setIsSliderLoaded(true);
      setIsCategoriesLoaded(true);
      setIsProductsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Handle slider auto-rotation
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (sliderImages.length <= 1 || !isSliderLoaded) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length, isSliderLoaded]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % sliderImages.length);
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, [sliderImages.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const featuredCategories = categories.filter(cat => !cat.parentId).slice(0, 8);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50/30">
      {/* IMPORTANT: Add margin-top equal to your header height */}
      <div className="mt-3 md:mt-5 lg:mt-2">
        {/* Premium Slider Section with Fade Animation */}
        <PremiumSlider
          images={sliderImages}
          current={currentSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
          onGoTo={goToSlide}
          isLoading={!isSliderLoaded}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          {/* Premium Categories Section - ENHANCED CIRCULAR DESIGN */}
          <section className="mb-16 md:mb-20 lg:mb-24">
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center justify-center mb-4 md:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl">
                    <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
                </div>
                <div className="ml-6 md:ml-8 text-left">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mr-3"></div>
                    <span className="text-yellow-600 font-bold text-sm md:text-base uppercase tracking-wider">Our Collections</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair">
                    Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">Category</span>
                  </h2>
                </div>
              </div>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Explore our premium jewelry collections curated for every occasion
              </p>
            </div>

            {!isCategoriesLoaded ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12 justify-items-center">
                {[...Array(4)].map((_, i) => (
                  <CategoryCardSkeleton key={i} />
                ))}
              </div>
            ) : featuredCategories.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-12 justify-items-center">
                {featuredCategories.map((category, index) => (
                  <div key={category._id} className="flex flex-col items-center group">
                    <Link
                      href={`/categories/${category.slug || category._id || '#'}`}
                      className="block relative w-full h-full"
                    >
                      <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 border-4 lg:border-6 border-yellow-300">
                        {category.image ? (
                          <Image
                            src={typeof category.image === 'string' ? category.image : (category.image as any).url || ''}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                            priority={index < 3}
                            quality={90}
                            loading={index < 3 ? 'eager' : 'lazy'}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-50">
                            <div className="text-center">
                              <Gem className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-400 mb-2" />
                              <span className="text-yellow-600 text-sm font-medium">Jewelry</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 rounded-full"></div>
                        
                        {/* Premium Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                          <div className="bg-yellow-600/90 backdrop-blur-sm w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <ArrowRight className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                        </div>

                        {/* Premium Badge for Featured Categories */}
                        <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                            <Star className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Premium Glow Effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 via-transparent to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                    </Link>
                    
                    {/* Category Name with Enhanced Styling */}
                    <div className="mt-8 text-center px-2">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors duration-300 font-playfair">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-[220px] xl:max-w-[250px] mx-auto line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      {/* <div className="mt-4">
                        <span className="inline-flex items-center text-yellow-600 text-sm md:text-base font-semibold group-hover:text-yellow-700 transition-colors duration-300">
                          Shop Collection
                          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-dashed border-yellow-200">
                <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <Gem className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 text-yellow-300" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-playfair">Collections Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg">
                  We're curating exclusive jewelry collections for you
                </p>
              </div>
            )}
          </section>

          {/* Featured Products (keep same) */}
          <section className="mb-16 md:mb-20 lg:mb-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
                  <span className="text-yellow-600 font-bold text-sm md:text-base uppercase tracking-wider">Featured</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">Collections</span>
                </h2>
                <p className="text-gray-600 mt-2 text-lg">Exclusive jewelry pieces for special moments</p>
              </div>
              {isProductsLoaded && featuredProducts.length > 0 && (
                <Link
                  href="/products?isFeatured=true"
                  className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 px-6 md:px-8 py-3.5 rounded-xl font-semibold text-yellow-900 transition-all duration-300 shadow-lg hover:shadow-xl group border border-yellow-200"
                >
                  View All
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {!isProductsLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.slice(0, 4).map(product => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-dashed border-yellow-200">
                <Award className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-playfair">Featured Collections Coming Soon</h3>
                <p className="text-gray-600 text-lg">Our premium selections are being curated</p>
              </div>
            )}
          </section>

          {/* Best Sellers (keep same) */}
          <section className="mb-16 md:mb-20 lg:mb-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
                  <span className="text-yellow-600 font-bold text-sm md:text-base uppercase tracking-wider">Bestsellers</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair">
                  Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">Sellers</span>
                </h2>
                <p className="text-gray-600 mt-2 text-lg">Most loved by our customers</p>
              </div>
              {isProductsLoaded && bestSellerProducts.length > 0 && (
                <Link
                  href="/products?isBestSeller=true"
                  className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 px-6 md:px-8 py-3.5 rounded-xl font-semibold text-yellow-900 transition-all duration-300 shadow-lg hover:shadow-xl group border border-yellow-200"
                >
                  View All
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {!isProductsLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : bestSellerProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {bestSellerProducts.slice(0, 4).map(product => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-dashed border-yellow-200">
                <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-playfair">Best Sellers Coming Soon</h3>
                <p className="text-gray-600 text-lg">Discover what everyone loves</p>
              </div>
            )}
          </section>

          {/* New Arrivals (keep same) */}
          <section className="mb-16 md:mb-20 lg:mb-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
                  <span className="text-yellow-600 font-bold text-sm md:text-base uppercase tracking-wider">New Arrivals</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair">
                  New <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">Arrivals</span>
                </h2>
                <p className="text-gray-600 mt-2 text-lg">Fresh additions to our collection</p>
              </div>
              {isProductsLoaded && newArrivalProducts.length > 0 && (
                <Link
                  href="/products?sort=newest"
                  className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 px-6 md:px-8 py-3.5 rounded-xl font-semibold text-yellow-900 transition-all duration-300 shadow-lg hover:shadow-xl group border border-yellow-200"
                >
                  View All
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {!isProductsLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : newArrivalProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {newArrivalProducts.slice(0, 4).map(product => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-dashed border-yellow-200">
                <Zap className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-playfair">New Arrivals Coming Soon</h3>
                <p className="text-gray-600 text-lg">Stay tuned for exciting new jewelry</p>
              </div>
            )}
          </section>

          {/* Customer Reviews Slider (keep same) */}
          <section className="mb-16 md:mb-20 lg:mb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
                    <span className="text-yellow-600 font-bold text-sm md:text-base uppercase tracking-wider">Customer Reviews</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair">
                    Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">Reviews</span>
                  </h2>
                  <p className="text-gray-600 mt-2 text-lg">Verified 4 & 5 star reviews from our customers</p>
                </div>
              </div>
            </div>
            
            <div className="w-full overflow-hidden">
              <CustomerReviewsSlider />
            </div>
          </section>

          {/* Premium Features (keep same) */}
          {(isCategoriesLoaded || isProductsLoaded) && (
            <section className="mb-12 md:mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">Free Shipping</h3>
                  <p className="text-gray-600">Free delivery on orders above ₹1999</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">BIS Hallmarked</h3>
                  <p className="text-gray-600">100% certified gold & jewelry</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">Lifetime Warranty</h3>
                  <p className="text-gray-600">Quality assurance on all products</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                    <StarIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">Premium Quality</h3>
                  <p className="text-gray-600">Curated from trusted jewelers</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </main>
  );
}