'use client';

import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Tag,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    topText: 'SONY',
    title: 'NEW COLLECTIONS',
    subtitle: 'High-quality wireless noise-cancelling headphones.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    buttonText: 'SHOP NOW',
    buttonLink: '/products',
  },
  {
    id: 2,
    topText: 'APPLE',
    title: 'ELECTRONIC DEVICE',
    subtitle: 'Sleek and powerful smartphone with advanced camera.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    buttonText: 'SHOP NOW',
    buttonLink: '/products',
  },
  {
    id: 3,
    topText: 'NIKE',
    title: 'SUMMER SPECIALS',
    subtitle: 'Comfortable and stylish running shoes.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'SHOP NOW',
    buttonLink: '/products',
  },
];

const benefits = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: 'MONEY BACK',
    description: '30 Days Money Back Guarantee',
  },
  {
    icon: <Truck className="h-8 w-8 text-white" />,
    title: 'FREE SHIPPING',
    description: 'Shipping on orders over $99',
  },
  {
    icon: <Tag className="h-8 w-8 text-white" />,
    title: 'SPECIAL SALE',
    description: 'Extra $5 off on all items',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="w-full container mx-auto px-8 my-4 ">
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[300px] overflow-hidden bg-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentHero?.image || '/placeholder.svg'}
            alt={currentHero.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            {/* Top Text */}
            <p className="text-sm md:text-base font-medium tracking-wider mb-2 opacity-90">
              {currentHero.topText}
            </p>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-4xl font-bold mb-4 leading-tight">
              {currentHero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
              {currentHero.subtitle}
            </p>

            {/* CTA Button */}
            <Link href="/products">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-md font-semibold rounded-md transition-colors duration-200"
              >
                {currentHero.buttonText}
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-600 h-24">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-transparent border-0 shadow-none">
                <CardContent className="flex items-center space-x-4 px-6  text-white">
                  <div className="flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
