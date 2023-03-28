import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../../entity/order/cart';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/token-storage.service';
import {Orders} from '../../entity/order/orders';
import {TotalDto} from '../../entity/order/total-dto';

const ORDER_API = 'http://localhost:8080/api/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  addToCart(orderId: number, productId: number, quantity: number) {
    return this.httpClient.post(ORDER_API + '/cart', {orderId: orderId, productId: productId, quantity: quantity});
  }

  updateQuantity(orderId: number, productId: number, quantity: number) {
    return this.httpClient.post(ORDER_API + '/updateQuantity', {orderId: orderId, productId: productId, quantity: quantity});
  }

  createCart(accountId: number) {
    return this.httpClient.post(ORDER_API + '/order', {accountId: accountId});
  }

  findOrderByAccountId(accountId: number): Observable<Orders> {
    return this.httpClient.get<Orders>(ORDER_API + '/detail/' + accountId);
  }

  getAllCart(orderId: number): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(ORDER_API + '/list/' + orderId);
  }

  getTotal(orderId: number): Observable<TotalDto> {
    return this.httpClient.get<TotalDto>(ORDER_API + '/total/' + orderId);
  }

  // buy(cart:Cart[]):Observable<any> {
  //   return this.httpClient.post<any>(ORDER_API + "/order",{accountId:this.tokenStorageService.getIdAccount(),orderDate:Date.now(),carts:cart})
  // }

  removeCart(productId: number, orderId: number) {
    return this.httpClient.delete(ORDER_API + '/delete' + '?productId=' + productId + '&orderId=' + orderId);
  }

  addCartLocal(cartList: Cart[], orderId: number) {
    return this.httpClient.post(ORDER_API + '/cartLocal' + '?orderId=' + orderId, cartList);
  }
}
