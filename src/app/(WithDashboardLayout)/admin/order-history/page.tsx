import OrderHistoryAdmin from '@/components/modules/dashboard/order-history/page';
import { getAllUsersApi } from '@/service/AuthService';

export default async function OrderHistoryAdminPage() {
  const res = (await getAllUsersApi()).data;
  return (
    <div>
      <OrderHistoryAdmin agents={res} />
    </div>
  );
}
