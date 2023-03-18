import {Product} from '../product/product';

export interface Warehouse {
  id: number;
  quantity: number;
  product: Product;
}
