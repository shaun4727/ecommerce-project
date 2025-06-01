import { IProduct } from './product';

export interface IBrand {
  _id: string;
  name: string;
  logo: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrandWithProducts extends IBrand {
  products: IProduct[];
}
