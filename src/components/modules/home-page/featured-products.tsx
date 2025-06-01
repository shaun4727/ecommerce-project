'use client';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IProduct } from '@/types';
import { useRouter } from 'next/navigation';

interface ColorOption {
  name: string;
  value: string;
  image?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  colors: ColorOption[];
  category: string;
}

const newestProducts: Product[] = [
  {
    id: '1',
    name: 'Reversible Soft Duvet Cover',
    price: 26.99,
    rating: 4.5,
    reviewCount: 128,
    image: '/placeholder.svg?height=200&width=200',
    colors: [
      { name: 'Beige', value: '#F5F5DC' },
      { name: 'Light Brown', value: '#DEB887' },
      { name: 'Gray', value: '#808080' },
      { name: 'Navy', value: '#000080' },
      { name: 'Black', value: '#000000' },
    ],
    category: 'Bedding',
  },
  {
    id: '2',
    name: 'Indoor Area Rug',
    price: 34.6,
    rating: 4.8,
    reviewCount: 89,
    image: '/placeholder.svg?height=200&width=200',
    colors: [
      { name: 'Cream', value: '#F5F5DC' },
      { name: 'Brown', value: '#8B4513' },
      { name: 'Gray', value: '#696969' },
    ],
    category: 'Rugs',
  },
  {
    id: '3',
    name: 'Piece Duvet Cover Set',
    price: 134.0,
    rating: 4.7,
    reviewCount: 156,
    image: '/placeholder.svg?height=200&width=200',
    colors: [
      { name: 'Light Gray', value: '#D3D3D3' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Charcoal', value: '#36454F' },
      { name: 'Navy', value: '#000080' },
    ],
    category: 'Bedding',
  },
  {
    id: '4',
    name: 'Washable Area Rug',
    price: 43.99,
    rating: 4.6,
    reviewCount: 203,
    image: '/placeholder.svg?height=200&width=200',
    colors: [
      { name: 'Cream', value: '#F5F5DC' },
      { name: 'Beige', value: '#F5F5DC' },
      { name: 'Brown', value: '#8B4513' },
      { name: 'Gray', value: '#808080' },
    ],
    category: 'Rugs',
  },
  {
    id: '5',
    name: 'Luxury Throw Blanket',
    price: 58.99,
    rating: 4.9,
    reviewCount: 94,
    image: '/placeholder.svg?height=200&width=200',
    colors: [
      { name: 'Ivory', value: '#FFFFF0' },
      { name: 'Sage', value: '#9CAF88' },
      { name: 'Dusty Rose', value: '#DCAE96' },
      { name: 'Charcoal', value: '#36454F' },
    ],
    category: 'Throws',
  },
  {
    id: '6',
    name: 'Cotton Sheet Set',
    price: 89.99,
    rating: 4.4,
    reviewCount: 167,
    image: '/placeholder.svg?height=200&width=200',
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Cream', value: '#F5F5DC' },
      { name: 'Light Blue', value: '#ADD8E6' },
      { name: 'Sage Green', value: '#9CAF88' },
      { name: 'Gray', value: '#808080' },
    ],
    category: 'Bedding',
  },
];

function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="flex items-center space-x-1 mb-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({reviewCount})</span>
    </div>
  );
}

function ColorSwatches({
  colors,
  selectedColor,
  onColorChange,
}: {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      {colors.slice(0, 4).map((color) => (
        <button
          key={color.name}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
            selectedColor === color.value
              ? 'border-blue-500 scale-110'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          style={{ backgroundColor: color.value }}
          onClick={() => onColorChange(color.value)}
          title={color.name}
        />
      ))}
      {colors.length > 4 && (
        <span className="text-xs text-gray-500 ml-1">+{colors.length - 4}</span>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors?.[0] || ''
  );

  const router = useRouter();

  const getDetailOfSingleProduct = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white"
      onClick={getDetailOfSingleProduct}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
          <Image
            src={product.imageUrls?.[0] || '/placeholder.svg'}
            alt={`product-image`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Rating */}
          <StarRating rating={product?.ratingCount} reviewCount={0} />

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight text-sm">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Color Options */}
          {/* <ColorSwatches
            colors={product.colors}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          /> */}
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedProducts({
  trendingProducts,
}: {
  trendingProducts: IProduct[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const router = useRouter();

  const nextSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev + 1) % Math.max(1, newestProducts.length - itemsPerView + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, newestProducts.length - itemsPerView + 1)) %
        Math.max(1, newestProducts.length - itemsPerView + 1)
    );
  };

  const getAllTrending = () => {
    router.push(`/products?trending=1`);
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Our Trending Products
          </h2>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="rounded-full hover:bg-gray-100"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="rounded-full hover:bg-gray-100"
              disabled={currentIndex >= newestProducts.length - itemsPerView}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {trendingProducts?.map((product) => (
                <div key={product._id} className="w-1/4 flex-shrink-0 px-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {trendingProducts
              ?.slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={getAllTrending}
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            View All Trending
          </Button>
        </div>
      </div>
    </div>
  );
}
