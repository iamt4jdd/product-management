import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment"
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Warehouse } from '../models/warehouse.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(public http: HttpClient) { }

  getWarehouses(status?: boolean): Observable<Array<Warehouse>> {
    let httpParams = new HttpParams();
    if (typeof status === 'boolean') {
      httpParams = httpParams.set("status", status);
    }
    return this.http.get<any>(environment.apiUrl + "warehouses", { params: httpParams }).pipe(
      map((responseData) => {

        const productsArray: Array<Warehouse> = [];
        for (const item in responseData.results) {
          productsArray.push(
            new Warehouse(
              responseData.results[item].id,
              responseData.results[item].warehouseName,
              responseData.results[item].status,
            )
          );
        }
        return productsArray;
      })
    );
  }
}
