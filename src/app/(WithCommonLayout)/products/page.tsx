import AllProductsSection from '@/components/modules/all-products/all-products-components';
import { getAllCategories } from '@/service/Category';
import { getAllProducts } from '@/service/Product';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: categories } = await getAllCategories();
  const { data: products, meta } = await getAllProducts(
    undefined,
    undefined,
    query
  );

  return <AllProductsSection products={products} meta={meta} />;
};

export default AllProductsPage;
