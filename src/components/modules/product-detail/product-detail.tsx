'use client';

import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IProduct } from '@/types';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  description: string;
  images: ProductImage[];
  category: string;
  brand: string;
  sku: string;
}

const productData: Product = {
  id: '1',
  name: 'Floral Print Buttoned',
  price: 800.0,
  originalPrice: 900.0,
  rating: 4,
  reviewCount: 13,
  availability: 'In Stock',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  images: [
    {
      id: '1',
      url: '/placeholder.svg?height=500&width=500',
      alt: 'Floral Print Buttoned - Main View',
    },
    {
      id: '2',
      url: '/placeholder.svg?height=500&width=500',
      alt: 'Floral Print Buttoned - Side View',
    },
    {
      id: '3',
      url: '/placeholder.svg?height=500&width=500',
      alt: 'Floral Print Buttoned - Back View',
    },
    {
      id: '4',
      url: '/placeholder.svg?height=500&width=500',
      alt: 'Floral Print Buttoned - Detail View',
    },
  ],
  category: 'Clothing',
  brand: 'Fashion Brand',
  sku: 'FB-001',
};

const similarProducts = [
  {
    id: '2',
    name: 'Summer Floral Dress',
    price: 650.0,
    originalPrice: 750.0,
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.5,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Casual Button Shirt',
    price: 450.0,
    originalPrice: 550.0,
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.2,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Printed Blouse',
    price: 380.0,
    originalPrice: 480.0,
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.7,
    reviews: 203,
  },
  {
    id: '5',
    name: 'Elegant Floral Top',
    price: 520.0,
    originalPrice: 620.0,
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.4,
    reviews: 94,
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
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">({reviewCount} Reviews)</span>
    </div>
  );
}

function ProductGallery({ images }: { images: ProductImage[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]?.url || '/placeholder.svg'}
          alt={images[selectedImage]?.alt || 'Product Image'}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index
                ? 'border-blue-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image.url || '/placeholder.svg'}
              alt={image.alt}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedImage === index
                ? 'bg-blue-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SimilarProducts() {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Similar Products
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h4>
              <StarRating
                rating={product.rating}
                reviewCount={product.reviews}
              />
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const handleSubscribe = () => {
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* App Download Banner */}
            <Card className="bg-yellow-400 border-0">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded"></div>
                    </div>
                    <div className="w-8 h-12 bg-gray-800 rounded"></div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900">
                  Download Flipmart App
                </h3>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">NEWSLETTERS</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sign Up for Our Newsletter!
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Subscribe to our newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    onClick={handleSubscribe}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Gallery */}
              <div>
                <ProductGallery images={productData.images} />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {productData.name}
                  </h1>
                  <StarRating
                    rating={productData.rating}
                    reviewCount={productData.reviewCount}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Availability :</span>
                  <Badge
                    variant={
                      productData.availability === 'In Stock'
                        ? 'default'
                        : 'destructive'
                    }
                    className={
                      productData.availability === 'In Stock'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }
                  >
                    {productData.availability}
                  </Badge>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {productData.description}
                </p>

                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-red-500">
                    ${productData.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${productData.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500 hover:bg-red-600 text-white">
                    {Math.round(
                      ((productData.originalPrice - productData.price) /
                        productData.originalPrice) *
                        100
                    )}
                    % OFF
                  </Badge>
                </div>

                <Separator />

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      QTY :
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={decrementQuantity}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-1 border-x border-gray-300 min-w-[50px] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={incrementQuantity}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleAddProduct(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      ADD TO CART
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={
                        isWishlisted
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : ''
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
                      />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Product Features */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Free shipping on orders over $99</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>1 year warranty included</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <RotateCcw className="h-4 w-4 text-blue-600" />
                    <span>30-day return policy</span>
                  </div>
                </div>

                <Separator />

                {/* Product Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-medium">{productData.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{productData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium">{productData.brand}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-12">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">
                    Reviews ({productData.reviewCount})
                  </TabsTrigger>
                  <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Product Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {productData.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Customer Reviews
                      </h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <StarRating rating={5} reviewCount={0} />
                            <span className="font-medium text-gray-900">
                              John Doe
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Great quality product! Highly recommended.
                          </p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <StarRating rating={4} reviewCount={0} />
                            <span className="font-medium text-gray-900">
                              Jane Smith
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Good value for money. Fast delivery.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="shipping" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Shipping Information
                      </h3>
                      <div className="space-y-3 text-gray-600">
                        <p>• Free standard shipping on orders over $99</p>
                        <p>• Express shipping available for $15</p>
                        <p>• International shipping available</p>
                        <p>• Orders processed within 1-2 business days</p>
                        <p>• Delivery time: 3-7 business days</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Similar Products */}
            <SimilarProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
