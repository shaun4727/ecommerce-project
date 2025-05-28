import ProductDetail from '@/components/modules/product-detail/product-detail';
import { getSingleProduct } from '@/service/Product';

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);
  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
