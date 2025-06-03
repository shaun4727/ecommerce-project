'use client';

import {
  Calendar,
  Camera,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { getProfileDataApi } from '@/service/AuthService';
import { getMyOrderDetailApi } from '@/service/cart';
import { IOrderData, IProfileData } from '@/types';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  avatar: string;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteCategory: string;
}

interface MonthlyOrderData {
  month: string;
  orders: number;
  revenue: number;
  year: number;
}

interface OrderStatusData {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

interface CategoryData {
  category: string;
  orders: number;
  revenue: number;
  color: string;
}

const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, New York, NY 10001',
  joinDate: '2022-03-15',
  avatar: '/placeholder.svg?height=120&width=120',
  membershipLevel: 'Gold',
  totalOrders: 47,
  totalSpent: 3249.99,
  averageOrderValue: 69.15,
  favoriteCategory: 'Electronics',
};

const monthlyOrderData: MonthlyOrderData[] = [
  { month: 'Jan', orders: 4, revenue: 280.5, year: 2024 },
  { month: 'Feb', orders: 6, revenue: 420.75, year: 2024 },
  { month: 'Mar', orders: 8, revenue: 650.25, year: 2024 },
  { month: 'Apr', orders: 5, revenue: 380.0, year: 2024 },
  { month: 'May', orders: 9, revenue: 720.5, year: 2024 },
  { month: 'Jun', orders: 7, revenue: 540.25, year: 2024 },
  { month: 'Jul', orders: 11, revenue: 890.75, year: 2024 },
  { month: 'Aug', orders: 6, revenue: 450.0, year: 2024 },
  { month: 'Sep', orders: 8, revenue: 620.5, year: 2024 },
  { month: 'Oct', orders: 10, revenue: 780.25, year: 2024 },
  { month: 'Nov', orders: 12, revenue: 950.75, year: 2024 },
  { month: 'Dec', orders: 9, revenue: 720.0, year: 2024 },
];

const orderStatusData: OrderStatusData[] = [
  { status: 'Delivered', count: 32, percentage: 68, color: '#10B981' },
  { status: 'Shipped', count: 8, percentage: 17, color: '#3B82F6' },
  { status: 'Processing', count: 5, percentage: 11, color: '#F59E0B' },
  { status: 'Cancelled', count: 2, percentage: 4, color: '#EF4444' },
];

const categoryData: CategoryData[] = [
  { category: 'Electronics', orders: 18, revenue: 1250.5, color: '#3B82F6' },
  { category: 'Clothing', orders: 12, revenue: 680.25, color: '#10B981' },
  { category: 'Home & Garden', orders: 8, revenue: 420.75, color: '#F59E0B' },
  { category: 'Sports', orders: 6, revenue: 380.0, color: '#8B5CF6' },
  { category: 'Books', orders: 3, revenue: 89.99, color: '#EF4444' },
];

const membershipColors = {
  Bronze: 'bg-amber-100 text-amber-800',
  Silver: 'bg-gray-100 text-gray-800',
  Gold: 'bg-yellow-100 text-yellow-800',
  Platinum: 'bg-purple-100 text-purple-800',
};

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Header Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === 'orders' ? 'Orders' : 'Revenue'}: ${
              entry.dataKey === 'revenue' ? '$' : ''
            }${entry.value}${entry.dataKey === 'revenue' ? '' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function PieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.status}</p>
        <p className="text-sm text-gray-600">{`${data.count} orders (${data.percentage}%)`}</p>
      </div>
    );
  }
  return null;
}

export default function DashboardProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('2024');
  const [chartType, setChartType] = useState('orders');
  const [userData, setUserData] = useState<IProfileData | null>(null);
  const [orderDetail, setOrderDetail] = useState<IOrderData[]>([]);

  const totalAmount = orderDetail.reduce(
    (acc, curr) => Number(acc) + Number(curr?.finalAmount),
    0
  );

  const getUserProfileData = async () => {
    try {
      const res = await getProfileDataApi();
      if (res.success) {
        setUserData(res.data);
      } else {
        console.log(res);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const getUserOrderDetailMethod = async () => {
    try {
      const res = await getMyOrderDetailApi();
      if (res.success) {
        setOrderDetail(res.data);
      } else {
        console.log(res);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getUserProfileData();
    getUserOrderDetailMethod();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  const totalAvgOrder = () => {
    if (orderDetail.length > 0) {
      return Number(totalAmount) / orderDetail.length;
    }
    return 0;
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Overview of your account and order analytics
            </p>
          </div>
          {/* <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div> */}
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={userProfile.avatar || '/placeholder.svg'}
                    alt={userProfile.name}
                  />
                  <AvatarFallback className="text-xl">
                    {userData?.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userData?.name}
                  </h2>
                  <Badge
                    className={membershipColors[userProfile.membershipLevel]}
                  >
                    {userProfile.membershipLevel} Member
                  </Badge>
                </div>
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{userData?.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{userData?.profile?.phoneNo}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{userData?.profile?.address}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Member since{' '}
                      {new Date(
                        userData?.profile?.createdAt as Date
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {orderDetail?.length}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orderDetail?.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  BDT
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Number(totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    BDT {Number(totalAvgOrder()).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Monthly Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span>Monthly Order Trends</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={chartPeriod} onValueChange={setChartPeriod}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyOrderData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey={chartType}
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      name={chartType === 'orders' ? 'Orders' : 'Revenue'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart - Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Order Status Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {orderStatusData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.status}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-600" />
              <span>Orders by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="category"
                    stroke="#6b7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    content={({
                      active = true,
                      payload = true,
                      label = 'label',
                    }) => {
                      if (active && payload && payload) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-medium text-gray-900">{label}</p>
                            <p className="text-sm text-blue-600">
                              Orders: payload
                            </p>
                            <p className="text-sm text-green-600">
                              Revenue: $1250
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
