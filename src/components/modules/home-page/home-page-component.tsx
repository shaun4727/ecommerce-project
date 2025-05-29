'use client';

import { IBrand } from '@/types';
import CategorySection from './category-section';
import FeaturedProducts from './featured-products';
import FlashSale from './flash-sale';

import HeroSection from './hero-section';
import TopBrands from './TopBrands';

const HomePageComponent = ({ data }: { data: IBrand[] }) => {
  return (
    <>
      <HeroSection />
      <CategorySection data={data} />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
    </>
  );
};

export default HomePageComponent;
