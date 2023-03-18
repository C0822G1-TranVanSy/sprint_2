import {Product} from '../product/product';
import {Bill} from './bill';

export interface PurchaseHistory {
  id: number;
  bill: Bill;
  product: Product;
  quantity: number;
}
