import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment"
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductNew } from '../models/product-new.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  color: string = '';

  constructor(public http: HttpClient) { }

  getProducts(page?: Number, size?: Number, status?:Boolean): Observable<any> {
    let httpParams = new HttpParams();
    if (typeof page === 'number') {
      httpParams = httpParams.set("page", page);
    }
    if (typeof size === 'number') {
      httpParams = httpParams.set("size", size);
    }
    if (typeof status === 'boolean') {
      httpParams = httpParams.set("status", status);
    }
    return this.http.get<any>(environment.apiUrl + "products", { params: httpParams }).pipe(
      map((responseData) => {
        let productsMap = new Map<string, Object>();
        productsMap.set("totalsPage",responseData.total)
        let productsArray = [];
        for (const item in responseData.results) {
          // this.calculatingProccess(responseData.results[item].completionAmount,responseData.results[item].amount);
          productsArray.push(
            new Product(
              responseData.results[item].id,
              responseData.results[item].uuid,
              responseData.results[item].productName,
              responseData.results[item].totalAmount,
              responseData.results[item].date,
              responseData.results[item].warehouseId,
              responseData.results[item].completionAmount,
              responseData.results[item].status,
              this.color,
              responseData.results[item].warehouseName,
            )
          );
          productsMap.set("productsArray", productsArray)
        }
        
        return productsMap;
      })
    );
  }

  getProductsByStatus(page?: Number, size?: Number, status?:Boolean): Observable<any> {
    let httpParams = new HttpParams();
    if (typeof page === 'number') {
      httpParams = httpParams.set("page", page);
    }
    if (typeof size === 'number') {
      httpParams = httpParams.set("size", size);
    }
    if (typeof status === 'boolean') {
      httpParams = httpParams.set("status", status);
    }
    return this.http.get<any>(environment.apiUrl + "products/find-by-status", { params: httpParams }).pipe(
      map((responseData) => {
        return this.processProductData(responseData);
      })
    );
  }

  processProductData(responseData: any){
    let productsMap = new Map<string, Object>();
    productsMap.set("totalsPage",responseData.total)
    let productsArray = [];
    for (const item in responseData.results) {
      productsArray.push(
        new Product(
          responseData.results[item].id,
          responseData.results[item].uuid,
          responseData.results[item].productName,
          responseData.results[item].totalAmount,
          responseData.results[item].date,
          responseData.results[item].warehouseId,
          responseData.results[item].completionAmount,
          responseData.results[item].status,
          this.color,
          responseData.results[item].warehouseName,
        )
      );
      productsMap.set("productsArray", productsArray)
    }
    return productsMap;
  }
  
  // calculatingProccess(completionAmount:number, amount:number){
  //   if (completionAmount > amount) {
  //     this.color = 'red-color-completion-class';
  //   } else if (completionAmount < amount) {
  //     this.color = 'blue-color-completion-class';
  //   } else {
  //     this.color = 'green-color-completion-class';
  //   }
  // }

  saveProduct(productNew: ProductNew): Observable<ProductNew> {
    return this.http.post<ProductNew>(environment.apiUrl + "products", productNew, httpOptions)
      .pipe(
        catchError((error: any, caught: Observable<any>): Observable<any> => {
          return throwError(error);
        }));
  }

  changeStatus(id: Number): Observable<Boolean> {
    return this.http.patch<Boolean>(environment.apiUrl + "products/switchStatus", id).pipe(
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        return throwError(error);
      }));
  }
}
