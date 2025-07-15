import { IAgentOrder } from './product';

export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: 'user' | 'admin' | 'agent';
  iat?: number;
  exp?: number;
  picked?: boolean;
  createdAt?: string;
  _id: string;
}

export interface IProfileData {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  profile: {
    _id: string;
    gender: string;
    user: string;
    address: string;
    dateOfBirth: string;
    phoneNo: string;
    createdAt: string | number | Date;
  };
}

export interface IOrderData {
  _id: string;
  assigned: IAgentOrder | null;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  products: {
    product: {
      brand: {
        _id: string;
        name: string;
      };
      _id: string;
      name: string;
      description: string;
      price: number;
      stock: number;
      weight: number;
      imageUrls: string[];
      averageRating: number;
      ratingCount: number;
      availableColors: string[];
      specification: string[];
      keyFeatures: string[];
      slug: string;
      createdAt: string;
      updatedAt: string;
      offerPrice: number;
      category: string[];
    }[];
    quantity: number;
    color: string;
    unitPrice: number;
  }[];
  discount: number;
  deliveryCharge: number;
  status: string;
  shippingAddress: {
    area: string;
    city: string;
    zip_code: string;
    street_or_building_name: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  finalAmount: number;
  createdAt: string | number | Date;
  coupon?: string;
}
