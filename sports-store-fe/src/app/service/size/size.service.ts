import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Size} from '../../entity/product/size';

const SIZE_API = 'http://localhost:8080/api/size';
@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private httpClient:HttpClient) { }

  getAllSize(): Observable<Size[]>{
    return this.httpClient.get<Size[]>(SIZE_API + "/list");
  }
}
