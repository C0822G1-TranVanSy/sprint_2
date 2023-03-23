import {Category} from './category';

export interface ProductDtoUpdate {
  productId: number;
  productName: string;
  description: string;
  price: number;
  avatar: string;
  category: Category;
}
