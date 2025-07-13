'use client';

import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  DollarSign,
  Eye,
  FileEdit,
  Filter,
  Receipt,
  Search,
  Tag,
  Truck,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMyOrderDetailApi } from '@/service/cart';
import { IOrderData, IStep } from '@/types';
import { useRouter } from 'next/navigation';

function PaymentBadge({ status }: { status: string }) {
  if (status === 'Success') {
    return (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      >
        ● Success
      </Badge>
    );
  } else if (status === 'Pending') {
    return (
      <Badge
        variant="outline"
        className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
      >
        ● Pending
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      >
        ● Failed
      </Badge>
    );
  }
}

function FulfillmentBadge({ status }: { status: string }) {
  if (status === 'Fulfilled') {
    return (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      >
        ● Fulfilled
      </Badge>
    );
  } else if (status === 'Partial') {
    return (
      <Badge
        variant="outline"
        className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
      >
        ● Partial
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      >
        ● Unfulfilled
      </Badge>
    );
  }
}

function OrderHistorySkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Skeleton className="h-10 w-full sm:w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:hidden gap-2 p-4 bg-gray-50 border-b">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
        </div>

        <div className="hidden md:grid md:grid-cols-9 gap-2 p-4 bg-gray-50 border-b">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
        </div>

        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`p-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="grid grid-cols-2 md:grid-cols-9 gap-4">
                {Array(9)
                  .fill(0)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-8 w-full" />
                  ))}
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  );
}

function formatDate(dateTime: string | number | Date) {
  const date = new Date(dateTime);

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
}

function MobileOrderCard({ order }: { order: IOrderData }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-medium text-gray-900">#{order._id}</p>
            <p className="text-sm text-gray-500">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileEdit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-500">Customer</div>
          <div className="font-medium text-gray-900">{order.user.name}</div>

          <div className="text-gray-500">Payment</div>
          <div>
            <PaymentBadge status={order.status} />
          </div>

          <div className="text-gray-500">Total</div>
          <div className="font-medium text-gray-900">
            BDT {order.totalAmount.toFixed(2)}
          </div>

          <div className="text-gray-500">Items</div>
          <div className="font-medium text-gray-900">
            {order.products.length} items
          </div>

          <div className="text-gray-500">Fulfillment</div>
          <div>
            <FulfillmentBadge status={order.status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    active: false,
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

export default function OrderHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState<IStep | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailData, setOrderDetailData] = useState<IOrderData[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeOrder, setActiveOrder] = useState<IOrderData | null>(null);

  const ordersPerPage = 10;
  type TabSwitchKey = 'productDetail' | 'shipment' | 'completed';
  const [tabSwitch, setTabSwitch] = useState<Record<TabSwitchKey, number>>({
    productDetail: 0,
    shipment: 0,
    completed: 0,
  });

  const router = useRouter();

  useEffect(() => {
    getUserOrderDetailMethod();
  }, []);

  useEffect(() => {
    setCurrentTab(steps[0]);
  }, [steps]);

  const handleTrackOrder = () => {
    router.push('/track-agent');
  };
  const getUserOrderDetailMethod = async () => {
    try {
      const res = await getMyOrderDetailApi();
      if (res.success) {
        setOrderDetailData(res.data);
        setActiveOrder(res.data[0]);
      } else {
        console.log(res);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredOrders = orderDetailData.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'pending')
      return matchesSearch && order.status === 'Pending';
    if (filterStatus === 'success')
      return matchesSearch && order.status === 'Success';
    if (filterStatus === 'unfulfilled')
      return matchesSearch && order.status === 'Unfulfilled';
    if (filterStatus === 'fulfilled')
      return matchesSearch && order.status === 'Fulfilled';

    return matchesSearch;
  });

  const getCurrentOrderStatusClass = (step: IStep) => {
    if (currentTab === step) {
      return 'bg-orange-500 text-white';
    }
    return step.completed
      ? 'bg-orange-300 text-white'
      : step.active
        ? 'bg-orange-300 text-white'
        : 'bg-gray-100 text-gray-400';
  };

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortColumn) return 0;

    let comparison = 0;
    switch (sortColumn) {
      case 'id':
        comparison = a._id.localeCompare(b._id);
        break;
      case 'date':
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'customer':
        comparison = a.user.name.localeCompare(b.user.name);
        break;
      case 'total':
        comparison = a.totalAmount - b.totalAmount;
        break;
      case 'items':
        comparison = a.products.length - b.products.length;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  if (isLoading) {
    return (
      <div className="w-full bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <OrderHistorySkeleton />
        </div>
      </div>
    );
  }

  const openDrawerToCheckOrder = (order: IOrderData) => {
    orderDtlSwitch(steps[0]);
    setActiveOrder(order);
    if (order.status === 'Picked') {
      steps[1].active = true;
    }
    setOpenDrawer(true);
  };

  const orderDtlSwitch = (step: IStep) => {
    if (!step?.active) {
      return;
    }
    setCurrentTab(step);
    const resetTabs: Record<TabSwitchKey, number> = {
      productDetail: step.icon === 'CreditCard' ? 1 : 0,
      shipment: step.icon === 'Truck' ? 1 : 0,
      completed: step.icon === 'CheckCircle' ? 1 : 0,
    };
    setTabSwitch(resetTabs);
  };

  const getTabDetail = (order: IOrderData) => {
    if (!currentTab?.active) {
      return;
    }
    if (tabSwitch.shipment === 1) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seller Address */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Shipping Address (Seller)
              </h3>
              {/* <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600" /> */}
            </div>
            <div className="space-y-1 text-sm sm:text-base text-gray-700">
              <p className="font-medium">Double CTRL Z</p>
              <p>1234 Market Street, Apt 56,</p>
              <p>Philadelphia, PA 19107,</p>
              <p>United States of America</p>
            </div>
          </div>

          {/* Buyer Address */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Shipping Address (Buyer)
              </h3>
              {/* <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600" /> */}
            </div>
            <div className="space-y-1 text-sm sm:text-base text-gray-700">
              <p className="font-medium">{order.shippingAddress}</p>
              {/* <p>4567 Elm Street, Apt 3B,</p> */}
            </div>
          </div>
        </div>
      );
    } else if (tabSwitch.productDetail === 1) {
      return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <Receipt className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Order Summary
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-600">
                  Subtotal
                </span>
                <span className="text-sm sm:text-base font-medium text-gray-900">
                  {order.totalAmount}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm sm:text-base text-gray-600">
                    Coupon
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-400">
                  {order.coupon}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-600">
                  Discount
                </span>
                <span className="text-sm sm:text-base text-gray-900">
                  {order.discount}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-600">
                  Delivery Charge
                </span>
                <span className="text-sm sm:text-base font-medium text-gray-900">
                  {order.deliveryCharge}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 bg-orange-50 -mx-2 px-2 rounded">
                <span className="text-base sm:text-lg font-semibold text-gray-900">
                  Final Amount
                </span>
                <span className="text-base sm:text-lg font-bold text-orange-600">
                  {order.finalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Payment Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-0">
                  Order Status
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-0">
                  Payment Method
                </span>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-0">
                  Payment Status
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Payment Process Status
              </p>
              <p className="text-xs text-blue-700">Your payment is completed</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-1">View all your orders detail</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Payment Pending</SelectItem>
                <SelectItem value="success">Payment Success</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {currentOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            currentOrders.map((order) => (
              <MobileOrderCard key={order._id} order={order} />
            ))
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-hidden border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead
                  className="w-[80px] cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    Order
                    {sortColumn === 'id' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    {sortColumn === 'date' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>

                <TableHead>Payment</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center">
                    Total
                    {sortColumn === 'total' &&
                      (sortDirection === 'asc' ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('customer')}
                >
                  <div className="flex items-center">Status</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                currentOrders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <TableCell className="font-medium">#{order._id}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>

                    <TableCell>
                      <PaymentBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      BDT {Number(order.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => openDrawerToCheckOrder(order)}
                      >
                        Order Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerContent>
            <div className="mx-auto w-full overflow-y-scroll">
              <div className="p-4 pb-0">
                <DrawerHeader>
                  <DrawerTitle> Order ID: TXNID983274</DrawerTitle>
                </DrawerHeader>
                <div className="mb-6">
                  <p className="text-sm sm:text-base text-gray-600">
                    Let's boost your sales with powerful insights and effective
                    strategies today
                  </p>
                </div>

                {/* Status Banner */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-sm sm:text-base font-medium text-gray-900">
                      With courier en route
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 ml-5 sm:ml-0">
                    No Resi: 34u2394y239y
                  </span>
                </div>

                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {steps.map((step, index) => {
                      let IconComponent;
                      if (step.icon === 'CheckCircle') {
                        IconComponent = CheckCircle;
                      } else if (step.icon === 'Truck') {
                        IconComponent = Truck;
                      } else {
                        IconComponent = CreditCard;
                      }
                      return (
                        <div
                          key={step.id}
                          className="flex items-center sm:flex-col sm:items-center sm:text-center flex-1"
                        >
                          <div
                            onClick={() => orderDtlSwitch(step)}
                            className="flex items-center sm:flex-col sm:items-center"
                          >
                            <div
                              className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mr-3 sm:mr-0 sm:mb-3
                    ${getCurrentOrderStatusClass(step)}
                  `}
                            >
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <div className="sm:text-center">
                              <h3
                                className={`
                      text-sm sm:text-base font-medium
                      ${step.completed || step.active ? 'text-gray-900' : 'text-gray-400'}
                    `}
                              >
                                {step.title}
                              </h3>
                              <p
                                className={`
                      text-xs sm:text-sm
                      ${step.completed || step.active ? 'text-gray-600' : 'text-gray-400'}
                    `}
                              >
                                {step.subtitle}
                              </p>
                            </div>
                          </div>
                          {/* Connection line for mobile */}
                          {index < steps.length - 1 && (
                            <div className="hidden sm:block flex-1 h-px bg-gray-200 mx-4"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Addresses */}

                {getTabDetail(activeOrder as IOrderData)}
              </div>
              <DrawerFooter>
                {tabSwitch.shipment === 1 && (
                  <div className="flex justify-center">
                    <Button className="w-md" onClick={handleTrackOrder}>
                      Track Order
                    </Button>
                  </div>
                )}
                {/* <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DrawerClose> */}
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
