import { EmployeeReportDetailData } from "./emp-report-detail-data.model";

export class EmployeeReportDetailResponse {
     moneyTotal: String;
     employeeReportDetails: EmployeeReportDetailData[];

    constructor(moneyTotal: String, employeeReportDetails: EmployeeReportDetailData[]) {
        this.moneyTotal = moneyTotal;
        this.employeeReportDetails = employeeReportDetails;
    }
}