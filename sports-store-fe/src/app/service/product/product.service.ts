import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../entity/product/product';
import {ProductDto} from '../../entity/product/product-dto';
import {Cart} from '../../entity/order/cart';
import {TokenStorageService} from '../security/token-storage.service';
const PRODUCT_API = 'http://localhost:8080/api/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,private token:TokenStorageService) { }

  getAllProduct(): Observable<ProductDto[]>{
    return this.httpClient.get<ProductDto[]>(PRODUCT_API + "/list")
  }

  getPageAllProduct(size: number): Observable<any>{
    return this.httpClient.get<any>(PRODUCT_API + "/page" + '?' + 'size=' + size)
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(PRODUCT_API + "/detail/" + productId)
  }

  buy(cart:Cart[]):Observable<any> {
    return this.httpClient.post<any>(PRODUCT_API + "/order",{accountId:this.token.getIdAccount(),orderDate:Date.now(),carts:cart})
  }
}
