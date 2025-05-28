'use client';

import CategorySection from './category-section';
import FeaturedProducts from './featured-products';
import FlashSale from './flash-sale';

import HeroSection from './hero-section';
import TopBrands from './TopBrands';

const HomePageComponent = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
    </>
  );
};

export default HomePageComponent;
