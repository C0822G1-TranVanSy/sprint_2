import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from '../../entity/warehouse/warehouse';

const WAREHOUSE_API = 'http://localhost:8080/api/warehouse';
@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Warehouse[]>{
    return this.httpClient.get<Warehouse[]>(WAREHOUSE_API + "/list");
  }

  findById(): Observable<Warehouse>{
    return this.httpClient.get<Warehouse>(WAREHOUSE_API + "/detail");
  }
}
