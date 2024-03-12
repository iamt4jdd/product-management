import { Stage } from "./stage.model";

export class ProductDetail {
    id?: Number;
    date: Date;
    warehouseName: string;
    stages: Stage[];

    constructor(id: Number, date: Date, warehouseName: string, stages: Stage[]) {
        this.id = id;
        this.date = date;
        this.warehouseName = warehouseName;
        this.stages = stages;
    }
}