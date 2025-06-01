'use client';

import { IBrand, IProduct } from '@/types';
import CategorySection from './category-section';
import FeaturedProducts from './featured-products';
import FlashSale from './flash-sale';

import HeroSection from './hero-section';
import TopBrands from './TopBrands';

const HomePageComponent = ({
  data,
  trendingProducts,
  flashSaleProducts,
  allBrands,
}: {
  data: IBrand[];
  allBrands: IBrand[];
  trendingProducts: IProduct[];
  flashSaleProducts: IProduct[];
}) => {
  return (
    <>
      <HeroSection />
      <CategorySection data={data} />
      <FeaturedProducts trendingProducts={trendingProducts} />
      <FlashSale flashSaleProducts={flashSaleProducts} />
      <TopBrands allBrands={allBrands} />
    </>
  );
};

export default HomePageComponent;
