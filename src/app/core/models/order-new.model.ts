export class OrderNew {
    productUuid: Number;
    uuid: Number;
    amount: String;

    constructor(productUuid: Number, uuid: Number, amount: String) {
        this.productUuid = productUuid;
        this.uuid = uuid;
        this.amount = amount;
    }
}