import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { StageResponse } from "../models/response/stage-response.model";


@Injectable({
    providedIn: 'root'
})
export class StageService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    getAll(): Observable<Array<StageResponse>> {
        return this.http.get<Array<StageResponse>>(environment.apiUrl + "stages");
    }

    getByProductId(productId:number): Observable<Array<StageResponse>> {
        return this.http.get<Array<StageResponse>>(environment.apiUrl + "stages/get-by-product?productId="+productId);
    }
}