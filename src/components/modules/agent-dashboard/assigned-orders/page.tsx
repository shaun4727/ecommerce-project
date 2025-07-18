/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CircleX, Eye, FileEdit, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Checkbox } from '@/components/ui/checkbox';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { orderAssignedStatus } from '@/constants';
import { useUser } from '@/context/UserContext';
import {
  assignPickedOrder,
  clearPickedOrder,
  pickedOrderSelector,
} from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getOrdersOfAgentApi,
  updateAgentPickStatusApi,
  updateOrderDeliveryStatusApi,
} from '@/service/cart';
import { IAgentOrder } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import AgentLocationTracker from '../agentLocationTracker';

function PaymentBadge({ status }: { status: string }) {
  if (status === orderAssignedStatus.delivered) {
    return (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      >
        ● {orderAssignedStatus.delivered}
      </Badge>
    );
  } else if (status === orderAssignedStatus.picked) {
    return (
      <Badge
        variant="outline"
        className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
      >
        ● {orderAssignedStatus.picked}
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      >
        ● {orderAssignedStatus.assigned}
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

function MobileOrderCard({ order }: { order: IAgentOrder }) {
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
        <h1>Need to make responsive</h1>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-500">Order</div>
          <div className="font-medium text-gray-900">{order._id}</div>

          <div className="text-gray-500">Payment</div>
          <div>
            <PaymentBadge status={order.status} />
          </div>

          <div className="text-gray-500">Address</div>
          <div className="font-medium text-gray-900">
            {order.destination.area},{order.destination.street_or_building_name}
            ,{order.destination.city} {order.destination.zip_code}, Bangladesh
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AssignedOrderHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDetailData, setOrderDetailData] = useState<IAgentOrder[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [orderPicked, setOrderPicked] = useState(false);

  console.log(orderPicked);
  const dispatch = useAppDispatch();

  const pickedOrder = useAppSelector(pickedOrderSelector);

  const { user } = useUser();

  const deliverySchema = z.object({
    delivered: z.boolean(),
    paid: z.boolean(),
  });

  type deliveryFormData = z.infer<typeof deliverySchema>;

  const methods = useForm<deliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      delivered: false,
      paid: false,
    },
  });

  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    if (user) {
      getUserOrderDetailMethod();
    }
  }, [user]);

  const getUserOrderDetailMethod = async () => {
    try {
      const res = await getOrdersOfAgentApi(user!.userId);

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

  const filteredOrders = orderDetailData.filter((order) => {
    const formattedAddress = `${order.destination.street_or_building_name}, ${order.destination.area}, ${order.destination.city} - ${order.destination.zip_code}`;
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formattedAddress.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });
  if (isLoading) {
    return (
      <div className="w-full bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <OrderHistorySkeleton />
        </div>
      </div>
    );
  }

  const submitDeliveryStatus = async (data: deliveryFormData) => {
    // loginUserApi
    let toastId: number | string = 1;

    try {
      const formObj = {
        ...data,
        orderId: pickedOrder.orderId,
      };
      toastId = toast.loading('...Loading', {
        id: toastId,
      });
      const res = await updateOrderDeliveryStatusApi(formObj);

      if (res?.success) {
        reset();
        dispatch(clearPickedOrder());
        setOpenDrawer(false);
        await getUserOrderDetailMethod();
        toastId = toast.success('Order updated successfully!', {
          id: toastId,
        });
      } else {
        console.log(res);
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
    // handle login logic
  };

  const updateAgentPick = async () => {
    let toastId = 10;
    try {
      toastId = toast.loading('...loading', { id: toastId }) as number;
      const res = await updateAgentPickStatusApi(user!.userId);
      if (res.success) {
        toast.success('Product picked by Agent', { id: toastId });
        await getUserOrderDetailMethod();
        return true;
      } else {
        console.log(res.message);
      }
    } catch (err: any) {
      console.log(err);
      throw new err();
    }
  };

  const openDeliveryDrawer = async (order: IAgentOrder) => {
    try {
      dispatch(assignPickedOrder(order));
      const res = await updateAgentPick();
      if (res) {
        setOpenDrawer(true);
        setOrderPicked(true);
      }
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <div className="w-full bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Assigned Orders</h1>
          <p className="text-gray-600 mt-1">
            View all your assigned orders detail
          </p>
        </div>
        {<AgentLocationTracker />}
        {/* {orderPicked && <AgentLocationTracker />} */}

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
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <MobileOrderCard key={order._id} order={order} />
            ))
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-hidden border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[80px] cursor-pointer">Order</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <TableCell className="font-medium">#{order._id}</TableCell>
                    <TableCell>
                      {order.destination.area}, {order.destination.city},
                      Bangladesh{' '}
                    </TableCell>
                    <TableCell>
                      <PaymentBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      {order.status === orderAssignedStatus.assigned && (
                        <Button
                          variant="default"
                          onClick={() => openDeliveryDrawer(order)}
                        >
                          Pick
                        </Button>
                      )}

                      {order.status === orderAssignedStatus.picked && (
                        <Button
                          variant="default"
                          onClick={() => setOpenDrawer(true)}
                        >
                          Update Order
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Drawer
            direction="right"
            open={openDrawer}
            onOpenChange={setOpenDrawer}
          >
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setOpenDrawer(false)}
                    >
                      <CircleX />
                    </Button>
                  </div>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <h1 className="text-lg font-bold mb-2">
                    Update delivery status
                  </h1>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(submitDeliveryStatus)}
                      className="space-y-4"
                    >
                      <FormField
                        name="delivered"
                        control={control}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) =>
                                  field.onChange(checked === true)
                                }
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Delivered
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="paid"
                        control={control}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) =>
                                  field.onChange(checked === true)
                                }
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Payment Completed
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
