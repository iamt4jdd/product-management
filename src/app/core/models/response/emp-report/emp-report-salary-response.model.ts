export class EmployeeReportSalary {
    id: Number;
    employeeName: String
    phoneNumber: String
    amount: String
    constructor(id: Number,
        employeeName: String,
        phoneNumber: String,
        amount: String) {
        this.id = id;
        this.employeeName = employeeName;
        this.phoneNumber = phoneNumber;
        this.amount = amount;
    }
}