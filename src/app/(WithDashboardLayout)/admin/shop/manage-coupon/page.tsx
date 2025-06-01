import CouponTable from '@/components/modules/shop/manage-coupon/CouponTable';
import CreateCouponModal from '@/components/modules/shop/manage-coupon/CreateCouponModal';
import { getAllCouponApi } from '@/service/cart';

export default async function ManageCouponPage() {
  const {
    data: { meta, result },
  } = await getAllCouponApi();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Manage Coupon</h1>
        <CreateCouponModal />
      </div>
      <div>
        <CouponTable coupons={result} meta={meta} />
      </div>
    </div>
  );
}
