'use client';

import { Grid3X3, List, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import TablePagination from '@/components/ui/core/EPTable/TablePagination';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { addProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { homePageBrandWithProduct } from '@/service/Brand';
import { IBrandWithProducts, IMeta, IProduct } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface Brand {
  id: string;
  name: string;
  count: number;
}

const brands: Brand[] = [
  { id: 'nike', name: 'Nike', count: 245 },
  { id: 'apple', name: 'Apple', count: 189 },
  { id: 'samsung', name: 'Samsung', count: 156 },
  { id: 'adidas', name: 'Adidas', count: 134 },
  { id: 'sony', name: 'Sony', count: 98 },
  { id: 'microsoft', name: 'Microsoft', count: 87 },
  { id: 'canon', name: 'Canon', count: 76 },
  { id: 'dell', name: 'Dell', count: 65 },
  { id: 'hp', name: 'HP', count: 54 },
  { id: 'lg', name: 'LG', count: 43 },
];

function StarRating({
  rating,
  interactive = false,
  onRatingClick,
}: {
  rating: number;
  interactive?: boolean;
  onRatingClick?: (rating: number) => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          onClick={() => interactive && onRatingClick?.(star)}
          disabled={!interactive}
        >
          <Star
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
          />
        </button>
      ))}
    </div>
  );
}

type productsWithId = IProduct & {
  _id: string;
};

interface filterOptionList {
  brands: string[];
  rating: number[];
}

export default function AllProductsSection({
  products,
  meta,
}: {
  products: productsWithId[];
  meta: IMeta;
}) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandWithProduct, setBrandWithProduct] = useState<
    IBrandWithProducts[]
  >([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [restQuery, setRestQuery] = useState('');
  const [priceRange, setPriceRange] = useState([10, 150]);
  const router = useRouter();
  const [filterState, setFilterState] = useState<filterOptionList>({
    brands: [],
    rating: [],
  });
  const searchParams = useSearchParams();

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const getBrandsWithProducts = async () => {
    try {
      const res = await homePageBrandWithProduct();
      if (res?.success) {
        setBrandWithProduct(res?.data);
      } else {
        console.log(res?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBrandsWithProducts();
  }, []);

  // const clearAllFilters = () => {
  //   setPriceRange([200, 800]);
  //   setSelectedBrands([]);
  //   setSelectedRating(null);
  // };
  const dispatch = useAppDispatch();
  const handleAddProduct = (
    product: IProduct,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    dispatch(addProduct(product));
    toast.success('Product added to cart', { id: 1 });
  };

  const getDetailOfTheProduct = (product: IProduct) => {
    router.push(`/products/${product._id}`);
  };

  const updateFilterParameters = (obj: { brand?: string; rating?: number }) => {
    if (obj?.brand) {
      setFilterState((prev) => {
        const brand = obj.brand as string;
        if (prev.brands.includes(brand)) {
          return {
            ...prev,
            brands: prev.brands.filter((id: string) => id !== obj.brand),
          };
        } else {
          return { ...prev, brands: [...prev.brands, brand] };
        }
      });
    }
    if (obj?.rating) {
      setFilterState((prev) => {
        const rating = obj.rating as number;
        if (prev.rating.includes(rating)) {
          return {
            ...prev,
            rating: prev.rating.filter((id: number) => id !== obj.rating),
          };
        } else {
          return { ...prev, rating: [...prev.rating, rating] };
        }
      });
    }
  };

  const applyFilterMethod = () => {
    const parameters = Object.entries(
      Object.fromEntries(searchParams.entries())
    );
    const filtered = parameters.filter(
      ([key]) =>
        key !== 'minPrice' &&
        key !== 'maxPrice' &&
        key !== 'brands' &&
        key !== 'rating' &&
        key !== 'page' &&
        key !== 'category'
    );
    const string: string[] = [];
    filtered.forEach((param) => {
      const [key, value] = param;
      string.push(`${key}=${value}`);
    });

    if (filterState.brands.length) {
      string.push(`brands=${filterState.brands.toString()}`);
    }
    if (filterState.rating.length) {
      string.push(`rating=${filterState.rating.toString()}`);
    }
    if (priceRange) {
      string.push(`minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
    }
    setRestQuery(string.join('&'));
    router.push(`/products?${string.join('&')}`);
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">SHOP BY</h3>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Clear All
                  </Button> */}
                </div>

                {/* Brand Filters */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Brand</h4>
                  <div className="space-y-3 overflow-y-auto">
                    {brandWithProduct.map((brand) => (
                      <div
                        key={brand._id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={brand._id}
                          // checked={selectedBrands.includes(brand._id)}
                          onCheckedChange={() =>
                            updateFilterParameters({ brand: brand._id })
                          }
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <label
                          htmlFor={brand._id}
                          className="flex-1 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span>{brand.name}</span>
                            <span className="text-xs text-gray-500">
                              ({brand?.products?.length || 0})
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Rating Filter */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Customer Rating
                  </h4>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <Checkbox
                          id={`rating-${rating}`}
                          onCheckedChange={() =>
                            updateFilterParameters({ rating: rating })
                          }
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="flex-1 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <StarRating rating={rating} />
                            <span className="text-sm text-gray-600">& Up</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Slider */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-500 font-medium">
                        BDT {priceRange[0]}.00
                      </span>
                      <span className="text-red-500 font-medium">
                        BDT {priceRange[1]}.00
                      </span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={applyFilterMethod}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(selectedBrands.length > 0 || selectedRating !== null) && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Active Filters
                      </h4>
                      <div className="space-y-2">
                        {selectedBrands.map((brandId) => {
                          const brand = brands.find((b) => b.id === brandId);
                          return (
                            <div
                              key={brandId}
                              className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full"
                            >
                              <span className="text-sm text-blue-700">
                                {brand?.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleBrand(brandId)}
                                className="h-auto p-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </Button>
                            </div>
                          );
                        })}
                        {selectedRating && (
                          <div className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full">
                            <div className="flex items-center space-x-1">
                              <StarRating rating={selectedRating} />
                              <span className="text-sm text-blue-700">
                                & Up
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedRating(null)}
                              className="h-auto p-1 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Promotional Banner */}
            <div className="relative h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
              <Image
                src="/images/big-sale.jpg"
                alt="Big Sale Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
                  BIG SALE
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Save up to 49% off
                </h2>
                <p className="text-lg opacity-90 max-w-md">
                  Let us help you with the best products
                </p>
              </div>
            </div>

            {/* Product Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={
                    viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }
                >
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={
                    viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>

              {/* Sort and Show Controls */}
              {/* <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="position">Position</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Show</span>
                  <Select value={showItems} onValueChange={setShowItems}>
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {products &&
                products.map((product) => (
                  <Card
                    key={product._id}
                    onClick={() => getDetailOfTheProduct(product)}
                    className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    <CardContent
                      className={
                        viewMode === 'grid' ? 'p-4' : 'p-4 flex space-x-4'
                      }
                    >
                      <div
                        className={
                          viewMode === 'grid' ? '' : 'w-32 h-32 flex-shrink-0'
                        }
                      >
                        <div
                          className={`relative bg-gray-100 rounded-lg overflow-hidden ${viewMode === 'grid' ? 'aspect-square mb-4' : 'w-full h-full'}`}
                        >
                          <Image
                            src={product?.imageUrls?.[0]}
                            alt="product-img"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className={
                          viewMode === 'grid'
                            ? 'relative h-48'
                            : 'flex-1 relative'
                        }
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {product.brand.name}
                        </p>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg font-bold text-blue-600">
                            BDT {Number(product.price).toFixed(2)}
                          </span>
                          {product.offerPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${Number(product.offerPrice).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 items-start space-x-1 min-h-3 mb-3">
                          <StarRating rating={product.ratingCount} />
                          <span className="text-sm text-gray-500">
                            ({product.description})
                          </span>
                        </div>
                        <Button
                          onClick={(e) => handleAddProduct(product, e)}
                          className="w-full bottom-0 bg-blue-600 hover:bg-blue-700 text-white absolute"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <TablePagination
              totalPage={meta?.totalPage}
              restQuery={restQuery}
            />
            {/* Pagination */}
            {/* <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : ''
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
