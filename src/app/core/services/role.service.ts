import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { RoleResponse } from "../models/response/role-response.model";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { SuccessResponse } from "../models/response/success-response.model";


@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    getAllRole(): Observable<RoleResponse[]> {
        return this.http.get<RoleResponse[]>(environment.apiUrl + "role");
    }

    changeStatus(id: Number): Observable<SuccessResponse> {
        return this.http.get<SuccessResponse>(environment.apiUrl + "employee/change-status/" + id);
    }
}