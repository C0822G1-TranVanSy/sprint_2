import {Bill} from './bill';

export interface Payment {
  paymentId: number;
  paymentMethod: string;
  paymentStatus: boolean;
  bill: Bill;
}
