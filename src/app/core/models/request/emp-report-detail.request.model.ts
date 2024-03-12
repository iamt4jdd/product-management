export class EmployeeReportDetailRequest {
    private employeeId: number;
    private startDate: string;
    private endDate: string;
    constructor(employeeId: number,
        startDate: string,
        endDate: string,) {
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate
    }
}