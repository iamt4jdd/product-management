
export class Warehouse {
    id: Number;
    warehouseName: string;
    status: boolean;


    constructor(id: Number, warehouseName: string, status: boolean) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.status = status;
    }
}
