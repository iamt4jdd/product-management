import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { AppConstant } from '../constant/app-constant';
import { ObjectRequest } from '../models/request/object-request.model';
import { OrderNew } from '../models/order-new.model';
import { Order } from '../models/order.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(public http: HttpClient) { }

    getOrders(page?: Number, size?: Number, productUuid?: String,productId?: Number): Observable<any> {
        let httpParams = new HttpParams();
        if (typeof page === 'number') {
            httpParams = httpParams.set("page", page);
        }
        if (typeof size === 'number') {
            httpParams = httpParams.set("size", size);
        }
        if (typeof productUuid === 'string') {
            httpParams = httpParams.set("productUuid", productUuid);
        }
        if (typeof productId === 'number') {
            httpParams = httpParams.set("productId", productId);
        }
        return this.http.get<ObjectRequest>(AppConstant.ORDER_API_ENDPOINT, { params: httpParams }).pipe((rs) => {
            return rs;
        })
    }

    getOrdersByProductId(productId?: Number): Observable<Array<Order>> {
        let httpParams = new HttpParams();
        if (typeof productId === 'number') {
            httpParams = httpParams.set("productId", productId);
        }
        return this.http.get<Array<Order>>(AppConstant.ORDER_API_ENDPOINT+"/find-by-product", { params: httpParams }).pipe((rs) => {
            return rs;
        })
    }

    saveOrder(orderNew: OrderNew): Observable<OrderNew> {
        return this.http.post<OrderNew>(AppConstant.ORDER_API_ENDPOINT, orderNew, httpOptions)
            .pipe(
                catchError((error: any, caught: Observable<any>): Observable<any> => {
                    return throwError(error);
                }));
    }
}