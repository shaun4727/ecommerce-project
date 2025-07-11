import OrderHistory from '@/components/modules/user-dashboard/order-history/page';

const steps = [
  // {
  //   id: 1,
  //   title: 'Order made',
  //   subtitle: 'Create order',
  //   icon: Package,
  //   completed: true,
  //   active: false,
  // },
  {
    id: 1,
    title: 'Payment Detail',
    subtitle: 'Customer payment',
    icon: 'CreditCard',
    completed: true,
    active: true,
  },
  {
    id: 2,
    title: 'Shipped',
    subtitle: 'On delivery',
    icon: 'Truck',
    completed: false,
    active: true,
  },
  {
    id: 3,
    title: 'Completed',
    subtitle: 'Order completed',
    icon: 'CheckCircle',
    completed: false,
    active: false,
  },
];
export default function OrderHistoryPage() {
  return (
    <div>
      <OrderHistory steps={steps} />
    </div>
  );
}
