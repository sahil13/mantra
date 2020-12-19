import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, take } from 'rxjs/operators';
import { IProduct } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private API_URL="http://localhost/oshop/cart.php";

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.API_URL);
  }

}
