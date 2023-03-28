import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../entity/product/product';
import {ProductDto} from '../../entity/product/product-dto';
import {Cart} from '../../entity/order/cart';
import {TokenStorageService} from '../security/token-storage.service';
import {ProductDtoUpdate} from '../../entity/product/product-dto-update';

const PRODUCT_API = 'http://localhost:8080/api/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,private token:TokenStorageService) { }

  getAllProduct(): Observable<ProductDto[]>{
    return this.httpClient.get<ProductDto[]>(PRODUCT_API + "/list");
  }

  getPageAllProduct(size: number): Observable<any>{
    return this.httpClient.get<any>(PRODUCT_API + "/page" + '?' + 'size=' + size);
  }

  searchAllProductByProductName(size: number, productName: string): Observable<any>{
    return this.httpClient.get<any>(PRODUCT_API + "/page" + '?' + 'size=' + size + '&name=' + productName);
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(PRODUCT_API + "/detail/" + productId);
  }

  createProduct(product: ProductDto){
    return this.httpClient.post(PRODUCT_API + "/create", product);
  }

  updateProduct(product: ProductDtoUpdate){
    return this.httpClient.put(PRODUCT_API + "/update", product);
  }

  deleteProduct(productId: number){
    return this.httpClient.delete(PRODUCT_API + "/delete/" + productId);
  }

  searchProductByCategory(size: number, categoryId: number): Observable<any>{
    return this.httpClient.get<any>(PRODUCT_API + "/searchCategory" + '?' + 'size=' + size + '&categoryId=' + categoryId);
  }


}
