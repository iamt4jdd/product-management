export class WarehouseResponse {
    id: Number;
    warehouseName: String;
    status: boolean;

    constructor(id: Number, warehouseName: String, status: boolean) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.status = status;
    }
}