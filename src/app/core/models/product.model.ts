
export class Product {
    id?: Number;
    uuid: string;
    productName: string;
    amount: Number;
    date: Date;
    warehouseId: Number;
    completionAmount: Number;
    colorCompletion?: string;
    status: boolean;
    warehouseName: string;

    constructor(id: Number, uuid: string, productName: string, amount: Number, date: Date, warehouseId: Number,completionAmount: Number,status: boolean, colorCompletion: string, warehouseName: string) {
        this.id = id;
        this.uuid = uuid;
        this.productName = productName;
        this.amount = amount;
        this.date = date;
        this.warehouseId = warehouseId;
        this.completionAmount = completionAmount;
        this.status = status
        this.colorCompletion = colorCompletion;
        this.warehouseName = warehouseName;
    }
}