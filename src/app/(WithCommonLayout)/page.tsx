import HomePageComponent from '@/components/modules/home-page/home-page-component';
import { homePageBrandWithProduct } from '@/service/Brand';
import {
  getFlashSaleProductsApi,
  getTrendingProductsApi,
} from '@/service/Product';

export default async function HomePage() {
  const { data } = await homePageBrandWithProduct();
  const { data: trendingProducts } = await getTrendingProductsApi();
  const { data: flashSaleProducts } = await getFlashSaleProductsApi();
  // const { data: allBrands } = await getAllBrands();

  return (
    <div>
      <HomePageComponent
        data={data}
        trendingProducts={trendingProducts}
        flashSaleProducts={flashSaleProducts}
        allBrands={data}
      />
    </div>
  );
}
