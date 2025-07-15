export interface IOrder {
  products: IOrderProduct[];
  coupon?: string;
  shippingAddress: {
    area: string;
    city: string;
    zip_code: string;
    street_or_building_name: string;
  };
  paymentMethod: string;
  OrderType?: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  color: string;
}

export interface ICoupon {
  shopId: string;
  subTotal: number;
  couponCode: string;
}

export interface ICouponData {
  code: string;
  createdAt: Date;
  discountType: 'Percentage' | 'Flat';
  discountValue: number;
  endDate: Date;
  isActive: boolean;
  isDeleted: boolean;
  maxDiscountAmount: number;
  minOrderAmount: number;
}

export interface IShippingAddress {
  city: string;
  zip_code: string;
  street_or_building_name: string;
  area: string;
}
