'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IBrandWithProducts } from '@/types';
import { useRouter } from 'next/navigation';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  href: string;
  featured?: boolean;
}

const topBrands: Brand[] = [
  {
    id: '1',
    name: 'Nike',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Athletic wear and footwear',
    productCount: 1250,
    href: '/brands/nike',
    featured: true,
  },
  {
    id: '2',
    name: 'Apple',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Technology and electronics',
    productCount: 890,
    href: '/brands/apple',
    featured: true,
  },
  {
    id: '3',
    name: 'Samsung',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Electronics and appliances',
    productCount: 1450,
    href: '/brands/samsung',
  },
  {
    id: '4',
    name: 'Adidas',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Sports and lifestyle',
    productCount: 980,
    href: '/brands/adidas',
  },
  {
    id: '5',
    name: 'Sony',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Entertainment and electronics',
    productCount: 750,
    href: '/brands/sony',
    featured: true,
  },
  {
    id: '6',
    name: 'Microsoft',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Software and hardware',
    productCount: 620,
    href: '/brands/microsoft',
  },
  {
    id: '7',
    name: 'Canon',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Cameras and imaging',
    productCount: 540,
    href: '/brands/canon',
  },
  {
    id: '8',
    name: 'Dell',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Computers and technology',
    productCount: 680,
    href: '/brands/dell',
  },
  {
    id: '9',
    name: 'HP',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Computing and printing',
    productCount: 720,
    href: '/brands/hp',
  },
  {
    id: '10',
    name: 'LG',
    logo: '/placeholder.svg?height=80&width=120',
    description: 'Home appliances and electronics',
    productCount: 890,
    href: '/brands/lg',
  },
];

function BrandCard({ brand }: { brand: IBrandWithProducts }) {
  const router = useRouter();

  const getProductsWithBrand = () => {
    router.push(`/products?brands=${brand._id}`);
  };

  return (
    <Card
      onClick={getProductsWithBrand}
      className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white group-hover:scale-105"
    >
      <CardContent className="p-6 text-center h-full flex flex-col justify-between">
        {/* Brand Logo */}
        <div className="mb-4">
          <div className="w-24 h-16 mx-auto bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
            <Image
              src={brand.logo || '/placeholder.svg'}
              alt={`${brand.name} logo`}
              width={80}
              height={60}
              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* Brand Info */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {brand.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            A brand promised to provide better products
          </p>
          <div className="text-xs text-blue-600 font-medium">
            {brand.products.length} Products
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TopBrands({
  allBrands,
}: {
  allBrands: IBrandWithProducts[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 5,
  };

  const router = useRouter();

  const nextSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev + 1) % Math.max(1, topBrands.length - itemsPerView.desktop + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, topBrands.length - itemsPerView.desktop + 1)) %
        Math.max(1, topBrands.length - itemsPerView.desktop + 1)
    );
  };

  const getProductsFromBrand = (product: IBrandWithProducts) => {
    router.push(`/products?brands=${product._id}`);
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Top Brands
            </h2>
            <p className="text-gray-600">
              Discover products from the worlds leading brands
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full hover:bg-blue-50 hover:border-blue-300"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full hover:bg-blue-50 hover:border-blue-300"
              disabled={currentIndex >= topBrands.length - itemsPerView.desktop}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="relative">
          {/* Desktop Carousel */}
          <div className="hidden lg:block overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
              }}
            >
              {allBrands?.map((brand) => (
                <div key={brand._id} className="w-1/5 flex-shrink-0 px-3">
                  <BrandCard brand={brand} />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Grid */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-6">
            {allBrands?.slice(0, 6).map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {allBrands?.slice(0, 4).map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        </div>

        {/* Featured Brands Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Featured Brand Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {allBrands?.map((brand, index) => (
              <div
                key={index}
                onClick={() => getProductsFromBrand(brand)}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group-hover:scale-105"
              >
                <div className="aspect-square flex items-center justify-center">
                  <Image
                    src={brand.logo || '/placeholder.svg'}
                    alt={`${brand.name} logo`}
                    width={60}
                    height={45}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{topBrands.length}+</div>
              <div className="text-blue-100">Trusted Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {topBrands
                  .reduce((sum, brand) => sum + brand.productCount, 0)
                  .toLocaleString()}
                +
              </div>
              <div className="text-blue-100">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors duration-200"
          >
            View All Brands
          </Button>
        </div> */}
      </div>
    </div>
  );
}
