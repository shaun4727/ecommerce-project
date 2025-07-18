'use client';

import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IProduct } from '@/types';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  currency: string;
  sold: number;
  total: number;
  discount: number;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: "EliteShield Performance Men's Jackets",
    image: '/placeholder.svg?height=200&width=200',
    currentPrice: 255000,
    originalPrice: 365000,
    currency: 'Rp',
    sold: 6,
    total: 10,
    discount: 30,
  },
  {
    id: '2',
    name: "Gentlemen's Summer Gray Hat - Premium Blend",
    image: '/placeholder.svg?height=200&width=200',
    currentPrice: 99000,
    originalPrice: 140000,
    currency: 'Rp',
    sold: 8,
    total: 10,
    discount: 29,
  },
  {
    id: '3',
    name: 'OptiZoom Camera Shoulder Bag',
    image: '/placeholder.svg?height=200&width=200',
    currentPrice: 250000,
    originalPrice: 365000,
    currency: 'Rp',
    sold: 4,
    total: 10,
    discount: 32,
  },
  {
    id: '4',
    name: 'Cloudy Chic - Grey Peep Toe Heeled Sandals',
    image: '/placeholder.svg?height=200&width=200',
    currentPrice: 270000,
    originalPrice: 385000,
    currency: 'Rp',
    sold: 7,
    total: 10,
    discount: 30,
  },
  {
    id: '5',
    name: 'Premium Wireless Headphones',
    image: '/placeholder.svg?height=200&width=200',
    currentPrice: 180000,
    originalPrice: 250000,
    currency: 'Rp',
    sold: 5,
    total: 10,
    discount: 28,
  },
  {
    id: '6',
    name: 'Smart Fitness Watch',
    image: '/placeholder.svg?height=200&width=200',
    currentPrice: 320000,
    originalPrice: 450000,
    currency: 'Rp',
    sold: 9,
    total: 10,
    discount: 29,
  },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 7,
    seconds: 2,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
        {timeLeft.hours.toString().padStart(2, '0')}
      </div>
      <span className="text-gray-600">:</span>
      <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
        {timeLeft.minutes.toString().padStart(2, '0')}
      </div>
      <span className="text-gray-600">:</span>
      <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
        {timeLeft.seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const progressPercentage = 25;
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const getProductDetail = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white"
      onClick={getProductDetail}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          <Image
            src={product?.imageUrls?.[0] || '/placeholder.svg'}
            alt={product?.name || 'product-img'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white">
            -35%
          </Badge>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg font-bold text-blue-600">
                BDT
                {formatPrice(product.offerPrice)}
              </span>
            </div>
            <span className="text-sm text-gray-500 line-through">
              BDT
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <Progress value={progressPercentage} className="h-2 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </Progress>
          </div>

          {/* Sale Progress */}
          <p className="text-sm text-gray-600">30 Sale</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FlashSale({
  flashSaleProducts,
}: {
  flashSaleProducts: IProduct[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const router = useRouter();

  const nextSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev + 1) % Math.max(1, featuredProducts.length - itemsPerView + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, featuredProducts.length - itemsPerView + 1)) %
        Math.max(1, featuredProducts.length - itemsPerView + 1)
    );
  };

  const viewAllFlashSaleItem = () => {
    router.push(`/products?flashSale=1`);
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Flash Sale</h2>
            </div>
            <CountdownTimer />
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
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
              {flashSaleProducts?.map((product) => (
                <div key={product._id} className="w-1/4 flex-shrink-0 px-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Scroll */}
          <div className="md:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {flashSaleProducts?.map((product) => (
                <div key={product._id} className="w-64 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={viewAllFlashSaleItem}
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            View All Flash Sale Items
          </Button>
        </div>
      </div>
    </div>
  );
}
