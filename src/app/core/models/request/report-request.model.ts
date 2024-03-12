import { ReportDetail } from "./report-detail.model";

export class ReportRequest {
    employeeId: number;
    reportDetails: ReportDetail[]

    constructor(employeeId: number,
        reportDetail: ReportDetail[]) {
        this.employeeId = employeeId;
        this.reportDetails = reportDetail;
    }
}