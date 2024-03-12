export class EmployeeReportDetailData {
    id: number;
    productId: number;
    productName: string;
    stageId: number;
    stageName: string;
    amount: number;
    money: String;
    dateSubmit: string;

    constructor(id: number,
        productId: number,
        productName: string,
        stageId: number,
        stageName: string,
        amount: number,
        money: String,
        dateSubmit: string) {
        this.id = id;
        this.productId = productId
        this.productName = productName,
            this.stageId = stageId,
            this.stageName = stageName,
            this.amount = amount,
            this.money = money,
            this.dateSubmit = dateSubmit
    }
}