'use client';

import {
  ChevronDown,
  ChevronUp,
  Eye,
  FileEdit,
  Filter,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { getMyShopOrdersApi } from '@/service/cart';
import { IOrderData } from '@/types';

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

export default function OrderHistoryAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailData, setOrderDetailData] = useState<IOrderData[]>([]);
  const ordersPerPage = 10;

  useEffect(() => {
    getUserOrderDetailMethod();
  }, []);

  const getUserOrderDetailMethod = async () => {
    try {
      const res = await getMyShopOrdersApi();
      if (res.success) {
        setOrderDetailData(res.data);
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
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('customer')}
                >
                  <div className="flex items-center">
                    Customer
                    {sortColumn === 'customer' &&
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
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center">Assign</div>
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
                    <TableCell>
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(order.createdAt))}
                    </TableCell>
                    {/* <TableCell>{order.createdAt}</TableCell> */}
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>
                      <PaymentBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      BDT {Number(order.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline">Assign Agent</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                              <DrawerTitle>Select Agent</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 pb-0 flex justify-center">
                              <Select>
                                <SelectTrigger className="w-[330px]">
                                  <SelectValue placeholder="Select an Agent" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">
                                      Banana
                                    </SelectItem>
                                    <SelectItem value="blueberry">
                                      Blueberry
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                      Grapes
                                    </SelectItem>
                                    <SelectItem value="pineapple">
                                      Pineapple
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <DrawerFooter>
                              <div className="flex flex-row justify-center gap-4">
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                              </div>
                            </DrawerFooter>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
