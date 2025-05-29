import ManageProducts from '@/components/modules/shop/product';
import { getAllProducts } from '@/service/Product';

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = '1' } = await searchParams;

  const { data, meta } = await getAllProducts(page, '10');

  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ManageProductsPage;
