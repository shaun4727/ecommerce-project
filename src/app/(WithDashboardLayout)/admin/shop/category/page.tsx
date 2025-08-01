import ManageCategories from '@/components/modules/shop/category';
import { getAllCategories } from '@/service/Category';

const ProductCategoryPage = async () => {
  const { data } = await getAllCategories();
  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
