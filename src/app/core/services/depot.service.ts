import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { DepotResponse } from "../models/response/ware-house-response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DepotService{
    
    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    getAllDepot(): Observable<DepotResponse> {
        return this.http.get<DepotResponse>(environment.apiUrl + "employee");
    }
}