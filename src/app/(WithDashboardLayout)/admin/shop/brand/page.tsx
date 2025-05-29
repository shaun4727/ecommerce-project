import ManageBrands from '@/components/modules/shop/brand';
import { getAllBrands } from '@/service/Brand';

const ProductBrandPage = async () => {
  const { data, meta } = await getAllBrands();
  return (
    <div>
      <ManageBrands brands={data} />
    </div>
  );
};

export default ProductBrandPage;
