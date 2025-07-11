'use client';

import {
  ArrowLeft,
  BadgeDollarSign,
  BanknoteArrowDown,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { orderType } from '@/constants';
import { cities } from '@/constants/cities';
import { useUser } from '@/context/UserContext';
import { currencyFormatter } from '@/lib/currencyFormatters';
import {
  citySelector,
  clearCart,
  couponSelector,
  decrementOrderQuantity,
  discountAmountSelector,
  fetchCoupon,
  grandTotalSelector,
  incrementOrderQuantity,
  orderedProductsSelector,
  orderSelector,
  removeProduct,
  shippingAddressSelector,
  shippingCostSelector,
  shopSelector,
  subTotalSelector,
  updateCity,
  updatePaymentMethod,
  updateShippingAddress,
} from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder } from '@/service/cart';
import { IProduct } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  inStock: boolean;
  maxQuantity: number;
}

export default function ShoppingCartSection() {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [paymentOption, setPaymentOption] = useState(0);
  const dispatch = useAppDispatch();
  const products = useAppSelector(orderedProductsSelector);
  const subTotal = useAppSelector(subTotalSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const coupon = useAppSelector(couponSelector);
  const user = useUser();
  const router = useRouter();
  const shopId = useAppSelector(shopSelector);

  const incrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const decrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleCitySelect = (value: string) => {
    dispatch(updateCity(value));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  const validationMsgsOnOrder = () => {
    if (!user.user) {
      router.push('/login');
      throw new Error('Please login first.');
    }

    if (!city) {
      throw new Error('City is missing');
    }
    if (!shippingAddress) {
      throw new Error('Shipping address is missing');
    }

    if (cartProducts.length === 0) {
      throw new Error('Cart is empty, what are you trying to order ??');
    }
  };

  const handleOrderViaSSLorCOD = async (type: string) => {
    const toastId = toast.loading('Order is being placed');

    try {
      if (type === orderType.cod) {
        dispatch(updatePaymentMethod('cod'));
      } else {
        dispatch(updatePaymentMethod('Online'));
      }
      let orderData;
      let toastID = 1;
      if (coupon.code) {
        orderData = { ...order, coupon: coupon.code, OrderType: type };
      } else {
        orderData = order;
      }

      const res = await createOrder(orderData);

      if (res.success) {
        toast.success(res.message, { id: toastID });
        dispatch(clearCart());
        router.push('/user/order-history');
      }

      if (!res.success) {
        toast.error(res.message, { id: toastID });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleOrder = async () => {
    try {
      validationMsgsOnOrder();
      setPaymentOption(1);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message, { id: 0 });
    }
  };

  const applyPromoCode = async () => {
    try {
      const formObj = {
        orderAmount: subTotal,
        shopId,
        couponCode: promoCode,
      };
      const res = dispatch(
        fetchCoupon({
          couponCode: String(promoCode),
          subTotal: Number(subTotal),
          shopId: String(shopId),
        }) as any
      );

      console.log(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //   const updateQuantity = (id: string, newQuantity: number) => {
  //     const applyPromoCode = () => {
  //       if (promoCode.toLowerCase() === 'save10') {
  //         setAppliedPromo(promoCode);
  //         setPromoCode('');
  //       }
  //     };
  //   };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cartProducts.length ?? '0'} items in your cart
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {cartProducts.length}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {products.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some products to get started
                  </p>
                  <Link href="/products">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              products.map((item: IProduct, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.imageUrls[0] || '/placeholder.svg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {!item.stock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              {/* {item. && <span>Color: {item.color}</span>} */}
                            </div>
                            {!item.stock && (
                              <Badge variant="destructive" className="mt-2">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => removeItem(item.id)}
                            onClick={() => handleRemoveProduct(item._id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                          {/* Price */}
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-blue-600">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.offerPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.offerPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Qty:</span>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                // onClick={() =>
                                //   updateQuantity(item.id, item.quantity - 1)
                                // }
                                onClick={() => decrementQuantity(item._id)}
                                disabled={item.stock <= 1}
                                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 py-1 border-x border-gray-300 min-w-[50px] text-center">
                                {item.orderQuantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => incrementQuantity(item._id)}
                                // onClick={() =>
                                //   updateQuantity(item.id, item.quantity + 1)
                                // }
                                disabled={
                                  (item.orderQuantity &&
                                    item.orderQuantity >= item.stock) ||
                                  !item.stock
                                }
                                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <span className="text-lg font-semibold text-gray-900">
                              $
                              {item.orderQuantity &&
                                (item.price * item.orderQuantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  {/* <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div> */}

                  {/* Phone Number */}
                  {/* <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      className="w-full"
                    />
                  </div> */}

                  {/* City Selection */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      City *
                    </Label>
                    <Select onValueChange={(city) => handleCitySelect(city)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ZIP Code */}
                  {/* <div className="space-y-2">
                    <Label
                      htmlFor="zipCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      ZIP Code *
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="Enter ZIP code"
                      className="w-full"
                    />
                  </div> */}
                </div>

                {/* Address Textarea */}
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Street Address *
                  </Label>
                  <Textarea
                    id="address"
                    onChange={(e) => handleShippingAddress(e.target.value)}
                    placeholder="Enter your complete street address including apartment, suite, or building number"
                    className="w-full min-h-[100px] resize-none"
                    rows={4}
                  />
                </div>

                {/* Address Validation */}
                {!false && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <p className="text-sm text-yellow-800">
                        Please complete all shipping address fields to proceed
                        with checkout.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={applyPromoCode}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
                    <span className="text-sm text-green-700">
                      Promo "{appliedPromo}" applied
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAppliedPromo('')}
                      className="text-green-700 hover:text-green-800"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {/* Subtotal ({itemCount} items) */}
                    </span>
                    <span className="font-medium">
                      {/* ${summary.subtotal.toFixed(2)} */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="font-medium">
                      {currencyFormatter(subTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium">
                      {currencyFormatter(discountAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipment Cost</span>
                    <span className="font-medium">
                      {currencyFormatter(shippingCost)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span className="text-blue-600">
                    {currencyFormatter(grandTotal)}
                  </span>
                </div>

                <Button
                  onClick={handleOrder}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  disabled={paymentOption === 1}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* {summary.shipping > 0 && (
                  <p className="text-sm text-gray-600 text-center">
                    Add ${(99 - summary.subtotal).toFixed(2)} more for free
                    shipping
                  </p>
                )} */}
              </CardContent>
            </Card>

            {/* Benefits */}
            {/* paymentOption = 1 */}
            <Card className={paymentOption === 0 ? 'hidden' : 'bg-[#155dfc]'}>
              <CardContent className="p-4 space-y-3 ">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <p className="text-sm text-red-800">
                      Please select a payment option
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 justify-between px-8">
                  <div
                    onClick={() => handleOrderViaSSLorCOD(orderType.cod)}
                    className="flex border-2 cursor-pointer border-[#fff] rounded-lg px-4 py-2 flex-col items-center space-x-3 text-sm text-gray-600"
                  >
                    <BanknoteArrowDown className="h-16 w-16 text-white" />
                    <span className="text-white">Cash on delivery</span>
                  </div>
                  <div
                    onClick={() => handleOrderViaSSLorCOD(orderType.ssl)}
                    className="flex border-2 cursor-pointer border-[#fff] rounded-lg px-4 py-2 flex-col items-center space-x-3 text-sm text-gray-600"
                  >
                    <BadgeDollarSign className="h-16 w-16 text-white" />
                    <span className="text-white">SSL Commerz</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Free shipping on orders over $99</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Secure checkout guaranteed</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <span>Multiple payment options</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
