export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: 'user' | 'admin';
  iat?: number;
  exp?: number;
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
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  finalAmount: number;
  createdAt: string | number | Date;
}
