import { IUser } from './user';

type Specification = {
  processor: string;
  ram: string;
  storage: string;
  display: string;
};

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  category: {
    _id: string;
    name: string;
  };
  imageUrls: string[];
  isActive: boolean;
  shop: {
    _id: string;
    shopName: string;
  };
  brand: {
    _id: string;
    name: string;
  };
  averageRating: number;
  ratingCount: number;
  availableColors: string[];
  specification: Specification;
  keyFeatures: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  offerPrice: number;
  orderQuantity?: number;
}

export interface IStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string; // Specific type for Lucide icons
  completed: boolean;
  active: boolean;
}

export interface IAgentOrder {
  _id: string;
  orderId: string;
  destination: {
    area: string;
    city: string;
    zip_code: string;
    street_or_building_name: string;
  };
  agentId: string | IUser;
  status: 'Picked' | 'Delivered' | 'Assigned';
  createdAt: string;
  updatedAt: string;
}
