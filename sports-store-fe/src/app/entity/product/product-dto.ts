import {Category} from './category';

export interface ProductDto {
  productId: number;
  productName: string;
  description: string;
  price: number;
  avatar: string;
  categoryId: number;
  total: number;
}
