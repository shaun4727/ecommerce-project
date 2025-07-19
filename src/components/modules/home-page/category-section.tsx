'use client';

import React from 'react';

import {
  HardDriveIcon as Boot,
  Briefcase,
  HardHatIcon as Hat,
  PocketIcon as Jacket,
  PenIcon as Pants,
  Shirt,
  SkullIcon as Skirt,
  Watch,
} from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { IBrand } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  count?: number;
}

const categories: Category[] = [
  {
    id: 'tshirt',
    name: 'T-Shirt',
    icon: <Shirt className="h-8 w-8" />,
    href: '/category/tshirt',
    count: 245,
  },
  {
    id: 'jacket',
    name: 'Jacket',
    icon: <Jacket className="h-8 w-8" />,
    href: '/category/jacket',
    count: 128,
  },
  {
    id: 'skirt',
    name: 'Skirt',
    icon: <Skirt className="h-8 w-8" />,
    href: '/category/skirt',
    count: 89,
  },
  {
    id: 'jeans',
    name: 'Jeans',
    icon: <Pants className="h-8 w-8" />,
    href: '/category/jeans',
    count: 156,
  },
  {
    id: 'bag',
    name: 'Bag',
    icon: <Briefcase className="h-8 w-8" />,
    href: '/category/bag',
    count: 203,
  },
  {
    id: 'shoes',
    name: 'Shoes',
    icon: <Boot className="h-8 w-8" />,
    href: '/category/shoes',
    count: 312,
  },
  {
    id: 'watches',
    name: 'Watches',
    icon: <Watch className="h-8 w-8" />,
    href: '/category/watches',
    count: 67,
  },
  {
    id: 'cap',
    name: 'Cap',
    icon: <Hat className="h-8 w-8" />,
    href: '/category/cap',
    count: 94,
  },
];

export default function CategorySection({ data }: { data: IBrand[] }) {
  const router = useRouter();

  const viewBrandProduct = (category: IBrand) => {
    router.push(`/products?brands=${category._id}`);
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-6">
            {data?.map((category) => (
              <div
                onClick={() => viewBrandProduct(category)}
                key={category._id}
              >
                <CategoryCard key={category._id} category={category} />
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {data?.map((category) => (
                <div
                  key={category._id}
                  className="flex-shrink-0 cursor-pointer"
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: IBrand }) {
  return (
    <Link href={`/products`} className="group">
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white group-hover:scale-105">
        <CardContent className="p-6 text-center">
          {/* Icon Container */}
          <div className="w-24 h-24 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
            {/* <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
              {category.logo}
            </div> */}

            <Image
              src={category.logo || '/placeholder.svg'}
              alt={category.name}
              width={200}
              height={200}
              className="w-12"
            />
          </div>

          {/* Category Name */}
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
            {category.name}
          </h3>

          {/* Item Count */}
          {/* {category.createdBy && (
            <p className="text-sm text-gray-500">{category.createdBy}</p>
          )} */}
        </CardContent>
      </Card>
    </Link>
  );
}

// Alternative Compact Version
export function CompactCategorySection() {
  return (
    <div className="w-full bg-white py-8 border-y border-gray-200">
      <div className="container mx-auto px-4">
        {/* Desktop Version */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"></div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex space-x-6 pb-2" style={{ width: 'max-content' }}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group flex flex-col items-center space-y-2 p-2"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"></div>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
