import ManageBrands from '@/components/modules/shop/brand';
import { getAllBrands } from '@/service/Brand';

const ProductBrandPage = async () => {
  const { data } = await getAllBrands();
  return (
    <div>
      <ManageBrands brands={data} />
    </div>
  );
};

export default ProductBrandPage;
