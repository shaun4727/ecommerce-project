import HomePageComponent from '@/components/modules/home-page/home-page-component';
import { homePageBrandWithProduct } from '@/service/Brand';

export default async function HomePage() {
  const { data } = await homePageBrandWithProduct();

  return (
    <div>
      <HomePageComponent data={data} />
    </div>
  );
}
