// app/components/products/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingBag, Sparkles, Award, Check, MessageCircle, Crown, Gem } from 'lucide-react';
import { Product } from '../../../types/product';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../components/contexts/AuthContext';
import RatingStars from './RatingStars';
import { ratingApi } from '../../lib/api/ratings';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [ratingState, setRatingState] = useState<number>(product?.rating?.average ?? 0);
  const [reviewCountState, setReviewCountState] = useState<number>(product?.rating?.count ?? 0);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user, loginRequired } = useAuth();

  const parseCompareAt = (val: any): number | null => {
    if (val === undefined || val === null) return null;
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
  };

  const compareAt = parseCompareAt(product.compareAtPrice);
  const hasValidDiscount =
    compareAt !== null && compareAt > 0 && compareAt > (product.price ?? 0);

  const discountPercent = hasValidDiscount
    ? Math.round(((compareAt! - (product.price ?? 0)) / compareAt!) * 100)
    : null;

  // Sync wishlist state
  useEffect(() => {
    if (product._id && user) {
      setIsWishlisted(isInWishlist(product._id));
    } else {
      setIsWishlisted(false);
    }
  }, [product._id, isInWishlist, user]);

  // Fetch rating if needed
  useEffect(() => {
    let mounted = true;

    const applyFromProduct = () => {
      if (product?.rating) {
        const avg = Number(product.rating.average ?? 0) || 0;
        const cnt = Number(product.rating.count ?? 0) || 0;
        if (mounted) {
          setRatingState(avg);
          setReviewCountState(cnt);
        }
      }
    };

    applyFromProduct();

    const needFetch =
      (product?.rating?.average === undefined || product?.rating?.count === undefined) &&
      (product._id || (product as any).id);

    if (needFetch) {
      const productId = product._id || (product as any).id;
      if (productId) {
        ratingApi.getProductRating(productId).then((res) => {
          if (!mounted) return;
          if (res && typeof res === 'object') {
            const avg = Number(res.average ?? 0) || 0;
            const cnt = Number(res.count ?? 0) || 0;
            setRatingState(avg);
            setReviewCountState(cnt);
          }
        }).catch((err) => {
          console.error('ProductCard: failed to fetch rating', err);
        });
      }
    }

    return () => {
      mounted = false;
    };
  }, [product]);

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const getProductSlug = (): string => {
    if (!product) return '#';

    const slug = product.slug;
    if (typeof slug === 'string' && slug.trim() !== '') {
      return slug;
    }

    const productId = (product as any)._id || (product as any).id;
    if (typeof productId === 'string' && productId.trim() !== '') {
      return productId;
    }

    return '#';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('button') || target.closest('a[href]')) {
      return;
    }

    setIsClicked(true);

    const card = cardRef.current;
    if (card) {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.3);
        transform: scale(0);
        animation: ripple 600ms linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1;
      `;

      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }

    const productSlug = getProductSlug();
    if (productSlug !== '#') {
      window.location.href = `/products/${productSlug}`;
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      loginRequired();
      return;
    }

    addToCart(product, 1);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      loginRequired();
      return;
    }

    if (!product._id) return;

    if (isWishlisted) {
      removeFromWishlist(product._id);
      setIsWishlisted(false);
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
    }
  };

  const productSlug = getProductSlug();
  const formatPrice = (n?: number | null) =>
    n === undefined || n === null ? '' : `₹${n.toLocaleString()}`;

  const rating = ratingState ?? 0;
  const reviewCount = reviewCountState ?? 0;

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-amber-50/50 to-yellow-50/30 rounded-xl border border-amber-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer backdrop-blur-sm ${
        isClicked ? 'scale-95 shadow-2xl' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Gold theme decorative border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-amber-300/50 transition-colors duration-300 rounded-xl pointer-events-none"></div>
      
      {/* Image Container */}
      <div className="relative w-full pt-[100%] overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-100">
        {primaryImage ? (
          <>
            {/* Skeleton */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-yellow-200 animate-pulse"></div>
            </div>

            {/* Actual Image */}
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              quality={75}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-amber-400" />
          </div>
        )}

        {/* Badges - Gold Theme */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {hasValidDiscount && discountPercent && discountPercent > 0 && (
            <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg shadow-lg border border-amber-400/30">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-yellow-600 to-amber-700 text-white rounded-lg shadow-lg border border-yellow-400/30 flex items-center">
              <Crown className="w-2 h-2 md:w-3 md:h-3 mr-1" />
              <span className="hidden xs:inline">Best</span>
              <span className="xs:hidden text-[8px]">Best</span>
            </span>
          )}
          {product.isFeatured && (
            <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg shadow-lg border border-amber-300/30 flex items-center">
              <Sparkles className="w-2 h-2 md:w-3 md:h-3 mr-1" />
              <span className="hidden xs:inline">Feat.</span>
              <span className="xs:hidden text-[8px]">Feat</span>
            </span>
          )}
          {rating >= 4.5 && reviewCount >= 10 && (
            <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-yellow-700 to-amber-800 text-white rounded-lg shadow-lg border border-amber-500/30 flex items-center">
              <Gem className="w-2 h-2 md:w-3 md:h-3 mr-1" />
              <span className="hidden xs:inline">Premium</span>
              <span className="xs:hidden text-[8px]">Prem</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-1 md:p-1.5 lg:p-2.5 bg-gradient-to-br from-white/90 to-amber-50/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-br hover:from-white hover:to-amber-100 transition-all duration-300 z-10 hover:scale-110 active:scale-95 border border-amber-200/50"
        >
          <Heart
            className={`w-3 h-3 md:w-4 md:h-4 transition-all duration-300 ${
              isWishlisted 
                ? 'text-amber-600 fill-amber-600 scale-110' 
                : 'text-amber-700 hover:text-amber-600'
            }`}
          />
        </button>

        {/* Gold overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/0 via-transparent to-transparent group-hover:from-amber-500/5 group-hover:via-amber-500/0 transition-all duration-500 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="p-2 md:p-3 lg:p-4 bg-gradient-to-b from-white/90 to-amber-50/50">
        {/* Category - Hide on smallest screens */}
        {product.category && (
          <Link
            href={`/categories/${product.category.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] xs:text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors line-clamp-1 hidden xs:block"
          >
            {product.category.name}
          </Link>
        )}

        {/* Title */}
        {productSlug !== '#' ? (
          <Link href={`/products/${productSlug}`} className="block">
            <h3 className="font-semibold text-gray-900 mt-0 xs:mt-1 hover:text-amber-700 transition-colors line-clamp-2 text-xs xs:text-sm md:text-base min-h-[32px] xs:min-h-[40px] cursor-pointer">
              {product.name}
            </h3>
          </Link>
        ) : (
          <h3 className="font-semibold text-gray-900 mt-0 xs:mt-1 line-clamp-2 text-xs xs:text-sm md:text-base min-h-[32px] xs:min-h-[40px]">
            {product.name}
          </h3>
        )}

        {/* Rating - Compact on mobile */}
        <div className="flex items-center mt-1 xs:mt-2">
          {rating > 0 ? (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <RatingStars rating={rating} size="sm" />
                <span className="ml-1 text-[10px] xs:text-xs md:text-sm font-medium text-amber-700">
                  {rating.toFixed(1)}
                </span>
              </div>
              {reviewCount > 0 && (
                <div className="flex items-center ml-1">
                  <MessageCircle className="w-2 h-2 xs:w-3 xs:h-3 md:w-4 md:h-4 text-amber-500 mr-0.5" />
                  <span className="text-[9px] xs:text-xs text-amber-600">
                    ({reviewCount})
                  </span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-[10px] xs:text-xs text-amber-500">No ratings yet</span>
          )}
        </div>

        {/* Price & Add to Cart - Optimized for mobile */}
        <div className="mt-1 xs:mt-2 md:mt-3 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-0">
          {/* Price Section */}
          <div className="flex items-baseline gap-1">
            <span className="text-sm xs:text-base md:text-lg font-bold text-amber-800">
              {formatPrice(product.price)}
            </span>
            {hasValidDiscount && (
              <>
                <span className="text-[10px] xs:text-xs text-amber-600/70 line-through hidden xs:block">
                  {formatPrice(compareAt)}
                </span>
                <span className="text-[10px] text-amber-600/70 line-through xs:hidden">
                  {formatPrice(compareAt)}
                </span>
              </>
            )}
          </div>

          {/* Add to Cart Button - Responsive */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`
              px-2 py-1.5 
              xs:px-3 xs:py-2 
              md:px-4 md:py-2 
              text-[10px] xs:text-xs md:text-sm 
              font-medium 
              rounded-lg 
              transition-all duration-300 
              whitespace-nowrap 
              disabled:opacity-50 disabled:cursor-not-allowed 
              flex items-center justify-center 
              border border-amber-500/30
              ${isAdded 
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg' 
                : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-md hover:shadow-lg'
              }
            `}
          >
            {isAdded ? (
              <>
                <Check className="w-2 h-2 xs:w-3 xs:h-3 md:w-4 md:h-4 mr-1 animate-bounce" />
                <span className="hidden xs:inline">Added!</span>
                <span className="xs:hidden">Done</span>
              </>
            ) : product.stock === 0 ? (
              <>
                <span className="hidden xs:inline">Out of Stock</span>
                <span className="xs:hidden">Out</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-2 h-2 xs:w-3 xs:h-3 md:w-4 md:h-4 mr-1" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>

        {/* Stock Status - Compact on mobile */}
        <div className="mt-1 xs:mt-2 flex items-center">
          {product.stock > 10 ? (
            <span className="text-[9px] xs:text-xs text-emerald-600 flex items-center">
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full mr-1"></div>
              <span className="hidden xs:inline">In Stock</span>
              <span className="xs:hidden">In Stock</span>
            </span>
          ) : product.stock > 0 ? (
            <span className="text-[9px] xs:text-xs text-amber-600 flex items-center">
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-amber-500 rounded-full mr-1 animate-pulse"></div>
              <span className="hidden xs:inline">Only {product.stock} left</span>
              <span className="xs:hidden">{product.stock} left</span>
            </span>
          ) : (
            <span className="text-[9px] xs:text-xs text-rose-600 flex items-center">
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-rose-500 rounded-full mr-1"></div>
              <span className="hidden xs:inline">Out of Stock</span>
              <span className="xs:hidden">Out</span>
            </span>
          )}
        </div>
      </div>

      {/* Click Animation Overlay */}
      {isClicked && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-400/10 rounded-xl pointer-events-none"></div>
      )}

      {/* Premium border effect on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300/20 rounded-xl transition-all duration-300 pointer-events-none"></div>

      {/* CSS for ripple animation */}
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}