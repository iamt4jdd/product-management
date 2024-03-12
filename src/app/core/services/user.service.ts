import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { UserResponse } from "../models/response/user-response.model";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { SuccessResponse } from "../models/response/success-response.model";
import { UserData } from "../models/response/user-data.model";
import { CreateUserRequest } from "../models/request/create-user-request.model";
import { LoginRequest } from "../models/request/login-resquest.model";
import { CheckUserRequest } from "../models/request/check-user-request.model";
import { map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    getAllUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(environment.apiUrl + "employee");
    }

    getActiveUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(environment.apiUrl + "employee/active");
    }

    changeStatus(id: Number): Observable<SuccessResponse> {
        return this.http.get<SuccessResponse>(environment.apiUrl + "employee/change-status/" + id);
    }

    addUser(request:CreateUserRequest): Observable<UserData> {
        return this.http.post<UserData>(environment.apiUrl + "employee/add",request);
    }

    geUserById(empId:number): Observable<UserData> {
        return this.http.get<UserData>(environment.apiUrl + "employee/"+empId);
    }

    updateUser(user:UserData):Observable<Boolean>{
        return this.http.post<Boolean>(environment.apiUrl + "employee/update",user);
    }
    checkExistsAccount(userLogin:CheckUserRequest): Observable<Boolean>{
        return this.http.post<Boolean>(environment.apiUrl + "employee/check-exists",userLogin);
    }
}