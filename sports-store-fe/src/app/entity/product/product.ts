import {Category} from './category';

export interface Product {
  productId: number;
  productName: string;
  description: string;
  flagDelete: boolean;
  price: number;
  avatar: string;
  category: Category;
}
