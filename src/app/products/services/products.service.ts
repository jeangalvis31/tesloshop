import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/products.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);


  private productsCache = new Map();
  private productCache = new Map();
  
  getProducts(options: Options): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender= ''} = options

    const key = `${limit}-${offset}-${gender}`;
    if(this.productsCache.has(key)){
      return of(this.productsCache.get(key))
    }

    return this.http.get<ProductsResponse>(`${baseUrl}/products`,{
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    })    
    .pipe(
      tap((resp) => console.log(resp)),
      tap((resp) => this.productsCache.set(key,resp))
    );
  }


  getProductsByIdSlug(idSlug: string): Observable<Product>{

    if(this.productCache.has(idSlug)){
      return of(this.productCache.get(idSlug))
    }



    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      tap((product) => this.productCache.set(idSlug, product))
    )
  }



  getProductsById(id: string): Observable<Product>{

    if(this.productCache.has(id)){
      return of(this.productCache.get(id))
    }



    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      tap((product) => this.productCache.set(id, product))
    )
  }
}
