import {Product} from '../product/product';
import {Orders} from './orders';


export interface PurchaseHistory {
  id: number;
  bill: Orders;
  product: Product;
  quantity: number;
}
