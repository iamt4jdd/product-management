import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { ReportRequest } from "../models/request/report-request.model";
import { EmployeeReportDetailResponse } from "../models/response/emp-report/emp-report-detail-response.model";
import { EmployeeReportDetailRequest } from "../models/request/emp-report-detail.request.model";
import { ReportUpdateAmountRequest } from "../models/request/report-update-amount.model";
import { EmployeeReportSalary } from "../models/response/emp-report/emp-report-salary-response.model";


@Injectable({
    providedIn: 'root'
})
export class ReportDailyService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    submitReport(reportRequest: ReportRequest): Observable<number> {
        return this.http.post<number>(environment.apiUrl + "report", reportRequest);
    }

    getEmployeeReport(request: EmployeeReportDetailRequest): Observable<EmployeeReportDetailResponse> {
        return this.http.post<EmployeeReportDetailResponse>(environment.apiUrl + "report/employee-detail", request);
    }

    updateAmount(request: ReportUpdateAmountRequest):Observable<Boolean>{
        return this.http.post<Boolean>(environment.apiUrl + "report/update-amount", request)
    }

    getEmployeeSalaryReport(startDate: String, endDate: String):Observable<EmployeeReportSalary[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set("startDate", startDate.valueOf());
        httpParams = httpParams.set("endDate", endDate.valueOf());
        return this.http.get<EmployeeReportSalary[]>(environment.apiUrl +"report/salary", { params: httpParams });
    }

    getEmployeeSalary(employeeId:String, startDate: String, endDate: String):Observable<EmployeeReportSalary> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set("employeeId", employeeId.valueOf());
        httpParams = httpParams.set("startDate", startDate.valueOf());
        httpParams = httpParams.set("endDate", endDate.valueOf());
        return this.http.get<EmployeeReportSalary>(environment.apiUrl +"report/salary-for-employee", { params: httpParams });
    }

    deleteReport(id: Number):Observable<Boolean>{
        return this.http.delete<Boolean>(environment.apiUrl + "report/delete/"+id);
    }
}