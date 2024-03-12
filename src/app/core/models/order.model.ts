export class Order {
    id: Number;
    uuid: String;
    amount: Number;
    productUuid: String;
    orderDate: Date;

    constructor(id: Number, uuid: String, amount: Number,productUuid: String, orderDate: Date) {
        this.id = id;
        this.uuid = uuid;
        this.amount = amount;
        this.productUuid = productUuid;
        this.orderDate = orderDate;
    }
}