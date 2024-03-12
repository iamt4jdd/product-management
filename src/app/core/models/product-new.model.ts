import { Stage } from "./stage.model";

export class ProductNew {
    uuid: string;
    productName: string;
    date: Date;
    warehouseId: Number;
    status: boolean;
    stages: Stage[];

    constructor(uuid: string, productName: string,  date: Date, warehouseId: Number, status: boolean, stages: Stage[]) {
        this.uuid = uuid;
        this.productName = productName;
        this.date = date;
        this.warehouseId = warehouseId;
        this.status = status;
        this.stages = stages;
    }
}